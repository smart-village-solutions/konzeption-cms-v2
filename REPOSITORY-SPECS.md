# Repository Spezifikationen - CMS Konzeption v2

**Stand:** 8. Dezember 2025
**Repository:** smart-village-solutions/konzeption-cms-v2
**Branch:** main

---

## 1. Repository-Übersicht

### 1.1 Zweck
Dieses Repository enthält die vollständige Konzeption eines CMS-Systems mit:
- **83 Arbeitspaketen** organisiert in Milestones und Clustern
- **7.429 Requirements** aus 81 Markdown-Dokumenten
- **630 automatisch generierte Mappings** zwischen Requirements und Packages
- **SQLite-Datenbank** für zentrale Verwaltung und Verknüpfung

### 1.2 Struktur

```
konzeption-cms-2/
├── 01_Einleitung/              # Projekteinleitung und Kontext
├── 02_Anforderungen/           # 81 Markdown-Dateien mit Requirements
│   ├── 02_01_Funktional/       # Funktionale Anforderungen (5.814 Requirements)
│   │   ├── CMS.md              # 693 Requirements
│   │   ├── App-Design.md       # 635 Requirements
│   │   ├── Schnittstellen.md   # 732 Requirements
│   │   ├── Benutzer.md
│   │   ├── Module/             # Verschiedene Module (Chatbot, Umfragen, etc.)
│   │   └── ...
│   └── 02_02_Nicht-funktional/ # Nicht-funktionale Anforderungen (1.615 Requirements)
│       ├── Qualitaet-Zuverlaessigkeit.md
│       ├── Sicherheit-Datenschutz.md
│       ├── Software-Lifecycle-BSI.md
│       ├── FIT-Architekturrichtlinien.md
│       └── ...
├── 03_Systemarchitektur/       # Architekturdiagramme und Konzepte
├── 04_Roadmap/                 # Milestone-Definitionen (MS1-MS10)
├── 09_Anhang/                  # Ergänzende Dokumente
├── prisma/                     # Datenbank-Schema und Migrationen
│   ├── schema.prisma           # Vollständiges Prisma-Schema
│   ├── migrations/             # Migration History
│   └── arbeitspakete.db        # SQLite Datenbank (7.6 MB)
├── scripts/                    # Node.js Automatisierungsskripte
│   ├── import-yaml.js          # Import von Arbeitspaketen aus YAML
│   ├── extract-requirements.js # Requirement-Extraktion aus Markdown
│   ├── auto-map-requirements.js # Keyword-basiertes Matching
│   └── batch-review-requirements.js # AI-Review mit Anthropic Batch API
├── Arbeitspakete.yml           # Quell-YAML mit 83 Packages
├── ai-review-batch.json        # Vorbereiteter Batch (5.681 Zeilen)
├── package.json                # Node.js Dependencies und Scripts
└── .env                        # Umgebungsvariablen (DATABASE_URL, ANTHROPIC_API_KEY)
```

---

## 2. Datenbank-Schema

### 2.1 Technologie
- **Datenbank:** SQLite 3
- **ORM:** Prisma 5.7.0
- **Dateigröße:** ~7.6 MB
- **Datei:** `prisma/arbeitspakete.db`

### 2.2 Datenbankmodelle

#### **WorkPackage** (83 Einträge)
Zentrale Tabelle für Arbeitspakete.

```prisma
model WorkPackage {
  id              String   @id              // "WP-001", "WP-002", ...
  title           String                    // Titel des Pakets
  description     String                    // Ausführliche Beschreibung
  storyPoints     Int                       // Aufwandsschätzung
  status          String   @default("draft") // "draft", "planned", "in-progress", "done"
  milestoneId     Int                       // FK zu Milestone
  clusterId       Int                       // FK zu Cluster
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  milestone       Milestone
  cluster         Cluster
  deliverables    Deliverable[]
  acceptanceCriteria AcceptanceCriterion[]
  dependsOn       Dependency[] @relation("DependentPackage")
  dependencyFor   Dependency[] @relation("RequiredPackage")
  requirements    PackageRequirement[]
}
```

**Wichtige Felder:**
- `id`: Manuelle IDs wie "WP-001" bis "WP-083"
- `storyPoints`: Aufwandsschätzung (1-13, durchschnittlich 5-8)
- `status`: Workflow-Status
- `milestoneId`: Zuordnung zu MS1-MS10
- `clusterId`: Thematische Gruppierung

#### **Requirement** (7.429 Einträge)
Extrahierte Requirements aus Markdown-Dokumenten.

```prisma
model Requirement {
  id              String   @id              // "FR-CMS-Dashboard-001", "NFR-QA-001"
  title           String                    // Kurztitel des Requirements
  description     String                    // Vollständiger Text
  category        String                    // "Funktional", "Nicht-funktional"
  requirementType String                    // "functional", "non-functional"

  // Quellenangaben
  filePath        String                    // z.B. "02_Anforderungen/02_01_Funktional/CMS.md"
  section         String?                   // z.B. "Dashboard"
  headingPath     String?                   // z.B. "CMS > Dashboard > Widget-System"
  lineNumber      Int?                      // Zeile im Markdown

  priority        String?                   // "Must", "Should", "Could", "Won't" (MoSCoW)
  status          String   @default("active") // "active", "deprecated", "implemented"
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  packages        PackageRequirement[]
}
```

**ID-Format:**
- Funktional: `FR-{Datei}-{Section}-{Nr}` (z.B. `FR-CMS-Dashboard-042`)
- Nicht-funktional: `NFR-{Datei}-{Nr}` (z.B. `NFR-QA-013`)

**Verteilung:**
- Funktionale Requirements: 5.814 (78%)
- Nicht-funktionale Requirements: 1.615 (22%)

**Top-Quellen:**
1. `Schnittstellen.md`: 732 Requirements
2. `CMS.md`: 693 Requirements
3. `App-Design.md`: 635 Requirements

#### **PackageRequirement** (630 Einträge)
M:N-Verknüpfung zwischen WorkPackages und Requirements.

```prisma
model PackageRequirement {
  packageId       String
  requirementId   String
  relevance       String?  // "primary", "secondary", "testing"
  status          String   @default("suggested") // "suggested", "confirmed", "rejected"
  confidence      Float?   // 0.0 - 1.0 (Auto-Mapping Score)
  notes           String?  // AI-Begründung oder manuelle Notizen

  package         WorkPackage
  requirement     Requirement

  @@id([packageId, requirementId])
}
```

**Status-Werte:**
- `suggested`: Automatisch generiert, wartet auf Review (aktuell: 630)
- `confirmed`: Von AI/Mensch bestätigt (aktuell: 0)
- `rejected`: Abgelehnt, nicht relevant (aktuell: 0)

**Confidence-Verteilung:**
- High (0.7-1.0): 34 Mappings
- Medium (0.4-0.7): 137 Mappings
- Low (0.3-0.4): 459 Mappings

#### **Milestone** (10 Einträge)
```prisma
model Milestone {
  id          Int      @id @default(autoincrement())
  code        String   @unique  // "MS1", "MS2", ..., "MS10"
  title       String
  description String?
  packages    WorkPackage[]
}
```

**Milestones:**
- MS1-MS10: Chronologische Projektphasen
- MS1: Foundation und Core-Features
- MS10: Advanced Features und Finalisierung

#### **Cluster** (31 Einträge)
Thematische Gruppierung von Arbeitspaketen.

```prisma
model Cluster {
  id          Int      @id @default(autoincrement())
  name        String   @unique
  description String?
  packages    WorkPackage[]
}
```

**Beispiel-Cluster:**
- API & Backend
- CMS-Features
- Datenschutz & Sicherheit
- Testing & Qualität
- Deployment & DevOps

#### **Weitere Modelle**

**Deliverable**: Konkrete Liefergegenstände pro Package
```prisma
model Deliverable {
  id          Int      @id @default(autoincrement())
  packageId   String
  description String
  package     WorkPackage
}
```

**AcceptanceCriterion**: Definition of Done pro Package
```prisma
model AcceptanceCriterion {
  id          Int      @id @default(autoincrement())
  packageId   String
  criterion   String
  package     WorkPackage
}
```

**Dependency**: Package-Abhängigkeiten (gerichtet)
```prisma
model Dependency {
  fromPackageId String
  toPackageId   String
  fromPackage   WorkPackage @relation("DependentPackage")
  toPackage     WorkPackage @relation("RequiredPackage")

  @@id([fromPackageId, toPackageId])
}
```

---

## 3. Datenfluss und Automatisierung

### 3.1 Datenquellen

**Input-Dateien:**
1. `Arbeitspakete.yml`: 83 Work Packages mit Metadata
2. `02_Anforderungen/**/*.md`: 81 Markdown-Dateien mit Requirements

### 3.2 Processing Pipeline

```
┌─────────────────────┐
│  Arbeitspakete.yml  │
└──────────┬──────────┘
           │
           ▼
    ┌──────────────┐
    │ import-yaml  │ ← Import Work Packages in DB
    └──────┬───────┘
           │
           ▼
    ┌──────────────────┐
    │  work_packages   │ 83 Packages
    └──────────────────┘

┌─────────────────────────┐
│  02_Anforderungen/*.md  │
└───────────┬─────────────┘
            │
            ▼
    ┌────────────────────┐
    │ extract-requirements │ ← Parse Markdown, Generate IDs
    └─────────┬──────────┘
              │
              ▼
    ┌─────────────────┐
    │  requirements   │ 7.429 Requirements
    └─────────────────┘

┌──────────────────┐     ┌─────────────────┐
│ work_packages    │     │  requirements   │
└────────┬─────────┘     └────────┬────────┘
         │                        │
         │                        │
         ▼                        ▼
    ┌──────────────────────────────────┐
    │    auto-map-requirements         │ ← Keyword Matching + TF-IDF
    └───────────────┬──────────────────┘
                    │
                    ▼
    ┌─────────────────────────────┐
    │  package_requirements       │ 630 Mappings (suggested)
    │  + confidence scores        │
    └──────────┬──────────────────┘
               │
               ▼
    ┌───────────────────────────┐
    │ ai-review-batch.json      │ ← Prepare for AI
    └──────────┬────────────────┘
               │
               ▼
    ┌────────────────────────────┐
    │ Anthropic Batch API        │ ← AI Review (parallel)
    │ (External AI Tool)         │
    └──────────┬─────────────────┘
               │
               ▼
    ┌─────────────────────────────┐
    │  package_requirements       │ ← Update: confirmed/rejected
    │  + notes (AI reasoning)     │
    └─────────────────────────────┘
```

### 3.3 Verfügbare Scripts

**NPM Commands:**
```bash
# Datenbank
npm run db:migrate          # Prisma Migrationen anwenden
npm run db:studio           # Prisma Studio öffnen (GUI)
npm run db:import           # YAML → DB importieren
npm run db:generate         # Prisma Client regenerieren

# Requirements Pipeline
npm run requirements:extract    # Markdown → Requirements extrahieren
npm run requirements:auto-map   # Auto-Mapping mit Keywords
npm run requirements:review     # Interaktives CLI-Review (veraltet)

# Batch Processing (für externes AI-Tool)
npm run requirements:batch-create  # Batch an Anthropic senden
npm run requirements:batch-status  # Status abfragen
npm run requirements:batch-results # Ergebnisse abrufen und anwenden
```

---

## 4. AI-Review Setup

### 4.1 Aktueller Stand

**Vorbereitete Daten:**
- **Datei:** `ai-review-batch.json` (5.681 Zeilen)
- **Format:** JSON Array mit 64 Packages (19 Packages haben keine Mappings)
- **Inhalt:** Jedes Package mit vollständiger Metadata + vorgeschlagene Requirements

**Struktur eines Package-Objekts:**
```json
{
  "packageId": "WP-001",
  "title": "Performance-Optimierung",
  "description": "Detaillierte Beschreibung...",
  "cluster": "Performance & Skalierbarkeit",
  "milestone": "MS3",
  "deliverables": ["Feature 1", "Feature 2"],
  "requirements": [
    {
      "id": "FR-CMS-Dashboard-042",
      "title": "Performance-Monitoring",
      "description": "System muss Performance-Metriken tracken...",
      "confidence": 0.85,
      "filePath": "02_Anforderungen/02_01_Funktional/CMS.md",
      "section": "Dashboard",
      "headingPath": "CMS > Dashboard > Monitoring"
    }
  ]
}
```

### 4.2 Review-Aufgabe für AI-Tool

**Ziel:** Für jedes der 630 vorgeschlagenen Mappings entscheiden:
- **CONFIRM primary**: Requirement ist direkt Teil der Package-Implementierung
- **CONFIRM secondary**: Requirement wird genutzt/beeinflusst/getestet im Package
- **REJECT**: Nur zufälliger Keyword-Match, nicht relevant

**Erwartetes Output-Format:**
```json
{
  "packageId": "WP-001",
  "decisions": [
    {
      "requirementId": "FR-CMS-Dashboard-042",
      "action": "CONFIRM",
      "relevance": "primary",
      "reasoning": "Performance-Monitoring ist Kern-Deliverable des Packages"
    },
    {
      "requirementId": "NFR-QA-007",
      "action": "REJECT",
      "reasoning": "Allgemeines QA-Requirement, nicht spezifisch für dieses Package"
    }
  ]
}
```

### 4.3 Erwartete Ergebnisse

**Basierend auf Confidence-Verteilung:**
- ~60-70% der Mappings werden bestätigt (ca. 400-450)
- ~30-40% werden abgelehnt (ca. 180-250)
- Durchschnittlich 6-7 bestätigte Requirements pro Package

**Fehlende Mappings:**
- 19 Packages haben aktuell keine Vorschläge
- Diese benötigen manuelle Suche oder semantisches Matching

---

## 5. Technische Details

### 5.1 Dependencies

```json
{
  "dependencies": {
    "@prisma/client": "^5.7.0",
    "@anthropic-ai/sdk": "^0.32.1",
    "js-yaml": "^4.1.0"
  },
  "devDependencies": {
    "prisma": "^5.7.0"
  }
}
```

### 5.2 Umgebungsvariablen

```bash
# .env
DATABASE_URL="file:./prisma/arbeitspakete.db"
ANTHROPIC_API_KEY="sk-ant-..."  # Für Batch API (optional)
```

### 5.3 Prisma Commands

```bash
# Schema ändern → Migration erstellen
npx prisma migrate dev --name beschreibung

# Datenbank zurücksetzen
npx prisma migrate reset

# Datenbank GUI öffnen
npx prisma studio
```

---

## 6. Datenbank-Queries (Beispiele)

### 6.1 Statistiken

```sql
-- Anzahl Packages pro Milestone
SELECT m.code, COUNT(*) as packages
FROM work_packages wp
JOIN milestones m ON wp.milestoneId = m.id
GROUP BY m.code
ORDER BY m.code;

-- Requirements nach Typ
SELECT requirementType, COUNT(*) as count
FROM requirements
GROUP BY requirementType;

-- Mappings nach Status
SELECT status, COUNT(*) as count
FROM package_requirements
GROUP BY status;

-- Top 10 Packages mit meisten Requirements
SELECT wp.id, wp.title, COUNT(*) as req_count
FROM work_packages wp
JOIN package_requirements pr ON wp.id = pr.packageId
GROUP BY wp.id, wp.title
ORDER BY req_count DESC
LIMIT 10;
```

### 6.2 Komplexe Queries

```sql
-- Packages ohne Requirements
SELECT wp.id, wp.title
FROM work_packages wp
LEFT JOIN package_requirements pr ON wp.id = pr.packageId
WHERE pr.packageId IS NULL;

-- High-Confidence Mappings (>0.7)
SELECT wp.title, r.id, r.title, pr.confidence
FROM package_requirements pr
JOIN work_packages wp ON pr.packageId = wp.id
JOIN requirements r ON pr.requirementId = r.id
WHERE pr.confidence > 0.7 AND pr.status = 'suggested'
ORDER BY pr.confidence DESC;

-- Requirements aus bestimmter Datei
SELECT id, title, section, lineNumber
FROM requirements
WHERE filePath LIKE '%CMS.md'
ORDER BY lineNumber;
```

---

## 7. REST API

### 7.1 Übersicht

Eine vollständige REST API ist verfügbar für programmatischen Zugriff auf die Datenbank.

**Server starten:**
```bash
npm run api:start     # Production mode
npm run api:dev       # Development mode (mit nodemon)
```

**Base URL:** `http://localhost:3000`
**Technologie:** Express.js 4.18 + CORS
**Dateien:** `api/server.js` + `api/README.md`

### 7.2 Endpoints

#### Health & Info

| Method | Endpoint | Beschreibung |
|--------|----------|--------------|
| GET | `/health` | Server health check |
| GET | `/api/info` | API info + Datenbank-Statistiken |

#### Work Packages

| Method | Endpoint | Beschreibung |
|--------|----------|--------------|
| GET | `/api/packages` | Liste aller Packages |
| GET | `/api/packages/:id` | Einzelnes Package (mit Relations) |
| POST | `/api/packages` | Neues Package erstellen |
| PATCH | `/api/packages/:id` | Package aktualisieren |
| DELETE | `/api/packages/:id` | Package löschen |

**Query-Parameter für GET `/api/packages`:**
- `milestone`: Filter nach Milestone-Code (z.B. "MS1")
- `cluster`: Filter nach Cluster-Name
- `status`: Filter nach Status (draft/planned/in-progress/done)
- `search`: Volltext-Suche in id/title/description

#### Requirements

| Method | Endpoint | Beschreibung |
|--------|----------|--------------|
| GET | `/api/requirements` | Liste aller Requirements (paginiert) |
| GET | `/api/requirements/:id` | Einzelnes Requirement (mit Packages) |
| POST | `/api/requirements` | Neues Requirement erstellen |
| PATCH | `/api/requirements/:id` | Requirement aktualisieren |
| DELETE | `/api/requirements/:id` | Requirement löschen |

**Query-Parameter für GET `/api/requirements`:**
- `category`: "Funktional" oder "Nicht-funktional"
- `type`: "functional" oder "non-functional"
- `priority`: "Must", "Should", "Could", "Won't"
- `status`: "active", "deprecated", "implemented"
- `file`: Filter nach Quell-Datei (partial match)
- `search`: Volltext-Suche in id/title/description
- `limit`: Ergebnisse pro Seite (default: 100)
- `offset`: Pagination Offset (default: 0)

#### Mappings (Package ↔ Requirement)

| Method | Endpoint | Beschreibung |
|--------|----------|--------------|
| GET | `/api/mappings` | Liste aller Mappings |
| POST | `/api/mappings` | Neues Mapping erstellen |
| PATCH | `/api/mappings/:packageId/:requirementId` | Mapping aktualisieren |
| DELETE | `/api/mappings/:packageId/:requirementId` | Mapping löschen |
| POST | `/api/mappings/bulk-update` | **Bulk-Update für AI-Review** |

**Query-Parameter für GET `/api/mappings`:**
- `packageId`: Filter nach Package
- `requirementId`: Filter nach Requirement
- `status`: "suggested", "confirmed", "rejected"
- `relevance`: "primary", "secondary", "testing"
- `minConfidence`: Mindest-Confidence (0.0-1.0)

#### Milestones & Clusters

| Method | Endpoint | Beschreibung |
|--------|----------|--------------|
| GET | `/api/milestones` | Alle Milestones mit Package-Counts |
| GET | `/api/clusters` | Alle Clusters mit Package-Counts |

#### Statistics & Reports

| Method | Endpoint | Beschreibung |
|--------|----------|--------------|
| GET | `/api/stats` | Gesamt-Statistiken |
| GET | `/api/stats/coverage` | Requirements-Coverage pro Package |
| GET | `/api/stats/requirements-by-file` | Requirements gruppiert nach Datei |

### 7.3 Beispiel-Requests

#### Package mit Milestone-Filter abrufen
```bash
curl "http://localhost:3000/api/packages?milestone=MS1"
```

#### Requirement Details
```bash
curl http://localhost:3000/api/requirements/FR-CMS-Dashboard-042
```

#### Bestätigte High-Confidence Mappings
```bash
curl "http://localhost:3000/api/mappings?status=confirmed&minConfidence=0.7"
```

#### Neues Package erstellen
```bash
curl -X POST http://localhost:3000/api/packages \
  -H "Content-Type: application/json" \
  -d '{
    "id": "WP-999",
    "title": "Test Package",
    "description": "Test Description",
    "storyPoints": 5,
    "milestoneId": 1,
    "clusterId": 1,
    "deliverables": ["Deliverable 1", "Deliverable 2"],
    "acceptanceCriteria": ["Criterion 1", "Criterion 2"]
  }'
```

#### Mapping bestätigen
```bash
curl -X PATCH http://localhost:3000/api/mappings/WP-001/FR-CMS-Dashboard-042 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "confirmed",
    "relevance": "primary",
    "notes": "Confirmed by AI review"
  }'
```

#### Bulk-Update für AI-Review Ergebnisse
```bash
curl -X POST http://localhost:3000/api/mappings/bulk-update \
  -H "Content-Type: application/json" \
  -d '{
    "updates": [
      {
        "packageId": "WP-001",
        "requirementId": "FR-CMS-001",
        "status": "confirmed",
        "relevance": "primary",
        "notes": "AI confirmed"
      },
      {
        "packageId": "WP-001",
        "requirementId": "FR-CMS-002",
        "status": "rejected",
        "notes": "Not relevant"
      }
    ]
  }'
```

### 7.4 Response-Formate

#### List Response
```json
{
  "count": 83,
  "data": [...]
}
```

#### Paginated Response (Requirements)
```json
{
  "total": 7429,
  "limit": 100,
  "offset": 0,
  "data": [...]
}
```

#### Single Resource
```json
{
  "id": "WP-001",
  "title": "...",
  ...
}
```

#### Error Response
```json
{
  "error": "Error message"
}
```

### 7.5 HTTP Status Codes

- `200 OK` - Erfolgreiche GET/PATCH Anfrage
- `201 Created` - Erfolgreiche POST Anfrage
- `204 No Content` - Erfolgreiche DELETE Anfrage
- `400 Bad Request` - Ungültige Eingabedaten
- `404 Not Found` - Ressource nicht gefunden
- `500 Internal Server Error` - Server-Fehler

### 7.6 Integration mit AI-Review

Nach dem AI-Review können Ergebnisse programmatisch angewendet werden:

**Skript verwenden:**
```bash
node scripts/apply-ai-results.js ai-review-results.json
```

**Oder direkt per API:**
```javascript
const results = JSON.parse(fs.readFileSync('ai-review-results.json'));

const updates = [];
for (const result of results) {
  for (const decision of result.decisions) {
    if (decision.action === 'CONFIRM') {
      updates.push({
        packageId: result.packageId,
        requirementId: decision.requirementId,
        status: 'confirmed',
        relevance: decision.relevance,
        notes: decision.reasoning
      });
    } else if (decision.action === 'REJECT') {
      updates.push({
        packageId: result.packageId,
        requirementId: decision.requirementId,
        status: 'rejected',
        notes: decision.reasoning
      });
    }
  }
}

fetch('http://localhost:3000/api/mappings/bulk-update', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ updates })
});
```

### 7.7 Konfiguration

**Umgebungsvariablen (.env):**
```bash
DATABASE_URL="file:./prisma/arbeitspakete.db"
API_PORT=3000  # Optional, default: 3000
```

**Features:**
- ✅ CORS aktiviert (alle Origins)
- ✅ JSON Request/Response
- ✅ Graceful Shutdown (SIGTERM/SIGINT)
- ✅ Request Logging
- ⚠️ **Keine Authentifizierung** (nur für lokale Entwicklung!)

### 7.8 Sicherheitshinweise

⚠️ Diese API ist für **lokale Entwicklung** konzipiert und hat keine Authentifizierung.

Für Produktion empfohlen:
- API Keys oder JWT Authentication
- Rate Limiting (express-rate-limit)
- Input Validation (Zod/Joi)
- Security Headers (helmet.js)
- HTTPS

---

## 8. Nächste Schritte

### 8.1 Für externes AI-Tool

**Input bereitstellen:**
```bash
# Datei: ai-review-batch.json
# Format: JSON Array mit 64 Packages
# Größe: 5.681 Zeilen
```

**Erwarteter Workflow:**
1. Lade `ai-review-batch.json`
2. Für jedes Package: Analysiere alle vorgeschlagenen Requirements
3. Entscheide: CONFIRM (primary/secondary) oder REJECT
4. Generiere JSON-Output mit Decisions + Reasoning
5. Speichere Ergebnisse (z.B. `ai-review-results.json`)

**Anwendung der Ergebnisse:**
```bash
# Nach Review: Skript zum Import der Decisions
node scripts/apply-ai-decisions.js ai-review-results.json
```

### 8.2 Offene Aufgaben

1. **AI-Review durchführen** (630 Mappings)
2. **Manuelle Suche** für 19 Packages ohne Mappings
3. **Validierung** der bestätigten Mappings
4. **Coverage-Report** generieren
5. **Prioritäten setzen** für Requirements (MoSCoW)

---

## 9. Kontakt und Support

**Repository:** https://github.com/smart-village-solutions/konzeption-cms-v2
**Branch:** main
**Node Version:** >= 18.x
**Prisma Version:** 5.7.0

**Wichtige Dateien:**
- `README-DB.md`: Datenbank-Dokumentation
- `PLAN-Requirements-Mapping.md`: Detaillierter 5-Phasen-Plan
- `QUICKSTART-Requirements.md`: Quick-Start-Guide
- `Arbeitspakete.yml`: Quell-YAML
- `ai-review-batch.json`: Vorbereiteter Batch für AI

---

**Ende der Spezifikation**
