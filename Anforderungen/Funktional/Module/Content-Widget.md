# Modul: Content-Widget

## Zweck und Mehrwert

Das Content-Widget ist ein flexibles Widget-Modul im CMS, mit dem Redakteur:innen beliebige Inhalte für das Dashboard oder andere Seiten erstellen und konfigurieren können. Es dient als universeller Container für redaktionelle Inhalte wie Texte, Bilder, Videos, Links oder Call-to-Actions. Das CMS muss eine intuitive Verwaltungsoberfläche bieten, damit Redakteur:innen ohne technische Kenntnisse individuelle Widgets erstellen können.

## Zielgruppen und Nutzer:innen

* **Redakteur:innen**: Erstellen und verwalten Content-Widgets im CMS
* **Marketing-Verantwortliche**: Nutzen das CMS zur Erstellung von Kampagnen-Widgets
* **Administrator:innen**: Konfigurieren globale Widget-Einstellungen und Berechtigungen

## Funktionsumfang

### Content-Widget-Verwaltung im CMS

* **Widget erstellen und bearbeiten**:
  * WYSIWYG-Editor für Texteingabe mit Formatierungsoptionen (Überschrift, Fließtext, Listen, Links)
  * Markdown- und HTML-Unterstützung für fortgeschrittene Nutzer:innen
  * Bild-Upload oder Auswahl aus Medienbibliothek (Einzelbild oder Galerie)
  * Video-Einbettung über URL (YouTube, Vimeo) oder Upload eigener Videos
  * Link-Konfiguration (interne App-Seiten oder externe URLs)
  * HTML/Embed-Code-Eingabe für externe Widgets oder iframes
* **Layout-Konfiguration**:
  * Auswahl aus vorgefertigten Layout-Templates:
    * **Kompakt**: Nur Text oder nur Bild
    * **Standard**: Text und Bild nebeneinander
    * **Hero**: Großes Hintergrundbild mit Text-Overlay
    * **Card**: Kachel-Design mit Bild, Text und Button
  * Anpassung von Farben (Hintergrund, Text, Button)
  * Schriftgröße und Abstände konfigurieren
  * Aspekt-Ratio für Bilder festlegen
* **Platzierung und Sichtbarkeit**:
  * Auswahl der Zielseite(n) (Dashboard, Startseite, Kategorieseiten)
  * Position auf Seite festlegen (oben, mitte, unten, Seitenleiste)
  * Widget-Größe definieren (klein, mittel, groß, volle Breite)
  * Sortierreihenfolge bei mehreren Widgets
* **Zeitsteuerung**:
  * Start- und Enddatum festlegen (Widget wird automatisch aktiviert/deaktiviert)
  * Uhrzeiten für Veröffentlichung konfigurieren
  * Wiederkehrende Zeitfenster (z. B. jeden Montag 9-17 Uhr)
* **Berechtigungen und Zielgruppen**:
  * Sichtbarkeit festlegen (öffentlich, nur angemeldete Nutzer:innen, bestimmte Rollen)
  * Mandantenfähigkeit (Widget nur für bestimmte Kommunen/Instanzen)
* **Vorschau und Testing**:
  * Live-Vorschau im CMS (wie wird Widget in der App aussehen?)
  * Responsive Vorschau (Smartphone, Tablet, Desktop)
  * A/B-Testing: Mehrere Varianten erstellen und Performance vergleichen

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

### Widget-Editor

* **Basis-Informationen**:
  * Widget-Name (intern, nicht in App sichtbar)
  * Widget-Titel (in App sichtbar, optional)
  * Widget-Beschreibung (optional, für SEO und Barrierefreiheit)
  * Kategorie/Tags für Organisation
* **Inhalts-Editor**:
  * WYSIWYG-Editor mit Toolbar:
    * Formatierung: Fett, Kursiv, Unterstrichen, Durchgestrichen
    * Überschriften (H1-H6)
    * Listen (nummeriert, unnummeriert)
    * Links einfügen (mit Link-Picker für interne Seiten)
    * Bilder einfügen (Upload-Button oder Medienbibliothek-Browser)
    * Videos einbetten (URL-Eingabe mit Auto-Embed)
    * Tabellen einfügen
    * Code-Blöcke (für Markdown/HTML-Modus)
  * Umschalten zwischen WYSIWYG, Markdown und HTML-Modus
* **Medien-Verwaltung**:
  * Drag & Drop für Bilder und Videos
  * Integration mit zentraler Medienbibliothek
  * Bildbearbeitung: Zuschnitt, Filter, Alt-Text, Bildunterschrift
  * Video-Vorschau mit Play-Button
* **Layout-Auswahl**:
  * Dropdown mit Layout-Templates (mit visueller Vorschau)
  * Farb-Picker für Hintergrund, Text, Buttons (mit Hex-, RGB-, HSL-Eingabe)
  * Slider für Schriftgröße (12px - 24px)
  * Slider für Abstände (Padding, Margin)
  * Aspekt-Ratio für Bilder (16:9, 4:3, 1:1, frei)
* **Link-Konfiguration**:
  * Link-Ziel: Interne Seite (Dropdown mit allen Seiten) oder externe URL
  * Button-Text eingeben
  * Button-Style (Primär, Sekundär, Outline, Text)
  * Link in neuem Tab öffnen (Checkbox)
* **Platzierungs-Einstellungen**:
  * Seiten-Auswahl (Multi-Select: Dashboard, Startseite, Events, News, etc.)
  * Position auf Seite (Radio-Buttons: Oben, Mitte, Unten, Seitenleiste)
  * Widget-Größe (Radio-Buttons: Klein, Mittel, Groß, Volle Breite)
  * Sortierreihenfolge (Zahl eingeben, z. B. 1 = ganz oben)
* **Zeitsteuerung**:
  * Start-Datum und -Uhrzeit (Date-Picker)
  * End-Datum und -Uhrzeit (Date-Picker)
  * Wiederkehrende Veröffentlichung (Checkbox + Wochentage + Uhrzeiten)
  * Zeitzone auswählen (Dropdown)
* **Sichtbarkeits-Einstellungen**:
  * Berechtigungen (Radio-Buttons: Öffentlich, Nur angemeldet, Bestimmte Rollen)
  * Rollen-Auswahl (Multi-Select bei "Bestimmte Rollen")
  * Mandanten-Filter (bei Multi-Tenant-Setup)
* **A/B-Testing** (optional):
  * Variante A/B erstellen (Duplicate-Button)
  * Traffic-Split festlegen (Slider: 50/50, 70/30, etc.)
  * Test-Zeitraum definieren
  * Performance-Metriken wählen (Klickrate, Conversion, Verweildauer)

### Widget-Übersicht

* **Listen-Ansicht**:
  * Tabelle mit allen Widgets (Name, Status, Platzierung, Zeitraum, Erstellt von, Letzte Änderung)
  * Sortier- und Filterfunktionen (nach Status, Platzierung, Ersteller)
  * Suche nach Widget-Name
  * Bulk-Aktionen (Mehrere Widgets gleichzeitig aktivieren/deaktivieren/löschen)
* **Status-Anzeige**:
  * Entwurf (grau)
  * Geplant (blau)
  * Aktiv (grün)
  * Abgelaufen (orange)
  * Archiviert (grau)
* **Schnellaktionen**:
  * Bearbeiten, Duplizieren, Vorschau, Löschen
  * Status ändern (Aktivieren/Deaktivieren)
  * Statistiken anzeigen

### Widget-Templates

* **Vorgefertigte Templates**:
  * Standard-Templates (Text, Bild, Text+Bild, Hero, Card)
  * Branchen-Templates (Veranstaltungshinweis, Wichtige Mitteilung, Call-to-Action)
  * Custom Templates von Administrator:innen erstellt
* **Template-Verwaltung**:
  * Administrator:innen können eigene Templates erstellen und speichern
  * Templates können organisationsweit geteilt werden
  * Templates sind duplizierfähig und anpassbar

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

### Analytics-Dashboard im CMS

* **Widget-Performance-Übersicht**:
  * Impressions (Anzahl der Anzeigen)
  * Unique Views (Anzahl unterschiedlicher Nutzer:innen)
  * Klickrate (CTR) auf Links/Buttons
  * Durchschnittliche Verweildauer
  * Conversion-Rate (falls Ziel-URL definiert)
* **Zeitlicher Verlauf**:
  * Diagramme mit Tages-, Wochen-, Monatsansicht
  * Vergleich mehrerer Widgets
  * Export als CSV/PDF
* **A/B-Test-Auswertung**:
  * Vergleich der Performance von Varianten A und B
  * Statistische Signifikanz anzeigen
  * Empfehlung aussprechen (Gewinner-Variante)
* **Benachrichtigungen**:
  * Warnung bei niedriger Performance (< X Klicks pro Tag)
  * Alert bei abgelaufenen Widgets, die noch aktiv sind
  * Erinnerung an bevorstehende End-Daten

## Abhängigkeiten

* **Dashboard-Modul**: Widget muss in Dashboard-System integrierbar sein
* **Medienverwaltung**: Für Bilder und Videos
* **Modul-Store**: Widget muss im Modul-Store verfügbar und konfigurierbar sein
* **Analytics-System**: Für Tracking (optional)
