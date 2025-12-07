# Anforderungen: Allgemeine Funktionen des CMS

Dieses Kapitel beschreibt die allgemeinen Anforderungen an das CMS 2.0, die unabhängig von einzelnen Modulen oder Rollen gelten. Ziel ist es, die tägliche Arbeit für Redakteur\:innen, Administrator\:innen und andere Nutzergruppen einfacher und effizienter zu machen.

## Dashboard

* Ein zentrales **Dashboard** verschafft einen schnellen Überblick zu den zentralen Möglichkeiten des CMS:
  * **Schnellzugriff**: Wichtigste Funktionen direkt erreichbar (Neuen Inhalt erstellen, Module aktivieren, Nutzer verwalten)
  * **Statistiken**: Übersicht über aktuelle Kennzahlen (Anzahl Inhalte, aktive Nutzer:innen, letzte Änderungen)
  * **Aktivitäts-Feed**: Chronologische Übersicht der letzten Aktionen (wer hat was wann geändert)
  * **Benachrichtigungen**: Offene Aufgaben, ausstehende Freigaben, System-Warnungen
  * **Widget-System**: Administrator:innen können Dashboard personalisieren (Widgets hinzufügen/entfernen/anordnen)
  * **Rollen-spezifisch**: Dashboard zeigt nur relevante Informationen je nach Nutzer-Rolle
  * **Quick-Actions**: Häufig verwendete Aktionen als Buttons (z.B. "Neuer News-Artikel", "Event erstellen")
* Dashboard soll **auf einen Blick** zeigen:
  * Anzahl veröffentlichter/geplanter/Entwurf-Inhalte
  * Systemstatus (Backups, Updates, Fehler)
  * Offene Support-Tickets
  * Letzte Anmeldungen und Nutzer-Aktivitäten
* **Messkriterium**: Dashboard lädt in < 2 Sekunden, alle Widgets konfigurierbar, mobile-optimiert

## Suche und Navigation

* Eine **klare Navigationsstruktur** unterstützt Redakteur\:innen, sich schnell zurechtzufinden. Dazu gehören übersichtliche Menüs, Breadcrumbs, eine konsistente Anordnung der Module und eine Suchleiste, die jederzeit erreichbar ist.
* Das CMS muss eine **komfortable Such- und Filterfunktion** bereitstellen, mit der Inhalte schnell gefunden werden können – auch über verschiedene Module hinweg. Dies umfasst sowohl eine Volltextsuche als auch die Möglichkeit, gezielt nach bestimmten Feldern wie Titel, Autor oder Veröffentlichungsdatum zu suchen.
* Suchergebnisse sollen **gefiltert und sortiert** werden können, zum Beispiel nach Datum, Relevanz, Modul oder Status (Entwurf, veröffentlicht, archiviert). Filterungen nach Kommunen, Themen oder Zeiträumen müssen ebenfalls möglich sein.
* Für die Suche nach geographisch zugeordneten Inhalten soll es ein **Kartentool** geben, das App-Inhalte auf einer Karte darstellt und die Ansteuerung der jeweiligen Bearbeitungsmaske aus der Karte erlaubt.

### Standard-Filterkriterien für alle Tabellen

* **Alle Tabellen und Übersichtslisten** im CMS müssen über einheitliche Filterkriterien verfügen:
  * **Kategorie**: Filterung nach zugewiesenen Kategorien oder Tags
  * **Räumliche Zuordnung**: Filter nach Ort, Stadtteil, Kommune, PLZ-Bereich oder geografischen Koordinaten (wo zutreffend)
  * **Erstellungsdatum**: Filterung nach Zeitraum der Erstellung (z.B. "Letzte 7 Tage", "Letzter Monat", "Benutzerdefiniert")
  * **Bearbeitungsdatum**: Filterung nach letzter Änderung (z.B. "Heute geändert", "Diese Woche geändert")
  * **Veröffentlichungsdatum**: Filterung nach Zeitpunkt der Veröffentlichung (oder geplanter Veröffentlichung)
* Filter sollen **kombinierbar** sein (z.B. "Kategorie: Events UND Ort: Berlin UND Erstellungsdatum: Letzte 30 Tage")
* **Datumsbereiche** sollen flexibel wählbar sein:
  * Vordefinierte Bereiche (Heute, Gestern, Letzte 7 Tage, Letzter Monat, Dieses Jahr)
  * Benutzerdefinierte Bereiche mit Start- und Enddatum (Date-Picker)
* **Gespeicherte Filter**: Häufig verwendete Filterkombinationen sollen gespeichert und wiederverwendet werden können
* **Filter-Status anzeigen**: Aktive Filter sollen deutlich sichtbar sein und einzeln oder alle zusammen entfernt werden können

### Export-Funktionen für alle Tabellen

* **Alle Tabellen und Übersichtslisten** müssen Export-Funktionen bereitstellen:
  * **CSV-Export**: Tabellarische Daten als Comma-Separated Values
  * **JSON-Export**: Strukturierte Daten im JSON-Format (inkl. verschachtelter Objekte und Arrays)
  * Optional: **Excel-Export** (XLSX) für erweiterte Tabellenformate
  * Optional: **PDF-Export** für druckoptimierte Listen
* **Export mit aktiven Filtern**:
  * Der Export berücksichtigt alle aktiven Filter (Kategorie, Datum, räumliche Zuordnung, etc.)
  * Anzeige der Anzahl zu exportierender Datensätze vor dem Export (z.B. "427 Datensätze exportieren")
  * Warnung bei sehr großen Exporten (z.B. >10.000 Datensätze)
* **Spaltenauswahl**:
  * Auswahl, welche Spalten/Felder exportiert werden sollen
  * Vorschlag: Standardmäßig alle sichtbaren Spalten
  * Option "Alle Felder" für vollständigen Export inkl. Metadaten
* **Export-Optionen**:
  * **CSV-Optionen**:
    * Trennzeichen wählbar (Komma, Semikolon, Tab)
    * Encoding-Optionen (UTF-8, UTF-8 BOM, ISO-8859-1)
    * Kopfzeile mit Spaltennamen (aktivierbar/deaktivierbar)
  * **JSON-Optionen**:
    * Pretty Print (formatiert) oder kompakt
    * Einzelnes Array oder Line-Delimited JSON (NDJSON)
    * Verschachtelungstiefe konfigurierbar (z.B. nur Top-Level oder inkl. Relationen)
* **Zeitstempel und Metadaten im Export**:
  * Export-Dateiname enthält Datum/Uhrzeit (z.B. `events_export_2025-12-06_14-30.csv`)
  * Optional: Metadaten-Zeile im Export (Exportdatum, aktive Filter, Anzahl Datensätze)
* **Große Datenmengen**:
  * Bei >1000 Datensätzen: Hinweis auf mögliche Wartezeit
  * Bei >10.000 Datensätzen: Export als asynchroner Job mit Download-Link per E-Mail
  * Fortschrittsanzeige bei großen Exporten
  * Möglichkeit, Export abzubrechen
* **Berechtigungen**:
  * Export nur für Datensätze, auf die Nutzer:in Lesezugriff hat
  * Export-Berechtigung kann pro Rolle/Nutzer eingeschränkt werden
  * Audit-Log: Alle Exporte werden protokolliert (wer, wann, welche Daten)
* **Geografische Daten**:
  * Bei Tabellen mit Geo-Koordinaten: Zusätzliche Export-Option **GeoJSON**
  * Koordinaten in CSV wahlweise als getrennte Spalten (Lat, Lon) oder kombiniert
  * Export direkt aus Kartenansicht berücksichtigt geografische Filter (Umkreis, Bounding Box)

**Messkriterium:**
* CSV- und JSON-Export in allen Tabellen verfügbar
* Export mit aktiven Filtern funktioniert korrekt
* Spaltenauswahl für Export vorhanden
* Export von bis zu 10.000 Datensätzen in <10 Sekunden
* Alle Exporte im Audit-Log protokolliert

### Karten-Darstellung für geografische Inhalte

* **Tabellen mit Geo-Koordinaten** sollen neben der tabellarischen Darstellung auch als **Karte visualisiert** werden können:
  * **Umschalter Tabelle/Karte**: Toggle oder Tab-Navigation zwischen Tabellenansicht und Kartenansicht
  * **Hybrid-Ansicht**: Optional Karte und Tabelle gleichzeitig anzeigen (Split-Screen)
  * **Marker auf Karte**: Jeder Inhalt mit Geo-Koordinaten wird als Marker/Pin auf der Karte dargestellt
  * **Marker-Clustering**: Bei vielen Inhalten in einem Bereich werden Marker zu Clustern zusammengefasst (mit Anzahl-Anzeige)
  * **Interaktive Marker**: Klick auf Marker öffnet Popup mit Kurzinfo (Titel, Bild, Link zum Bearbeitungsmodus)
* **Kartenbasierte Navigation**:
  * Klick auf Marker öffnet direkt die Bearbeitungsmaske des jeweiligen Inhalts
  * "In Tabelle zeigen"-Button im Marker-Popup, um zum entsprechenden Tabelleneintrag zu springen
  * Mehrfachauswahl über Karte (z.B. Shift+Click oder Aufziehen eines Rechtecks für Bulk-Operationen)
* **Geografische Filterung**:
  * **Umkreissuche**: Filterung nach Radius um einen bestimmten Punkt
    * Eingabe: Adresse/Ort + Radius in km (z.B. "Berlin, 10 km")
    * Visuelle Darstellung: Kreis auf der Karte zeigt Suchradius
    * Vordefinierte Radien: 5 km, 10 km, 25 km, 50 km, benutzerdefiniert
  * **Administrativer Bereich**: Filter nach Stadt, Landkreis, Bundesland, PLZ-Gebiet
  * **Bounding Box**: Filterung nach aktuell sichtbarem Kartenausschnitt ("Nur Inhalte im sichtbaren Bereich anzeigen")
* **Kartenfunktionen**:
  * **Zoom und Pan**: Karte soll frei zoombar und verschiebbar sein
  * **Geolocation**: "Mein Standort"-Button, um Karte auf aktuelle Position zu zentrieren
  * **Layer-Steuerung**: Verschiedene Kartenansichten (Straßenkarte, Satellitenbild, Topografisch)
  * **Heatmap-Modus**: Optional Dichte-Darstellung bei vielen Inhalten
  * **Route/Entfernung messen**: Tool zum Messen von Entfernungen auf der Karte
* **Filter-Integration**:
  * Geografische Filter kombinierbar mit allen anderen Filtern (Kategorie, Datum, etc.)
  * **"Nur mit Geo-Koordinaten"-Filter**: Inhalte ohne Koordinaten ausblenden
  * Aktive geografische Filter in Karte visuell dargestellt (z.B. Kreis bei Umkreissuche)
  * Filter aus Karteninteraktion automatisch übernommen (z.B. Zoom setzt Bounding Box Filter)
* **Performance und Skalierung**:
  * **Lazy Loading**: Marker werden nur für sichtbaren Bereich geladen
  * **Pagination auf Karte**: Bei sehr vielen Inhalten (>1000) nur Top-N oder geclusterte Darstellung
  * **Caching**: Häufig aufgerufene Kartenbereiche gecacht
* **Export und Sharing**:
  * Export der Karte als Bild (PNG, JPEG)
  * Export der gefilterten Geo-Daten (GeoJSON, KML, GPX)
  * Teilbarer Link zur Karte mit aktiven Filtern und Ansicht
* **Barrierefreiheit**:
  * Tastaturnavigation für Karte (Zoom, Pan)
  * Alternativtext für Marker
  * Listenansicht als Alternative zur visuellen Karte (für Screenreader-Nutzer)

**Messkriterium:**
* Umschalter Tabelle/Karte in allen geografischen Listen verfügbar
* Umkreissuche funktioniert mit Genauigkeit ±100m
* Marker-Clustering ab >50 Inhalten im Bereich aktiv
* Kartenperformance: Ladezeit <2 Sekunden für bis zu 1000 Marker
* Alle Filter in Tabelle und Karte synchronisiert

### Geo-Koordinaten-Eingabe und Adress-Geocoding

Für Datensätze mit geografischen Informationen muss das CMS flexible und intuitive Eingabemöglichkeiten bieten, um sowohl Adressen als auch Koordinaten komfortabel zu erfassen und automatisch umzurechnen.

#### Eingabemodi für Geo-Koordinaten

* **Drei Eingabemöglichkeiten** sollen verfügbar sein:
  * **Manuelle Eingabe**: Direkte Eingabe von Breitengrad/Längengrad (Latitude/Longitude)
  * **Adress-Eingabe mit Geocoding**: Eingabe einer Adresse, automatische Umrechnung in Koordinaten
  * **Karten-Picker**: Interaktive Auswahl eines Punktes auf einer Karte

#### Manuelle Koordinaten-Eingabe

* **Eingabefelder** für Latitude und Longitude:
  * Format-Unterstützung: Dezimalgrad (52.5200, 13.4050), Grad/Minuten/Sekunden (52°31'12"N, 13°24'18"E)
  * Automatische Format-Erkennung und -Konvertierung
  * Validierung: Prüfung auf gültige Koordinatenbereiche (Lat: -90 bis +90, Lon: -180 bis +180)
* **Live-Vorschau**: Bei Eingabe von Koordinaten wird Position sofort auf einer kleinen Karte angezeigt
* **Koordinaten kopieren/einfügen**: Verschiedene Formate werden erkannt (Google Maps, OpenStreetMap, Geo-URIs)

#### Adress-Eingabe mit automatischem Geocoding

* **Adressfelder**:
  * Einzelfelder: Straße, Hausnummer, PLZ, Stadt, Land
  * Optional: Einzelnes Freitextfeld mit intelligenter Adress-Erkennung
* **Autocomplete-Funktion**:
  * Vorschläge während der Eingabe (wie Google Maps Autocomplete)
  * Integration mit Geocoding-Services (z.B. Nominatim, Photon, Google Maps Geocoding API)
  * Priorisierung lokaler Ergebnisse (z.B. Deutschland bevorzugen, wenn Kommune in DE)
* **Automatische Koordinaten-Berechnung**:
  * Bei vollständiger Adresseingabe automatisches Geocoding
  * Anzeige der ermittelten Koordinaten zur Bestätigung
  * Button "Koordinaten neu berechnen", falls Adresse geändert wurde
* **Genauigkeitsanzeige**:
  * Anzeige der Geocoding-Genauigkeit (Hausnummer-genau, Straße, Stadt, PLZ-Bereich)
  * Warnung bei ungenauer Zuordnung (z.B. nur Stadt erkannt, nicht Straße)

#### Karten-Picker zur interaktiven Positionierung

* **Interaktive Karte im Bearbeitungsformular**:
  * Karte mit Marker zeigt aktuell gespeicherte Position
  * **Klick auf Karte** setzt Marker an neue Position und aktualisiert Koordinaten automatisch
  * **Marker verschieben** (Drag & Drop) zur Feinpositionierung
  * **Suche auf Karte**: Adresssuche direkt in der Karte integriert
* **Zoom-Steuerung**:
  * Automatischer Zoom auf gewählte Position
  * Zoom-Level speicherbar (z.B. für POIs Hausnummern-genau, für große Bereiche Stadt-Übersicht)
* **"Mein Standort"-Funktion**:
  * Button zur Übernahme der aktuellen Position des Nutzers (Browser-Geolocation)
  * Nützlich für mobile Eingabe vor Ort

#### Reverse Geocoding: Von Koordinaten zu Adresse

* **Automatische Adress-Ermittlung**:
  * Bei Eingabe oder Auswahl von Koordinaten (manuell oder per Karte) wird automatisch die zugehörige Adresse ermittelt
  * Anzeige der gefundenen Adresse zur Überprüfung
  * Option "Adresse übernehmen" oder "Adresse manuell anpassen"
* **Reverse Geocoding bei Karten-Auswahl**:
  * Klick auf Karte zeigt sofort die Adresse des angeklickten Punktes
  * Pop-up mit Adresse und Koordinaten zur Bestätigung
* **Mehrfache Ergebnisse**:
  * Falls mehrere mögliche Adressen gefunden werden, Auswahlliste anzeigen
  * Nutzer:in kann passende Adresse auswählen

#### Synchronisation zwischen Adresse und Koordinaten

* **Bidirektionale Aktualisierung**:
  * Änderung der Adresse → Koordinaten werden neu berechnet
  * Änderung der Koordinaten → Adresse wird neu ermittelt
* **Konfliktauflösung**:
  * Falls Adresse und Koordinaten nicht übereinstimmen: Warnung anzeigen
  * Option: "Koordinaten aus Adresse übernehmen" oder "Adresse aus Koordinaten übernehmen"
  * Letzte Änderung wird priorisiert (z.B. wenn Koordinaten manuell geändert wurden, nicht überschreiben)
* **Manuelle Entkopplung**:
  * Option "Adresse und Koordinaten manuell festlegen" (ohne automatische Synchronisation)
  * Nützlich für ungenaue Adressen oder besondere Fälle (z.B. Eingang vs. Hauptgebäude)

#### Geocoding-Services und Konfiguration

* **Flexible Service-Integration**:
  * Unterstützung mehrerer Geocoding-Anbieter:
    * **Open Source**: Nominatim (OpenStreetMap), Photon, Pelias
    * **Kommerzielle**: Google Maps Geocoding, HERE, Mapbox
    * **Fallback-Kette**: Primärer Service, bei Fehler automatisch Fallback auf alternativen Service
* **Administrator-Konfiguration**:
  * Auswahl des Geocoding-Services im CMS-Backend
  * API-Key-Verwaltung für kommerzielle Services
  * Rate-Limiting konfigurierbar (Anfragen pro Minute/Tag)
  * Caching von Geocoding-Ergebnissen (um API-Kosten zu sparen)
* **Offline-Betrieb**:
  * Lokale Geocoding-Datenbank optional (z.B. für Deutschland)
  * Funktioniert auch ohne Internet-Zugang (wichtig für kommunale Rechenzentren)

#### Spezielle Funktionen

* **Mehrfach-Koordinaten**:
  * Unterstützung für Polygone (z.B. Verwaltungsgrenzen, Stadtteile)
  * Unterstützung für Routen/Pfade (z.B. Wanderwege, Radtouren)
  * Visualisierung auf Karte während der Eingabe
* **Koordinaten-Import**:
  * Import aus GPX-Tracks (z.B. von GPS-Geräten)
  * Import aus KML/GeoJSON
  * Bulk-Import von Koordinaten per CSV mit automatischem Geocoding
* **Genauigkeits-Indikator**:
  * Anzeige der Positionsgenauigkeit (z.B. "±10m", "±100m")
  * Setzen eines "Genauigkeits-Radius" auf der Karte (Kreis um Marker)

#### Validierung und Fehlerbehandlung

* **Plausibilitätsprüfungen**:
  * Warnung, wenn Koordinaten außerhalb des erwarteten Bereichs liegen (z.B. außerhalb Deutschlands für kommunale App)
  * Warnung bei großer Abweichung zwischen Adresse und Koordinaten (z.B. Adresse in Berlin, Koordinaten in München)
* **Fehlerbehandlung**:
  * Bei Geocoding-Fehler: Klare Fehlermeldung mit Hilfestellung
  * Bei unvollständiger Adresse: Hinweis, welche Felder fehlen
  * Bei ungültigen Koordinaten: Automatische Korrektur-Vorschläge
* **Protokollierung**:
  * Logging aller Geocoding-Anfragen für Debugging und Kostenüberwachung
  * Anzeige gescheiterter Geocoding-Versuche im Admin-Bereich

**Messkriterium:**
* Alle drei Eingabemodi (manuell, Adresse, Karte) verfügbar
* Geocoding-Genauigkeit: >90% erfolgreiche Zuordnung bei deutschen Adressen
* Reverse Geocoding: Adresse wird in <1 Sekunde ermittelt
* Karten-Picker: Position per Klick/Drag & Drop änderbar
* Bidirektionale Synchronisation zwischen Adresse und Koordinaten funktioniert
* Mindestens 2 Geocoding-Services unterstützt (1x Open Source, 1x kommerziell)
* Caching reduziert API-Anfragen um >80% bei wiederholter Eingabe gleicher Adressen

## Mehrsprachigkeit

* Das CMS soll die **Pflege von Inhalten in mehreren Sprachen** ermöglichen, damit Kommunen ihre Angebote auch für Menschen mit unterschiedlichem sprachlichen Hintergrund zugänglich machen können. Dabei muss sichergestellt sein, dass jede Sprachversion unabhängig gepflegt werden kann.
* Nutzeroberflächen in der App  müssen sich **einfach übersetzen** lassen, zum Beispiel durch die Nutzung von Übersetzungshilfen, Vorschaufunktionen oder Integrationen mit externen Übersetzungstools.
* Sprachvarianten der App sollen so verwaltet werden, dass **Konsistenz und Übersichtlichkeit** gewährleistet sind. Nutzer\:innen müssen jederzeit erkennen können, welche Sprachversionen bereits vorliegen und welche noch fehlen. Zudem soll es möglich sein, eine Standardsprache festzulegen.
* Neben den Inhalten und der Apps muss auch das **CMS in mehreren Sprachen** verfügbar sein.

### Sprachverwaltung und Übersetzungsdateien

* **Verwaltung der CMS-Interface-Sprachen**:
  * Übersicht aller verfügbaren Sprachen für das CMS-Interface (z.B. Deutsch, Englisch, Französisch)
  * Aktivieren/Deaktivieren von Sprachen für das CMS
  * Festlegung der Standard-Sprache und Fallback-Sprache
  * Status-Anzeige: Vollständigkeit der Übersetzungen pro Sprache (z.B. "Deutsch: 100%, Englisch: 95%, Französisch: 78%")
* **Zugriff auf Übersetzungsdateien (i18n/l10n)**:
  * **Eingebauter Übersetzungs-Editor** im CMS:
    - Tabellarische Übersicht aller Übersetzungs-Keys
    - Spalten pro Sprache zum direkten Bearbeiten
    - Suche und Filter nach Keys, fehlendenÜbersetzungen, zuletzt geänderten Texten
    - Markierung fehlender Übersetzungen (leere Felder rot markiert)
  * **Import/Export-Funktionen**:
    - Export als JSON, YAML, PO-Dateien, XLIFF für externe Übersetzungstools
    - Import von übersetzten Dateien mit Validierung
    - Bulk-Import für mehrere Sprachen gleichzeitig
  * **Versionierung der Übersetzungen**:
    - Änderungshistorie für jeden übersetzten Text
    - Rollback zu früheren Versionen möglich
    - Anzeige: Wer hat wann welchen Text geändert
* **Übersetzungs-Workflow**:
  * **Mehrsprachige Redakteur:innen** können Texte direkt im CMS übersetzen
  * **Übersetzungsspeicher (Translation Memory)**:
    - Bereits übersetzte Phrasen werden wiederverwendet
    - Vorschläge für ähnliche Texte
    - Konsistenz-Prüfung (gleicher Ausgangstext → gleiche Übersetzung)
  * **KI-gestützte Übersetzungsvorschläge**:
    - Automatische Vorübersetzung mit DeepL, Google Translate o.ä.
    - Vorschläge können übernommen oder manuell angepasst werden
    - Markierung: "Automatisch übersetzt, Überprüfung ausstehend"
  * **Kontext-Informationen**:
    - Zu jedem Übersetzungs-Key: Beschreibung, wo er verwendet wird
    - Screenshot oder UI-Vorschau des Verwendungsortes
    - Hinweise für Übersetzer:innen (z.B. max. Zeichenlänge, Ton, formell/informell)
* **Qualitätssicherung**:
  * **Vollständigkeits-Check**: Warnung bei fehlenden Übersetzungen vor Aktivierung einer Sprache
  * **Platzhalter-Validierung**: Prüfung, dass Platzhalter (z.B. `{name}`, `%s`) in allen Sprachen vorhanden sind
  * **Längen-Warnung**: Warnung, wenn übersetzte Texte deutlich länger sind (UI-Breaking)
  * **Glossar-Management**: Zentrale Verwaltung von Fachbegriffen mit bevorzugten Übersetzungen
* **Integration mit externen Übersetzungstools**:
  * API-Integration mit Crowdin, Lokalise, Phrase, POEditor
  * Synchronisation: Änderungen im CMS werden an externes Tool gepusht und umgekehrt
  * Kollaboration mit externen Übersetzungsdienstleistern

**Messkriterium:**
* Übersetzungs-Editor zeigt alle Keys in < 2 Sekunden
* Import/Export in mindestens 3 Formaten (JSON, PO, XLIFF)
* Vollständigkeits-Status für alle Sprachen angezeigt
* Translation Memory findet 90% der Wiederverwendungen
* KI-Übersetzungsvorschläge verfügbar (optional aktivierbar)

## Medienverwaltung

* Das System benötigt eine **zentrale Medienbibliothek** nach dem Vorbild moderner CMS (z. B. WordPress), die Bilder, Dokumente, Videos, Audio-Dateien und andere Medien verwaltet.
* Medien sollen **durchsuchbar, filterbar und wiederverwendbar** sein – mit Suche nach Dateinamen, Metadaten, Tags oder Verwendungsorten.

### Upload und Autooptimierung

* Beim Upload von Bildern soll das System **automatisch verschiedene Auflösungen** generieren (z. B. Thumbnail, Medium, Large, Original), um unterschiedliche Anwendungsfälle abzudecken (App, Web, Vorschau).
* Bilder werden **automatisch komprimiert**, um Speicherplatz zu sparen und Ladezeiten zu verbessern – ohne sichtbare Qualitätsverluste (z. B. WebP, AVIF, progressive JPEG).
* Das CMS soll **responsive Bildvarianten** bereitstellen, damit je nach Endgerät (Smartphone, Tablet, Desktop) die passende Auflösung ausgeliefert wird.
* Für Videos und Audio-Dateien sollen ebenfalls **Vorschaubilder und Transkodierungen** automatisch erstellt werden (z. B. verschiedene Bitraten, Formate).

### Bildbearbeitung

* Direkt im CMS soll eine **integrierte Bildbearbeitung** verfügbar sein, um einfache Anpassungen vorzunehmen, ohne externe Tools nutzen zu müssen:
  * **Zuschneiden** (Crop) mit vordefinierten Seitenverhältnissen (16:9, 4:3, 1:1, frei wählbar)
  * **Drehen und Spiegeln**
  * **Filter und Effekte** (z. B. Helligkeit, Kontrast, Sättigung, Schärfe)
  * **Wasserzeichen** einfügen (optional, konfigurierbar)
  * **Fokuspunkt setzen**, damit bei automatischen Zuschnitten der wichtigste Bildbereich erhalten bleibt
* Bearbeitungen sollen **nicht-destruktiv** sein, das heißt, das Original bleibt erhalten und kann jederzeit wiederhergestellt werden.

### Metadaten und Rechteverwaltung

* Zu jedem Medium sollen **Metadaten** gepflegt werden können:
  * **Titel, Beschreibung, Alt-Text** (wichtig für Barrierefreiheit und SEO)
  * **Copyright, Quelle, Lizenzinformationen** (z. B. CC-Lizenzen, Fotografen-Credits)
  * **Autor:in, Aufnahmedatum, Aufnahmeort**
* Das System soll **EXIF- und IPTC-Daten** aus Bildern automatisch auslesen und bei Bedarf in die Metadaten übernehmen.
* Medien sollen durch **Tags und Kategorien** organisiert werden können, um die Medienbibliothek übersichtlich zu halten und Inhalte schnell zu finden.

### Versionierung

* Jede Änderung an einem Medium (Upload einer neuen Version, Bildbearbeitung, Metadaten-Anpassung) soll **versioniert** werden.
* Nutzer:innen können **frühere Versionen wiederherstellen**, falls eine Änderung rückgängig gemacht werden muss.
* Das System zeigt an, **wer wann welche Änderung** vorgenommen hat (Änderungshistorie).

### Verwendungsnachweis

* Für jedes Medium soll einsehbar sein, **wo es gerade verwendet wird** (in welchen Modulen, Beiträgen, Seiten).
* Vor dem Löschen eines Mediums wird gewarnt, **falls es noch in Verwendung ist**, um Fehler in der App oder auf Webseiten zu vermeiden.
* Es soll möglich sein, ein Medium durch ein anderes zu **ersetzen**, wobei alle Verwendungsstellen automatisch aktualisiert werden.

### Ordnerstruktur und Organisation

* Medien sollen in **Ordnern** organisiert werden können, um große Medienbibliotheken übersichtlich zu halten.
* Ordner können verschachtelt sein und **Berechtigungen** erhalten, sodass bestimmte Teams nur auf ihre eigenen Medien zugreifen können.
* Es soll eine **Favoritenliste** geben, um häufig genutzte Medien schnell wiederzufinden.

### Bulk-Operationen

* Mehrere Medien sollen gleichzeitig bearbeitet werden können:
  * **Massenupload** (Drag & Drop mehrerer Dateien)
  * **Massen-Tagging** (Tags für mehrere Dateien gleichzeitig setzen)
  * **Massenbearbeitung von Metadaten** (z. B. Copyright für eine ganze Bilderserie setzen)
  * **Massenlöschen** (mit Warnung bei Verwendung)

### Externe Medienverwaltung und CDN

* Das CMS soll optional **externe Medienspeicher** unterstützen (z. B. S3, Azure Blob Storage, Cloudinary), um große Datenmengen auszulagern.
* Medien sollen über ein **Content Delivery Network (CDN)** ausgeliefert werden können, um weltweite Performance zu verbessern.
* Es soll möglich sein, Medien aus **externen Quellen** zu referenzieren (z. B. YouTube-Videos, Vimeo, externe Bild-URLs), ohne sie ins CMS hochzuladen.

## Inhalte und Versionierung

* Inhalte sollen **einfach erstellt, bearbeitet und strukturiert** werden können. Dazu gehören ein intuitiver Editor, und klare Strukturen für Seiten, Artikel und Module.

### Content-Templates und Vorlagen

* Häufig wiederholte Inhalte sollen als **Templates** gespeichert werden und wiederverwendet werden können. Redakteur\:innen sollen **Content-Templates und Vorlagen** nutzen können, damit wiederkehrende Inhalte schneller und konsistenter gepflegt werden können.
* **Template-Bibliothek**:
  * Zentrale Verwaltung aller Content-Templates
  * Kategorisierung nach Inhaltstyp (News, Events, Seiten, Formulare)
  * Suchfunktion und Tags für Templates
  * Vorschau der Template-Struktur
* **Template-Erstellung**:
  * "Als Template speichern"-Funktion bei jedem Inhalt
  * Festlegung von Pflichtfeldern und Standardwerten
  * Platzhalter für variable Inhalte (z.B. {{titel}}, {{datum}}, {{autor}})
  * Vorausgefüllte Felder mit Beispieltext
* **Template-Nutzung**:
  * "Aus Template erstellen"-Button beim Anlegen neuer Inhalte
  * Template-Auswahl-Dialog mit Vorschau
  * Automatisches Ausfüllen aller Template-Felder
  * Änderungen am Template wirken sich nicht auf bereits erstellte Inhalte aus
* **Template-Berechtigungen**:
  * Öffentliche Templates (für alle Redakteur:innen)
  * Team-Templates (nur für bestimmte Gruppen)
  * Persönliche Templates (nur für eigene Nutzung)
  * Administrator:innen können Templates sperren/freigeben

### Inhalte duplizieren und Entwürfe

* Es muss möglich sein, Inhalte zu **duplizieren** und als Entwurf zu speichern, um schnell neue Varianten erstellen zu können.
* **Duplizieren-Funktion**:
  * "Duplizieren"-Button in der Inhaltsübersicht und Detailansicht
  * Duplikat wird automatisch als Entwurf angelegt (nicht veröffentlicht)
  * Titel wird mit "(Kopie)" oder Datum ergänzt (z.B. "Event XYZ (Kopie 2025-12-07)")
  * Alle Felder, Medien und Metadaten werden übernommen
  * Beziehungen zu anderen Inhalten bleiben erhalten (optional konfigurierbar)
* **Entwurf-Verwaltung**:
  * Entwürfe sind nur für Autor:in und berechtigte Redakteur:innen sichtbar
  * "Meine Entwürfe"-Übersicht im Dashboard
  * Automatisches Speichern von Entwürfen alle 30 Sekunden
  * Entwürfe haben kein Ablaufdatum (bleiben unbegrenzt erhalten)
  * "Entwurf verwerfen"-Funktion mit Bestätigung
* **Varianten erstellen**:
  * "Als Variante speichern" für A/B-Testing oder saisonale Anpassungen
  * Verknüpfung zwischen Original und Variante
  * Übersicht: "Dieser Inhalt hat 3 Varianten"
  * Varianten können einzeln veröffentlicht oder archiviert werden

### Versionierung und Änderungshistorie

* Das CMS muss eine **umfassende Versionierung** bieten, sodass ältere Stände wiederhergestellt werden können. Dies umfasst sowohl Textinhalte als auch Medien, Layouts und Metadaten.
* **Automatische Versionierung**:
  * Bei jedem Speichervorgang wird automatisch eine neue Version erstellt
  * Versionen sind nummeriert (v1, v2, v3, ...) und mit Zeitstempel versehen
  * Versionsnummer wird in der Inhaltsansicht angezeigt
  * Keine manuelle Version-Erstellung nötig (passiert automatisch)
* **Versionshistorie**:
  * Chronologische Liste aller Versionen mit:
    * Versionsnummer und Erstellungsdatum/-uhrzeit
    * Autor:in der Änderung
    * Änderungskommentar (optional, kann beim Speichern eingegeben werden)
    * Größe der Änderung (z.B. "+127 Zeichen, -45 Zeichen")
  * Filterung nach Zeitraum oder Autor:in
  * Export der Versionshistorie als CSV
* **Versionsvergleich (Diff-Ansicht)**:
  * Auswahl von zwei beliebigen Versionen zum Vergleich
  * Side-by-Side-Ansicht mit Hervorhebung der Unterschiede:
    * Grün: Hinzugefügte Inhalte
    * Rot: Gelöschte Inhalte
    * Gelb: Geänderte Inhalte
  * Feldweiser Vergleich (nicht nur Volltext)
  * Medien-Vergleich: Vorher/Nachher-Bilder nebeneinander
* **Versionen wiederherstellen**:
  * "Diese Version wiederherstellen"-Button bei jeder Version
  * Wiederherstellung erstellt eine neue Version (alte Version bleibt erhalten)
  * Warnung, falls ungespeicherte Änderungen vorhanden sind
  * Bestätigungsdialog mit Vorschau der wiederherzustellenden Version
  * Nach Wiederherstellung: Hinweis "Version X wurde wiederhergestellt"
* **Versionen-Cleanup**:
  * Automatisches Löschen sehr alter Versionen (z.B. > 2 Jahre, konfigurierbar)
  * Ausnahme: Veröffentlichte Versionen und manuell markierte "Wichtige Versionen"
  * "Wichtige Version markieren"-Funktion (z.B. vor großen Änderungen)
  * Benachrichtigung vor automatischem Löschen

### Protokollierung und Audit-Logs

* Änderungen sollen **nachvollziehbar dokumentiert** sein. Dazu gehört eine Historie mit Angaben zu Autor\:in, Zeitpunkt und Art der Änderung sowie die Möglichkeit, verschiedene Versionen miteinander zu vergleichen.
* Zusätzlich sind **Daten-Audit-Logs** erforderlich, die alle Änderungen lückenlos und nachvollziehbar protokollieren.
* **Audit-Log-Umfang**:
  * Alle Inhalts-Operationen: Erstellen, Bearbeiten, Löschen, Veröffentlichen, Archivieren
  * Alle Benutzer-Aktionen: Login, Logout, Passwort-Änderung, Rollen-Änderung
  * Alle Medien-Operationen: Upload, Bearbeitung, Löschen, Ersetzen
  * Alle Konfigurations-Änderungen: Einstellungen, Berechtigungen, Schnittstellen
  * Alle API-Zugriffe: Endpoint, Parameter, Antwort-Status
  * Export-Vorgänge: Welche Daten wurden von wem exportiert
* **Protokollierte Daten pro Eintrag**:
  * **Zeitstempel**: Exakte Uhrzeit (inkl. Millisekunden)
  * **Benutzer**: Name, E-Mail, Benutzer-ID
  * **Aktion**: Art der Änderung (z.B. "Inhalt veröffentlicht", "Medien gelöscht")
  * **Objekt**: Betroffener Inhalt/Objekt mit ID und Titel
  * **Geänderte Felder**: Welche Felder wurden geändert (Feldname)
  * **Alte und neue Werte**: Vorher/Nachher-Werte (für sensible Daten optional maskiert)
  * **IP-Adresse**: IP des Nutzers (für Sicherheit und Compliance)
  * **User Agent**: Browser/App-Information
  * **Sitzungs-ID**: Verknüpfung mehrerer Aktionen einer Sitzung
* **Audit-Log-Ansicht**:
  * Filterfunktionen:
    * Nach Zeitraum (Heute, Letzte 7 Tage, Letzter Monat, Benutzerdefiniert)
    * Nach Benutzer (alle Aktionen eines bestimmten Nutzers)
    * Nach Aktion (nur Löschungen, nur Veröffentlichungen, etc.)
    * Nach Objekt-Typ (nur News, nur Events, nur Medien)
    * Nach IP-Adresse (verdächtige Aktivitäten)
  * Volltextsuche über alle Log-Einträge
  * Export als CSV, JSON, PDF (für Compliance-Reports)
  * Farbcodierung: Kritische Aktionen (Löschungen) rot hervorgehoben
* **Audit-Log-Benachrichtigungen**:
  * Automatische Alerts bei kritischen Ereignissen:
    * Massenlöschungen (>10 Inhalte auf einmal)
    * Login-Versuche von unbekannten IPs
    * Änderungen an Berechtigungen
    * Zugriff auf sensible Daten
  * E-Mail-Benachrichtigung an Administrator:innen
  * Dashboard-Widget: "Letzte kritische Ereignisse"
* **Compliance und Datenschutz**:
  * Audit-Logs sind DSGVO-konform (keine übermäßige Datenspeicherung)
  * Logs werden verschlüsselt gespeichert
  * Aufbewahrungsfrist konfigurierbar (Standard: 90 Tage, max. 2 Jahre)
  * Automatisches Löschen nach Ablauf der Frist
  * Export für externe Audits (z.B. BSI-Grundschutz-Prüfung)
  * Unveränderbarkeit: Logs können nicht nachträglich editiert oder gelöscht werden (nur von Superadmin mit Begründung)
* **Performance**:
  * Asynchrone Log-Schreibvorgänge (blockieren nicht die Hauptanwendung)
  * Separate Datenbank oder Tabelle für Audit-Logs
  * Indizierung für schnelle Suche trotz großer Datenmengen
  * Archivierung alter Logs (> 6 Monate) in komprimiertem Format

### Bulk-Bearbeitungen

* Es sollen **Bulk-Bearbeitungen** möglich sein, zum Beispiel das gleichzeitige Löschen oder Verschieben mehrerer Elemente.

## Workflows und Freigaben

Das CMS muss flexible Workflow- und Freigabeprozesse unterstützen, um unterschiedliche organisatorische Anforderungen abzubilden – von einfachen Ein-Personen-Teams bis hin zu komplexen mehrstufigen Freigabeprozessen in großen Verwaltungen.

### Workflow-Stati

* Das System muss verschiedene **Inhalts-Stati** unterstützen, um den Bearbeitungsfortschritt abzubilden:
  * **Entwurf** (Draft): Inhalt wird erstellt, noch nicht zur Prüfung eingereicht
  * **Zur Prüfung eingereicht** (Pending Review): Wartet auf Review durch zuständige Person
  * **In Überarbeitung** (Revision Requested): Rückgabe an Autor:in mit Änderungswünschen
  * **Genehmigt** (Approved): Freigegeben, wartet auf Veröffentlichung
  * **Veröffentlicht** (Published): Live und öffentlich sichtbar
  * **Geplant** (Scheduled): Zur automatischen Veröffentlichung vorgemerkt
  * **Archiviert** (Archived): Nicht mehr aktiv, aber aufbewahrt
  * **Gelöscht** (Trashed): Im Papierkorb, kann wiederhergestellt werden
* Stati sollen **farblich gekennzeichnet** sein (z.B. Entwurf = Grau, Genehmigt = Grün, Geplant = Orange)
* Es soll eine **Status-Übersicht** geben, die zeigt, wie viele Inhalte sich in welchem Status befinden

### Freigabeprozesse und Qualitätssicherung

* Für bestimmte Inhaltstypen oder Kategorien sollen **Freigabeprozesse konfiguriert** werden können (z.B. Pressemitteilungen benötigen Freigabe, interne News nicht)
* Es muss möglich sein, **mehrstufige Freigabe-Workflows** einzurichten:
  * Beispiel 1: Entwurf → Review durch Fachbereichsleitung → Veröffentlichung
  * Beispiel 2: Entwurf → Review durch Redaktionsleitung → Review durch Presseabteilung → Veröffentlichung
* Rollenabhängig können Nutzer:innen:
  * **Direkt veröffentlichen** (z.B. Administrator:innen, erfahrene Redakteur:innen)
  * **Nur Entwürfe erstellen** und zur Prüfung einreichen (z.B. neue Redakteur:innen)
  * **Inhalte prüfen und freigeben** (z.B. Redaktionsleitung)
* Bei Einreichung zur Prüfung soll eine **Nachricht an Reviewer** möglich sein (z.B. "Bitte schnelle Prüfung, zeitkritische Info")
* Reviewer können Inhalte:
  * **Genehmigen** (Status → Genehmigt)
  * **Ablehnen** mit Kommentar (Status → In Überarbeitung)
  * **Direkt veröffentlichen** (bei entsprechender Berechtigung)
* Es soll ein **Kommentar-/Anmerkungssystem** geben, damit Reviewer Feedback zu einzelnen Abschnitten geben können
* **Änderungsvorschläge** (Suggesting Mode) sollen möglich sein, ähnlich wie in Google Docs

### Zeitgesteuerte Veröffentlichungen

* Inhalte sollen **zu einem bestimmten Zeitpunkt automatisch veröffentlicht** werden können (Scheduled Publishing)
* Es muss möglich sein, ein **Veröffentlichungsdatum und -uhrzeit** festzulegen (z.B. "Veröffentliche am 15.12.2025 um 08:00 Uhr")
* Optional kann auch ein **Ablaufdatum** (Unpublish Date) gesetzt werden, nach dem der Inhalt automatisch zurückgezogen wird
* Eine **Übersicht aller geplanten Veröffentlichungen** (Publishing Calendar) soll verfügbar sein
* Geplante Veröffentlichungen sollen:
  * **Bearbeitet oder abgebrochen** werden können (bis zum geplanten Zeitpunkt)
  * **Manuell sofort veröffentlicht** werden können (Publish Now)
  * Bei Zeitpunkt-Erreichen automatisch von Status "Geplant" zu "Veröffentlicht" wechseln
* Es soll eine **Benachrichtigung** geben, wenn eine zeitgesteuerte Veröffentlichung erfolgreich war (optional)
* Bei **wiederkehrenden Inhalten** (z.B. wöchentliche Newsletter) soll eine Wiederholungsfunktion verfügbar sein

### Veröffentlichungsverwaltung

* Es muss eine zentrale **Veröffentlichungsübersicht** geben mit:
  * Alle veröffentlichten Inhalte
  * Veröffentlichungszeitpunkt und Autor:in
  * Anzahl der Aufrufe / Engagement (falls Analytics verfügbar)
  * Möglichkeit, Inhalte zu depublizieren oder zu archivieren
* **Bulk-Publishing**: Mehrere genehmigte Inhalte gleichzeitig veröffentlichen
* **Rollback-Funktion**: Veröffentlichte Inhalte auf eine frühere Version zurücksetzen
* **Unveröffentlichen** (Unpublish): Inhalte wieder auf Entwurf setzen, ohne sie zu löschen
* Es soll möglich sein, Inhalte **nur für bestimmte Zielgruppen** zu veröffentlichen (z.B. nur für App-Nutzer, nicht für Web)
* **Preview-Links**: Vor Veröffentlichung sollen teilbare Links generiert werden, um Inhalte im finalen Layout zu zeigen (ohne Live-Schaltung)

### Benachrichtigungen und Aufgaben

* **Automatische Benachrichtigungen** bei Workflow-Ereignissen:
  * Reviewer erhalten Benachrichtigung bei neuer Prüfanfrage
  * Autor:in wird informiert bei Genehmigung oder Ablehnung
  * Team-Benachrichtigung bei Veröffentlichung wichtiger Inhalte
* Eine **Aufgabenliste** (To-Do-Liste) zeigt:
  * Inhalte, die auf meine Prüfung warten
  * Inhalte, die ich überarbeiten muss
  * Geplante Veröffentlichungen heute/diese Woche
* Benachrichtigungen sollen:
  * **In-App** angezeigt werden (Notification Center)
  * Optional per **E-Mail** versandt werden (konfigurierbar)
  * Optional per **Browser-Push** oder **Webhook** verfügbar sein
* Es soll möglich sein, **Erinnerungen** zu setzen (z.B. "Erinnere mich in 2 Tagen an diesen Entwurf")

### Filterung und Übersicht

* Es soll möglich sein, **Inhalte nach Status zu filtern** (z.B. "Zeige alle Entwürfe", "Zeige alle zur Prüfung eingereichten Inhalte")
* Filter kombinierbar nach:
  * Status, Autor:in, Reviewer, Datum, Kategorie, Tags
  * "Meine Entwürfe", "Warte auf meine Freigabe", "Von mir veröffentlicht"
* **Dashboard-Widgets** für schnellen Überblick:
  * "X Inhalte warten auf Deine Prüfung"
  * "X Deiner Entwürfe wurden genehmigt"
  * "X Inhalte werden heute veröffentlicht"
* Eine **Aktivitäts-Timeline** zeigt alle Workflow-Aktionen (wer hat wann was getan)

### Versionskontrolle im Workflow-Kontext

* Jeder Status-Wechsel erzeugt automatisch eine **Version**
* Bei Ablehnung/Überarbeitung bleibt die **ursprünglich eingereichte Version** erhalten
* Es soll möglich sein, **während der Prüfung bereits an einer neuen Version zu arbeiten** (parallele Workflows)
* Vergleich zwischen:
  * Aktueller Version und letzter veröffentlichter Version
  * Aktueller Version und ursprünglich eingereichten Version
  * Verschiedenen Entwurfs-Versionen

## Hilfe- und Support-System

Das CMS benötigt ein umfassendes Hilfe- und Support-System, das Nutzer:innen bei der täglichen Arbeit unterstützt. Die detaillierten Anforderungen an das Hilfe-System sind im Kapitel **[Hilfe- und Support-System](Hilfe.md)** beschrieben und umfassen:

* Community-getriebene Hilfeartikel aus GitHub
* Integriertes Ticketsystem für Support-Anfragen
* Interaktive CMS-Einführung für Erst-User
* Volltextsuche über alle Hilfeinhalte
* Release Notes & Changelog
* Mehrsprachigkeit und Barrierefreiheit
* Feedback-System für kontinuierliche Verbesserung

## Anpassbarkeit von Datenstrukturen

* Das CMS soll so flexibel sein, dass **neue Dokument- und Datenstrukturen** mit geringem Aufwand ergänzt werden können. Gleichzeitig muss sichergestellt werden, dass solche Änderungen nur nach Tests auf separeten Systemen ausgerollt werden, damit keine Störungen in den Apps entstehen.
* Es soll möglich sein, **neue Arten von Inhalten oder Objekten** (z. B. Fuhrparkverwaltung, Geräteübersichten oder neue Fachbereiche) einzuführen.
* Dadurch kann das CMS auch für **zukünftige, bisher nicht absehbare Anforderungen** genutzt werden und bleibt langfristig vielseitig einsetzbar.

## Vorschau-Funktion

Das CMS muss umfassende Vorschau-Möglichkeiten bieten, damit Redakteur:innen Inhalte im finalen Layout prüfen können, bevor sie veröffentlicht werden.

### Mandanten-spezifische Vorschau

* Inhalte sollen im **Layout des jeweiligen Mandanten vorschaubar** sein, unabhängig vom Veröffentlichungsstatus
* Bei **Multi-Mandanten-Umgebungen** muss die Vorschau für jeden Mandanten separat verfügbar sein:
  * Jeder Mandant kann eigene Design-Anpassungen haben (Farben, Logos, Schriftarten)
  * Jeder Mandant kann eigene Content-Strukturen und Module nutzen
  * Vorschau berücksichtigt mandanten-spezifische Einstellungen (Sprache, Layout-Varianten)
* **Mandanten-Umschalter** in der Vorschau, um zwischen verschiedenen Mandanten-Layouts zu wechseln
* Es soll ersichtlich sein, **welcher Mandant** gerade in der Vorschau angezeigt wird (z.B. durch Badge oder Dropdown)

### Geräte-Vorschau

* Inhalte sollen auf **verschiedenen Gerätetypen** vorschaubar sein:
  * **Mobile** (Smartphone-Ansicht, z.B. iPhone, Android)
  * **Tablet** (iPad, Android Tablet)
  * **Desktop** (Webbrowser-Ansicht)
* **Responsive Preview**: Vorschau passt sich automatisch an die gewählte Gerätegröße an
* Es sollen **vordefinierte Geräte-Presets** verfügbar sein:
  * iPhone 14/15 (390×844 px)
  * Samsung Galaxy S23 (360×780 px)
  * iPad (768×1024 px)
  * Desktop Standard (1920×1080 px)
* **Rotation**: Wechsel zwischen Hochformat (Portrait) und Querformat (Landscape)
* Optional: **Benutzerdefinierte Bildschirmgrößen** für spezielle Anforderungen

### Vorschau-Modi

* **Live-Vorschau während der Bearbeitung**: Änderungen werden in Echtzeit in der Vorschau angezeigt
* **Vollbild-Vorschau**: Vorschau ohne CMS-Oberfläche, nur das finale Layout
* **Side-by-Side-Ansicht**: Editor und Vorschau nebeneinander (Split-Screen)
* **Status-spezifische Vorschau**: Inhalte können in verschiedenen Stati vorgeschaut werden:
  * Entwurf-Vorschau
  * Review-Vorschau (wie sieht es für Reviewer aus?)
  * Geplante-Veröffentlichung-Vorschau (wie wird es nach Veröffentlichung aussehen?)

### Teilbare Vorschau-Links

* **Preview-Links**: Vor Veröffentlichung sollen teilbare Links generiert werden
* Preview-Links funktionieren **ohne Login** (mit zeitlich begrenztem Token)
* **Ablaufdatum für Preview-Links** konfigurierbar (z.B. 7 Tage, 30 Tage)
* Preview-Links können für **externe Stakeholder** geteilt werden (z.B. Pressestelle, Fachbereiche)
* Optional: **Passwortschutz** für besonders sensible Vorschauen
* Links können **widerrufen** werden, falls Vorschau nicht mehr geteilt werden soll

### Vorschau-Kontext

* Vorschau zeigt Inhalte **im Kontext der App oder Website**:
  * Navigation und Menüs werden angezeigt
  * Verlinkungen zu anderen Inhalten funktionieren
  * Eingebettete Medien (Bilder, Videos) werden korrekt dargestellt
* **Interaktive Vorschau**: Links und Buttons sind in der Vorschau klickbar (zur Navigation innerhalb der Vorschau)
* **Wasserzeichen oder Banner**: Optional "Vorschau-Modus" einblenden, um Verwechslungen mit Live-Inhalten zu vermeiden
* **Metadaten-Vorschau**: Anzeige, wie SEO-Metadaten in Suchmaschinen erscheinen würden

## Offline-Verfügbarkeit und Notfallinhalte

* Das CMS soll eine **Steuerung offline-fähiger Inhalte** ermöglichen, sodass bestimmte Inhalte in der App auch ohne Internetverbindung verfügbar sind
* **Notfallinhalte**: Bestimmte wichtige Inhalte sollen dauerhaft in der App gespeichert werden und auch offline zugänglich sein:
  * Beispiele: Notfall-Kontakte, Erste-Hilfe-Informationen, Katastrophenschutz-Hinweise, wichtige Behörden-Telefonnummern
  * Im CMS muss für jeden Inhalt markierbar sein, ob er als **"Notfallinhalt"** gekennzeichnet werden soll
  * Checkbox oder Toggle: "Als Notfallinhalt markieren" oder "Offline verfügbar machen"
  * Notfallinhalte werden bei App-Start oder bei Sync automatisch heruntergeladen und lokal gespeichert
* **Priorisierung**: Es soll möglich sein, **Prioritätsstufen** für Offline-Inhalte festzulegen:
  * **Kritisch**: Immer offline verfügbar (Notfallinhalte)
  * **Wichtig**: Bei ausreichend Speicherplatz offline verfügbar
  * **Optional**: Nur bei expliziter Nutzer-Auswahl offline speichern
* **Speicherplatz-Management**: Das System soll überwachen, wie viel Speicherplatz Offline-Inhalte benötigen:
  * Warnung bei Überschreitung eines Limits (z.B. > 50 MB)
  * Übersicht im CMS: "Aktuelle Offline-Inhalte belegen X MB"
  * Möglichkeit, große Medien von Offline-Speicherung auszuschließen
* **Sync-Strategie**:
  * Notfallinhalte werden automatisch aktualisiert, wenn sich der Inhalt ändert
  * App prüft bei Verbindung, ob neue Versionen von Notfallinhalten verfügbar sind
  * Administrator:innen können **Sync-Intervalle** konfigurieren (z.B. täglich, wöchentlich)
* **Übersicht im CMS**:
  * Liste aller als "Notfallinhalt" markierten Inhalte
  * Filterung nach Offline-Status, Priorität, Größe
  * Bulk-Aktion: Mehrere Inhalte gleichzeitig als Notfallinhalt markieren/entmarkieren
* Für besondere Fälle sollen **Caching-Strategien** konfigurierbar sein, damit wichtige Inhalte auch bei schlechter Verbindung schnell zugänglich bleiben

## Verwaltung von App-Instanzen und Mandanten

* **Einrichtung neuer App-Instanzen**:
  * **Assistent zur Ersteinrichtung**: Schritt-für-Schritt-Wizard für neue Kommunen/Mandanten
    - Schritt 1: Organisations-Daten (Name, Logo, Kontakt)
    - Schritt 2: App-Branding (Farben, Icons, App-Name)
    - Schritt 3: Module auswählen (welche Module sollen aktiviert sein)
    - Schritt 4: Basis-Konfiguration (Sprachen, Zeitzone, Währung)
    - Schritt 5: Administrator:in anlegen (erster Admin-Account)
  * **Template-basierte Einrichtung**: Vordefinierte Templates für typische Anwendungsfälle
    - "Kleine Gemeinde" (Basismodule: News, Events, Kontakte)
    - "Tourismus-Region" (zusätzlich: POIs, Touren, Unterkünfte)
    - "Stadtverwaltung" (alle Module, erweiterte Funktionen)
  * **Klon-Funktion**: Bestehende Instanz als Vorlage für neue Instanz nutzen
    - Struktur und Konfiguration übernehmen, Inhalte optional kopieren
* **Instanz-Verwaltung (Multi-Mandanten)**:
  * **Übersicht aller Instanzen**:
    - Tabellarische Liste mit Name, Status (aktiv/inaktiv/Demo), Erstellungsdatum, Nutzer-Anzahl
    - Filterung nach Status, Erstellungsdatum, Lizenz-Typ
    - Sortierung nach Name, Aktivität, Speichernutzung
  * **Instanz-Details**:
    - Detailansicht jeder Instanz: Organisations-Daten, Kontakte, aktivierte Module, Statistiken
    - Schnellaktionen: "Als Admin anmelden", "Instanz pausieren", "Instanz löschen"
  * **Instanz-Status-Management**:
    - **Aktiv**: Instanz läuft normal
    - **Demo/Test**: Zeitlich begrenzt, automatische Deaktivierung nach X Tagen
    - **Pausiert**: Inhalte bleiben, aber App/Web-Zugriff deaktiviert (z.B. bei Zahlungsausfall)
    - **Archiviert**: Instanz nicht mehr aktiv, aber Daten bleiben erhalten
  * **Mandanten-Trennung**:
    - Strikte Datentrennung zwischen Instanzen
    - Keine Sichtbarkeit von Daten anderer Mandanten
    - Optionale Freigabe für übergreifende Inhalte (z.B. Landkreis → Gemeinden)
* **Ressourcen-Verwaltung**:
  * **Speicherplatz-Monitoring**: Übersicht pro Instanz (Datenbank, Medien, Backups)
  * **Nutzer-Kontingente**: Maximale Anzahl Nutzer:innen pro Instanz (je nach Lizenz)
  * **API-Rate-Limits**: Anfragen-Limits pro Instanz zur Lastverteilung
  * **Warnungen**: Benachrichtigung bei Überschreitung von Limits (Speicher, Nutzer, Traffic)
* **Instanz-Migration und Export**:
  * **Vollständiger Export**: Alle Daten einer Instanz als Backup (DB-Dump + Medien)
  * **Migration zwischen Umgebungen**: Test → Staging → Production
  * **Instanz-Transfer**: Übertragung einer Instanz an andere Organisation (mit Datenübernahme)
* **Zugriffsrechte und Hierarchien**:
  * **Super-Admin**: Kann alle Instanzen verwalten, neue Instanzen anlegen
  * **Instanz-Admin**: Voller Zugriff auf eigene Instanz, keine Sichtbarkeit anderer Instanzen
  * **Hierarchische Strukturen**: Landkreis → Gemeinden mit delegierten Rechten

**Messkriterium:**
* Neue Instanz in < 5 Minuten einrichtbar (via Wizard)
* Instanz-Übersicht lädt < 2 Sekunden (auch bei 100+ Instanzen)
* Strikte Mandanten-Trennung nachgewiesen (Security-Audit)
* Template-basierte Einrichtung mit mindestens 3 Vorlagen
* Export/Migration vollständig und verlustfrei

## E-Mail-Konfiguration und -Verwaltung

* **Mehrere E-Mail-Accounts konfigurieren**:
  * **Zentrale E-Mail-Verwaltung** im CMS:
    - Liste aller konfigurierten E-Mail-Accounts
    - Jeder Account mit Name, Verwendungszweck, SMTP-Server, Status
  * **Account-Typen** für verschiedene Zwecke:
    - **Benachrichtigungen** (System-Benachrichtigungen, Alerts, Workflow-Updates)
    - **Kontaktformular** (Antwort-Adresse für Nutzer-Anfragen)
    - **Newsletter** (für Marketing- und Newsletter-Versand)
    - **Support** (für Support-Tickets und Hilfe-Anfragen)
    - **Transaktional** (für Rechnungen, Buchungsbestätigungen, Passwort-Reset)
    - **No-Reply** (für automatische E-Mails ohne Antwortmöglichkeit)
* **E-Mail-Account-Konfiguration**:
  * **SMTP-Einstellungen** pro Account:
    - SMTP-Server (Host, Port)
    - Authentifizierung (Benutzername, Passwort/App-Password)
    - Verschlüsselung (TLS, SSL, STARTTLS)
    - Absender-Name und Absender-E-Mail
  * **Test-Funktion**: "Test-E-Mail senden" zur Überprüfung der Konfiguration
  * **Status-Monitoring**: Automatische Überprüfung der Verbindung (grün/rot/gelb)
  * **Fehlerbehandlung**: Retry-Logik bei fehlgeschlagenen E-Mails, Dead-Letter-Queue
* **Zuordnung von E-Mail-Accounts zu Funktionen**:
  * **Dropdown-Auswahl** bei jeder E-Mail-Funktion:
    - Kontaktformular-Modul: "Welcher E-Mail-Account soll verwendet werden?"
    - Benachrichtigungs-Einstellungen: "E-Mails versenden über: [Account auswählen]"
    - Newsletter-Modul: "Absender-Account: [Account auswählen]"
  * **Standard-Account festlegen**: Fallback-Account für alle Funktionen ohne spezifische Zuordnung
  * **Instanz-spezifisch**: In Multi-Mandanten-Umgebungen kann jede Instanz eigene E-Mail-Accounts haben
* **E-Mail-Templates und Branding**:
  * **Template-Verwaltung** pro E-Mail-Typ:
    - Willkommens-E-Mail
    - Passwort-Reset
    - Benachrichtigungen
    - Newsletter
  * **Branding pro Account**:
    - Logo, Farben, Footer mit Kontaktdaten und Impressum
    - Unterschiedliches Branding für verschiedene Zwecke (z.B. offiziell vs. Marketing)
* **E-Mail-Versand-Monitoring**:
  * **Versand-Statistiken**:
    - Anzahl versendeter E-Mails pro Account und Zeitraum
    - Erfolgsrate (zugestellt/fehlgeschlagen/Bounce)
    - Öffnungsrate und Klickrate (bei Newsletter)
  * **Fehler-Protokollierung**:
    - Übersicht fehlgeschlagener E-Mails
    - Grund des Fehlers (SMTP-Error, ungültige Adresse, Bounce)
    - Retry-Status und manuelle Wiederholung
  * **Blacklist-Management**:
    - Verwaltung von E-Mail-Adressen, die keine E-Mails mehr erhalten sollen
    - Automatische Blacklist bei Hard-Bounces
    - DSGVO-konforme Abmeldung (Opt-Out-Liste)
* **Sicherheit und Compliance**:
  * **SPF/DKIM/DMARC-Konfiguration**: Anleitung und Validierung für Domain-Authentifizierung
  * **DSGVO-konform**: Opt-In für Marketing-E-Mails, Datenschutzerklärung in E-Mails
  * **Rate-Limiting**: Schutz vor Spam-Verdacht (max. X E-Mails pro Stunde/Tag)
  * **Verschlüsselung**: Alle Passwörter verschlüsselt gespeichert
* **Integration mit E-Mail-Diensten**:
  * **Unterstützung für gängige Anbieter**:
    - Standard-SMTP (für eigene Server)
    - SendGrid, Mailgun, Amazon SES, Postmark
    - Microsoft 365, Google Workspace
  * **API-Integration** (wo verfügbar) für erweiterte Funktionen:
    - Tracking (Öffnungen, Klicks)
    - Bounce-Handling
    - Suppression-Listen

**Messkriterium:**
* Mindestens 5 verschiedene E-Mail-Accounts konfigurierbar
* Test-E-Mail-Funktion für jeden Account verfügbar
* Versand-Statistiken für die letzten 90 Tage abrufbar
* Fehlerhafte E-Mails im Retry-Queue sichtbar
* SPF/DKIM/DMARC-Validierung integriert
* Multi-Mandanten: Jede Instanz kann eigene E-Mail-Accounts haben

## Weitere Anforderungen
* Es soll ein **Export von Inhalten und Daten** in gängigen Formaten wie CSV oder JSON möglich sein.
* Ein **Daten-Löschkonzept** muss gewährleistet sein, sodass Inhalte und personenbezogene Daten zuverlässig entfernt werden können.
* Das CMS soll die Möglichkeit bieten, **mehrere Basis-URLs** zu definieren (z. B. für verschiedene Domains, Mandanten oder Ausgabekanäle wie App und Web).
* Für jeden Inhalt sollen automatisch **Short-URLs** generiert werden, die auf Basis der konfigurierten Basis-URLs erstellt werden. Diese Short-URLs sollen sowohl als **Text** (zum Kopieren und Teilen) als auch als **QR-Code-Grafik** (zum Drucken oder Anzeigen) verfügbar sein.
* Die Short-URLs und QR-Codes verlinken direkt auf die App- oder Webversion eines bestimmten Datenobjekts. Administrator:innen können konfigurieren, welche Basis-URL für welchen Zweck verwendet wird (z. B. unterschiedliche URLs für interne Vorschau, öffentliche App, Web-Portal).
* Das CMS soll langfristig die Integration von **KI-gestützten Interfaces** ermöglichen, etwa für Vorschläge, Automatisierungen oder inhaltliche Unterstützung. Auch die Nutzung von MCP ist gewünscht.
