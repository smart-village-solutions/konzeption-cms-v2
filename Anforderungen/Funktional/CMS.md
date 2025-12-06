# Anforderungen: Allgemeine Funktionen des CMS

Dieses Kapitel beschreibt die allgemeinen Anforderungen an das CMS 2.0, die unabhängig von einzelnen Modulen oder Rollen gelten. Ziel ist es, die tägliche Arbeit für Redakteur\:innen, Administrator\:innen und andere Nutzergruppen einfacher und effizienter zu machen.

## Suche und Navigation

* Eine **klare Navigationsstruktur** unterstützt Redakteur\:innen, sich schnell zurechtzufinden. Dazu gehören übersichtliche Menüs, Breadcrumbs, eine konsistente Anordnung der Module und eine Suchleiste, die jederzeit erreichbar ist.
* Ein zentrales **Dashboard** verschafft einen schnellen Überblick zu den zentralen Möglichkeiten des CMS.
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

## Mehrsprachigkeit

* Das CMS soll die **Pflege von Inhalten in mehreren Sprachen** ermöglichen, damit Kommunen ihre Angebote auch für Menschen mit unterschiedlichem sprachlichen Hintergrund zugänglich machen können. Dabei muss sichergestellt sein, dass jede Sprachversion unabhängig gepflegt werden kann.
* Nutzeroberflächen in der App  müssen sich **einfach übersetzen** lassen, zum Beispiel durch die Nutzung von Übersetzungshilfen, Vorschaufunktionen oder Integrationen mit externen Übersetzungstools.
* Sprachvarianten der App sollen so verwaltet werden, dass **Konsistenz und Übersichtlichkeit** gewährleistet sind. Nutzer\:innen müssen jederzeit erkennen können, welche Sprachversionen bereits vorliegen und welche noch fehlen. Zudem soll es möglich sein, eine Standardsprache festzulegen.
* Neben den Inhalten und der Apps muss auch das **CMS in mehreren Sprachen** verfügbar sein.

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
* Häufig wiederholte Inhalte sollen als **Templates** gespeichert werden und wiederverwendet werden können. Redakteur\:innen sollen **Content-Templates und Vorlagen** nutzen können, damit wiederkehrende Inhalte schneller und konsistenter gepflegt werden können.
* Das CMS muss eine **Versionierung** bieten, sodass ältere Stände wiederhergestellt werden können. Dies umfasst sowohl Textinhalte als auch Medien, Layouts und Metadaten.
* Änderungen sollen **nachvollziehbar dokumentiert** sein. Dazu gehört eine Historie mit Angaben zu Autor\:in, Zeitpunkt und Art der Änderung sowie die Möglichkeit, verschiedene Versionen miteinander zu vergleichen.
* Zusätzlich sind **Daten-Audit-Logs** erforderlich, die alle Änderungen lückenlos und nachvollziehbar protokollieren.
* Es muss möglich sein, Inhalte zu **duplizieren** und als Entwurf zu speichern, um schnell neue Varianten erstellen zu können.
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

## Weitere Anforderungen
* Es soll ein **Export von Inhalten und Daten** in gängigen Formaten wie CSV oder JSON möglich sein.
* Ein **Daten-Löschkonzept** muss gewährleistet sein, sodass Inhalte und personenbezogene Daten zuverlässig entfernt werden können.
* Das CMS soll die Möglichkeit bieten, **mehrere Basis-URLs** zu definieren (z. B. für verschiedene Domains, Mandanten oder Ausgabekanäle wie App und Web).
* Für jeden Inhalt sollen automatisch **Short-URLs** generiert werden, die auf Basis der konfigurierten Basis-URLs erstellt werden. Diese Short-URLs sollen sowohl als **Text** (zum Kopieren und Teilen) als auch als **QR-Code-Grafik** (zum Drucken oder Anzeigen) verfügbar sein.
* Die Short-URLs und QR-Codes verlinken direkt auf die App- oder Webversion eines bestimmten Datenobjekts. Administrator:innen können konfigurieren, welche Basis-URL für welchen Zweck verwendet wird (z. B. unterschiedliche URLs für interne Vorschau, öffentliche App, Web-Portal).
* Das CMS soll langfristig die Integration von **KI-gestützten Interfaces** ermöglichen, etwa für Vorschläge, Automatisierungen oder inhaltliche Unterstützung. Auch die Nutzung von MCP ist gewünscht.
