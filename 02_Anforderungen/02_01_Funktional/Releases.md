# App-Veröffentlichung / Releases

## 1. Zweck

Das Release-Management-Modul ermöglicht die automatisierte Erstellung und Veröffentlichung von App-Updates direkt aus dem CMS heraus. Ziel ist ein **"One-Click-Publishing"-Workflow**, bei dem Administratoren neue App-Versionen generieren, signieren und direkt bei Google Play und Apple App Store zur Überprüfung einreichen können, ohne externe Plattformen bedienen zu müssen.

---

## 2. Zielgruppen

- **App-Manager**: Personen, die für die Veröffentlichung und Aktualisierung der mobilen Apps verantwortlich sind
- **Content-Manager**: Mitarbeiter, die über den Status von Releases informiert sein müssen
- **Systemadministratoren**: Technisches Personal für die Einrichtung und Wartung der Build-Pipeline
- **Entwickler**: Für Troubleshooting und erweiterte Konfiguration

---

## 3. Funktionsumfang

### 3.1 Einmalige Einrichtung der Store-Credentials

**Anforderung REL-010: Store-Konto-Verknüpfung**
- Im CMS-Bereich "Publishing & Stores" können App-Manager ihre Developer-Konten hinterlegen
- Unterstützung für Google Play und Apple App Store
- Schritt-für-Schritt-Wizard für die Ersteinrichtung
- Validierung der Zugangsdaten bei der Eingabe

**Anforderung REL-020: Google Play Integration**
- Upload des Service Account JSON-Schlüssels mit Berechtigungen für die Google Play Console
- Validierung der Berechtigungen (Read/Write für Release Management)
- Auswahl der zu verwaltenden App (falls mehrere Apps im Konto vorhanden sind)
- Test-Verbindung zum Bestätigen der Funktionsfähigkeit

**Anforderung REL-030: Apple App Store Integration**
- Upload der App Store Connect API Keys (Issuer ID, Key ID, .p8-Datei)
- Keine Verwendung von 2FA-Passwörtern (nur API-Keys)
- Validierung der API-Berechtigungen
- Auswahl des zu verwaltenden App-Bundles
- Test-Verbindung zum Bestätigen der Funktionsfähigkeit

**Anforderung REL-040: Signierungsmaterial**
- Sichere Speicherung von Android Keystores (.jks/.keystore)
- Speicherung von iOS-Zertifikaten und Provisioning Profiles
- Verschlüsselte Ablage im Credentials Manager
- Passwortgeschützte Keystores mit sicherer Passwort-Verwaltung
- Ablaufdatum-Tracking für iOS-Zertifikate mit Warnmeldungen

**Anforderung REL-050: Credentials Manager**
- Alle sensiblen Zugangsdaten werden verschlüsselt gespeichert (AES-256)
- Zugriff nur für autorisierte Benutzer und Build-Server
- Audit-Log für alle Zugriffe auf Credentials
- Möglichkeit zum Widerrufen und Erneuern von API-Keys
- Automatische Rotation von Credentials bei Bedarf

### 3.2 Release-Vorbereitung

**Anforderung REL-100: Versionsverwaltung**
- Eingabe der neuen Versionsnummer (Major.Minor.Patch, z.B. 1.0.1)
- Automatische Vorschläge basierend auf der letzten Version
- Build-Nummer wird automatisch inkrementiert
- Unterstützung für Semantic Versioning
- Validierung: Versionsnummer muss höher sein als die aktuelle Store-Version

**Anforderung REL-110: Release Notes**
- WYSIWYG-Editor für "What's New"-Texte
- Mehrsprachige Release Notes für alle unterstützten App-Sprachen
- Zeichenzähler (Google Play: max. 500 Zeichen, Apple: keine Beschränkung)
- Vorlagen für häufige Update-Typen (Bugfixes, neue Features, Performance-Verbesserungen)
- Vorschau der Release Notes im Store-Layout
- Kopieren von Release Notes zwischen Sprachen

**Anforderung REL-120: Store-Metadaten**
- Upload neuer Screenshots (optional bei Updates)
- Aktualisierung der App-Beschreibung
- Änderung von Keywords (Apple App Store)
- Anpassung der Kategorien
- Feature Graphic und Promo-Video (Google Play)
- Vorschau aller Metadaten vor der Veröffentlichung

**Anforderung REL-130: Release-Tracks**
- Auswahl des Ziel-Tracks für Google Play:
  - Internal Testing
  - Closed Testing (Alpha)
  - Open Testing (Beta)
  - Production
- Auswahl der Release-Methode für Apple:
  - TestFlight (Internal/External Testing)
  - App Store (Production)
- Rollout-Strategie: Staged Rollout mit Prozentangabe (z.B. 10%, 50%, 100%)

**Anforderung REL-140: Feature-Flags und A/B-Tests**
- Konfiguration von Feature-Flags für das neue Release
- Festlegung von A/B-Test-Parametern
- Zielgruppen-Definition für schrittweises Rollout
- Rollback-Plan bei kritischen Fehlern

### 3.3 Build- und Upload-Prozess

**Anforderung REL-200: Build-Server-Integration**
- CI/CD-Pipeline basierend auf GitHub Actions, GitLab CI oder Jenkins
- Automatische Triggers bei "Build & Submit to Stores"-Klick
- Android-Build-Umgebung: Java SDK, Gradle, Kotlin/Java Compiler
- iOS-Build-Umgebung: macOS-Agent (Mac mini, MacStadium, Azure DevOps Mac Agents)
- Parallele Builds für Android und iOS zur Zeitersparnis

**Anforderung REL-210: Android-Build**
- Kompilierung des React Native-Codes zu nativer Android-App
- Generierung signierter .aab-Dateien (Android App Bundle)
- Verwendung des hinterlegten Keystores aus dem Credentials Manager
- ProGuard/R8-Obfuscation für Release-Builds
- Unterstützung für App Bundles mit Split APKs

**Anforderung REL-220: iOS-Build**
- Kompilierung des React Native-Codes zu nativer iOS-App
- Generierung signierter .ipa-Dateien
- Verwendung der hinterlegten Zertifikate und Provisioning Profiles
- Bitcode-Kompilierung (falls erforderlich)
- Unterstützung für Universal Builds (iPhone/iPad)

**Anforderung REL-230: Fastlane-Integration**
- Verwendung von Fastlane für Build-Automatisierung
- Fastlane Supply für Google Play Upload
- Fastlane Deliver für App Store Connect Upload
- Fastlane Match für iOS-Zertifikatsverwaltung (optional)
- Konfigurierbare Fastlane-Lanes für verschiedene Build-Typen

**Anforderung REL-240: Build-Artefakte**
- Sichere Speicherung der generierten .aab- und .ipa-Dateien
- Download-Möglichkeit für App-Manager
- Automatisches Löschen alter Build-Artefakte nach konfigurierbarer Zeit
- SBOM-Generierung (Software Bill of Materials) für Compliance

**Anforderung REL-250: Store-API-Upload**
- Google Play Developer API v3: Upload des .aab über API
- App Store Connect API: Upload des .ipa über Transporter oder altool
- Automatische Zuordnung zu Release-Track/TestFlight
- Hochladen der Release Notes in allen Sprachen
- Aktualisierung der Store-Metadaten (falls geändert)

**Anforderung REL-260: Fehlerbehandlung im Build-Prozess**
- Detaillierte Fehlerprotokolle bei Build-Fehlern
- Benachrichtigung des App-Managers bei Fehlschlag
- Automatische Retry-Logik bei temporären Netzwerkfehlern
- Rollback-Möglichkeit bei fehlgeschlagenen Builds
- Link zu Build-Logs für Debugging

### 3.4 Status-Monitoring und Einreichung

**Anforderung REL-300: Live-Status-Anzeige**
- Echtzeit-Updates zum Build-Fortschritt im CMS
- Status-Badges:
  - Build läuft (gelb, mit Fortschrittsbalken)
  - Build erfolgreich (grün)
  - Build fehlgeschlagen (rot, mit Fehlerprotokoll)
  - Upload läuft (blau)
  - Upload erfolgreich (grün)
  - Warten auf Store-Verarbeitung (orange)
  - Store-Überprüfung läuft (lila)
  - Live im Store (grün)
- Geschätzte Restzeit für Build und Upload

**Anforderung REL-310: Google Play Rollout**
- Automatischer Rollout nach erfolgreichem Upload
- Konfiguration der Rollout-Geschwindigkeit (z.B. 10% über 2 Tage, dann 50%, dann 100%)
- Möglichkeit zum manuellen Pausieren/Fortsetzen des Rollouts
- Anzeige der Rollout-Statistiken (Installationen, Abstürze, Bewertungen)
- Automatischer Rollback bei kritischen Fehlern (z.B. Absturzrate > 5%)

**Anforderung REL-320: Apple App Store Submission**
- Automatisches "Submit for Review" nach erfolgreicher Verarbeitung
- Beantwortung der App Store Review-Fragen (z.B. "Uses Encryption?")
- Upload von Review Notes für das Apple-Team (optional)
- Automatische Veröffentlichung nach Genehmigung oder manuelle Freigabe
- Phased Release-Option (stufenweise Veröffentlichung über 7 Tage)

**Anforderung REL-330: Benachrichtigungen**
- E-Mail-Benachrichtigung bei erfolgreichem Build
- E-Mail-Benachrichtigung bei fehlgeschlagenem Build
- Push-Benachrichtigung im CMS bei Statusänderungen
- Webhook-Integration für externe Monitoring-Tools (Slack, Teams, Discord)
- Tägliche Zusammenfassung der Release-Aktivitäten

**Anforderung REL-340: Store-Feedback-Integration**
- Anzeige von App Store Review-Status im CMS
- Benachrichtigung bei Ablehnung mit Ablehnungsgrund
- Anzeige von Benutzer-Bewertungen und Reviews
- Möglichkeit zur Beantwortung von Reviews direkt aus dem CMS
- Anzeige von Store-Optimierungs-Vorschlägen (ASO - App Store Optimization)

### 3.5 Benutzeroberfläche

**Anforderung REL-400: Publishing-Dashboard**
- Kachelansicht mit Übersicht aller Stores:
  - Store-Name (Google Play, Apple App Store)
  - Aktueller Status (Live, Wird geprüft, Fehler)
  - Live-Version im Store
  - Datum des letzten Builds
  - Nächste geplante Aktion
- Schnellzugriff auf "Update veröffentlichen" und "Status anzeigen"
- Farbcodierung nach Status (grün = live, orange = in Prüfung, rot = Fehler)

**Anforderung REL-410: Release-Workflow-Wizard**
- Geführter 5-Schritte-Workflow:
  1. Versionsnummer festlegen
  2. Release Notes eingeben (mehrsprachig)
  3. Metadaten überprüfen/aktualisieren (optional)
  4. Release-Track auswählen (Internal, Beta, Production)
  5. Zusammenfassung und Bestätigung
- Fortschrittsbalken mit aktueller Schrittnummer
- Zurück/Weiter-Navigation
- "Speichern als Entwurf" und "Build starten" am Ende

**Anforderung REL-420: Release-Historie**
- Tabellarische Übersicht aller bisherigen Releases:
  - Versionsnummer
  - Release-Datum
  - Store (Google Play, App Store)
  - Status (Live, Archiviert)
  - Download-Link für Build-Artefakte
  - Release Notes
- Filterung nach Store, Datum, Status
- Suchfunktion nach Versionsnummer
- Export als CSV/PDF

**Anforderung REL-430: Build-Logs**
- Detaillierte Ansicht der Build-Logs für jeden Release-Versuch
- Syntax-Highlighting für Fehlerprotokolle
- Download der vollständigen Logs
- Filterung nach Log-Level (Info, Warning, Error)
- Zeitstempel für jeden Log-Eintrag

**Anforderung REL-440: Store-Analytics-Integration**
- Einbettung von Google Play Console-Statistiken
- Einbettung von App Store Connect-Statistiken
- Anzeige von Installationen, Deinstallationen, aktiven Nutzern
- Absturzberichte und ANR-Raten
- Bewertungen und Reviews über Zeit

### 3.6 Sicherheit und Compliance

**Anforderung REL-500: Zugriffskontrolle**
- Rollbasierte Berechtigungen:
  - `releases.view`: Releases und Status anzeigen
  - `releases.create`: Neue Releases erstellen
  - `releases.publish`: Releases veröffentlichen
  - `releases.rollback`: Rollback durchführen
  - `releases.credentials`: Store-Credentials verwalten
- Zwei-Faktor-Authentifizierung (2FA) für kritische Aktionen
- Audit-Log für alle Release-Aktivitäten
- IP-Whitelisting für Build-Server

**Anforderung REL-510: Verschlüsselung**
- Alle Credentials verschlüsselt in der Datenbank (AES-256)
- TLS 1.3 für API-Kommunikation mit Stores
- Signierung aller Build-Artefakte
- Verschlüsselte Übertragung der .aab/.ipa-Dateien zum Store

**Anforderung REL-520: Compliance**
- DSGVO-konforme Speicherung von Build-Logs und Metadaten
- Automatisches Löschen alter Logs nach konfigurierbarer Retention-Zeit
- SBOM-Generierung für alle Releases (BSI TR-03185-2)
- Signierte Releases mit Nachvollziehbarkeit
- Versionskontrolle aller Release-Konfigurationen

**Anforderung REL-530: Notfall-Rollback**
- Schnelle Rollback-Funktion für fehlerhafte Releases
- Wiederherstellung der vorherigen Version mit einem Klick
- Automatischer Rollback bei kritischen Metriken (z.B. Absturzrate > 5%)
- Benachrichtigung aller Stakeholder bei Rollback
- Post-Mortem-Bericht für fehlerhafte Releases

### 3.7 Erweiterte Funktionen

**Anforderung REL-600: Staged Rollout**
- Schrittweise Veröffentlichung neuer Versionen
- Konfiguration der Rollout-Phasen (z.B. 10% → 25% → 50% → 100%)
- Automatisches Fortsetzen oder manueller Review-Schritt zwischen Phasen
- Monitoring von Metriken während jeder Phase
- Automatischer Stopp bei Überschreitung von Fehlerquoten

**Anforderung REL-610: Beta-Testing-Integration**
- Automatische Verteilung an TestFlight und Google Play Beta
- Verwaltung von Beta-Testern direkt im CMS
- Feedback-Sammlung von Beta-Testern
- Automatische Umfragen nach Beta-Nutzung
- Graduation von Beta zu Production nach erfolgreichem Test

**Anforderung REL-620: Multiple Build-Flavors**
- Unterstützung für verschiedene App-Varianten (z.B. Free, Premium, Enterprise)
- Separate Versionierung für jede Flavor
- Gemeinsame oder separate Release Notes
- Parallele Builds für alle Flavors

**Anforderung REL-630: Hotfix-Workflow**
- Beschleunigter Workflow für kritische Bugfixes
- Überspringen von optionalen Schritten (z.B. Metadaten-Update)
- Priorisierte Build-Queue
- Automatische Kennzeichnung als "Hotfix" im Store
- Express-Review-Anfrage bei Apple (falls verfügbar)

**Anforderung REL-640: Release-Planung**
- Kalenderansicht für geplante Releases
- Automatisches Scheduling von Releases zu bestimmten Zeiten
- Konfliktprüfung bei überlappenden Releases
- Erinnerungen vor geplantem Release
- Integration mit Sprint-Planung und Issue-Tracking

---

## 4. CMS-Konfiguration

**Anforderung REL-700: Build-Server-Konfiguration**
- Eingabe der Build-Server-URL (z.B. GitHub Actions, GitLab CI)
- API-Token für CI/CD-System
- Konfiguration der Build-Trigger-Webhooks
- Auswahl der Build-Agents (macOS für iOS, Linux für Android)
- Test-Build zur Validierung der Konfiguration

**Anforderung REL-710: Store-Konfiguration**
- Standardwerte für Release Notes (Vorlagen)
- Standard-Release-Track (z.B. immer erst Beta)
- Automatische Veröffentlichung nach Review oder manuelle Freigabe
- Rollout-Strategie (sofort 100% oder staged)
- Review-Fragen-Voreinstellungen (z.B. "Uses Encryption")

**Anforderung REL-720: Benachrichtigungs-Einstellungen**
- E-Mail-Empfänger für Release-Benachrichtigungen
- Webhook-URLs für externe Systeme (Slack, Teams)
- Benachrichtigungs-Trigger (Build-Start, Build-Erfolg, Build-Fehler, Review-Erfolg, Review-Ablehnung)
- Benachrichtigungs-Vorlagen anpassen

**Anforderung REL-730: Aufbewahrungsfristen**
- Konfiguration der Retention-Zeit für Build-Artefakte (z.B. 90 Tage)
- Retention-Zeit für Build-Logs (z.B. 180 Tage)
- Automatisches Archivieren alter Releases
- Compliance-konforme Löschung

---

## 5. Rollen und Rechte

| Rolle | View | Create Release | Publish | Rollback | Manage Credentials |
|-------|------|----------------|---------|----------|--------------------|
| App Manager | ✅ | ✅ | ✅ | ✅ | ✅ |
| Content Manager | ✅ | ❌ | ❌ | ❌ | ❌ |
| System Admin | ✅ | ✅ | ✅ | ✅ | ✅ |
| Developer | ✅ | ✅ | ❌ | ✅ | ❌ |
| Viewer | ✅ | ❌ | ❌ | ❌ | ❌ |

---

## 6. Workflow und Prozesse

### 6.1 Standard-Release-Workflow

1. **Vorbereitung**: App-Manager erstellt neuen Release-Entwurf
2. **Konfiguration**: Versionsnummer, Release Notes, Metadaten eingeben
3. **Build-Start**: Klick auf "Build & Submit"
4. **Build-Prozess**: Automatische Kompilierung für Android und iOS
5. **Signierung**: Automatische Signierung mit hinterlegten Credentials
6. **Upload**: Automatischer Upload zu Google Play und App Store Connect
7. **Review**: Einreichung zur Store-Überprüfung
8. **Monitoring**: Überwachung von Review-Status und Metriken
9. **Veröffentlichung**: Automatisch oder manuell nach erfolgreicher Überprüfung
10. **Rollout**: Staged Rollout gemäß Konfiguration

### 6.2 Hotfix-Workflow

1. **Hotfix-Initiierung**: Auswahl von "Hotfix erstellen"
2. **Minimale Konfiguration**: Nur Versionsnummer und kurze Release Notes
3. **Priorisierter Build**: Überspringen der Queue
4. **Schnell-Upload**: Direkt zu Production-Track
5. **Express-Review**: Anfrage bei Apple für beschleunigte Überprüfung
6. **Sofortige Veröffentlichung**: Kein Staged Rollout

### 6.3 Beta-Release-Workflow

1. **Beta-Initiierung**: Auswahl von "Beta-Release erstellen"
2. **Beta-Track-Auswahl**: Closed Testing oder Open Testing (Google) / TestFlight (Apple)
3. **Tester-Verwaltung**: Einladung von Beta-Testern
4. **Build und Upload**: Standard-Prozess zu Beta-Tracks
5. **Feedback-Sammlung**: Automatische Umfragen an Tester
6. **Graduation**: Bei Erfolg Veröffentlichung zu Production

---

## 7. Schnittstellen und Integrationen

**Anforderung REL-800: CI/CD-Systeme**
- GitHub Actions (YAML-Workflow-Integration)
- GitLab CI/CD (gitlab-ci.yml)
- Jenkins (Jenkinsfile)
- Azure DevOps Pipelines
- CircleCI
- Bitrise (spezialisiert auf Mobile)

**Anforderung REL-810: Store-APIs**
- Google Play Developer API v3 (REST)
- App Store Connect API (REST)
- Fastlane Supply (Android)
- Fastlane Deliver (iOS)

**Anforderung REL-820: Monitoring-Integrationen**
- Firebase Crashlytics (Absturzberichte)
- Sentry (Error Tracking)
- Google Analytics / Firebase Analytics
- App Store Connect Analytics
- Google Play Console Analytics

**Anforderung REL-830: Notification-Integrationen**
- Slack Webhooks
- Microsoft Teams Webhooks
- Discord Webhooks
- E-Mail (SMTP)
- Push-Benachrichtigungen (WebPush)

**Anforderung REL-840: Issue-Tracking-Integration**
- GitHub Issues
- GitLab Issues
- Jira
- Linear
- Automatische Verknüpfung von Commits zu Issues
- Automatisches Schließen von Issues bei Release

---

## 8. Nicht-funktionale Anforderungen

**Anforderung REL-900: Performance**
- Build-Zeit für Android: < 15 Minuten
- Build-Zeit für iOS: < 20 Minuten
- Upload-Zeit zu Stores: < 5 Minuten
- UI-Reaktionszeit: < 200ms für Statusaktualisierungen
- Parallele Builds: Mindestens 5 gleichzeitige Builds möglich

**Anforderung REL-910: Zuverlässigkeit**
- Build-Erfolgsquote: > 95%
- Automatische Retry-Logik bei temporären Fehlern (max. 3 Versuche)
- Failover für Build-Server bei Ausfall
- Regelmäßige Backups aller Credentials
- 99,5% Uptime für Release-Management-System

**Anforderung REL-920: Skalierbarkeit**
- Unterstützung für 100+ Apps gleichzeitig
- Parallele Builds für mehrere Apps
- Load-Balancing für Build-Server
- Horizontale Skalierung bei steigender Nutzung
- CDN für Build-Artefakte

**Anforderung REL-930: Wartbarkeit**
- Modularer Aufbau der CI/CD-Pipelines
- Wiederverwendbare Fastlane-Lanes
- Versionierte Pipeline-Konfigurationen
- Automatische Updates von Build-Tools
- Detaillierte Dokumentation aller Prozesse

**Anforderung REL-940: Benutzerfreundlichkeit**
- Intuitive Benutzeroberfläche ohne technisches Vorwissen erforderlich
- Geführte Workflows mit Erklärungen
- Tooltips und Inline-Hilfe
- Fehlerfreundliche Fehlermeldungen mit Lösungsvorschlägen
- Mobile-optimiertes UI für unterwegs

**Anforderung REL-950: Barrierefreiheit**
- WCAG 2.1 Level AA konform
- Screenreader-Unterstützung
- Tastaturnavigation
- Ausreichende Farbkontraste
- Alternative Texte für alle visuellen Elemente

---

## 9. Monitoring und Analytics

**Anforderung REL-1000: Build-Metriken**
- Dashboard mit Build-Statistiken:
  - Erfolgsquote
  - Durchschnittliche Build-Zeit
  - Fehlerhafte Builds mit Kategorisierung
  - Build-Queue-Länge
  - Build-Server-Auslastung
- Historische Trends über Zeit
- Vergleich zwischen Android und iOS

**Anforderung REL-1010: Release-Metriken**
- Anzahl Releases pro Monat/Woche
- Durchschnittliche Zeit von Build bis Store-Veröffentlichung
- Review-Zeiten (Google Play vs. Apple)
- Ablehnungsquote
- Rollback-Rate

**Anforderung REL-1020: Store-Performance**
- Installationen nach Release
- Deinstallationen nach Release
- Bewertungsveränderungen nach Release
- Absturzrate nach Release
- ANR-Rate (Android)
- App-Startzeit-Metriken

**Anforderung REL-1030: Alarmierung**
- Automatische Alerts bei:
  - Build-Fehler
  - Kritische Absturzrate (> 5%)
  - Store-Ablehnung
  - Rollback erforderlich
  - Zertifikat läuft ab (< 30 Tage)
- Eskalationsstufen bei nicht behobenen Problemen

---

## 10. Abhängigkeiten

**Technische Abhängigkeiten:**
- GitHub Actions, GitLab CI oder Jenkins (CI/CD-System)
- macOS Build-Agent für iOS-Builds (Mac mini, MacStadium, Azure DevOps Mac Agents)
- Linux Build-Agent für Android-Builds
- Fastlane (Build-Automatisierung)
- Google Play Developer Account mit API-Zugriff
- Apple Developer Account mit App Store Connect API-Zugriff
- Credentials Manager (verschlüsselte Speicherung)
- PostgreSQL/Supabase (Datenhaltung)
- Redis (Build-Queue)
- CDN für Build-Artefakte (optional)

**Externe Abhängigkeiten:**
- Google Play Developer API v3
- App Store Connect API
- Firebase (optional für Crashlytics)
- Sentry (optional für Error Tracking)

**Interne Abhängigkeiten:**
- Benutzer-Modul (Authentifizierung, Rollen)
- Benachrichtigungs-System (E-Mail, Push, Webhooks)
- App-Design-Modul (für Design-Änderungen, die Rebuild erfordern)
- Content-Management (für Release Notes)

---

## 11. Offene Punkte und Risiken

**Offene Punkte:**
- [ ] Auswahl des CI/CD-Systems (GitHub Actions vs. GitLab CI vs. Jenkins)
- [ ] Entscheidung über Self-Hosted vs. Cloud-Build-Server
- [ ] Definition der SLAs für Build-Zeiten
- [ ] Strategie für iOS-Zertifikatsverwaltung (Fastlane Match vs. manuell)
- [ ] Lizenzkosten für macOS Build-Agents
- [ ] Integration mit bestehendem Monitoring-Stack

**Risiken:**
- **Apple Review-Verzögerungen**: Apple-Reviews können 1-7 Tage dauern, keine Kontrolle über Geschwindigkeit
  - Mitigation: Klare Kommunikation mit App-Managern, Puffer einplanen
- **iOS-Zertifikate-Verwaltung**: Komplexe Verwaltung von Provisioning Profiles und Zertifikaten
  - Mitigation: Automatisierung über Fastlane Match, klare Dokumentation
- **Build-Fehler bei großen Updates**: Größere Code-Änderungen können zu Build-Fehlern führen
  - Mitigation: Pre-Build-Validierung, detaillierte Fehlerprotokolle
- **Store-Policy-Änderungen**: Google und Apple ändern regelmäßig ihre Richtlinien
  - Mitigation: Regelmäßiges Monitoring der Store-Richtlinien, flexible Anpassungsmöglichkeiten
- **Kosten für Build-Infrastruktur**: macOS-Agents sind teuer
  - Mitigation: Cloud-basierte Lösungen (MacStadium), Pay-per-Build-Modelle

---

## 12. Glossar

- **AAB**: Android App Bundle – Veröffentlichungsformat für Android-Apps
- **IPA**: iOS App Archive – Installationspaket für iOS-Apps
- **CI/CD**: Continuous Integration / Continuous Delivery – Automatisierte Build- und Deployment-Pipelines
- **Fastlane**: Open-Source-Tool zur Automatisierung von App-Builds und -Releases
- **Keystore**: Verschlüsselte Datei mit Android-Signierungszertifikaten
- **Provisioning Profile**: Datei, die iOS-Geräte für App-Installation autorisiert
- **Staged Rollout**: Schrittweise Veröffentlichung einer App-Version (z.B. 10% → 50% → 100%)
- **TestFlight**: Apple-Beta-Testing-Plattform für iOS-Apps
- **ANR**: Application Not Responding – Android-Fehler bei nicht reagierenden Apps
- **SBOM**: Software Bill of Materials – Liste aller Software-Komponenten und Abhängigkeiten
