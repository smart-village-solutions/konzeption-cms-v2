# Paketarchitektur – Erweiterte Version

## Anforderungen

### 1. Plugin-/Paket-Ansatz (Build-time zuerst)

Das CMS basiert auf einer modularen Plugin-Architektur, die Erweiterbarkeit durch klar definierte Pakete ermöglicht:

* **Erweiterbarkeit durch Pakete:** Statt Code zu duplizieren oder direkt in die Host-Anwendung zu integrieren, werden Features als eigenständige, wiederverwendbare Pakete entwickelt. Dies ermöglicht eine saubere Trennung zwischen Kern-Funktionalität und Erweiterungen.

* **Feature-Kapselung:** Jedes Plugin ist eine geschlossene Einheit, die alle notwendigen Komponenten enthält:
  - Menüeinträge und Navigation
  - Eigene Seiten/Routen im CMS
  - Dashboard-Widgets
  - Benutzerdefinierte Formularfelder
  - Konfigurationsoptionen (Settings)
  - Berechtigungen und Zugriffskontrollen

* **Build-time vs. Runtime:**
  - **Phase 1 (Start):** Plugins werden zur Build-Zeit kompiliert und fest in die Anwendung integriert. Dies garantiert Stabilität, Sicherheit und Performance.
  - **Phase 2 (später):** Optional können Runtime-Plugins hinzugefügt werden, die dynamisch geladen werden. Dies ist jedoch keine Voraussetzung für den Start und wird erst bei Bedarf (z.B. für externe Partner-Plugins) implementiert.

**Vorteil:** Klare Trennung, keine „Spaghetti-Imports", bessere Wartbarkeit und Testbarkeit.

---

### 2. Frontend-Stack: TypeScript + React (Vue als Option)

Die technische Basis des CMS:

* **Primärer Stack:** Das CMS wird in **TypeScript** entwickelt, mit **React** als primärem UI-Framework. TypeScript bietet Typsicherheit und bessere Entwickler-Erfahrung, React ist etabliert und hat ein großes Ökosystem.

* **Vue als Alternative:** Die Architektur ist so gestaltet, dass Vue als Alternative zu React genutzt werden kann, ohne die Kern-Logik umschreiben zu müssen. Dies wird durch strikte Trennung von UI-Framework und Business-Logik erreicht.

* **Framework-Agnostizität:** Vue/React werden nur als „Adapter-Schicht" behandelt:
  - Die gesamte Fachlogik (Business Logic) ist framework-unabhängig
  - UI-Frameworks rendern nur, was aus der Registry kommt
  - Ein Wechsel des Frameworks betrifft nur die Render-Schicht, nicht die Domänen-Logik

* **Backend:** Das bestehende **Ruby on Rails Backend mit GraphQL-API** bleibt erhalten. Das CMS kommuniziert ausschließlich über GraphQL mit dem Backend. Es gibt keine direkte Datenbank-Anbindung im Frontend.

**Vorteil:** Flexibilität bei der Framework-Wahl, ohne die Architektur neu aufbauen zu müssen.

---

### 3. Stabile Plugin-API & klare Boundaries

Um „Wildwuchs" zu verhindern und eine stabile, wartbare Architektur zu gewährleisten:

* **Ein SDK als einzige Schnittstelle:** Das `@cms/sdk` Paket ist die **einzige offizielle Schnittstelle** zwischen Plugins und dem Host-System. Plugins dürfen ausschließlich über dieses SDK mit dem CMS interagieren.

* **Verhinderte Wildwuchs-Importe:**
  - Plugins dürfen **nicht** direkt aus der Host-Anwendung (`apps/cms-admin`) importieren
  - Plugins dürfen **nicht** auf interne Implementierungsdetails zugreifen
  - Alle Importe werden durch ESLint-Regeln und TypeScript-Path-Mapping kontrolliert
  - CI/CD-Pipeline schlägt fehl bei Boundary-Verletzungen

* **Klare Extension Points:** Das SDK definiert genau, was ein Plugin tun darf:
  - Navigation registrieren
  - Routen/Seiten hinzufügen
  - Widgets bereitstellen
  - Formularfelder definieren
  - Settings-Schemas deklarieren
  - Berechtigungen definieren

**Vorteil:** Langfristige Wartbarkeit, klare Upgrade-Pfade, keine unerwarteten Breaking Changes.

---

### 4. Mandantenfähigkeit, Rollen & Rechte, Auditierbarkeit

Multi-Tenancy und Berechtigungen als Kernfeature der Architektur:

* **Multi-Tenancy:** Das CMS unterstützt mehrere Mandanten (Kommunen) in einer Installation. Jede Kommune hat:
  - Eigene Daten (Content, Benutzer, Einstellungen)
  - Eigenes Design/Theme
  - Eigene Modul-Aktivierungen
  - Strikte Datentrennung durch Row-Level Security im Backend

* **RBAC (Role-Based Access Control):**
  - Berechtigungen werden über ein Capability-System verwaltet
  - Rollen sind Sammlungen von Capabilities (z.B. `news.read`, `news.write`, `news.publish`)
  - Plugins deklarieren ihre benötigten Capabilities im Manifest
  - Das Auth-System prüft Berechtigungen vor jedem Zugriff

* **UI-Integration:**
  - UI-Elemente werden automatisch basierend auf Berechtigungen ein-/ausgeblendet
  - Keine manuellen Permission-Checks im UI-Code nötig
  - Das Runtime-System rendert nur, was der Benutzer sehen darf

* **Auditierbarkeit:**
  - Alle Aktionen werden geloggt (wer, was, wann)
  - Änderungshistorie für Content
  - Compliance mit DSGVO-Anforderungen

**Vorteil:** Sicheres Multi-Tenancy, granulare Berechtigungen, DSGVO-Konformität.

---

### 5. Qualität & Betrieb

Professionelle Software-Engineering-Praktiken als Standard:

* **Reproduzierbare Builds:**
  - Lockfiles (package-lock.json, yarn.lock) werden committet
  - Exakte Versionen für alle Dependencies
  - Docker-Container für konsistente Build-Umgebungen

* **CI/CD-Pipeline:**
  - Automatisierte Tests (Unit, Integration, E2E)
  - Linting & Code-Style-Checks
  - Bundle-Size-Monitoring
  - Security-Scans (npm audit, Dependabot)
  - Quality Gates: Build schlägt fehl bei Test-/Lint-Fehlern

* **Testbarkeit:**
  - Architektur ermöglicht einfaches Unit-Testing (durch klare Trennung)
  - Integration Tests für Plugin-Interaktionen
  - E2E-Tests für kritische User-Flows

* **Versionierung & Releases:**
  - Semantic Versioning für SDK und Plugins
  - Automatische Changelogs
  - Upgrade-Guides für Breaking Changes

* **Security & Trust:**
  - Kontrollierte Paketquellen (private npm Registry möglich)
  - Kein ungeprüfter Code im Client (keine Runtime-Eval)
  - Code Reviews für alle Plugin-Integrationen
  - Security Audits vor Major Releases

**Vorteil:** Produktionsreife Software, minimale Betriebsprobleme, schnelle Fehlersuche.

---

### 6. KI-Integration via MCP (Model Context Protocol)

Moderne KI-Funktionen werden standardisiert integriert:

* **MCP-Standard:**
  - Model Context Protocol ist ein offener Standard für LLM-Integration
  - Ermöglicht einheitliche Anbindung verschiedener KI-Anbieter
  - Verhindert Vendor-Lock-in (nicht an OpenAI/Claude gebunden)

* **Flexible Provider-Anbindung:**
  - Support für OpenAI (GPT-4, GPT-4o)
  - Support für Anthropic (Claude)
  - Support für lokale Modelle (Ollama, LM Studio)
  - Selbst-gehostete LLMs möglich (für Datenschutz-sensible Kommunen)

* **KI-Funktionen:**
  - **Content-Assistenz:** KI hilft beim Schreiben von Texten (News, Events, etc.)
  - **Alt-Text-Generierung:** Automatische Bildbeschreibungen für Barrierefreiheit
  - **Übersetzungen:** Mehrsprachiger Content (i18n-Unterstützung)
  - **Zusammenfassungen:** Automatische Kurzbeschreibungen
  - **Chatbot:** LLM-basierter Bürger-Support (in Mobile App)

* **Architektur:**
  - `packages/mcp-client` abstrahiert Provider-Details
  - Plugins nutzen MCP-Client über SDK
  - API-Keys werden sicher im Backend verwaltet
  - Rate Limiting & Cost Control

**Vorteil:** Moderne KI-Features ohne Abhängigkeit von einem Anbieter, DSGVO-konform durch lokale Modelle möglich.

---

### 7. Externe Services (außerhalb der Paketarchitektur)

Das CMS integriert sich mit professionellen Infrastruktur-Services:

* **Monitoring (Prometheus & Grafana):**
  - **Prometheus:** Metriken-Sammlung (Response Times, Error Rates, Ressourcen-Nutzung)
  - **Grafana:** Visualisierung der Metriken in Dashboards
  - CMS exportiert Metriken über `/metrics` Endpoint
  - Alerting bei Problemen (z.B. API-Fehlerrate > 5%)

* **Logging (Loki / ELK-Stack):**
  - **Loki:** Log-Aggregation (von Grafana Labs, kompatibel mit Grafana)
  - **ELK-Stack:** Alternative (Elasticsearch, Logstash, Kibana)
  - Strukturierte Logs (JSON-Format)
  - Zentrale Log-Auswertung über alle CMS-Instanzen
  - Fehleranalyse und Debugging

* **Suche (MeiliSearch):**
  - **Volltext-Suche** für Content (News, Events, POIs, etc.)
  - Typo-Toleranz, Facetten-Suche, Highlighting
  - Schnelle Response Times (< 50ms)
  - Auto-Sync: GraphQL → MeiliSearch Index
  - Alternative zu Elasticsearch (leichtgewichtiger)

* **Integration:**
  - CMS enthält Client-Pakete (`monitoring-client`, `search-client`)
  - Services laufen **außerhalb** des CMS (separate Container/VMs)
  - Keine Code-Abhängigkeiten, nur Konfiguration

**Vorteil:** Professionelles Monitoring ohne CMS-Komplexität, bewährte Tools, hohe Performance.

---

### 8. CMS ≠ Mobile App

Klare Trennung zwischen Verwaltungs-CMS und Bürger-App:

* **Zwei getrennte Systeme:**
  - **CMS (dieses Projekt):** Admin-Oberfläche für Redakteure und Administratoren
  - **Mobile App (separates Repo):** Bürger-Frontend für iOS, Android, Web

* **CMS verwaltet die App:**
  - **Content:** Redakteure erstellen News, Events, POIs, etc. im CMS
  - **Design:** Theme-Editor definiert Farben, Logos, Schriften für die App
  - **Konfiguration:** Welche Module sind aktiv? Welche Sprachen? Welche Features?
  - **Berechtigungen:** Wer darf was im CMS tun?
  - **Module:** Welche Features sieht der Bürger in der App?

* **Technische Unabhängigkeit:**
  - Mobile App und CMS teilen **keine** Code-Basis
  - Kommunikation ausschließlich über **GraphQL API** (Rails Backend)
  - Mobile App ist **Offline-First** (eigener Datencache)
  - CMS ist **Online-Only** (Redakteure arbeiten immer mit Internetverbindung)

* **Datenfluss:**
  ```
  Redakteur → CMS → Rails Backend → PostgreSQL
                        ↓
                    GraphQL API
                        ↓
                   Mobile App → Bürger
  ```

* **Vorteile:**
  - Mobile App kann unabhängig vom CMS entwickelt werden
  - Unterschiedliche Tech-Stacks möglich (z.B. React Native, Flutter)
  - Einfacheres Deployment (CMS ≠ App Updates)
  - Klare Verantwortlichkeiten

**Vorteil:** Saubere Architektur, einfachere Wartung, flexiblere Entwicklung.

---

> **Hinweis:** Dies ist die erweiterte, ausführliche Version der Anforderungen. Die vollständige Architektur-Dokumentation finden Sie in [Paketarchitektur.md](Paketarchitektur.md).
1. **Framework-agnostischer Kern = Entscheidungsfreiheit**
   Ihr trennt konsequent:

* *Was* das CMS tut (Domain/Fachlogik) vs. *wie* es gerendert wird (Vue/React).
  So bleibt die Vue/React-Entscheidung eine UI-Frage, nicht eine Systemfrage.

2. **SDK als Vertrag statt „Hooks überall“**
   Ein stabiles `@cms/sdk` mit wenigen, klaren Extension Points ist langfristig wartbar:

* Plugins integrieren über Contracts
* Host implementiert Renderer/Slots für die Contracts
* Breaking Changes werden über SDK-Versionierung steuerbar

3. **Monorepo + Workspaces für Geschwindigkeit und Konsistenz**
   Ein Repository, ein Tooling-Set, klare Build-/Test-Pipelines.
   Später könnt ihr einzelne Plugins/SDK auskoppeln, wenn Partner-/Community-Druck steigt.

4. **Build-time Plugins als sicherer Start**
   Ihr vermeidet die typischen Runtime-Probleme (CSP/CORS, Live-Supply-Chain, Offline, Kompatibilität).
   Gleichzeitig bleibt der Weg zu Runtime offen, weil ihr schon eine saubere Plugin-Grenze habt.

---

## Architekturvorschlag: Schichten, Pakete, Regeln

### Leitprinzip

**„Contracts zuerst“:** Alles, was Plugins und Host verbindet, ist explizit im SDK beschrieben.
**„Core ohne UI“:** Fachlogik kennt kein Vue/React.
**„UI ist Adapter“:** Vue/React rendert nur, was aus Registry/Contracts kommt.

---

## Repository- und Paketstruktur

### Top-Level

```
smart-village-cms/
  apps/
    cms-admin/                 # CMS Admin UI (TypeScript + React)
    api/                       # Ruby on Rails + GraphQL API (bestehendes Backend)

  packages/
    sdk/                       # Plugin Contracts + Registry + Capabilities (KEIN UI)
    core/                      # Domainlogik, Modelle, Validierung (KEIN UI)
    data/                      # GraphQL Clients (Apollo/urql), DTOs, Caching
    auth/                      # RBAC-Checks, Policy-Helpers, Row-Level Security
    config/                    # shared configs, schemas, build tooling
    ui-contracts/              # Design Tokens + UI-Kontrakte (KEIN React/Vue)
    runtime-contracts/         # Slot-/Extension-Point-Definitionen
    ui-react/                  # React Design System (Primär)
    ui-vue/                    # (optional) Vue Design System
    runtime-react/             # React Adapter/Renderer für SDK-Registry
    runtime-vue/               # (optional) Vue Adapter/Renderer
    mcp-client/                # MCP (Model Context Protocol) Client für KI-Integration
    api-manager/               # API Management: externe APIs, Webhooks, Schema.org, GeoJSON
    theme-engine/              # Theme-Editor Engine, Design Tokens, CSS Variables
    app-config/                # App-Design & Konfiguration (Multi-Tenancy Settings)
    monitoring-client/         # Clients für Prometheus, Loki, Grafana
    search-client/             # MeiliSearch Integration

  plugins/
    # --- Basis-Module (Milestone 1-2) ---
    news/
      core/
      ui-react/
    events/
      core/
      ui-react/
    pois/                      # Points of Interest
      core/
      ui-react/
    tours/
      core/
      ui-react/
    media/
      core/
      ui-react/
    users-roles/
      core/
      ui-react/
    workflows/
      core/
      ui-react/

    # --- Kommunal-Module ---
    waste-calendar/            # Abfallkalender
      core/
      ui-react/
    defect-reporter/           # Mängelmelder
      core/
      ui-react/
    construction-sites/        # Baustellen & Verkehrsstörungen
      core/
      ui-react/
    public-participation/      # Bürgerbeteiligung
      core/
      ui-react/
    survey-tool/               # Umfrage-Tool
      core/
      ui-react/
    deadline-reminder/         # Fristenmelder
      core/
      ui-react/

    # --- Mobility & Services ---
    parking/
      core/
      ui-react/
    car-sharing/
      core/
      ui-react/
    bike-sharing/
      core/
      ui-react/
    weather/
      core/
      ui-react/

    # --- Content & Widgets ---
    content-widget/            # Generischer Content-Block
      core/
      ui-react/
    image-slider/
      core/
      ui-react/
    event-widget/
      core/
      ui-react/
    dashboard/                 # Dashboard mit Widget-Store
      core/
      ui-react/

    # --- KI & Erweitert (Milestone 9) ---
    ai-assistant/              # KI-Content-Assistenz (via MCP)
      core/
      ui-react/
    chatbot/                   # Chatbot-Integration
      core/
      ui-react/

    # --- System ---
    help-support/              # Hilfe, Dokumentation, Ticketsystem
      core/
      ui-react/
    onboarding/                # Onboarding-Tour
      core/
      ui-react/

  docs/
  tooling/
  prisma/                      # Prisma Schema (falls für CMS-Metadaten genutzt)
```

### Was kommt *wo* hin?

#### `packages/sdk`

Enthält:

* Plugin-Typen (`Plugin`, `PluginManifest`)
* Registries (Navigation, Routes, Widgets, FieldTypes, SettingsSchemas)
* Capability-/Permission-Model (RBAC)
* Lifecycle-Hooks (sparsam!): `onRegister`, `onInit`, evtl. domain-spezifische Events

Enthält **nicht**:

* Vue/React Imports
* konkrete UI-Komponenten
* direkte API-Calls (das ist `data`)

#### `packages/core` – **Fachlogik & Domänen**

Enthält:

* Content-Modelle, Validierungsregeln, State Machines (z. B. Draft → Review → Published)
* Domänenservices (z. B. „Publish Content“, „Assign Role“)
* DTO-Definitionen (framework-agnostisch)

Enthält **nicht**:

* HTTP/GraphQL-Clients
* UI
* Storage-Implementierungen, die an ein Framework koppeln

#### `packages/data` – **Datenzugriffsschicht**

Enthält:

* GraphQL/REST-Clients (Fetch/Apollo/urql – egal, aber konsistent)
* Cache-Strategie, Retry, Pagination
* Mapper von API → Domain DTOs

Regel: UI und Plugins rufen **nie** direkt „fetch irgendwo“ auf, sondern über `data`.

#### `packages/auth` – **Berechtigungen & Policies**

Enthält:

* Capability-Checks (`can(user, capability, resource?)`)
* Rollen-/Rechte-Mapping, Helpers für UI Guards
* (Optional) Policy-Engine light (z. B. ABAC-Regeln als Ergänzung)

Regel: Plugins deklarieren Capabilities im SDK, `auth` setzt sie durch.

#### `packages/ui-contracts` – **Design System ohne Framework**

Enthält:

* Design Tokens (Farben, Spacing, Typography)
* UI-Kontrakte für generische Renderer (Form schema, table schema, action schema)

Ziel: möglichst viel UI kann schema-driven sein, unabhängig von Vue/React.

#### `packages/mcp-client` – **KI-Integration via Model Context Protocol**

Enthält:

* MCP-Client für standardisierte LLM-Provider-Anbindung
* Abstraktion für verschiedene KI-Services (OpenAI, Claude, lokale Modelle)
* Tools: Content-Generierung, Alt-Text, Übersetzung, Zusammenfassungen
* Provider-Management UI (Config für API-Keys, Modell-Auswahl)

Enthält **nicht**:

* konkrete UI-Komponenten (nur Contracts)
* direkte API-Keys (werden über Backend/Env-Vars verwaltet)

#### `packages/api-manager` – **API Management & externe Integrationen**

Enthält:

* API-Registry für externe Datenquellen (REST/GraphQL)
* Webhook-Management (eingehend/ausgehend)
* Schema.org Export/Import
* GeoJSON-Import für Geodaten
* API-Key-Verwaltung, Rate Limiting, Caching
* Transformation-Layer (externe APIs → interne Modelle)

**Integration:** Als eigenständiges Paket, aber mit Plugin-Support:
- Plugins können APIs registrieren (z. B. `waste-calendar` registriert Abfallkalender-API)
- UI für API-Verwaltung in separatem Admin-Bereich

#### `packages/theme-engine` – **Theme-Editor & Design-System**

Enthält:

* Theme-Schema (Farben, Schriften, Abstände, Logos)
* CSS Variables Generator
* Theme-Presets & Templates
* Live-Preview-Engine
* Theme-Export/-Import (JSON)

Regel: Themes sind Tenant-spezifisch, aber mit globalen Defaults.

#### `packages/app-config` – **App-Design & Instanz-Konfiguration**

Enthält:

* Instanz-Management (Multi-Tenancy)
* App-Konfiguration (Name, Logo, Farben, Module, Sprachen)
* i18n-Verwaltung (Übersetzungen, Sprachauswahl)
* Modul-Aktivierung/Deaktivierung pro Instanz
* E-Mail-Templates & SMTP-Config
* Feature-Flags

Regel: Ersetzt bisherige YAML/JSON-Konfigurationsdateien durch UI.

#### `packages/monitoring-client` – **Integration externer Monitoring-Services**

Enthält:

* Prometheus Metrics Client (für CMS-interne Metriken)
* Loki Log-Shipping
* Grafana Dashboard Configs
* Alerting-Regeln

Enthält **nicht**:

* Die Monitoring-Services selbst (laufen extern)

#### `packages/search-client` – **MeiliSearch Integration**

Enthält:

* MeiliSearch Client
* Index-Management
* Search-Facetten, Filter, Highlighting
* Sync-Logik (GraphQL → MeiliSearch)

Regel: Plugins registrieren ihre Inhalte zur Indizierung.

#### `packages/runtime-vue|runtime-react` – **Host-Adapter**

Enthält:

* Registry-Renderer (Navigation bauen, Routen mounten, Widget-Slots rendern)
* Error Boundaries, Permission Gates, Plugin Activation/Deactivation
* Brücke zwischen `ui-contracts` und konkreten Komponenten

Hier entscheidet sich Vue/React – aber nur hier.

#### `plugins/*` – **Features als Pakete**

Jedes Plugin ist idealerweise zweigeteilt:

* `plugins/<name>/core`:

  * Domainlogik, plugin-spezifische Services, Settings-Defaults, schema definitions
  * Keine Vue/React Imports.

* `plugins/<name>/ui-vue` / `ui-react` (optional):

  * tatsächliche Screens/Widgets, die der Host rendert
  * nutzt nur `sdk`, `data`, `auth`, `ui-*` (nicht Host-Interna!)

---

## Plugin-Integrationsmodell (klar nachvollziehbar)

### Plugin Manifest (im Plugin-Paket, z. B. `plugins/events/core`)

* Deklariert:

  * `id`, `version`
  * `capabilities` (z. B. `events.read`, `events.write`)
  * `settingsSchema` (Tenant/Global)
  * `register(ctx)` – dort werden Extension Points befüllt

**Regel:** Alles, was im Host sichtbar ist, kommt **über `register(ctx)`**.

### Extension Points (Minimal-Set)

* **Navigation**: Menüpunkte, Gruppen, Labels
* **Routes/Screens**: „Seiten“ des CMS
* **Widgets**: Dashboards, Sidepanels, Detail-Widgets
* **Field Types**: z. B. `locationPicker`, `richText`, `mediaRef`
* **Settings**: JSON Schema / UI schema für Admin-Konfiguration
* **Permissions**: deklarativ + enforced by Host/Auth

So ist 100% klar: „Wenn es UI ist, muss es irgendwo in einer Registry auftauchen.“

---

## Abhängigkeitsregeln (damit „klar ist, was wo hinkommt“)

### Erlaubte Imports

* `plugins/*/*` dürfen importieren:

  * `@cms/sdk`
  * `@cms/core`
  * `@cms/data`
  * `@cms/auth`
  * `@cms/ui-contracts`
  * optional `@cms/ui-vue|ui-react` (nur in ui-* Paketen)

### Verbotene Imports

* Plugins dürfen **niemals** aus `apps/admin-web` importieren.
* `packages/core` darf **niemals** aus `ui-*`, `runtime-*` importieren.
* `packages/sdk` darf **niemals** aus `data` oder `auth` importieren (SDK bleibt Vertrag, nicht Implementation).

Das erzwingt ihr technisch über:

* ESLint boundary rules / `eslint-plugin-import`
* TS path mapping + lint rules
* CI Fail bei Boundary-Verletzung

---

## Versionierung & Release-Strategie (einfach startbar)

### Phase 1 (Start): „Single Release“

* `admin-web` + alle first-party Plugins werden gemeinsam versioniert und deployed.
* QA bleibt linear und überschaubar.

### Phase 2 (wenn Partner-Plugins kommen): „SDK-Vertrag“

* Plugins pinnen `peerDependency` auf `@cms/sdk`.
* Host kann Plugins unabhängig upgraden – *aber nur*, wenn SDK-Compatibility passt.

---

## Entscheidungsneutralität Vue vs React (praktisch abgesichert)

* Der komplette „Kern“ (`core`, `sdk`, `data`, `auth`, `contracts`) bleibt gleich.
* Ein Framework-Wechsel betrifft primär:

  * `apps/admin-web`
  * `runtime-vue` ↔ `runtime-react`
  * (optional) plugin UI layer `ui-vue` ↔ `ui-react`

Wenn ihr zusätzlich **schema-driven UI** konsequent nutzt (über `ui-contracts`), reduziert ihr den Anteil framework-spezifischer Plugin-UI drastisch.

---

## Kurz: „Was gehört wohin?“ als Merksatz

* **`sdk`**: Verträge, Registry, Capabilities, *keine Implementierung*
* **`core`**: Fachlogik, Modelle, Workflows, *keine UI*
* **`data`**: GraphQL Zugriff (Rails API), Caching, DTO Mapping
* **`auth`**: Berechtigungen/Policies, RBAC, Row-Level Security
* **`ui-contracts`**: schema/tokens, UI als Daten
* **`runtime-react`**: React-Renderer für Registry + Slots (primär)
* **`runtime-vue`**: Vue-Renderer (optional)
* **`mcp-client`**: KI-Integration via Model Context Protocol
* **`api-manager`**: externe APIs, Webhooks, Schema.org, GeoJSON
* **`theme-engine`**: Theme-Editor, Design Tokens, CSS Variables
* **`app-config`**: Instanz-Management, App-Konfiguration, i18n
* **`monitoring-client`**: Prometheus, Loki, Grafana Integration
* **`search-client`**: MeiliSearch Integration
* **`plugins/*`**: 60+ Features (core + ui-react), nur über SDK integriert

---

## Systemlandschaft: CMS – Backend – Mobile App

### Drei getrennte Systeme

```
┌─────────────────────┐         ┌─────────────────────┐         ┌─────────────────────┐
│   CMS Admin UI      │         │   Rails Backend +   │         │  Smart Village App  │
│  (TypeScript/React) │◄────────│   GraphQL API       │────────►│    (Mobile/Web)     │
│                     │         │                     │         │                     │
│  - Content-Editor   │         │  - Datenmodelle     │         │  - Bürger-Frontend  │
│  - User-Management  │         │  - Business Logic   │         │  - Content-Anzeige  │
│  - Theme-Editor     │  GraphQL│  - PostgreSQL       │  GraphQL│  - Interaktionen    │
│  - API-Manager      │         │  - Row-Level Sec.   │         │  - Offline-Support  │
│  - Module-Config    │         │  - Multi-Tenancy    │         │                     │
│  - Analytics        │         │  - Job Queue        │         │                     │
└─────────────────────┘         └─────────────────────┘         └─────────────────────┘
         │                               │                               │
         │                               │                               │
         └───────────────┬───────────────┴───────────────┬───────────────┘
                         │                               │
                         ▼                               ▼
              ┌──────────────────────┐       ┌──────────────────────┐
              │  Externe Services    │       │  KI-Services (MCP)   │
              │  - Prometheus        │       │  - OpenAI/Claude     │
              │  - Loki/Grafana      │       │  - Content-Assistenz │
              │  - MeiliSearch       │       │  - Alt-Text Gen.     │
              └──────────────────────┘       └──────────────────────┘
```

### Verantwortlichkeiten

**CMS Admin UI (dieses Repo):**
- Content-Management für Redakteure
- Theme-/Design-Verwaltung
- Benutzer-/Rollen-Verwaltung
- Modul-Konfiguration
- Analytics & Monitoring-Dashboards
- API-Management UI

**Rails Backend (bestehendes System):**
- Datenhaltung (PostgreSQL + Prisma evtl. für CMS-Metadaten)
- GraphQL API (für CMS UND Mobile App)
- Business Logic, Validierung
- Multi-Tenancy (Row-Level Security)
- Job Processing (Sidekiq)
- Webhook-Ausführung

**Mobile App (separates Repo):**
- Bürger-Frontend (React Native / Flutter / Progressive Web App)
- Konsumiert GraphQL API
- Offline-First Architektur
- Push-Notifications
- Kein direkter CMS-Zugriff

### Kommunikation

- **CMS ↔ Backend:** GraphQL Queries/Mutations (vollständige CRUD-Operationen)
- **Mobile App ↔ Backend:** GraphQL Queries (hauptsächlich Read-Only, User-Generated Content via Mutations)
- **CMS → MCP:** HTTP/WebSocket (KI-Anfragen)
- **Backend → Externe Services:** REST/Webhooks (Monitoring, Logs, Search-Indexing)

---

## API Management: Integration & Platzierung

### Wo gehört API Management hin?

**Empfehlung:** `packages/api-manager` als eigenständiges Paket mit Plugin-Integration

### Funktionen

1. **Externe APIs verwalten**
   - REST/GraphQL Endpunkte registrieren
   - API-Keys/OAuth konfigurieren
   - Rate Limiting & Retry-Logik
   - Beispiel: Wetter-API, Verkehrsdaten, Öffnungszeiten

2. **Webhooks (eingehend/ausgehend)**
   - Webhook-URLs registrieren
   - Event-Trigger definieren (z. B. „News publiziert" → Webhook an externe Systeme)
   - Incoming Webhooks (externe Systeme pushen Daten ins CMS)

3. **Schema.org Export**
   - Content als Schema.org JSON-LD exportieren
   - Automatische Mapping-Rules (News → NewsArticle, Events → Event, POIs → Place)

4. **GeoJSON Import/Export**
   - Import von Geodaten (POIs, Touren, Baustellen)
   - Validierung & Transformation

### Architektur-Integration

```typescript
// Plugin registriert API-Bedarf
// In plugins/weather/core/index.ts
export const weatherPlugin: Plugin = {
  id: 'weather',
  register(ctx) {
    // API-Endpoint deklarieren
    ctx.apiManager.registerExternalAPI({
      id: 'openweather',
      type: 'REST',
      baseUrl: 'https://api.openweathermap.org/data/2.5',
      auth: { type: 'apiKey', key: 'OPENWEATHER_API_KEY' },
      rateLimits: { requests: 60, perMinute: true },
    });

    // Webhook für externe Updates
    ctx.apiManager.registerWebhook({
      id: 'weather-alert',
      url: '/webhooks/weather/alert',
      events: ['weather.severe_alert'],
      handler: handleWeatherAlert,
    });
  },
};
```

### UI-Integration

- Admin-Bereich: "Integrationen" oder "APIs & Webhooks"
- Liste aller registrierten APIs (von Plugins)
- API-Key-Verwaltung
- Webhook-Logs & Test-Tools
- Schema.org Mapping-Editor

---

## Module-Mapping: Anforderungen → Plugins

### Kern-Module (Milestone 1-2)

| Anforderungsdokument | Plugin-Paket | Beschreibung |
|---------------------|--------------|-------------|
| `News.md` | `plugins/news` | Nachrichten mit Kategorien, Bilder, Vorschau |
| `Events.md` | `plugins/events` | Veranstaltungen, Kalender, Buchungen |
| `POIs.md` | `plugins/pois` | Points of Interest, Karten, Öffnungszeiten |
| `Touren.md` | `plugins/tours` | Wander-/Radtouren, GPX, Wegpunkte |
| `Medienverwaltung.md` | `plugins/media` | Bilder, Videos, Dokumente, Alt-Texte |
| `Benutzer.md` | `plugins/users-roles` | Benutzer, Rollen, Rechte, SSO |

### Kommunal-Module

| Anforderungsdokument | Plugin-Paket | Beschreibung |
|---------------------|--------------|-------------|
| `Abfallkalender.md` | `plugins/waste-calendar` | Müllabfuhr-Termine, Erinnerungen |
| `Maengelmelder.md` | `plugins/defect-reporter` | Schadensmeldungen, Fotos, Status-Tracking |
| `Baustellen-Verkehrsstoerungen.md` | `plugins/construction-sites` | Baustellen, Sperrungen, Umleitungen |
| `Buergerbeteiligung.md` | `plugins/public-participation` | Umfragen, Voting, Kommentare |
| `Umfrage-Tool.md` | `plugins/survey-tool` | Umfragen erstellen, Auswertung |
| `Fristenmelder.md` | `plugins/deadline-reminder` | Fristen, Termine, Push-Notifications |

### Content & Widgets

| Anforderungsdokument | Plugin-Paket | Beschreibung |
|---------------------|--------------|-------------|
| `Content-Widget.md` | `plugins/content-widget` | Freie HTML/Markdown-Blöcke |
| `Bilderslider.md` | `plugins/image-slider` | Bildergalerien, Karussell |
| `Event-Widget.md` | `plugins/event-widget` | Event-Teaser, Filter |
| `Dashboard-mit-Widget-Store.md` | `plugins/dashboard` | Widgets, Analytics, KPIs |

### Mobilität & Services

| Anforderungsdokument | Plugin-Paket | Beschreibung |
|---------------------|--------------|-------------|
| `Parken.md` | `plugins/parking` | Parkplätze, Verfügbarkeit, Reservierung |
| `Car-Angebote.md` | `plugins/car-sharing` | Carsharing-Standorte, Verfügbarkeit |
| `Bikesharing-Angebote.md` | `plugins/bike-sharing` | Leihfahrräder, Stationen |
| `Wetter.md` | `plugins/weather` | Wettervorhersage, Unwetterwarnungen |

### KI & Erweitert (Milestone 9)

| Anforderungsdokument | Plugin-Paket | Beschreibung |
|---------------------|--------------|-------------|
| `KI.md` | `plugins/ai-assistant` | Content-KI, Alt-Text, Übersetzung |
| `Chatbot-Integration.md` | `plugins/chatbot` | LLM-basierter Chatbot für Bürger |

### System-Module

| Anforderungsdokument | Plugin-Paket | Beschreibung |
|---------------------|--------------|-------------|
| `Hilfe.md` | `plugins/help-support` | Hilfe, Doku, Ticketsystem |
| `Intro.md` | `plugins/onboarding` | Onboarding-Tour, Tooltips |

**Hinweis:** Nicht alle 60+ Module sind hier aufgeführt. Das Mapping folgt dem gleichen Prinzip.

---

## Theme-Editor & App-Design: Architektur-Details

### `packages/theme-engine` – Technische Umsetzung

#### Theme-Schema (JSON)

```json
{
  "id": "stadtwerke-blau",
  "name": "Stadtwerke Blau",
  "version": "1.0.0",
  "colors": {
    "primary": "#0066CC",
    "secondary": "#FF9900",
    "background": "#FFFFFF",
    "text": "#333333",
    "accent": "#00CC66"
  },
  "typography": {
    "fontFamily": "'Inter', sans-serif",
    "headingFontFamily": "'Roboto Slab', serif",
    "baseFontSize": "16px"
  },
  "spacing": {
    "unit": "8px",
    "containerWidth": "1200px"
  },
  "branding": {
    "logo": "/media/logo.svg",
    "favicon": "/media/favicon.ico",
    "splashScreen": "/media/splash.png"
  },
  "components": {
    "button": {
      "borderRadius": "8px",
      "shadow": "0 2px 4px rgba(0,0,0,0.1)"
    }
  }
}
```

#### CSS Variables Generator

```typescript
// packages/theme-engine/src/generator.ts
export function generateCSSVariables(theme: Theme): string {
  return `
    :root {
      --color-primary: ${theme.colors.primary};
      --color-secondary: ${theme.colors.secondary};
      --font-family: ${theme.typography.fontFamily};
      --spacing-unit: ${theme.spacing.unit};
      /* ... */
    }
  `;
}
```

#### Theme-Editor UI (React)

```typescript
// apps/cms-admin/src/pages/ThemeEditor.tsx
import { ThemeEngine } from '@cms/theme-engine';
import { ThemePreview } from '@cms/ui-react';

export function ThemeEditorPage() {
  const [theme, setTheme] = useState<Theme>(currentTheme);

  return (
    <Split>
      <ThemeEditorForm theme={theme} onChange={setTheme} />
      <ThemePreview theme={theme} />
    </Split>
  );
}
```

### `packages/app-config` – App-Konfiguration

#### Instanz-Konfiguration (Multi-Tenancy)

```typescript
// packages/app-config/src/types.ts
export interface InstanceConfig {
  id: string;
  name: string;
  domain: string;
  theme: string; // Theme-ID
  locale: string;
  availableLocales: string[];
  modules: {
    enabled: string[]; // Plugin-IDs
    config: Record<string, unknown>; // Plugin-spezifische Config
  };
  features: {
    userGeneratedContent: boolean;
    pushNotifications: boolean;
    offline: boolean;
  };
  smtp: {
    host: string;
    port: number;
    user: string;
    // ...
  };
}
```

#### UI: Instanz-Manager

- Admin-Bereich: "Instanzen" oder "Apps"
- Liste aller Mandanten/Apps
- Pro Instanz:
  - Allgemeine Einstellungen (Name, Logo, Sprachen)
  - Theme-Auswahl
  - Modul-Aktivierung (Checkboxen für alle Plugins)
  - E-Mail-Konfiguration
  - Feature-Flags

**Integration mit Theme-Editor:**
- Theme-Editor erstellt/bearbeitet Themes
- Instanz-Manager weist Themes zu
- Mobile App lädt Theme-Config via GraphQL beim App-Start
