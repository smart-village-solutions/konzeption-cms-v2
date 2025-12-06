# Anforderungen: App-Gestaltung und Navigation

Dieses Kapitel beschreibt die Anforderungen an die Gestaltung und Navigation der App, die über das CMS konfiguriert werden können. Ziel ist es, Kommunen eine individuelle, barrierefreie und benutzerfreundliche App-Oberfläche zu ermöglichen, ohne dass Entwickler:innen für Anpassungen benötigt werden.

## Zweck und Mehrwert

**Herausforderungen:**
* Jede Kommune hat eigene Corporate Identity (CI) und Design-Vorgaben
* Grafische Anpassungen an der App erfordern bisher Entwickler:innen und App-Updates
* Navigation und Struktur müssen flexibel an kommunale Bedürfnisse anpassbar sein
* Barrierefreiheit und Responsivität müssen gewährleistet sein

**Nutzen:**
* **Für Kommunen**: Individuelle Markenidentität in der App, keine Abhängigkeit von Entwickler:innen für Design-Änderungen
* **Für Administrator:innen**: Einfache, selbstständige Anpassung von Farben, Logos, Icons und Navigation
* **Für Endanwender:innen**: Konsistentes, vertrautes Design gemäß kommunaler CI, intuitive Navigation

## Zielgruppen und Nutzer:innen

* **Administrator:innen**: Konfigurieren App-Design und Navigation im CMS
* **Designer:innen**: Definieren Farbpaletten, Icons und Layouts
* **Marketing-Verantwortliche**: Stellen sicher, dass App-Design der kommunalen CI entspricht
* **Endanwender:innen**: Nutzen die individuell gestaltete App

---

## Funktionsumfang

### 1. App-Branding

#### 1.1 App-Name und Identität

* **App-Name definieren/ändern**:
  * Eingabefeld für App-Namen (z. B. "Havelland App", "MeineDorf App")
  * Name wird in App-Stores, auf dem Home-Screen und im Header angezeigt
  * Mehrsprachigkeit: Name kann pro Sprache definiert werden
  * Änderungen erfordern neues App-Build (CI/CD-Pipeline)

#### 1.2 App-Icon

* **App-Icon hochladen und verwalten**:
  * Upload von App-Icon in verschiedenen Auflösungen (z. B. 512x512, 1024x1024)
  * Automatische Generierung aller benötigten Icon-Größen für iOS und Android
  * Vorschau auf verschiedenen Geräten (iPhone, iPad, Android)
  * Icon-Validator: Warnung bei falschen Abmessungen oder Dateiformaten
  * Unterstützte Formate: PNG, SVG (wird automatisch in Raster konvertiert)

### 2. Farb-Verwaltung

* **Primär-, Sekundär- und Akzentfarben definieren**:
  * Farb-Picker mit Hex-, RGB- und HSL-Eingabe
  * Primärfarbe: Hauptfarbe der App (Header, Buttons, Links)
  * Sekundärfarbe: Unterstützende Farbe (Icons, Highlights)
  * Akzentfarbe: Call-to-Action-Buttons, Warnungen
  * Hintergrundfarben: Hell, Dunkel, Neutral
  * Textfarben: Primär, Sekundär, Disabled
* **Dark Mode / Light Mode**:
  * Separate Farbpaletten für helle und dunkle Darstellung
  * Automatische Umschaltung basierend auf System-Einstellungen
  * Manueller Toggle in App-Einstellungen
* **Farbpaletten-Import**:
  * Import aus CI-Styleguides (CSS-Variablen, JSON, Figma)
  * KI-gestützte Design-Übernahme aus kommunaler Webseite (URL angeben, KI extrahiert Farben)
* **Kontrast-Prüfung**:
  * Automatische Überprüfung der Farbkombinationen auf WCAG 2.1 AA-Konformität
  * Warnung bei unzureichendem Kontrast zwischen Text und Hintergrund
* **Vorschau**:
  * Live-Vorschau der Farbänderungen auf verschiedenen Seiten (Startseite, News, Events)
  * Simulator für verschiedene Geräte (iPhone, Android, Tablet)

### 3. Iconset

* **Icon-Bibliothek verwalten**:
  * Standard-Iconset (z. B. Tabler Icons, Material Icons, Font Awesome)
  * Upload eigener Icons (SVG, PNG)
  * Icon-Kategorien (Navigation, Actions, Content, Social)
* **Icon-Zuordnung**:
  * Icons für Navigation (Tabbar, Drawer, Header)
  * Icons für Aktionen (Teilen, Favoriten, Suche)
* **Icon-Farben**:
  * Icons passen sich automatisch an Primär-/Sekundärfarben an
  * Optionale individuelle Einfärbung pro Icon

### 4. Schriftarten

* **Schriftart ändern**:
  * Auswahl aus System-Schriften (San Francisco, Roboto, etc.)
  * Upload eigener Schriftarten (TTF, OTF, WOFF)
  * Separate Schriftarten für Überschriften und Fließtext
  * Schriftgrößen konfigurieren (Klein, Standard, Groß, Extra-Groß für Barrierefreiheit)
* **Schrift-Vorschau**:
  * Live-Vorschau mit Beispiel-Texten
  * Test auf verschiedenen Geräten und Bildschirmgrößen

### 5. CI/CD-Unterstützung

* **Automatisiertes Build-System**:
  * Änderungen an App-Name, Icon, Farben und Schriften triggern automatisch CI/CD-Pipeline
  * Neues App-Build wird erstellt und in Test-Umgebung bereitgestellt
  * Optionale automatische Veröffentlichung in App-Stores (mit Freigabeprozess)
* **Build-Status im CMS**:
  * Anzeige des aktuellen Build-Status (In Progress, Success, Failed)
  * Benachrichtigung bei erfolgreichem oder fehlgeschlagenem Build
  * Download-Links für Test-Builds (TestFlight, Firebase App Distribution)

### 6. KI-gestützte Design-Übernahme

* **Design aus Webseite extrahieren**:
  * URL der kommunalen Webseite eingeben
  * KI analysiert Farben, Schriftarten, Icons und Layout
  * Automatischer Import der extrahierten Design-Elemente ins CMS
  * Manuelle Anpassung und Feintuning möglich
* **Logo-Erkennung**:
  * KI extrahiert Logo aus Webseite und schlägt es als App-Icon vor
  * Automatische Optimierung für verschiedene Icon-Größen

---

## Navigation und Struktur

### 7. Listenansichten-Verwaltung

* **Zentrale Konfiguration von Listenansichten**:
  * Definition, wie Inhalte in Listen dargestellt werden (News, Events, POIs, etc.)
  * Gilt für alle Module, die Listen anzeigen
  * Separate Konfiguration pro Inhaltstyp möglich

#### 7.1 Darstellungsformen für Listen

* **Verfügbare Listenansichten**:
  * **Einfache Liste**:
    - Text-only oder mit kleinem Icon
    - Kompakt, viele Einträge sichtbar
    - Ideal für: Nachrichten, einfache Auflistungen
  * **Liste mit Vorschaubild**:
    - Bild links/rechts, Titel und Kurzbeschreibung
    - Standard-Layout für News, Events
    - Konfigurierbar: Bildgröße (klein, mittel, groß)
  * **Karten-Layout (Cards)**:
    - Boxen mit Bild oben, Text unten
    - Abgerundete Ecken, Schatten
    - Ideal für: Events, POIs, Angebote
  * **Grid-Ansicht**:
    - 2 oder 3 Spalten nebeneinander
    - Quadratische Bilder
    - Ideal für: Bildergalerien, Kategorien
  * **Große Kacheln**:
    - Vollbreite Kacheln mit großem Bild
    - Viel Text sichtbar
    - Ideal für: Feature-Artikel, Highlights
  * **Timeline-Ansicht**:
    - Chronologische Darstellung mit Zeitachse
    - Ideal für: Chroniken, Historie, Events
  * **Magazin-Layout**:
    - Erstes Element groß, weitere klein
    - Editorial-Look
    - Ideal für: News-Übersichten

#### 7.2 Konfiguration pro Inhaltstyp

* **Standard-Darstellung festlegen**:
  * Administrator:innen wählen Default-Ansicht pro Inhaltstyp
  * Beispiel: News = Liste mit Vorschaubild, Events = Karten-Layout
  * Global oder pro Modul konfigurierbar
* **Nutzer-Wahlmöglichkeit**:
  * Option: "Nutzer kann Ansicht selbst wählen"
  * Umschalter in der App (Icon-Buttons: Liste/Karten/Grid)
  * Präferenz wird lokal gespeichert
  * Administrator:in kann Wahlmöglichkeit deaktivieren (nur Default)
* **Responsive Anpassung**:
  * Unterschiedliche Ansichten für Smartphone und Tablet
  * Beispiel: Smartphone = 1 Spalte, Tablet = 2 Spalten Grid
  * Automatische Anpassung basierend auf Bildschirmbreite

#### 7.3 Listenelemente konfigurieren

* **Angezeigte Felder auswählen**:
  * Welche Felder werden in der Liste angezeigt?
  * Beispiel News: Titel, Vorschaubild, Datum, Kategorie, Anzahl Likes
  * Drag-and-Drop-Reihenfolge der Felder
  * Pflichtfelder und optionale Felder
* **Bild-Einstellungen**:
  * Seitenverhältnis (16:9, 4:3, 1:1, Original)
  * Bildgröße (Thumbnail, Klein, Mittel, Groß)
  * Platzhalter-Bild bei fehlendem Bild
  * Lazy Loading aktivieren/deaktivieren
* **Text-Einstellungen**:
  * Maximale Zeichenlänge für Titel (z.B. 50 Zeichen, dann "...")
  * Vorschautext anzeigen (Ja/Nein, max. Länge)
  * Metadaten anzeigen (Datum, Autor, Kategorie, Tags)
* **Interaktions-Elemente**:
  * Favoriten-Icon in Liste anzeigen
  * Teilen-Button in Liste
  * Schnell-Aktionen (Swipe-Gesten: Links = Favorit, Rechts = Teilen)
  * Kontextmenü bei langem Druck (Optionen-Menü)

#### 7.4 Sortierung und Filterung

* **Standard-Sortierung**:
  * Nach Datum (Neueste zuerst / Älteste zuerst)
  * Alphabetisch (A-Z / Z-A)
  * Nach Relevanz (bei Suche)
  * Nach Beliebtheit (Views, Likes)
  * Nach Entfernung (bei POIs mit Standort)
* **Nutzer-Sortierung**:
  * Sortier-Dropdown in der App
  * Letzte Sortierung speichern
* **Filter-Leiste**:
  * Filter nach Kategorie, Datum, Ort anzeigen
  * Chip-basierte Filter (anklickbar, kombinierbar)
  * "Filter zurücksetzen"-Button

#### 7.5 Pagination und Lazy Loading

* **Listenende-Verhalten**:
  * **Pagination mit Seitenzahlen** (1, 2, 3, ...)
  * **"Mehr laden"-Button** am Listenende
  * **Infinite Scroll** (automatisches Nachladen beim Scrollen)
  * **Load More + Counter** ("20 von 157 angezeigt, weitere laden")
* **Performance-Einstellungen**:
  * Anzahl initial geladener Elemente (z.B. 20, 50, 100)
  * Anzahl nachgeladener Elemente (z.B. 20 pro Request)
  * Preloading aktivieren (nächste Seite vorab laden)

#### 7.6 Leere Listen und Fehlerzustände

* **Konfiguration bei leeren Listen**:
  * Platzhalter-Text ("Keine News vorhanden")
  * Platzhalter-Grafik/Icon
  * Call-to-Action ("Ersten Beitrag erstellen" für Admin)
* **Fehlerzustände**:
  * Offline-Modus: "Keine Verbindung, zeige gecachte Inhalte"
  * Ladefehler: "Inhalte konnten nicht geladen werden" + Retry-Button
  * Timeout: "Anfrage dauert zu lange" + Abbrechen/Wiederholen

### 8. Tabbar-Konfiguration

* **Tabbar bearbeiten**:
  * Anzahl der Tabs festlegen (3-5 Tabs empfohlen)
  * Tab-Name ändern (z. B. "Start", "Events", "Karte", "Profil")
  * Tab-Icon aus Iconset auswählen oder eigenes Icon hochladen
  * Ziel-Seite definieren (Startseite, Modul, statische Seite, externe URL)
  * Reihenfolge per Drag & Drop ändern
* **Tab-Sichtbarkeit**:
  * Tabs können für bestimmte Nutzergruppen ein-/ausgeblendet werden
  * Temporäre Tabs (zeitlich begrenzt, z. B. für Events)
* **Badge-Benachrichtigungen**:
  * Anzeige von Badges auf Tabs (z. B. Anzahl ungelesener Nachrichten)
  * Konfiguration, welche Module Badges unterstützen

### 8. Header-Konfiguration

* **Header-Layout**:
  * Logo im Header (Upload oder Auswahl aus Medienbibliothek)
  * Titel anzeigen/verbergen
  * Suchleiste im Header aktivieren/deaktivieren
  * Benachrichtigungs-Icon anzeigen/verbergen
* **Header-Farben**:
  * Hintergrundfarbe (basierend auf Primärfarbe oder individuell)
  * Textfarbe und Icon-Farbe
  * Transparenter Header (Hintergrund wird beim Scrollen sichtbar)
* **Header-Aktionen**:
  * Zusätzliche Buttons im Header (z. B. Favoriten, QR-Code-Scanner)
  * Position der Aktionen (links, rechts, zentriert)

### 9. In-App-Navigation und Navigations-Varianten

* **Wahl des Navigationsmodells**:
  * Administrator:innen wählen primäres Navigationsmodell für die App
  * Verschiedene Varianten für unterschiedliche Anwendungsfälle
  * Kombination mehrerer Varianten möglich

#### 9.1 Navigations-Varianten

* **Tabbar-Navigation (Bottom Navigation)**:
  * Feste Leiste am unteren Bildschirmrand (iOS/Android Standard)
  * 3-5 Hauptbereiche direkt erreichbar
  * Icons + Labels (oder nur Icons)
  * Aktiver Tab farblich hervorgehoben
  * Ideal für: Flache Hierarchien, häufig genutzte Bereiche
  * **Konfiguration**: Siehe Abschnitt "Tabbar-Konfiguration"
* **Drawer-Navigation (Hamburger-Menü)**:
  * Seitliches Slide-in-Menü (von links)
  * Unbegrenzte Anzahl Menüpunkte
  * Gruppierung möglich (Kategorien)
  * Header mit Logo/Profil, Footer mit Links
  * Ideal für: Tiefe Hierarchien, viele Bereiche
  * **Konfiguration**: Siehe Abschnitt "Drawer-Navigation"
* **Top-Navigation (Tabs oben)**:
  * Horizontale Tab-Leiste unter dem Header
  * Wischbare Tabs (Swipe zwischen Bereichen)
  * 2-6 Bereiche, scrollbar bei mehr
  * Ideal für: Inhaltliche Kategorien, Filter-Navigation
* **Dashboard-Navigation (Kachel-Startseite)**:
  * Startseite mit Kacheln für alle Bereiche
  * Visuell ansprechend mit Icons/Bildern
  * Gruppierung nach Themen
  * Ideal für: Viele gleichwertige Bereiche, Entdeckung
* **Hybrid-Navigation**:
  * Kombination mehrerer Varianten
  * Beispiel 1: Tabbar + Drawer (Hauptbereiche in Tabbar, weitere im Drawer)
  * Beispiel 2: Dashboard + Tabbar (Dashboard als Startseite, Tabbar für schnellen Zugriff)
  * Beispiel 3: Top-Tabs + Tabbar (Kategorien oben, Hauptbereiche unten)
* **Breadcrumb-Navigation**:
  * Pfadanzeige für tiefe Hierarchien
  * Klickbare Breadcrumbs zum Zurücknavigieren
  * Besonders wichtig bei Web-Ansicht oder Tablet

#### 9.2 Navigations-Konfiguration

* **Primäre Navigation wählen**:
  * Radio-Button-Auswahl: Tabbar / Drawer / Top-Navigation / Dashboard / Hybrid
  * Preview der gewählten Variante
  * Empfehlungen basierend auf App-Struktur (KI-gestützt)
* **Sekundäre Navigation hinzufügen**:
  * Falls Hybrid-Modus gewählt: Sekundäre Navigation konfigurieren
  * Zuordnung: Welche Bereiche in primärer, welche in sekundärer Navigation?
* **Navigations-Verhalten**:
  * **Zurück-Button-Verhalten**:
    - Android: Hardware-/System-Zurück-Button
    - iOS: Swipe-Geste von links
    - Verhalten konfigurieren: Zur vorherigen Seite, zur Startseite, App schließen
  * **Deep-Linking**:
    - Direkte Links zu Inhalten (z.B. aus Push-Notifications)
    - URL-Schema definieren (z.B. `myapp://news/123`)
    - Handling von externen Links
  * **Navigation-History**:
    - Historie speichern (Back-Button-Stack)
    - Max. Anzahl History-Einträge
    - "Zur Startseite"-Shortcut bei tiefer Navigation
* **Navigations-Transition**:
  * Animationen zwischen Seiten:
    - Slide (von rechts)
    - Fade (Ein-/Ausblenden)
    - Scale (Zoom-Effekt)
    - None (Keine Animation)
  * Animationsgeschwindigkeit (Schnell, Normal, Langsam)
  * Plattform-spezifische Defaults (iOS-Style vs. Material Design)

#### 9.3 Kontext-Navigation

* **Floating Action Button (FAB)**:
  * Runder Button über dem Content (meist rechts unten)
  * Primäre Aktion der aktuellen Seite (z.B. "Neuen Eintrag erstellen")
  * Icon und Farbe konfigurierbar
  * Sichtbarkeit pro Seite/Modul
* **Tab-spezifische Actions**:
  * Aktionen im Header, die sich je nach Tab ändern
  * Beispiel: Filter-Icon bei News, Karte-Icon bei Events
* **Schnellzugriff (Quick Actions)**:
  * 3D Touch / Long Press auf App-Icon (Home-Screen)
  - Vordefinierte Aktionen (z.B. "Neues Event erstellen", "Zur Karte")
  * Im CMS konfigurierbar (bis zu 4 Quick Actions)

#### 9.4 Accessibility bei Navigation

* **Screen-Reader-Unterstützung**:
  * Alle Navigations-Elemente mit Accessibility-Labels
  * Logische Tab-Reihenfolge
  * Ankündigung des aktuellen Bereichs
* **Tastatur-Navigation**:
  * Tab-Navigation für externe Tastaturen (iPad, Android-Tablets)
  * Shortcuts für Hauptbereiche (z.B. Cmd+1, Cmd+2, ...)
* **Größe der Touch-Targets**:
  * Mindestens 44x44 pt (iOS), 48x48 dp (Android)
  * Konfigurierbar: Standard, Groß, Extra-Groß
* **Visuelle Hilfen**:
  * Aktiver Tab deutlich hervorgehoben
  * Fokus-Indikator bei Tastatur-Navigation
  * Breadcrumbs für Orientierung

#### 9.5 Navigation und Onboarding

* **Erste Schritte (Onboarding-Tour)**:
  * Highlight-Overlay für Navigation beim ersten App-Start
  * "So funktioniert die Navigation"-Tutorial
  * Überspringbar, später wiederholbar in Einstellungen
* **Navigation-Hinweise**:
  * Tooltips bei neuen Bereichen
  * "Neu"-Badge bei hinzugefügten Menüpunkten
  * Pulsierender Indicator bei wichtigen Updates

### 10. Drawer-Navigation

* **Drawer-Menü konfigurieren**:
  * Menüpunkte hinzufügen, bearbeiten, löschen
  * Menüpunkt-Name, Icon und Ziel-Seite definieren
  * Reihenfolge per Drag & Drop ändern
  * Gruppierung von Menüpunkten (z. B. "Service", "Entdecken", "Mein Bereich")
* **Drawer-Header**:
  * Logo oder Bild im Drawer-Header
  * Nutzer-Profil anzeigen (bei angemeldeten Nutzer:innen)
  * Grußtext oder Willkommensnachricht
* **Drawer-Footer**:
  * Links zu Impressum, Datenschutz, Nutzungsbedingungen
  * Social-Media-Icons
  * Versionsnummer und Copyright-Hinweis

---

## App-Einstellungen und lokaler Speicher

### 10. App-Einstellungen

* **Nutzer-Einstellungen**:
  * Sprache auswählen (Deutsch, Englisch, weitere Sprachen)
  * Dark Mode / Light Mode umschalten
  * Schriftgröße anpassen (Klein, Standard, Groß, Extra-Groß)
  * Benachrichtigungen aktivieren/deaktivieren
  * Standort-Freigabe aktivieren/deaktivieren
* **Cache und Offline-Modus**:
  * Offline-Inhalte verwalten (welche Inhalte gecacht werden)
  * Cache leeren (Speicherplatz freigeben)
  * Download-Verhalten (nur WLAN, auch mobiles Netz)

### 11. Lokaler App-Speicher

* **Daten lokal speichern**:
  * Offline-Verfügbarkeit für definierte Inhalte (News, Events, Seiten)
  * Favoriten und Merkliste lokal speichern
  * Lesezeichen und Verlauf speichern
  * Nutzer-Einstellungen und Präferenzen speichern
* **Speicher-Management**:
  * Anzeige des genutzten Speicherplatzes
  * Automatische Bereinigung alter Daten (konfigurierbar)
  * Manuelle Löschung von Cache und Offline-Daten

---

## Konfiguration im CMS

### Design-Editor

* **Zentraler Design-Editor**:
  * Übersichtliche Oberfläche mit Tabs für Branding, Farben, Icons, Schriften, Navigation
  * Live-Vorschau aller Änderungen
  * "Speichern und Testen"-Button (erstellt Test-Build)
  * "Veröffentlichen"-Button (erstellt Production-Build nach Freigabe)
* **Versionierung**:
  * Design-Änderungen werden versioniert
  * Möglichkeit, zu vorherigen Versionen zurückzukehren
  * Changelog mit Änderungshistorie

### Rollen und Rechte

* **Design-Administrator:innen**: Haben vollen Zugriff auf alle Design-Einstellungen
* **Redakteur:innen**: Können Navigation (Tabbar, Drawer) bearbeiten
* **Viewer**: Können Design-Einstellungen nur ansehen

### Workflow und Freigaben

* **Entwurf → Freigabe → Veröffentlicht**:
  * Design-Änderungen werden als Entwurf gespeichert
  * Freigabe durch Design-Administrator:in erforderlich
  * Nach Freigabe: Automatischer Build und Veröffentlichung
* **Preview-Builds**:
  * Test-Builds können vor Veröffentlichung erstellt werden
  * QR-Code zum Download des Test-Builds
  * Feedback-Möglichkeit für Tester:innen

---

## Integrationen und Schnittstellen

### CI/CD-Pipeline

* **GitHub Actions / GitLab CI**:
  * Automatischer Trigger bei Design-Änderungen
  * Build für iOS und Android
  * Upload zu TestFlight / Firebase App Distribution
  * Optional: Automatische Veröffentlichung in App-Stores
* **Build-Konfiguration**:
  * Umgebungsvariablen für verschiedene Stages (Dev, Staging, Production)
  * App-Signing mit Zertifikaten
  * Code-Signing und Provisioning Profiles

### Design-Import

* **Figma-Integration**:
  * Import von Design-Tokens aus Figma (Farben, Schriften, Icons)
  * API-Verbindung zu Figma-Projekten
* **CSS-Import**:
  * Import von CSS-Variablen aus Styleguides
  * Automatische Konvertierung in App-Farben

### KI-Unterstützung

* **Design-Analyse**:
  * Webseiten-Scraping für Farben, Schriften, Logos
  * Bildanalyse für Logo-Extraktion
  * Empfehlungen für passende Farbkombinationen

---

## Nicht-funktionale Anforderungen

### Performance

* Design-Änderungen dürfen keine negativen Auswirkungen auf App-Performance haben
* App-Icon und Logo-Optimierung für schnelle Ladezeiten
* Lazy Loading für Icons und Bilder

### Responsivität

* Design muss auf verschiedenen Bildschirmgrößen funktionieren (Smartphone, Tablet, Foldables)
* Unterstützung für Landscape- und Portrait-Modus
* Adaptive Layouts für verschiedene Geräteklassen

### Barrierefreiheit

* **WCAG 2.1 AA-Konformität**:
  * Ausreichender Kontrast zwischen Text und Hintergrund (4.5:1 für Fließtext, 3:1 für große Texte)
  * Skalierbare Schriftgrößen (mindestens 200% ohne Funktionsverlust)
  * Tastaturnavigation und Screen-Reader-Unterstützung
* **BITV 2.0-Konformität**:
  * Deutsche Barrierefreiheitsstandards für öffentliche Verwaltungen
  * Alternativtexte für Icons und Bilder
  * Klare Benennung von Navigationselementen

### Datenschutz

* Keine personenbezogenen Daten in Design-Konfigurationen
* Audit-Logs für Design-Änderungen

---

## Monitoring und KPIs

### Design-Metriken

* **Nutzung der Design-Features**:
  * Wie oft werden Design-Änderungen vorgenommen?
  * Welche Farben/Icons werden am häufigsten geändert?
* **Build-Erfolgsrate**:
  * Wie viele Builds schlagen fehl?
  * Durchschnittliche Build-Zeit
* **A/B-Testing**:
  * Vergleich verschiedener Design-Varianten
  * Welches Design hat bessere Nutzungsmetriken?

### Benachrichtigungen

* Warnung bei fehlgeschlagenen Builds
* Erinnerung an ausstehende Design-Freigaben
* Alert bei WCAG-Kontrast-Verstößen

---

## Abhängigkeiten

### Technische Abhängigkeiten

* **CI/CD-Pipeline**: GitHub Actions, GitLab CI, Bitrise, Fastlane
* **App-Build-Tools**: Xcode (iOS), Android Studio, Expo, React Native CLI
* **Design-Tools**: Figma API, CSS-Parser
* **KI-Services**: OpenAI Vision API, Google Cloud Vision API

### Fachliche Abhängigkeiten

* **Module**: Header, Tabbar, Drawer-Navigation müssen implementiert sein
* **Medienverwaltung**: Für Upload von Logos, Icons, Bildern
* **Benutzer-Verwaltung**: Für Rollen und Rechte

### Auswirkungen

* **Schulung**: Administrator:innen benötigen Schulung im Design-Editor
* **Support**: Support-Team muss CI/CD-Prozesse verstehen
* **Betrieb**: Monitoring der Build-Pipeline erforderlich

---

## Offene Fragen

* Sollen Design-Änderungen ohne App-Update möglich sein (Over-the-Air-Updates für Farben/Icons)?
* Soll es Design-Templates geben, die als Startpunkt dienen (z. B. "Moderne Kommune", "Traditionelle Verwaltung")?
* Sollen saisonale Designs unterstützt werden (z. B. Weihnachten, Sommer)?
