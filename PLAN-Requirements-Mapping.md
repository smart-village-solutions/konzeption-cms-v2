# Plan: Requirements-Mapping für Arbeitspakete

Dieser Plan beschreibt den schrittweisen Abgleich aller 83 Arbeitspakete mit den Anforderungen aus den Markdown-Dokumenten und deren Referenzierung in der Datenbank.

## Übersicht

**Ziel**: Jedes Arbeitspaket mit konkreten Anforderungen verknüpfen und nachvollziehbar dokumentieren, welche Requirements in welchem Package umgesetzt werden.

**Quellen**:
- 📦 **83 Arbeitspakete** in der Datenbank
- 📄 **~60 Anforderungsdokumente** in `02_Anforderungen/`
  - Funktionale: CMS, Benutzer, Module, Schnittstellen, etc.
  - Nicht-funktionale: Qualität, Sicherheit, Betrieb, etc.

**Zeitaufwand (geschätzt)**:
- Phase 1-2: 2-3h (Automatisiert)
- Phase 3: 1h (Automatisiert)
- Phase 4: 8-12h (Interaktiv, ~6-9 Min pro Package)
- Phase 5: 1h (Automatisiert)

---

## Phase 1: Datenmodell-Erweiterung

### 1.1 Schema anpassen

**Was**: Requirement-Modell erweitern für bessere Nachvollziehbarkeit

**Neue Felder**:
```prisma
model Requirement {
  id              String   @id  // z.B. "FR-CMS-Dashboard-001"
  title           String
  description     String
  category        String   // "Funktional" oder "Nicht-funktional"
  requirementType String   // "functional", "non-functional"

  // Neue Felder:
  filePath        String   // z.B. "02_Anforderungen/02_01_Funktional/CMS.md"
  section         String?  // z.B. "Dashboard", "Suche und Navigation"
  headingPath     String?  // z.B. "CMS > Dashboard > Widget-System"
  lineNumber      Int?     // Zeile im Markdown

  priority        String?  // "Must", "Should", "Could", "Won't"
  status          String   @default("active") // "active", "deprecated", "implemented"
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  packages        PackageRequirement[]
}

model PackageRequirement {
  packageId       String
  requirementId   String
  relevance       String?  // "primary", "secondary", "testing"
  status          String   @default("suggested") // "suggested", "confirmed", "rejected"
  notes           String?
  confidence      Float?   // 0.0 - 1.0 für Auto-Mapping

  package         WorkPackage @relation(...)
  requirement     Requirement @relation(...)
}
```

**Aktion**:
```bash
# Schema anpassen in prisma/schema.prisma
npm run db:migrate -- --name extend_requirements
```

---

## Phase 2: Requirements-Extraktion aus Markdown

### 2.1 Parser-Script erstellen

**Script**: `scripts/extract-requirements.js`

**Funktionen**:
- Rekursiv alle `.md` Dateien in `02_Anforderungen/` durchsuchen
- Markdown parsen (Überschriften-Hierarchie erkennen)
- Anforderungen extrahieren (Bullet-Points, Absätze)
- IDs generieren nach Schema:
  - **FR-{FILE}-{SECTION}-{NR}** für funktionale Requirements
  - **NFR-{FILE}-{SECTION}-{NR}** für nicht-funktionale
- In Datenbank importieren

**Beispiel-Output**:
```
Datei: 02_Anforderungen/02_01_Funktional/CMS.md
  - FR-CMS-Dashboard-001: "Dashboard verschafft schnellen Überblick"
  - FR-CMS-Dashboard-002: "Schnellzugriff auf wichtigste Funktionen"
  - FR-CMS-Dashboard-003: "Statistiken über Kennzahlen"
  - FR-CMS-Suche-001: "Komfortable Such- und Filterfunktion"
  ...

Gesamt: ~500-800 Requirements extrahiert
```

**Aktion**:
```bash
npm run requirements:extract
```

### 2.2 Anforderungen kategorisieren

**Automatische Kategorisierung** basierend auf:
- Dateiname (CMS, Benutzer, Schnittstellen → Funktional)
- Pfad (02_01_Funktional vs 02_02_Nicht-funktional)
- Keywords im Text (Performance, Sicherheit, Usability)

**Prioritäten-Zuweisung** (optional, manuell nachbearbeiten):
- Must-Have: Grundfunktionen (Auth, Dashboard, Kernmodule)
- Should-Have: Erweiterte Features (KI, Analytics, Widgets)
- Could-Have: Nice-to-Have (AR, Vorteilssystem)

---

## Phase 3: Automatisches Mapping (Keyword-Matching)

### 3.1 Mapping-Algorithmus

**Script**: `scripts/auto-map-requirements.js`

**Logik**:
1. Für jedes Work Package:
   - Extrahiere Keywords aus: `title`, `description`, `deliverables`
   - Tokenize und normalisiere (lowercase, remove stopwords)
2. Für jedes Requirement:
   - Extrahiere Keywords aus: `title`, `description`, `section`, `filePath`
3. **Similarity-Scoring**:
   - TF-IDF oder einfaches Keyword-Overlap
   - Bonus für exakte Matches (z.B. "Dashboard", "Authentifizierung")
   - Confidence-Score berechnen (0.0 - 1.0)
4. Top 10 Requirements pro Package als "suggested" speichern

**Beispiel**:
```
WP-015: Authentifizierung & Single Sign-On
  Vorgeschlagene Requirements (confidence > 0.7):
  - FR-Benutzer-Auth-001: "SSO mit Keycloak" (0.95)
  - FR-Benutzer-Auth-002: "Multi-Faktor-Authentifizierung" (0.82)
  - NFR-Sicherheit-Auth-001: "Sichere Session-Verwaltung" (0.78)
  ...
```

**Aktion**:
```bash
npm run requirements:auto-map
```

### 3.2 Mapping-Qualität prüfen

**Report generieren**:
- Wie viele Packages haben Vorschläge? (Ziel: 100%)
- Durchschnittliche Confidence-Scores
- Packages ohne Vorschläge (manuelle Prüfung nötig)

---

## Phase 4: Interaktiver Review (Manuell)

### 4.1 Review-Tool (CLI)

**Script**: `scripts/review-requirements.js`

**Ablauf**:
```
=== Review: WP-015 - Authentifizierung & Single Sign-On ===

Story Points: 13 | Milestone: MS1 | Cluster: Authentifizierung
Description: Implementierung zentraler Authentifizierung mit Keycloak...

Vorgeschlagene Requirements (10):

[1] FR-Benutzer-Auth-001 (confidence: 0.95) ✓
    "SSO mit Keycloak für zentrale Anmeldung"
    Quelle: 02_Anforderungen/02_01_Funktional/Benutzer.md > Authentifizierung

[2] FR-Benutzer-Auth-002 (confidence: 0.82) ✓
    "Multi-Faktor-Authentifizierung (MFA)"
    Quelle: 02_Anforderungen/02_01_Funktional/Benutzer.md > Authentifizierung

[3] NFR-Sicherheit-Auth-001 (confidence: 0.78)
    "Sichere Session-Verwaltung mit Token-Refresh"
    Quelle: 02_Anforderungen/02_02_Nicht-funktional/Sicherheit-Datenschutz.md

...

Aktionen:
[a] Accept all (bestätigt alle mit confidence > 0.7)
[c] Confirm selected (Nummern eingeben: 1,2,5)
[r] Reject selected (Nummern eingeben: 3,4)
[s] Search for more (Keyword-Suche)
[m] Add manual (Requirement-ID eingeben)
[n] Next package (ohne Änderung)
[q] Quit (Fortschritt wird gespeichert)

Auswahl: _
```

**Features**:
- ✅ Fortschritt wird gespeichert (Packages 1-20 reviewed, 21-83 pending)
- ✅ Jederzeit fortsetzbar
- ✅ Änderungen sofort in DB
- ✅ Übersicht: X/83 Packages reviewed

**Aktion**:
```bash
npm run requirements:review
```

### 4.2 Batch-Aktionen

Für wiederkehrende Patterns:
- Alle Packages in Cluster "Content-Module" → FR-Module-* zuordnen
- Alle Packages in MS10 → NFR-QA-*, NFR-Security-* zuordnen

---

## Phase 5: Validierung & Export

### 5.1 Validierungs-Report

**Script**: `scripts/validate-requirements.js`

**Prüfungen**:
1. **Coverage**:
   - Welche Packages haben keine Requirements? (Warnung)
   - Welche Requirements sind keinem Package zugeordnet? (Info)
2. **Plausibilität**:
   - Packages mit sehr wenigen Requirements (< 3)
   - Packages mit sehr vielen Requirements (> 30)
3. **Milestones**:
   - MS1-3 sollten alle funktionalen Basis-Requirements abdecken
   - MS10 sollte alle QA/Security-Requirements abdecken

**Output**:
```
=== Validierungs-Report ===

✅ Coverage:
   - 83/83 Packages haben Requirements (100%)
   - 520/587 Requirements zugeordnet (88.6%)

⚠️  Unzugeordnete Requirements (67):
   - FR-Vorteilssystem-* (12 Requirements) → Kein Package geplant
   - FR-AR-* (8 Requirements) → Optional Module
   ...

✅ Plausibilität:
   - Durchschnitt: 6.3 Requirements pro Package
   - Min: 2 (WP-066: Widget-System-Erweiterung)
   - Max: 24 (WP-001: Performance-Optimierung)

✅ Milestone-Coverage:
   - MS1: 87 Requirements (Foundation, Auth, MVP)
   - MS2: 124 Requirements (Content-Module)
   - MS3: 56 Requirements (Konfiguration)
   ...
```

### 5.2 Export für Dokumentation

**Formate**:
1. **Markdown-Report**: `docs/Requirements-Mapping.md`
   - Übersicht pro Package mit zugeordneten Requirements
   - Rückverweis: Pro Requirement die zugeordneten Packages

2. **CSV-Export**: `exports/package-requirements.csv`
   - Für Excel/Tabellenkalkulation
   - Spalten: Package-ID, Requirement-ID, Relevance, Status, Source-File

3. **JSON-Export**: `exports/requirements-mapping.json`
   - Vollständige Datenstruktur für APIs/Tools

**Aktion**:
```bash
npm run requirements:export
```

---

## Weitere Tools

### Prisma Studio

Für manuelle Nachbearbeitung:
```bash
npm run db:studio
```

Dort können einzelne Zuordnungen direkt bearbeitet werden:
- PackageRequirement-Tabelle: Relevance, Notes anpassen
- Requirement-Tabelle: Priority, Status ändern

### Suche nach Requirements

**Script**: `scripts/find-requirement.js`

```bash
# Suche nach Keywords
npm run requirements:find -- "Dashboard Widget"

# Zeige alle Requirements für ein Package
npm run requirements:show -- WP-015

# Zeige alle Packages für ein Requirement
npm run requirements:show -- FR-CMS-Dashboard-001
```

---

## Zusammenfassung der Scripts

| Script | Beschreibung | Dauer | Art |
|--------|-------------|-------|-----|
| `extract-requirements.js` | Markdown → DB (Requirements) | 10-20 Min | Auto |
| `auto-map-requirements.js` | Keyword-Matching | 5-10 Min | Auto |
| `review-requirements.js` | Interaktiver Review | 8-12h | Manuell |
| `validate-requirements.js` | Coverage-Report | 2-3 Min | Auto |
| `export-requirements.js` | Markdown/CSV/JSON-Export | 1-2 Min | Auto |
| `find-requirement.js` | Suche & Info-Tool | - | Utility |

---

## Nächste Schritte

### Sofort umsetzbar:

1. ✅ **Schema erweitern** (5 Min)
   ```bash
   # Prisma Schema anpassen
   # Migration erstellen
   npm run db:migrate
   ```

2. ✅ **Requirements extrahieren** (1-2h Entwicklung + 20 Min Ausführung)
   ```bash
   npm run requirements:extract
   ```

3. ✅ **Auto-Mapping** (1h Entwicklung + 10 Min Ausführung)
   ```bash
   npm run requirements:auto-map
   ```

4. 📋 **Interaktiver Review** (2h Entwicklung + 8-12h Review)
   ```bash
   npm run requirements:review
   # Über mehrere Sessions verteilt
   ```

5. 📊 **Validierung & Export** (30 Min Entwicklung + 3 Min Ausführung)
   ```bash
   npm run requirements:validate
   npm run requirements:export
   ```

### Optional (Nice-to-Have):

- 🌐 **Web-Interface** statt CLI (React + Prisma API)
- 🤖 **KI-gestütztes Mapping** (OpenAI/Claude für bessere Matches)
- 📈 **Dashboard** in Prisma Studio mit Statistiken
- 🔄 **Sync-Mechanismus** bei Änderungen in Markdown-Dateien

---

## Erfolgsmetriken

Nach Abschluss sollten folgende Ziele erreicht sein:

- ✅ Alle 83 Packages haben mindestens 3 Requirements
- ✅ >90% der Requirements sind mindestens einem Package zugeordnet
- ✅ Jede Anforderung ist nachvollziehbar referenziert (Datei + Zeile)
- ✅ Mapping ist in Datenbank dokumentiert
- ✅ Export-Report liegt vor für Review/Audit
