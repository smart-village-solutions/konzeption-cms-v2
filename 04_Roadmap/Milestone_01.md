# **Milestone 1: Rollenrechte & MVP**

**Status:** 🔴 Geplant

## Kurzbeschreibung

Dieser Meilenstein etabliert das vollständige Rollen- und Berechtigungssystem als Fundament des neuen CMS. Das MVP (News + Medienverwaltung) dient als praxisnaher Demonstrator, um die Rechtearchitektur realitätsnah zu testen und zu verfeinern.

## Ziele & Mehrwert

* **Geschäftsziel:** Sichere Governance-Strukturen schaffen, die den Einsatz des neuen CMS in Kommunen konform und skalierbar ermöglichen.
* **Technisches Ziel:** Implementierung eines granularen rollenbasierten Berechtigungssystems inklusive Audit Logs und Authentifizierung.
* **Nutzerziel:** Redakteure können Inhalte erstmals im neuen System erstellen, prüfen und veröffentlichen.

## Bestandteile

### Rollen- und Rechtemanagement

* **Rollenmodell:** Vordefinierte Rollen (Admin, Redakteur, Prüfer, Designer) + eigene Rollen anlegbar
* **Granulare Rechte:** Module-, Inhalts-, Feld- und Aktionsebene
* **Rechte-Vererbung:** Über Organisationsebenen (Landkreis → Region → Gemeinde → Ortsteil)
* **Zugriffsbindung:** Inhalte/Module an Personen oder Rollen bindbar
* **Inhaltsbesitzer:** Klarer Besitzer bei mehreren Bearbeitern
* **Review-Workflow:** Änderungsanträge für Co-Editoren
* **Genehmigungsworkflow:** Vier-Augen-Prinzip für Rollen-/Rechteänderungen (optional)
* **Benachrichtigungen:** Bei wichtigen Rechteänderungen
* **Support-Features:** Temporäre Rollen-Übernahme für Support-Fälle (optional)

### Authentifizierung und Sicherheit

* **Zentraler Anmeldedienst:** Keycloak mit OIDC/SAML
* **Single-Sign-On:** Integration mit Kommunal-AD, BundID, Servicekonto
* **Zwei-Faktor-Authentifizierung (2FA):** TOTP, SMS, Push-Benachrichtigungen
* **Passkeys-Unterstützung:** WebAuthn für moderne Authentifizierung
* **Passwort-Richtlinien:** Mindestlänge 12 Zeichen, Rotation, Komplexitätsregeln
* **Self-Service:** Passwort-Reset und Fallback-Codes
* **Automatischer Logout:** Nach Inaktivität (konfigurierbar, z.B. 30 Min.)
* **Brute-Force-Schutz:** Account-Sperre nach x fehlgeschlagenen Versuchen
* **Sicherheits-Alerts:** Bei Login aus unbekannter Quelle, Rechteänderungen
* **SIEM-Anbindung:** Für Security-Monitoring (optional)
* **Inaktive Konten:** Automatische Sperrung nach Inaktivitätsperiode (optional)

### Benutzer-Accounts und Profile

* **Zugang:** Eigener Account pro Person mit Organisationszuordnung
* **Einheitlicher Login:** Für App und CMS (via Keycloak)
* **Profil-Selbstverwaltung:** Passwort, Kontaktdaten, Präferenzen
* **Nutzertypen:** Klare Trennung interne vs. externe Datenlieferanten
* **Onboarding:** Standardisierter Prozess (Einladung, Schulungsbestätigung)
* **Offboarding:** Automatisierte Deaktivierung (Rollen, Tokens, Zugänge entziehen)
* **Vertretungsrechte:** Temporär mit Ablaufdatum

### Organisation und Struktur

* **Mehrstufige Strukturen:** Landkreis → Region → Gemeinde → Ortsteil
* **Mehrfach-Zugehörigkeit:** Person kann in mehreren Organisationen tätig sein
* **Mandantenfähigkeit:** Row-Level Security mit delegierbarer Administration
* **Privacy-Optionen:** Namensnennung vs. Anonymität konfigurierbar
* **Beitrittsprinzip:** Einladung oder Bewerbung für Organisationen

### Datenschutz und Compliance

* **Audit Logging:** Unveränderliches Log aller sicherheitsrelevanten Aktionen
* **Audit-Export:** CSV/JSON-Export für Compliance-Berichte
* **DSGVO-Datenexport:** Alle personenbezogenen Daten eines Nutzers exportierbar
* **Erinnerungen:** Regelmäßige Überprüfungen (Accounts, Rechte, Inhalte)
* **Dokumentation:** Automatische Protokollierung aller Rechte-Änderungen

### Datenlöschkonzept (DSGVO-Compliance) **[MUSS]**

* **Löschanträge und Anfragen:**
  * Nutzer können Löschung ihres Accounts selbst initiieren (Self-Service)
  * Admin-Interface zur Verwaltung von Löschanträgen
  * Status-Workflow: Eingereicht → In Prüfung → Genehmigt → Gelöscht / Abgelehnt
  * Begründung bei Ablehnung (z.B. rechtliche Aufbewahrungspflicht)
  * E-Mail-Benachrichtigungen an Nutzer bei Status-Änderungen
* **Abhängigkeiten und Impact-Analyse:**
  * Vor Löschung: Übersicht aller betroffenen Daten (Beiträge, Kommentare, Medien)
  * Anzeige von Abhängigkeiten (z.B. Nutzer ist Autor von 50 Artikeln)
  * Warnhinweis bei kritischen Löschungen (z.B. einziger Admin einer Instanz)
  * Export der Nutzerdaten vor Löschung (Audit-Zwecke)
* **Automatisierte Lösch-Routinen:**
  * Geplante Löschung zu definiertem Zeitpunkt (z.B. 30 Tage nach Antrag)
  * Soft-Delete: Markierung als "gelöscht" mit Aufbewahrungsfrist (30-90 Tage)
  * Hard-Delete: Endgültige Entfernung aus Datenbank nach Aufbewahrungsfrist
  * Pseudonymisierung als Alternative (Nutzer wird anonymisiert, Inhalte bleiben)
  * Cronjob-basierte Verarbeitung mit Fehlerbehandlung
* **Aufbewahrungsfristen und Archivierung:**
  * Konfigurierbare Aufbewahrungsfristen pro Datentyp (gesetzlich, vertraglich)
  * Archivierung vor Löschung (Compliance-Archiv, schreibgeschützt)
  * Automatische Löschung nach Ablauf der Fristen
  * Audit-Log für alle Löschvorgänge (wer, wann, was gelöscht, Grund)
* **Anonymisierung und Pseudonymisierung:**
  * Anonymisierung: Vollständige Entfernung personenbezogener Daten
  * Pseudonymisierung: Ersatz durch Pseudonyme (z.B. "Nutzer123")
  * Inhalte bleiben erhalten, aber ohne Personenbezug
  * Reverse-Lookup verhindern (keine Rückverfolgung zum Nutzer)
* **DSGVO-Anfragen-Verwaltung:**
  * Zentrale Verwaltung aller DSGVO-Anfragen (Auskunft, Löschung, Berichtigung, Datenportabilität)
  * Status-Tracking mit Fristen (30 Tage DSGVO-Vorgabe)
  * Automatische Eskalation bei Fristüberschreitung
  * Vorlagen für Antworten auf DSGVO-Anfragen
  * Verzeichnis von Verarbeitungstätigkeiten (VVT) pflegen

### News-Modul (MVP)

* **Content-Erstellung:** Entwurf, Vorschau, Veröffentlichung
* **Workflow:** Redakteur → Prüfer → Veröffentlichung
* **Versionierung:** Basis-Versionierung (Wer, Wann, Was)

### Medienverwaltung

* **Zentrale Bibliothek:** Bilder, Dokumente, Videos, Audio
* **Upload & Optimierung:**
  - Automatische Generierung verschiedener Auflösungen (Thumbnail, Medium, Large, Original)
  - Komprimierung (WebP, AVIF, progressive JPEG)
  - Responsive Bildvarianten
* **Bildbearbeitung:**
  - Zuschneiden mit vordefinierten Seitenverhältnissen (16:9, 4:3, 1:1)
  - Drehen, Spiegeln
  - Filter (Helligkeit, Kontrast, Sättigung, Schärfe)
  - Fokuspunkt setzen für automatische Zuschnitte
  - Nicht-destruktiv (Original bleibt erhalten)
* **Metadaten:**
  - Titel, Beschreibung, Alt-Text (**Pflichtfeld** für Barrierefreiheit)
  - Copyright, Quelle, Lizenzinformationen
  - Tags und Kategorien
  - EXIF-/IPTC-Daten automatisch auslesen
* **Versionierung:** Änderungshistorie, frühere Versionen wiederherstellen
* **Verwendungsnachweis:** "Wo wird dieses Medium verwendet?", Warnung vor Löschen
* **Organisation:** Ordnerstruktur (verschachtelt), Berechtigungen pro Ordner, Favoritenliste
* **Bulk-Operationen:** Massenupload (Drag & Drop), Massen-Tagging, Metadaten-Bearbeitung
* **Externe Integration:** S3, Azure Blob Storage, Cloudinary (optional), CDN-Integration

### Dashboard

* **Meine Aufgaben:** Offene Freigaben, zugewiesene Inhalte
* **Quick-Actions:** Häufige Aufgaben mit einem Klick
* **Statistiken:** Eigene Aktivität (optional)
* **Widget-System:** Personalisierbar, rollenspezifisch (Basis)

### Basis-UI & Navigation

* **Navigation:** Hauptmenü, Breadcrumbs
* **Responsive Design:** Mobile-optimiert
* **Barrierefreiheit:** Tastaturbedienbarkeit, Screenreader-kompatibel, Fokus-Indikatoren
