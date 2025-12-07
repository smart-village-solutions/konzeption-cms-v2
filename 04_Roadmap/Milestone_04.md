# **Milestone 4: Verwaltung der Schnittstellen**

**Status:** 🔴 Geplant

## Kurzbeschreibung

Die Integration externer Datenquellen wird zentralisiert, standardisiert und für Kommunen sichtbar gemacht. APIs können verwaltet, getestet und überwacht werden.

## Ziele & Mehrwert

* **Geschäftsziel:** Vereinfachung der Integrationsprozesse und bessere Wartbarkeit aller externen Datenströme.
* **Technisches Ziel:** Einführung eines Schnittstellenmanagers mit Test-, Mapping- und Sync-Funktionalität.
* **Nutzerziel:** Kommunen profitieren von stabilen, aktuellen Daten wie Abfallterminen, Baustellen oder Events.

## Bestandteile

* Schnittstellenmanager (UI)
* API-Key-Verwaltung
* Endpoint-Konfiguration
* Mapping-Editor
* Testwerkzeug für Integrationen
* Scheduling & Sync-Status
* Error-Handling

### API-Spezifikationen und Standards **[MUSS]**
* **GraphQL-API:**
  * Vollständige GraphQL-Schema-Definition für alle Datentypen
  * Query- und Mutation-Operationen für CRUD
  * Subscriptions für Echtzeit-Updates (z.B. neue Nachrichten)
  * Introspection aktiviert (Entwicklungsmodus)
  * GraphQL Playground/IDE für Entwickler
  * Query-Komplexitäts-Limits (DoS-Schutz)
  * Pagination: Cursor-basiert (Relay-Style) oder Offset-basiert
  * Fehlerbehandlung: Standardisierte Error-Codes und Nachrichten
  * Versionierung: Schema-Evolution ohne Breaking Changes

* **REST-API:**
  * RESTful-Architektur mit Ressourcen-orientierten Endpoints
  * HTTP-Methoden: GET, POST, PUT, PATCH, DELETE
  * Pagination: Link-Header, Offset/Limit, Cursor
  * Filtering: Query-Parameter (z.B. ?status=active&category=news)
  * Sorting: Query-Parameter (z.B. ?sort=createdAt:desc)
  * Response-Formate: JSON (Standard), Optional: XML, CSV
  * HTTP-Status-Codes korrekt verwenden (200, 201, 204, 400, 401, 403, 404, 500)
  * HATEOAS: Links zu verwandten Ressourcen in Responses
  * API-Versionierung: URL-basiert (z.B. /api/v1) oder Header-basiert

* **Schema.org-Integration:**
  * Automatische Generierung von Schema.org JSON-LD für alle Inhalte
  * Unterstützte Typen: Event, Place, Organization, Article, NewsArticle, JobPosting, Product, Service
  * Einbettung in HTML-Head oder als separate Endpoints
  * Validierung gegen Schema.org-Spezifikationen
  * SEO-Optimierung durch strukturierte Daten
  * Google Rich Snippets Support
  * Konfigurierbare Mappings: CMS-Felder → Schema.org-Properties

* **GeoJSON-Import:**
  * Import-Funktion für GeoJSON-Dateien (Geodaten-Quellen)
  * Unterstützte Feature-Typen: Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon
  * Automatische Extraktion von Koordinaten und Properties
  * Mapping von GeoJSON-Properties auf CMS-Felder (z.B. name, description, category)
  * Batch-Import: Mehrere Features gleichzeitig importieren
  * Validierung: GeoJSON-Syntax-Prüfung vor Import
  * Vorschau auf Karte vor Import
  * Update-Strategie: Neue Features anlegen oder bestehende aktualisieren (Match per ID oder Name)
  * Error-Handling: Fehlerbericht bei ungültigen Features, teilweise Imports möglich

---
