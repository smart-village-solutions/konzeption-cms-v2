# Modul: Content-Widget

## Zweck und Mehrwert

Das Content-Widget ist ein flexibles Widget, das beliebige Inhalte auf dem Dashboard oder anderen Seiten anzeigen kann. Es dient als universeller Container für redaktionelle Inhalte wie Texte, Bilder, Videos, Links oder Call-to-Actions. Das Widget ermöglicht es Redakteur:innen, individuelle Inhalte prominent zu platzieren, ohne ein spezialisiertes Modul entwickeln zu müssen.

## Zielgruppen und Nutzer:innen

* **Redakteur:innen**: Möchten flexible Inhalte auf dem Dashboard platzieren (z. B. Hinweise, Ankündigungen, Werbung)
* **Bürger:innen**: Sehen wichtige Informationen oder Aktionen direkt auf dem Dashboard
* **Marketing-Verantwortliche**: Nutzen das Widget für Kampagnen und Promotion
* **Administrator:innen**: Konfigurieren Layout und Platzierung der Widgets

## Funktionsumfang

* **Flexible Inhaltstypen**:
  * **Text**: Überschrift, Fließtext, formatiert (Markdown/HTML)
  * **Bilder**: Einzelbild oder Bildergalerie
  * **Videos**: Eingebettete Videos (YouTube, Vimeo) oder selbst gehostet
  * **Links**: Call-to-Action-Buttons (z. B. "Jetzt anmelden", "Mehr erfahren")
  * **HTML/Embed**: Beliebige eingebettete Inhalte (iframes, externe Widgets)
* **Layout-Optionen**:
  * Kompakt (nur Text oder Bild)
  * Standard (Text + Bild nebeneinander)
  * Hero (großes Bild mit Text-Overlay)
  * Card (Kachel mit Bild, Text und Button)
* **Interaktion**:
  * Klick/Tap auf Widget führt zu konfigurierter Zielseite (intern oder extern)
  * Optional: Widget kann mehrere Links/Buttons enthalten
* **Styling**: Farben, Schriftarten und Abstände sind konfigurierbar
* **Zeitsteuerung**: Widget kann zeitlich begrenzt angezeigt werden (Start- und Enddatum)

## Inhalte und Daten

* **Inhalts-Daten**:
  * Überschrift, Text (Markdown/HTML), Bild, Video-URL, Links
  * Layout-Typ, Farben, Schriftarten
  * Ziel-URL (intern oder extern)
  * Zeitraum (Start- und Enddatum)
* **Widget-Konfiguration**:
  * Layout-Typ (Kompakt, Standard, Hero, Card)
  * Größe (klein, mittel, groß, volle Breite)
  * Position auf Dashboard (oben, mitte, unten, Seitenleiste)
* **Berechtigungen**: Öffentlich oder nur für bestimmte Nutzergruppen

## Konfiguration im CMS

* **Widget-Erstellung**:
  * WYSIWYG-Editor für Text und Formatierung
  * Bild-Upload oder Auswahl aus Medienbibliothek
  * Video-Embed (URL-Eingabe)
  * Link-Konfiguration (Ziel-URL, Button-Text)
* **Layout-Einstellungen**:
  * Layout-Typ wählen (Dropdown)
  * Farben (Hintergrund, Text, Button) anpassen
  * Schriftgröße und Abstände konfigurieren
* **Platzierung**: Widget kann auf beliebigen Seiten platziert werden (Dashboard, Startseite, Kategorieseiten)
* **Zeitsteuerung**: Start- und Enddatum festlegen (optional)
* **A/B-Testing**: Optional mehrere Varianten erstellen und testen

## Integrationen und Schnittstellen

* **Medienverwaltung**: Integration mit zentraler Medienbibliothek für Bilder und Videos
* **Link-Verwaltung**: Links zu internen Seiten (Events, News, Seiten) oder externen URLs
* **Analytics**: Tracking von Widget-Klicks und Conversions
* **Dashboard-System**: Widget muss in Dashboard und Widget-Store integrierbar sein

## Nicht-funktionale Anforderungen

* **Performance**: Widget lädt innerhalb von 1 Sekunde
* **Responsive Design**: Funktioniert auf allen Bildschirmgrößen
* **Barrierefreiheit**: WCAG 2.1 AA-konform, Alt-Texte für Bilder, Tastaturnavigation
* **SEO**: Meta-Tags für geteilte Links (Open Graph, Twitter Cards)

## Monitoring und KPIs

* **Widget-Nutzung**: Wie oft wird das Widget angezeigt?
* **Klickrate**: Wie viele Nutzer:innen klicken auf Links/Buttons im Widget?
* **Conversion**: Wie viele Nutzer:innen führen gewünschte Aktionen aus?
* **A/B-Test-Ergebnisse**: Welche Widget-Variante performt besser?

## Abhängigkeiten

* **Dashboard-Modul**: Widget muss in Dashboard-System integrierbar sein
* **Medienverwaltung**: Für Bilder und Videos
* **Widget-Store**: Widget muss im Widget-Store verfügbar und konfigurierbar sein
* **Analytics-System**: Für Tracking (optional)

## Offene Fragen

* Sollen Nutzer:innen Widgets selbst erstellen und teilen können (Community-Widgets)?
* Sollen Widgets responsive Breakpoints für unterschiedliche Layouts haben?
* Sollen Widgets animiert werden können (z. B. Fade-in, Slide-in)?
* Soll es Widget-Templates geben, die Redakteur:innen als Startpunkt nutzen können?

## Notizen aus Vorarbeit

_(Hier können vorhandene Notizen aus Miro oder anderen Quellen eingefügt werden)_
