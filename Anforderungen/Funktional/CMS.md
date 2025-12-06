# Anforderungen: Allgemeine Funktionen des CMS

Dieses Kapitel beschreibt die allgemeinen Anforderungen an das CMS 2.0, die unabhängig von einzelnen Modulen oder Rollen gelten. Ziel ist es, die tägliche Arbeit für Redakteur\:innen, Administrator\:innen und andere Nutzergruppen einfacher und effizienter zu machen.

## Suche und Navigation

* Eine **klare Navigationsstruktur** unterstützt Redakteur\:innen, sich schnell zurechtzufinden. Dazu gehören übersichtliche Menüs, Breadcrumbs, eine konsistente Anordnung der Module und eine Suchleiste, die jederzeit erreichbar ist.
* Ein zentrales **Dashboard** verschafft einen schnellen Überblick zu den zentralen Möglichkeiten des CMS.
* Das CMS muss eine **komfortable Such- und Filterfunktion** bereitstellen, mit der Inhalte schnell gefunden werden können – auch über verschiedene Module hinweg. Dies umfasst sowohl eine Volltextsuche als auch die Möglichkeit, gezielt nach bestimmten Feldern wie Titel, Autor oder Veröffentlichungsdatum zu suchen.
* Suchergebnisse sollen **gefiltert und sortiert** werden können, zum Beispiel nach Datum, Relevanz, Modul oder Status (Entwurf, veröffentlicht, archiviert). Filterungen nach Kommunen, Themen oder Zeiträumen müssen ebenfalls möglich sein.
* Für die Suche nach geographisch zugeordneten Inhalten soll es ein **Kartentool** geben, das App-Inhalte auf einer Karte darstellt und die Ansteuerung der jeweiligen Bearbeitungsmaske aus der Karte erlaubt.

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

* Für bestimmte Inhalte sollen **Freigabeprozesse** eingerichtet werden können. Damit wird sichergestellt, dass Veröffentlichungen intern abgestimmt und geprüft werden, bevor sie live gehen.
* Rollenabhängig können Inhalte direkt veröffentlicht oder müssen zunächst zur **Prüfung eingereicht** werden. Dies ermöglicht es, unterschiedliche Arbeitsweisen in Kommunen abzubilden: Während in kleinen Teams kurze Wege bevorzugt werden, können größere Verwaltungen mit mehrstufigen Freigaben arbeiten.
* Es soll möglich sein, **Inhalte nach Status zu filtern**, damit Redakteur\:innen schnell erkennen können, welche Inhalte noch geprüft und freigeschaltet werden müssen. Alternativ stellen Benachrichtigungen und Aufgabenlisten sicher, dass Beteiligte jederzeit den Überblick über ausstehende Prüfungen und Freigaben behalten.

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

## Weitere Anforderungen

* Inhalte sollen im **Layout der App vorschaubar** sein, bevor sie veröffentlicht werden.
* Das CMS soll eine **Steuerung offline-fähiger Inhalte** ermöglichen, sodass bestimmte Inhalte in der App dann auch ohne Internetverbindung enthalten sind. Für besondere Fälle sollen **Caching-Strategien** verfügbar sein, damit wichtige Inhalte auch in Notfällen oder bei schlechter Verbindung schnell zugänglich bleiben.
* Es soll ein **Export von Inhalten und Daten** in gängigen Formaten wie CSV oder JSON möglich sein.
* Ein **Daten-Löschkonzept** muss gewährleistet sein, sodass Inhalte und personenbezogene Daten zuverlässig entfernt werden können.
* Das CMS soll die Möglichkeit bieten, **mehrere Basis-URLs** zu definieren (z. B. für verschiedene Domains, Mandanten oder Ausgabekanäle wie App und Web).
* Für jeden Inhalt sollen automatisch **Short-URLs** generiert werden, die auf Basis der konfigurierten Basis-URLs erstellt werden. Diese Short-URLs sollen sowohl als **Text** (zum Kopieren und Teilen) als auch als **QR-Code-Grafik** (zum Drucken oder Anzeigen) verfügbar sein.
* Die Short-URLs und QR-Codes verlinken direkt auf die App- oder Webversion eines bestimmten Datenobjekts. Administrator:innen können konfigurieren, welche Basis-URL für welchen Zweck verwendet wird (z. B. unterschiedliche URLs für interne Vorschau, öffentliche App, Web-Portal).
* Das CMS soll langfristig die Integration von **KI-gestützten Interfaces** ermöglichen, etwa für Vorschläge, Automatisierungen oder inhaltliche Unterstützung. Auch die Nutzung von MCP ist gewünscht.
