# Anforderungen: Allgemeine Funktionen des CMS

Dieses Kapitel beschreibt die allgemeinen Anforderungen an das CMS 2.0, die unabhängig von einzelnen Modulen oder Rollen gelten. Ziel ist es, die tägliche Arbeit für Redakteur\:innen, Administrator\:innen und andere Nutzergruppen einfacher und effizienter zu machen.

## Suche und Navigation

* Eine **klare Navigationsstruktur** unterstützt Redakteur\:innen, sich schnell zurechtzufinden. Dazu gehören übersichtliche Menüs, Breadcrumbs, eine konsistente Anordnung der Module und eine Suchleiste, die jederzeit erreichbar ist.
* Das CMS muss eine **komfortable Suchfunktion** bereitstellen, mit der Inhalte schnell gefunden werden können – auch über verschiedene Module hinweg. Dies umfasst sowohl eine Volltextsuche als auch die Möglichkeit, gezielt nach bestimmten Feldern wie Titel, Autor oder Veröffentlichungsdatum zu suchen.
* Suchergebnisse sollen **gefiltert und sortiert** werden können, zum Beispiel nach Datum, Relevanz, Modul oder Status (Entwurf, veröffentlicht, archiviert). Filterungen nach Kommunen, Themen oder Zeiträumen müssen ebenfalls möglich sein.
* Für die Suche nach geographisch zugeordneten Inhalten soll es ein **Kartentool** geben, das App-Inhalte auf einer Karte darstellt und die Ansteuerung der jeweiligen Bearbeitungsmaske aus der Karte erlaubt.

## Mehrsprachigkeit

* Das CMS soll die **Pflege von Inhalten in mehreren Sprachen** ermöglichen, damit Kommunen ihre Angebote auch für Menschen mit unterschiedlichem sprachlichen Hintergrund zugänglich machen können. Dabei muss sichergestellt sein, dass jede Sprachversion unabhängig gepflegt werden kann.
* Nutzeroberflächen in der App  müssen sich **einfach übersetzen** lassen, zum Beispiel durch die Nutzung von Übersetzungshilfen, Vorschaufunktionen oder Integrationen mit externen Übersetzungstools.
* Sprachvarianten der App sollen so verwaltet werden, dass **Konsistenz und Übersichtlichkeit** gewährleistet sind. Nutzer\:innen müssen jederzeit erkennen können, welche Sprachversionen bereits vorliegen und welche noch fehlen. Zudem soll es möglich sein, eine Standardsprache festzulegen.
* Neben den Inhalten und der Apps muss auch das **CMS in mehreren Sprachen** verfügbar sein.

## Medienverwaltung

* Das System benötigt eine **zentrale Verwaltung für Bilder, Dokumente und andere Dateien**, sodass Medien leicht auffindbar, durchsuchbar und wiederverwendbar sind.
* Hochgeladene Medien sollen automatisch **optimiert** werden, etwa durch Anpassung der Bildgröße, Komprimierung oder Generierung von Vorschaubildern in verschiedenen Formaten. Damit wird die Performance verbessert und die Arbeit für Redakteur\:innen erleichtert.
* Es muss möglich sein, Medien **mehrfach zu verwenden**, ohne dass sie jedes Mal neu hochgeladen werden müssen. Ein Bild oder Dokument soll in verschiedenen Modulen oder Beiträgen referenziert werden können.
* Metadaten wie Titel, Beschreibung, Copyright, Quelle oder Lizenzinformationen können gepflegt werden, um eine **rechtssichere Nutzung** zu unterstützen. Zusätzlich sollen Schlagwörter und Kategorien vergeben werden können, um die Medienbibliothek besser zu strukturieren.
* Medienobjekte sollen ebenfalls eine **Versionierung** erhalten und durch **Tagging** besser auffindbar sein.

## Inhalte und Versionierung

* Inhalte sollen **einfach erstellt, bearbeitet und strukturiert** werden können. Dazu gehören ein intuitiver Editor, und klare Strukturen für Seiten, Artikel und Module.
* Häufig wiederholte Inhalte sollen als **Templates** gespeichert werden und wiederverwendet werden können. Redakteur\:innen sollen **Content-Templates und Vorlagen** nutzen können, damit wiederkehrende Inhalte schneller und konsistenter gepflegt werden können.
* Das CMS muss eine **Versionierung** bieten, sodass ältere Stände wiederhergestellt werden können. Dies umfasst sowohl Textinhalte als auch Medien, Layouts und Metadaten.
* Änderungen sollen **nachvollziehbar dokumentiert** sein. Dazu gehört eine Historie mit Angaben zu Autor\:in, Zeitpunkt und Art der Änderung sowie die Möglichkeit, verschiedene Versionen miteinander zu vergleichen.
* Zusätzlich sind **Daten-Audit-Logs** erforderlich, die alle Änderungen lückenlos und nachvollziehbar protokollieren.
* Es muss möglich sein, Inhalte zu **duplizieren** und als Entwurf zu speichern, um schnell neue Varianten erstellen zu können.
* Es sollen **Bulk-Bearbeitungen** möglich sein, zum Beispiel das gleichzeitige Löschen oder Verschieben mehrerer Elemente.

## Workflows und Freigaben

* Für bestimmte Inhalte sollen **Freigabeprozesse** eingerichtet werden können. Damit wird sichergestellt, dass Veröffentlichungen intern abgestimmt und geprüft werden, bevor sie live gehen.
* Rollenabhängig können Inhalte direkt veröffentlicht oder müssen zunächst zur **Prüfung eingereicht** werden. Dies ermöglicht es, unterschiedliche Arbeitsweisen in Kommunen abzubilden: Während in kleinen Teams kurze Wege bevorzugt werden, können größere Verwaltungen mit mehrstufigen Freigaben arbeiten.
* Es soll möglich sein, **Inhalte nach Status zu filtern**, damit Redakteur\:innen schnell erkennen können, welche Inhalte noch geprüft und freigeschaltet werden müssen. Alternativ stellen Benachrichtigungen und Aufgabenlisten sicher, dass Beteiligte jederzeit den Überblick über ausstehende Prüfungen und Freigaben behalten.

## Eingebaute Dokumentation und Hilfebereich

* Für **Erstnutzer\:innen** soll es eine geführte **CMS-Einführung** geben, die den Einstieg erleichtert.
* Zu jedem Bereich des CMS soll eine **eingebaute Dokumentation** vorhanden sein, die direkt im System abrufbar ist. Diese kontextbezogene Hilfe erklärt Funktionen und Arbeitsabläufe genau dort, wo sie benötigt werden.
* Die Dokumentation muss **leicht verständlich und praxisnah** formuliert sein, sodass auch Gelegenheitsnutzer\:innen schnell Antworten finden.
* Neben Texten sollen auch **Screenshots, Beispiele oder kurze Videos** eingebunden werden können, um die Nutzung anschaulich zu erklären.
* Ergänzend zur eingebauten Hilfe soll es einen **umfassenden Hilfebereich** mit Dokumentation, FAQ und Tutorials geben.

## Anpassbarkeit von Datenstrukturen

* Das CMS soll so flexibel sein, dass **neue Dokument- und Datenstrukturen** mit geringem Aufwand ergänzt werden können. Gleichzeitig muss sichergestellt werden, dass solche Änderungen nur nach Tests auf separeten Systemen ausgerollt werden, damit keine Störungen in den Apps entstehen.
* Es soll möglich sein, **neue Arten von Inhalten oder Objekten** (z. B. Fuhrparkverwaltung, Geräteübersichten oder neue Fachbereiche) einzuführen.
* Dadurch kann das CMS auch für **zukünftige, bisher nicht absehbare Anforderungen** genutzt werden und bleibt langfristig vielseitig einsetzbar.

## Weitere Anforderungen

* Inhalte sollen im **Layout der App vorschaubar** sein, bevor sie veröffentlicht werden.
* Das CMS soll eine **Steuerung offline-fähiger Inhalte** ermöglichen, sodass bestimmte Inhalte in der App dann auch ohne Internetverbindung enthalten sind. Für besondere Fälle sollen **Caching-Strategien** verfügbar sein, damit wichtige Inhalte auch in Notfällen oder bei schlechter Verbindung schnell zugänglich bleiben.
* Es soll ein **Export von Inhalten und Daten** in gängigen Formaten wie CSV oder JSON möglich sein.
* Ein **Daten-Löschkonzept** muss gewährleistet sein, sodass Inhalte und personenbezogene Daten zuverlässig entfernt werden können.
* Das CMS soll **QR-Codes** generieren, die dann entweder auf die App- oder Webversion eines bestimmten Datenobjekts verlinkt. Die Base-URL muss zur Instanz passen.
* Das CMS soll langfristig die Integration von **KI-gestützten Interfaces** ermöglichen, etwa für Vorschläge, Automatisierungen oder inhaltliche Unterstützung. Auch die Nutzung von MCP ist gewünscht.
