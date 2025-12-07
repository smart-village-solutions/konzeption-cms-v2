# **Milestone 3: Ablösung der Konfigurationsdateien**

**Status:** 🔴 Geplant

## Kurzbeschreibung

Alle Funktionen, die bisher über schwer wartbare Server-Konfigurationen gesteuert wurden, werden in ein modernes Self-Service-Interface überführt. Kommunen können damit erstmals sämtliche App-Einstellungen ohne technischen Support steuern.

## Ziele & Mehrwert

* **Geschäftsziel:** Massive Reduktion des Supportaufwands und Erhöhung der Flexibilität für Kommunen.
* **Technisches Ziel:** Einführung eines zentralen, UI-basierten Konfigurationssystems.
* **Nutzerziel:** Kommunen können ohne technische Kenntnisse das Erscheinen ihrer App anpassen.

## Bestandteile

### App-Konfiguration (bestehend)
* Störer / Hinweise
* Listen- und Kachelseiten
* Kategorienverwaltung
* Tabbar-Konfiguration
* App Settings
* Slider / Karussell
* App-Intro / Onboarding
* Konfigurations-API
* Berechtigungskonzept für Konfiguration

### E-Mail-Konfiguration und -Verwaltung (NEU)
* **Zentrale E-Mail-Verwaltung:**
  * Liste aller konfigurierten E-Mail-Accounts
  * Account-Typen: System-Benachrichtigungen, Kontaktformular, Newsletter, Support, Transaktional, No-Reply
  * Hinzufügen, Bearbeiten, Löschen von E-Mail-Accounts
* **E-Mail-Account-Konfiguration:**
  * SMTP-Server, Port, Verschlüsselung (TLS/SSL)
  * Authentifizierung (Benutzername, Passwort, OAuth2)
  * Absender-Name und Absender-E-Mail
  * Test-Funktion: "Test-E-Mail senden"
  * Status-Anzeige (Aktiv, Fehler, Nicht konfiguriert)
  * Fehlerbehandlung: Retry-Logik, Dead-Letter-Queue
* **Zuordnung von E-Mail-Accounts zu Funktionen:**
  * Dropdown-Auswahl bei jeder E-Mail-Funktion
  * Zentrale Übersicht: Welche Funktion nutzt welchen Account
  * Instanz-spezifisch in Multi-Mandanten-Umgebungen
* **E-Mail-Templates und Branding:**
  * Template-Verwaltung pro E-Mail-Typ (Willkommens-E-Mail, Passwort-Reset, etc.)
  * WYSIWYG-Editor für E-Mail-Templates
  * Platzhalter-System für dynamische Inhalte
  * Vorschau-Funktion
  * Mehrsprachige Templates
* **E-Mail-Versand-Monitoring:**
  * Übersicht versendeter E-Mails (letzte 30 Tage)
  * Status: Erfolgreich, Fehlgeschlagen, In Warteschlange
  * Fehlerlog mit Retry-History
  * Statistiken: Versandrate, Fehlerrate pro Account
  * Export der Versandhistorie (CSV)
* **SPF/DKIM/DMARC-Prüfung:**
  * DNS-Validierung für SPF, DKIM, DMARC
  * Warnungen bei fehlender oder falscher Konfiguration
  * Setup-Anleitung für DNS-Einträge

### App-Instanzen-Verwaltung (NEU)
* **Einrichtung neuer App-Instanzen:**
  * Wizard mit 4 Schritten:
    1. Grunddaten (Name, Kommune, Kontakt)
    2. Template-Auswahl (Basis, Standard, Enterprise)
    3. Modul-Auswahl (welche Module aktivieren)
    4. Design & Branding (Logo, Farben, Fonts)
  * Automatische Provisionierung (Datenbank, Speicher, Keycloak-Realm)
  * E-Mail-Benachrichtigung nach Abschluss
* **Templates für App-Instanzen:**
  * **Basis-Template:** News, Events, Orte, Karte (minimale Konfiguration)
  * **Standard-Template:** + Abfallkalender, Baustellen, Mängelmelder, Umfragen
  * **Enterprise-Template:** Alle Module, erweiterte Konfigurationen, Premium-Features
  * Custom-Templates: Eigene Templates definieren und speichern
* **Status-Management für Instanzen:**
  * Status: Aktiv, Inaktiv, Wartung, Archiviert, In Einrichtung
  * Status-Änderungen protokollieren (Audit-Log)
  * Automatische Benachrichtigungen bei Status-Änderungen
  * Wartungsmodus: App für Endnutzer sperren mit konfigurierbarer Nachricht
* **Ressourcen-Monitoring pro Instanz:**
  * CPU-Auslastung, RAM-Nutzung, Speicherplatz
  * Anzahl Nutzer, Anzahl Inhalte, API-Aufrufe
  * Warnungen bei Schwellwerten (z.B. >80% Speicher belegt)
  * Historische Daten (letzte 30 Tage)
  * Ressourcen-Limits konfigurierbar
* **Mandanten-Trennung:**
  * Strikte Datentrennung zwischen Instanzen (Row-Level Security)
  * Keine Cross-Instanz-Zugriffe ohne explizite Berechtigung
  * Isolierte Backups pro Instanz
* **Migration und Export:**
  * Export einer kompletten Instanz (Konfiguration + Daten)
  * Import in andere Umgebung (Dev → Staging → Production)
  * Backup & Restore einzelner Instanzen
  * Klonen von Instanzen (z.B. für Testing)

### Sprachverwaltung und i18n-System (NEU)
* **Übersetzungs-Editor für UI-Übersetzungen:**
  * Übersicht aller i18n-Keys (Deutsch, Englisch, weitere Sprachen)
  * Inline-Editing: Übersetzungen direkt bearbeiten
  * Filterung nach Sprache, Modul, Status (übersetzt/fehlend)
  * Suchfunktion für Keys und Texte
  * Anzeige, wo ein i18n-Key verwendet wird (Kontext)
* **Import/Export für Übersetzer:**
  * Export-Formate: JSON, YAML, PO (Gettext), XLIFF
  * Import nach Übersetzung durch externe Dienstleister
  * Merge-Strategie bei Konflikten (keep existing/overwrite/review)
  * Validierung beim Import (Platzhalter prüfen, Vollständigkeit)
* **Translation Memory:**
  * Automatisches Speichern aller Übersetzungen
  * Vorschläge aus ähnlichen Übersetzungen
  * Wiederverwendung bei neuen Keys
  * Übersetzungs-Historie mit Änderungsdatum
* **KI-gestützte Übersetzungsvorschläge:**
  * Integration DeepL und/oder Google Translate API
  * "Übersetzen vorschlagen"-Button bei fehlenden Übersetzungen
  * Batch-Übersetzung für viele fehlende Keys
  * Kosten-Übersicht (API-Aufrufe)
* **Qualitätssicherung:**
  * Vollständigkeits-Check: Welche Keys fehlen in welcher Sprache?
  * Platzhalter-Validierung (z.B. {{name}} muss in allen Sprachen vorhanden sein)
  * Längen-Check: Warnung bei sehr langen Übersetzungen (UI-Darstellung)
  * Duplikat-Erkennung: Gleiche Texte mit unterschiedlichen Keys
* **Mehrsprachige Inhalte:**
  * Content-Übersetzungen (nicht nur UI): Artikel, Events, etc. in mehreren Sprachen
  * Sprachauswahl pro Content-Element
  * "Übersetzung fehlt"-Hinweis im Frontend
  * Fallback-Sprache konfigurierbar (z.B. Deutsch als Default)

### App-Design und Theme-Editor **[MUSS]**
* **Visueller Theme-Editor:**
  * WYSIWYG-Interface zur direkten Anpassung des App-Designs
  * Live-Vorschau in verschiedenen Bildschirmgrößen (Mobile, Tablet, Desktop)
  * Design-Elemente: Primärfarbe, Sekundärfarbe, Akzentfarbe, Hintergrundfarben
  * Typografie: Schriftarten (Google Fonts, Custom Fonts), Schriftgrößen, Zeilenhöhe
  * Abstände und Rundungen: Padding, Margin, Border-Radius
  * Dark Mode: Separate Farbpalette für dunkles Design
* **Logo und Branding:**
  * Upload mehrerer Logo-Varianten (Standard, Dark Mode, Favicon, App-Icon)
  * Bildformate: PNG, SVG, JPEG (automatische Konvertierung)
  * Positionierung: Links, Zentriert, Rechts
  * Logo-Größe anpassbar
  * Fallback-Logo bei fehlendem Upload
* **Farbmanagement:**
  * Farbpaletten-Generator: Automatische Ableitung von Sekundär- und Akzentfarben
  * Barrierefreiheitsprüfung: WCAG-konformer Kontrast (AA, AAA)
  * Farbvorschau in allen UI-Komponenten (Buttons, Karten, Header)
  * Export und Import von Themes (JSON)
* **Responsive Design-Einstellungen:**
  * Breakpoints konfigurieren (Mobile <768px, Tablet 768-1024px, Desktop >1024px)
  * Layout-Modi: Fluid, Fixed, Hybrid
  * Touch-Optimierung: Größere Buttons und Touch-Targets auf Mobile
* **Theme-Vorlagen:**
  * 5-10 vordefinierte Theme-Templates (Modern, Classic, Minimal, Bold, etc.)
  * Template-Vorschau vor Auswahl
  * Custom-Themes speichern und wiederverwenden
  * Theme-Export für andere Instanzen
* **CSS-Variablen-System:**
  * Zentrale CSS-Custom-Properties für alle Design-Tokens
  * Dynamisches Laden bei Theme-Änderung (ohne Neuladen der Seite)
  * Override-Möglichkeit für fortgeschrittene Nutzer (Custom CSS)

### Modul-Management UI (Entwickler-Tools) **[MUSS]**

* **Übersicht installierter Module:**
  * Liste aller installierten Backend-Module (Plugins, Extensions)
  * Anzeige: Name, Version, Autor, Status (Aktiv/Inaktiv), Beschreibung
  * Badges für Updates verfügbar, Sicherheitsupdates, Deprecated
  * Filterung nach Status, Kategorie, Hersteller
  * Suchfunktion
* **Modul-Installation und Updates:**
  * Upload von Modul-Paketen (ZIP, TAR.GZ)
  * Installation aus Modul-Registry (zukünftig: Marketplace)
  * Automatische Dependency-Prüfung (benötigte Module, Versionen)
  * Update-Funktion mit Changelog-Anzeige
  * Rollback-Option bei fehlgeschlagenen Updates
  * Backup vor Installation/Update
* **Modul-Konfiguration:**
  * Zentrale Konfigurationsseite pro Modul
  * Modul-spezifische Einstellungen (Key-Value, JSON, YAML)
  * Umgebungsvariablen-Verwaltung
  * Secrets-Management (API-Keys, Passwörter verschlüsselt speichern)
  * Validierung der Konfiguration (Schema-basiert)
  * Export/Import von Modul-Konfigurationen

---
