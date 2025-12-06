# Anforderungen: Modulmanagement

Dieses Kapitel beschreibt die allgemeinen Anforderungen an die Verwaltung der App-Module im CMS 2.0. Ziel ist es, dass Kommunen und andere Betreiber\:innen flexibel steuern können, welche Funktionen in ihrer App genutzt werden, und dass die Verwaltung dieser Module einfach, transparent und erweiterbar ist.

## Modulliste und Übersicht

* Das CMS muss eine **übersichtliche Modulliste** bieten, in der alle verfügbaren Module angezeigt werden.
* Zu jedem Modul brauchen wir diese Infos:
  * Auswahloption für Bulk-Aktionen
  * Bild/Logo/Icon
  * Name
  * Beschreibung
  * Link zu den Modul-Einstellungen (optional)
  * Link zu den Textvarianten/Sprachen (optional)
  * Link zu den Modul-Inhalten (optional)
  * Button zum (De)Aktivieren des Moduls => ggf. mit Popup zur Darstellung und Bestätigung von Kosten
  * Link zu einer Hilfe-Seite (optional)
  * Link zu einer Info-Seite (optional)
  * Link zu einer Support-Seite (optional)
  * Link zu einer Lizenz-Seite (optional)
  * Darstellung der Version
    * Aktuell installiert (Nummer und Release-Datum)
    * Als Update verfügbar (Nummer und Release-Datum, Kompatibilität zum aktuellen Core-System)
  * Anzeige der aktiven Installationen
* Für jedes Modul soll erkennbar sein, ob es **aktiviert oder deaktiviert** ist.
* Zusätzliche Informationen wie Version, Anbieter, Status und kurze Beschreibung sollen leicht zugänglich sein.

## Aktivierung und Deaktivierung

* Administrator\:innen sollen Module **mit wenigen Klicks aktivieren oder deaktivieren** können.
* Deaktivierte Module dürfen keine Inhalte mehr anzeigen, ihre Daten bleiben aber erhalten und können bei erneuter Aktivierung wieder genutzt werden.
* Abhängigkeiten zwischen Modulen müssen berücksichtigt und transparent angezeigt werden (z. B. wenn Modul A für Modul B erforderlich ist).

## Erweiterung und Bereitstellung

* Das CMS soll eine **Installations- oder Buchungsfunktion** für weitere Module enthalten. Dies kann als **Plugin-Store oder Marktplatz** realisiert werden.
* Über diesen Marktplatz sollen neue Module einfach ausgewählt, installiert und in Betrieb genommen werden können.
* Module, die zusätzliche Kosten verursachen oder extern lizenziert werden, müssen klar gekennzeichnet sein.

### Modul-Bibliothek und Marktplatz

* **Zentrale Modul-Bibliothek** mit allen verfügbaren Modulen:
  * Kernmodule (im Basissystem enthalten)
  * Offizielle Erweiterungsmodule (von der Community oder Hersteller entwickelt)
  * Drittanbieter-Module (externe Entwickler:innen)
  * Eigene Module (selbst entwickelt)
* **Kategorisierung der Module**:
  * Nach Funktion (Content, Navigation, Kommunikation, Verwaltung, Integration, etc.)
  * Nach Zielgruppe (Bürger:innen, Verwaltung, Tourismus, Wirtschaft)
  * Nach Komplexität (Einfach, Mittel, Komplex)
  * Nach Lizenzmodell (Open Source, Kostenlos, Kostenpflichtig)
* **Modul-Detailseite** mit:
  * Ausführlicher Beschreibung und Screenshots
  * Liste der Features und Funktionen
  * Systemanforderungen (benötigte CMS-Version, Abhängigkeiten)
  * Installations-/Deinstallationsanleitung
  * Bewertungen und Kommentare von anderen Nutzern
  * Changelog und Versionshistorie
  * Entwickler-Information und Support-Kontakt
  * Demo-Zugang oder Video-Präsentation
* **Installation aus der Bibliothek**:
  * "Installieren"-Button mit Ein-Klick-Installation
  * Automatischer Download und Entpacken
  * Dependency-Check (werden alle Abhängigkeiten erfüllt?)
  * Konfigurations-Wizard nach der Installation
  * Automatische Aktivierung (optional)
  * Rollback-Funktion bei Fehlern
* **Such- und Filterfunktionen**:
  * Volltextsuche über Namen und Beschreibungen
  * Filter nach Kategorie, Lizenz, Bewertung, Preis
  * Sortierung nach Beliebtheit, Neuigkeit, Bewertung, Name
  * "Empfohlene Module" basierend auf bereits installierten Modulen
* **Update-Management**:
  * Automatische Benachrichtigung bei verfügbaren Updates
  * "Alle aktualisieren"-Funktion
  * Change-Log-Anzeige vor dem Update
  * Staging-Modus: Updates erst auf Test-Instanz prüfen
* **Lizenz- und Kostenmanagement**:
  * Klare Kennzeichnung kostenpflichtiger Module
  * Abonnement-Verwaltung (monatlich/jährlich)
  * Testversionen mit Ablaufdatum
  * Lizenzschlüssel-Verwaltung
  * Rechnungs-Download

## Konfiguration von Modulen

* Jedes Modul muss über eine **eigene Konfigurationsoberfläche** verfügen, in der spezifische Einstellungen vorgenommen werden können.
* Es soll möglich sein, Rollen und Rechte pro Modul festzulegen, um den Zugriff granular zu steuern.
* Konfigurationen sollen versionierbar sein, sodass Änderungen nachvollzogen und bei Bedarf zurückgesetzt werden können.

### Modulspezifische Konfigurationen

* **Konfigurations-UI pro Modul**:
  * Strukturierte Einstellungs-Seite mit Tabs/Sektionen
  * Kategorien: Allgemein, Darstellung, Berechtigungen, Integration, Erweitert
  * Inline-Hilfe zu jeder Einstellung (Tooltip, Info-Icons)
  * "Standard wiederherstellen"-Button für alle oder einzelne Einstellungen
* **Typische Konfigurationsmöglichkeiten**:
  * **Darstellung**: Layout-Optionen, Farben, Schriftgrößen, Icon-Sets
  * **Inhalte**: Standard-Sortierung, Anzahl angezeigter Elemente, Filteroptionen
  * **Berechtigungen**: Welche Rollen können das Modul sehen/bearbeiten
  * **Benachrichtigungen**: E-Mail-Alerts, Push-Notifications, Webhook-Endpoints
  * **Integration**: API-Keys, Externe Dienste, Datenquellen
  * **Verhalten**: Auto-Refresh-Intervall, Caching, Performance-Optimierungen
  * **Mehrsprachigkeit**: Sprachspezifische Texte und Übersetzungen
* **Konfigurationsvorlagen (Presets)**:
  * Vordefinierte Konfigurationen für typische Use Cases
  * Beispiel: "Nachrichten-Modul: Nur wichtige Meldungen", "Events: Nur kommende Veranstaltungen"
  * "Als Vorlage speichern"-Funktion für häufig genutzte Konfigurationen
  * Import/Export von Konfigurationen (JSON)
* **Mandanten-spezifische Konfigurationen**:
  * Bei Multi-Mandanten-Systemen: Individuelle Einstellungen pro Mandant
  * Zentrale Default-Konfiguration mit mandanten-spezifischen Overrides
  * "Von anderem Mandanten kopieren"-Funktion
* **Konfigurationsversionierung**:
  * Automatisches Speichern jeder Änderung als Version
  * Versionshistorie mit Zeitstempel und Benutzer
  * "Frühere Konfiguration wiederherstellen"-Funktion
  * Vergleich zwischen Versionen (Diff-Ansicht)
  * Kommentar-Feld für Änderungsbeschreibung
* **Validierung und Fehlerprüfung**:
  * Echtzeit-Validierung bei Eingabe (z.B. gültige URL, numerischer Wert)
  * Warnungen bei kritischen Änderungen
  * Test-Modus: Konfiguration testen, bevor sie live geht
  * "Syntax-Check" für komplexe Einstellungen (z.B. Regex-Filter)

## Selbstbau-Module und Modul-Baukasten

* Das System soll die Möglichkeit bieten, **eigene Module zu entwickeln und einzubinden**, ohne den Kern des CMS verändern zu müssen.
* Dafür soll ein **SDK (Software Development Kit)** bereitgestellt werden, das die Entwicklung vereinfacht und standardisierte Schnittstellen bietet.
* Selbst entwickelte Module sollen sich nahtlos in die bestehende Benutzeroberfläche integrieren und dieselben Standards (z. B. Barrierefreiheit, Sicherheit) erfüllen.

### Modul-Baukasten für einfache Module (No-Code/Low-Code)

* **Visueller Modul-Builder** für Nicht-Entwickler:innen:
  * Drag-and-Drop-Interface zum Zusammenstellen von Modulen
  * Keine Programmierkenntnisse erforderlich
  * Vorschau in Echtzeit während der Erstellung
* **Modul-Bausteine (Components)**:
  * **Daten-Quelle wählen**:
    - Interne Datenbank (News, Events, POIs, Custom Content Types)
    - Externe API (REST, GraphQL, RSS)
    - CSV/JSON-Upload
    - Manuelle Eingabe
  * **Darstellungs-Typ wählen**:
    - Liste (einfach, mit Bildern, mit Vorschau)
    - Karten-Ansicht (Map mit Markern)
    - Galerie/Grid (Kacheln)
    - Kalender (Monatsansicht, Wochenansicht, Agenda)
    - Tabelle (sortierbar, filterbar)
    - Formular (Eingabefelder, Validierung)
    - Dashboard (Widgets, KPIs, Charts)
  * **Filter und Sortierung**:
    - Nach Kategorie, Datum, Ort, Tags filtern
    - Sortierung: Neueste zuerst, Alphabetisch, Nach Relevanz
    - Suchfeld integrieren
  * **Darstellungs-Optionen**:
    - Layout-Varianten (Liste, Grid, Karten)
    - Farbschema anpassen
    - Schriftgrößen und -arten
    - Icon-Set wählen
  * **Interaktions-Elemente**:
    - Button (z.B. "Mehr lesen", "Zur Karte", "Jetzt buchen")
    - Teilen-Funktion (Social Media, E-Mail, Link kopieren)
    - Favoriten-Funktion (zu Merkliste hinzufügen)
    - Kommentare und Bewertungen
* **Schritt-für-Schritt-Wizard**:
  1. **Modul-Name und Icon wählen**
  2. **Datenquelle auswählen** (intern oder extern)
  3. **Felder mappieren** (welche Datenfelder sollen wo angezeigt werden?)
  4. **Darstellung konfigurieren** (Layout, Farben, Schrift)
  5. **Filter und Sortierung** festlegen
  6. **Vorschau testen** (Live-Preview mit Beispieldaten)
  7. **Speichern und Aktivieren**
* **Beispiel-Use-Cases**:
  - "Aktuelle Wetter-Daten anzeigen" (externe API → Widget)
  - "Top 10 beliebteste Events" (interne Daten → Liste mit Bildern)
  - "Interaktive Karte aller Spielplätze" (interne POIs → Karte)
  - "Anmeldeformular für Veranstaltung" (Formular → Datenbank)
* **Templates für häufige Module**:
  - News-Ticker (neueste 5 Nachrichten als Slider)
  - Event-Kalender (Monatsansicht mit Filterfunktion)
  - Kontaktformular (Name, E-Mail, Nachricht → E-Mail-Versand)
  - FAQ-Liste (Fragen/Antworten mit Suchfunktion)
* **Export und Teilen**:
  - Selbstgebaute Module als JSON exportieren
  - Mit anderen Instanzen teilen (Import/Export)
  - In Modul-Bibliothek veröffentlichen (optional)
* **Limitierungen des Baukastens**:
  - Für einfache bis mittlere Komplexität geeignet
  - Komplexe Logik oder spezielle Anforderungen benötigen SDK-Entwicklung
  - Performance-Hinweise bei sehr komplexen Modulen

### SDK für fortgeschrittene Modul-Entwicklung

## Verwaltung externer Module

* Für externe Entwickler\:innen soll eine **dokumentierte API und ein SDK** zur Verfügung stehen.
* Module von Drittanbietern sollen **klar gekennzeichnet** sein und vor der Installation geprüft werden können.
* Es soll eine Möglichkeit geben, externe Module regelmäßig auf Updates und Sicherheitsprobleme zu überprüfen.

## Transparenz und Nachvollziehbarkeit

* Jede Änderung am Modulstatus (z. B. Aktivierung, Deaktivierung, Konfiguration) muss **protokolliert** werden.
* Pro Instanz soll eine **historische Übersicht** über alle Moduländerungen vorhanden sein.
* Nutzer\:innen mit entsprechenden Rechten sollen jederzeit nachvollziehen können, wann und von wem eine Änderung durchgeführt wurde.

## Mehrsprachigkeit

* Alle Module sollen in Zukunft mehrsprachig sein. Dafür braucht es bei jedem Modul die Möglichkeit, Standardtexte in verschiedenen Sprachen zu erstellen.  (Bsp. für den Button "Alle Nachrichten anzeigen")
* Auch die dynamischen Texte innerhalb der Module sollen auf Mehrsprachigkeit angelegt sein.

## Liste der Module

* [Abfallkalender](Abfallkalender.md)
* [Augmented Reality](Augmented-Reality.md)
* [Baustellen & Verkehrs­störungen](Baustellen-Verkehrsstoerungen.md)
* [Bikesharing-Angebote](Bikesharing-Angebote.md)
* [Bilderslider](Bilderslider.md)
* [Bürgerbeteiligung](Buergerbeteiligung.md)
* [Car-Angebote](Car-Angebote.md)
* [Chatbot-Integration](Chatbot-Integration.md)
* [Dashboard mit Widget-Store](Dashboard-mit-Widget-Store.md)
* [Drawer-Navigation](Drawer-Navigation.md)
* [Einstellungen](Einstellungen.md)
* [Events](Events.md)
* [Feedback-Formular](Feedback-Formular.md)
* [Fristenmelder](Fristenmelder.md)
* [Gastro-Angebote](Gastro-Angebote.md)
* [Gutscheine](Gutscheine.md)
* [Header](Header.md)
* [Hinweisgebersystem](Hinweisgebersystem.md)
* [Intro](Intro.md)
* [Kachel-Seiten](Kachel-Seiten.md)
* [Karte](Karte.md)
* [Kommunales Recht](Kommunales-Recht.md)
* [Listen-Seiten](Listen-Seiten.md)
* [Mängelmelder (einfach)](Maengelmelder-einfach.md)
* [Mängelmelder (mit Schnittstelle)](Maengelmelder-mit-Schnittstelle.md)
* [Merkliste](Merkliste.md)
* [Mitfahr-Börse](Mitfahr-Boerse.md)
* [Nachrichten](Nachrichten.md)
* [News](News.md)
* [Nutzer-Tracking](Nutzer-Tracking.md)
* [ÖPNV-Abfahrtspläne](OPNV-Abfahrsplaene.md)
* [Persönliches Profil](Persoenliches-Profil.md)
* [Postfach](Postfach.md)
* [Produkte und Dienstleistungen](Produkte-und-Dienstleistungen.md)
* [Push-Nachrichten](Push-Nachrichten.md)
* [Rathaus-Info-System (OParl)](Rathaus-Info-System-oParl.md)
* [Schwarzes Brett](Schwarzes-Brett.md)
* [Smartes Trampen & Begegnungen](Smartes-Trampen-Begegnungen.md)
* [Social Sharing](Social-Sharing.md)
* [Soziales Netzwerk](Soziales-Netzwerk.md)
* [Standort-Freigabe](Standort-Freigabe.md)
* [Statische Seiten](Statische-Seiten.md)
* [Stellenanzeigen](Stellenanzeigen.md)
* [Störer](Stoerer.md)
* [Suche](Suche.md)
* [Tabbar](Tabbar.md)
* [Touren](Touren.md)
* [Umfragen](Umfragen.md)
* [Vorteilssystem](Vorteilssystem.md)
* [Webview](Webview.md)
* [Wegweiser](Wegweiser.md)
* [Wetter](Wetter.md)
* [Widget-Leiste](Widget-Leiste.md)
* [Zuständigkeitsfinder](Zustaendigkeitsfinder.md)