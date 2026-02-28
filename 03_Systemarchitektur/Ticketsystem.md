# Umsetzungskonzept: Ticketsystem für SVA Studio (`@sva/tickets`)

## Ziele

* Mandantenfähig, **keine Cross-Tenant Tickets**
* Sichtbarkeit strikt: **Ersteller ∪ Assignee ∪ Teilnehmer(User/Orga) ∪ Support**
* Assignee: **genau 1** (User *oder* global Support)
* Pflichtfelder: Titel, Beschreibung, Typ, Prio (Impact), Mandant automatisch
* Kommentare: Markdown, immutable, keine internen Comments, **keine Attachments an Comments** (nur Ticket)
* Status: `Open → In Progress → Done → Closed (Auto)` + `Reopened`
* GitHub-Mirroring: **manuell + Consent + 2-way-sync**, **event-getrieben über NATS**
* Search V1: **Postgres FTS**, später **Meilisearch** (Port/Adapter)
* MCP-first: **alle Funktionen als MCP-Tools**, Support global mit Tenant-Kontext
* Audit: **Event-Sourcing-Light** (immutable Events + aktuelle Projektion)

---

## 1) Package-Schnitt im TanStack Monorepo

### `@sva/tickets` (Domain Package)

* `domain/` (Entities, invariants, value objects, policies)
* `application/` (use-cases, command/query handlers)
* `ports/` (interfaces: repos, search, event bus, auth context, clock)
* `adapters/` (postgres repo, postgres fts, nats publisher)
* `mcp/` (tool definitions + handlers)
* `ui/` (TanStack Router routes + views + components)
* `shared/` (types, schemas, event contracts, zod validators)

**Freiheit:** Ihr könnt UI auslagern, aber Domain/Application/Ports würde ich stabil halten.

---

## 2) Domain Model

### Aggregate: `Ticket`

**State**

* `id: UUID` (global)
* `tenantId: UUID|string`
* `tenantKey: string` (für Anzeige `TENANT-123`)
* `ticketNumber: int` (sequence pro Tenant)
* `title: string`
* `descriptionMd: string`
* `type: TicketType` (enum/extensible)
* `priorityLevel: smallint` (Impact)
* `status: TicketStatus` (`open|in_progress|done|reopened|closed`)
* `assignee: { kind: 'user', userId } | { kind:'support' }`
* `participants: { users: userId[], orgs: orgId[] }`
* `refs?: TicketRef[]` (optional structured references)
* `githubMirror?: { enabled: boolean, repo: string, issueNumber?: number, issueUrl?: string, lastSyncAt?: ts }`
* `createdAt, createdBy`
* `updatedAt, updatedBy`
* `doneAt?`, `closedAt?`

### Sub-entities

* `Comment`

  * `id, ticketId`
  * `bodyMd`
  * `createdAt, createdBy`
  * immutable

### Value objects

* `TicketRef = { type: string; id: string; label?: string; url?: string; meta?: json }`
  (absichtlich „open-ended“)

---

## 3) Event-Sourcing-Light

### Ansatz

* **Write path:** Command handler validiert → schreibt:

  1. `ticket_events` (immutable)
  2. aktualisiert `tickets` Projektion (oder async projector; bei euch V1 lieber synchron)
* **Read path:** UI/API liest aus `tickets` + `ticket_comments` + optional Eventlog.

### Event types (granular)

* `ticket.created`
* `ticket.status_changed`
* `ticket.priority_changed`
* `ticket.type_changed`
* `ticket.description_changed`
* `ticket.title_changed`
* `ticket.assignee_changed`
* `ticket.participants_changed`
* `ticket.refs_changed`
* `ticket.comment_added`
* `ticket.github_mirror_enabled`
* `ticket.github_mirror_disabled`
* `ticket.github_issue_linked` (wenn Issue erstellt/gefunden)
* `ticket.github_inbound_comment_added` (von GitHub)
* `ticket.system_auto_closed`

**Event envelope (Hybrid Payload, NATS & DB identisch)**

* `eventId` (UUID)
* `eventType`
* `occurredAt`
* `actor`:

  * `{ kind:'user', userId } | { kind:'system' } | { kind:'service', name }`
* `tenantId`
* `ticket: { id, tenantKey, ticketNumber }`
* `snapshotLight`: `{ title, status, priorityLevel, type, assigneeKind, updatedAt }`
* `delta`: event-spezifisch (z. B. `{ from:'done', to:'closed' }`)
* `meta`: optional (requestId, mcpClientId, etc.)

---

## 4) Postgres Datenmodell (V1)

### `tickets`

* `id uuid pk`
* `tenant_id`
* `ticket_number int` (unique within tenant)
* `tenant_key text` (denormalisiert für Anzeige)
* `title text`
* `description_md text`
* `type text`
* `priority_level smallint`
* `status text`
* `assignee_kind text` (`user|support`)
* `assignee_user_id uuid null`
* `participants_user_ids uuid[]` (oder join-table; bei euch Freiheit – ich würde join-table empfehlen)
* `participants_org_ids uuid[]` (dito)
* `refs jsonb null`
* `github jsonb null`
* `created_at, created_by`
* `updated_at, updated_by`
* `done_at, closed_at`

**Constraints**

* `unique (tenant_id, ticket_number)`
* check: `assignee_kind='user' => assignee_user_id not null`
* check: `status` in allowed set

### `ticket_comments`

* `id uuid pk`
* `ticket_id uuid fk`
* `tenant_id`
* `body_md text`
* `created_at, created_by`

### `ticket_events`

* `id uuid pk`
* `tenant_id`
* `ticket_id uuid`
* `event_type text`
* `occurred_at timestamptz`
* `actor jsonb`
* `snapshot_light jsonb`
* `delta jsonb`

### `ticket_number_sequences`

Je nach Geschmack:

* pro tenant `SEQUENCE` dynamisch erstellen **oder**
* eine Tabelle, die pro tenant den Counter hält (mit `SELECT ... FOR UPDATE`).
  Für max 100 Mandanten ist beides ok; ich tendiere zu **Counter-Tabelle** für einfache Ops.

### Indizes

* `tickets(tenant_id, status)`
* `tickets(tenant_id, assignee_kind, assignee_user_id)`
* `tickets(tenant_id, priority_level)`
* `tickets(tenant_id, updated_at desc)`
* `ticket_events(ticket_id, occurred_at desc)`
* `ticket_comments(ticket_id, created_at asc)`

---

## 5) Search (V1 Postgres FTS, später Meili)

### Port

`TicketSearchPort.search(tenantScope, query, filters, pagination)`

### V1 Adapter (Postgres)

* `tsvector` aus:

  * `tickets.title`
  * `tickets.description_md`
  * **+ comments**: per materialized view oder trigger-updated `search_doc` Tabelle.
    Für Freiheit:
* simplest V1: `tickets.search_vector` nur aus ticket-fields + separate comment search per join (ok bei kleinem Volumen)
* robust: `ticket_search_docs(ticket_id, tenant_id, tsvector)` updated via trigger on comments/tickets.

### V2 Adapter (Meili)

* Events treiben Index Updates (`ticket.*` Events → worker update).
* Dokument enthält `tenantId` als Filter-Facet.

---

## 6) NATS Eventing

### Subjects (Versioniert!)

* `sva.v1.tickets.<tenantId>.<eventType>`
* zusätzlich für Support/global:

  * `sva.v1.tickets.all.<eventType>` (nur light, wenn ihr wollt)

Besser (weniger Subjects):

* `sva.v1.tickets.events` mit payload incl. `tenantId`, und Consumers filtern.

Da ihr „Freiheit“ wollt: **beides ist ok**. Ich würde **ein Subject** bevorzugen.

### Guarantee

* at-least-once delivery (idempotent consumer via `eventId`)
* ordering nur pro ticket nötig → Consumer kann per `(ticketId, occurredAt)` sortieren, wenn nötig

---

## 7) GitHub Worker (event-driven)

### Aktivierung

* UI/MCP: `enableMirror(ticketId)` → Ticket-Service schreibt Event `ticket.github_mirror_enabled` (mit repo param) + setzt `github.enabled=true` (ohne issueNumber).
* Worker subscribed:

  * erstellt Issue (oder verlinkt existierendes)
  * schreibt zurück via API: `linkIssue(ticketId, issueNumber, url)` → erzeugt `ticket.github_issue_linked` Event

### Outbound Sync

* Bei `ticket.comment_added`, `ticket.status_changed` etc.:

  * wenn mirror enabled & issue linked → post to GitHub
  * idempotency: `eventId` als hidden marker in GitHub comment body (oder in issue labels/meta) – so vermeidet ihr doppelte Posts.

### Inbound Sync

* GitHub webhooks → Worker → Ticket API:

  * new issue comment → `ticket.github_inbound_comment_added`
  * issue closed/reopened optional später (V2) → `status_changed` (wenn ihr wollt)

### Consent

* UI erzwingt Confirm, Domain speichert:

  * `githubMirror.consentAt`, `consentBy`

---

## 8) MCP Design

### Grundregel

* MCP Tools sind **thin wrappers** um Application Use-Cases.
* Auth-Kontext liefert:

  * normal: `tenantId` aus Token
  * support: `support.setActiveTenant()` oder `tenantSelector` Pflicht bei list/search

### Tools (Auszug)

* `tickets.create`
* `tickets.get`
* `tickets.search`
* `tickets.addComment`
* `tickets.setStatus`
* `tickets.setAssignee`
* `tickets.setParticipants`
* `tickets.setRefs`
* `tickets.enableGithubMirror` (mit consent)
* `tickets.disableGithubMirror`
* `support.setActiveTenant`
* `support.getActiveTenant`

**Safety:** Für Support-Token:

* `tickets.search` ohne active tenant: nur erlaubt, wenn explizit `tenantSelector` gesetzt.

---

## 9) Policies / Jobs

### Auto-close

* Daily job: finde Tickets `status='done' AND doneAt < now()-Xdays` → set status `closed` via Use-Case
* Actor = system
* Event: `ticket.system_auto_closed`

---

## 10) Teststrategie in Stufen (C, gestaffelt)

### Stufe 1 (V1 Launch)

* Domain unit tests: invariants + transitions + permission checks
* Use-case tests: command handler happy/edge
* Event contract tests: zod schema validates
* Postgres integration tests: repo + search FTS
* MCP tool tests: tool → usecase → expected events

### Stufe 2

* NATS publisher contract test (subject + payload)
* GitHub worker idempotency tests (event replay)

### Stufe 3

* End-to-end tests (UI flows)
* Property-based tests für Eventlog + projection consistency

---

## 11) Guardrails / Risiken

* **Tenant leaks**: jede Query zwingend `tenantId` filter + RLS optional (nice)
* **Support global**: requires explicit tenant context for non-ID operations
* **Event idempotency**: überall `eventId` first-class
* **GitHub 2-way**: loop prevention (marker + inbound/outbound correlation)
* **FTS + comments**: entscheidet früh, ob ihr `search_docs` table macht (mein Tipp: ja)

---

# Ausbaustufen

## V1 (MVP, aber stark)

* Ticket CRUD, comment, status, assignee, participants, refs
* Postgres FTS
* NATS events granular
* MCP tools vollständig
* GitHub mirror enable + issue create/link + comment sync basic

## V2

* Meilisearch adapter
* GitHub inbound webhooks stabil + loop prevention hardened
* Mentions + notifications via consumer (n8n)

## V3

* Optional: participant roles (viewer/commenter/status)
* Optional: SLA/Reminder via external automation
* Optional: UI saved views (per user/org)

---

# Konkrete nächste Schritte (für euer Umsetzungskonzept-Dokument)

1. ADR: “Ticket IDs pro Tenant, UI TENANT-123, intern UUID+tenant+seq”
2. ADR: “Event-sourcing-light + projection update synchron”
3. ADR: “Search Port + Postgres FTS Adapter, Meili later”
4. ADR: “NATS subject strategy + payload schema v1”
5. ADR: “GitHub worker: enable mirror + 2-way sync via events/webhooks”
6. Backlog: V1 Epics (Domain, DB, UI, MCP, NATS, Worker)
