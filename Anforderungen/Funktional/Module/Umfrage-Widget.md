# Modul: Umfrage-Widget

## Zweck und Mehrwert

Das Umfrage-Widget zeigt aktuelle Umfragen kompakt auf dem Dashboard oder anderen Seiten an und ermöglicht Nutzer:innen, direkt im Widget abzustimmen. Es fördert die Bürgerbeteiligung durch niedrigschwellige Teilnahmemöglichkeiten und macht laufende Umfragen sichtbar. Das Widget dient als Einstiegspunkt für politische Partizipation und Meinungsbildung.

## Zielgruppen und Nutzer:innen

* **Bürger:innen**: Möchten schnell und unkompliziert ihre Meinung zu kommunalen Themen äußern
* **Kommunalverwaltung**: Sammelt Feedback zu Projekten und Vorhaben
* **Redakteur:innen**: Erstellen Umfragen und können diese prominent im Widget platzieren
* **Politiker:innen**: Nutzen Umfrageergebnisse für Entscheidungsfindung

## Funktionsumfang

* **Anzeige aktueller Umfragen**: Eine oder mehrere Umfragen (konfigurierbar) werden im Widget angezeigt
* **Direkte Abstimmung**: Nutzer:innen können direkt im Widget abstimmen, ohne zur vollständigen Umfrage-Seite zu navigieren
* **Umfrage-Typen**:
  * Einfache Ja/Nein-Fragen
  * Multiple-Choice (eine Antwort)
  * Multiple-Choice (mehrere Antworten möglich)
  * Skalierungsfragen (z. B. 1-5 Sterne)
* **Umfrage-Informationen im Widget**:
  * Frage/Titel der Umfrage
  * Antwortoptionen
  * Zeitraum (Enddatum)
  * Optional: Aktuelle Zwischenergebnisse (Balkendiagramm)
* **Interaktion**:
  * Abstimmung direkt im Widget
  * "Ergebnisse anzeigen" führt zur Detail-Seite mit vollständigen Ergebnissen
  * "Alle Umfragen anzeigen" am Ende des Widgets
* **Personalisierung**: Nutzer:innen können benachrichtigt werden, wenn neue Umfragen verfügbar sind
* **Anonymität**: Abstimmungen sind standardmäßig anonym (konfigurierbar)

## Inhalte und Daten

* **Umfrage-Daten** aus dem Umfrage-Modul:
  * Frage, Antwortoptionen, Zeitraum
  * Ergebnisse (aggregiert)
  * Anzahl der Teilnehmer:innen
* **Widget-Konfiguration**:
  * Anzahl angezeigter Umfragen
  * Anzeige von Zwischenergebnissen (ja/nein)
  * Layout-Optionen (kompakt, erweitert)
* **Berechtigungen**: Öffentlich oder nur für angemeldete Nutzer:innen

## Konfiguration im CMS

* **Widget-Einstellungen**:
  * Anzahl der angezeigten Umfragen (Standard: 1-2)
  * Anzeige von Zwischenergebnissen (ja/nein, vor/nach Abstimmung)
  * Layout-Typ: Kompakt (nur Frage + Buttons), Erweitert (mit Ergebnissen)
  * Sortierung: Nach Priorität, nach Enddatum, nach Teilnehmerzahl
  * Hervorhebung besonders wichtiger Umfragen
* **Platzierung**: Widget kann auf Dashboard, Startseite oder Bürgerbeteiligungs-Seite platziert werden
* **Benachrichtigungen**: Nutzer:innen können Push-Nachrichten bei neuen Umfragen erhalten

## Integrationen und Schnittstellen

* **Umfrage-Modul**: Bezieht Daten aus dem zentralen Umfrage-Modul
* **Authentifizierung**: Optional Anbindung an Keycloak für personalisierte/authentifizierte Abstimmungen
* **Push-Nachrichten**: Benachrichtigung bei neuen Umfragen oder ablaufenden Fristen
* **Bürgerbeteiligung-Modul**: Integration mit Consul oder anderen Beteiligungsplattformen

## Nicht-funktionale Anforderungen

* **Performance**: Widget lädt innerhalb von 1 Sekunde
* **Echtzeit-Updates**: Ergebnisse aktualisieren sich nach Abstimmung automatisch
* **Responsive Design**: Funktioniert auf allen Bildschirmgrößen
* **Datenschutz**: Anonyme Abstimmungen, keine Speicherung personenbezogener Daten (falls nicht erforderlich)
* **Barrierefreiheit**: WCAG 2.1 AA-konform, Tastaturnavigation

## Monitoring und KPIs

* **Widget-Nutzung**: Wie oft wird das Widget angezeigt?
* **Abstimmungsrate**: Wie viele Nutzer:innen stimmen direkt im Widget ab?
* **Durchschnittliche Teilnehmerzahl**: Wie viele Nutzer:innen nehmen an Umfragen teil?
* **Conversion**: Wie viele Nutzer:innen navigieren vom Widget zur vollständigen Umfrage-Seite?
* **Beliebte Themen**: Welche Umfragen erhalten die meiste Beteiligung?

## Abhängigkeiten

* **Umfrage-Modul**: Muss implementiert sein und Daten bereitstellen
* **Dashboard-Modul**: Widget muss in Dashboard-System integrierbar sein
* **Authentifizierungs-System**: Für personalisierte/authentifizierte Umfragen (optional)
* **Push-Nachrichten-Modul**: Für Benachrichtigungen (optional)

## Offene Fragen

* Sollen Nutzer:innen ihre Abstimmung ändern können?
* Sollen Ergebnisse sofort sichtbar sein oder erst nach Abstimmung?
* Sollen Umfragen nur einmalig pro Nutzer:in abstimmbar sein (Double-Vote-Prevention)?
* Sollen offene Textantworten im Widget möglich sein?

## Notizen aus Vorarbeit

_(Hier können vorhandene Notizen aus Miro oder anderen Quellen eingefügt werden)_
