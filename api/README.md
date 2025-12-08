# REST API für Arbeitspakete-Datenbank

REST API Server für das CMS-Konzeption Repository mit vollständigem Zugriff auf Work Packages, Requirements und deren Mappings.

## Quick Start

```bash
# Dependencies installieren
npm install

# API Server starten
npm run api:start

# In separatem Terminal: API testen
curl http://localhost:3000/health
```

Der Server läuft standardmäßig auf **Port 3000**.

## Endpoints

### Health & Info

```bash
GET  /health              # Server health check
GET  /api/info            # API info + statistics
```

### Work Packages

```bash
GET    /api/packages                    # List all packages
GET    /api/packages/:id                # Get single package
POST   /api/packages                    # Create package
PATCH  /api/packages/:id                # Update package
DELETE /api/packages/:id                # Delete package

# Query Parameters für GET /api/packages:
# - milestone: Filter by milestone code (z.B. "MS1")
# - cluster: Filter by cluster name
# - status: Filter by status (draft/planned/in-progress/done)
# - search: Full-text search in id/title/description
```

### Requirements

```bash
GET    /api/requirements                # List all requirements
GET    /api/requirements/:id            # Get single requirement
POST   /api/requirements                # Create requirement
PATCH  /api/requirements/:id            # Update requirement
DELETE /api/requirements/:id            # Delete requirement

# Query Parameters für GET /api/requirements:
# - category: "Funktional" oder "Nicht-funktional"
# - type: "functional" oder "non-functional"
# - priority: "Must", "Should", "Could", "Won't"
# - status: "active", "deprecated", "implemented"
# - file: Filter by source file (partial match)
# - search: Full-text search in id/title/description
# - limit: Results per page (default: 100)
# - offset: Pagination offset (default: 0)
```

### Mappings (Package ↔ Requirement)

```bash
GET    /api/mappings                              # List all mappings
POST   /api/mappings                              # Create mapping
PATCH  /api/mappings/:packageId/:requirementId    # Update mapping
DELETE /api/mappings/:packageId/:requirementId    # Delete mapping
POST   /api/mappings/bulk-update                  # Bulk update mappings

# Query Parameters für GET /api/mappings:
# - packageId: Filter by package
# - requirementId: Filter by requirement
# - status: "suggested", "confirmed", "rejected"
# - relevance: "primary", "secondary", "testing"
# - minConfidence: Minimum confidence score (0.0-1.0)
```

### Milestones & Clusters

```bash
GET  /api/milestones      # List all milestones with package counts
GET  /api/clusters        # List all clusters with package counts
```

### Statistics & Reports

```bash
GET  /api/stats                        # Overall statistics
GET  /api/stats/coverage               # Requirements coverage by package
GET  /api/stats/requirements-by-file   # Requirements grouped by source file
```

## Beispiele

### 1. Alle Packages eines Milestones abrufen

```bash
curl "http://localhost:3000/api/packages?milestone=MS1"
```

### 2. Requirement mit allen zugeordneten Packages

```bash
curl http://localhost:3000/api/requirements/FR-CMS-Dashboard-042
```

### 3. Alle bestätigten Mappings mit hoher Confidence

```bash
curl "http://localhost:3000/api/mappings?status=confirmed&minConfidence=0.7"
```

### 4. Package erstellen

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

### 5. Mapping bestätigen

```bash
curl -X PATCH http://localhost:3000/api/mappings/WP-001/FR-CMS-Dashboard-042 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "confirmed",
    "relevance": "primary",
    "notes": "Confirmed by AI review"
  }'
```

### 6. Bulk Update für AI-Review Ergebnisse

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

### 7. Coverage Report abrufen

```bash
curl http://localhost:3000/api/stats/coverage | jq
```

## Response Format

Alle erfolgreichen Responses folgen diesem Format:

### List Responses
```json
{
  "count": 83,
  "data": [...]
}
```

### Paginated Responses (Requirements)
```json
{
  "total": 7429,
  "limit": 100,
  "offset": 0,
  "data": [...]
}
```

### Single Resource
```json
{
  "id": "WP-001",
  "title": "...",
  ...
}
```

### Error Responses
```json
{
  "error": "Error message"
}
```

## Status Codes

- `200 OK` - Erfolgreiche GET/PATCH Anfrage
- `201 Created` - Erfolgreiche POST Anfrage
- `204 No Content` - Erfolgreiche DELETE Anfrage
- `400 Bad Request` - Ungültige Eingabedaten
- `404 Not Found` - Ressource nicht gefunden
- `500 Internal Server Error` - Server-Fehler

## Konfiguration

Umgebungsvariablen in `.env`:

```bash
DATABASE_URL="file:./prisma/arbeitspakete.db"
API_PORT=3000
```

## Integration mit AI-Review

Nach dem AI-Review können die Ergebnisse per Bulk-Update angewendet werden:

```javascript
// AI-Review Ergebnisse laden
const results = JSON.parse(fs.readFileSync('ai-review-results.json'));

// Bulk Update vorbereiten
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

// API Call
fetch('http://localhost:3000/api/mappings/bulk-update', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ updates })
});
```

## CORS

CORS ist standardmäßig aktiviert, sodass die API von Web-Frontends aus verschiedenen Origins aufgerufen werden kann.

## Graceful Shutdown

Der Server unterstützt graceful shutdown bei SIGTERM/SIGINT:
- Schließt DB-Verbindungen
- Wartet auf laufende Requests
- Exit Code 0

## Entwicklung

```bash
# Server im Watch-Mode starten (mit nodemon)
npm run api:dev

# Logs in Datei schreiben
npm run api:start > api.log 2>&1 &
```

## Sicherheit

⚠️ **Wichtig:** Diese API hat aktuell keine Authentifizierung und ist nur für lokale Entwicklung gedacht!

Für Produktion sollten folgende Sicherheitsfeatures hinzugefügt werden:
- API Keys oder JWT Authentication
- Rate Limiting
- Input Validation mit Zod/Joi
- Helmet.js für Security Headers
- HTTPS
