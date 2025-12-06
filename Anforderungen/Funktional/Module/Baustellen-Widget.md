# Modul: Baustellen-Widget

## Zweck und Mehrwert

Das Baustellen-Widget informiert Bürger:innen kompakt über aktuelle Baustellen und Verkehrsstörungen in ihrer Region. Es zeigt auf dem Dashboard oder auf anderen Seiten die wichtigsten Verkehrsbehinderungen an und ermöglicht schnellen Zugriff auf detaillierte Informationen. Das Widget dient als Frühwarnsystem für Pendler:innen und hilft bei der Routenplanung.

## Zielgruppen und Nutzer:innen

* **Pendler:innen**: Möchten vor Fahrtantritt über Baustellen und Staus informiert werden
* **Bürger:innen**: Interessieren sich für Baustellen in ihrer Nachbarschaft
* **Gewerbetreibende**: Benötigen Informationen zu Verkehrsbehinderungen für Lieferverkehr
* **Redakteur:innen**: Pflegen Baustellen-Informationen und können Prioritäten setzen

## Funktionsumfang

* **Anzeige aktueller Baustellen**: Die wichtigsten X Baustellen (konfigurierbar, z. B. 3-5) werden im Widget angezeigt
* **Filtermöglichkeiten**:
  * Nach Schweregrad (kritisch, hoch, mittel, niedrig)
  * Nach Straßentyp (Autobahn, Bundesstraße, Stadtstraße)
  * Nach Standort/Stadtteil
  * Nach Zeitraum (heute, diese Woche, langfristig)
* **Baustellen-Informationen im Widget**:
  * Straßenname/Bereich
  * Art der Störung (Vollsperrung, Einbahnstraße, Umleitung)
  * Dauer/Zeitraum
  * Symbol/Icon für schnelle Erfassung
* **Interaktion**:
  * Klick/Tap auf Baustelle führt zur Detail-Seite mit Karte und Umleitungsempfehlungen
  * Link zu "Alle Baustellen anzeigen"
* **Live-Updates**: Neue Baustellen und Verkehrsstörungen erscheinen automatisch im Widget
* **Standort-basierte Anzeige**: Optional werden nur Baustellen in der Nähe des Nutzer-Standorts angezeigt

## Inhalte und Daten

* **Baustellen-Daten** aus dem Baustellen/Verkehrsstörungen-Modul:
  * Straße, Bereich, GPS-Koordinaten
  * Art der Störung, Schweregrad
  * Start- und Enddatum
  * Beschreibung, Umleitungsempfehlungen
* **Widget-Konfiguration**:
  * Anzahl angezeigter Baustellen
  * Standardfilter (z. B. nur kritische Störungen)
  * Layout-Optionen (Liste, Karte, kombiniert)
* **Externe Datenquellen**: Optional Integration von Verkehrsdaten (z. B. Landesbetriebe, Verkehrsverbünde)

## Konfiguration im CMS

* **Widget-Einstellungen**:
  * Anzahl der angezeigten Baustellen (Standard: 5)
  * Filtervorgaben (Schweregrad, Straßentyp, Region)
  * Layout-Typ: Liste, Kompaktansicht, Karte
  * Anzeige von Icons/Symbolen (ja/nein)
  * Sortierung: Nach Priorität, nach Datum, nach Entfernung
* **Platzierung**: Widget kann auf Dashboard, Startseite oder Verkehrsseite platziert werden
* **Hervorhebung**: Kritische Baustellen werden farblich hervorgehoben (z. B. rot = Vollsperrung)

## Integrationen und Schnittstellen

* **Baustellen-Modul**: Bezieht Daten aus dem zentralen Baustellen/Verkehrsstörungen-Modul
* **Karten-Modul**: Integration von Baustellen-Positionen auf Karte
* **Push-Nachrichten**: Benachrichtigung bei neuen kritischen Baustellen
* **Externe Verkehrsdaten**: Optional Anbindung an Verkehrsleitsysteme, Open311, MDM (Mobilität Daten Marktplatz)

## Nicht-funktionale Anforderungen

* **Performance**: Widget lädt innerhalb von 1 Sekunde
* **Echtzeit-Updates**: Neue Baustellen erscheinen innerhalb von 5 Minuten im Widget
* **Responsive Design**: Funktioniert auf allen Bildschirmgrößen
* **Offline-Fähigkeit**: Gecachte Baustellen-Informationen auch offline verfügbar
* **Barrierefreiheit**: WCAG 2.1 AA-konform

## Monitoring und KPIs

* **Widget-Nutzung**: Wie oft wird das Widget angezeigt?
* **Klickrate**: Wie viele Nutzer:innen klicken auf Baustellen-Meldungen?
* **Beliebteste Baustellen**: Welche Baustellen werden am häufigsten angeklickt?
* **Push-Nachrichten-Interaktion**: Wie viele Nutzer:innen öffnen die App nach Baustellen-Push?

## Abhängigkeiten

* **Baustellen/Verkehrsstörungen-Modul**: Muss implementiert sein und Daten bereitstellen
* **Dashboard-Modul**: Widget muss in Dashboard-System integrierbar sein
* **Karten-Modul**: Für Standort-basierte Anzeige
* **Push-Nachrichten-Modul**: Für Benachrichtigungen

## Offene Fragen

* Sollen auch geplante Baustellen (zukünftig) angezeigt werden?
* Soll das Widget automatisch aktualisiert werden (Live-Updates via WebSockets)?
* Sollen Nutzer:innen Baustellen-Meldungen selbst einreichen können (Crowdsourcing)?
* Sollen alternative Routen direkt im Widget vorgeschlagen werden?

## Notizen aus Vorarbeit

_(Hier können vorhandene Notizen aus Miro oder anderen Quellen eingefügt werden)_
