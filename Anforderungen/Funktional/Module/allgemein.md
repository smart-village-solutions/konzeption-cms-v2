# Anforderungen: Modulmanagement

Dieses Kapitel beschreibt die allgemeinen Anforderungen an die Verwaltung der App-Module im CMS 2.0. Ziel ist es, dass Kommunen und andere Betreiber\:innen flexibel steuern können, welche Funktionen in ihrer App genutzt werden, und dass die Verwaltung dieser Module einfach, transparent und erweiterbar ist.

## Modulliste und Übersicht

* Das CMS muss eine **übersichtliche Modulliste** bieten, in der alle verfügbaren Module angezeigt werden.
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

## Konfiguration von Modulen

* Jedes Modul muss über eine **eigene Konfigurationsoberfläche** verfügen, in der spezifische Einstellungen vorgenommen werden können.
* Es soll möglich sein, Rollen und Rechte pro Modul festzulegen, um den Zugriff granular zu steuern.
* Konfigurationen sollen versionierbar sein, sodass Änderungen nachvollzogen und bei Bedarf zurückgesetzt werden können.

## Selbstbau-Module

* Das System soll die Möglichkeit bieten, **eigene Module zu entwickeln und einzubinden**, ohne den Kern des CMS verändern zu müssen.
* Dafür soll ein **SDK (Software Development Kit)** bereitgestellt werden, das die Entwicklung vereinfacht und standardisierte Schnittstellen bietet.
* Selbst entwickelte Module sollen sich nahtlos in die bestehende Benutzeroberfläche integrieren und dieselben Standards (z. B. Barrierefreiheit, Sicherheit) erfüllen.

## Verwaltung externer Module

* Für externe Entwickler\:innen soll eine **dokumentierte API und ein SDK** zur Verfügung stehen.
* Module von Drittanbietern sollen **klar gekennzeichnet** sein und vor der Installation geprüft werden können.
* Es soll eine Möglichkeit geben, externe Module regelmäßig auf Updates und Sicherheitsprobleme zu überprüfen.

## Transparenz und Nachvollziehbarkeit

* Jede Änderung am Modulstatus (z. B. Aktivierung, Deaktivierung, Konfiguration) muss **protokolliert** werden.
* Pro Instanz soll eine **historische Übersicht** über alle Moduländerungen vorhanden sein.
* Nutzer\:innen mit entsprechenden Rechten sollen jederzeit nachvollziehen können, wann und von wem eine Änderung durchgeführt wurde.
