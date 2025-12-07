# Requirements-Mapping: Schnellstart

## Übersicht

Dieses System verknüpft die 83 Arbeitspakete mit den Anforderungen aus den Markdown-Dokumenten.

## Setup (einmalig)

```bash
# 1. Schema-Migration durchführen
npm run db:migrate -- --name extend_requirements

# 2. Requirements aus Markdown extrahieren
npm run requirements:extract

# 3. Automatisches Mapping durchführen
npm run requirements:auto-map
```

**Dauer**: ~5-10 Minuten

**Ergebnis**:
- ~500-800 Requirements in Datenbank
- ~10-15 vorgeschlagene Requirements pro Package
- Confidence-Scores für jede Zuordnung

## Interaktiver Review (manuell)

Nach dem Auto-Mapping müssen die Vorschläge manuell überprüft werden:

### Option 1: Prisma Studio (GUI)

```bash
npm run db:studio
```

Dann in Prisma Studio:
1. Tabelle **PackageRequirement** öffnen
2. Nach `status = "suggested"` filtern
3. Für jede Zeile:
   - Package-Details ansehen (über Relation)
   - Requirement-Details ansehen (über Relation)
   - Status ändern: `suggested` → `confirmed` oder `rejected`
   - Optional: `relevance` und `notes` ergänzen

### Option 2: SQL-Queries

Beispiele für häufige Aktionen:

```sql
-- Alle Vorschläge für ein Package anzeigen
SELECT
  pr.packageId,
  pr.confidence,
  r.title,
  r.description,
  r.filePath,
  r.section
FROM package_requirements pr
JOIN requirements r ON pr.requirementId = r.id
WHERE pr.packageId = 'WP-015'
  AND pr.status = 'suggested'
ORDER BY pr.confidence DESC;

-- Alle Vorschläge mit hoher Confidence bestätigen
UPDATE package_requirements
SET status = 'confirmed'
WHERE confidence >= 0.8 AND status = 'suggested';

-- Alle Vorschläge mit niedriger Confidence ablehnen
UPDATE package_requirements
SET status = 'rejected'
WHERE confidence < 0.4 AND status = 'suggested';
```

## Validierung

Prüfe Coverage und Qualität:

```sql
-- Packages ohne Requirements
SELECT
  wp.id,
  wp.title,
  COUNT(pr.requirementId) as req_count
FROM work_packages wp
LEFT JOIN package_requirements pr ON wp.id = pr.packageId AND pr.status = 'confirmed'
GROUP BY wp.id, wp.title
HAVING req_count = 0
ORDER BY wp.id;

-- Requirements ohne Packages
SELECT
  r.id,
  r.title,
  r.filePath,
  COUNT(pr.packageId) as pkg_count
FROM requirements r
LEFT JOIN package_requirements pr ON r.id = pr.requirementId AND pr.status = 'confirmed'
GROUP BY r.id, r.title, r.filePath
HAVING pkg_count = 0
ORDER BY r.filePath, r.id;

-- Statistiken pro Milestone
SELECT
  m.code,
  m.title,
  COUNT(DISTINCT wp.id) as packages,
  COUNT(DISTINCT pr.requirementId) as requirements
FROM milestones m
JOIN work_packages wp ON m.id = wp.milestoneId
LEFT JOIN package_requirements pr ON wp.id = pr.packageId AND pr.status = 'confirmed'
GROUP BY m.code, m.title
ORDER BY m.code;
```

## Nützliche Queries

### Requirements für ein Package finden

```javascript
// In Node.js mit Prisma Client
const packageWithReqs = await prisma.workPackage.findUnique({
  where: { id: 'WP-015' },
  include: {
    requirements: {
      where: { status: 'confirmed' },
      include: {
        requirement: true
      }
    }
  }
});

console.log(packageWithReqs.requirements.map(pr => ({
  id: pr.requirement.id,
  title: pr.requirement.title,
  source: pr.requirement.filePath
})));
```

### Packages für ein Requirement finden

```javascript
const requirementWithPkgs = await prisma.requirement.findUnique({
  where: { id: 'FR-CMS-Dashboard-001' },
  include: {
    packages: {
      where: { status: 'confirmed' },
      include: {
        package: true
      }
    }
  }
});

console.log(requirementWithPkgs.packages.map(pr => ({
  id: pr.package.id,
  title: pr.package.title
})));
```

## Workflow-Tipps

### Batch-Processing

Bestätige alle High-Confidence Matches auf einmal:

```bash
# In Prisma Studio:
# 1. Tabelle PackageRequirement öffnen
# 2. Filter: status = "suggested" AND confidence >= 0.8
# 3. Alle auswählen (Checkbox oben)
# 4. Edit selected → status = "confirmed"
```

### Milestone-weise Review

Gehe die Packages Milestone für Milestone durch:

1. MS1 (Foundation): Fokus auf Auth, Dashboard, Basis-Module
2. MS2 (Content): Fokus auf Events, POIs, Tours, etc.
3. MS3 (Config): Fokus auf Design, Navigation, i18n
4. MS10 (QA): Fokus auf Testing, Security, Compliance

### Cluster-basiertes Review

Packages im selben Cluster haben oft ähnliche Requirements:

```sql
-- Alle Packages in Cluster "Sicherheit"
SELECT wp.id, wp.title
FROM work_packages wp
JOIN clusters c ON wp.clusterId = c.id
WHERE c.name = 'Sicherheit';
```

## Fortschritt tracken

```sql
-- Gesamt-Fortschritt
SELECT
  status,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 1) as percentage
FROM package_requirements
GROUP BY status;

-- Erwartetes Ergebnis nach Review:
-- status      | count | percentage
-- ------------|-------|----------
-- confirmed   | ~600  | ~60%
-- rejected    | ~300  | ~30%
-- suggested   | ~100  | ~10%
```

## Troubleshooting

### Zu viele False Positives?

Erhöhe Minimum Confidence:

```sql
DELETE FROM package_requirements
WHERE confidence < 0.5 AND status = 'suggested';
```

### Requirements fehlen?

Manuelle Zuordnung über Prisma Studio:
1. Tabelle `PackageRequirement` → "Add record"
2. `packageId`: z.B. "WP-015"
3. `requirementId`: z.B. "FR-Benutzer-Auth-001"
4. `status`: "confirmed"
5. `relevance`: "primary"

### Package hat keine Vorschläge?

Suche manuell in Requirements-Tabelle:
- Filter nach `category` (Funktional/Nicht-funktional)
- Filter nach `section` (z.B. "Dashboard")
- Volltext-Suche im `title` oder `description`

## Weitere Infos

Siehe vollständigen Plan: `PLAN-Requirements-Mapping.md`
