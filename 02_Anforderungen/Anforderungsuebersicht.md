# Vollständige Anforderungsübersicht CMS 2.0

*Stand: 7. Dezember 2025*

Diese Übersicht listet alle funktionalen und nicht-funktionalen Anforderungen aus dem Projekt auf, strukturiert nach Kategorien. Sie dient als Grundlage für den Abgleich mit den Milestones.

---

## 1. FUNKTIONALE ANFORDERUNGEN

### 1.1 Benutzer- und Rechteverwaltung

#### Rollen- und Rechtemanagement
- **[MUSS]** Fein abgestufte Rechtevergabe (bis auf Modul-/Funktionsebene)
- **[MUSS]** Eigene Rollen anlegbar (z.B. "Vereinsredakteur", "Fachadmin Tourismus")
- **[MUSS]** Rechte-Vererbung über Organisationsebenen (Landkreis → Gemeinde)
- **[MUSS]** Zugriff auf Inhalte/Module an Personen oder Rollen bindbar
- **[MUSS]** Automatische Dokumentation von Rechte-Änderungen
- **[SOLLTE]** Konfigurierbarer Genehmigungsworkflow für Rollen-/Rechteänderungen (Vier-Augen-Prinzip)
- **[SOLLTE]** Benachrichtigung bei wichtigen Änderungen
- **[KANN]** Temporäre Rollen-Übernahme für Support-Fälle
- **[MUSS]** Klarer Inhaltsbesitzer bei mehreren Bearbeitern
- **[SOLLTE]** Änderungsanträge für Co-Editoren

#### Authentifizierung und Sicherheit
- **[MUSS]** Zwei-Faktor-Authentifizierung (2FA)
- **[SOLLTE]** Passkeys-Unterstützung
- **[MUSS]** Zentraler Anmeldedienst (Keycloak)
- **[MUSS]** Single-Sign-On via SAML/OIDC (Kommunal-AD, BundID, Servicekonto)
- **[MUSS]** Verbindliche Passwort-Richtlinien (Mindestlänge, Rotation)
- **[MUSS]** Self-Service-Reset und Fallback-Codes
- **[MUSS]** Konfigurierbare Alerts bei Sicherheitsereignissen
- **[SOLLTE]** SIEM-Anbindung
- **[MUSS]** Benachrichtigung bei Login aus unbekannter Quelle
- **[SOLLTE]** Zusätzliche Verifizierung bei unbekannter Quelle
- **[MUSS]** Automatischer Logout nach Inaktivität (konfigurierbar, z.B. 30 Min.)
- **[MUSS]** Brute-Force-Schutz (Account-Sperre nach x Versuchen)
- **[SOLLTE]** Automatische Sperrung inaktiver Konten

#### Benutzer-Accounts und Profile
- **[MUSS]** Eigener Zugang pro Person mit Organisationszuordnung
- **[MUSS]** Einheitlicher Zugang für App und CMS
- **[MUSS]** Selbstverwaltung des Profils (Passwort, Kontaktdaten)
- **[MUSS]** Klare Trennung: interne Nutzer vs. externe Datenlieferanten
- **[SOLLTE]** Standardisierter Onboarding-Prozess (Einladung, Schulungsbestätigung)
- **[MUSS]** Automatisiertes Offboarding (Rollen, Tokens, Zugänge entziehen)
- **[SOLLTE]** Temporäre Vertretungsrechte mit Ablaufdatum

#### Datenschutz und Compliance
- **[MUSS]** Löschkonzept für personenbezogene Daten (DSGVO-konform)
- **[MUSS]** DSGVO-konformer Datenexport
- **[SOLLTE]** Erinnerungen an regelmäßige Überprüfungen (Accounts, Inhalte)
- **[MUSS]** Unveränderliches Audit-Log mit Export (CSV/JSON)
- **[SOLLTE]** Reporting-Dashboards (aktive Accounts, Rechteanträge, Audit-Findings)

#### Organisation und Struktur
- **[MUSS]** Mehrstufige Organisationsstrukturen (Landkreis → Region → Gemeinde → Ortsteil)
- **[MUSS]** Person kann in mehreren Organisationen tätig sein
- **[SOLLTE]** Namensnennung vs. Anonymität konfigurierbar (Privacy by Default)
- **[SOLLTE]** Einladungs- oder Bewerbungsprinzip für Organisationsbeitritt
- **[MUSS]** Mandantenfähigkeit mit delegierbarer Administration

---

### 1.2 Allgemeine CMS-Funktionen

#### Dashboard
- **[MUSS]** Zentrales Dashboard mit Schnellzugriff, Statistiken, Aktivitäts-Feed
- **[SOLLTE]** Widget-System (personalisierbar, rollen-spezifisch)
- **[MUSS]** Quick-Actions für häufige Aufgaben
- **[SOLLTE]** Systemstatus-Anzeige (Backups, Updates, Fehler)
- **[Messkriterium]** Dashboard lädt in < 2 Sekunden

#### Suche und Navigation
- **[MUSS]** Klare Navigationsstruktur (Menüs, Breadcrumbs)
- **[MUSS]** Komfortable Such- und Filterfunktion (Volltext + Felder)
- **[MUSS]** Filterung nach Datum, Relevanz, Modul, Status, Kommunen, Themen
- **[SOLLTE]** Kartentool für geografisch zugeordnete Inhalte

#### Standard-Filterkriterien (alle Tabellen)
- **[MUSS]** Filter: Kategorie, räumliche Zuordnung, Erstellungs-/Bearbeitungs-/Veröffentlichungsdatum
- **[SOLLTE]** Kombinierbare Filter
- **[SOLLTE]** Vordefinierte und benutzerdefinierte Datumsbereiche
- **[SOLLTE]** Gespeicherte Filter
- **[MUSS]** Aktive Filter sichtbar und löschbar

#### Export-Funktionen (alle Tabellen)
- **[MUSS]** CSV- und JSON-Export
- **[KANN]** Excel- (XLSX) und PDF-Export
- **[MUSS]** Export berücksichtigt aktive Filter
- **[SOLLTE]** Spaltenauswahl für Export
- **[SOLLTE]** Konfigurierbare Export-Optionen (Trennzeichen, Encoding, etc.)
- **[SOLLTE]** Asynchroner Export bei großen Datenmengen (>10.000)
- **[SOLLTE]** GeoJSON-Export für geografische Daten
- **[MUSS]** Alle Exporte im Audit-Log protokolliert
- **[Messkriterium]** Export von bis zu 10.000 Datensätzen in <10 Sekunden

#### Karten-Darstellung (geografische Inhalte)
- **[MUSS]** Umschalter Tabelle/Karte
- **[SOLLTE]** Hybrid-Ansicht (Split-Screen)
- **[MUSS]** Marker/Pins auf Karte, Clustering bei vielen Inhalten
- **[MUSS]** Klick auf Marker öffnet Bearbeitungsmaske
- **[SOLLTE]** Umkreissuche mit Radius
- **[SOLLTE]** Filter nach administrativem Bereich, Bounding Box
- **[SOLLTE]** Layer-Steuerung, Heatmap-Modus
- **[Messkriterium]** Kartenperformance: <2 Sek für bis zu 1000 Marker

#### Geo-Koordinaten-Eingabe
- **[MUSS]** Drei Eingabemodi: manuelle Koordinaten, Adress-Eingabe mit Geocoding, Karten-Auswahl
- **[SOLLTE]** Automatische Geocoding-Vorschläge
- **[SOLLTE]** Reverse Geocoding (Koordinaten → Adresse)
- **[MUSS]** Validierung der Koordinaten

---

### 1.3 App-Gestaltung und Navigation

#### App-Branding
- **[MUSS]** App-Name definierbar (mehrsprachig)
- **[MUSS]** App-Icon hochladen (automatische Größengenerierung)
- **[SOLLTE]** Icon-Validator, Vorschau auf verschiedenen Geräten

#### Farb-Verwaltung
- **[MUSS]** Primär-, Sekundär-, Akzentfarben definieren (Farb-Picker)
- **[SOLLTE]** Dark Mode / Light Mode (separate Farbpaletten)
- **[KANN]** Farbpaletten-Import aus CI-Styleguides
- **[KANN]** KI-gestützte Design-Übernahme aus Webseite
- **[MUSS]** Kontrast-Prüfung (WCAG 2.1 AA)
- **[SOLLTE]** Live-Vorschau auf verschiedenen Seiten/Geräten

#### Iconset und Schriftarten
- **[SOLLTE]** Standard-Iconset + Upload eigener Icons (SVG, PNG)
- **[SOLLTE]** Schriftart-Auswahl (System-Schriften oder Upload)
- **[SOLLTE]** Schriftgrößen-Konfiguration (Barrierefreiheit)

#### CI/CD-Unterstützung
- **[SOLLTE]** Automatisches Build-System bei Design-Änderungen
- **[SOLLTE]** Build-Status im CMS sichtbar
- **[SOLLTE]** Download-Links für Test-Builds

#### KI-gestützte Design-Übernahme
- **[KANN]** Design aus Webseite extrahieren (URL angeben)
- **[KANN]** Logo-Erkennung und Optimierung

#### Listenansichten-Verwaltung
- **[MUSS]** Zentrale Konfiguration von Listenansichten pro Inhaltstyp
- **[MUSS]** Darstellungsformen: Einfache Liste, Liste mit Vorschaubild, Karten-Layout, Grid, große Kacheln
- **[SOLLTE]** Konfigurierbar: Bildgröße, Spaltenanzahl, Text-Vorschau-Länge

---

### 1.4 Schnittstellen und Integrationen

#### API-Architekturen
- **[MUSS]** GraphQL-API (Schema-first, Mutations, Subscriptions, Playground)
- **[MUSS]** REST-API (RESTful, HATEOAS, OpenAPI 3.0 Spezifikation)
- **[SOLLTE]** OData-API v4 (Enterprise-Integrationen)
- **[SOLLTE]** Webhooks (Event-basierte Benachrichtigungen, Retry, Signierung)

#### Externe Datenstandards
- **[SOLLTE]** xZuFi-Standard (Verwaltungsleistungen, FIM-Portal-Sync)
- **[SOLLTE]** OParl 1.1 (Ratsinformationen, vollständige Konformität)
- **[SOLLTE]** Open311 GeoReport v2 (Melde-/Service-Anfragen)
- **[MUSS]** Schema.org (JSON-LD für SEO)
- **[SOLLTE]** GTFS (ÖPNV-Fahrplandaten, Static + Realtime)
- **[MUSS]** GeoJSON (Geodaten-Export/Import)

#### Fachverfahrens-Integrationen
- **[SOLLTE]** Ratsinformationssysteme (SessionNet, ALLRIS, SD.NET, BoRis.NRW)
- **[SOLLTE]** GIS-Systeme (ArcGIS, QGIS, WMS/WFS)
- **[SOLLTE]** ÖPNV-Systeme (GTFS-Feeds, HAFAS-API)
- **[SOLLTE]** Mängelmelder-Systeme (Open311, INSPIRE)
- **[KANN]** IoT-Plattformen (MQTT, FIWARE)

---

### 1.5 Monitoring und Logging

#### System-Monitoring
- **[MUSS]** Performance-Metriken (CPU, RAM, Disk-I/O, Netzwerk)
- **[MUSS]** Application-Metriken (Response-Zeit, Request-Rate, Fehlerrate)
- **[MUSS]** Datenbank-Monitoring (Connections, Slow Queries, Deadlocks)
- **[SOLLTE]** Historische Daten (mind. 30 Tage)
- **[Messkriterium]** KPIs alle 60 Sek. aktualisiert

#### Monitoring-Dashboard
- **[MUSS]** Übersichts-Dashboard (KPIs, Status-Ampeln, Aktivitäts-Feed)
- **[SOLLTE]** System-Health-Score (0-100)
- **[SOLLTE]** Grafische Darstellung (Live-Charts, Zeiträume wählbar)
- **[Messkriterium]** Dashboard lädt in < 3 Sek., mobile-optimiert

#### Alerting
- **[MUSS]** Vordefinierte Alert-Regeln (CPU, RAM, Disk, Response-Zeit, Fehlerrate)
- **[SOLLTE]** Benutzerdefinierte Alert-Regeln
- **[MUSS]** Alert-Prioritäten (Critical, Warning, Info)
- **[MUSS]** Alert-Kanäle (E-Mail, SMS, Slack/Teams)
- **[Messkriterium]** Alerts innerhalb 60 Sek. nach Schwellwert-Überschreitung

#### Logging
- **[MUSS]** Strukturiertes Logging (JSON, Log-Levels)
- **[MUSS]** Zentrale Log-Aggregation (ELK/OpenSearch, Loki, Splunk)
- **[SOLLTE]** Log-Rotation und -Archivierung
- **[MUSS]** Audit-Logging (DSGVO-relevante Aktionen)
- **[SOLLTE]** Performance-Logging (Application Performance Monitoring)

#### Nutzungsstatistiken
- **[SOLLTE]** Anonymisierte Statistiken (Module-Nutzung, Content-Aufrufe)
- **[SOLLTE]** Heatmaps, Klick-Tracking (DSGVO-konform, Opt-In)
- **[SOLLTE]** Custom-Events (z.B. "Formular abgeschickt")
- **[SOLLTE]** Export für externe Analytics-Tools (GA4, Matomo)

---

### 1.6 KI-Integration

#### KI-Konfiguration
- **[MUSS]** Zentrale Verwaltung von LLM-Zugangsdaten (OpenAI, Anthropic, Google, lokale Modelle)
- **[MUSS]** Verschlüsselte Speicherung aller API-Keys
- **[MUSS]** Rollenbasierte Zugriffskontrolle
- **[SOLLTE]** Cost-Monitoring, Rate Limiting
- **[SOLLTE]** MCP (Model Context Protocol) für alle KI-Funktionen

#### Content-Erstellung und -Optimierung
- **[SOLLTE]** Content-Vorschläge generieren (verschiedene Tonalitäten)
- **[SOLLTE]** Text umschreiben (vereinfachen, erweitern, kürzen)
- **[SOLLTE]** Leichte Sprache (BITV/WCAG-konform)
- **[SOLLTE]** Rechtschreibung, Grammatik, Stil-Vorschläge
- **[SOLLTE]** Automatische Übersetzungen (mehrere Sprachen)
- **[SOLLTE]** SEO-Optimierung (Meta-Daten, Keywords, Schema.org)

#### Medien und Barrierefreiheit
- **[SOLLTE]** Alt-Text-Generierung für Bilder
- **[SOLLTE]** Transkription (Audio/Video → Text)
- **[SOLLTE]** Untertitel-Generierung (WebVTT, SRT)
- **[SOLLTE]** WCAG-Compliance-Prüfung

#### Inhaltsverwaltung
- **[SOLLTE]** Automatische Kategorisierung (Tag-Vorschläge)
- **[SOLLTE]** Duplicate Detection
- **[SOLLTE]** Content-Empfehlungen (verwandte Inhalte)
- **[SOLLTE]** Semantische Suche

---

### 1.7 Hilfe- und Support-System

- **[MUSS]** Hilfeartikel direkt in Oberfläche (aus GitHub-Repo)
- **[SOLLTE]** Kontextsensitive Hilfe
- **[SOLLTE]** Automatische Übernahme von Repo-Änderungen
- **[SOLLTE]** Nutzer können Verbesserungen vorschlagen (Pull Requests)
- **[SOLLTE]** Integriertes Ticketsystem (Jira, GitHub Issues, Zammad)
- **[SOLLTE]** Automatischer Kontext-Versand bei Ticket-Erstellung
- **[MUSS]** CMS-Einführung für Erst-User (Onboarding-Tour)
- **[SOLLTE]** Tour jederzeit wiederholbar, überspringbar
- **[MUSS]** Volltextsuche in Hilfe (Auto-Suggest)
- **[SOLLTE]** Release Notes & Changelog sichtbar
- **[SOLLTE]** Feedback zu Hilfeartikeln (hilfreich? ja/nein)

---

### 1.8 App-Veröffentlichung / Releases

#### Store-Credentials
- **[MUSS]** Google Play Integration (Service Account JSON)
- **[MUSS]** Apple App Store Integration (API Keys)
- **[MUSS]** Sichere Speicherung von Keystores/Zertifikaten (verschlüsselt)
- **[SOLLTE]** Ablaufdatum-Tracking für iOS-Zertifikate

#### Release-Vorbereitung
- **[MUSS]** Versionsverwaltung (Semantic Versioning)
- **[MUSS]** Release Notes (mehrsprachig, Zeichenzähler)
- **[SOLLTE]** Store-Metadaten-Update (Screenshots, Beschreibung, Keywords)
- **[MUSS]** Release-Tracks (Internal, Closed, Open Testing, Production)
- **[SOLLTE]** Feature-Flags und A/B-Tests

#### Build- und Upload-Prozess
- **[MUSS]** CI/CD-Pipeline (GitHub Actions, GitLab CI, Jenkins)
- **[MUSS]** Android-Build (.aab, signiert)
- **[MUSS]** iOS-Build (.ipa, signiert)
- **[SOLLTE]** Fastlane-Integration
- **[SOLLTE]** Automatischer Store-API-Upload
- **[SOLLTE]** Fehlerbehandlung mit Retry-Logik

#### Status-Monitoring
- **[MUSS]** Live-Status-Anzeige im CMS
- **[SOLLTE]** Store-Review-Status abrufen
- **[SOLLTE]** Benachrichtigungen bei Veröffentlichung/Ablehnung

---

### 1.9 Daten-Löschkonzept

#### Datenklassifizierung
- **[MUSS]** Unterschiedliche Löschfristen je Datentyp (Nutzerdaten, Audit-Logs, Inhalte, UGC, etc.)
- **[MUSS]** Personenbezogene Daten: Löschung nach Deaktivierung + Aufbewahrungsfrist
- **[MUSS]** Audit-Logs: 6-12 Monate Aufbewahrung
- **[SOLLTE]** Automatische Archivierung alter Inhalte

#### Technische Umsetzung
- **[SOLLTE]** Soft-Delete (Wiederherstellung möglich, 30 Tage)
- **[MUSS]** Hard-Delete (physisch löschen + Backups bereinigen)
- **[SOLLTE]** Anonymisierung als Alternative
- **[MUSS]** Kaskadierendes Löschen (alle verknüpften Daten)
- **[MUSS]** System-übergreifendes Löschen (CDN, Caches, Keycloak)
- **[SOLLTE]** Backup-Bereinigung nach definierter Frist

#### Nutzerrechte
- **[MUSS]** Self-Service-Löschung (Account-Löschung durch Nutzer)
- **[SOLLTE]** Widerrufsfrist (z.B. 30 Tage)
- **[SOLLTE]** Wiederherstellung während Widerrufsfrist

#### Automatisierung
- **[MUSS]** Regelmäßige automatische Löschvorgänge (Cron-Jobs)
- **[SOLLTE]** Benachrichtigungen vor automatischer Löschung
- **[MUSS]** Dokumentation aller Löschvorgänge (Audit-Log)

---

### 1.10 Modulmanagement

#### Modulliste
- **[MUSS]** Übersichtliche Modulliste (Name, Beschreibung, Icon, Status, Version)
- **[SOLLTE]** Filter- und Suchfunktion
- **[SOLLTE]** Anzeige aktiver Installationen

#### Aktivierung/Deaktivierung
- **[MUSS]** Module mit wenigen Klicks aktivieren/deaktivieren
- **[SOLLTE]** Dependency-Check vor Aktivierung
- **[SOLLTE]** Warnung bei Deaktivierung abhängiger Module
- **[SOLLTE]** Bulk-Aktionen (mehrere Module gleichzeitig)
- **[SOLLTE]** Zeitgesteuerte Aktivierung/Deaktivierung
- **[SOLLTE]** Rollback-Mechanismus

#### Kosten und Lizenzierung
- **[SOLLTE]** Kostenanzeige bei Aktivierung
- **[SOLLTE]** Testversionen verfügbar
- **[SOLLTE]** Kostenübersicht aller Module

#### Berechtigungen
- **[SOLLTE]** Granulare Berechtigungen (wer darf welche Module aktivieren)
- **[KANN]** Zwei-Faktor-Authentifizierung für kritische Module
- **[SOLLTE]** Genehmigungs-Workflow

#### Protokollierung
- **[MUSS]** Vollständiges Audit-Log (Aktivierungen/Deaktivierungen)
- **[SOLLTE]** Benachrichtigungen bei kritischen Änderungen

---

### 1.11 Module (Übersicht)

Die folgenden 60 Module sind im Projekt dokumentiert. **Viele sind noch als Template strukturiert und müssen ausgearbeitet werden:**

#### Content-Module
1. **News** - Nachrichtenartikel
2. **Events** - Veranstaltungen
3. **Statische Seiten** - Feste Inhalte
4. **Bilderslider** - Bildgalerien
5. **Content-Widget** - Flexible Content-Bereiche
6. **Schwarzes Brett** - Community-Pinnwand
7. **Produkte und Dienstleistungen** - Angebote

#### Navigation & UI
8. **Header** - App-Kopfzeile
9. **Tabbar** - Untere Navigation
10. **Drawer-Navigation** - Seitenmenü
11. **Intro** - Begrüßungsbildschirme
12. **Kachel-Seiten** - Dashboard-Layouts
13. **Listen-Seiten** - Listenansichten
14. **Widget-Leiste** - Widget-Bereiche
15. **Dashboard mit Widget Store** - Personalisierbare Dashboards
16. **Einstellungen** - App-Einstellungen
17. **Störer** - Hinweise/Banner

#### Interaktive Funktionen
18. **Abfallkalender** - Müllabfuhr-Termine (teilweise ausgearbeitet)
19. **ÖPNV-Abfahrtszeiten** - Echtzeitfahrpläne
20. **Baustellen-Verkehrsstörungen** - Verkehrsmeldungen
21. **Baustellen-Widget** - Baustelleninfos
22. **Mängelmelder (einfach)** - Einfache Mängelerfassung
23. **Mängelmelder (mit Schnittstelle)** - Open311-Integration
24. **Feedback-Formular** - Nutzer-Feedback
25. **Umfragen** - Umfrage-Erstellung
26. **Umfrage-Widget** - Eingebettete Umfragen
27. **Bürgerbeteiligung** - Partizipationsplattform
28. **Hinweisgebersystem** - Whistleblower-Portal
29. **Fristenmelder** - Erinnerungen an Fristen

#### Kartenbasierte Module
30. **Karte** - Kartendarstellung mit POIs
31. **Touren** - Wander-/Radrouten
32. **Standort-Freigabe** - GPS-Freigabe
33. **Bikesharing-Angebote** - Fahrradverleih
34. **Car-Angebote** - Carsharing
35. **Gastro-Angebote** - Restaurants/Cafés
36. **Augmented Reality** - AR-Inhalte

#### Kommunikation & Social
37. **Push-Nachrichten** - Benachrichtigungen
38. **Nachrichten** - Messaging
39. **Postfach** - Persönliches Postfach
40. **Social Sharing** - Teilen-Funktionen
41. **Soziales Netzwerk** - Community-Features
42. **Chatbot-Integration** - KI-Chatbot

#### Verwaltung & Services
43. **Rathaus-Info-System (OParl)** - Ratsinformationen
44. **Kommunales Recht** - Rechtsdokumente
45. **Zuständigkeitsfinder** - Behördenfinder
46. **Stellenanzeigen** - Jobangebote
47. **Digitale Anzeigetafel** - Infotafeln
48. **Datenvisualisierung (Grafana)** - Dashboards

#### Weitere
49. **Event-Widget** - Event-Teaser
50. **Sensor-Widget** - IoT-Sensordaten
51. **Gutscheine** - Gutscheinsystem
52. **Vorteilssystem** - Bonusprogramm
53. **Merkliste** - Favoriten
54. **Mitfahr-Börse** - Mitfahrgelegenheiten
55. **Smartes Trampen** - Hitchhiking-App
56. **Suche** - Globale Suche
57. **Webview** - Externe Webseiten einbetten
58. **Wegweiser** - Orientierungshilfe
59. **Wetter** - Wettervorhersage
60. **Persönliches Profil** - Nutzerprofil
61. **Nutzer-Tracking** - Analytics (DSGVO-konform)

**Status:** Die meisten Module (ca. 55 von 60) sind noch als Template strukturiert und enthalten nur Platzhalter. **Priorität: Module müssen ausgearbeitet werden.**

---

## 2. NICHT-FUNKTIONALE ANFORDERUNGEN

### 2.1 Qualität und Zuverlässigkeit

#### Performance
- **[Messkriterium]** Backend-Antwortzeiten ≤ 500 ms (95% aller Anfragen)
- **[Messkriterium]** Frontend-Seitenaufbau ≤ 2 Sekunden
- **[Messkriterium]** Dashboard lädt in < 2 Sekunden
- **[Messkriterium]** Kartenperformance: < 2 Sek. für 1000 Marker

#### Verfügbarkeit und Ausfallsicherheit
- **[Messkriterium]** Jahresverfügbarkeit ≥ 99,5%
- **[Messkriterium]** Recovery Time Objective (RTO) < 4 Stunden
- **[SOLLTE]** Redundante Systeme, Failover-Mechanismen

#### Zuverlässigkeit
- **[Messkriterium]** Keine ungefangenen Exceptions im Produktivbetrieb
- **[MUSS]** Dokumentierte Fehlerbehandlung mit Logs

#### Skalierbarkeit
- **[Messkriterium]** Unterstützt ≥ 1.000 gleichzeitige Nutzer
- **[Messkriterium]** Verarbeitet ≥ 500.000 Inhaltsobjekte ohne Performanceeinbruch
- **[SOLLTE]** Horizontale Skalierung (Load-Balancing, Clustering)

---

### 2.2 Sicherheit und Datenschutz

#### Sicherheitskonzept
- **[MUSS]** Sicherheitsdokumentation (Hardening-Guide, Best Practices)
- **[SOLLTE]** Security-Checkliste (mind. 20 Punkte)
- **[SOLLTE]** Beispiel-Konfigurationen für 3 Sicherheitslevel

#### Datenklassifizierung
- **[SOLLTE]** Konfigurierbare Sicherheitslevel (Öffentlich, Intern, Vertraulich)
- **[MUSS]** Automatische Verschlüsselung für "Vertraulich"-Daten

#### BSI IT-Grundschutz
- **[MUSS]** Härtung aller Systeme nach BSI-Empfehlungen
- **[MUSS]** TLS 1.3 für alle externen Verbindungen
- **[MUSS]** Verschlüsselung at Rest (Datenbank, Backups)
- **[MUSS]** Multi-Factor Authentication (MFA) für Admin-Zugriffe
- **[MUSS]** Passwortrichtlinie nach BSI (mind. 12 Zeichen)
- **[SOLLTE]** Firewall, IDS/IPS, WAF, DDoS-Protection
- **[MUSS]** Zentrale Protokollierung (Log-Retention 6-12 Monate)
- **[SOLLTE]** Automatische Dependency-Checks (npm audit, Dependabot)

#### Backup und Recovery
- **[MUSS]** Automatisches Backup (konfigurierbare Intervalle)
- **[MUSS]** Verschlüsselte Backups (AES-256)
- **[SOLLTE]** Point-in-Time-Recovery
- **[Messkriterium]** Restore innerhalb 1 Stunde möglich

#### Privacy by Design/Default
- **[MUSS]** Datenminimierung, Zweckbindung, Transparenz
- **[MUSS]** Strengste Datenschutz-Einstellungen als Default
- **[MUSS]** Tracking standardmäßig deaktiviert (Opt-In)
- **[SOLLTE]** Privacy Dashboard für Nutzer
- **[SOLLTE]** Privacy Impact Assessment (PIA), DSFA

#### Zugriffskontrolle
- **[MUSS]** Rollenbasierte Zugriffskontrolle (RBAC)
- **[SOLLTE]** Attributbasierte Zugriffskontrolle (ABAC)
- **[MUSS]** Audit-Trail (wer hat wann was zugegriffen)
- **[SOLLTE]** Anomaly Detection (ungewöhnliche Zugriffsmuster)

---

### 2.3 Betrieb und Wartung

#### Installation
- **[SOLLTE]** One-Click-Installation (Linux-Installer, Docker-Compose, Helm-Chart)
- **[SOLLTE]** Setup-Wizard (7 Schritte)
- **[Messkriterium]** Installation in < 30 Minuten
- **[Messkriterium]** Erfolgsrate > 95%

#### Systemanforderungen
- **Minimal:** 2 Cores, 4 GB RAM, 50 GB SSD (bis 1.000 Nutzer)
- **Empfohlen:** 4 Cores, 16 GB RAM, 200 GB SSD (bis 10.000 Nutzer)
- **Software:** Nginx/Apache, PHP 8.2+, PostgreSQL 14+/MySQL 8.0+, Redis 6.0+, Node.js 18 LTS+

#### Deployment-Strategien
- **[SOLLTE]** Blue-Green-Deployment
- **[SOLLTE]** Canary-Deployment
- **[SOLLTE]** Rolling-Updates
- **[MUSS]** Zero-Downtime-Updates
- **[Messkriterium]** Updates ohne Downtime (< 1 Sek. Unterbrechung)

#### Wartung und Updates
- **[SOLLTE]** Automatische Updates (konfigurierbare Zeitfenster)
- **[MUSS]** Update-Benachrichtigungen
- **[SOLLTE]** Rollback-Mechanismus (< 5 Min.)
- **[MUSS]** Sicherheitsupdates innerhalb 24h (wenn Auto-Update aktiv)
- **[Messkriterium]** Update-Erfolgsrate > 98%

#### Monitoring und Überwachung
- **[MUSS]** Performance-Metriken (CPU, RAM, Disk, Netzwerk)
- **[MUSS]** Application-Metriken (Response-Zeit, Request-Rate, Fehlerrate)
- **[SOLLTE]** Echtzeit-Monitoring-Dashboard
- **[SOLLTE]** Alerting (E-Mail, SMS, Slack/Teams)

---

### 2.4 Nutzerfreundlichkeit

#### Gestaltung
- **[SOLLTE]** Light and Dark Mode
- **[SOLLTE]** Anpassbares Logo (basierend auf App-Icon)

#### Usability
- **[Messkriterium]** Nutzer benötigen < 2 Stunden Einarbeitung für Basisfunktionen
- **[Messkriterium]** Usability-Test mit SUS-Score ≥ 75

#### Barrierefreiheit (BITV 2.0 / WCAG 2.1 Level AA)
- **[MUSS]** Tastaturbedienbarkeit (alle Funktionen ohne Maus)
- **[MUSS]** Klarer Fokus-Indikator
- **[MUSS]** Farbkontrast 4,5:1 (7:1 empfohlen)
- **[MUSS]** Konsistente Navigation
- **[MUSS]** Verständliche Fehlerbehandlung
- **[MUSS]** Klickflächen mind. 44×44 Pixel
- **[MUSS]** Screenreader-Kompatibilität (NVDA, JAWS, VoiceOver)
- **[MUSS]** Zoomfähigkeit bis 200%
- **[MUSS]** Pflicht-Alternativtexte bei Bild-Uploads
- **[MUSS]** Überschriftenhierarchie (H1-H6, keine Sprünge)
- **[MUSS]** Semantische Strukturen (Listen, Tabellen, Zitate)
- **[MUSS]** Farbunabhängigkeit (keine Infos nur durch Farbe)
- **[SOLLTE]** Link-Text-Warnung bei generischen Texten
- **[MUSS]** Sprachauszeichnung (lang-Attribut)
- **[SOLLTE]** Video/Audio: Untertitel, Transkripte
- **[SOLLTE]** Kontrast-Checker integriert
- **[SOLLTE]** Vorschau-Modus (Farbfehlsichtigkeit, Screenreader)
- **[MUSS]** API-Output enthält alle Accessibility-Metadaten
- **[SOLLTE]** Automatisierte Tests (axe-core, Pa11y, WAVE)
- **[Messkriterium]** BITV-Test ≥ 90/100 Punkte
- **[Messkriterium]** WCAG 2.1 Level AA-Konformität (100% Pass kritische Regeln)
- **[Messkriterium]** 100% Tastatur-Navigierbarkeit
- **[Messkriterium]** 100% Text/UI-Elemente erfüllen Kontrast

#### Editor
- **[Messkriterium]** Mind. 80% der Testpersonen bewerten Inhaltsbearbeitung als "einfach"

#### Lokalisierung
- **[Messkriterium]** UI in mind. Deutsch und Englisch vollständig verfügbar

---

### 2.5 Interoperabilität und Integration

#### Offene Standards
- **[MUSS]** Verwendung offener API-Standards (REST/OpenAPI 3.0, GraphQL, OData v4)
- **[MUSS]** Standardisierte Datenformate (JSON, XML, CSV, GeoJSON)
- **[MUSS]** Offene Authentifizierung (OAuth 2.0, OpenID Connect, SAML 2.0)
- **[MUSS]** W3C-Standards (HTML5, CSS3, RDF, JSON-LD)
- **[Messkriterium]** 100% der APIs verwenden offene Standards
- **[Messkriterium]** API-Dokumentation öffentlich (OpenAPI)

#### Plattformunabhängigkeit
- **[MUSS]** Container-basiertes Deployment (Docker, Kubernetes)
- **[MUSS]** Unterstützung mehrerer Datenbanken (PostgreSQL, MySQL)
- **[SOLLTE]** Betrieb on-premises und Cloud
- **[Messkriterium]** Getestet auf mind. 2 Infrastrukturen

#### Datenaustausch
- **[MUSS]** Vollständiger Datenexport (JSON, XML, CSV, SQL)
- **[SOLLTE]** Import-Funktionen für Standard-CMS-Formate
- **[SOLLTE]** Migrationsskripte für gängige CMS
- **[Messkriterium]** Export/Import in mind. 3 Formaten

#### Versionierung
- **[MUSS]** Semantic Versioning für alle APIs
- **[SOLLTE]** Mind. 12 Monate Support für deprecated APIs
- **[MUSS]** Deprecation-Warnungen
- **[MUSS]** Changelog öffentlich
- **[Messkriterium]** API-Versioning implementiert (/v1/, /v2/)

#### Erweiterbarkeit
- **[SOLLTE]** Dokumentiertes Plugin-/Modul-System
- **[SOLLTE]** Hook-/Event-System für Erweiterungen

---

### 2.6 Governance und Nachhaltigkeit

#### Open Source
- **[MUSS]** Veröffentlichung unter OSI-konformer Lizenz (bevorzugt: EUPL 1.2, AGPLv3, GPLv3)
- **[MUSS]** Alle Abhängigkeiten kompatibel mit Lizenz
- **[MUSS]** LICENSE-Datei im Repository
- **[Messkriterium]** Code auf öffentlicher Plattform (GitHub, GitLab, OpenCode.de)

#### Community
- **[SOLLTE]** Öffentliches Issue-Tracking
- **[SOLLTE]** Öffentliche Roadmap
- **[SOLLTE]** Contribution Guidelines (CONTRIBUTING.md)
- **[SOLLTE]** Code of Conduct
- **[Messkriterium]** Mind. 80% Diskussionen öffentlich

#### Langfristige Wartung
- **[SOLLTE]** Klare Governance-Struktur (Maintainer, Stewards)
- **[SOLLTE]** Long-Term Support (LTS, mind. 2 Jahre)
- **[MUSS]** Regelmäßige Security-Updates (kritisch < 48h)
- **[SOLLTE]** Bus-Factor > 2 (mind. 3 Maintainer)
- **[Messkriterium]** GOVERNANCE.md, SECURITY.md vorhanden

#### Zeitgemäße Architektur
- **[SOLLTE]** Etablierte, langlebige Frameworks
- **[SOLLTE]** Keine veralteten Dependencies
- **[SOLLTE]** Microservices oder modularer Monolith
- **[SOLLTE]** API-first-Design
- **[SOLLTE]** Cloud-native Design (12-Factor App)
- **[SOLLTE]** Infrastructure as Code (IaC)
- **[Messkriterium]** Architecture Decision Records (ADRs)
- **[Messkriterium]** Alle Major-Dependencies aktiv maintained (Updates < 12 Monate)

---

### 2.7 Föderale IT-Architekturrichtlinien (FIT)

#### Systemarchitektur
- **[MUSS]** Modulare Bauweise (Microservices oder modularer Monolith)
- **[SOLLTE]** Unabhängige Deploybarkeit einzelner Module
- **[SOLLTE]** Event-driven Architecture

#### Offene Schnittstellen
- **[MUSS]** OpenAPI 3.0 Spezifikation für REST-APIs
- **[MUSS]** GraphQL-Schema öffentlich
- **[SOLLTE]** API-Dokumentation unter offener Lizenz (CC BY 4.0)
- **[SOLLTE]** Öffentliches API-Portal

#### Wiederverwendung
- **[SOLLTE]** Verwendung etablierter Open-Source-Frameworks
- **[SOLLTE]** Integration föderaler Basisdienste (BundID, GovData)

#### Standardkonformität
- **[MUSS]** Datenformate: JSON, XML, CSV, GeoJSON
- **[MUSS]** Protokolle: HTTPS (TLS 1.3), OAuth 2.0, OpenID Connect, SAML 2.0
- **[MUSS]** Compliance mit W3C-Standards (HTML5, CSS3, WCAG 2.1)
- **[SOLLTE]** REST-Prinzipien (HATEOAS, Statelessness)

#### Entkoppelung (Headless)
- **[MUSS]** API-first-Architektur
- **[MUSS]** Keine direkte Datenbankanbindung im Frontend
- **[MUSS]** Strikte Trennung Backend/Frontend

#### Digitale Souveränität
- **[MUSS]** 100% Open-Source-Stack
- **[MUSS]** Offene Datenformate
- **[SOLLTE]** Dokumentierte Migrations-Pfade
- **[MUSS]** Export aller Daten (JSON, CSV, SQL)
- **[MUSS]** Keine Abhängigkeit von proprietären Cloud-Services

#### Datenhaltung
- **[MUSS]** Open-Source-Datenbanken (PostgreSQL, MySQL, MariaDB)
- **[SOLLTE]** Datenbank-Abstraktionsschicht (ORM)
- **[SOLLTE]** Dokumentierte Datenbank-Schemas

---

### 2.8 Secure Software Lifecycle (BSI TR-03185-2)

#### Governance
- **[SOLLTE]** OSS Governance etabliert (Maintainer, Contributor-Roles)
- **[SOLLTE]** Security Policy (SECURITY.md)
- **[SOLLTE]** Vulnerability Disclosure Policy

#### Rechtliche Anforderungen
- **[MUSS]** Lizenzkonformität (SPDX-Identifiers, REUSE-Tool)
- **[SOLLTE]** Copyright-Hinweise in allen Quelldateien
- **[SOLLTE]** Bill of Materials (SBOM, SPDX/CycloneDX)

#### Sichere Entwicklung
- **[MUSS]** Code Review (mind. 2 Reviewer)
- **[SOLLTE]** Branch Protection (main/master geschützt)
- **[SOLLTE]** Signed Commits
- **[MUSS]** Static Application Security Testing (SAST)
- **[SOLLTE]** Dynamic Application Security Testing (DAST)
- **[SOLLTE]** Software Composition Analysis (SCA)
- **[SOLLTE]** Secret Scanning
- **[SOLLTE]** Security Champions im Team

#### Supply-Chain-Sicherheit
- **[SOLLTE]** Dependency Pinning (Lock-Files)
- **[SOLLTE]** Automatisierte Dependency-Updates (Dependabot, Renovate)
- **[SOLLTE]** Vulnerability Scanning (Snyk, npm audit)
- **[SOLLTE]** Signierte Releases (GPG, Cosign)
- **[SOLLTE]** SBOM bei jedem Release

---

## 3. PRIORITÄTEN UND STATUS

### Hohe Priorität (Must-Have)
- ✅ Benutzer- und Rechteverwaltung (größtenteils ausgearbeitet)
- ⚠️ CMS-Grundfunktionen (teilweise ausgearbeitet)
- ⚠️ Schnittstellen (teilweise ausgearbeitet)
- ⚠️ Monitoring (teilweise ausgearbeitet)
- ❌ Module (60 Module, ca. 55 nur Templates)
- ✅ Nicht-funktionale Anforderungen (vollständig dokumentiert)

### Mittlere Priorität (Should-Have)
- ⚠️ KI-Integration (grundlegend dokumentiert)
- ⚠️ Hilfe-System (grundlegend dokumentiert)
- ⚠️ App-Design (teilweise dokumentiert)
- ⚠️ Releases (grundlegend dokumentiert)

### Niedrige Priorität (Nice-to-Have)
- ❌ Erweiterte KI-Features
- ❌ Erweiterte Analytics
- ❌ AR-Integration

### Kritische Lücken
1. **Module ausarbeiten:** 55 von 60 Modulen sind nur Templates
2. **CMS-Grundfunktionen vervollständigen:** Content-Management, Medien-Management
3. **Schnittstellen detaillieren:** Konkrete API-Specs, Mapping-Logik
4. **Workflow-Management:** Freigabeprozesse, Versionierung

---

## 4. ZUSAMMENFASSUNG

### Anzahl Anforderungen
- **Funktional:** ca. 350+ konkrete Anforderungen
  - Benutzer/Rechte: ~40
  - CMS-Funktionen: ~100
  - App-Design: ~30
  - Schnittstellen: ~40
  - Monitoring: ~30
  - KI: ~30
  - Hilfe: ~15
  - Releases: ~20
  - Löschkonzept: ~15
  - Modulmanagement: ~30
  - Module: 60 Module (meist Platzhalter)

- **Nicht-funktional:** ca. 150+ konkrete Anforderungen
  - Performance: ~10
  - Sicherheit: ~50
  - Betrieb: ~40
  - Usability/Barrierefreiheit: ~30
  - Interoperabilität: ~15
  - Governance: ~15
  - FIT-Richtlinien: ~20
  - BSI-Lifecycle: ~15

### Detaillierungsgrad
- **Hoch:** Benutzer/Rechte, Nicht-funktionale Anforderungen
- **Mittel:** CMS-Funktionen, Monitoring, Schnittstellen
- **Niedrig:** Module (meiste nur Templates), einige CMS-Bereiche

### Empfohlene nächste Schritte
1. Module priorisieren und detailliert ausarbeiten (Top 10 zuerst)
2. CMS-Grundfunktionen vervollständigen (Content/Medien-Management)
3. Schnittstellen konkretisieren (API-Specs, Datenmodelle)
4. Workflow-Konzepte ausarbeiten (Freigaben, Versionierung)
5. Mit Milestones abgleichen und Arbeitspakete erstellen

---

*Diese Übersicht wurde automatisch aus allen Anforderungsdateien im Projekt generiert.*
