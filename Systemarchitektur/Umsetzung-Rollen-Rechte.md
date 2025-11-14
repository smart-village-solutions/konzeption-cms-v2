# Architekturkonzept: Identity & Access Management (IAM)

## 1. Zielbild & Scope

### 1.1 Ziel

Ein zentrales, mandantenfähiges Nutzer- und Rechtesystem für das Smart-Village-CMS, das:

- **Authentifizierung, SSO, 2FA, Passkeys** über Keycloak abwickelt
- **Alle fachlichen Anforderungen** (7 Personas, Organisationshierarchie, Rechtevererbung, Workflows, Audit, DSGVO) im CMS-IAM abbildet
- Eine **schnelle, zentrale Berechtigungsprüfung** liefert, die in jedem Modul genutzt werden kann (`isAllowed(user, action, resource, context)` in < 50 ms)

### 1.2 Scope dieses Konzepts

**Im Scope:**

- Architektur & Komponenten-Zuschnitt
- Aufgabenteilung Keycloak ↔ CMS
- Datenhaltung & Schnittstellen
- Berechtigungsmodell (RBAC + ABAC + Vererbung)
- Workflows (Rollenänderung, Vertretungen, Impersonation, Change Requests)
- Performance-/Security-Aspekte auf Architektur-Ebene

**Nicht im Scope:**

- Detailliertes UI-Design
- Jede einzelne API-Request-Payload
- Implementierungsdetails spezifischer Module

### 1.3 Welche Herausforderungen adressiert dieses System?

#### Zugriffskontrolle und Sicherheit

- Granulare Berechtigungsvergabe auf Modul-, Content-Type- und geografischer Ebene
- Schutz sensibler Daten durch rollenbasierte Zugriffskontrolle (RBAC) und attributbasierte Kontrolle (ABAC)
- Mandantenfähigkeit für Multi-Tenant-Umgebungen
- Compliance mit DSGVO und anderen Datenschutzanforderungen

#### Organisatorische Strukturen

- Abbildung von Landkreis → Gemeinde → Ortsteil sowie Unternehmen/Agenturen
- Hierarchische Organisations-Strukturen mit Rechtevererbung
- Mandantentrennung bei Shared-Infrastructure

#### Rechtliche Compliance

- Verwaltung rollenspezifischer Rechtstexte
- Versionierung von Nutzungsbedingungen und Datenschutzerklärungen
- Nachweispflichten für Akzeptanz von Rechtstexten
- Unveränderbare Audit-Logs

#### 7-Personas-System

- Dedizierte Rollen für verschiedene Anwendungsfälle
- Klare Verantwortlichkeiten und Zuständigkeiten
- Flexible Anpassung an kommunale Strukturen

---

## 2. Architektur-Übersicht

### 2.1 Komponenten-Diagramm (textuell)

```text
[Browser CMS-UI]
      |
      v
[API-Gateway / CMS-Backend]
      |           \
      |            \----> [IAM-Service (Accounts/Orgs/Rollen/Rechte)]
      |
      \---- OIDC ----> [Keycloak] <--> [IdPs: AD, BundID, Servicekonto, ...]

[IAM-DB (Postgres)] <--> [Permission Cache (Redis)]
                     \
                      \--> [Analytics/Reporting]
```

### 2.2 Kernideen

- **CMS-Frontends** authentifizieren sich immer über Keycloak (OIDC)
- **CMS-Backend** nutzt das Access-Token, löst darin enthaltene User-ID/Org-Infos auf und fragt bei Bedarf den IAM-Service bzw. dessen Permission Engine
- **IAM-Service** und zentrale CMS-DB (Postgres/Supabase) halten alle fachlichen Entitäten: Accounts, Organisationen, Gruppen, Rollen, Rechtstexte, Workflows, Audit-Logs
- **Redis-Cluster** (oder vergleichbar) hält vorgefertigte, effektiv berechnete Berechtigungs-Snapshots pro User/Organisation/Kontext

### 2.3 Nutzen des Systems

#### Für System-Administratoren

- Zentrale Verwaltung aller Benutzerkonten über Keycloak
- Schnelle Rollenzuweisung über vordefinierte Templates
- Audit-Trail für alle Änderungen an Accounts und Berechtigungen
- Automatisierte Onboarding-/Offboarding-Prozesse

#### Für Organisationen/Kommunen

- Strikte Trennung von Daten verschiedener Mandanten
- Flexible Anpassung an Organisationsstrukturen
- Rechtssichere Dokumentation von Zuständigkeiten
- Compliance mit Datenschutz und Informationssicherheit
- Transparenz über Zugriffsrechte

#### Für CMS-Entwickler

- Einfache Integration via SDK/npm-Package
- Performante Permission-Checks (< 50 ms)
- Klare API-Schnittstellen
- Event-basierte Architektur für Erweiterungen

---

## 3. Aufgabenteilung: Keycloak vs. CMS-IAM

### 3.1 Was liegt in Keycloak?

Keycloak ist zuständig für:

#### Identität & Login

- Nutzerkonto mit minimalen Daten (ID, E-Mail, Name)
- Passwörter, 2FA/TOTP, Passkeys (WebAuthn)
- Passwort-Richtlinien, Lockout, Brute-Force-Schutz

#### SSO & Föderation

- SAML/OIDC-Anbindungen (Kommunal-AD, BundID, Servicekonto, Google, MS, …)
- LDAP/AD-User-Föderation
- SCIM-Integration (optional: via Keycloak SCIM-Provider oder separater Adapter)

#### Zentrale Claims im Token

- `sub` = Keycloak-User-ID
- `email`
- ggf. `tenant_id` (Organisation), `personas` (Systemrollen), `org_ids`

#### Events

- Login/Logout, User created/updated/disabled
- Passwort-Resets, 2FA-Änderungen

**Im Token stehen nur relativ grobe Infos, z. B.:**

- Primäre Persona (system_admin, editor, …)
- Primäre Organisation (oder Liste)
- Flags wie `2fa_enabled`, `email_verified`

### 3.2 Was liegt im CMS-IAM (eigene DB + Service)?

Alles Fachliche, was über „Login" hinausgeht:

#### Accounts (fachlich)

- Erweiterte Profildaten
- Organisationszugehörigkeiten (auch mehrere)
- Vertretungsrechte, Onboarding-Status, Schulungsbestätigungen
- Interne/externe Differenzierung
- Mapping: `account.keycloakId` → Keycloak `sub`

#### Organisationen

- Vollständiges Organisationsmodell, Hierarchien, Mandanten-Konfiguration (Supabase/GraphQL), Branding
- Multiorganisations-Mitgliedschaften

#### Rollen & Berechtigungen

- 7 Personas als System-Rollen
- Zusätzlich mandantenspezifische Custom-Rollen (z. B. „Vereinsredakteur", „Fachadmin Tourismus")
- Feingranulare Module-/Content-/Geo-Berechtigungen
- Rollen-Vererbung (Landkreis → Gemeinde → Ortsteil; Organisation → Sub-Organisation)

#### Gruppen

- Berechtigungsgruppen mit vererbten Permissions

#### Rechtstexte & Akzeptanzen

- `legal_texts`, `legal_text_acceptances`
- Versions- und Accept-Logik

#### Workflows

- Rollenänderungs-Anträge & Genehmigungen (Vier-Augen-Prinzip)
- Change Requests für Inhalte
- On-/Offboarding-Prozesse

#### Auditing & Compliance

- `activity_logs` (unveränderbar, exportierbar)
- Reporting-Dashboards & KPIs

**Keycloak ist damit aus Sicht des CMS ein technischer IdP, das CMS-IAM ist der fachliche Identity- und Authorization-Layer.**

---

## 4. Datenhaltung & Modelle

### 4.1 Postgres-Schema

Ein gemeinsames Postgres-Schema `iam` in der Supabase-Instanz:

- `iam.accounts`
- `iam.organizations`
- `iam.groups`
- `iam.roles` (Systemrollen + Custom)
- `iam.role_permissions`
- `iam.account_roles` (User ↔ Rolle, inkl. Gültigkeitszeitraum)
- `iam.delegations` (Vertretungen)
- `iam.legal_texts`, `iam.legal_text_acceptances`
- `iam.activity_logs`
- `iam.permission_snapshots` (optional, siehe Performance)

### 4.2 Keys und Verbindungen

- `accounts.keycloakId` → Keycloak userId (string)
- Mandantenfeld konsequent: `organizationId` in allen relevanten Tabellen
- Hierarchie über `organizations.parentOrganizationId` und Geo-Entitäten (Regions/Cities-Tables)

### 4.3 Row-Level Security

- Jede Tabelle mit `organizationId` wird mit RLS abgesichert
- Der IAM-Service selbst läuft mit erhöhten Rechten, setzt `organizationId` programmatisch basierend auf Tenant-Kontext

---

## 5. Berechtigungsmodell (RBAC + ABAC + Vererbung)

### 5.1 Rollenebenen

Wir unterscheiden 3 Ebenen:

#### System-Rollen (global, fest)

Die 7 Personas:

1. **System-Administrator** – Vollständige Verwaltung aller Accounts, Rollen, Organisationen
2. **App-/Feature-Manager** – Verwaltung von Accounts innerhalb eigener Organisation
3. **Designer** – Design-Verwaltung, Branding, Corporate Design
4. **Redakteur/Editor** – Content-Erstellung und -pflege
5. **Interface-Manager** – Schnittstellen, API-Anbindungen
6. **Moderator** – Content-Creator-Verwaltung, Community-Management
7. **Strategischer Entscheider** – Read-Only-Zugriff, Reporting

#### Mandanten-Rollen (org-spezifisch)

z. B. `vereinsredakteur`, `fachadmin_tourismus` je Organisation

#### Temporäre Rollen & Vertretungen

- Zusätzliche Rolle mit `validFrom` / `validTo`

**Ein User kann:**

- Mehrere Rollen in einer Organisation haben
- In mehreren Organisationen unterschiedliche Rollen haben

### 5.2 Permissions

Permission-Einheit (fachlich):

```text
(subject, action, resource_type, resource_id?, scope)
```

**Beispiele:**

- `(user123, "content.publish", "news", null, {org=gemeinde_x, region=kreis_y})`
- `(user123, "settings.manage", "organization", orgId, {level=org_admin})`

#### Quellen von Permissions

- **Systemrolle** → Basisset
- **Mandantenrolle** → Ergänzungen/Einschränkungen
- **Gruppen** → Bündel von Permissions
- **Individuelle Overrides** am Account → selten, nur für Sonderfälle

**Kontextattribute (ABAC):** Organisation, Geo-Hierarchie, Zeitfenster

### 5.3 Vererbung & Hierarchie

#### Organisatorische Vererbung

Rollen können eine Gültigkeitsstufe haben:

- z. B. `scopeLevel = "county" | "municipality" | "district" | "org_only"`

**Regeln:**

- Rolle auf **Landkreisebene** → gilt für alle zugeordneten Gemeinden/Ortsteile (außer wenn explizit überschrieben)
- Rolle auf **Gemeindeebene** → gilt für alle Ortsteile
- Rollen auf unterer Ebene können Berechtigungen **einschränken**, aber **nicht ohne Approval erweitern**

#### Geo-Vererbung

`geographicPermissions` wie in der Struktur, getrennt nach:

- `effectiveRegions`
- `effectiveCities`
- `effectiveDistricts`

**Auflösung zur Laufzeit:** „Hat User für diese Content-Region Leserecht?"

---

## 6. High-Performance Berechtigungsprüfung

**Kernanforderung:** „Berechtigungen eines bestimmten Users schnell bestimmen" – in beliebigen Modulen.

### 6.1 Permission Engine

Wir führen intern eine **Permission Engine** ein – logischer Bestandteil des IAM-Services, nach außen mit kleiner API:

- `GET /iam/me/permissions?context=...`
- `POST /iam/authorize` mit Payload: `{ userId, action, resourceType, resourceId?, context }` → `{ allowed: true/false, reason }`

#### Algorithmus (vereinfacht)

1. **Context-Schlüssel bestimmen**
   - z. B. `cacheKey = userId + ":" + activeOrgId`

2. **Im Cache nachsehen (Redis Hash)**
   - Enthält eine komprimierte Struktur, z. B.:

   ```json
   {
     "modules": {
       "content": { "read": true, "create": true, ... },
       "media": { ... }
     },
     "contentTypes": {
       "news": { "read": true, "publish": false, ... },
       "events": { ... }
     },
     "geo": {
       "regions": ["region_a","region_b"],
       "cities": ["city_x"]
     }
   }
   ```

3. **Falls Cache-Hit:**
   - Entscheidung anhand lokaler Strukturen (nur In-Memory-Checks)

4. **Falls Cache-Miss:**
   - Daten aus DB: Rollen, Gruppen, Overrides, Delegationen, Orghierarchie, Geo-Rechte
   - Effektive Berechtigungen berechnen
   - Ergebnis in Redis schreiben (TTL z. B. 5–10 Minuten oder Event-basiert invalidieren)
   - Result zurück an aufrufende API

### 6.2 Cache-Invalidierung

Invalidierung ist kritischer Teil:

**Bei Änderungen an:**

- Rollen eines Users
- Gruppenmitgliedschaften
- Orghierarchie, Geo-Zuordnungen

wird ein Event erzeugt: `permission.invalidate(userId, orgId)`.

**Implementierungsideen:**

- IAM-Service erzeugt Domain-Events (z. B. via Postgres NOTIFY, NATS, Kafka o. Ä.)
- Permission Engine (bzw. Worker) hört zu und löscht entsprechende Keys in Redis
- Optional: Recompute im Hintergrund (Prewarming) für kritische Accounts (Admins)

### 6.3 Nutzung im CMS

Andere CMS-Module bekommen einfachen Code (z. B. als npm-Package/SDK):

```javascript
const allowed = await iam.authorize({
  userId,
  action: 'content.publish',
  resourceType: 'news',
  resourceId: newsId,
  context: { orgId: currentOrgId, regionId }
})

if (!allowed) throw new ForbiddenError()
```

**Auch für UI:**

- `GET /iam/me/permissions` beim Login/Org-Wechsel → UI zeigt nur erlaubte Menüpunkte/Buttons

---

## 7. Workflows & Sonderfälle

### 7.1 Rollen- & Rechteänderungen mit Genehmigungsworkflow

**Ziel:** Jede relevante Rollen-/Rechteänderung durchläuft ein genehmigtes Verfahren (Vier-Augen-Prinzip).

#### Datenmodell

`iam.permission_change_requests`:

- `id`
- `requesterId`
- `targetAccountId`
- `changeSet` (JSON: welche Rollen/Permissions)
- `reason`
- `status` (pending, approved, rejected)
- `approverId`, `approvedAt`
- `createdAt`

#### Ablauf

1. Admin/App-Manager beantragt Änderung in UI („Rolle erweitern", „Custom-Rolle zuweisen")
2. IAM-Service legt `permission_change_request` an
3. Benachrichtigung an zuständigen Approver (System-Admin, Org-Admin, je nach Konfiguration)
4. Approver prüft, klickt „Genehmigen" oder „Ablehnen":
   - Bei Genehmigung: IAM-Service schreibt tatsächliche Änderungen in `account_roles`/`role_permissions` und invalidiert Permission Cache
   - Komplette Aktion wird in `activity_logs` mit hoher Severity protokolliert
5. (Optional) Eskalation bei Timeout (z. B. nach 3 Tagen auto-Reminder)

### 7.2 Temporäre Vertretungen

**Use Case:** Urlaubsvertretung, Krankheitsfälle.

#### Tabelle `iam.delegations`

- `delegatorId`
- `delegateId`
- `orgId`
- `roleId` oder `permissionSubset`
- `validFrom`, `validTo`
- `createdBy`, `approvedBy`

#### Auswertung

- Bei Berechnung der effektiven Permissions werden aktive Delegationen so behandelt, als hätte der Vertretende die Rolle
- UI zeigt klar: „Du agierst aktuell als Vertretung von X (bis Datum Y)"

### 7.3 Impersonation / Rolle eines Nutzers übernehmen (Support)

Sehr heikel, daher klar geregelt:

#### Mechanik

1. Support-Admin startet in UI „Impersonation von User X"
2. IAM-Service legt `support_session` an:
   - `supporterId`, `targetAccountId`, `startedAt`, optional `reason`, `ticketId`, `expiresAt`
3. Es wird kein Passwort des Users verwendet. Stattdessen:
   - Keycloak bekommt einen speziellen „support login"-Flow
   - Access-Token mit Claim `impersonating: { targetAccountId, supporterId }`
4. In allen Logs und im UI wird sichtbar:
   - „Aktion im Namen von User X, ausgelöst durch Support Y"
5. `activity_logs` zeichnet jede Handlung im Impersonation-Modus special gekennzeichnet auf

#### Sicherheitsmaßnahmen

- Nur explizite Rolle `support_admin` darf impersonieren
- Impersonation immer zeitlich begrenzt + manuell abbrechbar
- Optional: Vier-Augen-Approval (zweiter Admin muss bestätigen)

### 7.4 Content-Besitzer & Änderungsanträge

#### Owner-Konzept

Inhalte im Content-Modul besitzen Felder wie:

- `ownerAccountId`
- `ownerOrganizationId`

**Owner entscheidet:**

- Wer direkt bearbeiten darf (z. B. via Gruppen/ACL)
- Ob Änderungen direkt übernommen oder als Änderungsanträge (Change Requests) laufen

#### Change Request Modell (im Content-Modul, aber IAM-abhängig)

`content_change_requests`:

- `id`, `contentId`, `requesterId`, `requestedChanges`, `status`, `ownerId`, ...

**IAM liefert:**

- `canSubmitChangeRequest`
- `canApproveChangeRequest`
- Audit-Logs, wenn Owner Requests akzeptiert/ablehnt

---

## 8. Organisation & Mandantenfähigkeit

### 8.1 Mehrstufige Organisationsstrukturen

`organizations` bildet Landkreis → Gemeinde → Ortsteil sowie Unternehmen/Agenturen etc. ab.

`account_organizations` verbindet Accounts mit:

- Rolle pro Org
- Sichtbarkeit (z. B. interne/externe)

#### Context-Switch („Ich handle als …")

- User wählt im UI: „Handeln als {Private Person} oder {Gemeinde Musterstadt}"
- Dieser Kontext fließt:
  - als Claim im Token (`acting_as_org_id`) oder
  - im jeweiligen API-Request-Header
- Permission Engine bewertet Berechtigungen im Kontext dieser Rolle/Organisation

### 8.2 Namensnennung vs. anonym

- Organisation hat Setting: `contentAuthorPolicy = "org_only" | "org_or_personal"`
- User hat Setting: `allowNameDisclosure = boolean` (default: false)
- Wenn beides „ok" → Name darf angezeigt werden
- Sonst: Anzeige „Veröffentlicht im Namen von {Organisation}"

---

## 9. Authentifizierung & Sicherheit – Architektur-Entscheidungen

Kurzfassung, wie die Anforderungen umgesetzt werden:

### Zentraler Login via Keycloak (OIDC)

- CMS ist ein OIDC-Client (z. B. „cms-frontend", „cms-api")

### Passwort-Policies, 2FA, Passkeys

- In Keycloak konfiguriert; CMS zeigt nur UI-Hinweise

### SAML/OIDC für Kommunal-AD, BundID, Servicekonto

- Jeweils als Identity Provider in Keycloak konfiguriert
- Mapping von Attributen (z. B. AD-Gruppen) auf Systemrollen → Keycloak-Mapping + IAM-Role-Mapping

### Inaktive Konten

- Batch-Job im IAM, der anhand `lastLogin` und `status` automatisch Accounts auf „inactive" setzt, Keycloak-User disabled & Sessions revoked

### Sicherheitsereignisse & SIEM

- Keycloak-Events + IAM-`activity_logs` werden an ein zentrales Logging/SIEM-System (z. B. via Webhooks oder Log-Forwarder) gefüttert

---

## 10. Schnittstellen

### 10.1 IAM-Service APIs (intern für CMS)

Beispiele (REST):

- `GET /iam/me`
- `GET /iam/me/permissions?orgId=...`
- `POST /iam/authorize`
- `GET /iam/accounts`
- `POST /iam/accounts`
- `POST /iam/permission-change-requests`
- `POST /iam/delegations`
- `POST /iam/impersonations`

Diese können intern via API-Gateway nur für CMS-Services erreichbar sein.

### 10.2 Events & Webhooks

IAM stößt Events an, die andere Module nutzen können:

- `iam.account.created/updated/disabled`
- `iam.role-assigned`
- `iam.permission.changed`
- `iam.legal-text.accepted`
- `iam.org.created/updated`

Für externe Systeme (z. B. HR, Drittsysteme) können Webhooks aus dem bestehenden Event-Stream bedient werden.

---

## 11. Einführungs- & Umsetzungsschritte

### Phase 1 – Basis (MVP IAM + Keycloak-Integration)

1. Keycloak-Realm & Clients einrichten (CMS-Frontend/-Backend)
2. `accounts`, `organizations`, `roles`, `groups` in Postgres aufsetzen
3. Minimaler IAM-Service:
   - Synchronisation Keycloak-User ↔ `iam.accounts`
   - 7 Personas als Rollen
   - Basis-Permission-Checks für Content/Media/Settings
   - Permission Engine mit Redis-Cache (einfaches RBAC, noch ohne komplexe Vererbung)
4. UI-Basics: Benutzerliste, Rollenvergabe, Organisationszuordnung

### Phase 2 – Erweiterung (Workflows, Vererbung, Custom-Rollen)

1. Rollen-Vererbung über Orghierarchie & Geo-Rechte implementieren
2. Permission-Change-Workflow + Vertretungsrechte
3. Rechtstext-Modul + Akzeptanztracking
4. Reporting-Dashboards für Accounts/Rollen/Compliance

### Phase 3 – Enterprise-Features

1. Impersonation mit strengen Logs & ggf. Approval
2. SCIM, tiefere HR-Integration, automatisches Offboarding
3. Real-Time-Updates von Berechtigungen (WebSockets/Supabase Realtime)
4. Agency-Admin / Cross-Tenant-Administration

---

## Anhang: Zielgruppen und Nutzer:innen

### Primäre Anwender:innen im CMS

#### 1. System-Administrator (Persona 1)

- Vollständige Verwaltung aller Accounts
- Rollen- und Berechtigungsmanagement
- Organisations-Verwaltung
- Pflege von Rechtstexten
- System-Konfiguration

#### 2. App-/Feature-Manager (Persona 2)

- Verwaltung von Accounts innerhalb eigener Organisation
- Zuweisung von Rollen (außer Super-Admin)
- Verwaltung von Teams und Gruppen
- Monitoring von Nutzeraktivitäten

#### 3. Designer (Persona 3)

- Design-Verwaltung, Branding, Corporate Design
- White-Label-Anpassungen

#### 4. Redakteur/Editor (Persona 4)

- Content-Erstellung und -pflege
- Veröffentlichung nach Freigabe

#### 5. Interface-Manager (Persona 5)

- Schnittstellen, API-Anbindungen
- Externe System-Integrationen

#### 6. Moderator (Persona 6)

- Verwaltung von Content-Creator-Accounts
- Überwachung von Benutzeraktivitäten
- Eskalation bei Verstößen

#### 7. Strategischer Entscheider (Persona 7)

- Read-Only-Zugriff auf Nutzerstatistiken
- Reporting über Rollen-Verteilung
- Compliance-Berichte

### Endnutzer:innen (Selbstverwaltung)

**Alle CMS-Nutzer:**

- Profilverwaltung (Name, Email, Passwort)
- Sprach- und Zeitzoneneinstellungen
- Zwei-Faktor-Authentifizierung aktivieren
- Eigene Berechtigungen einsehen
- Akzeptanz von Rechtstexten

### Weitere Stakeholder

- **Datenschutzbeauftragte**: Audit-Logs, Löschkonzept, Rechtstexte
- **IT-Security-Team**: Berechtigungskonzepte, 2FA-Rollout
- **Rechtsabteilung**: Rechtstexte, Versionierung, Compliance
- **HR-Abteilung**: Onboarding/Offboarding-Prozesse
