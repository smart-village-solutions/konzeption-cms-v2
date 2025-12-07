# Modul: Störer

## Zweck und Mehrwert

Der Störer ist ein Overlay-Modul, das wichtige Hinweise, Ankündigungen oder Werbung prominent auf der App-Startseite einblendet. Es ermöglicht Kommunen, zeitlich begrenzte Informationen hervorzuheben und Nutzer:innen direkt anzusprechen, bevor sie mit der App interagieren. Der Störer ist flexibel konfigurierbar und unterstützt Bilder, Texte und Verlinkungen.

**Herausforderungen:**
* Wichtige Informationen gehen in der Informationsflut unter
* Zeitkritische Ankündigungen (z. B. Ausbildungsstart, Veranstaltungen) müssen sichtbar gemacht werden
* Nutzer:innen sollen auf neue Services oder Änderungen aufmerksam gemacht werden

**Nutzen:**
* **Für Kommunen**: Hohe Sichtbarkeit für wichtige Inhalte, niedrige Einstiegshürde für Nutzer:innen
* **Für Endanwender:innen**: Schnelle Informationsaufnahme, keine Suche nach wichtigen Hinweisen erforderlich
* **Für Marketing**: Möglichkeit für Kampagnen und Promotion (z. B. Ausbildungsplätze, Veranstaltungen)

## Zielgruppen und Nutzer:innen

* **Redakteur:innen**: Erstellen und konfigurieren Störer im CMS
* **Marketing-Verantwortliche**: Nutzen Störer für Kampagnen und Werbung
* **Bürger:innen**: Sehen Störer beim Öffnen der App auf der Startseite
* **Fachabteilungen**: Nutzen Störer für wichtige Hinweise (z. B. geänderte Öffnungszeiten, Notfallmeldungen)

## Funktionsumfang

### Basisablauf (Happy Path)

1. **Redakteur:in erstellt Störer im CMS**:
   * Titel und Beschreibung eingeben
   * Bilder hochladen (1 oder mehrere)
   * Ziel-URL festlegen (intern oder extern)
   * Zeitraum definieren (Start- und Enddatum)
   * Autoplay-Intervall konfigurieren (bei mehreren Bildern)
   * Speichern und Vorschau testen

2. **Störer wird in der App angezeigt**:
   * Nutzer:in öffnet die App
   * Störer erscheint als Overlay auf der Startseite
   * Bei mehreren Bildern: Automatische Rotation im definierten Intervall
   * Nutzer:in kann auf Bild klicken → wird zur Ziel-URL weitergeleitet
   * Optional: Störer schließen (falls "Schließen-Button" aktiviert)

3. **Störer endet automatisch**:
   * Nach Ablauf des Enddatums wird Störer nicht mehr angezeigt
   * Redakteur:in kann Störer vorzeitig deaktivieren

### Alternative Pfade und Sonderfälle

* **Mehrere aktive Störer**: Nur der Störer mit höchster Priorität wird angezeigt (konfigurierbar)
* **Kein Schließen-Button**: Nutzer:in muss auf Bild klicken oder warten, bis Störer automatisch verschwindet
* **Fehlerhafte Bild-URLs**: Platzhalter-Bild wird angezeigt mit Hinweis "Bild nicht verfügbar"
* **Zeitraum überschneidend**: Redakteur:in erhält Warnung bei zeitlicher Überschneidung mehrerer Störer

### Frontend-Darstellung

* **Overlay-Darstellung**: Störer erscheint zentral über der Startseite (Modal)
* **Hintergrund**: Dimmed/Overlay-Hintergrund (transparent, konfigurierbare Farbe)
* **Bild-Rotation**: Bei mehreren Bildern automatische Diashow mit konfigurierbarem Intervall
* **Aspekt-Ratio**: Bilder werden im definierten Seitenverhältnis dargestellt (z. B. 1:1, 16:9)
* **Call-to-Action**: Beschreibungstext unter dem Bild (optional)

## Inhalte und Daten

### Datenstruktur

**Pflichtfelder:**
* **id**: Eindeutige ID des Störers
* **pictures**: Array von Bildern mit folgenden Eigenschaften:
  * **uri**: Bild-URL (lokal oder extern)
  * **title**: Titel des Hinweises
  * **routeName**: Ziel-Route (z. B. "Web" für externe URLs, oder interne App-Route)
  * **params**: Parameter für Navigation (webUrl, rootRouteName)
* **dates**: Array von Zeiträumen mit Start- und Enddatum
  * **dateStart**: Startdatum (ISO-Format: YYYY-MM-DD)
  * **dateEnd**: Enddatum (ISO-Format: YYYY-MM-DD)

**Optionale Felder:**
* **description**: Beschreibungstext unter dem Bild
* **aspectRatio**: Seitenverhältnis (WIDTH, HEIGHT)
* **autoplayInterval**: Intervall für automatische Rotation (in Millisekunden, Standard: 5000)
* **showButtonToClose**: Schließen-Button anzeigen (true/false)
* **backgroundColor**: Hintergrundfarbe des Störers (Hex-Code)
* **priority**: Priorität bei mehreren aktiven Störern (höhere Zahl = höhere Priorität)

### Datenquellen

* **Bilder**: Aus Medienverwaltung oder externe URLs
* **Ziel-URLs**: Interne App-Routen oder externe Webseiten
* **Migration**: Bestehende JSON-Konfigurationen müssen ins CMS migriert werden

### Mehrsprachigkeit

* Titel, Beschreibung und Ziel-URLs können mehrsprachig gepflegt werden
* Bilder können sprachspezifisch sein (optional)

### Versionierung

* Störer werden versioniert, um Änderungen nachvollziehen zu können
* Alte Versionen können wiederhergestellt werden

### Archivierung

* Abgelaufene Störer werden automatisch archiviert (nicht gelöscht)
* Archivierte Störer können für zukünftige Kampagnen wiederverwendet werden

## Konfiguration im CMS

### Administrator:innen-Einstellungen

* **Störer erstellen/bearbeiten**:
  * Titel, Beschreibung, Bilder hochladen
  * Zeitraum festlegen (Start-/Enddatum, Uhrzeit)
  * Ziel-URL konfigurieren (intern oder extern)
  * Autoplay-Intervall einstellen (Standard: 5 Sekunden)
  * Aspekt-Ratio wählen (1:1, 16:9, 4:3, frei)
  * Schließen-Button aktivieren/deaktivieren
  * Hintergrundfarbe festlegen
  * Priorität setzen (bei mehreren aktiven Störern)
* **Vorschau-Funktion**: Störer im CMS simulieren und testen
* **Zeitplan-Übersicht**: Kalender mit allen geplanten Störern
* **Warnung bei Überschneidungen**: System warnt, wenn mehrere Störer gleichzeitig aktiv sind

### Rollen- und Rechtekonzept

* **Redakteur:innen**: Können Störer erstellen, bearbeiten und löschen
* **Marketing-Verantwortliche**: Können Störer erstellen und zur Freigabe einreichen
* **Reviewer**: Müssen Störer freigeben, bevor sie veröffentlicht werden (optional)
* **Administrator:innen**: Können alle Störer verwalten und Einstellungen anpassen

### Workflow und Freigabeprozesse

* **Entwurf → Freigabe → Veröffentlicht**: Störer durchlaufen optionalen Freigabeprozess
* **Zeitgesteuerte Veröffentlichung**: Störer werden automatisch zum definierten Zeitpunkt aktiviert
* **Automatische Archivierung**: Nach Ablauf des Enddatums werden Störer archiviert

## Integrationen und Schnittstellen

### Interne Integration

* **Medienverwaltung**: Bilder werden aus zentraler Medienbibliothek ausgewählt
* **Deep-Linking**: Störer können zu internen App-Seiten verlinken (Events, News, Seiten)
* **Analytics**: Tracking von Störer-Klicks und Conversions

### Externe Integration

* **Externe URLs**: Störer können zu externen Webseiten verlinken
* **Notfallwarnsysteme**: Optional Integration mit NINA, KATWARN für Notfallmeldungen

### API-Anforderungen

* **GraphQL API**: Störer-Daten werden über GraphQL API bereitgestellt
* **Endpoint**: `query { disturbers(active: true) { ... } }`
* **Response-Format**: JSON (entsprechend bisheriger JSON-Struktur)
* **Caching**: Störer-Daten werden client-seitig gecacht (5-15 Minuten)

## Nicht-funktionale Anforderungen

### Performance

* Störer-Daten müssen innerhalb von 500ms geladen werden
* Bilder müssen optimiert sein (max. 500KB pro Bild)
* Autoplay-Rotation darf keine Performance-Einbußen verursachen

### Sicherheit und Datenschutz

* **Keine personenbezogenen Daten**: Störer enthalten keine personenbezogenen Inhalte
* **Audit-Logs**: Alle Änderungen an Störern werden protokolliert (wer, wann, was)
* **DSGVO-konform**: Tracking nur mit Nutzer-Einwilligung

### Barrierefreiheit

* **WCAG 2.1 AA-konform**: Störer müssen barrierefrei sein
* **Alt-Texte**: Bilder benötigen Alt-Texte für Screenreader
* **Tastaturnavigation**: Störer kann per Tastatur geschlossen werden (ESC-Taste)
* **Kontrast**: Text und Hintergrund müssen ausreichend Kontrast bieten

## Monitoring und KPIs

### Kennzahlen

* **Impressions**: Wie oft wurde der Störer angezeigt?
* **Klickrate (CTR)**: Wie viele Nutzer:innen haben auf den Störer geklickt?
* **Conversion**: Wie viele Nutzer:innen haben die Ziel-URL besucht?
* **Close-Rate**: Wie oft wurde der Störer geschlossen, ohne zu klicken?
* **Durchschnittliche Verweildauer**: Wie lange wird der Störer betrachtet?

### Alarme und Benachrichtigungen

* **Fehlerhafte Bilder**: Warnung, wenn Bilder nicht geladen werden können
* **Ablaufende Störer**: Benachrichtigung 2 Tage vor Ablauf des Störers
* **Überschneidungen**: Warnung bei zeitlicher Überschneidung mehrerer Störer

## Abhängigkeiten

### Technische Abhängigkeiten

* **Medienverwaltung**: Bilder müssen aus Medienbibliothek abrufbar sein
* **GraphQL API**: Störer-Daten werden über API bereitgestellt
* **Deep-Linking**: App muss interne Routen unterstützen
* **Analytics**: Tracking-System (Matomo) für KPIs

### Fachliche Abhängigkeiten

* **Content-Module**: Störer können zu Events, News, Seiten verlinken
* **Notfallwarnsystem**: Optional Integration für Notfallmeldungen

### Auswirkungen

* **Schulung**: Redakteur:innen müssen in Störer-Erstellung geschult werden
* **Support**: Support-Team muss Störer-Konfiguration unterstützen können
* **Betrieb**: Monitoring der Störer-Performance erforderlich

## Offene Fragen

* Sollen mehrere Störer gleichzeitig angezeigt werden können (z. B. als Karussell)?
* Sollen Nutzer:innen Störer dauerhaft ausblenden können ("Nicht mehr anzeigen")?
* Sollen Störer nur einmal pro Nutzer:in angezeigt werden (Cookie/LocalStorage)?
* Sollen Störer zielgruppenspezifisch ausgespielt werden (z. B. nur für bestimmte Stadtteile)?
* Sollen Störer auch auf anderen Seiten (nicht nur Startseite) angezeigt werden können?
* Sollen Störer A/B-Testing unterstützen?

## Notizen aus Vorarbeit

**Bisherige Implementierung:**
* Störer werden über JSON-Datei konfiguriert und per App-Update ausgerollt
* Beispiel-JSON zeigt Struktur mit pictures, dates, autoplayInterval, etc.
* Migration ins CMS erforderlich, um dynamische Verwaltung ohne App-Updates zu ermöglichen

**Beispiel-Anwendungsfälle:**
* Ausbildungsplätze bewerben (Havelland: "Jetzt bewerben!")
* Veranstaltungen ankündigen ("Feuer und Flamme für unsere Museen")
* Geänderte Öffnungszeiten kommunizieren ("Zulassungsstelle Nauen")

**Technische Details:**
* Aspekt-Ratio: 1:1 (quadratisch) am häufigsten genutzt
* Autoplay-Intervall: Standard 5000ms (5 Sekunden)
* Schließen-Button: Oft deaktiviert, um Sichtbarkeit zu erzwingen
* Zeiträume: Oft mehrwöchig (z. B. 22.10. - 08.12.2024)
