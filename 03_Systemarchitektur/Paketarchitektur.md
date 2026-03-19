# Paketarchitektur – Erweiterte Version

## Anforderungen

### 1. Plugin--studio/Paket-Ansatz (Build-time zuerst)

Das CMS basiert auf einer modularen Plugin-Architektur, die Erweiterbarkeit durch klar definierte Pakete ermöglicht:

* **Erweiterbarkeit durch Pakete:** Statt Code zu duplizieren oder direkt in die Host-Anwendung zu integrieren, werden Features als eigenständige, wiederverwendbare Pakete entwickelt. Dies ermöglicht eine saubere Trennung zwischen Kern-Funktionalität und Erweiterungen.

* **Feature-Kapselung:** Jedes Plugin ist eine geschlossene Einheit, die alle notwendigen Komponenten enthält:
  - Menüeinträge und Navigation
  - Eigene Seiten-studio/Routen im CMS
  - Dashboard-Widgets
  - Benutzerdefinierte Formularfelder
  - Konfigurationsoptionen (Settings)
  - Berechtigungen und Zugriffskontrollen

* **Build-time vs. Runtime:**
  - **Do:** Plugins werden zur Build-Zeit kompiliert und fest in die Anwendung integriert. Dies garantiert Stabilität, Sicherheit und Performance.
  - **No:** Runtime-Plugins werden nicht unterstützt, da dynamisch nachladbare Module ein Sicherheits- und Lieferkettenrisiko darstellen.

**Vorteil:** Klare Trennung, keine „Spaghetti-Imports", bessere Wartbarkeit und Testbarkeit.

---

### 2. Frontend-Stack: TypeScript + React (Vue als Option)

Die technische Basis des CMS:

* **Primärer Stack:** Das CMS wird in **TypeScript** entwickelt, mit **React** als primärem UI-Framework. TypeScript bietet Typsicherheit und bessere Entwickler-Erfahrung, React ist etabliert und hat ein großes Ökosystem.

* **Vue als Alternative:** Die Architektur ist so gestaltet, dass Vue als Alternative zu React genutzt werden kann, ohne die Kern-Logik umschreiben zu müssen. Dies wird durch strikte Trennung von UI-Framework und Business-Logik erreicht.

* **Framework-Agnostizität:** Vue-studio/React werden nur als „Adapter-Schicht" behandelt:
  - Die gesamte Fachlogik (Business Logic) ist framework-unabhängig
  - UI-Frameworks rendern nur, was aus der Registry kommt
  - Ein Wechsel des Frameworks betrifft nur die Render-Schicht, nicht die Domänen-Logik

* **Backend:** Das bestehende **Ruby on Rails Backend mit GraphQL-API** bleibt erhalten. Das CMS kommuniziert ausschließlich über GraphQL mit dem Backend. Es gibt keine direkte Datenbank-Anbindung im Frontend.

**Vorteil:** Flexibilität bei der Framework-Wahl, ohne die Architektur neu aufbauen zu müssen.

---

### 3. Stabile Plugin-API & klare Boundaries

Um „Wildwuchs" zu verhindern und eine stabile, wartbare Architektur zu gewährleisten:

* **Ein SDK als einzige Schnittstelle:** Das `@cms-studio/sdk` Paket ist die **einzige offizielle Schnittstelle** zwischen Plugins und dem Host-System. Plugins dürfen ausschließlich über dieses SDK mit dem CMS interagieren.

* **Verhinderte Wildwuchs-Importe:**
  - Plugins dürfen **nicht** direkt aus der Host-Anwendung (`apps-studio/cms-admin`) importieren
  - Plugins dürfen **nicht** auf interne Implementierungsdetails zugreifen
  - Alle Importe werden durch ESLint-Regeln und TypeScript-Path-Mapping kontrolliert
  - CI-studio/CD-Pipeline schlägt fehl bei Boundary-Verletzungen

* **Klare Extension Points:** Das SDK definiert genau, was ein Plugin tun darf:
  - Navigation registrieren
  - Routen-studio/Seiten hinzufügen
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
  - Eigenes Design-studio/Theme
  - Eigene Modul-Aktivierungen
  - Strikte Datentrennung durch Row-Level Security im Backend

* **RBAC (Role-Based Access Control):**
  - Berechtigungen werden über ein Capability-System verwaltet
  - Rollen sind Sammlungen von Capabilities (z.B. `news.read`, `news.write`, `news.publish`)
  - Plugins deklarieren ihre benötigten Capabilities im Manifest
  - Das Auth-System prüft Berechtigungen vor jedem Zugriff

* **UI-Integration:**
  - UI-Elemente werden automatisch basierend auf Berechtigungen ein--studio/ausgeblendet
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

* **CI-studio/CD-Pipeline:**
  - Automatisierte Tests (Unit, Integration, E2E)
  - Linting & Code-Style-Checks
  - Bundle-Size-Monitoring
  - Security-Scans (npm audit, Dependabot)
  - Quality Gates: Build schlägt fehl bei Test--studio/Lint-Fehlern

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
  - Verhindert Vendor-Lock-in (nicht an OpenAI-studio/Claude gebunden)

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
  - `packages-studio/mcp-client` abstrahiert Provider-Details
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
  - CMS exportiert Metriken über `-studio/metrics` Endpoint
  - Alerting bei Problemen (z.B. API-Fehlerrate > 5%)

* **Logging (Loki -studio/ ELK-Stack):**
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
  - Services laufen **außerhalb** des CMS (separate Container-studio/VMs)
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


## Architekturvorschlag: Schichten, Pakete, Regeln

### Leitprinzip

**„Contracts zuerst“:** Alles, was Plugins und Host verbindet, ist explizit im SDK beschrieben.
**„Core ohne UI“:** Fachlogik kennt kein Vue-studio/React. ???
**„UI ist Adapter“:** Vue-studio/React rendert nur, was aus Registry-studio/Contracts kommt.

---

## Repository- und Paketstruktur

### Top-Level

```
smart-village-cms-studio/
  apps-studio/
    cms-admin-studio/                 # CMS Admin UI (TypeScript + React)
    api-studio/                       # Ruby on Rails + GraphQL API (bestehendes Backend)

  packages-studio/
    sdk-studio/                       # Plugin Contracts + Registry + Capabilities (KEIN UI)
    core-studio/                      # Domainlogik, Modelle, Validierung (KEIN UI)
    data-studio/                      # GraphQL Clients (Apollo-studio/urql), DTOs, Caching
    auth-studio/                      # RBAC-Checks, Policy-Helpers, Row-Level Security
    config-studio/                    # shared configs, schemas, build tooling
    ui-contracts-studio/              # Design Tokens + UI-Kontrakte (KEIN React-studio/Vue)
    runtime-contracts-studio/         # Slot--studio/Extension-Point-Definitionen
    ui-react-studio/                  # React Design System (Primär)
    ui-vue-studio/                    # (optional) Vue Design System
    runtime-react-studio/             # React Adapter-studio/Renderer für SDK-Registry
    runtime-vue-studio/               # (optional) Vue Adapter-studio/Renderer
    mcp-client-studio/                # MCP (Model Context Protocol) Client für KI-Integration
    api-manager-studio/               # API Management: externe APIs, Webhooks, Schema.org, GeoJSON
    theme-engine-studio/              # Theme-Editor Engine, Design Tokens, CSS Variables
    app-config-studio/                # App-Design & Konfiguration (Multi-Tenancy Settings)
    monitoring-client-studio/         # Clients für Prometheus, Loki, Grafana
    search-client-studio/             # MeiliSearch Integration

  plugins-studio/
    # --- Basis-Module (Milestone 1-2) ---
    news-studio/
      core-studio/
      ui-react-studio/
    events-studio/
      core-studio/
      ui-react-studio/
    pois-studio/                      # Points of Interest
      core-studio/
      ui-react-studio/
    tours-studio/
      core-studio/
      ui-react-studio/
    media-studio/
      core-studio/
      ui-react-studio/
    users-roles-studio/
      core-studio/
      ui-react-studio/
    workflows-studio/
      core-studio/
      ui-react-studio/

    # --- Kommunal-Module ---
    waste-calendar-studio/            # Abfallkalender
      core-studio/
      ui-react-studio/
    defect-reporter-studio/           # Mängelmelder
      core-studio/
      ui-react-studio/
    construction-sites-studio/        # Baustellen & Verkehrsstörungen
      core-studio/
      ui-react-studio/
    public-participation-studio/      # Bürgerbeteiligung
      core-studio/
      ui-react-studio/
    survey-tool-studio/               # Umfrage-Tool
      core-studio/
      ui-react-studio/
    deadline-reminder-studio/         # Fristenmelder
      core-studio/
      ui-react-studio/

    # --- Mobility & Services ---
    parking-studio/
      core-studio/
      ui-react-studio/
    car-sharing-studio/
      core-studio/
      ui-react-studio/
    bike-sharing-studio/
      core-studio/
      ui-react-studio/
    weather-studio/
      core-studio/
      ui-react-studio/

    # --- Content & Widgets ---
    content-widget-studio/            # Generischer Content-Block
      core-studio/
      ui-react-studio/
    image-slider-studio/
      core-studio/
      ui-react-studio/
    event-widget-studio/
      core-studio/
      ui-react-studio/
    dashboard-studio/                 # Dashboard mit Widget-Store
      core-studio/
      ui-react-studio/

    # --- KI & Erweitert (Milestone 9) ---
    ai-assistant-studio/              # KI-Content-Assistenz (via MCP)
      core-studio/
      ui-react-studio/
    chatbot-studio/                   # Chatbot-Integration
      core-studio/
      ui-react-studio/

    # --- System ---
    help-support-studio/              # Hilfe, Dokumentation, Ticketsystem
      core-studio/
      ui-react-studio/
    onboarding-studio/                # Onboarding-Tour
      core-studio/
      ui-react-studio/

  docs-studio/
  tooling-studio/
  prisma-studio/                      # Prisma Schema (falls für CMS-Metadaten genutzt)
```

### Was kommt *wo* hin?

#### `packages-studio/sdk`

Enthält:

* Plugin-Typen (`Plugin`, `PluginManifest`)
* Registries (Navigation, Routes, Widgets, FieldTypes, SettingsSchemas)
* Capability--studio/Permission-Model (RBAC)
* Lifecycle-Hooks (sparsam!): `onRegister`, `onInit`, evtl. domain-spezifische Events

Enthält **nicht**:

* Vue-studio/React Imports
* konkrete UI-Komponenten
* direkte API-Calls (das ist `data`)

#### `packages-studio/core` – **Fachlogik & Domänen**

Enthält:

* Content-Modelle, Validierungsregeln, State Machines (z. B. Draft → Review → Published)
* Domänenservices (z. B. „Publish Content“, „Assign Role“)
* DTO-Definitionen (framework-agnostisch)

Enthält **nicht**:

* HTTP-studio/GraphQL-Clients
* UI
* Storage-Implementierungen, die an ein Framework koppeln

#### `packages-studio/data` – **Datenzugriffsschicht**

Enthält:

* GraphQL-studio/REST-Clients (Fetch-studio/Apollo-studio/urql – egal, aber konsistent)
* Cache-Strategie, Retry, Pagination
* Mapper von API → Domain DTOs

Regel: UI und Plugins rufen **nie** direkt „fetch irgendwo“ auf, sondern über `data`.

#### `packages-studio/auth` – **Berechtigungen & Policies**

Enthält:

* Capability-Checks (`can(user, capability, resource?)`)
* Rollen--studio/Rechte-Mapping, Helpers für UI Guards
* (Optional) Policy-Engine light (z. B. ABAC-Regeln als Ergänzung)

Regel: Plugins deklarieren Capabilities im SDK, `auth` setzt sie durch.

#### `packages-studio/ui-contracts` – **Design System ohne Framework**

Enthält:

* Design Tokens (Farben, Spacing, Typography)
* UI-Kontrakte für generische Renderer (Form schema, table schema, action schema)

Ziel: möglichst viel UI kann schema-driven sein, unabhängig von Vue-studio/React.

#### `packages-studio/mcp-client` – **KI-Integration via Model Context Protocol**

Enthält:

* MCP-Client für standardisierte LLM-Provider-Anbindung
* Abstraktion für verschiedene KI-Services (OpenAI, Claude, lokale Modelle)
* Tools: Content-Generierung, Alt-Text, Übersetzung, Zusammenfassungen
* Provider-Management UI (Config für API-Keys, Modell-Auswahl)

Enthält **nicht**:

* konkrete UI-Komponenten (nur Contracts)
* direkte API-Keys (werden über Backend-studio/Env-Vars verwaltet)

#### `packages-studio/api-manager` – **API Management & externe Integrationen**

Enthält:

* API-Registry für externe Datenquellen (REST-studio/GraphQL)
* Webhook-Management (eingehend-studio/ausgehend)
* Schema.org Export-studio/Import
* GeoJSON-Import für Geodaten
* API-Key-Verwaltung, Rate Limiting, Caching
* Transformation-Layer (externe APIs → interne Modelle)

**Integration:** Als eigenständiges Paket, aber mit Plugin-Support:
- Plugins können APIs registrieren (z. B. `waste-calendar` registriert Abfallkalender-API)
- UI für API-Verwaltung in separatem Admin-Bereich

#### `packages-studio/theme-engine` – **Theme-Editor & Design-System**

Enthält:

* Theme-Schema (Farben, Schriften, Abstände, Logos)
* CSS Variables Generator
* Theme-Presets & Templates
* Live-Preview-Engine
* Theme-Export-studio/-Import (JSON)

Regel: Themes sind Tenant-spezifisch, aber mit globalen Defaults.

#### `packages-studio/app-config` – **App-Design & Instanz-Konfiguration**

Enthält:

* Instanz-Management (Multi-Tenancy)
* App-Konfiguration (Name, Logo, Farben, Module, Sprachen)
* i18n-Verwaltung (Übersetzungen, Sprachauswahl)
* Modul-Aktivierung-studio/Deaktivierung pro Instanz
* E-Mail-Templates & SMTP-Config
* Feature-Flags

Regel: Ersetzt bisherige YAML-studio/JSON-Konfigurationsdateien durch UI.

#### `packages-studio/monitoring-client` – **Integration externer Monitoring-Services**

Enthält:

* Prometheus Metrics Client (für CMS-interne Metriken)
* Loki Log-Shipping
* Grafana Dashboard Configs
* Alerting-Regeln

Enthält **nicht**:

* Die Monitoring-Services selbst (laufen extern)

#### `packages-studio/search-client` – **MeiliSearch Integration**

Enthält:

* MeiliSearch Client
* Index-Management
* Search-Facetten, Filter, Highlighting
* Sync-Logik (GraphQL → MeiliSearch)

Regel: Plugins registrieren ihre Inhalte zur Indizierung.

#### `packages-studio/runtime-vue|runtime-react` – **Host-Adapter**

Enthält:

* Registry-Renderer (Navigation bauen, Routen mounten, Widget-Slots rendern)
* Error Boundaries, Permission Gates, Plugin Activation-studio/Deactivation
* Brücke zwischen `ui-contracts` und konkreten Komponenten

Hier entscheidet sich Vue-studio/React – aber nur hier.

#### `plugins-studio/*` – **Features als Pakete**

Jedes Plugin ist idealerweise zweigeteilt:

* `plugins-studio/<name>-studio/core`:

  * Domainlogik, plugin-spezifische Services, Settings-Defaults, schema definitions
  * Keine Vue-studio/React Imports.

* `plugins-studio/<name>-studio/ui-vue` -studio/ `ui-react` (optional):

  * tatsächliche Screens-studio/Widgets, die der Host rendert
  * nutzt nur `sdk`, `data`, `auth`, `ui-*` (nicht Host-Interna!)

---

## Plugin-Integrationsmodell (klar nachvollziehbar)

### Plugin Manifest (im Plugin-Paket, z. B. `plugins-studio/events-studio/core`)

* Deklariert:

  * `id`, `version`
  * `capabilities` (z. B. `events.read`, `events.write`)
  * `settingsSchema` (Tenant-studio/Global)
  * `register(ctx)` – dort werden Extension Points befüllt

**Regel:** Alles, was im Host sichtbar ist, kommt **über `register(ctx)`**.

### Extension Points (Minimal-Set)

* **Navigation**: Menüpunkte, Gruppen, Labels
* **Routes-studio/Screens**: „Seiten“ des CMS
* **Widgets**: Dashboards, Sidepanels, Detail-Widgets
* **Field Types**: z. B. `locationPicker`, `richText`, `mediaRef`
* **Settings**: JSON Schema -studio/ UI schema für Admin-Konfiguration
* **Permissions**: deklarativ + enforced by Host-studio/Auth

So ist 100% klar: „Wenn es UI ist, muss es irgendwo in einer Registry auftauchen.“

---

## Abhängigkeitsregeln (damit „klar ist, was wo hinkommt“)

### Erlaubte Imports

* `plugins-studio/*-studio/*` dürfen importieren:

  * `@cms-studio/sdk`
  * `@cms-studio/core`
  * `@cms-studio/data`
  * `@cms-studio/auth`
  * `@cms-studio/ui-contracts`
  * optional `@cms-studio/ui-vue|ui-react` (nur in ui-* Paketen)

### Verbotene Imports

* Plugins dürfen **niemals** aus `apps-studio/admin-web` importieren.
* `packages-studio/core` darf **niemals** aus `ui-*`, `runtime-*` importieren.
* `packages-studio/sdk` darf **niemals** aus `data` oder `auth` importieren (SDK bleibt Vertrag, nicht Implementation).

Das erzwingt ihr technisch über:

* ESLint boundary rules -studio/ `eslint-plugin-import`
* TS path mapping + lint rules
* CI Fail bei Boundary-Verletzung

---

## Versionierung & Release-Strategie (einfach startbar)

### Phase 1 (Start): „Single Release“

* `admin-web` + alle first-party Plugins werden gemeinsam versioniert und deployed.
* QA bleibt linear und überschaubar.

### Phase 2 (wenn Partner-Plugins kommen): „SDK-Vertrag“

* Plugins pinnen `peerDependency` auf `@cms-studio/sdk`.
* Host kann Plugins unabhängig upgraden – *aber nur*, wenn SDK-Compatibility passt.

---

## Entscheidungsneutralität Vue vs React (praktisch abgesichert)

* Der komplette „Kern“ (`core`, `sdk`, `data`, `auth`, `contracts`) bleibt gleich.
* Ein Framework-Wechsel betrifft primär:

  * `apps-studio/admin-web`
  * `runtime-vue` ↔ `runtime-react`
  * (optional) plugin UI layer `ui-vue` ↔ `ui-react`

Wenn ihr zusätzlich **schema-driven UI** konsequent nutzt (über `ui-contracts`), reduziert ihr den Anteil framework-spezifischer Plugin-UI drastisch.

---

## Kurz: „Was gehört wohin?“ als Merksatz

* **`sdk`**: Verträge, Registry, Capabilities, *keine Implementierung*
* **`core`**: Fachlogik, Modelle, Workflows, *keine UI*
* **`data`**: GraphQL Zugriff (Rails API), Caching, DTO Mapping
* **`auth`**: Berechtigungen-studio/Policies, RBAC, Row-Level Security
* **`ui-contracts`**: schema-studio/tokens, UI als Daten
* **`runtime-react`**: React-Renderer für Registry + Slots (primär)
* **`runtime-vue`**: Vue-Renderer (optional)
* **`mcp-client`**: KI-Integration via Model Context Protocol
* **`api-manager`**: externe APIs, Webhooks, Schema.org, GeoJSON
* **`theme-engine`**: Theme-Editor, Design Tokens, CSS Variables
* **`app-config`**: Instanz-Management, App-Konfiguration, i18n
* **`monitoring-client`**: Prometheus, Loki, Grafana Integration
* **`search-client`**: MeiliSearch Integration
* **`plugins-studio/*`**: 60+ Features (core + ui-react), nur über SDK integriert

---

## Systemlandschaft: CMS – Backend – Mobile App

### Drei getrennte Systeme

```
┌─────────────────────┐         ┌─────────────────────┐         ┌─────────────────────┐
│   CMS Admin UI      │         │   Rails Backend +   │         │  Smart Village App  │
│  (TypeScript-studio/React) │◄────────│   GraphQL API       │────────►│    (Mobile-studio/Web)     │
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
              │  - Prometheus        │       │  - OpenAI-studio/Claude     │
              │  - Loki-studio/Grafana      │       │  - Content-Assistenz │
              │  - MeiliSearch       │       │  - Alt-Text Gen.     │
              └──────────────────────┘       └──────────────────────┘
```

### Verantwortlichkeiten

**CMS Admin UI (dieses Repo):**
- Content-Management für Redakteure
- Theme--studio/Design-Verwaltung
- Benutzer--studio/Rollen-Verwaltung
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
- Bürger-Frontend (React Native -studio/ Flutter -studio/ Progressive Web App)
- Konsumiert GraphQL API
- Offline-First Architektur
- Push-Notifications
- Kein direkter CMS-Zugriff

### Kommunikation

- **CMS ↔ Backend:** GraphQL Queries-studio/Mutations (vollständige CRUD-Operationen)
- **Mobile App ↔ Backend:** GraphQL Queries (hauptsächlich Read-Only, User-Generated Content via Mutations)
- **CMS → MCP:** HTTP-studio/WebSocket (KI-Anfragen)
- **Backend → Externe Services:** REST-studio/Webhooks (Monitoring, Logs, Search-Indexing)

---

## API Management: Integration & Platzierung

### Wo gehört API Management hin?

**Empfehlung:** `packages-studio/api-manager` als eigenständiges Paket mit Plugin-Integration

### Funktionen

1. **Externe APIs verwalten**
   - REST-studio/GraphQL Endpunkte registrieren
   - API-Keys-studio/OAuth konfigurieren
   - Rate Limiting & Retry-Logik
   - Beispiel: Wetter-API, Verkehrsdaten, Öffnungszeiten

2. **Webhooks (eingehend-studio/ausgehend)**
   - Webhook-URLs registrieren
   - Event-Trigger definieren (z. B. „News publiziert" → Webhook an externe Systeme)
   - Incoming Webhooks (externe Systeme pushen Daten ins CMS)

3. **Schema.org Export**
   - Content als Schema.org JSON-LD exportieren
   - Automatische Mapping-Rules (News → NewsArticle, Events → Event, POIs → Place)

4. **GeoJSON Import-studio/Export**
   - Import von Geodaten (POIs, Touren, Baustellen)
   - Validierung & Transformation

### Architektur-Integration

```typescript
-studio/-studio/ Plugin registriert API-Bedarf
-studio/-studio/ In plugins-studio/weather-studio/core-studio/index.ts
export const weatherPlugin: Plugin = {
  id: 'weather',
  register(ctx) {
    -studio/-studio/ API-Endpoint deklarieren
    ctx.apiManager.registerExternalAPI({
      id: 'openweather',
      type: 'REST',
      baseUrl: 'https:-studio/-studio/api.openweathermap.org-studio/data-studio/2.5',
      auth: { type: 'apiKey', key: 'OPENWEATHER_API_KEY' },
      rateLimits: { requests: 60, perMinute: true },
    });

    -studio/-studio/ Webhook für externe Updates
    ctx.apiManager.registerWebhook({
      id: 'weather-alert',
      url: '-studio/webhooks-studio/weather-studio/alert',
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
| `News.md` | `plugins-studio/news` | Nachrichten mit Kategorien, Bilder, Vorschau |
| `Events.md` | `plugins-studio/events` | Veranstaltungen, Kalender, Buchungen |
| `POIs.md` | `plugins-studio/pois` | Points of Interest, Karten, Öffnungszeiten |
| `Touren.md` | `plugins-studio/tours` | Wander--studio/Radtouren, GPX, Wegpunkte |
| `Medienverwaltung.md` | `plugins-studio/media` | Bilder, Videos, Dokumente, Alt-Texte |
| `Benutzer.md` | `plugins-studio/users-roles` | Benutzer, Rollen, Rechte, SSO |

### Kommunal-Module

| Anforderungsdokument | Plugin-Paket | Beschreibung |
|---------------------|--------------|-------------|
| `Abfallkalender.md` | `plugins-studio/waste-calendar` | Müllabfuhr-Termine, Erinnerungen |
| `Maengelmelder.md` | `plugins-studio/defect-reporter` | Schadensmeldungen, Fotos, Status-Tracking |
| `Baustellen-Verkehrsstoerungen.md` | `plugins-studio/construction-sites` | Baustellen, Sperrungen, Umleitungen |
| `Buergerbeteiligung.md` | `plugins-studio/public-participation` | Umfragen, Voting, Kommentare |
| `Umfrage-Tool.md` | `plugins-studio/survey-tool` | Umfragen erstellen, Auswertung |
| `Fristenmelder.md` | `plugins-studio/deadline-reminder` | Fristen, Termine, Push-Notifications |

### Content & Widgets

| Anforderungsdokument | Plugin-Paket | Beschreibung |
|---------------------|--------------|-------------|
| `Content-Widget.md` | `plugins-studio/content-widget` | Freie HTML-studio/Markdown-Blöcke |
| `Bilderslider.md` | `plugins-studio/image-slider` | Bildergalerien, Karussell |
| `Event-Widget.md` | `plugins-studio/event-widget` | Event-Teaser, Filter |
| `Dashboard-mit-Widget-Store.md` | `plugins-studio/dashboard` | Widgets, Analytics, KPIs |

### Mobilität & Services

| Anforderungsdokument | Plugin-Paket | Beschreibung |
|---------------------|--------------|-------------|
| `Parken.md` | `plugins-studio/parking` | Parkplätze, Verfügbarkeit, Reservierung |
| `Car-Angebote.md` | `plugins-studio/car-sharing` | Carsharing-Standorte, Verfügbarkeit |
| `Bikesharing-Angebote.md` | `plugins-studio/bike-sharing` | Leihfahrräder, Stationen |
| `Wetter.md` | `plugins-studio/weather` | Wettervorhersage, Unwetterwarnungen |

### KI & Erweitert (Milestone 9)

| Anforderungsdokument | Plugin-Paket | Beschreibung |
|---------------------|--------------|-------------|
| `KI.md` | `plugins-studio/ai-assistant` | Content-KI, Alt-Text, Übersetzung |
| `Chatbot-Integration.md` | `plugins-studio/chatbot` | LLM-basierter Chatbot für Bürger |

### System-Module

| Anforderungsdokument | Plugin-Paket | Beschreibung |
|---------------------|--------------|-------------|
| `Hilfe.md` | `plugins-studio/help-support` | Hilfe, Doku, Ticketsystem |
| `Intro.md` | `plugins-studio/onboarding` | Onboarding-Tour, Tooltips |

**Hinweis:** Nicht alle 60+ Module sind hier aufgeführt. Das Mapping folgt dem gleichen Prinzip.

---

## Theme-Editor & App-Design: Architektur-Details

### `packages-studio/theme-engine` – Technische Umsetzung

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
    "logo": "-studio/media-studio/logo.svg",
    "favicon": "-studio/media-studio/favicon.ico",
    "splashScreen": "-studio/media-studio/splash.png"
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
-studio/-studio/ packages-studio/theme-engine-studio/src-studio/generator.ts
export function generateCSSVariables(theme: Theme): string {
  return `
    :root {
      --color-primary: ${theme.colors.primary};
      --color-secondary: ${theme.colors.secondary};
      --font-family: ${theme.typography.fontFamily};
      --spacing-unit: ${theme.spacing.unit};
      -studio/* ... *-studio/
    }
  `;
}
```

#### Theme-Editor UI (React)

```typescript
-studio/-studio/ apps-studio/cms-admin-studio/src-studio/pages-studio/ThemeEditor.tsx
import { ThemeEngine } from '@cms-studio/theme-engine';
import { ThemePreview } from '@cms-studio/ui-react';

export function ThemeEditorPage() {
  const [theme, setTheme] = useState<Theme>(currentTheme);

  return (
    <Split>
      <ThemeEditorForm theme={theme} onChange={setTheme} -studio/>
      <ThemePreview theme={theme} -studio/>
    <-studio/Split>
  );
}
```

### `packages-studio/app-config` – App-Konfiguration

#### Instanz-Konfiguration (Multi-Tenancy)

```typescript
-studio/-studio/ packages-studio/app-config-studio/src-studio/types.ts
export interface InstanceConfig {
  id: string;
  name: string;
  domain: string;
  theme: string; -studio/-studio/ Theme-ID
  locale: string;
  availableLocales: string[];
  modules: {
    enabled: string[]; -studio/-studio/ Plugin-IDs
    config: Record<string, unknown>; -studio/-studio/ Plugin-spezifische Config
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
    -studio/-studio/ ...
  };
}
```

#### UI: Instanz-Manager

- Admin-Bereich: "Instanzen" oder "Apps"
- Liste aller Mandanten-studio/Apps
- Pro Instanz:
  - Allgemeine Einstellungen (Name, Logo, Sprachen)
  - Theme-Auswahl
  - Modul-Aktivierung (Checkboxen für alle Plugins)
  - E-Mail-Konfiguration
  - Feature-Flags

**Integration mit Theme-Editor:**
- Theme-Editor erstellt-studio/bearbeitet Themes
- Instanz-Manager weist Themes zu
- Mobile App lädt Theme-Config via GraphQL beim App-Start
