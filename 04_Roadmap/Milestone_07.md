# **Milestone 7: Dashboard**

**Status:** 🔴 Geplant

## Kurzbeschreibung

Ein zentrales Dashboard zeigt allen Rollen relevante Informationen: offene Aufgaben, Monitoring-Alerts, Redaktionsstatus und Nutzungsstatistiken.

## Ziele & Mehrwert

* **Geschäftsziel:** Bessere Steuerung des Betriebs und mehr Transparenz gegenüber Kommunen.
* **Technisches Ziel:** Einführung eines aggregatorischen Dashboard-Frameworks.
* **Nutzerziel:** Redakteure und Admins erhalten einen schnellen Überblick über Systemzustände und Aufgaben.

## Bestandteile

### Dashboard-Core
* **Aufgabenübersicht („Meine Aufgaben"):**
  * Offene Freigaben und Review-Anfragen
  * Zugewiesene Inhalte mit Fälligkeitsdatum
  * Eskalierte Tickets und Support-Anfragen
  * Prioritäts-Kennzeichnung (Hoch, Mittel, Niedrig)
  * Filterung nach Typ, Status, Datum
  * Quick-Actions: Direkt aus Liste bearbeiten/freigeben

* **System-Status & Alerts:**
  * Fehler & Warnungen aus Monitoring (MS5)
  * Schnittstellenstatus (letzte Sync-Zeit, Fehler)
  * Job-Queue-Status (wartende, laufende, fehlgeschlagene Jobs)
  * Ressourcen-Auslastung (CPU, RAM, Speicher) als Ampel
  * System-Health-Score (0-100%)
  * Kritische Alerts mit Action-Buttons ("Problem beheben")

* **Modul-Status & Verfügbarkeit:**
  * Übersicht aller aktivierten Module mit Status
  * Versions-Informationen
  * Updates verfügbar (Badge)
  * Deaktivierte Module anzeigen
  * Performance-Metriken pro Modul (Response Times)

### Analytics & Reporting
* **Nutzerstatistiken:**
  * Aktive Nutzer (heute, Woche, Monat)
  * Neue Registrierungen
  * Login-Aktivitäten (Zeitreihen-Diagramm)
  * Top-Nutzer nach Aktivität
  * Nutzer nach Rollen (Balkendiagramm)
  * Geografische Verteilung (wenn verfügbar)

* **Content-Statistiken:**
  * Erstellte Inhalte (heute, Woche, Monat)
  * Inhalte nach Status (Entwurf, Veröffentlicht, Archiviert)
  * Inhalte nach Typ (News, Events, POIs, etc.)
  * Top-Autoren nach Anzahl Beiträge
  * Durchschnittliche Zeit bis zur Veröffentlichung
  * Content-Qualitäts-Score (vollständige vs. unvollständige Inhalte)

* **Redaktionsaktivität:**
  * Aktivitäts-Timeline (letzte 24h)
  * Wer hat was wann geändert
  * Workflow-Statistiken (Freigaben, Ablehnungen)
  * Durchschnittliche Bearbeitungszeit
  * Bottlenecks identifizieren (lange wartende Freigaben)
  * Team-Performance-Vergleich

* **API & Performance-Metriken:**
  * API-Aufrufe pro Zeitraum
  * Response Times (Durchschnitt, Median, P95, P99)
  * Error-Rates nach Endpoint
  * Top-Endpoints nach Nutzung
  * Cache-Hit-Rates
  * Datenbank-Query-Performance

* **Mobile App Statistiken:**
  * App-Downloads und aktive Installationen
  * App-Nutzung nach Plattform (iOS, Android, Web)
  * Beliebte Features/Module in der App
  * Crash-Reports und Fehlerraten
  * App-Versionen im Einsatz

### Widget-System & Personalisierung
* **Widget-Framework:**
  * Drag & Drop zur Anordnung von Widgets
  * Widget-Größen (Klein, Mittel, Groß, Extra-Groß)
  * Minimieren/Maximieren von Widgets
  * Widgets ein-/ausblenden
  * Dashboard-Layouts speichern und wiederherstellen

* **Verfügbare Widgets:**
  * Meine Aufgaben
  * Neueste Inhalte
  * System-Status
  * Analytics-Charts (mehrere auswählbar)
  * Schnellzugriffe (Favoriten)
  * Monitoring-Alerts
  * Kalender (bevorstehende Events)
  * Aktivitäts-Feed
  * Statistik-Kacheln (Zahlen mit Trend)
  * Custom-Widgets (für externe Module)

* **Rollen-basierte Dashboards:**
  * Admin-Dashboard: System-Status, Monitoring, Nutzerstatistiken
  * Redakteur-Dashboard: Aufgaben, Content-Statistiken, Aktivitäts-Feed
  * Prüfer-Dashboard: Offene Freigaben, Review-Statistiken
  * Manager-Dashboard: KPIs, Reports, Team-Performance
  * Default-Layouts pro Rolle
  * Personalisierung möglich (User kann Layout überschreiben)

### Export & Reporting
* **Report-Generator:**
  * Vordefinierte Reports (Nutzeraktivität, Content-Produktion, System-Performance)
  * Custom-Reports erstellen (Metrik-Auswahl, Zeitraum, Filter)
  * Export-Formate: PDF, Excel, CSV, JSON
  * Geplante Reports (täglich, wöchentlich, monatlich per E-Mail)
  * Report-Templates speichern und wiederverwenden

* **Dashboard-Export:**
  * Aktuelles Dashboard als PDF exportieren
  * Screenshots einzelner Widgets
  * Daten hinter Charts als CSV/Excel exportieren
  * Sharing-Links für Read-Only-Dashboards (zeitlich begrenzt)

### Real-Time Updates
* **Live-Daten:**
  * WebSocket-Verbindung für Echtzeit-Updates
  * Automatische Aktualisierung von Metriken (alle 30-60 Sekunden)
  * Live-Notifications bei kritischen Events
  * Pulsierende Badges bei neuen Aufgaben/Alerts
  * "Jetzt aktualisieren"-Button für manuelle Refresh

---
