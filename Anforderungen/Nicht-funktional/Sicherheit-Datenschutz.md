# Sicherheit und Datenschutz

Die Sicherheit und der Datenschutz sind zentrale Anforderungen für den Betrieb eines kommunalen CMS, das mit sensiblen Bürgerdaten arbeitet. Die Anforderungen orientieren sich an der IT-Sicherheits-Leitlinie, dem BSI-Grundschutz und der DSGVO.

---

## 1. Informationssicherheits-Management-System (ISMS)

Das CMS muss in ein umfassendes ISMS eingebettet werden, das Prozesse und Verantwortlichkeiten festlegt.

**Anforderungen:**
- Formelles ISMS nach ISO/IEC 27001 oder BSI-Standard 200-2
- Benennung eines Informationssicherheitsbeauftragten (ISB)
- Dokumentierte Sicherheitsleitlinie für das CMS
- Regelmäßige Sicherheitsaudits (mindestens jährlich)
- Risikomanagement-Prozess etabliert
- Sicherheitsvorfälle werden dokumentiert und analysiert
- Kontinuierliche Verbesserung der Informationssicherheit (PDCA-Zyklus)

**Messkriterium:**
- ISMS-Dokumentation vollständig und aktuell
- ISB benannt und geschult
- Jährliches Sicherheitsaudit durchgeführt
- Risikobewertung für alle kritischen Assets vorhanden

---

## 2. Schutzbedarfsklassifizierung

Sensible Daten und kritische Prozesse müssen identifiziert und ihr Schutzbedarf (Vertraulichkeit, Integrität, Verfügbarkeit) nach BSI-Grundschutz klassifiziert werden.

**Anforderungen:**
- Schutzbedarfsfeststellung für alle Informationen und Prozesse
- Klassifizierung nach BSI-Kategorien:
  - **Normal**: Geringe bis mittlere Auswirkungen bei Sicherheitsverletzung
  - **Hoch**: Erhebliche Auswirkungen (z.B. personenbezogene Daten)
  - **Sehr hoch**: Existenzbedrohende Auswirkungen (z.B. kritische Infrastruktur)
- Unterschiedliche Schutzmaßnahmen je nach Schutzbedarfsklasse
- Dokumentation der Schutzbedarfsfeststellung
- Regelmäßige Überprüfung und Aktualisierung

**Messkriterium:**
- Schutzbedarfsfeststellung dokumentiert für alle Datenarten
- Mindestens folgende Daten als "hoch" klassifiziert:
  - Personenbezogene Daten von Bürgern
  - Zugangsdaten (Passwörter, API-Keys)
  - Interne Verwaltungsdaten
- Entsprechende Schutzmaßnahmen implementiert

---

## 3. BSI IT-Grundschutz-Kataloge

Implementierung der BSI IT-Grundschutz-Kataloge zur Gewährleistung eines angemessenen Sicherheitsniveaus.

### 3.1 Technische Maßnahmen

**Sichere Konfiguration:**
- Härtung aller Systeme nach BSI-Empfehlungen (SiSyPHuS Win10, Linux-Härtung)
- Deaktivierung unnötiger Dienste und Ports
- Sichere Default-Einstellungen (Security by Default)
- Regelmäßige Überprüfung der Konfiguration (Configuration Management)
- Automatisierte Compliance-Checks (z.B. mit OpenSCAP)

**Verschlüsselte Kommunikation:**
- TLS 1.3 für alle externen Verbindungen (API, Web-Interface)
- Verschlüsselung im Transit: HTTPS Strict Transport Security (HSTS)
- Verschlüsselung at Rest: Datenbank-Verschlüsselung (Transparent Data Encryption)
- Verschlüsselung von Backups
- Ende-zu-Ende-Verschlüsselung für besonders sensible Daten
- Certificate Pinning für mobile Apps

**Zugriffskontrollen:**
- Mehrstufige Authentifizierung (Multi-Factor Authentication) für administrative Zugriffe
- Passwortrichtlinie nach BSI (mindestens 12 Zeichen, Komplexität, Ablauf nach 90 Tagen)
- Privileged Access Management (PAM) für Admin-Accounts
- Principle of Least Privilege: Minimale Rechte für alle Accounts
- Session-Management mit automatischem Timeout (30 Minuten Inaktivität)
- IP-Whitelisting für administrative Zugriffe (optional)
- Account-Lockout nach 5 fehlgeschlagenen Login-Versuchen

**Netzwerksicherheit:**
- Firewall-Regeln nach Whitelist-Prinzip
- Intrusion Detection/Prevention System (IDS/IPS)
- Web Application Firewall (WAF)
- DDoS-Protection
- Network Segmentation (DMZ für öffentliche Services)

**Logging und Monitoring:**
- Zentrale Protokollierung aller sicherheitsrelevanten Ereignisse
- SIEM-Integration (Security Information and Event Management)
- Log-Retention mindestens 6 Monate (besser 1 Jahr)
- Integritätsschutz der Logs (Write-Once-Read-Many)
- Automatische Alarmierung bei Sicherheitsvorfällen

**Schwachstellen-Management:**
- Regelmäßige Penetrationstests (mindestens jährlich)
- Vulnerability Scanning (wöchentlich)
- Zeitnahes Einspielen von Sicherheitsupdates (kritische Patches innerhalb 48h)
- Bug Bounty-Programm (optional)
- Security Advisories veröffentlichen

### 3.2 Organisatorische Maßnahmen

**Notfallmanagement:**
- Notfallplan für IT-Sicherheitsvorfälle
- Business Continuity Plan (BCP)
- Disaster Recovery Plan (DRP)
- Regelmäßige Tests der Notfallpläne (mindestens jährlich)
- Backup-Strategie: 3-2-1-Regel (3 Kopien, 2 Medien, 1 Off-Site)
- Recovery Time Objective (RTO) < 4 Stunden
- Recovery Point Objective (RPO) < 1 Stunde

**Awareness-Schulungen:**
- Verpflichtende Sicherheitsschulungen für alle Mitarbeiter (jährlich)
- Spezialschulungen für Administratoren und Entwickler
- Phishing-Simulationen
- Sicherheitsrichtlinien dokumentiert und zugänglich
- Meldewege für Sicherheitsvorfälle bekannt

**Change Management:**
- Dokumentierte Change-Prozesse
- Vier-Augen-Prinzip bei kritischen Änderungen
- Testing vor Produktiv-Deployment
- Rollback-Pläne für alle Changes

**Messkriterium:**
- Alle BSI IT-Grundschutz-Bausteine für Webanwendungen implementiert
- Penetrationstest erfolgreich bestanden (keine kritischen Findings)
- Verschlüsselung: TLS 1.3, AES-256 für Datenbank
- MFA für alle Admin-Accounts aktiviert
- Notfallübung jährlich durchgeführt und dokumentiert
- Sicherheitsschulungen zu 100% absolviert

---

## 4. Datenschutz durch Technik und Voreinstellungen (Privacy by Design/Default)

Das CMS muss standardmäßig so konfiguriert sein, dass es DSGVO-konform arbeitet.

### 4.1 Privacy by Design

**Datenminimierung:**
- Nur notwendige Daten werden erfasst
- Optionale Felder klar gekennzeichnet
- Automatische Anonymisierung von Analysedaten
- Pseudonymisierung wo möglich (z.B. User-IDs statt Namen in Logs)

**Zweckbindung:**
- Jede Datenverarbeitung hat einen dokumentierten Zweck
- Keine Weiterverarbeitung ohne neue Rechtsgrundlage
- Klare Trennung zwischen verschiedenen Verarbeitungszwecken

**Transparenz:**
- Datenschutzerklärung integriert und verständlich
- Privacy Dashboard für Nutzer: Welche Daten werden gespeichert?
- Einwilligungsverwaltung (Consent Management)
- Tracking-Optionen klar kommuniziert (Opt-In, nicht Opt-Out)

### 4.2 Privacy by Default

**Standard-Einstellungen:**
- Strengste Datenschutz-Einstellungen als Default
- Tracking standardmäßig deaktiviert (Cookie-Banner mit Opt-In)
- Keine Drittanbieter-Skripte ohne explizite Zustimmung
- Minimale Datenerhebung in Kontaktformularen
- Profile standardmäßig nicht öffentlich

**Messkriterium:**
- Privacy Impact Assessment (PIA) durchgeführt
- Datenschutzfolgenabschätzung (DSFA) für Hochrisiko-Verarbeitungen
- Datenschutzerklärung vollständig und aktuell
- Privacy Dashboard für Nutzer verfügbar
- Cookie-Banner mit Opt-In (DSGVO-konform)

---

## 5. Zugriffskontrolle und Berechtigungsmanagement

Feingranulares Rollen- und Rechtesystem zur Sicherstellung, dass nur autorisierte Nutzer auf personenbezogene Daten zugreifen können (Art. 32 DSGVO).

**Anforderungen:**

**Rollenbasierte Zugriffskontrolle (RBAC):**
- Vordefinierte Rollen (Admin, Redakteur, Moderator, Viewer)
- Granulare Berechtigungen pro Rolle
- Vererbung von Berechtigungen
- Rollenbasierte Content-Sichtbarkeit

**Attributbasierte Zugriffskontrolle (ABAC):**
- Zugriff basierend auf Nutzer-Attributen (Abteilung, Standort, Mandant)
- Dynamische Policies
- Context-aware Permissions (z.B. nur während Arbeitszeit)

**Audit-Trail:**
- Protokollierung aller Zugriffe auf personenbezogene Daten
- Wer hat wann auf welche Daten zugegriffen?
- Änderungshistorie für alle Datensätze
- Unveränderlichkeit der Audit-Logs

**Berechtigungsprüfung:**
- Automatische regelmäßige Überprüfung von Berechtigungen (Access Reviews)
- Benachrichtigung bei ungewöhnlichen Zugriffsmustern
- Entfernung inaktiver Accounts nach 90 Tagen

**Messkriterium:**
- RBAC mit mindestens 5 vordefinierten Rollen
- ABAC für mandantenfähige Umgebungen
- 100% der Zugriffe auf personenbezogene Daten werden geloggt
- Vierteljährliche Access Reviews durchgeführt
- Audit-Logs unveränderlich gespeichert

---

## 6. Verfahrensverzeichnis (Art. 30 DSGVO)

Die Verarbeitungsvorgänge müssen dokumentiert werden können.

**Anforderungen:**
- Automatische Generierung eines Verfahrensverzeichnisses
- Dokumentation für jede Verarbeitungstätigkeit:
  - Name und Kontaktdaten des Verantwortlichen
  - Zwecke der Verarbeitung
  - Kategorien betroffener Personen
  - Kategorien personenbezogener Daten
  - Kategorien von Empfängern
  - Drittlandtransfers (falls vorhanden)
  - Löschfristen
  - Technische und organisatorische Maßnahmen (TOM)
- Export-Funktion für Verfahrensverzeichnis (PDF, DOCX)
- Regelmäßige Aktualisierung (bei Änderungen)

**Messkriterium:**
- Verfahrensverzeichnis vollständig und aktuell
- Alle DSGVO-Pflichtangaben enthalten
- Export-Funktion verfügbar
- Jährliche Überprüfung und Aktualisierung

---

## 7. Löschkonzepte und Betroffenenrechte

Automatische Mechanismen zur Einhaltung von Löschfristen und zur Umsetzung von Betroffenenrechten (Art. 17 DSGVO).

### 7.1 Automatische Löschung

**Löschfristen:**
- Konfigurierbare Aufbewahrungsfristen pro Datenart
- Automatische Löschung nach Ablauf der Frist
- Warnung vor Löschung (30 Tage vorher)
- Protokollierung aller Löschvorgänge
- Anonymisierung statt Löschung wo möglich (für Statistiken)

**Löschkaskaden:**
- Abhängige Daten werden mitgelöscht (Cascade Delete)
- Backup-Löschung berücksichtigen (gilt auch für Backups!)
- Sichere Löschung (Überschreiben, nicht nur Markierung)

### 7.2 Betroffenenrechte

**Recht auf Auskunft (Art. 15 DSGVO):**
- Self-Service-Portal für Nutzer
- Automatische Generierung eines Datenexports (JSON, PDF)
- Auflistung aller gespeicherten Daten
- Auskunft über Empfänger und Verarbeitungszwecke

**Recht auf Löschung (Art. 17 DSGVO):**
- One-Click-Löschung des Accounts
- Vollständige Löschung aller personenbezogenen Daten
- Ausnahmen für gesetzliche Aufbewahrungspflichten
- Bestätigungsmail nach Löschung

**Recht auf Datenübertragbarkeit (Art. 20 DSGVO):**
- Export aller Daten in maschinenlesbarem Format (JSON, XML, CSV)
- Import in andere Systeme möglich
- API für automatisierte Datenübertragung

**Recht auf Berichtigung (Art. 16 DSGVO):**
- Nutzer können ihre Daten selbst korrigieren
- Admin-Funktion zur Korrektur von Nutzerdaten
- Änderungshistorie wird gespeichert

**Recht auf Widerspruch (Art. 21 DSGVO):**
- Opt-Out für Marketingzwecke
- Widerspruch gegen Profiling
- Deaktivierung von Tracking

**Messkriterium:**
- Automatische Löschung nach konfigurierbaren Fristen implementiert
- Self-Service-Portal für Betroffenenrechte verfügbar
- Datenexport in 3 Formaten (JSON, XML, CSV)
- Account-Löschung innerhalb 48 Stunden
- 100% der DSGVO-Betroffenenrechte implementiert
- Löschung von Backups innerhalb gesetzlicher Fristen

---

## 8. Zusammenfassung der Anforderungen

**ISMS:**
- Formelles ISMS nach ISO/IEC 27001 oder BSI-Standard 200-2
- ISB benannt, regelmäßige Audits

**Schutzbedarfsklassifizierung:**
- Alle Daten und Prozesse klassifiziert (normal, hoch, sehr hoch)
- Entsprechende Schutzmaßnahmen implementiert

**BSI IT-Grundschutz:**
- Technische Maßnahmen: Sichere Konfiguration, Verschlüsselung, Zugriffskontrollen, Logging
- Organisatorische Maßnahmen: Notfallmanagement, Awareness-Schulungen, Change Management

**Privacy by Design/Default:**
- Datenminimierung, Zweckbindung, Transparenz
- Strengste Datenschutz-Einstellungen als Default

**Zugriffskontrolle:**
- RBAC + ABAC
- Audit-Trail für alle Zugriffe auf personenbezogene Daten
- Regelmäßige Access Reviews

**Verfahrensverzeichnis:**
- Automatische Generierung gemäß Art. 30 DSGVO
- Export-Funktion, jährliche Aktualisierung

**Löschkonzepte:**
- Automatische Löschung nach konfigurierbaren Fristen
- Umsetzung aller DSGVO-Betroffenenrechte (Art. 15-21)
- Self-Service-Portal für Nutzer
