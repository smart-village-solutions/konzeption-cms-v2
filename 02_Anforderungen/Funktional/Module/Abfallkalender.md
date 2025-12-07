# Modul: Abfallkalender

## Zweck und Mehrwert

Das Modul ermöglicht den App-Nutzenden zunächst die Auswahl einer Adresse über die Schritte Ortsauswahl, Straßenauswahl und Hausnummer, wobei es jeder optional ist. Erfolgt die Auswahl über mehrere Ebenen, richtet sich die Auswahlliste der nachfolgenden Optionen nach der vorherigen Auswahl.

Ist die Adresse ausgewählt, kann der Nutzer verschiedene Müllsorten zur Anzeige im Kalenderauswählen. Und entscheiden, zu welchen Müllsorten eine Pushnachricht verschickt werden soll. Der zeitliche Vorlauf der Push kann eingestellt werden.

Alle Einstellungen werden lokal gespeichert. Serverseitig wird eine Aufgabe zum Pushversand angelegt. Vorherige Nachrichten an das Gerät werden gelöscht.

- Welche Herausforderungen adressiert das Modul?
- Welchen konkreten Nutzen bringt es für Kommunen und Endanwender:innen?

## Zielgruppen und Nutzer:innen
- Primäre Anwender:innen im CMS (z. B. Redaktion, Fachabteilungen)
- Endnutzer:innen in der App oder auf weiteren Kanälen
- Weitere Stakeholder (bitte ergänzen)

## Funktionsumfang
- Basisablauf (Happy Path) aus Sicht der Redaktion
- Alternative Pfade, Sonderfälle und Fehlerbehandlung
- Inhalte, die im Frontend bzw. in Kanälen ausgespielt werden

## Inhalte und Daten
- Datenstruktur (Pflicht- und optionale Felder, Medientypen)
- Datenquellen, Import- oder Migrationsbedarf
- Regeln für Mehrsprachigkeit, Versionierung und Archivierung

## Konfiguration im CMS
- Einstellungen, die Administrator:innen vornehmen können
- Rollen- und Rechtekonzept für dieses Modul
- Workflow- oder Freigabeprozesse

## Integrationen und Schnittstellen
- Externe Systeme oder Standards (z. B. OParl, Open311, xZuFi)
- Import-/Exportpfade, Synchronisationslogik
- Anforderungen an APIs und Webhooks

## Nicht-funktionale Anforderungen
- Performance- und Skalierungsanforderungen
- Sicherheit und Datenschutz (inkl. DSGVO, Protokollierung)
- Barrierefreiheit gemäß WCAG/BITV

## Monitoring und KPIs
- Welche Kennzahlen sollen erhoben und visualisiert werden?
- Alarme oder Benachrichtigungen bei Fehlern oder Abweichungen

## Abhängigkeiten
- Technische oder fachliche Abhängigkeiten zu anderen Modulen
- Benötigte Plattformkomponenten oder Drittservices
- Auswirkungen auf Betrieb, Support oder Schulung

## Offene Fragen
- Noch zu klärende Punkte aus Workshops oder Interviews
- Annahmen, die validiert werden müssen

## Notizen aus Vorarbeit

- Ortsauswahl anzeigen?
- Straßenauswahl anzeigen?
- Hausnummerauswahl anzeigen?
- Bezeichnung und Farbcodes der Touren
- Texte (mehrsprachig)
