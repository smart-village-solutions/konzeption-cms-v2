# **Milestone 2: Ablösung der Kernmodule des alten CMS**

**Status:** 🔴 Geplant

## Kurzbeschreibung

Alle zentralen Module des bisherigen CMS werden modern, einheitlich und API-basiert neu implementiert. Diese Phase bildet den funktionalen Kern der Smart Village App ab und stellt die Nutzung in allen Kommunen sicher.

## Ziele & Mehrwert

* **Geschäftsziel:** Vollständige Ablösung der bisherigen CMS-Abhängigkeiten und Vereinheitlichung aller zentralen Funktionen.
* **Technisches Ziel:** Etablierung modularer, wiederverwendbarer Datentypen und APIs.
* **Nutzerziel:** Endnutzer erhalten aktuelle Informationen wie Veranstaltungen, News, Touren oder Abfalltermine zuverlässig und strukturiert.

## Bestandteile

### Content-Module
* Veranstaltungen (inkl. Serientermine, Kartenintegration)
* Orte / POIs
* Touren (GPX, Wegpunkte, Karten)
* Baustellen & Verkehrsmeldungen
* Umfragen
* Stellenanzeigen
* Produkte & Dienstleistungen (lokaler Marktplatz)
* Abfallkalender inkl. Abweichungslogik
* Kartenmodul (Geodaten, Marker, Layer)
* Nutzertracking (Analysebasis)

### Erweiterte Datenverwaltung
* **Export-Funktionen für alle Tabellen:**
  * CSV-Export mit konfigurierbaren Optionen (Trennzeichen, Encoding)
  * JSON-Export (Pretty Print, kompakt, NDJSON)
  * Optional: Excel (XLSX) und PDF-Export
  * Export berücksichtigt aktive Filter
  * Spaltenauswahl für Export
  * GeoJSON-Export für geografische Daten
  * Audit-Logging aller Exporte
  * Asynchrone Verarbeitung großer Datenmengen (>10.000 Datensätze)
* **Batch-Operationen (Bulk-Actions):**
  * Mehrere Inhalte gleichzeitig auswählen und bearbeiten
  * Batch-Publishing (mehrere Inhalte auf einmal veröffentlichen)
  * Batch-Archivierung und -Löschung
  * Batch-Tagging (Tags mehreren Inhalten zuweisen)
  * Batch-Kategorisierung
  * Batch-Status-Änderungen
  * Fortschrittsanzeige bei großen Batch-Operationen
  * Rollback-Möglichkeit bei Fehlern

### Erweiterte Karten-Funktionen
* **Karten-Darstellung für geografische Inhalte:**
  * Toggle zwischen Tabellenansicht und Kartenansicht
  * Optional: Hybrid-Ansicht (Split-Screen Tabelle/Karte)
  * Marker auf Karte für alle Inhalte mit Geo-Koordinaten
  * Marker-Clustering bei vielen Inhalten in einem Bereich
  * Interaktive Marker mit Popup (Kurzinfo, Bild, Link zum Bearbeiten)
* **Kartenbasierte Navigation und Filterung:**
  * Umkreis-Suche (Radius um Punkt)
  * Bounding-Box-Filter (rechteckiger Bereich)
  * Polygon-Filter (freie Form zeichnen)
  * Filter kombinierbar mit anderen Kriterien
  * Export direkt aus Kartenansicht
  * Gespeicherte Kartenansichten mit Filtern

---
