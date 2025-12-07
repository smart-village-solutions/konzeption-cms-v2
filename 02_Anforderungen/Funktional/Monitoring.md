# Monitoring, Logging und Versionierung

Dieses Kapitel beschreibt die Anforderungen an System- und Performance-Monitoring, Logging, Nutzungsstatistiken sowie Release- und Versionierungsprozesse. Ziel ist es, Administrator:innen vollständige Transparenz über den Systemzustand, die Nutzung und potenzielle Probleme zu geben.

## Zweck und Mehrwert

**Herausforderungen:**
* Systemausfälle und Performance-Probleme müssen frühzeitig erkannt werden
* Kommunen benötigen Einblick in die tatsächliche App-Nutzung (welche Module werden genutzt?)
* Fehlersuche und Debugging ohne strukturierte Logs ist zeitaufwändig
* Externe Monitoring-Tools müssen integrierbar sein
* Compliance-Anforderungen verlangen detaillierte Audit-Logs

**Nutzen:**
* **Für IT-Administrator:innen**: Proaktive Überwachung, schnelle Fehlerdiagnose, Performance-Optimierung
* **Für Kommunen**: Datenbasierte Entscheidungen zur App-Weiterentwicklung
* **Für Support-Teams**: Schnellere Problemlösung durch strukturierte Logs
* **Für Management**: Transparenz über System-Auslastung und Nutzungsverhalten

---

## System-Monitoring

### Überwachung kritischer System-KPIs

**Anforderungen:**
* **CPU-Monitoring**:
  * Auslastung pro Core (in %)
  * Durchschnittliche Last (1min, 5min, 15min)
  * Load Average
  * CPU-Spitzen erkennen und alertieren
  * Historische Daten (letzte 24h, 7 Tage, 30 Tage)
* **RAM-Monitoring**:
  * Genutzter RAM (absolut in GB und in %)
  * Verfügbarer RAM
  * Swap-Nutzung (sollte minimal sein)
  * Memory-Leaks erkennen (kontinuierlicher Anstieg)
  * Per-Process-Memory-Usage (Top 10 Prozesse)
* **Speicher-Monitoring (HDD/SSD)**:
  * Freier Speicherplatz pro Partition (absolut und %)
  * I/O-Performance (Read/Write MB/s, IOPS)
  * Disk-Usage-Trends (Wachstum pro Tag/Woche)
  * Warnung bei < 20% freiem Speicher
  * Alert bei < 10% freiem Speicher (kritisch)
  * Größte Verzeichnisse und Dateien identifizieren
* **Netzwerk-Monitoring**:
  * Bandbreite (In/Out in MB/s)
  * Anzahl aktive Verbindungen
  * Latenz zu wichtigen Endpoints (API, DB, CDN)
  * Paketverlust und Fehlerrate
  * DDoS-Angriffe erkennen (ungewöhnlich hohe Request-Rate)
* **Datenbank-Monitoring**:
  * Anzahl aktive Connections (aktuell / max)
  * Slow Queries (> 1 Sekunde)
  * Deadlocks und Lock-Waits
  * Datenbank-Größe und Wachstum
  * Replikations-Lag (bei Master-Slave-Setup)
  * Cache-Hit-Rate
* **Web-Server-Monitoring**:
  * Anzahl Requests pro Sekunde
  * Durchschnittliche Response-Zeit
  * Fehlerrate (4xx, 5xx HTTP-Status)
  * Anzahl Worker-Prozesse
  * Queue-Länge

**Messkriterium:**
* Alle KPIs werden mindestens alle 60 Sekunden aktualisiert
* Historische Daten für mindestens 30 Tage verfügbar
* Dashboards laden in < 2 Sekunden
* Automatische Alerts bei Schwellwert-Überschreitungen innerhalb von 60 Sekunden

### Monitoring-Dashboard im CMS

**Anforderungen:**
* **Übersichts-Dashboard**:
  * Echtzeit-Anzeige aller wichtigen KPIs auf einer Seite
  * Status-Ampeln (Grün/Gelb/Rot) für jeden Bereich
  * "Alles OK"-Anzeige oder Liste aktueller Probleme
  * Letzte 5 Alerts prominent angezeigt
  * Quick-Links zu Detail-Ansichten
* **System-Health-Score**:
  * Gesamtbewertung: 0-100 Punkte
  * Berechnung aus allen KPIs (gewichtet)
  * Trend-Anzeige: Verbessert sich ↗ oder verschlechtert ↘
  * Historischer Verlauf (letzte 7 Tage)
* **Grafische Darstellung**:
  * Live-Charts für CPU, RAM, Disk, Netzwerk
  * Zeiträume auswählbar (1h, 24h, 7d, 30d)
  * Zoom und Pan in Charts
  * Export als PNG oder PDF
  * Vergleich mehrerer Zeiträume (z.B. diese vs. letzte Woche)
* **Detail-Ansichten pro Komponente**:
  * Klick auf KPI öffnet Detail-Seite
  * Erweiterte Metriken und Analysen
  * Korrelations-Analysen (z.B. CPU-Spike → hohe Request-Rate)
  * Log-Einträge für diesen Zeitraum anzeigen

**Messkriterium:**
* Dashboard aktualisiert sich automatisch alle 30 Sekunden
* Alle Charts laden in < 3 Sekunden
* Mobile-optimiert (responsive Design)
* Export-Funktionen vorhanden (PNG, PDF, CSV)

---

## Alerting bei ungewöhnlichen Systemzuständen

### Regel-basiertes Alerting

**Anforderungen:**
* **Vordefinierte Alert-Regeln**:
  * CPU > 80% für länger als 5 Minuten
  * RAM > 90% für länger als 2 Minuten
  * Disk < 15% frei
  * Response-Zeit > 3 Sekunden (Durchschnitt über 5 Min.)
  * Fehlerrate > 5% der Requests
  * Datenbank-Connections > 90% ausgelastet
  * Anzahl 5xx-Fehler > 50 in 5 Minuten
* **Benutzerdefinierte Alert-Regeln**:
  * Administrator:innen können eigene Regeln erstellen
  * Bedingungen kombinierbar (UND, ODER)
  * Beispiel: "Wenn CPU > 70% UND RAM > 80% DANN Alert"
  * Schwellwerte pro Umgebung (Dev, Staging, Prod) unterschiedlich
  * Test-Modus: Regel testen ohne echte Alerts zu senden
* **Alert-Prioritäten**:
  * **Critical** (Rot): Sofort handeln (System down, DB offline, kein Speicher)
  * **Warning** (Gelb): Bald handeln (CPU 80%, Disk 85%, hohe Fehlerrate)
  * **Info** (Blau): Zur Kenntnisnahme (Backup abgeschlossen, Update verfügbar)

**Messkriterium:**
* Alerts werden innerhalb von 60 Sekunden nach Schwellwert-Überschreitung gesendet
* False-Positive-Rate < 5%
* Mindestens 10 vordefinierte Alert-Regeln verfügbar
* Benutzerdefinierte Regeln können ohne Code erstellt werden

### Alert-Kanäle

**Anforderungen:**
* **E-Mail-Alerts**:
  * Versand an Admin-Gruppe oder individuelle Adressen
  * Betreff: Priorität + Kurzbeschreibung
  * Inhalt: Detaillierte Informationen, Zeitstempel, betroffene Komponente
  * Link zum Dashboard für weitere Details
* **SMS-Alerts**:
  * Für Critical-Alerts (optional)
  * Integration mit Twilio, Nexmo, AWS SNS
  * Kurze Nachricht: "CRITICAL: DB offline seit 5 Min."
  * Max. 1 SMS pro Stunde (um Kosten zu begrenzen)
* **Slack / Microsoft Teams**:
  * Webhook-Integration
  * Formatierte Nachrichten mit Farb-Coding
  * Buttons: "Dashboard öffnen", "Alert bestätigen", "Stummschalten"
  * Thread für Follow-up-Nachrichten (z.B. "Alert resolved")
* **PagerDuty / Opsgenie**:
  * Für On-Call-Management
  * Eskalation bei nicht-bestätigten Critical-Alerts
  * Integration über API
* **Push-Notifications (CMS-App)**:
  * Für angemeldete Admins in der CMS-App
  * Anklickbar: Öffnet Dashboard
* **Webhook (Custom)**:
  * POST-Request an beliebige URL
  * JSON-Payload mit allen Alert-Daten
  * HMAC-Signatur zur Verifikation

**Messkriterium:**
* Mindestens 5 Alert-Kanäle verfügbar
* Mehrere Kanäle parallel nutzbar
* Zustellung innerhalb von 30 Sekunden nach Alert-Trigger
* Webhook-Retry bei Fehler (3 Versuche mit Exponential Backoff)

### Anomalie-Erkennung

**Anforderungen:**
* **Automatische Baseline-Erkennung**:
  * System lernt normale Werte über 7-14 Tage
  * Erkennt Muster (z.B. hohe Last werktags 9-17 Uhr, niedrig nachts)
  * Alert bei signifikanter Abweichung vom Normal-Verhalten
* **Machine-Learning-basiert**:
  * Ungewöhnliche Spikes oder Drops erkennen
  * Früherkennung von schleichenden Problemen (z.B. Memory-Leak)
  * Korrelations-Analyse: Welche KPIs hängen zusammen?
* **Beispiele für Anomalien**:
  * Plötzlicher Traffic-Anstieg (10x normal) → DDoS-Verdacht
  * CPU-Spikes zu ungewöhnlichen Zeiten (nachts 3 Uhr)
  * Ungewöhnlich viele Login-Fehlversuche → Brute-Force-Angriff
  * Datenbank-Queries plötzlich 5x langsamer → Index-Problem

**Messkriterium:**
* Anomalie-Erkennung funktioniert nach 7 Tagen Training
* Erkennungsrate > 80% bei echten Problemen
* False-Positive-Rate < 10%
* Admin kann Baseline manuell anpassen

### Alert-Management

**Anforderungen:**
* **Alert-Übersicht im CMS**:
  * Liste aller aktiven und vergangenen Alerts
  * Filter nach Priorität, Status, Zeitraum, Komponente
  * Sortierung nach Zeit, Priorität
  * Suchfunktion
* **Alert-Status**:
  * **Offen**: Noch nicht bearbeitet
  * **Bestätigt**: Admin hat gesehen, arbeitet daran
  * **Gelöst**: Problem behoben
  * **Falsch-Alarm**: Kein echtes Problem
  * **Stummgeschaltet**: Temporär ignoriert (für X Stunden)
* **Alert-Aktionen**:
  * "Bestätigen"-Button (ändert Status auf "Bestätigt")
  * "Lösen"-Button (ändert Status auf "Gelöst")
  * "Stummschalten"-Button (keine weiteren Alerts für X Stunden)
  * Kommentar hinzufügen (z.B. "Ursache gefunden: Backup-Job")
  * Alert-Regel anpassen (wenn zu sensitiv)
* **Alert-Historie**:
  * Alle vergangenen Alerts archiviert (mindestens 90 Tage)
  * Statistiken: Häufigste Alerts, durchschnittliche Reaktionszeit
  * Trend: Werden Probleme häufiger oder seltener?

**Messkriterium:**
* Alert-Übersicht lädt in < 2 Sekunden
* Mindestens 4 Status-Zustände verfügbar
* Alert-Historie für mindestens 90 Tage verfügbar
* Export der Alert-Liste als CSV

---

## Anbindung externer Monitoring-Instanzen

### Standard-Monitoring-Tools

**Anforderungen:**
* **Prometheus-Integration**:
  * Metrics-Endpoint: `/metrics` (Prometheus-Format)
  * Alle System-KPIs als Prometheus-Metriken exportieren
  * Labels für Multi-Mandanten (Tenant-ID)
  * Scrape-Interval konfigurierbar
* **Grafana-Integration**:
  * Vorgefertigte Grafana-Dashboards
  * JSON-Export für einfachen Import
  * Datasource-Konfiguration dokumentiert
* **Elastic Stack (ELK)**:
  * Logs zu Elasticsearch senden (via Filebeat oder Logstash)
  * Kibana-Dashboards für Log-Analyse
  * Metricbeat für System-Metriken
* **Zabbix**:
  * Zabbix-Agent-Installation möglich
  * Template für CMS 2.0 bereitstellen
  * SNMP-Support (optional)
* **Nagios / Icinga**:
  * Check-Plugins für wichtige KPIs
  * NRPE-Support
* **Datadog / New Relic**:
  * Agent-Installation dokumentiert
  * Custom-Metrics-Integration
  * APM-Support (Application Performance Monitoring)

**Messkriterium:**
* Mindestens 5 externe Monitoring-Tools unterstützt
* Metrics-Endpoint antwortet in < 500ms
* Dokumentation für Integration jedes Tools verfügbar
* Beispiel-Konfigurationen bereitgestellt

### Health-Check-Endpoints

**Anforderungen:**
* **Einfacher Health-Check** (`/health`):
  * HTTP 200 OK wenn System läuft
  * HTTP 503 Service Unavailable wenn Probleme
  * Response: `{"status": "ok"}` oder `{"status": "error", "details": "DB offline"}`
  * Schnelle Antwort (< 100ms)
* **Detaillierter Health-Check** (`/health/detailed`):
  * Status jeder Komponente einzeln:
    - Web-Server: OK
    - Datenbank: OK
    - Redis: OK
    - Queue: OK
    - Storage: OK
  * Response-Zeiten pro Komponente
  * Nur für authentifizierte Admins sichtbar
* **Readiness-Check** (`/ready`):
  * Ist System bereit, Traffic zu empfangen?
  * Wichtig für Load-Balancer und Kubernetes
  * HTTP 200 wenn ready, HTTP 503 wenn nicht
* **Liveness-Check** (`/alive`):
  * Einfachster Check: Ist Prozess am Leben?
  * Immer HTTP 200 (außer System komplett down)
  * Für Kubernetes Liveness-Probes

**Messkriterium:**
* Health-Check-Endpoints antworten in < 100ms
* Mindestens 3 Health-Check-Varianten verfügbar
* Kompatibel mit Kubernetes Health-Probes
* Detaillierter Check gibt Status aller Komponenten zurück

### Metriken-Export

**Anforderungen:**
* **Standard-Formate**:
  * Prometheus-Format (Text-basiert)
  * JSON-Format (für Custom-Integrationen)
  * StatsD-Format (für Graphite)
* **Metriken-Typen**:
  * **Counters**: Anzahl Requests, Errors, Events (monoton steigend)
  * **Gauges**: Aktuelle Werte (CPU, RAM, Connections)
  * **Histograms**: Verteilungen (Response-Zeiten, Request-Größen)
  * **Summaries**: Quantile (p50, p95, p99 Response-Zeit)
* **Custom-Metriken**:
  * Administrator:innen können eigene Metriken definieren
  * Beispiel: "Anzahl versendeter Push-Notifications pro Stunde"
  * API zum Inkrementieren von Metriken
* **Metriken-Retention**:
  * High-Resolution-Metriken: 24 Stunden (alle 10 Sekunden)
  * Medium-Resolution: 7 Tage (alle 1 Minute)
  * Low-Resolution: 90 Tage (alle 5 Minuten)

**Messkriterium:**
* Mindestens 3 Export-Formate verfügbar
* Alle 4 Metriken-Typen (Counter, Gauge, Histogram, Summary) unterstützt
* Custom-Metriken können ohne Code-Änderung definiert werden
* Metriken-Retention mindestens 90 Tage

---

## Logging

### Application-Logs

**Anforderungen:**
* **Log-Levels**:
  * **DEBUG**: Detaillierte Informationen für Entwicklung
  * **INFO**: Wichtige Ereignisse (User Login, Inhalte erstellt)
  * **WARNING**: Warnungen (langsame Queries, deprecated APIs genutzt)
  * **ERROR**: Fehler (Exceptions, fehlgeschlagene Operationen)
  * **CRITICAL**: Kritische Fehler (System-Ausfall, Datenverlust)
* **Strukturierte Logs** (JSON):
  * Zeitstempel (ISO 8601, UTC)
  * Log-Level
  * Nachricht
  * Kontext (User-ID, Request-ID, Session-ID, IP-Adresse, User-Agent)
  * Stack-Trace (bei Errors)
  * Kategorien/Tags (z.B. "authentication", "content", "api")
* **Log-Kategorien**:
  * Authentication (Login, Logout, Token-Refresh)
  * Content (Erstellen, Bearbeiten, Löschen von Inhalten)
  * API (alle API-Requests mit Response-Code und -Zeit)
  * Database (Slow Queries, Connection-Errors)
  * Jobs (Background-Jobs, Cron-Tasks)
  * Security (Failed-Logins, Rate-Limiting, Suspicious Activities)
* **Sensitive-Data-Filtering**:
  * Passwörter werden nie geloggt
  * Tokens und API-Keys werden maskiert (nur erste/letzte 4 Zeichen)
  * Personenbezogene Daten nur mit Consent (DSGVO)
  * IP-Adressen anonymisiert (letztes Oktett auf .0)

**Messkriterium:**
* Alle Logs in strukturiertem JSON-Format
* Mindestens 5 Log-Levels unterstützt
* Sensitive Daten werden automatisch gefiltert
* Log-Rotation täglich oder bei > 100 MB

### Log-Viewer im CMS

**Anforderungen:**
* **Echtzeit-Log-Stream**:
  * Live-Anzeige neuer Log-Einträge (WebSocket)
  * Auto-Scroll zu neuesten Einträgen
  * Pausieren/Fortsetzen
  * Farbcodierung nach Log-Level
* **Log-Suche und -Filter**:
  * Volltextsuche über alle Logs
  * Filter nach: Log-Level, Zeitraum, Kategorie, User, IP, Request-ID
  * Regex-Suche unterstützt
  * Gespeicherte Filter (für häufige Suchen)
* **Log-Details**:
  * Klick auf Log-Eintrag öffnet Detail-Ansicht
  * Vollständiger Kontext (alle Felder)
  * Verwandte Logs (gleiche Request-ID, gleicher User)
  * Stack-Trace formatiert angezeigt
  * "Kopieren als JSON"-Button
* **Log-Export**:
  * Export als JSON, CSV, Plain-Text
  * Zeitraum auswählbar
  * Filter anwendbar
  * Download oder E-Mail-Versand

**Messkriterium:**
* Log-Viewer lädt in < 3 Sekunden
* Echtzeit-Stream mit < 500ms Latenz
* Suche über 1 Mio. Log-Einträge in < 5 Sekunden
* Export von bis zu 100.000 Einträgen möglich

### Audit-Logs

**Anforderungen:**
* **Protokollierte Aktionen**:
  * Alle Login-Versuche (erfolgreich + fehlgeschlagen)
  * Alle Inhalts-Änderungen (Erstellen, Bearbeiten, Löschen)
  * Alle Konfigurations-Änderungen (Module, Einstellungen, Benutzer)
  * Alle Berechtigungs-Änderungen (Rollen, Rechte)
  * Alle Datei-Uploads und -Downloads (von sensiblen Daten)
  * Alle API-Zugriffe (inkl. API-Key/Token)
* **Audit-Log-Daten**:
  * Zeitstempel (unveränderlich)
  * Aktion (z.B. "content.news.created")
  * User (Nutzer-ID + Name)
  * Objekt (z.B. "News-Artikel #123")
  * Alte Werte (JSON, vor Änderung)
  * Neue Werte (JSON, nach Änderung)
  * IP-Adresse
  * User-Agent
  * Request-ID (für Korrelation)
* **Unveränderlichkeit**:
  * Audit-Logs können nicht gelöscht oder bearbeitet werden (Append-Only)
  * Kryptografische Signatur (Hash-Chain) für Integritätsprüfung
  * Separate Datenbank oder Tablespace (isoliert vom Rest)
* **Compliance und Retention**:
  * DSGVO-konform: Personenbezogene Daten verschlüsselt
  * Retention: 90 Tage Standard, bis zu 2 Jahre konfigurierbar
  * Automatische Archivierung nach Ablauf
  * Lösch-Routine für alte Audit-Logs (mit Admin-Bestätigung)

**Messkriterium:**
* 100% aller kritischen Aktionen werden protokolliert
* Audit-Logs unveränderlich (kryptografisch gesichert)
* DSGVO-konform (verschlüsselt, Retention konfigurierbar)
* Zugriff auf Audit-Logs nur für autorisierte Admins

---

## Nutzungsstatistiken und Analytics

### App-Nutzungsstatistiken

**Anforderungen:**
* **Übersichts-Dashboard**:
  * Anzahl aktive Nutzer:innen (täglich, wöchentlich, monatlich)
  * Anzahl Seitenaufrufe / API-Requests
  * Durchschnittliche Session-Dauer
  * Bounce-Rate (wie viele verlassen App sofort?)
  * Top 10 meistbesuchte Seiten/Module
* **Nutzer-Demografie** (optional, DSGVO-konform):
  * Altersgruppen (anonymisiert)
  * Standort (Stadt/Region, nicht exakt)
  * Geräte (iOS/Android, Versionen)
  * App-Versionen (welche Versionen werden genutzt?)
* **Modul-Nutzung**:
  * Welche Module werden am häufigsten genutzt?
  * Welche Module werden nie genutzt? (Kandidaten für Deaktivierung)
  * Nutzungsdauer pro Modul
  * Conversion-Tracking (z.B. "Wie viele klicken von News zu Event?")
* **Content-Performance**:
  * Meist-angesehene Inhalte (News, Events, POIs)
  * Engagement-Metriken (Likes, Shares, Kommentare)
  * Welche Kategorien sind beliebt?
  * Welche Inhalte werden oft geteilt?

**Messkriterium:**
* Statistiken werden täglich aktualisiert
* Historische Daten für mindestens 12 Monate verfügbar
* Dashboard lädt in < 3 Sekunden
* DSGVO-konform (keine individuellen Nutzer-Profile ohne Consent)

### Dashboard für Nutzeraktivität und Performance

**Anforderungen:**
* **Echtzeit-Nutzer-Tracking**:
  * Anzahl aktuell online (Live-Counter)
  * Welche Seiten werden gerade angesehen (anonymisiert)
  * Geografische Verteilung (Karte mit Pins)
  * Geräte-Verteilung (iOS/Android, Tablet/Smartphone)
* **Performance-Metriken**:
  * Durchschnittliche Page-Load-Zeit (pro Seite/Modul)
  * API-Response-Zeiten (Durchschnitt, p95, p99)
  * Anzahl langsamer Requests (> 2 Sekunden)
  * Frontend-Performance (Time-to-Interactive, First-Contentful-Paint)
  * Backend-Performance (DB-Queries, Cache-Hit-Rate)
* **User-Journey-Analyse**:
  * Typische Pfade durch die App (Start → News → Event → Karte)
  * Drop-Off-Points (wo verlassen Nutzer:innen die App?)
  * Conversion-Funnels (z.B. Event-Anzeige → Anmeldung → Bestätigung)
  * Heatmaps (welche Bereiche werden oft angeklickt?)
* **Vergleichsanalysen**:
  * Diese Woche vs. letzte Woche
  * Diesen Monat vs. letzter Monat
  * Vor vs. nach großem Update
  * A/B-Test-Ergebnisse (wenn aktiviert)

**Messkriterium:**
* Echtzeit-Counter aktualisiert sich alle 5 Sekunden
* Performance-Daten für mindestens 90 Tage verfügbar
* User-Journey-Analyse für mindestens Top-10-Pfade
* Export aller Statistiken als CSV/PDF

### Datenschutz und DSGVO

**Anforderungen:**
* **Anonymisierung**:
  * Keine individuellen Nutzer-Profile ohne Consent
  * IP-Adressen anonymisiert
  * Aggregierte Daten (z.B. "1.234 Nutzer:innen" statt "User #123 hat ...")
* **Opt-In für detailliertes Tracking**:
  * Nutzer:innen können Tracking zustimmen (Cookie-Banner)
  * Ohne Zustimmung: Nur anonyme Basis-Statistiken
  * Mit Zustimmung: Detaillierte Nutzungsdaten, personalisierte Empfehlungen
* **Daten-Löschung**:
  * Nutzer:innen können alle ihre Daten löschen lassen (DSGVO Art. 17)
  * Automatische Löschung nach X Monaten Inaktivität (konfigurierbar)
  * Audit-Logs bleiben erhalten (gesetzliche Anforderung)
* **Transparenz**:
  * Nutzer:innen können ihre gespeicherten Daten einsehen
  * Download aller Daten als JSON (DSGVO Art. 20)
  * Datenschutzerklärung verlinkt

**Messkriterium:**
* Opt-In-Banner bei erstem App-Start
* Nutzer:innen können Tracking-Status jederzeit ändern (in Einstellungen)
* Daten-Löschung innerhalb von 48 Stunden
* Export aller Daten als JSON möglich

### Externe Analytics-Integration

**Anforderungen:**
* **Google Analytics 4**:
  * Integration via gtag.js
  * Event-Tracking für wichtige Aktionen
  * E-Commerce-Tracking (falls Shop-Modul)
  * Datenschutz-konform (IP-Anonymisierung, Opt-In)
* **Matomo (Piwik)**:
  * Self-Hosted-Option (DSGVO-freundlich)
  * Event-Tracking und Custom-Dimensions
  * Heatmaps und Session-Recordings (optional)
* **Plausible Analytics**:
  * Privacy-First-Alternative
  * Einfache Integration (ein Script-Tag)
  * Keine Cookies erforderlich
* **Custom-Analytics**:
  * Eigene Analytics-Lösung anbindbar (via API)
  * Webhook für Events

**Messkriterium:**
* Mindestens 3 externe Analytics-Tools unterstützbar
* Integration ohne Code-Änderung (über CMS-Konfiguration)
* DSGVO-konforme Standard-Einstellungen

---

## Versionierung und Release-Management

### Semantic Versioning

**Anforderungen:**
* **Versionsschema** (SemVer):
  * Format: `MAJOR.MINOR.PATCH` (z.B. 2.5.3)
  * MAJOR: Breaking Changes (nicht abwärtskompatibel)
  * MINOR: Neue Features (abwärtskompatibel)
  * PATCH: Bugfixes (abwärtskompatibel)
  * Pre-Release: `2.6.0-beta.1`, `2.6.0-rc.2`
* **Version im CMS anzeigen**:
  * Footer: "CMS 2.0 Version 2.5.3"
  * Admin-Dashboard: Aktuelle Version prominent angezeigt
  * Klick auf Version öffnet Changelog
* **Update-Benachrichtigung**:
  * "Neue Version verfügbar: 2.5.4"
  * Changelog anzeigen (Was ist neu?)
  * "Jetzt aktualisieren"-Button
  * Info über Breaking Changes (bei Major-Updates)

**Messkriterium:**
* Semantic Versioning konsequent eingehalten
* Version überall im System konsistent angezeigt
* Update-Benachrichtigung innerhalb von 24h nach Release

### Changelog

**Anforderungen:**
* **Changelog-Format**:
  * Gruppierung nach Version
  * Pro Version: Datum, Release-Typ (Major/Minor/Patch)
  * Kategorien:
    - 🚀 **Neue Features**: Neue Funktionen
    - 🐛 **Bugfixes**: Behobene Fehler
    - 🔧 **Änderungen**: Anpassungen bestehender Features
    - ⚠️ **Breaking Changes**: Nicht abwärtskompatible Änderungen
    - 🔒 **Security**: Sicherheits-Patches
  * Jeder Eintrag: Kurzbeschreibung + Issue-/PR-Nummer
* **Changelog im CMS**:
  * Eigene Seite: `/admin/changelog`
  * Filterbar nach Version, Kategorie
  * Suchfunktion
  * Link zu detaillierten Release-Notes (extern)
* **Changelog-Notification**:
  * Nach Update: "Was ist neu in Version 2.5.4?" anzeigen
  * Highlight der wichtigsten Änderungen
  * "Vollständigen Changelog anzeigen"-Link

**Messkriterium:**
* Changelog für alle Versionen verfügbar (mindestens letzte 2 Jahre)
* Mindestens 5 Kategorien (Features, Bugfixes, Changes, Breaking, Security)
* Changelog im CMS und extern (z.B. GitHub) verfügbar

### Deprecation-Policy

**Anforderungen:**
* **Deprecation-Warnungen**:
  * Veraltete APIs/Features werden als "deprecated" markiert
  * Warnung im Code (Log-Eintrag: "WARNING: API /v1/old-endpoint is deprecated")
  * Warnung im CMS (bei Nutzung veralteter Features)
  * Dokumentation: Wann wird deprecated Feature entfernt?
* **Deprecation-Zeitraum**:
  * Mindestens 12 Monate vor Entfernung
  * Ankündigung im Changelog + Release-Notes
  * Migration-Guide bereitstellen (Wie auf neue API wechseln?)
* **Deprecation-Log**:
  * Liste aller deprecated Features
  * Verwendung tracken: "Feature X wird von 3 Mandanten genutzt"
  * Benachrichtigung an betroffene Admins

**Messkriterium:**
* Deprecation-Warnungen für alle veralteten Features
* Mindestens 12 Monate Vorankündigung vor Entfernung
* Migration-Guide für jedes deprecated Feature verfügbar
* Nutzung deprecated Features wird geloggt

---

## Zusammenfassung

**System-Monitoring:** CPU, RAM, Disk, Netzwerk, DB, Web-Server mit Echtzeit-Dashboard und historischen Daten (30 Tage)

**Alerting:** Regel-basiert + Anomalie-Erkennung, 6 Alert-Kanäle (E-Mail, SMS, Slack, Teams, PagerDuty, Webhook), Alert-Management mit Status-Tracking

**Externe Integration:** Prometheus, Grafana, ELK, Zabbix, Nagios, Datadog mit Health-Check-Endpoints und Metriken-Export

**Logging:** Strukturierte JSON-Logs (5 Levels), Log-Viewer mit Echtzeit-Stream und Suche, unveränderliche Audit-Logs (DSGVO-konform, 90 Tage Retention)

**Nutzungsstatistiken:** App-Nutzung, Modul-Performance, Content-Analytics mit Echtzeit-Dashboard, User-Journey-Analyse, DSGVO-konform (Opt-In, Anonymisierung)

**Externe Analytics:** Google Analytics 4, Matomo, Plausible mit Opt-In-Management

**Versionierung:** Semantic Versioning (MAJOR.MINOR.PATCH), strukturierter Changelog (5 Kategorien), Deprecation-Policy (12 Monate Vorlauf)
