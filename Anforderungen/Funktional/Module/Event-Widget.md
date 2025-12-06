# Modul: Event-Widget

## Zweck und Mehrwert

Das Event-Widget zeigt kommende Veranstaltungen kompakt auf dem Dashboard oder auf anderen Seiten der App an. Es ermöglicht Nutzer:innen, auf einen Blick die nächsten wichtigen Events zu sehen, ohne zur vollständigen Event-Liste navigieren zu müssen. Das Widget dient als Teaser und verlinkt zum vollständigen Event-Modul.

## Zielgruppen und Nutzer:innen

* **Bürger:innen**: Möchten schnell sehen, welche Events in ihrer Kommune anstehen
* **Tourist:innen**: Interessieren sich für kulturelle Veranstaltungen und Freizeitangebote
* **Vereinsmitglieder**: Suchen nach Vereinsveranstaltungen
* **Redakteur:innen**: Können steuern, welche Events prominent im Widget angezeigt werden

## Funktionsumfang

* **Anzeige kommender Events**: Die nächsten X Events (konfigurierbar, z. B. 3-5) werden im Widget angezeigt
* **Filtermöglichkeiten**:
  * Nach Kategorien (z. B. Kultur, Sport, Politik)
  * Nach Standort/Stadtteil
  * Nach Zeitraum (heute, diese Woche, dieser Monat)
* **Event-Informationen im Widget**:
  * Event-Titel
  * Datum und Uhrzeit
  * Veranstaltungsort (optional)
  * Event-Bild (optional, als Thumbnail)
* **Interaktion**:
  * Klick/Tap auf Event führt zur Detail-Seite
  * Link zu "Alle Events anzeigen" am Ende des Widgets
* **Personalisierung**: Nutzer:innen können bevorzugte Event-Kategorien festlegen (optional)
* **Live-Updates**: Neue Events erscheinen automatisch im Widget

## Inhalte und Daten

* **Event-Daten** aus dem Event-Modul (via GraphQL API):
  * Titel, Beschreibung, Datum/Uhrzeit, Ort, Kategorie, Bild
* **Widget-Konfiguration**:
  * Anzahl angezeigter Events
  * Standardfilter (z. B. nur bestimmte Kategorien)
  * Layout-Optionen (Liste, Kacheln, Slider)
* **Berechtigungen**: Öffentlich sichtbar oder nur für angemeldete Nutzer:innen

## Konfiguration im CMS

* **Widget-Einstellungen**:
  * Anzahl der angezeigten Events (Standard: 5)
  * Filtervorgaben (Kategorien, Stadtteile, Zeitraum)
  * Layout-Typ: Liste, Kacheln, Slider
  * Anzeige von Event-Bildern (ja/nein)
  * Sortierung: Nach Datum (aufsteigend), nach Priorität, nach Kategorie
* **Platzierung**: Widget kann auf Dashboard, Startseite oder anderen Seiten platziert werden
* **Hervorhebung**: Redakteur:innen können einzelne Events als "Featured" markieren, die dann prominent im Widget erscheinen

## Integrationen und Schnittstellen

* **Event-Modul**: Bezieht Daten aus dem zentralen Event-Modul
* **Kalender-Integration**: Events können in persönliche Kalender (iCal, Google Calendar) exportiert werden
* **Push-Nachrichten**: Optionale Erinnerungen zu kommenden Events
* **Merkliste**: Nutzer:innen können Events aus dem Widget heraus zur Merkliste hinzufügen

## Nicht-funktionale Anforderungen

* **Performance**: Widget lädt innerhalb von 1 Sekunde
* **Responsive Design**: Funktioniert auf allen Bildschirmgrößen (Smartphone, Tablet, Desktop)
* **Offline-Fähigkeit**: Gecachte Events werden auch offline angezeigt
* **Barrierefreiheit**: WCAG 2.1 AA-konform, Screen-Reader-Unterstützung

## Monitoring und KPIs

* **Widget-Nutzung**: Wie oft wird das Widget angezeigt?
* **Klickrate**: Wie viele Nutzer:innen klicken auf Events im Widget?
* **Beliebteste Event-Kategorien**: Welche Kategorien werden am häufigsten angeklickt?
* **Conversion**: Wie viele Nutzer:innen navigieren vom Widget zur vollständigen Event-Liste?

## Abhängigkeiten

* **Event-Modul**: Muss implementiert sein und Daten bereitstellen
* **Dashboard-Modul**: Widget muss in Dashboard-System integrierbar sein
* **Widget-Store**: Widget muss im Widget-Store verfügbar und konfigurierbar sein

## Offene Fragen

* Sollen auch vergangene Events angezeigt werden (z. B. „Verpasste Events")?
* Soll das Widget automatisch aktualisiert werden (Live-Updates via WebSockets)?
* Sollen Event-Empfehlungen basierend auf Nutzerverhalten angezeigt werden?

## Notizen aus Vorarbeit

_(Hier können vorhandene Notizen aus Miro oder anderen Quellen eingefügt werden)_
