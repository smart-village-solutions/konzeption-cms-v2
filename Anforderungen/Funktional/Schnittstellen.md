# Schnittstellen und Integrationen

## 1. Zweck

Das Schnittstellen-Modul ermöglicht die nahtlose Integration des CMS mit externen Systemen, Fachverfahren und Datenquellen. Ziel ist die Bereitstellung einer flexiblen, standardkonformen API-Architektur, die sowohl moderne als auch etablierte Datenstandards unterstützt und einen reibungslosen Datenaustausch zwischen kommunalen Systemen, Smart-City-Komponenten und Drittanbietern gewährleistet.

---

## 2. Zielgruppen

- **Systemintegratoren**: Personen, die das CMS mit Fachverfahren und externen Systemen verbinden
- **API-Entwickler**: Entwickler, die auf die CMS-Daten über APIs zugreifen
- **Fachbereichsverantwortliche**: Mitarbeiter, die Daten aus Fachverfahren (Ratsinfo, GIS, ÖPNV) im CMS veröffentlichen
- **Smart-City-Manager**: Verantwortliche für die Integration von IoT-Plattformen und Smart-City-Diensten
- **IT-Administratoren**: Für Konfiguration, Monitoring und Wartung der Schnittstellen

---

## 3. Funktionsumfang

### 3.1 API-Architekturen

**Anforderung API-010: GraphQL-API**
- Zentrale GraphQL-API als primäre Schnittstelle für moderne Client-Anwendungen
- Schema-first-Ansatz mit typisiertem Schema
- Flexible Queries mit genauer Feldauswahl (vermeidet Over-Fetching/Under-Fetching)
- Mutations für Daten-Schreiboperationen
- Subscriptions für Echtzeit-Updates (WebSocket)
- Introspection für automatische API-Dokumentation
- Playground für interaktives Testen (GraphiQL)

**Anforderung API-020: REST-API**
- RESTful API nach Best Practices (Ressourcen-orientiert)
- Unterstützung für HTTP-Methoden: GET, POST, PUT, PATCH, DELETE
- HATEOAS-Links für Ressourcen-Navigation
- Content Negotiation (JSON, XML, CSV)
- Standard HTTP-Statuscodes (200, 201, 400, 401, 404, 500)
- Versionierung über URL-Pfad (`/api/v1/`, `/api/v2/`)
- OpenAPI 3.0 Spezifikation (Swagger)

**Anforderung API-030: OData-API**
- OData v4-Unterstützung für Enterprise-Integrationen
- Standardisierte Query-Syntax (`$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`)
- Metadaten-Dokument (`$metadata`)
- Batch-Requests für mehrere Operationen in einer HTTP-Anfrage
- Delta-Links für inkrementelle Synchronisation
- Kompatibilität mit Microsoft Power Platform, SAP, Dynamics 365

**Anforderung API-040: Webhooks**
- Event-basierte Benachrichtigungen an externe Systeme
- Konfigurierbare Webhook-Endpoints
- Event-Typen: `content.created`, `content.updated`, `content.deleted`, `user.created`, etc.
- Retry-Mechanismus bei fehlgeschlagenen Webhook-Aufrufen
- Signierung der Webhook-Payloads (HMAC-SHA256)
- Webhook-Logs und Monitoring

### 3.2 Externe Datenstandards

**Anforderung STD-010: xZuFi-Standard (Leistungen und Verfahren)**
- Import und Export von Verwaltungsleistungen im xZuFi-Format (XML)
- Unterstützung der xZuFi-Datenstruktur:
  - Leistungskatalog
  - Zuständigkeiten
  - Verfahrensbeschreibungen
  - Formulare und Dokumente
  - Gebühren und Kosten
- Automatische Synchronisation mit FIM-Portal (Föderales Informationsmanagement)
- Mapping von xZuFi-Daten zu CMS-Inhaltstypen
- Validierung gegen xZuFi-Schema

**Anforderung STD-020: OParl-Standard (Ratsinformationen)**
- Vollständige OParl 1.1-Konformität für Ratsinformationssysteme
- Bereitstellung von OParl-Endpoints:
  - `/oparl/v1.1/system` (System-Informationen)
  - `/oparl/v1.1/body` (Körperschaften)
  - `/oparl/v1.1/organization` (Gremien, Fraktionen)
  - `/oparl/v1.1/person` (Personen, Mandatsträger)
  - `/oparl/v1.1/meeting` (Sitzungen)
  - `/oparl/v1.1/agenda-item` (Tagesordnungspunkte)
  - `/oparl/v1.1/paper` (Drucksachen, Vorlagen)
  - `/oparl/v1.1/consultation` (Beratungen)
  - `/oparl/v1.1/file` (Dokumente, Anlagen)
- OParl-Objekttypen mit vollständigen Metadaten
- Externe Liste (External List) für große Sammlungen
- Pagination mit `next`-Links
- Import von OParl-Daten aus externen Ratsinformationssystemen (SessionNet, ALLRIS, SD.NET)

**Anforderung STD-030: Open311-Standard (Melde- und Service-Anfragen)**
- Open311 GeoReport v2-Konformität
- Service Discovery (`/services.json`)
- Service Requests:
  - POST `/requests.json` (neue Meldung erstellen)
  - GET `/requests.json` (Meldungen abrufen)
  - GET `/requests/{service_request_id}.json` (einzelne Meldung)
- Service Definitions mit Attributen (Text, Singlevaluelist, Multivaluelist, Number, Datetime)
- Geocoding-Integration für Standort-basierte Meldungen
- Status-Tracking (open, acknowledged, closed)
- Medien-Upload (Fotos von Mängeln)
- E-Mail-Benachrichtigungen bei Statusänderungen

**Anforderung STD-040: Schema.org (Semantische Strukturierung)**
- Strukturierte Daten für Suchmaschinenoptimierung (SEO)
- JSON-LD-Ausgabe für alle relevanten Inhaltstypen:
  - `Organization` (Verwaltung, Ämter)
  - `Event` (Veranstaltungen)
  - `Place` (Orte, Points of Interest)
  - `Article` (Nachrichtenartikel)
  - `GovernmentService` (Verwaltungsleistungen)
  - `Person` (Mitarbeiter, Mandatsträger)
  - `FAQPage` (Häufig gestellte Fragen)
- Google Rich Snippets-Unterstützung
- Automatische Generierung von Breadcrumb-Markup
- Validierung mit Google Structured Data Testing Tool

**Anforderung STD-050: GTFS (General Transit Feed Specification)**
- Import von ÖPNV-Fahrplandaten im GTFS-Format (ZIP mit CSV-Dateien)
- Unterstützung für GTFS Static (Fahrpläne) und GTFS Realtime (Echtzeitdaten)
- GTFS-Entitäten:
  - `agency.txt` (Verkehrsunternehmen)
  - `stops.txt` (Haltestellen)
  - `routes.txt` (Linien)
  - `trips.txt` (Fahrten)
  - `stop_times.txt` (Haltezeiten)
  - `calendar.txt` (Betriebskalender)
- GTFS Realtime-Feed für Verspätungen, Ausfälle, Fahrzeugpositionen
- Automatische Aktualisierung alle 60 Sekunden

**Anforderung STD-060: GeoJSON (Geodaten)**
- Export und Import von Geodaten im GeoJSON-Format
- Unterstützung für alle Geometry-Typen:
  - Point (Einzelpunkt)
  - LineString (Linie)
  - Polygon (Fläche)
  - MultiPoint, MultiLineString, MultiPolygon
  - GeometryCollection
- Feature Collections mit Properties
- CRS (Coordinate Reference System): WGS84, EPSG:3857, EPSG:25832
- Integration mit Kartenmodulen

### 3.3 Fachverfahrens-Integrationen

**Anforderung INT-010: Ratsinformationssysteme**
- Bidirektionale Integration mit:
  - SessionNet (Somacos)
  - ALLRIS (CC e-gov)
  - SD.NET (PROVOX)
  - BoRis.NRW
- Import von Sitzungen, Tagesordnungen, Vorlagen, Beschlüssen
- Automatische Synchronisation (täglich, stündlich, Echtzeit)
- Konfliktauflösung bei Datenänderungen
- Mapping von Gremien zu CMS-Strukturen
- PDF-Dokumente mit Volltext-Indizierung

**Anforderung INT-020: GIS-Systeme**
- Integration mit kommunalen GIS-Systemen:
  - ArcGIS (Esri)
  - QGIS Server
  - GeoServer
  - MapServer
- WMS (Web Map Service) für Kartenansichten
- WFS (Web Feature Service) für Vektorgeometrien
- WCS (Web Coverage Service) für Rasterdaten
- CSW (Catalogue Service for the Web) für Metadaten
- Geocoding und Reverse Geocoding
- Routing-Services

**Anforderung INT-030: ÖPNV-Auskunftssysteme**
- Integration mit:
  - EFA (Elektronische Fahrplanauskunft)
  - HAFAS (HaCon Fahrplan-Auskunfts-System)
  - Navitia
  - OpenTripPlanner
- Abfahrtszeiten in Echtzeit
- Fahrplanauskunft (Routing)
- Störungsmeldungen
- Auslastungsinformationen
- Barrierefreiheits-Informationen

**Anforderung INT-040: Tourismus-Systeme**
- Integration mit:
  - Feratel (Destination Management System)
  - DIRS21 (Tourismus-Datenbank)
  - TOMAS (Tourismus-Marketing-System)
  - RegioGraph (Kartendaten)
- Import von:
  - Unterkünfte (Hotels, Ferienwohnungen)
  - Sehenswürdigkeiten (POIs)
  - Gastronomie (Restaurants, Cafés)
  - Veranstaltungen
  - Touren und Routen (Wandern, Radfahren)
- Verfügbarkeitsabfragen
- Buchungssystem-Integration

**Anforderung INT-050: Verwaltungs-Fachverfahren**
- Integration mit:
  - OK.EWO (Einwohnerwesen)
  - Prosoz (Sozialwesen)
  - AKDB-Software (Bayern)
  - Kommunale Rechenzentren (KRZ, KRZN, RZF, etc.)
- Single Sign-On (SSO) für Mitarbeiter
- Daten-Export für Statistiken (anonymisiert)
- Formulardaten-Übertragung
- Schnittstellen zu E-Akte

**Anforderung INT-060: Zahlungssysteme**
- Payment Gateway-Integration:
  - PayPal
  - Stripe
  - Klarna
  - paydirekt
  - giropay
  - SEPA-Lastschrift
- PCI DSS-konforme Zahlungsabwicklung
- Rechnungserstellung und -versand
- Gebühren für Verwaltungsleistungen
- Spenden und Crowdfunding

**Anforderung INT-070: Bürgerkonto-Systeme**
- Integration mit:
  - BayernID
  - mCLOUD (Schleswig-Holstein)
  - BundID (geplant)
  - eID (elektronischer Personalausweis)
- Single Sign-On für Bürger
- Adressdaten-Synchronisation
- Berechtigungsnachweis (z.B. Schwerbehindertenausweis)
- Once-Only-Prinzip (Daten einmal eingeben)

### 3.4 Smart-City-Integrationen

**Anforderung IOT-010: IoT-Plattformen**
- Integration mit:
  - FIWARE (Context Broker)
  - The Things Network (LoRaWAN)
  - OpenSenseMap
  - ThingSpeak
  - AWS IoT Core
  - Azure IoT Hub
- NGSI-LD API (FIWARE)
- MQTT-Broker-Anbindung
- Sensor-Daten (Temperatur, Luftqualität, Lärm, Füllstand)
- Aktor-Steuerung (Beleuchtung, Bewässerung)
- Geo-Referenzierung von Sensoren

**Anforderung IOT-020: Smart Parking**
- Integration mit Parkleitsystemen:
  - ParkHere
  - EasyPark
  - APCOA FLOW
- Echtzeit-Belegungsdaten
- Preisauskunft
- Reservierung (falls verfügbar)
- Navigationshilfe zum Parkplatz

**Anforderung IOT-030: Smart Lighting**
- Integration mit intelligenten Beleuchtungssystemen
- Steuerung über CMS (dimmen, schalten)
- Störungsmeldungen
- Energie-Monitoring
- Zeitpläne für Beleuchtung

**Anforderung IOT-040: Umweltsensoren**
- Luftqualitätsdaten (PM2.5, PM10, NO2, O3, CO)
- Lärmpegelmessung
- Temperatur und Luftfeuchtigkeit
- Pollenflug-Daten
- UV-Index
- Visualisierung auf Karten und Dashboards

### 3.5 Medien und Content

**Anforderung MED-010: DAM-Systeme (Digital Asset Management)**
- Integration mit:
  - Bynder
  - Adobe Experience Manager Assets
  - Canto
  - Widen Collective
- Medien-Import (Bilder, Videos, Dokumente)
- Metadaten-Synchronisation (IPTC, EXIF)
- Asset-Suche
- Nutzungsrechte-Management

**Anforderung MED-020: Video-Streaming**
- Integration mit:
  - YouTube
  - Vimeo
  - Wistia
  - Brightcove
- Embedding von Videos
- Live-Streaming (z.B. Ratssitzungen)
- Untertitel und Transkripte
- Analytics (Aufrufe, Wiedergabezeit)

**Anforderung MED-030: Social Media**
- Integration mit:
  - Facebook (Pages, Events)
  - Twitter/X (Tweets, Timelines)
  - Instagram (Posts, Stories)
  - LinkedIn (Posts, Company Pages)
  - Mastodon
- Cross-Posting aus dem CMS
- Social Media Feed-Embedding
- Kommentare und Mentions
- Analytics (Reichweite, Engagement)

**Anforderung MED-040: Podcasts**
- Integration mit:
  - Spotify for Podcasters
  - Apple Podcasts Connect
  - Podigee
- RSS-Feed-Generierung
- Podcast-Hosting oder Referenzierung
- Transkripte und Shownotes
- Abonnenten-Statistiken

### 3.6 CMS-Integrationen

**Anforderung CMS-010: Typo3-Integration**
- **Bidirektionale Synchronisation** mit Typo3-Instanzen
- **Content-Import aus Typo3**:
  - Import von Seiten, Nachrichten (tx_news), Events (tx_events2), Formularen
  - Mapping von Typo3-Inhaltstypen zu CMS-Content-Types
  - Import von Typo3-Backend-Benutzern (fe_users, be_users)
  - Import von Kategorien und Tags (sys_category)
  - Medien-Import aus Typo3 Fileadmin (FAL - File Abstraction Layer)
  - Import von Metadaten (SEO, Open Graph)
- **Content-Export zu Typo3**:
  - Export von CMS-Inhalten als Typo3-kompatible Datenstruktur
  - REST-API für Typo3-Extensions (z.B. über Extbase/Fluid)
  - JSON-Export mit Typo3-spezifischen Feldern
- **Typo3-Extension als Bridge**:
  - Entwicklung einer Typo3-Extension für nahtlose Integration
  - Extension liest Inhalte über CMS-GraphQL-API
  - Frontend-Rendering in Typo3 mit Fluid-Templates
- **Single Sign-On (SSO)**:
  - Gemeinsame Benutzerverwaltung über OAuth 2.0 / SAML
  - Backend-Benutzer können sich in beiden Systemen mit einem Login anmelden
- **URL-Redirects**:
  - Automatische Weiterleitung alter Typo3-URLs zur neuen CMS-Struktur
  - 301-Redirects für SEO-Erhalt
- **Migration-Tools**:
  - Migrations-Assistent für vollständigen Umzug von Typo3 zu CMS
  - Datenbank-Migration mit Mapping-Tabellen
  - Testlauf-Modus mit Vorschau
  - Rollback-Funktion

**Anforderung CMS-020: WordPress-Integration**
- **Bidirektionale Synchronisation** mit WordPress-Instanzen
- **Content-Import aus WordPress**:
  - Import von Posts, Pages, Custom Post Types
  - Import von Kategorien, Tags, Custom Taxonomies
  - Import von WordPress-Benutzern (wp_users)
  - Import von Medien aus WordPress Media Library
  - Import von Kommentaren (optional)
  - Import von WooCommerce-Produkten (falls E-Commerce-Modul vorhanden)
  - Import von ACF-Felder (Advanced Custom Fields)
- **Content-Export zu WordPress**:
  - REST-API-kompatibel mit WordPress REST API v2
  - JSON-Export im WordPress-Format
  - WP-CLI-Integration für Bulk-Operations
- **WordPress-Plugin als Bridge**:
  - Entwicklung eines WordPress-Plugins für nahtlose Integration
  - Plugin liest Inhalte über CMS-REST/GraphQL-API
  - Gutenberg-Blöcke für CMS-Inhalte
- **Webhook-Integration**:
  - Automatische Benachrichtigung bei neuen WordPress-Posts
  - Synchronisation in Echtzeit über WordPress Webhooks
- **Single Sign-On (SSO)**:
  - OAuth 2.0-Integration mit WordPress
  - JWT-basierte Authentifizierung
- **Migration-Tools**:
  - Migrations-Assistent für vollständigen Umzug von WordPress zu CMS
  - Import von WordPress-XML-Export
  - Automatisches Mapping von Shortcodes zu CMS-Komponenten
  - Import von Yoast SEO-Metadaten

### 3.7 Webhook-System für Push und Automatisierungen

**Anforderung WEBHOOK-010: Erweiterte Webhook-Funktionen**
- **Outgoing Webhooks (Push-Benachrichtigungen)**:
  - Automatisches Senden von HTTP-POST-Requests bei CMS-Events
  - Konfigurierbare Event-Trigger:
    - `content.created`, `content.updated`, `content.deleted`, `content.published`
    - `user.created`, `user.updated`, `user.deleted`
    - `media.uploaded`, `media.deleted`
    - `comment.created`, `comment.moderated`
    - `workflow.status_changed` (z.B. Freigabe erteilt)
    - Custom Events für spezielle Use Cases
  - Webhook-Payload mit vollständigen Daten (oder nur ID für Lazy Loading)
  - Signierung mit HMAC-SHA256 für Sicherheit
  - Retry-Mechanismus mit Exponential Backoff (max. 5 Versuche)
  - Webhook-Logs: Erfolgreiche und fehlgeschlagene Aufrufe
- **Incoming Webhooks (Datenempfang)**:
  - Empfang von Daten über HTTP-POST an spezielle CMS-Endpoints
  - Authentifizierung über API-Key oder Shared Secret
  - Automatische Verarbeitung und Speicherung von Daten
  - Beispiel: GitHub Webhooks bei Code-Commits → Automatische Dokumentations-Updates
- **Workflow-Automatisierungen mit Webhooks**:
  - Zapier-Integration: CMS-Events triggern Zapier-Workflows
  - Make (formerly Integromat): Visuelle Automatisierungs-Workflows
  - n8n (Self-hosted): Open-Source-Alternative für Automatisierungen
  - IFTTT-Integration für einfache Automatisierungen
- **Webhook-Templates**:
  - Vorkonfigurierte Webhook-Templates für häufige Szenarien:
    - "Bei Veröffentlichung in Slack posten"
    - "Bei neuem Kommentar E-Mail senden"
    - "Bei Event-Erstellung in Google Calendar eintragen"
    - "Bei Änderung Git-Commit auslösen (GitOps)"
- **Webhook-Testing**:
  - Test-Webhook-Endpoint (z.B. webhook.site, requestbin.com)
  - Manuelle Trigger-Funktion zum Testen
  - Payload-Vorschau vor Aktivierung
- **Bedingte Webhooks (Conditional Webhooks)**:
  - Webhooks nur bei bestimmten Bedingungen auslösen
  - Beispiel: "Nur bei Events in Berlin" oder "Nur bei News mit Kategorie 'Wichtig'"
  - Filterregeln mit logischen Operatoren (AND, OR, NOT)

**Anforderung WEBHOOK-020: Synchronisation und Benachrichtigungen**
- **Content-Synchronisation über Webhooks**:
  - Echtzeit-Synchronisation mit externen Systemen
  - Bidirektionale Sync: Änderungen in CMS → externes System UND umgekehrt
  - Konfliktauflösung bei gleichzeitigen Änderungen (Last Write Wins oder manuelle Auflösung)
  - Delta-Sync: Nur geänderte Felder übertragen
- **Benachrichtigungs-System**:
  - In-App-Benachrichtigungen über WebSocket
  - Push-Benachrichtigungen an Browser (Web Push API)
  - E-Mail-Benachrichtigungen mit konfigurierbaren Templates
  - Slack/Microsoft Teams-Benachrichtigungen
  - SMS-Benachrichtigungen (über Twilio, Vonage) für kritische Events
- **Batch-Webhooks**:
  - Sammeln mehrerer Events und als Batch versenden (z.B. alle 5 Minuten)
  - Reduzierung der HTTP-Requests bei hoher Event-Frequenz
  - Konfigurierbare Batch-Größe und -Intervall
- **Webhook-Queues**:
  - Verwendung von Message Queues (RabbitMQ, Apache Kafka) für zuverlässige Delivery
  - Garantierte Zustellung auch bei temporären Ausfällen
  - Replay-Funktion: Webhooks erneut versenden

### 3.8 Authentifizierung und Autorisierung

**Anforderung AUTH-010: OAuth 2.0**
- OAuth 2.0 Server für externe Anwendungen
- Authorization Code Flow (für Web-Apps)
- Client Credentials Flow (für Server-to-Server)
- Refresh Tokens für lange Sessions
- Scopes für granulare Berechtigungen
- PKCE (Proof Key for Code Exchange) für mobile Apps

**Anforderung AUTH-020: OpenID Connect (OIDC)**
- OIDC-Provider für Single Sign-On
- ID-Tokens mit Benutzerinformationen
- UserInfo-Endpoint
- Discovery-Endpoint (`.well-known/openid-configuration`)
- Unterstützung für externe OIDC-Provider (BayernID, BundID)

**Anforderung AUTH-030: SAML 2.0**
- SAML Identity Provider (IdP)
- SAML Service Provider (SP)
- SSO für Enterprise-Systeme
- Attribute Exchange (Name, E-Mail, Rollen)
- Single Logout (SLO)

**Anforderung AUTH-040: API-Keys**
- Generierung von API-Keys für externe Entwickler
- Key-Rotation und Ablaufdatum
- Rate Limiting pro API-Key
- Scopes und Berechtigungen
- Usage-Tracking und Analytics

**Anforderung AUTH-050: JWT (JSON Web Tokens)**
- Signierte JWTs für API-Authentifizierung
- Claims für Benutzer-Identität und Rollen
- Token-Validierung mit öffentlichen Schlüsseln
- Kurze Lebensdauer (15 Minuten) + Refresh Tokens

### 3.7 Daten-Synchronisation

**Anforderung SYNC-010: Bidirektionale Synchronisation**
- Echtzeit-Synchronisation mit externen Systemen über Webhooks
- Change Data Capture (CDC) für inkrementelle Updates
- Konfliktauflösung bei gleichzeitigen Änderungen:
  - Last Write Wins
  - Merge-Strategien
  - Manuelle Konfliktlösung
- Synchronisations-Status im CMS

**Anforderung SYNC-020: Bulk-Import/Export**
- CSV-Import für Massendaten
- Excel-Import (.xlsx)
- XML-Import (mit konfigurierbarem Mapping)
- JSON-Import
- Validierung vor Import
- Vorschau und Fehlerprotokoll
- Export in allen unterstützten Formaten

**Anforderung SYNC-030: Datenmigration**
- Migrations-Assistenten für Altsysteme
- Import aus gängigen CMS (WordPress, Drupal, Typo3, Joomla)
- Automatisches Mapping von Feldern
- Historien-Erhalt (Versionierung)
- Medien-Migration
- URL-Redirects für alte Links

**Anforderung SYNC-040: Scheduler**
- Zeitgesteuerte Datenabfragen (Cron-Jobs)
- Konfigurierbarer Intervall (stündlich, täglich, wöchentlich)
- Retry-Mechanismus bei Fehlern
- Benachrichtigungen bei fehlgeschlagenen Jobs
- Job-Historie und Logs

### 3.8 API-Sicherheit

**Anforderung SEC-010: Rate Limiting**
- Anfragen-Beschränkung pro API-Key/IP:
  - Unauthentifiziert: 100 Anfragen/Stunde
  - Authentifiziert: 1000 Anfragen/Stunde
  - Premium: 10.000 Anfragen/Stunde
- HTTP-Header: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`
- 429 Too Many Requests-Antwort bei Überschreitung

**Anforderung SEC-020: CORS (Cross-Origin Resource Sharing)**
- Konfigurierbare CORS-Policy
- Whitelist für erlaubte Origins
- Preflight-Requests (OPTIONS)
- Credentials-Support
- Exposed Headers

**Anforderung SEC-030: API-Versionierung**
- URL-basierte Versionierung (`/api/v1/`, `/api/v2/`)
- Deprecation Warnings bei alten Versionen
- Sunset-Header mit Ablaufdatum
- Migrationsguide zwischen Versionen
- Mindestens 12 Monate Support für alte Versionen

**Anforderung SEC-040: Input-Validierung**
- Schema-basierte Validierung (JSON Schema, GraphQL Schema)
- Sanitization von Benutzereingaben
- XSS-Prävention
- SQL-Injection-Schutz
- Validierungs-Fehler mit hilfreichen Meldungen

**Anforderung SEC-050: Encryption**
- TLS 1.3 für alle API-Endpoints
- HTTPS Strict Transport Security (HSTS)
- Certificate Pinning für mobile Apps
- Verschlüsselte Credentials (AES-256)
- End-to-End-Verschlüsselung für sensible Daten

**Anforderung SEC-060: Audit Logging**
- Protokollierung aller API-Zugriffe:
  - Zeitstempel
  - Benutzer/API-Key
  - HTTP-Methode und Endpoint
  - Request/Response Payload (optional)
  - Status Code
  - Dauer
- SIEM-Integration (Security Information and Event Management)
- Compliance-Reports (DSGVO, BSI)

### 3.9 API-Dokumentation

**Anforderung DOC-010: OpenAPI/Swagger**
- Automatisch generierte OpenAPI 3.0-Spezifikation
- Swagger UI für interaktives Testen
- Code-Generierung für Client-Bibliotheken (JavaScript, Python, Java, PHP)
- Authentifizierung direkt in Swagger UI
- Try-it-out-Funktion

**Anforderung DOC-020: GraphQL Playground**
- GraphiQL oder Apollo Playground
- Schema-Explorer mit Introspection
- Query-History
- Variable-Editor
- Tabs für mehrere Queries
- Authentifizierung mit Bearer Token

**Anforderung DOC-030: API-Portal**
- Dediziertes Developer-Portal für externe Entwickler
- API-Referenz mit Beispielen
- Tutorials und Guides
- Changelog und Migration Guides
- Code-Samples in mehreren Sprachen
- API-Status-Dashboard (Uptime, Response Times)

**Anforderung DOC-040: Postman Collections**
- Exportierbare Postman Collections
- Environment-Variablen für unterschiedliche Umgebungen
- Vorkonfigurierte Requests mit Beispielen
- Tests und Assertions
- Automatisierte Collection-Updates

### 3.10 Performance und Skalierung

**Anforderung PERF-010: Caching**
- HTTP-Caching mit Cache-Control-Headers
- ETags für Ressourcen
- CDN-Integration (Cloudflare, Fastly, AWS CloudFront)
- Redis für API-Response-Caching
- Invalidierung bei Datenänderungen
- Edge-Caching für statische Inhalte

**Anforderung PERF-020: Pagination**
- Cursor-basierte Pagination für große Datenmengen
- Limit/Offset-Pagination als Alternative
- GraphQL Connections mit `edges` und `pageInfo`
- REST: Link-Header mit `next`, `prev`, `first`, `last`
- Standardmäßig 50 Einträge pro Seite, konfigurierbar bis 100

**Anforderung PERF-030: Field Selection**
- GraphQL: Exakte Feldauswahl in Queries
- REST: `fields`-Parameter (z.B. `?fields=id,title,author`)
- Sparse Fieldsets (JSON:API)
- Vermeidung von Over-Fetching

**Anforderung PERF-040: Batch Requests**
- GraphQL: Mehrere Queries in einer Anfrage
- REST: JSON-Array mit mehreren Operationen
- OData: `$batch`-Requests
- Transaktionale Verarbeitung
- Fehlerbehandlung bei Teil-Fehlschlägen

**Anforderung PERF-050: Compression**
- Gzip-Kompression für API-Responses
- Brotli-Kompression (wo unterstützt)
- Accept-Encoding-Header-Auswertung
- Mindestens 70% Größenreduktion

**Anforderung PERF-060: Load Balancing**
- Horizontale Skalierung mit mehreren API-Instanzen
- Load Balancer (Nginx, HAProxy, AWS ALB)
- Health Checks für Instanzen
- Session Affinity (falls erforderlich)
- Auto-Scaling bei hoher Last

### 3.11 Monitoring und Observability

**Anforderung MON-010: API-Metriken**
- Prometheus-Metrics-Endpoint (`/metrics`)
- Metriken:
  - Request Count (nach Endpoint, Methode, Status)
  - Response Time (P50, P95, P99)
  - Error Rate
  - Active Connections
  - Throughput (Requests/Second)
- Grafana-Dashboards

**Anforderung MON-020: Distributed Tracing**
- OpenTelemetry-Integration
- Trace-IDs für Request-Verfolgung über Services hinweg
- Span-Logs für einzelne Operationen
- Jaeger oder Zipkin für Trace-Visualisierung
- Korrelation mit Logs

**Anforderung MON-030: Health Checks**
- `/health`-Endpoint mit Status (healthy, unhealthy, degraded)
- Liveness-Probe für Container-Orchestrierung
- Readiness-Probe für Load Balancer
- Dependency-Checks (Datenbank, Redis, externe APIs)
- Response-Format: JSON mit Details

**Anforderung MON-040: Uptime Monitoring**
- Externe Uptime-Checks (Pingdom, UptimeRobot, StatusCake)
- SLA-Monitoring (99,9% Uptime)
- Status-Page für öffentliche API-Verfügbarkeit
- Incident-Management bei Ausfällen
- Automatische Benachrichtigungen

**Anforderung MON-050: Error Tracking**
- Sentry-Integration für API-Fehler
- Fehler-Kategorisierung (Client-Fehler vs. Server-Fehler)
- Stack Traces und Context
- Fehler-Aggregation und Trends
- Benachrichtigungen bei kritischen Fehlern

---

## 4. CMS-Konfiguration

**Anforderung CONF-010: API-Endpoint-Verwaltung**
- Zentrale Übersicht aller verfügbaren API-Endpoints
- Aktivierung/Deaktivierung einzelner Endpoints
- Custom Endpoints für spezielle Use Cases
- URL-Aliasing
- Redirect-Konfiguration

**Anforderung CONF-020: Datenstandard-Mapping**
- Visueller Mapper für Datenfelder (Drag & Drop)
- Vorlagen für gängige Standards (OParl, xZuFi, Open311)
- Validierung gegen Schema
- Vorschau der Ausgabe
- Export/Import von Mappings

**Anforderung CONF-030: Webhook-Verwaltung**
- Liste aller konfigurierten Webhooks
- Test-Funktion (Test-Payload senden)
- Logs und Status
- Retry-Konfiguration
- Secret-Management für Signierung

**Anforderung CONF-040: Rate-Limit-Konfiguration**
- Pro API-Key/Benutzerrolle unterschiedliche Limits
- Whitelist für vertrauenswürdige IPs
- Burst-Limits
- Benachrichtigungen bei Überschreitung

**Anforderung CONF-050: Cache-Einstellungen**
- Cache-TTL pro Endpoint
- Invalidierungs-Regeln
- Cache-Statistiken
- Manuelle Cache-Invalidierung

**Anforderung CONF-060: Schnittstellen-Builder für einfache Formate**
- Visueller Interface-Builder für einfache Standard-Schnittstellen
- **RSS-Feed-Generator**:
  - Auswahl der Inhaltstypen für Feed (News, Events, Blog)
  - Konfiguration von Feed-Metadaten (Titel, Beschreibung, Link, Logo)
  - Feldmapping (Welches CMS-Feld → RSS-Element)
  - Filterung (nur veröffentlichte Inhalte, bestimmte Kategorien)
  - Anzahl Einträge (z.B. letzte 50 Beiträge)
  - Feed-URL generieren (z.B. `/feeds/news.xml`)
  - RSS 2.0 und Atom 1.0 Support
- **JSON-Feed-Generator**:
  - Ähnlich RSS, aber JSON-basiert
  - JSON Feed 1.1 Standard
  - Konfigurierbare Feldauswahl
- **iCal/ICS-Feed für Veranstaltungen**:
  - Automatischer Export von Events im iCal-Format
  - Abonnierbar in Kalender-Apps (Apple Kalender, Google Calendar, Outlook)
  - Filterung nach Kategorien, Orten, Zeiträumen
- **Vorschau und Validierung**:
  - Live-Vorschau des generierten Feeds
  - Validierung gegen Standard (RSS Validator, Feed Validator)
  - Test-URL zum Abrufen
- **Versionierung und Historie**:
  - Feed-Konfigurationen speichern und versionieren
  - Wiederherstellung früherer Konfigurationen

**Anforderung CONF-070: Schnittstellen-Übersicht und Monitoring-Dashboard**
- **Zentrale Übersicht aller angebundenen Schnittstellen**:
  - Tabellarische Darstellung mit folgenden Spalten:
    - Schnittstellenname (z.B. "OParl Ratsinformation", "VBB ÖPNV", "Wetter-API")
    - Typ (Eingehend/Ausgehend/Bidirektional)
    - Protokoll (REST, GraphQL, OData, WebSocket, RSS, etc.)
    - Status-Ampel (Grün/Gelb/Rot)
    - Letzter erfolgreicher Abruf (Zeitstempel)
    - Nächster geplanter Abruf (bei geplanten Sync-Jobs)
    - Fehleranzahl (letzte 24h)
    - Aktionen (Test, Edit, Logs, Deaktivieren)
- **Status-Ampel-Logik**:
  - 🟢 **Grün**: Schnittstelle funktioniert, letzter Abruf erfolgreich (< 5 Minuten bei Echtzeit, < 1 Sync-Intervall bei geplanten Jobs)
  - 🟡 **Gelb**: Warnung - Letzte Anfrage hat länger gedauert als üblich, oder letzte Anfrage vor > 2 Sync-Intervallen
  - 🔴 **Rot**: Fehler - Schnittstelle nicht erreichbar, HTTP-Fehler, Timeout, oder > 5 Fehlversuche
  - ⚪ **Grau**: Deaktiviert oder noch nicht konfiguriert
- **Detailansicht pro Schnittstelle**:
  - Verbindungsstatus mit technischen Details
  - Uptime-Statistik (7 Tage, 30 Tage)
  - Letzte 20 Sync-Vorgänge mit Zeitstempel und Status
  - Fehlerprotokoll mit Stack Traces
  - Datenvolumen (importierte/exportierte Datensätze)
  - Response-Zeit-Diagramm
- **Bulk-Aktionen**:
  - "Alle testen" - alle Schnittstellen durchlaufen
  - "Fehlerhafte neu starten"
  - Export der Übersicht als CSV/PDF
- **Filterung und Suche**:
  - Nach Status filtern (nur fehlerhafte, nur aktive)
  - Nach Typ filtern (nur eingehend, nur ausgehend)
  - Volltextsuche nach Schnittstellenname
- **Benachrichtigungen**:
  - E-Mail-Alert bei Status-Wechsel zu "Rot"
  - Slack/Teams-Integration für Fehler-Notifications
  - Wöchentlicher Status-Report per E-Mail

**Anforderung CONF-080: Externe Datenquellen-Bibliothek**
- **Vorkonfigurierte Konnektoren für häufige Datenquellen**:
  - **Wetter-APIs**:
    - OpenWeatherMap (kostenlose und Premium-API)
    - Deutscher Wetterdienst (DWD) - CDC FTP-Server und OpenData-API
    - Weather.gov (USA)
    - Konfiguration: API-Key, Standort (Koordinaten oder Stadt), Update-Intervall
    - Datenfelder: Temperatur, Niederschlag, Wind, UV-Index, Warnungen
  - **ÖPNV-Datenquellen**:
    - VBB (Verkehrsverbund Berlin-Brandenburg) - HAFAS-API
    - DB (Deutsche Bahn) - Fahrplan-API
    - DELFI (deutschlandweite Schnittstelle)
    - GTFS-Import von Verkehrsverbünden
    - Echtzeitdaten: Verspätungen, Ausfälle, Störungen
  - **Umweltsensoren und IoT**:
    - luftdaten.info / Sensor.Community
    - OpenSenseMap (Umweltsensoren)
    - The Things Network (LoRaWAN-Sensoren)
    - FIWARE Context Broker
    - Datenfelder: Luftqualität (PM10, PM2.5), Lärm, Temperatur
  - **Weitere Datenquellen**:
    - Pegelstände (Flüsse, Seen) - PEGELONLINE
    - Pollenflug - DWD oder spezielle Pollendienste
    - Strompreise - SMARD (Bundesnetzagentur)
    - Abfallkalender - Müllabfuhr-APIs kommunaler Entsorger
- **Konnektor-Konfiguration**:
  - Einfache Setup-Wizards mit Schritt-für-Schritt-Anleitung
  - API-Key-Eingabe und Test-Verbindung
  - Auswahl der zu importierenden Datenfelder
  - Mapping zu CMS-Datenmodell (z.B. Wetterdaten → Custom Content Type "Wetter")
  - Update-Frequenz festlegen (alle 15 Min, stündlich, täglich)
- **Daten-Transformation**:
  - Einheit-Konvertierung (z.B. Fahrenheit → Celsius, mph → km/h)
  - Daten-Filterung (nur bestimmte Sensor-Typen)
  - Daten-Aggregation (Durchschnitt über mehrere Sensoren)
- **Fehlertoleranz**:
  - Fallback auf gecachte Daten bei API-Ausfall
  - Automatische Wiederholungsversuche mit Exponential Backoff
  - Benachrichtigung bei dauerhaften Problemen

---

## 5. Rollen und Rechte

| Rolle | View API Docs | Create API Key | Configure Integrations | Monitor API | Manage Webhooks |
|-------|---------------|----------------|------------------------|-------------|-----------------|
| System Admin | ✅ | ✅ | ✅ | ✅ | ✅ |
| API Manager | ✅ | ✅ | ✅ | ✅ | ✅ |
| Developer | ✅ | ✅ (eigene) | ❌ | ✅ (eigene) | ❌ |
| Content Manager | ✅ | ❌ | ❌ | ❌ | ❌ |
| Viewer | ✅ | ❌ | ❌ | ❌ | ❌ |

---

## 6. Workflow und Prozesse

### 6.1 API-Key-Vergabe für externe Entwickler

1. **Registrierung**: Entwickler registriert sich im Developer Portal
2. **Bestätigung**: E-Mail-Bestätigung
3. **Antrag**: Antrag auf API-Key mit Beschreibung des Use Cases
4. **Prüfung**: API Manager prüft Antrag
5. **Genehmigung**: API-Key wird generiert und per E-Mail zugesandt
6. **Monitoring**: Nutzung wird überwacht
7. **Erneuerung**: Jährliche Erneuerung oder bei Ablauf

### 6.2 Integration externer Fachverfahren

1. **Anforderungsanalyse**: Welche Daten sollen ausgetauscht werden?
2. **Standard-Auswahl**: Passenden Datenstandard wählen (OParl, xZuFi, etc.)
3. **Mapping**: Datenfelder mappen (CMS ↔ Fachverfahren)
4. **Test-Integration**: Import/Export in Testumgebung
5. **Validierung**: Datenqualität prüfen
6. **Go-Live**: Integration in Produktion schalten
7. **Monitoring**: Synchronisation überwachen

### 6.3 Fehlerbehandlung bei API-Integrationen

1. **Fehler-Erkennung**: Monitoring detektiert Fehler (HTTP 500, Timeout)
2. **Benachrichtigung**: API Manager erhält Alert
3. **Analyse**: Logs und Traces analysieren
4. **Retry**: Automatische Wiederholung (max. 3x)
5. **Eskalation**: Bei wiederholtem Fehler: Ticket an Entwickler
6. **Behebung**: Fehler wird behoben
7. **Nachtest**: Validierung der Lösung

---

## 7. Schnittstellen und Integrationen

### 7.1 Interne Abhängigkeiten

- **Benutzer-Modul**: Authentifizierung und Autorisierung für API-Zugriffe
- **Content-Management**: Bereitstellung von Inhalten über APIs
- **Medien-Modul**: Medien-Delivery über API
- **Benachrichtigungs-System**: Webhooks und Event-Notifications
- **Monitoring**: API-Metriken und Performance-Tracking

### 7.2 Externe Systeme

- **Ratsinformationssysteme**: SessionNet, ALLRIS, SD.NET, BoRis.NRW
- **GIS**: ArcGIS, QGIS Server, GeoServer
- **ÖPNV**: EFA, HAFAS, Navitia
- **Tourismus**: Feratel, DIRS21, TOMAS
- **IoT-Plattformen**: FIWARE, The Things Network, OpenSenseMap
- **Zahlungsanbieter**: PayPal, Stripe, Klarna
- **Social Media**: Facebook, Twitter, Instagram, LinkedIn
- **Video-Plattformen**: YouTube, Vimeo
- **Identity Provider**: BayernID, BundID, Keycloak

### 7.3 Technische Standards

- **GraphQL**: Schema, Queries, Mutations, Subscriptions
- **REST**: OpenAPI 3.0, HATEOAS, JSON, XML
- **OData v4**: Metadata, Queries, Batch Requests
- **OAuth 2.0**: Authorization Code Flow, Client Credentials
- **OpenID Connect**: ID Tokens, UserInfo
- **SAML 2.0**: SSO, Attribute Exchange
- **xZuFi**: XML-Schema für Verwaltungsleistungen
- **OParl 1.1**: JSON-basierter Ratsinformations-Standard
- **Open311 GeoReport v2**: Service Requests
- **Schema.org**: JSON-LD für SEO
- **GTFS**: Static und Realtime für ÖPNV
- **GeoJSON**: Geodaten-Format

---

## 8. Nicht-funktionale Anforderungen

**Anforderung NFR-010: Performance**
- API-Response-Zeit: < 200ms (P95)
- Durchsatz: > 1000 Requests/Second
- Concurrent Connections: > 10.000
- Uptime: 99,9% (SLA)

**Anforderung NFR-020: Skalierbarkeit**
- Horizontale Skalierung auf mehrere Server
- Auto-Scaling bei Lastspitzen
- CDN für globale Verfügbarkeit
- Database Read Replicas

**Anforderung NFR-030: Zuverlässigkeit**
- Graceful Degradation bei Ausfall externer Services
- Circuit Breaker für externe APIs
- Retry-Mechanismus mit Exponential Backoff
- Failover für kritische Komponenten

**Anforderung NFR-040: Wartbarkeit**
- API-Versionierung mit Backward Compatibility
- Deprecation Policy (12 Monate)
- Automatisierte Tests für alle Endpoints
- Rollback-Fähigkeit bei Fehlern

**Anforderung NFR-050: Interoperabilität**
- Standardkonforme APIs (GraphQL, REST, OData)
- Datenstandards (OParl, xZuFi, Open311, Schema.org)
- Content Negotiation (JSON, XML, CSV)
- Multi-Tenancy-Support

**Anforderung NFR-060: Sicherheit**
- OWASP API Security Top 10 konform
- Penetration Tests (halbjährlich)
- Security Headers (HSTS, CSP, X-Frame-Options)
- DDoS-Protection
- Web Application Firewall (WAF)

---

## 9. Monitoring und Analytics

**Anforderung ANA-010: API-Usage-Analytics**
- Dashboard mit:
  - Requests pro Tag/Woche/Monat
  - Top Endpoints
  - Top Consumers (API-Keys)
  - Fehlerrate
  - Response Time Distribution
- Export als CSV/PDF
- Vergleich mit Vorperiode

**Anforderung ANA-020: Integration-Monitoring**
- Status aller konfigurierten Integrationen
- Synchronisations-Statistiken
- Fehlerprotokolle
- Uptime-Tracking
- Alerting bei Problemen

**Anforderung ANA-030: Datenqualitäts-Monitoring**
- Vollständigkeit der synchronisierten Daten
- Validierungsfehler
- Duplikate
- Inkonsistenzen
- Automatische Bereinigung (wo möglich)

---

## 10. Abhängigkeiten

**Technische Abhängigkeiten:**
- PostgreSQL/Supabase (Datenhaltung)
- Redis (Caching, Rate Limiting)
- GraphQL-Server (Apollo Server, Hasura)
- REST-Framework (Express.js, FastAPI, Spring Boot)
- API Gateway (Kong, Tyk, AWS API Gateway)
- Message Queue (RabbitMQ, Apache Kafka) für Webhooks
- Monitoring (Prometheus, Grafana, Sentry)
- OpenTelemetry (Distributed Tracing)

**Externe Abhängigkeiten:**
- Externe Fachverfahren (Ratsinfo, GIS, ÖPNV)
- IoT-Plattformen (FIWARE, TTN)
- Payment Gateways (Stripe, PayPal)
- Identity Provider (BayernID, BundID)
- Social Media APIs (Facebook, Twitter)

**Interne Abhängigkeiten:**
- Benutzer-Modul (OAuth, API-Keys)
- Content-Modul (Daten-Delivery)
- Medien-Modul (Asset-Delivery)
- Benachrichtigungs-Modul (Webhooks)

---

## 11. Offene Punkte und Risiken

**Offene Punkte:**
- [ ] Auswahl des API Gateway-Systems (Kong vs. Tyk vs. AWS)
- [ ] Definition der API-Versioning-Strategie (URL vs. Header)
- [ ] Festlegung der Standard-Datenformate (JSON vs. JSON-LD vs. XML)
- [ ] Lizenzkosten für kommerzielle Integrations-Software
- [ ] SLA-Definitionen für externe Integrationen

**Risiken:**
- **Änderungen in externen APIs**: Fachverfahren ändern ihre APIs ohne Vorwarnung
  - Mitigation: Monitoring, API-Tests, Versionskontrolle
- **Performance bei vielen Integrationen**: Synchronisation vieler externer Systeme kann System verlangsamen
  - Mitigation: Asynchrone Verarbeitung, Queue-System, Caching
- **Datenqualität**: Fehlerhafte Daten aus Fachverfahren
  - Mitigation: Validierung, Sanitization, manuelle Überprüfung
- **Compliance**: DSGVO-Compliance bei Datenaustausch mit Drittanbietern
  - Mitigation: AVV (Auftragsverarbeitungsverträge), Datenschutz-Folgenabschätzung
- **Vendor Lock-in**: Abhängigkeit von proprietären APIs
  - Mitigation: Abstraktionsschicht, standardisierte Schnittstellen

---

## 12. Glossar

- **API**: Application Programming Interface – Schnittstelle für Softwareanwendungen
- **GraphQL**: Abfragesprache für APIs mit flexibler Datenabfrage
- **REST**: Representational State Transfer – Architekturstil für APIs
- **OData**: Open Data Protocol – Standard für REST-APIs mit erweiterten Query-Funktionen
- **OAuth 2.0**: Autorisierungs-Framework für API-Zugriffe
- **OpenID Connect (OIDC)**: Authentifizierungs-Protokoll auf Basis von OAuth 2.0
- **SAML**: Security Assertion Markup Language – Standard für SSO
- **xZuFi**: Standard für Verwaltungsleistungen und Zuständigkeitsfinder
- **OParl**: Offener Standard für Ratsinformationssysteme
- **Open311**: Standard für Bürger-Meldungen und Service-Anfragen
- **Schema.org**: Vokabular für strukturierte Daten im Web
- **GTFS**: General Transit Feed Specification – Standard für ÖPNV-Fahrpläne
- **GeoJSON**: Format für geografische Datenstrukturen
- **FIWARE**: Open-Source-Plattform für Smart Cities
- **MQTT**: Message Queue Telemetry Transport – Protokoll für IoT
- **NGSI-LD**: Context Information Management API (FIWARE)
- **JWT**: JSON Web Token – Standard für sichere Token-basierte Authentifizierung
- **CORS**: Cross-Origin Resource Sharing – Browser-Sicherheitsmechanismus
- **HATEOAS**: Hypermedia as the Engine of Application State – REST-Prinzip
- **Circuit Breaker**: Entwurfsmuster zur Fehlertoleranz bei externen Services
