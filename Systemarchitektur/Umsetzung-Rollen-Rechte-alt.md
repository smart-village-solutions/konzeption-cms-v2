# Architekturkonzept: Identity & Access Management (IAM)

## 1. Zielbild & Scope

### Ziel

Ein zentrales, mandantenfähiges Nutzer- und Rechtesystem für das Smart-Village-CMS, das:

- **Authentifizierung, SSO, 2FA, Passkeys** über Keycloak abwickelt
- **Alle fachlichen Anforderungen** (7 Personas, Organisationshierarchie, Rechtevererbung, Workflows, Audit, DSGVO) im CMS-IAM abbildet
- Eine **schnelle, zentrale Berechtigungsprüfung** liefert, die in jedem Modul genutzt werden kann (`isAllowed(user, action, resource, context)` in < 50 ms)

### Scope dieses Konzepts

**Im Scope:**
- Architektur & Komponenten-Zuschnitt
- Aufgabenteilung Keycloak ↔ CMS
- Datenhaltung & Schnittstellen
- Berechtigungsmodell (RBAC + ABAC + Vererbung)
- Workflows (Rollenänderung, Vertretungen, Impersonation, Change Requests)
- Performance-/Security-Aspekte auf Architektur-Ebene

**Nicht im Scope:**
- Detailliertes UI-Design
- Jede einzelne API-Request-Payload
- Implementierungsdetails spezifischer Module

### Welche Herausforderungen adressiert dieses System?

**1. Zugriffskontrolle und Sicherheit**
- Granulare Berechtigungsvergabe auf Modul-, Content-Type- und geografischer Ebene
- Schutz sensibler Daten durch rollenbasierte Zugriffskontrolle (RBAC) und attributbasierte Kontrolle (ABAC)
- Mandantenfähigkeit für Multi-Tenant-Umgebungen
- Compliance mit DSGVO und anderen Datenschutzanforderungen

**2. Organisatorische Strukturen**
- Abbildung von Landkreis → Gemeinde → Ortsteil sowie Unternehmen/Agenturen
- Hierarchische Organisations-Strukturen mit Rechtevererbung
- Mandantentrennung bei Shared-Infrastructure

**3. Rechtliche Compliance**
- Verwaltung rollenspezifischer Rechtstexte
- Versionierung von Nutzungsbedingungen und Datenschutzerklärungen
- Nachweispflichten für Akzeptanz von Rechtstexten
- Unveränderbare Audit-Logs

**4. 7-Personas-System**
- Dedizierte Rollen für verschiedene Anwendungsfälle
- Klare Verantwortlichkeiten und Zuständigkeiten
- Flexible Anpassung an kommunale Strukturen

### Welchen konkreten Nutzen bringt das System?

**Für System-Administratoren:**
- ✅ Zentrale Verwaltung aller Benutzerkonten über Keycloak
- ✅ Schnelle Rollenzuweisung über vordefinierte Templates
- ✅ Audit-Trail für alle Änderungen an Accounts und Berechtigungen
- ✅ Automatisierte Onboarding-/Offboarding-Prozesse

**Für Organisationen/Kommunen:**
- ✅ Strikte Trennung von Daten verschiedener Mandanten
- ✅ Flexible Anpassung an Organisationsstrukturen
- ✅ Rechtssichere Dokumentation von Zuständigkeiten
- ✅ Compliance mit Datenschutz und Informationssicherheit
- ✅ Transparenz über Zugriffsrechte

**Für CMS-Entwickler:**
- ✅ Einfache Integration via SDK/npm-Package
- ✅ Performante Permission-Checks (< 50 ms)
- ✅ Klare API-Schnittstellen
- ✅ Event-basierte Architektur für Erweiterungen

---

## Zielgruppen und Nutzer:innen

### Primäre Anwender:innen im CMS

**1. System-Administrator** (Persona 1)
- Vollständige Verwaltung aller Accounts
- Rollen- und Berechtigungsmanagement
- Organisations-Verwaltung
- Pflege von Rechtstexten
- System-Konfiguration

**2. App-/Feature-Manager** (Persona 2)
- Verwaltung von Accounts innerhalb eigener Organisation
- Zuweisung von Rollen (außer Super-Admin)
- Verwaltung von Teams und Gruppen
- Monitoring von Nutzeraktivitäten

**3. Moderator** (Persona 6)
- Verwaltung von Content-Creator-Accounts
- Überwachung von Benutzeraktivitäten
- Eskalation bei Verstößen

**4. Strategischer Entscheider** (Persona 7)
- Read-Only-Zugriff auf Nutzerstatistiken
- Reporting über Rollen-Verteilung
- Compliance-Berichte

### Endnutzer:innen (Selbstverwaltung)

**Alle CMS-Nutzer:**
- Profilverwaltung (Name, Email, Passwort)
- Sprach- und Zeitzoneneinstellungen
- Zwei-Faktor-Authentifizierung aktivieren
- Eigene Berechtigungen einsehen
- Akzeptanz von Rechtstexten

### Weitere Stakeholder

- **Datenschutzbeauftragte**: Audit-Logs, Löschkonzept, Rechtstexte
- **IT-Security-Team**: Berechtigungskonzepte, 2FA-Rollout
- **Rechtsabteilung**: Rechtstexte, Versionierung, Compliance
- **HR-Abteilung**: Onboarding/Offboarding-Prozesse

---

## Funktionsumfang

### Modul 1: Accounts (Benutzerverwaltung)

#### Basisablauf (Happy Path) - Account anlegen

**Schritt 1: Account erstellen**
1. System-Admin navigiert zu "Benutzer"
2. Klick auf "Neuer Benutzer"
3. Eingabe:
   - Vorname: "Max"
   - Nachname: "Mustermann"
   - Email: "max.mustermann@gemeinde.de"
   - Organisation: "Gemeinde Musterstadt" (Dropdown)
   - Rolle: "Redakteur" (Dropdown)
4. Optional: Telefon, Abteilung, Position
5. Speichern
6. System generiert initiales Passwort und sendet Einladungs-Email

**Schritt 2: Account aktivieren (durch Nutzer)**
1. Nutzer erhält Email mit Aktivierungslink
2. Klick auf Link → Passwort-Festlegung
3. Passwort-Anforderungen:
   - Mindestens 12 Zeichen
   - Groß-/Kleinbuchstaben, Zahlen, Sonderzeichen
4. Bestätigung → Account ist aktiv

**Schritt 3: Profil vervollständigen**
1. Nutzer loggt sich erstmalig ein
2. Profil-Wizard erscheint:
   - Profilbild hochladen (optional)
   - Telefon/Adresse ergänzen (optional)
   - Spracheinstellung (DE/EN)
   - Zeitzone
3. Akzeptanz von Rechtstexten (Pflicht)
4. Abschluss → Dashboard-Zugriff

#### Alternative Pfade und Sonderfälle

**Sonderfall 1: Bulk-Import von Accounts**
- **Scenario:** Onboarding vieler Nutzer auf einmal
- **Lösung:** CSV-Import mit Template
- **Format:**
  ```csv
  Vorname;Nachname;Email;Rolle;Organisation;Abteilung
  Max;Mustermann;max@gemeinde.de;editor;Gemeinde Musterstadt;Redaktion
  ```
- **Validierung:** Duplikat-Check, Email-Format, Rolle existiert
- **Resultat:** Erfolgsbericht + Fehlerprotokoll

**Sonderfall 2: Account deaktivieren (Offboarding)**
- **Trigger:** Mitarbeiter verlässt Organisation
- **Workflow:**
  1. Admin setzt Status auf "Inaktiv"
  2. Alle aktiven Sessions werden beendet
  3. Zugriff wird sofort entzogen
  4. Daten bleiben erhalten (DSGVO: Aufbewahrungspflicht)
  5. Optional: Reassignment von Content zu anderem User

**Sonderfall 3: Passwort-Reset**
- **Self-Service:**
  1. User klickt auf "Passwort vergessen"
  2. Email-Eingabe
  3. Reset-Link per Email (gültig 1 Stunde)
  4. Neues Passwort festlegen
- **Admin-Reset:**
  1. Admin wählt User aus
  2. "Passwort zurücksetzen"
  3. Temporäres Passwort wird generiert und per Email gesendet

**Sonderfall 4: Zwei-Faktor-Authentifizierung (2FA)**
- **Aktivierung:**
  1. User geht zu Account-Einstellungen
  2. "2FA aktivieren"
  3. QR-Code mit Authenticator-App scannen
  4. Bestätigungs-Code eingeben
- **Login mit 2FA:**
  1. Email + Passwort eingeben
  2. 6-stelligen Code von Authenticator-App eingeben
  3. Optional: "Dieses Gerät vertrauen" (30 Tage)

**Sonderfall 5: Account-Sperrung bei mehrfachen Login-Fehlversuchen**
- **Trigger:** 5 falsche Passwort-Eingaben innerhalb 15 Minuten
- **Aktion:** Account wird für 30 Minuten gesperrt
- **Benachrichtigung:** Email an User und Admin
- **Freigabe:** Automatisch nach 30 Min oder manuell durch Admin

#### Account-Verwaltung: Tab-Struktur

**Tab 1: Persönliche Daten**
- Vorname, Nachname
- Email (mit Verifikations-Status)
- Telefon
- Profilbild
- Adresse (Straße, PLZ, Ort, Land)
- Website (optional)
- Notizen (freitextfeld für Admins)

**Tab 2: Verwaltung**
- Status: Aktiv / Inaktiv / Ausstehend / Gesperrt
- Rolle: Dropdown (7 Personas)
- Organisation: Dropdown (aus Organisations-Modul)
- Abteilung / Position
- API-Keys (für System-Integrationen)
- Letzter Login
- Login-Versuche (Counter)
- Email-Verifikation: Ja/Nein
- 2FA aktiviert: Ja/Nein

**Tab 3: Berechtigungen**
- **Gruppen-Zuordnung**: Checkbox-Liste verfügbarer Gruppen
- **Content-Type-Permissions**:
  - Lesen / Schreiben / Löschen / Veröffentlichen / Exportieren
  - Pro Content-Type (News, Events, Locations, etc.)
- **Geografische Berechtigungen**:
  - Zugriff auf Regionen/Städte/Stadtteile
  - Hierarchische Auswahl
- **Spezifische Permissions**:
  - Modul-Zugriff (Design, Media, Module Management, etc.)
  - Konfiguration / Lesen / Schreiben / Löschen

**Tab 4: Verlauf / Activity Log**
- Zeitstempel
- Aktion (Login, Update, Passwort-Änderung, etc.)
- Durchgeführt von (User/Admin)
- Details (z.B. "Rolle geändert von Editor zu Moderator")
- IP-Adresse (anonymisiert nach 90 Tagen)

---

### Modul 2: Organisationen

#### Basisablauf (Happy Path) - Organisation anlegen

**Schritt 1: Organisation erstellen**
1. System-Admin navigiert zu "Organisationen"
2. Klick auf "Neue Organisation"
3. Eingabe:
   - Name: "Gemeinde Musterstadt"
   - Typ: "Gemeinde" (Dropdown: Gemeinde, Unternehmen, Agentur, Stadtwerk, Nonprofit)
   - Adresse: Straße, PLZ, Ort, Land
   - Kontakt: Email, Telefon, Website
   - Logo hochladen (optional)
4. Speichern

**Schritt 2: Mandanten-Konfiguration**
1. Mandanten-ID wird automatisch generiert (UUID)
2. Subdomain festlegen (optional): `musterstadt.smart-village-cms.de`
3. Backend-Verbindung:
   - Supabase (SOLL-System) ODER
   - GraphQL (IST-System)
4. Konfiguration testen
5. Aktivieren

**Schritt 3: Benutzer zuordnen**
1. Bestehende Accounts dieser Organisation zuweisen
2. Einladungen versenden für neue Nutzer
3. Erste Admin-Rolle zuweisen

#### Organisations-Hierarchie

**Struktur:**
```
Organisation (Root)
├── Name
├── Typ
├── Mandant-ID
├── Backend-Config
├── Mitglieder (Users)
│   ├── Admins
│   ├── Redakteure
│   └── Viewer
├── Sub-Organisationen (optional)
│   ├── Abteilungen
│   └── Teams
└── Settings
    ├── Branding (Logo, Farben)
    ├── Mandanten-Einstellungen
    └── API-Credentials
```

#### Organisations-Typen

**1. Gemeinde / Kommune**
- Mehrere Ämter/Abteilungen
- Geografische Zuständigkeiten
- Öffentliche Services

**2. Unternehmen**
- Corporate Branding
- Hierarchische Struktur
- Private Content

**3. Agentur**
- Client-Management
- White-Label-Fähigkeit
- Multi-Mandanten-Zugriff

**4. Stadtwerk**
- Utilities-Fokus
- Service-Bereitstellung
- Technische Schnittstellen

**5. Nonprofit / NGO**
- Community-Orientierung
- Transparenz-Anforderungen
- Spendenmanagement (optional)

#### Mandantentrennung

**Data Isolation:**
- Jede Organisation hat separate Datenbank-Partition
- Row-Level Security in Supabase
- Keine Cross-Tenant-Queries möglich

**Branding:**
- Organisation kann eigenes Logo hochladen
- Primärfarbe definieren
- Custom Domain (optional, Enterprise-Feature)

**Backend-Switch:**
- Organisation kann zwischen Supabase und GraphQL wechseln
- Migration-Tools für Datenübernahme
- Fallback-Mechanismus bei Verbindungsproblemen

---

### Modul 3: Rechtstexte

#### Basisablauf (Happy Path) - Rechtstext anlegen

**Schritt 1: Rechtstext erstellen**
1. Admin navigiert zu "Rechtstexte"
2. Klick auf "Neue Bestimmung"
3. Eingabe:
   - Titel: "Allgemeine Datenschutzerklärung"
   - Typ: Datenschutz / Nutzungsbedingungen / Impressum / Custom
   - Zugeordnete Rollen: "Alle" oder spezifische Rollen auswählen
   - Version: "2.1" (automatisch inkrementiert)
   - Status: Entwurf
4. Content-Editor:
   - Rich-Text-Editor (Markdown-Support)
   - Abschnitte/Überschriften
   - Verlinkungen zu anderen Rechtstexten
5. Speichern als Entwurf

**Schritt 2: Review und Freigabe**
1. Rechtsabteilung prüft Entwurf
2. Kommentare/Änderungen
3. Status auf "Aktiv" setzen
4. Datum der Aktivierung: Sofort oder geplant (z.B. 01.02.2025)

**Schritt 3: Nutzer-Akzeptanz**
1. Bei nächstem Login werden betroffene Nutzer informiert
2. Modal mit Rechtstext + Checkbox "Ich akzeptiere"
3. Ohne Akzeptanz kein Zugriff auf CMS
4. Akzeptanz wird geloggt (Timestamp, User-ID, Version)

#### Rechtstext-Typen

**1. Allgemeine Rechtstexte (Rolle: Alle)**
- Datenschutzerklärung
- Allgemeine Nutzungsbedingungen
- Impressum
- Cookie-Richtlinie

**2. Rollenspezifische Rechtstexte**
- Administrator-Verantwortlichkeiten (Rolle: System-Admin)
- Redaktionelle Richtlinien (Rolle: Redakteur, Moderator)
- Design-Lizenzvereinbarung (Rolle: Designer)
- Schnittstellen-Sicherheit (Rolle: Interface-Manager)
- Strategische Datennutzung (Rolle: Strategischer Entscheider)

**3. Modulspezifische Rechtstexte**
- Abfallkalender-Datenschutz
- Media-Verwaltung-Richtlinien
- Publishing-Workflows

#### Versionierung

**Versionsschema:** `Major.Minor[-Status]`

**Beispiele:**
- `1.0` - Erste produktive Version
- `1.1` - Minor Update (Ergänzungen)
- `2.0` - Major Update (Breaking Changes)
- `2.1-beta` - Beta-Version
- `3.0-draft` - Entwurf

**Versionsverlauf:**
- Alle Versionen werden archiviert
- Vergleichsansicht zwischen Versionen (Diff)
- Rollback auf frühere Version möglich
- Nutzer-Akzeptanzen pro Version gespeichert

#### Mehrsprachigkeit

**Pflicht-Sprachen:** Deutsch (DE), Englisch (EN)

**Optional:** Weitere Sprachen je nach Mandant

**Struktur:**
```typescript
interface LegalText {
  id: string
  title: {
    de: string
    en: string
  }
  content: {
    de: string  // Markdown
    en: string  // Markdown
  }
  roles: string[]
  status: 'active' | 'draft' | 'expired'
  version: string
  effectiveDate: Date
  expiryDate?: Date
}
```

---

### Modul 4: Rollen & Berechtigungen

#### Die 7 Personas

**Persona 1: System-Administrator**
- **Verantwortung:** Vollständige System-Verwaltung
- **Zugriff:** Alle Module, alle Funktionen
- **Typisch:** IT-Administrator der Kommune
- **Anzahl:** 1-2 pro Organisation

**Berechtigungen:**
- ✅ Benutzerverwaltung (Alle Rollen)
- ✅ Rollen- und Rechtevergabe
- ✅ Systemeinstellungen
- ✅ Backend-Konfiguration
- ✅ Audit-Logs
- ✅ API-Key-Management
- ✅ Alle Content-Operationen

---

**Persona 2: App-/Feature-Manager**
- **Verantwortung:** Feature-Releases, Module, App-Konfiguration
- **Zugriff:** Module, Design, App Stores, Content-Verwaltung
- **Typisch:** Digitalisierungsbeauftragter
- **Anzahl:** 2-5 pro Organisation

**Berechtigungen:**
- ✅ Module aktivieren/deaktivieren
- ✅ App-Store-Einstellungen
- ✅ Design-Konfiguration
- ✅ Content-Verwaltung (mit Freigabe)
- ✅ Benutzer-Verwaltung (nur eigene Org, ohne Admin-Rolle)
- ❌ Systemeinstellungen
- ❌ Backend-Konfiguration

---

**Persona 3: Designer:in**
- **Verantwortung:** UI/UX-Design, Branding, Medien
- **Zugriff:** Design-Modul, Medien, Farben, Icons
- **Typisch:** Grafikdesigner, UI-Designer
- **Anzahl:** 1-3 pro Organisation

**Berechtigungen:**
- ✅ Design-System (Farben, Typografie, Icons)
- ✅ App Icon, Splash Screen
- ✅ Medien-Verwaltung (Upload, Bearbeitung)
- ✅ Vorschau-Modus
- ❌ Content-Veröffentlichung
- ❌ Module-Management
- ❌ Benutzerverwaltung

---

**Persona 4: Redakteur:in**
- **Verantwortung:** Content-Erstellung und -Pflege
- **Zugriff:** Content-Module, Medien
- **Typisch:** Pressesprecher, Marketing-Mitarbeiter
- **Anzahl:** 5-20 pro Organisation

**Berechtigungen:**
- ✅ Content erstellen/bearbeiten
- ✅ Medien hochladen
- ✅ Entwürfe speichern
- ✅ Zur Freigabe einreichen
- ❌ Content veröffentlichen (benötigt Freigabe)
- ❌ Design ändern
- ❌ Module konfigurieren

---

**Persona 5: Schnittstellen-Manager**
- **Verantwortung:** API-Integrationen, Webhooks, Datenimporte
- **Zugriff:** Schnittstellen-Modul, Datentools
- **Typisch:** Entwickler, IT-Systemadministrator
- **Anzahl:** 1-3 pro Organisation

**Berechtigungen:**
- ✅ API-Konfiguration
- ✅ Webhooks verwalten
- ✅ CSV-Importe/Exporte
- ✅ GraphQL-Explorer
- ✅ OAuth-Einstellungen
- ❌ Content-Verwaltung
- ❌ Benutzerverwaltung

---

**Persona 6: Moderator**
- **Verantwortung:** Content-Review, Community-Management
- **Zugriff:** Content-Review, Benutzer-Aktivitäten
- **Typisch:** Community-Manager
- **Anzahl:** 2-5 pro Organisation

**Berechtigungen:**
- ✅ Content-Freigabe
- ✅ Content-Ablehnung mit Begründung
- ✅ User-Aktivitäten einsehen
- ✅ Kommentare moderieren
- ❌ Content selbst erstellen
- ❌ Systemeinstellungen
- ❌ Design ändern

---

**Persona 7: Strategische:r Entscheider:in**
- **Verantwortung:** Reporting, Dashboards, KPIs
- **Zugriff:** Dashboard, Analytics, Reports (Read-Only)
- **Typisch:** Bürgermeister, Abteilungsleiter
- **Anzahl:** 1-3 pro Organisation

**Berechtigungen:**
- ✅ Dashboard ansehen
- ✅ Reports exportieren
- ✅ KPIs einsehen
- ❌ Content bearbeiten
- ❌ Einstellungen ändern
- ❌ Benutzerverwaltung

---

#### Berechtigungsmatrix

| Modul | System-Admin | App-Manager | Designer | Redakteur | Interface-Mgr | Moderator | Strategisch |
|-------|-------------|-------------|----------|-----------|---------------|-----------|-------------|
| **Content** |  |  |  |  |  |  |  |
| Lesen | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| Erstellen | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Bearbeiten | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Veröffentlichen | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Löschen | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Medien** |  |  |  |  |  |  |  |
| Lesen | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| Hochladen | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Bearbeiten | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Löschen | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Benutzer** |  |  |  |  |  |  |  |
| Lesen | ✅ | ⚠️ (Org) | ❌ | ❌ | ❌ | ⚠️ (Log) | ❌ |
| Erstellen | ✅ | ⚠️ (Org) | ❌ | ❌ | ❌ | ❌ | ❌ |
| Bearbeiten | ✅ | ⚠️ (Org) | ❌ | ❌ | ❌ | ❌ | ❌ |
| Löschen | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Module** |  |  |  |  |  |  |  |
| Lesen | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Aktivieren | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Konfigurieren | ✅ | ✅ | ❌ | ❌ | ⚠️ (API) | ❌ | ❌ |
| **Design** |  |  |  |  |  |  |  |
| Lesen | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Bearbeiten | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Veröffentlichen | ✅ | ✅ | ⚠️ (Review) | ❌ | ❌ | ❌ | ❌ |
| **Schnittstellen** |  |  |  |  |  |  |  |
| Lesen | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Konfigurieren | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| API-Keys | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| **Einstellungen** |  |  |  |  |  |  |  |
| Lesen | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ✅ |
| Bearbeiten | ✅ | ⚠️ (Teil) | ❌ | ❌ | ⚠️ (API) | ❌ | ❌ |

**Legende:**
- ✅ Voller Zugriff
- ❌ Kein Zugriff
- ⚠️ Eingeschränkter Zugriff (Details in Klammern)

---

## Inhalte und Daten

### Datenstruktur

#### 1. Accounts (Benutzerkonten)

**Tabelle: `accounts`**

```typescript
interface Account {
  // Identifikation
  id: string                    // UUID, Primary Key
  email: string                 // UNIQUE, NOT NULL

  // Persönliche Daten
  firstName: string             // NOT NULL
  lastName: string              // NOT NULL
  phone?: string
  avatar?: string               // URL zu Avatar-Bild

  // Adresse (optional)
  address?: {
    street: string
    city: string
    postalCode: string
    country: string
  }

  website?: string

  // Organisationszugehörigkeit
  organizationId: string        // FK → organizations, NOT NULL
  position?: string             // z.B. "Pressesprecher"
  department?: string           // z.B. "Marketing"

  // Authentifizierung
  passwordHash: string          // NOT NULL (bcrypt)
  passwordResetToken?: string
  passwordResetExpiry?: Date

  // Status und Rolle
  status: 'active' | 'inactive' | 'pending' | 'suspended'
  role: UserRole                // Enum (7 Personas)

  // Security
  loginAttempts: number         // Default: 0, Max: 5
  lockedUntil?: Date
  isEmailVerified: boolean      // Default: false
  emailVerificationToken?: string
  isTwoFactorEnabled: boolean   // Default: false
  twoFactorSecret?: string      // Encrypted

  // Berechtigungen
  groupIds: string[]            // Array FK → groups
  specificPermissions?: {
    [contentType: string]: {
      read: boolean
      create: boolean
      edit: boolean
      delete: boolean
      publish: boolean
      export: boolean
    }
  }
  geographicPermissions?: {
    regions: string[]           // Array FK → regions
    cities: string[]            // Array FK → cities
  }

  // Präferenzen
  preferredLanguage: 'de' | 'en'
  timezone: string              // z.B. "Europe/Berlin"
  theme: 'light' | 'dark' | 'auto'

  // Notizen (nur für Admins sichtbar)
  notes?: string

  // Timestamps
  lastLogin?: Date
  createdAt: Date               // Default: NOW()
  updatedAt: Date               // Default: NOW()
  createdBy?: string            // FK → accounts (Admin)
  updatedBy?: string            // FK → accounts
}

type UserRole =
  | 'system_admin'
  | 'app_manager'
  | 'designer'
  | 'editor'
  | 'interface_manager'
  | 'moderator'
  | 'strategic_decision_maker'
```

**Indizes:**
- PRIMARY KEY: `id`
- UNIQUE: `email`
- INDEX: `organizationId`
- INDEX: `role`
- INDEX: `status`
- INDEX: `lastLogin`

**Constraints:**
- `email` UNIQUE, NOT NULL
- `organizationId` FOREIGN KEY → `organizations.id`
- `loginAttempts` >= 0 AND <= 10
- `status` IN ('active', 'inactive', 'pending', 'suspended')

---

#### 2. Organisationen

**Tabelle: `organizations`**

```typescript
interface Organization {
  // Identifikation
  id: string                    // UUID, Primary Key
  name: string                  // NOT NULL, UNIQUE
  slug: string                  // URL-friendly name (z.B. "gemeinde-musterstadt")

  // Typ
  type: OrganizationType

  // Kontaktinformationen
  address: {
    street: string
    city: string
    postalCode: string
    country: string
  }
  email: string
  phone?: string
  website?: string

  // Branding
  logo?: string                 // URL zu Logo-Bild
  primaryColor?: string         // Hex-Code (z.B. "#4ebc41")

  // Mandanten-Konfiguration
  tenantId: string              // UNIQUE, für Mandantentrennung
  subdomain?: string            // z.B. "musterstadt" → musterstadt.cms.de
  customDomain?: string         // z.B. "cms.gemeinde-musterstadt.de"

  // Backend-Konfiguration
  backendType: 'supabase' | 'graphql'
  backendConfig: {
    supabase?: {
      projectId: string
      apiUrl: string
      anonKey: string           // Public Anon Key
    }
    graphql?: {
      endpoint: string
      authEndpoint: string
      credentials: {
        clientId: string
        clientSecret: string    // Encrypted
        grantType: string
      }
    }
  }

  // Hierarchie (optional für Sub-Organisationen)
  parentOrganizationId?: string // FK → organizations (Self-Reference)

  // Status
  status: 'active' | 'suspended' | 'trial'
  trialExpiresAt?: Date

  // Statistiken
  userCount: number             // Denormalisiert
  contentCount: number          // Denormalisiert

  // Timestamps
  createdAt: Date
  updatedAt: Date
  createdBy?: string            // FK → accounts
}

type OrganizationType =
  | 'municipality'        // Gemeinde
  | 'company'             // Unternehmen
  | 'agency'              // Agentur
  | 'utility'             // Stadtwerk
  | 'nonprofit'           // Nonprofit/NGO
```

**Indizes:**
- PRIMARY KEY: `id`
- UNIQUE: `name`
- UNIQUE: `tenantId`
- UNIQUE: `subdomain` (wenn gesetzt)
- INDEX: `type`
- INDEX: `status`

---

#### 3. Gruppen (für Berechtigungsverwaltung)

**Tabelle: `groups`**

```typescript
interface Group {
  id: string                    // UUID, Primary Key
  name: string                  // NOT NULL
  description: string
  organizationId: string        // FK → organizations

  // Basis-Berechtigungen (vererbt an alle Gruppen-Mitglieder)
  permissions: {
    [module: string]: {
      read: boolean
      create: boolean
      edit: boolean
      delete: boolean
      configure: boolean
    }
  }

  // Visualisierung
  color: string                 // Hex-Code für Badge
  icon?: string                 // Icon-Name (lucide-react)

  // Meta
  memberCount: number           // Denormalisiert
  isSystem: boolean             // System-Gruppen können nicht gelöscht werden

  // Timestamps
  createdAt: Date
  updatedAt: Date
  createdBy: string             // FK → accounts
}
```

**Beispiel-Gruppen:**
- "Redaktionsteam" (Editor-Rechte für News, Events)
- "Design-Team" (Zugriff auf Design-Module)
- "API-Integration-Team" (Schnittstellen-Verwaltung)

---

#### 4. Rechtstexte

**Tabelle: `legal_texts`**

```typescript
interface LegalText {
  id: string                    // UUID, Primary Key

  // Identifikation
  title: {
    de: string
    en: string
  }
  slug: string                  // URL-friendly (z.B. "datenschutz")

  // Typ
  type: LegalTextType

  // Content (Markdown)
  content: {
    de: string                  // Markdown-Content
    en: string                  // Markdown-Content
  }

  // Zuordnung
  roles: string[]               // ['all'] oder spezifische Rollen
  organizationId?: string       // Optional: Organisation-spezifisch

  // Versionierung
  version: string               // z.B. "2.1", "1.0-draft"
  previousVersionId?: string    // FK → legal_texts (Self-Reference)
  changelog?: string            // Was hat sich geändert?

  // Status und Gültigkeit
  status: 'active' | 'draft' | 'expired'
  effectiveDate: Date           // Ab wann gültig
  expiryDate?: Date             // Optional: Ablaufdatum

  // Metadaten
  author: string                // FK → accounts
  reviewedBy?: string           // FK → accounts (Rechtsabteilung)
  category: string              // z.B. "Datenschutz", "Compliance"
  tags: string[]                // z.B. ["DSGVO", "Cookie"]

  // Timestamps
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
}

type LegalTextType =
  | 'privacy_policy'            // Datenschutzerklärung
  | 'terms_of_service'          // Nutzungsbedingungen
  | 'imprint'                   // Impressum
  | 'cookie_policy'             // Cookie-Richtlinie
  | 'role_specific'             // Rollenspezifisch
  | 'custom'                    // Benutzerdefiniert
```

---

#### 5. Rechtstext-Akzeptanzen

**Tabelle: `legal_text_acceptances`**

```typescript
interface LegalTextAcceptance {
  id: string                    // UUID, Primary Key
  accountId: string             // FK → accounts, NOT NULL
  legalTextId: string           // FK → legal_texts, NOT NULL
  version: string               // Version zum Zeitpunkt der Akzeptanz

  // Akzeptanz-Details
  acceptedAt: Date              // NOT NULL
  ipAddress: string             // Anonymisiert nach 90 Tagen
  userAgent: string             // Browser-Info

  // Optional: Widerruf
  revokedAt?: Date
  revokedReason?: string
}
```

**Constraints:**
- UNIQUE(accountId, legalTextId, version)
- FOREIGN KEY: `accountId` → `accounts.id` ON DELETE CASCADE
- FOREIGN KEY: `legalTextId` → `legal_texts.id`

---

#### 6. Activity Logs (Audit Trail)

**Tabelle: `activity_logs`**

```typescript
interface ActivityLog {
  id: string                    // UUID, Primary Key

  // Aktion
  timestamp: Date               // NOT NULL, Index
  action: ActivityAction
  entityType: string            // z.B. "account", "organization", "legal_text"
  entityId: string              // ID des betroffenen Objekts

  // Wer hat was gemacht?
  actorId: string               // FK → accounts (Wer?)
  actorRole: string             // Rolle zum Zeitpunkt der Aktion
  targetId?: string             // FK → accounts (An wem? optional)

  // Details
  changes?: {
    before: Record<string, any>
    after: Record<string, any>
  }
  description: string           // Freitext-Beschreibung

  // Kontext
  organizationId: string        // FK → organizations
  ipAddress: string             // Anonymisiert nach 90 Tagen
  userAgent?: string

  // Kategorisierung
  severity: 'info' | 'warning' | 'critical'
  category: string              // z.B. "authentication", "authorization", "data_change"
}

type ActivityAction =
  | 'login'
  | 'logout'
  | 'login_failed'
  | 'password_reset'
  | 'account_created'
  | 'account_updated'
  | 'account_deleted'
  | 'account_locked'
  | 'role_changed'
  | 'permission_granted'
  | 'permission_revoked'
  | 'legal_text_accepted'
  | 'legal_text_published'
  | 'organization_created'
  | 'organization_updated'
  | 'two_factor_enabled'
  | 'two_factor_disabled'
```

**Retention Policy:**
- Logs werden nach **1 Jahr** archiviert
- IP-Adressen werden nach **90 Tagen** anonymisiert
- Kritische Logs (Security) werden **3 Jahre** aufbewahrt

---

### Datenquellen, Import- oder Migrationsbedarf

#### CSV-Import für Accounts

**Template:**
```csv
Vorname;Nachname;Email;Rolle;Organisation;Abteilung;Status;Sprache
Max;Mustermann;max.mustermann@gemeinde.de;editor;Gemeinde Musterstadt;Redaktion;active;de
Anna;Schmidt;anna.schmidt@gemeinde.de;app_manager;Gemeinde Musterstadt;IT;active;de
```

**Validierung:**
- Email-Format prüfen (RFC 5322)
- Email-Duplikat-Check
- Rolle existiert (Enum-Validierung)
- Organisation existiert (FK-Constraint)
- Status ist valide

**Import-Workflow:**
1. CSV hochladen
2. Vorschau mit Validierung
3. Fehler beheben
4. Import starten
5. Erfolgsbericht + Einladungs-Emails versenden

#### Migration von Legacy-Systemen

**Szenarien:**

**1. Migration von altem CMS**
- Export User-Daten als SQL/CSV
- Mapping auf neue Rollenstruktur
- Import mit Passwort-Reset-Trigger

**2. LDAP/Active Directory Integration**
- LDAP-Connector für Synchronisation
- Automatische Account-Erstellung bei First-Login
- Rollen-Mapping über Gruppen-Mitgliedschaft

**3. OAuth2/SAML Single Sign-On**
- SSO-Provider-Konfiguration
- Just-in-Time User Provisioning
- Role-Mapping über SAML-Attributes

---

### Regeln für Mehrsprachigkeit, Versionierung und Archivierung

#### Mehrsprachigkeit

**Übersetzte Elemente:**

**UI (Pflicht: DE + EN):**
- Alle Labels, Buttons, Fehlermeldungen
- Tooltips und Hilfetexte
- E-Mail-Templates
- Notifications

**Rechtstexte (Pflicht: DE + EN):**
- Titel
- Content (Markdown)
- Changelog-Einträge

**Rollen-Namen:**
- System-Administrator → System Administrator
- Redakteur:in → Editor
- Schnittstellen-Manager → Interface Manager

**Nicht übersetzt (Benutzereingaben):**
- Account-Namen (Vorname, Nachname)
- Organisations-Namen
- Notizen
- Custom Permissions

#### Versionierung

**Accounts:**
- Keine automatische Versionierung
- Activity Log erfasst alle Änderungen
- Optional: Snapshot vor kritischen Änderungen

**Rechtstexte:**
- Vollständige Versionierung (alle Versionen archiviert)
- Versionsschema: `Major.Minor[-Status]`
- Changelog bei jeder Version
- Verknüpfung: `previousVersionId` für Verlauf

**Organisationen:**
- Config-Changes werden geloggt
- Kein Full-Version-System

#### Archivierung

**Accounts:**
- **Deaktivierung** statt Löschung (DSGVO-konform)
- Status: `inactive`
- Daten bleiben erhalten (Audit-Trail-Pflicht)
- Nach 3 Jahren ohne Login: Archivierungs-Warning
- Nach 5 Jahren: Anonymisierung (nur bei expliziter Freigabe)

**Organisationen:**
- Trial-Accounts: Löschung nach 90 Tagen Inaktivität
- Bezahlte Accounts: Keine automatische Löschung
- Archivierung bei Kündigung: 1 Jahr Datenaufbewahrung

**Rechtstexte:**
- Abgelaufene Versionen bleiben verfügbar (Read-Only)
- Status: `expired`
- Löschung nur durch Admin (mit Warnung)

**Activity Logs:**
- Aufbewahrung: 1 Jahr (Standard), 3 Jahre (Security)
- Automatische Archivierung in Cold Storage
- Anonymisierung von IP-Adressen nach 90 Tagen

---

## Konfiguration im CMS

### Einstellungen, die Administrator:innen vornehmen können

#### 1. System-Einstellungen (nur System-Admin)

**Account-Richtlinien:**
- Passwort-Anforderungen (Länge, Komplexität)
- Passwort-Ablauf (z.B. 90 Tage)
- Login-Versuche vor Sperrung (Default: 5)
- Sperr-Dauer (Default: 30 Minuten)
- Session-Timeout (Default: 8 Stunden)
- Automatischer Logout bei Inaktivität

**2FA-Richtlinien:**
- 2FA optional oder verpflichtend (pro Rolle)
- System-Admins: 2FA Pflicht
- Andere Rollen: Optional
- Trusted Devices: Gültigkeit (Default: 30 Tage)

**Email-Einstellungen:**
- SMTP-Server-Konfiguration
- Absender-Email
- Email-Templates (Einladung, Passwort-Reset, etc.)
- Sprache der E-Mails (Auto-Detect oder Fallback)

#### 2. Organisations-Einstellungen (System-Admin + App-Manager)

**Mandanten-Config:**
- Backend-Typ wählen (Supabase / GraphQL)
- Credentials eingeben
- Connection-Test durchführen

**Branding:**
- Logo hochladen (max. 2 MB, PNG/SVG)
- Primärfarbe festlegen (mit Vorschau)
- Subdomain definieren (nur einmalig, dann readonly)

**Benutzer-Management:**
- Selbstregistrierung erlauben (Ja/Nein)
- Standard-Rolle für neue Nutzer
- Freigabe-Workflow für neue Accounts

#### 3. Rechtstext-Verwaltung (System-Admin + Rechtsabteilung)

**Publishing-Workflow:**
- Entwurf erstellen
- Review-Prozess (optional)
- Freigabe durch Rechtsabteilung
- Publikation (sofort oder geplant)

**Akzeptanz-Erzwingung:**
- Bei welchen Rechtstexten Akzeptanz erforderlich?
- Häufigkeit (bei jedem Login, nur bei neuer Version)
- Grace Period (Nutzer hat X Tage Zeit zur Akzeptanz)

#### 4. Benachrichtigungen

**Account-Events:**
- Neuer Account erstellt → Email an Admin
- Account gesperrt → Email an User + Admin
- Passwort geändert → Email an User
- 2FA aktiviert → Email an User

**Rechtstext-Events:**
- Neue Version veröffentlicht → Email an betroffene Nutzer
- Rechtstext läuft ab → Warnung an Rechtsabteilung

---

### Rollen- und Rechtekonzept für diese Module

#### Zugriffsmatrix: Account-Verwaltung

| Funktion | System-Admin | App-Manager | Andere Rollen |
|----------|-------------|-------------|---------------|
| **Accounts anzeigen** |  |  |  |
| Alle Accounts | ✅ | ⚠️ Eigene Org | ❌ |
| Eigener Account | ✅ | ✅ | ✅ |
| **Accounts erstellen** |  |  |  |
| Mit beliebiger Rolle | ✅ | ❌ | ❌ |
| Mit Rolle < Admin | ✅ | ✅ (nur eigene Org) | ❌ |
| **Accounts bearbeiten** |  |  |  |
| Alle Felder | ✅ | ⚠️ Eigene Org | ❌ |
| Eigenes Profil | ✅ | ✅ | ✅ |
| Rolle ändern | ✅ | ⚠️ Keine Admins | ❌ |
| Status ändern | ✅ | ⚠️ Eigene Org | ❌ |
| **Accounts löschen** |  |  |  |
| Beliebige Accounts | ✅ | ❌ | ❌ |
| Eigener Account | ⚠️ Mit Bestätigung | ⚠️ Mit Bestätigung | ⚠️ Mit Bestätigung |
| **Berechtigungen** |  |  |  |
| Rollen zuweisen | ✅ | ⚠️ Keine Admins | ❌ |
| Gruppen zuweisen | ✅ | ✅ (eigene Org) | ❌ |
| Spez. Permissions | ✅ | ✅ (eigene Org) | ❌ |
| **2FA** |  |  |  |
| Eigenen 2FA verwalten | ✅ | ✅ | ✅ |
| 2FA für andere resetten | ✅ | ❌ | ❌ |
| **Activity Logs** |  |  |  |
| Alle Logs anzeigen | ✅ | ⚠️ Eigene Org | ❌ |
| Eigene Logs anzeigen | ✅ | ✅ | ✅ |

#### Zugriffsmatrix: Organisationen

| Funktion | System-Admin | App-Manager | Andere |
|----------|-------------|-------------|--------|
| Organisationen anzeigen | ✅ Alle | ✅ Eigene | ❌ |
| Organisation erstellen | ✅ | ❌ | ❌ |
| Organisation bearbeiten | ✅ | ⚠️ Nur Branding | ❌ |
| Organisation löschen | ✅ | ❌ | ❌ |
| Mandanten-Config | ✅ | ❌ | ❌ |
| Backend-Switch | ✅ | ❌ | ❌ |

#### Zugriffsmatrix: Rechtstexte

| Funktion | System-Admin | Rechtsabt. | Andere |
|----------|-------------|------------|--------|
| Rechtstexte anzeigen | ✅ Alle | ✅ Alle | ✅ Eigene |
| Rechtstext erstellen | ✅ | ✅ | ❌ |
| Rechtstext bearbeiten | ✅ | ✅ | ❌ |
| Rechtstext veröffentlichen | ✅ | ✅ | ❌ |
| Rechtstext löschen | ✅ | ⚠️ Nur Entwürfe | ❌ |
| Akzeptanzen einsehen | ✅ | ✅ | ❌ |
| Eigene Akzeptanzen | ✅ | ✅ | ✅ |

#### Zugriffsmatrix: Rollen & Gruppen

| Funktion | System-Admin | App-Manager | Andere |
|----------|-------------|-------------|--------|
| Rollen anzeigen | ✅ | ✅ | ✅ (Liste) |
| Rolle erstellen | ✅ | ❌ | ❌ |
| Rolle bearbeiten | ✅ | ❌ | ❌ |
| Rolle löschen | ✅ (keine System-Rollen) | ❌ | ❌ |
| Gruppen anzeigen | ✅ | ✅ (eigene Org) | ❌ |
| Gruppe erstellen | ✅ | ✅ | ❌ |
| Gruppe bearbeiten | ✅ | ✅ (eigene) | ❌ |
| Gruppe löschen | ✅ | ✅ (eigene) | ❌ |

---

### Workflow- oder Freigabeprozesse

#### 1. Account-Erstellung und Onboarding

**Workflow:**

```
Start
  ↓
[Admin erstellt Account]
  ↓
[System generiert Passwort]
  ↓
[Einladungs-Email versenden]
  ↓
┌─────────────────────┐
│ User klickt Link    │ → Link abgelaufen? → [Neuen Link anfordern]
└─────────────────────┘
  ↓
[Passwort festlegen]
  ↓
[Profil vervollständigen]
  ↓
[Rechtstexte akzeptieren] → Nicht akzeptiert? → [Kein CMS-Zugriff]
  ↓
[Account aktiviert]
  ↓
Ende
```

**Alternativ: Self-Service-Registrierung**
(nur wenn in Organisations-Einstellungen aktiviert)

```
Start
  ↓
[User füllt Registrierungsformular aus]
  ↓
[Bestätigungs-Email versenden]
  ↓
[Email-Verifikation]
  ↓
[Warteschlange für Admin-Freigabe] (Status: "pending")
  ↓
[Admin prüft Antrag]
  ├─ Genehmigt → [Account aktivieren] → [Welcome-Email]
  └─ Abgelehnt → [Ablehnungs-Email mit Begründung]
```

#### 2. Rechtstext-Publishing-Workflow

**Workflow:**

```
Start
  ↓
[Rechtstext als Entwurf erstellen]
  ↓
[Inhalt verfassen (Markdown)]
  ↓
[Zur Review einreichen] (Status: "draft")
  ↓
┌─────────────────────────┐
│ Rechtsabteilung prüft   │
└─────────────────────────┘
  ├─ Änderungen nötig → [Kommentare hinzufügen] → [Zurück an Autor]
  └─ Freigegeben
      ↓
      [Publikationsdatum festlegen]
        ├─ Sofort
        └─ Geplant (z.B. 01.02.2025)
      ↓
      [Status: "active" setzen]
      ↓
      [Benachrichtigung an betroffene Nutzer]
      ↓
      Ende
```

**Akzeptanz-Workflow:**

```
User loggt sich ein
  ↓
[System prüft: Neue Rechtstexte?]
  ↓
Ja → [Modal anzeigen mit Rechtstext]
  ↓
  ┌───────────────────────────┐
  │ "Ich akzeptiere" (Pflicht)│
  └───────────────────────────┘
    ├─ Akzeptiert → [Akzeptanz loggen] → [CMS-Zugriff gewähren]
    └─ Nicht akzeptiert → [Logout] → [Kein Zugriff]
```

#### 3. Rollen-Änderung mit Approval

**Workflow (für kritische Rollen wie System-Admin):**

```
Start
  ↓
[App-Manager beantragt Rollen-Änderung]
  ↓
[Antrag an System-Admin]
  ↓
┌─────────────────────────┐
│ System-Admin prüft      │
└─────────────────────────┘
  ├─ Genehmigt
  │   ↓
  │   [Rolle zuweisen]
  │   ↓
  │   [Benachrichtigung an User]
  │   ↓
  │   [Activity Log: "role_changed"]
  │   ↓
  │   Ende
  │
  └─ Abgelehnt
      ↓
      [Benachrichtigung mit Begründung]
      ↓
      Ende
```

---

## Integrationen und Schnittstellen

### Externe Systeme oder Standards

#### 1. LDAP / Active Directory Integration

**Use Case:** Synchronisation von Unternehmens-Verzeichnissen

**Features:**
- Automatischer Account-Import
- Gruppen-Mapping (AD-Groups → CMS-Rollen)
- Tägliche Synchronisation
- Deprovisioning bei AD-Löschung

**Konfiguration:**
```yaml
ldap:
  server: ldap://ad.gemeinde.local
  baseDN: dc=gemeinde,dc=local
  bindDN: cn=admin,dc=gemeinde,dc=local
  bindPassword: [encrypted]
  userFilter: (objectClass=person)
  groupFilter: (objectClass=group)
  attributeMapping:
    email: mail
    firstName: givenName
    lastName: sn
    groups: memberOf
  roleMapping:
    "CN=CMS-Admins,OU=Groups": system_admin
    "CN=CMS-Editors,OU=Groups": editor
```

#### 2. OAuth2 / OpenID Connect

**Unterstützte Provider:**
- Google Workspace
- Microsoft Azure AD
- Keycloak
- Auth0
- Custom OAuth2-Provider

**Flow:**
```
1. User klickt "Login mit Google"
2. Redirect zu Google OAuth
3. User genehmigt Zugriff
4. Callback mit Authorization Code
5. Exchange Code für Access Token
6. User-Info von Google abrufen
7. Account erstellen oder aktualisieren (JIT Provisioning)
8. Session erstellen
9. Redirect zu Dashboard
```

**Konfiguration:**
```typescript
interface OAuthConfig {
  provider: 'google' | 'microsoft' | 'custom'
  clientId: string
  clientSecret: string          // Encrypted
  authorizationUrl: string
  tokenUrl: string
  userInfoUrl: string
  scopes: string[]
  roleMapping?: {
    [claimValue: string]: UserRole
  }
}
```

#### 3. SAML 2.0 Single Sign-On

**Use Case:** Enterprise-Umgebungen mit Identity Provider (IdP)

**Supported Identity Providers:**
- Okta
- OneLogin
- Azure AD SAML
- ADFS

**Attribute-Mapping:**
```xml
<saml:AttributeStatement>
  <saml:Attribute Name="email">
    <saml:AttributeValue>user@example.com</saml:AttributeValue>
  </saml:Attribute>
  <saml:Attribute Name="firstName">
    <saml:AttributeValue>Max</saml:AttributeValue>
  </saml:Attribute>
  <saml:Attribute Name="role">
    <saml:AttributeValue>editor</saml:AttributeValue>
  </saml:Attribute>
</saml:AttributeStatement>
```

#### 4. SCIM 2.0 (System for Cross-domain Identity Management)

**Use Case:** Automatisiertes User Provisioning

**Endpoints:**
```
GET    /scim/v2/Users
POST   /scim/v2/Users
GET    /scim/v2/Users/{id}
PUT    /scim/v2/Users/{id}
PATCH  /scim/v2/Users/{id}
DELETE /scim/v2/Users/{id}

GET    /scim/v2/Groups
POST   /scim/v2/Groups
```

**Features:**
- Automatische Account-Erstellung bei HR-Onboarding
- Account-Update bei Rollen-Änderung
- Account-Deaktivierung bei Offboarding

---

### Anforderungen an APIs und Webhooks

#### REST API Endpoints

**Authentication:**
```
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh-token
POST   /api/auth/password-reset-request
POST   /api/auth/password-reset
POST   /api/auth/verify-email
POST   /api/auth/enable-2fa
POST   /api/auth/verify-2fa
```

**Accounts:**
```
GET    /api/accounts
POST   /api/accounts
GET    /api/accounts/:id
PUT    /api/accounts/:id
DELETE /api/accounts/:id
PATCH  /api/accounts/:id/status
PATCH  /api/accounts/:id/role
GET    /api/accounts/:id/permissions
PUT    /api/accounts/:id/permissions
GET    /api/accounts/:id/activity
POST   /api/accounts/bulk-import
```

**Organizations:**
```
GET    /api/organizations
POST   /api/organizations
GET    /api/organizations/:id
PUT    /api/organizations/:id
DELETE /api/organizations/:id
GET    /api/organizations/:id/members
POST   /api/organizations/:id/backend-test
```

**Legal Texts:**
```
GET    /api/legal-texts
POST   /api/legal-texts
GET    /api/legal-texts/:id
PUT    /api/legal-texts/:id
DELETE /api/legal-texts/:id
POST   /api/legal-texts/:id/publish
GET    /api/legal-texts/:id/versions
POST   /api/legal-texts/:id/accept
GET    /api/legal-texts/:id/acceptances
```

**Roles & Groups:**
```
GET    /api/roles
POST   /api/roles
GET    /api/roles/:id
PUT    /api/roles/:id
DELETE /api/roles/:id

GET    /api/groups
POST   /api/groups
GET    /api/groups/:id
PUT    /api/groups/:id
DELETE /api/groups/:id
GET    /api/groups/:id/members
POST   /api/groups/:id/members
```

#### Webhooks

**Event-Types:**

**Account-Events:**
- `account.created`
- `account.updated`
- `account.deleted`
- `account.locked`
- `account.role_changed`
- `account.login_success`
- `account.login_failed`

**Organization-Events:**
- `organization.created`
- `organization.updated`
- `organization.member_added`
- `organization.member_removed`

**Legal-Text-Events:**
- `legal_text.published`
- `legal_text.accepted`
- `legal_text.expired`

**Webhook-Payload-Beispiel:**
```json
{
  "event": "account.role_changed",
  "timestamp": "2025-01-15T14:30:00Z",
  "data": {
    "account_id": "uuid-123",
    "email": "user@example.com",
    "old_role": "editor",
    "new_role": "app_manager",
    "changed_by": "admin@example.com"
  },
  "organization_id": "org-uuid"
}
```

---

## Nicht-funktionale Anforderungen

### Performance- und Skalierungsanforderungen

#### Performance-Ziele

**API Response Times:**
- Login: < 500ms (p95)
- Account-Liste laden (100 Accounts): < 300ms
- Account-Details: < 150ms
- Berechtigungsprüfung: < 50ms (gecacht)
- Activity Log (letzte 100 Einträge): < 200ms

**UI Response Times:**
- Account-Profil öffnen: < 300ms
- Tab-Wechsel: < 100ms
- Formular-Validierung: < 50ms
- Suche in Account-Liste: < 200ms

#### Skalierung

**Nutzer-Anzahl:**
- Pro Organisation: 1.000 Accounts
- Gesamt-System: 100.000 Accounts
- Gleichzeitige Sessions: 10.000
- Login-Requests: 100/s

**Datenbank-Optimierung:**
- Indizes auf häufige Queries
- Partitionierung von `activity_logs` nach Datum
- Connection Pooling (max. 100 Connections)
- Query-Caching für Permissions

**Caching-Strategie:**
- Permissions: 5 Minuten Cache (Redis)
- Account-Details: 1 Minute Cache
- Organisations-Daten: 10 Minuten Cache
- Rechtstexte: 1 Stunde Cache
- Cache-Invalidierung bei Updates

---

### Sicherheit und Datenschutz (inkl. DSGVO, Protokollierung)

#### Authentifizierung

**Passwort-Sicherheit:**
- Bcrypt mit Salt (Work Factor: 12)
- Mindestlänge: 12 Zeichen
- Passwort-Blacklist (häufigste 10.000 Passwörter)
- Passwort-Historie (letzte 5 Passwörter nicht wiederverwendbar)
- Passwort-Ablauf: 90 Tage (konfigurierbar)

**Session-Management:**
- JWT mit Short-Lived Access Token (15 Min)
- Refresh Token mit längerer Laufzeit (7 Tage)
- HttpOnly Cookies (CSRF-Schutz)
- Secure Flag (HTTPS-Only)
- Session-Bindung an IP (optional, konfigurierbar)

**2FA-Sicherheit:**
- TOTP-Standard (RFC 6238)
- 30-Sekunden-Window
- Backup-Codes (10 Stück, einmalig verwendbar)
- Rate-Limiting: Max. 5 Versuche pro Minute

**Brute-Force-Schutz:**
- Rate-Limiting: 5 Login-Versuche pro 15 Minuten
- Account-Sperrung: 30 Minuten
- IP-basiertes Rate-Limiting (20 Versuche/Min)
- CAPTCHA ab 3 fehlgeschlagenen Versuchen

#### Autorisierung

**RBAC (Role-Based Access Control):**
- Rollen haben definierte Berechtigungen
- Permissions werden gecacht (Redis)
- Bei jedem API-Call Permission-Check
- Deny-by-Default-Prinzip

**ABAC (Attribute-Based Access Control):**
- Geografische Einschränkungen
- Content-Type-spezifische Permissions
- Zeitbasierte Zugriffsbeschränkungen (geplant)

**Mandantentrennung:**
- Row-Level Security (Supabase)
- Jede Query filtert auf `organizationId`
- Keine Cross-Tenant-Zugriffe möglich
- Audit bei Mandanten-Wechsel (für Agenturen)

#### DSGVO-Compliance

**Rechtliche Grundlagen:**
- Datenminimierung: Nur erforderliche Daten
- Zweckbindung: Klare Verwendungszwecke
- Speicherbegrenzung: Automatische Archivierung
- Transparenz: Klare Datenschutzerklärung

**Betroffenenrechte:**

**1. Auskunftsrecht (Art. 15 DSGVO):**
- API-Endpoint: `GET /api/accounts/:id/data-export`
- Export als JSON/CSV
- Umfang: Account-Daten, Activity Logs, Permissions

**2. Recht auf Berichtigung (Art. 16 DSGVO):**
- Self-Service: User kann Profil selbst bearbeiten
- Admin-Support bei technischen Problemen

**3. Recht auf Löschung (Art. 17 DSGVO):**
- API-Endpoint: `DELETE /api/accounts/:id?gdpr=true`
- Pseudonymisierung statt Löschung (Audit-Pflicht)
- Nach 3 Jahren: Vollständige Löschung

**4. Recht auf Datenübertragbarkeit (Art. 20 DSGVO):**
- Export als JSON (maschinenlesbar)
- Alle personenbezogenen Daten

**5. Widerspruchsrecht (Art. 21 DSGVO):**
- Opt-Out aus Analytics
- Opt-Out aus Marketing-E-Mails

**Einwilligung:**
- Rechtstexte mit Checkbox
- Versionierte Einwilligungen
- Logging: Zeitstempel, IP, User-Agent
- Widerrufsmöglichkeit

**Datenschutz-Folgenabschätzung (DSFA):**
- Bei neuen Features mit hohem Risiko
- Prüfung durch Datenschutzbeauftragten

#### Protokollierung (Audit Trail)

**Was wird geloggt:**
- Alle Authentifizierungsversuche (Erfolg + Fehler)
- Alle CRUD-Operationen auf Accounts
- Rollen- und Rechteänderungen
- Zugriff auf sensible Daten
- Admin-Aktionen
- API-Zugriffe (mit Rate-Limiting-Events)

**Was wird NICHT geloggt:**
- Passwörter (nur Hash-Änderungen)
- Inhalte von Formularen (nur "Form submitted")
- Private Nachrichten

**Aufbewahrungsfristen:**
- Standard-Logs: 1 Jahr
- Security-Logs: 3 Jahre
- IP-Adressen: 90 Tage (dann anonymisiert)
- Account-Löschungen: 5 Jahre (DSGVO-Nachweispflicht)

**Log-Zugriff:**
- System-Admins: Alle Logs
- App-Manager: Logs eigener Organisation
- Andere: Eigene Logs

---

### Barrierefreiheit gemäß WCAG/BITV

#### WCAG 2.1 Level AA Compliance

**1. Wahrnehmbar**

**Farbkontrast:**
- Text: Mindestens 4.5:1 (WCAG AA)
- Große Texte: Mindestens 3:1
- Buttons/UI-Elemente: Mindestens 3:1
- Status-Badges: Farbkodierung + Text

**Alternative Texte:**
- Avatar-Bilder: Alt-Text mit Benutzername
- Icons: `aria-label` oder `title`
- Status-Badges: Screenreader-freundliche Labels

**Responsive Design:**
- Mobile-First-Ansatz
- Zoom bis 200% ohne Horizontal-Scrolling
- Min. Touch-Target-Größe: 44x44px

**2. Bedienbar**

**Tastatur-Navigation:**
- Alle Funktionen per Keyboard erreichbar
- Logische Tab-Order
- Skip-Links zu Hauptinhalt
- Focus-Indikator deutlich sichtbar (2px Outline)

**Keyboard-Shortcuts:**
- `Ctrl+S`: Formular speichern
- `Esc`: Modal/Dialog schließen
- `Tab`: Nächstes Element
- `Shift+Tab`: Vorheriges Element

**Zeitlimits:**
- Session-Timeout-Warning 2 Minuten vorher
- Möglichkeit zur Verlängerung

**3. Verständlich**

**Klare Labels:**
- Alle Formularfelder haben sichtbare Labels
- Fehlermeldungen sind konkret und hilfreich
- Pflichtfelder mit `*` und `aria-required`

**Konsistente Navigation:**
- Gleiche Navigation auf allen Seiten
- Breadcrumbs für Orientierung
- Aktive Seite in Navigation hervorgehoben

**Input-Hilfe:**
- Platzhalter-Texte
- Inline-Validierung mit sofortigem Feedback
- Hilfetexte unter Formularfeldern

**4. Robust**

**Semantisches HTML:**
- Korrekte Verwendung von `<h1>-<h6>`
- `<nav>`, `<main>`, `<aside>` für Landmarks
- `<button>` für Buttons (nicht `<div>`)

**ARIA-Attribute:**
- `role="navigation"` für Hauptnavigation
- `aria-label` für Icon-Buttons
- `aria-live="polite"` für Benachrichtigungen
- `aria-expanded` für Dropdowns

**Browser-Kompatibilität:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

#### Screen-Reader-Support

**Getestet mit:**
- JAWS (Windows)
- NVDA (Windows)
- VoiceOver (macOS/iOS)
- TalkBack (Android)

**Optimierungen:**
- Tabellen mit `<caption>` und `scope`
- Formulare mit `<fieldset>` und `<legend>`
- Status-Updates als Live-Regions

---

## Monitoring und KPIs

### Welche Kennzahlen sollen erhoben und visualisiert werden?

#### 1. Account-Metriken

**Dashboard-Widgets:**

**Nutzer-Übersicht:**
- Gesamt-Accounts: 1.247
- Aktive Accounts (letzte 30 Tage): 834
- Neue Accounts (diese Woche): 12
- Pending Accounts: 5
- Gesperrte Accounts: 3

**Rollen-Verteilung:**
```
System-Admins:       2  (0.2%)
App-Manager:        15  (1.2%)
Designer:            8  (0.6%)
Redakteure:        456  (36.6%)
Interface-Manager:   5  (0.4%)
Moderatoren:        12  (1.0%)
Strategisch:         3  (0.2%)
Sonstige:          746  (59.8%)
```

**Login-Aktivität:**
- Logins heute: 234
- Durchschn. Logins/Tag (7 Tage): 187
- Login-Fehlerrate: 2.3%
- 2FA-Adoption: 34%

**Onboarding-Funnel:**
```
Einladung versendet:    100%  (50 User)
Email-Verifikation:      88%  (44 User)
Passwort gesetzt:        82%  (41 User)
Profil vervollständigt:  78%  (39 User)
Erster Login:            72%  (36 User)
```

#### 2. Sicherheits-Metriken

**Security-Dashboard:**

**Authentifizierung:**
- Failed Login-Attempts (24h): 23
- Account-Lockouts (24h): 2
- Password-Resets (24h): 5
- 2FA-Aktivierungen (7 Tage): 8

**Compliance:**
- Accounts ohne Email-Verifikation: 12
- Accounts mit abgelaufenem Passwort: 3
- Accounts ohne Rechtstext-Akzeptanz: 0

**Anomalien:**
- Unusual Login-Zeiten: 2 (Alerts)
- Ungewöhnliche IP-Adressen: 1 (Alert)
- Mehrfache Rollen-Änderungen: 0

#### 3. Organisations-Metriken

**Multi-Tenant-Dashboard:**

**Organisations-Übersicht:**
- Gesamt-Organisationen: 47
- Aktive Trial-Accounts: 8
- Bezahlte Accounts: 39
- Backend-Typ:
  - Supabase: 32 (68%)
  - GraphQL: 15 (32%)

**Top-Organisationen (nach Nutzer-Anzahl):**
```
1. Gemeinde Musterstadt:     127 Nutzer
2. Stadtwerke Nord:           89 Nutzer
3. Agentur Mediendesign:      56 Nutzer
4. Landkreis Süd:             43 Nutzer
5. Nonprofit Umweltschutz:    31 Nutzer
```

**Aktivität pro Organisation:**
- Durchschn. Logins/Org/Tag: 18
- Content-Erstellung/Org/Woche: 23

#### 4. Rechtstext-Metriken

**Compliance-Dashboard:**

**Akzeptanz-Rate:**
```
Datenschutzerklärung v2.1:    98%  (1.223 von 1.247)
Nutzungsbedingungen v1.5:     97%  (1.210 von 1.247)
Cookie-Richtlinie v1.0:       95%  (1.185 von 1.247)
```

**Pending-Akzeptanzen:**
- Nutzer ohne Akzeptanz: 24
- Davon: Inactive Accounts: 18
- Aktion erforderlich: 6

**Versionshistorie:**
- Datenschutzerklärung: 3 Versionen
- Letzte Änderung: 15.01.2025
- Nächste Review: 15.04.2025

#### 5. Performance-Metriken

**API-Performance:**
```
┌─────────────────────┬─────────┬─────────┬─────────┐
│ Endpoint            │ p50     │ p95     │ p99     │
├─────────────────────┼─────────┼─────────┼─────────┤
│ GET /accounts       │ 120ms   │ 280ms   │ 450ms   │
│ POST /auth/login    │ 250ms   │ 480ms   │ 780ms   │
│ GET /permissions    │  35ms   │  65ms   │ 120ms   │
│ GET /activity       │ 150ms   │ 320ms   │ 580ms   │
└─────────────────────┴─────────┴─────────┴─────────┘
```

**Cache-Effizienz:**
- Permission-Cache Hit-Rate: 94%
- Account-Cache Hit-Rate: 87%
- Organization-Cache Hit-Rate: 91%

---

### Alarme oder Benachrichtigungen bei Fehlern oder Abweichungen

#### Kritische Alarme (🔴 Sofortige Benachrichtigung)

**Security-Incidents:**
- 🔴 **Brute-Force-Angriff erkannt**: > 100 Failed Logins von gleicher IP
- 🔴 **Account-Übernahme-Versuch**: Login von ungewöhnlichem Standort bei System-Admin
- 🔴 **Privilege-Escalation**: User versucht auf Admin-Endpoint zuzugreifen
- 🔴 **Datenbank-Breach-Versuch**: SQL-Injection-Pattern erkannt

**System-Failures:**
- 🔴 **Authentifizierungs-Service down**: > 50% Login-Fehlerrate
- 🔴 **Datenbank-Verbindung verloren**: Connection-Pool erschöpft
- 🔴 **LDAP/AD-Sync fehlgeschlagen**: 3 aufeinanderfolgende Fehler

**Compliance-Verstöße:**
- 🔴 **DSGVO-Verletzung**: Unerlaubter Cross-Tenant-Zugriff
- 🔴 **Audit-Log-Lücke**: Logging-Service ausgefallen

#### Warnungen (🟡 E-Mail-Benachrichtigung)

**Account-Management:**
- 🟡 **Viele Pending-Accounts**: > 20 Accounts warten auf Freigabe
- 🟡 **Ungewöhnliche Registrierungen**: > 50 Registrierungen/Stunde
- 🟡 **Passwort-Ablauf**: 100 Accounts mit abgelaufenem Passwort
- 🟡 **2FA-Adoption niedrig**: < 25% bei System-Admins

**Performance-Degradation:**
- 🟡 **API-Latenz erhöht**: p95 > 1 Sekunde
- 🟡 **Cache-Misses häufig**: Hit-Rate < 80%
- 🟡 **Datenbank-Slow-Queries**: > 10 Queries > 5 Sekunden

**Rechtstexte:**
- 🟡 **Rechtstext läuft bald ab**: Expiry in 30 Tagen
- 🟡 **Niedrige Akzeptanz-Rate**: < 90% nach 7 Tagen

#### Informationen (ℹ️ Dashboard-Anzeige)

**Routine-Events:**
- ℹ️ **Bulk-Import abgeschlossen**: 50 Accounts erfolgreich importiert
- ℹ️ **Tägliche LDAP-Sync**: 3 Accounts aktualisiert
- ℹ️ **Neue Organisation erstellt**: "Stadtwerke West"
- ℹ️ **Rechtstext veröffentlicht**: "Cookie-Richtlinie v2.0"

#### Monitoring-Tools

**Empfohlener Stack:**
- **Application Monitoring**: Sentry (Error Tracking)
- **Performance Monitoring**: New Relic / DataDog
- **Security Monitoring**: OSSEC / Wazuh
- **Log Aggregation**: Supabase Logs + CloudWatch
- **Alerting**: PagerDuty / Opsgenie

**Alerting-Kanäle:**
- 🔴 Kritisch: SMS + Slack (#incidents) + Email
- 🟡 Warnung: Slack (#alerts) + Email
- ℹ️ Info: Dashboard + Email-Digest (täglich)

---

## Abhängigkeiten

### Technische oder fachliche Abhängigkeiten zu anderen Modulen

#### 1. Abhängigkeiten zu anderen CMS-Modulen

**Content-Management (Kern-Modul):**
- ✅ **Erforderlich**: Berechtigungsprüfung bei jedem Content-Zugriff
- Permissions: `content.read`, `content.create`, `content.edit`, `content.delete`, `content.publish`
- Geografische Einschränkungen: Content nur für zugewiesene Regionen

**Media-Verwaltung:**
- ✅ **Erforderlich**: Berechtigungsprüfung für Upload/Download
- Avatar-Bilder von Accounts
- Organisations-Logos
- Permissions: `media.upload`, `media.edit`, `media.delete`

**Design-Modul:**
- ⚠️ **Optional**: Designer-Rolle benötigt Zugriff
- Permissions: `design.view`, `design.edit`, `design.publish`

**Module-Management:**
- ✅ **Erforderlich**: App-Manager kann Module aktivieren/deaktivieren
- Permissions: `modules.configure`

**Dashboard & Analytics:**
- ✅ **Erforderlich**: Strategischer Entscheider benötigt Read-Only-Zugriff
- Permissions: `analytics.view`

**Benachrichtigungen:**
- ✅ **Erforderlich**: Account-Events triggern Notifications
- Email-Versand bei Account-Erstellung, Passwort-Reset, etc.

#### 2. Plattform-Abhängigkeiten

**Supabase:**
- PostgreSQL 15+ (Datenbank)
- Row-Level Security (Mandantentrennung)
- Edge Functions (Backend-Logik)
- Supabase Auth (Alternative zu eigenem Auth-System)

**GraphQL (Smart Village App Backend):**
- Kompatibilität mit GraphQL-Schema
- OAuth2-Token-Management
- Fallback bei Verbindungsproblemen

**i18n-System:**
- ✅ **Erforderlich**: Mehrsprachigkeit für UI und Rechtstexte
- Zentrale Sprachdateien: `/i18n/locales/de|en`

---

### Benötigte Plattformkomponenten oder Drittservices

#### 1. Pflicht-Komponenten (ohne diese funktioniert System nicht)

**Datenbank:**
- PostgreSQL 15+
- Extensions: `pgcrypto` (UUID-Generierung), `pg_trgm` (Textsuche)

**Backend-Runtime:**
- Supabase Edge Functions (Deno) ODER
- Node.js 18+ (für GraphQL-Backend)

**Cache:**
- Redis 7+ (für Permission-Caching, Session-Management)

**Email-Service:**
- SMTP-Server oder
- SendGrid / Postmark / AWS SES

#### 2. Optional (für erweiterte Features)

**Identity-Provider-Integration:**
- LDAP-Server (Active Directory)
- OAuth2-Provider (Google, Microsoft)
- SAML-IdP (Okta, OneLogin)

**Monitoring & Logging:**
- Sentry (Error Tracking)
- CloudWatch / DataDog (Metrics)
- ELK-Stack (Log-Aggregation)

**Security:**
- CAPTCHA-Service (hCaptcha / reCAPTCHA)
- Rate-Limiting-Service (Redis-basiert)
- WAF (Web Application Firewall)

**Compliance:**
- Vault (Secret-Management)
- 1Password / LastPass (für 2FA-Backup-Codes)

---

### Auswirkungen auf Betrieb, Support oder Schulung

#### Betrieb

**Laufende Wartung:**
- **Täglich**: Monitoring-Dashboard prüfen, kritische Alerts bearbeiten
- **Wöchentlich**: Pending-Accounts freigeben, gesperrte Accounts reviewen
- **Monatlich**: Inaktive Accounts prüfen, Passwort-Ablauf-Warnings versenden
- **Quartalsweise**: Security-Audit, Rechtstexte reviewen, Rolle-Permissions aktualisieren

**Backup & Disaster Recovery:**
- Tägliche DB-Backups (automatisch via Supabase)
- Point-in-Time-Recovery (bis 7 Tage zurück)
- Wöchentliche Backup-Tests
- RTO (Recovery Time Objective): 4 Stunden
- RPO (Recovery Point Objective): 24 Stunden

**Monitoring:**
- 24/7 Uptime-Monitoring (PingDom / UptimeRobot)
- Automatische Alerts bei kritischen Fehlern
- Performance-Dashboards (Grafana)

#### Support

**Support-Level:**

**Level 1 (Hotline):**
- Passwort-Reset
- Account-Sperrung aufheben
- Email-Verifikation erneut senden
- Login-Probleme (Browser-Cache, Cookies)
- Erreichbarkeit: Mo-Fr 8-18 Uhr

**Level 2 (Fach-Support):**
- Rollen-Zuweisung
- Berechtigungs-Probleme
- Organisation-Konfiguration
- LDAP/AD-Sync-Probleme
- 2FA-Probleme (Backup-Codes)
- Erreichbarkeit: Mo-Fr 9-17 Uhr

**Level 3 (Engineering):**
- Security-Incidents
- Performance-Probleme
- Bug-Fixes
- Feature-Requests
- Datenbank-Probleme
- Erreichbarkeit: On-Call 24/7

**Häufige Support-Fälle:**
1. "Ich kann mich nicht einloggen" (35%)
2. "Ich habe mein Passwort vergessen" (25%)
3. "Ich brauche mehr Berechtigungen" (15%)
4. "2FA funktioniert nicht" (10%)
5. "Account ist gesperrt" (5%)
6. "Email-Verifikation nicht erhalten" (5%)
7. Sonstige (5%)

**Support-Dokumentation:**
- Online-Hilfe: `/help/accounts`
- Video-Tutorials (YouTube)
- PDF-Handbücher
- FAQ-Sektion
- Interaktive Tooltips im CMS

#### Schulung

**Zielgruppen:**

**1. System-Administratoren (1 Tag)**

**Agenda:**
- Backend-Konfiguration (Supabase/GraphQL)
- Rollen- und Rechtemanagement
- Organisations-Verwaltung
- Security-Best-Practices
- Monitoring & Alerts
- Troubleshooting
- Backup & Recovery

**Praxis:**
- Account anlegen und Rollen zuweisen
- LDAP/AD-Integration einrichten
- Rechtstexte veröffentlichen
- Security-Incident simulieren

---

**2. App-Manager (halber Tag)**

**Agenda:**
- Account-Verwaltung (eigene Org)
- Gruppen-Management
- Berechtigungen verstehen
- Onboarding-Prozess
- Offboarding-Prozess

**Praxis:**
- Bulk-Import von Accounts
- Rolle zuweisen
- Gruppen erstellen
- Pending-Account freigeben

---

**3. Rechtsabteilung (2 Stunden)**

**Agenda:**
- Rechtstexte erstellen
- Versionierung
- Publishing-Workflow
- Akzeptanz-Tracking
- DSGVO-Compliance

**Praxis:**
- Datenschutzerklärung aktualisieren
- Neue Version veröffentlichen
- Akzeptanzen prüfen

---

**4. Endanwender (30 Minuten, Self-Service)**

**Agenda:**
- Profil vervollständigen
- Passwort ändern
- 2FA aktivieren
- Rechtstexte verstehen

**Format:**
- Interaktiver Onboarding-Wizard
- Video-Tutorial (5 Min)
- Tooltips im CMS

---

**Schulungsformate:**
- Online-Webinar (live + aufgezeichnet)
- Vor-Ort-Workshop (für größere Organisationen)
- Self-Service-Lernplattform (Moodle / Teachable)
- Quarterly Refresher-Sessions

**Schulungsmaterialien:**
- Präsentationsfolien (PDF)
- Übungs-Szenarien mit Testdaten
- Checklisten (z.B. "Account-Erstellung in 5 Schritten")
- Quick-Reference-Cards (Laminated, A4)
- Screencasts mit Kommentar

---

## Offene Fragen

### Noch zu klärende Punkte

#### 1. Fachliche Fragen

**Frage 1: Wie detailliert soll die Rollen-Hierarchie sein?**
- Aktuell: 7 Haupt-Rollen (Personas)
- Alternative: Sub-Rollen (z.B. "Senior Editor", "Junior Editor")
- Auswirkung: Komplexität der Berechtigungsverwaltung
- **Status:** ⏳ In Abstimmung mit Pilotkommunen

**Frage 2: Soll Self-Service-Registrierung standardmäßig aktiviert sein?**
- Pro: Einfacher Onboarding-Prozess
- Contra: Spam-Risiko, Admin-Overhead für Freigaben
- Empfehlung: Optional, per Organisation konfigurierbar
- **Status:** 🟡 Feature-Request für V1.1

**Frage 3: Wie lang sollen Sessions gültig sein?**
- Aktuell: 8 Stunden
- Alternative: Bis Browser-Schließung oder 24 Stunden
- Sicherheit vs. UX-Abwägung
- **Status:** ⏳ Security-Team prüft

**Frage 4: Sollte es eine "Super-Admin"-Rolle über Organisationen hinweg geben?**
- Use Case: Agentur verwaltet mehrere Mandanten
- Risiko: Single Point of Failure
- Lösung: Separate "Agency-Admin"-Rolle mit Cross-Tenant-Rechten
- **Status:** 🟡 Geplant für V2 (Enterprise-Feature)

**Frage 5: Wie werden gelöschte Accounts behandelt?**
- Option A: Soft-Delete (Status: "deleted", Daten bleiben)
- Option B: Hard-Delete nach Wartezeit (z.B. 90 Tage)
- Option C: Anonymisierung (nur ID bleibt für Audit-Trail)
- **Status:** ⏳ Rechtsabteilung + Datenschutz klären

#### 2. Technische Fragen

**Frage 6: Single Sign-On (SSO) - welche Provider priorisieren?**
- Google Workspace (Pflicht)
- Microsoft Azure AD (Pflicht)
- Keycloak (Open Source)
- Auth0 (Paid)
- Custom OAuth2
- **Status:** ✅ Google + Microsoft für V1, Rest für V2

**Frage 7: Wie wird die Mandantentrennung bei GraphQL-Backend sichergestellt?**
- Aktuell: Filter auf `organizationId` in Queries
- Alternative: Separate Datenbank pro Mandant
- Performance-Auswirkungen?
- **Status:** 🔴 Dringend zu klären (Security-relevant)

**Frage 8: Soll es einen zentralen Identity-Provider (IdP) geben?**
- Option: Keycloak als zentraler IdP für alle Organisationen
- Vorteil: Single Source of Truth
- Nachteil: Zusätzliche Komplexität
- **Status:** 🟡 Geplant für V2 (Enterprise-Feature)

**Frage 9: Real-Time-Updates bei Berechtigungsänderungen?**
- Scenario: Admin ändert Rolle → User sieht sofort neue Permissions
- Technologie: Supabase Realtime / WebSockets
- Alternative: Polling alle 30 Sekunden
- **Status:** 🟡 Geplant für V1.1

**Frage 10: Wie wird LDAP/AD-Passwort-Sync gehandhabt?**
- Option A: Passwörter werden NICHT synchronisiert (User nutzt AD-Passwort)
- Option B: Passwort-Hash wird synchronisiert
- Option C: SSO-Only (kein lokales Passwort)
- **Status:** ⏳ IT-Team prüft Machbarkeit

#### 3. Prozess-Fragen

**Frage 11: Wer darf Rechtstexte veröffentlichen?**
- Option A: Nur System-Admin
- Option B: System-Admin + Rechtsabteilung
- Option C: Jeder mit "Rechtstext-Publisher"-Berechtigung
- **Status:** ⏳ In Abstimmung mit Rechtsabteilung

**Frage 12: Wie wird das Vier-Augen-Prinzip bei kritischen Aktionen umgesetzt?**
- Beispiel: Admin löscht Account mit vielen Inhalten
- Lösung: Approval-Workflow mit zweitem Admin
- Technisch: `pending_approval`-Status
- **Status:** 🟡 Geplant für V2

**Frage 13: Automatisches Offboarding bei HR-Ereignissen?**
- Integration mit HR-System (z.B. SAP, Personio)
- Automatische Account-Deaktivierung bei Austritt
- Reassignment von Content
- **Status:** 🔴 Abhängig von HR-System-Integration (V2)

---

### Annahmen, die validiert werden müssen

#### Technische Annahmen

**Annahme 1: Supabase Row-Level Security ist ausreichend für Mandantentrennung**
- Risiko: Security-Lücken bei komplexen Queries
- Validierung: Security-Audit durchführen, Penetration-Testing
- Fallback: Application-Layer-Checks zusätzlich
- **Validierung bis:** Q2 2025

**Annahme 2: Redis-Caching skaliert für 100.000 Accounts**
- Risiko: Memory-Limits, Performance-Degradation
- Validierung: Load-Testing mit synthetischen Daten
- Fallback: Cache-Sharding, Cluster-Setup
- **Validierung bis:** Q1 2025

**Annahme 3: Email-Versand über SMTP ist ausreichend**
- Risiko: Rate-Limiting, Spam-Filter
- Validierung: Stress-Test mit 10.000 Emails/Stunde
- Fallback: Professioneller Email-Service (SendGrid)
- **Validierung bis:** Q1 2025

#### Fachliche Annahmen

**Annahme 4: 7 Personas decken alle Anwendungsfälle ab**
- Risiko: Neue Use Cases erfordern zusätzliche Rollen
- Validierung: Pilot-Phase mit 5 Kommunen
- Fallback: Custom-Rollen für spezielle Anforderungen
- **Validierung bis:** Q2 2025

**Annahme 5: Benutzer akzeptieren 2FA-Pflicht für System-Admins**
- Risiko: Widerstand, Usability-Probleme
- Validierung: User-Testing, Feedback-Runde
- Fallback: Opt-Out mit expliziter Risikoakzeptanz
- **Validierung bis:** Q1 2025

**Annahme 6: Rechtstexte werden maximal quartalsweise aktualisiert**
- Risiko: Häufige Updates überfordern Nutzer
- Validierung: Feedback von Rechtsabteilungen
- Fallback: "Minor Updates" ohne Akzeptanz-Zwang
- **Validierung bis:** Q2 2025

#### Organisatorische Annahmen

**Annahme 7: Organisationen verwalten Accounts selbst (kein Full-Service)**
- Alternative: Agentur/Dienstleister übernimmt Account-Management
- Auswirkung: Cross-Tenant-Rechte, Agency-Admin-Rolle
- **Validierung bis:** ⏳ In Vertragsverhandlung

**Annahme 8: Account-Daten dürfen in EU-Rechenzentrum gespeichert werden**
- Risiko: Spezielle Anforderungen (z.B. KRITIS, Behörden)
- Validierung: Rechtliche Prüfung pro Mandant
- Fallback: On-Premise-Installation
- **Validierung bis:** Laufend

---

## Zusammenfassung und nächste Schritte

### Status Quo

**✅ Erfolgreich konzipiert:**
- Account-Verwaltung mit 7 Personas
- Rollen- und Berechtigungssystem (RBAC)
- Organisations-Verwaltung mit Mandantentrennung
- Rechtstext-Verwaltung mit Versionierung
- Activity Logs (Audit Trail)
- Mehrsprachigkeit (DE/EN) für UI
- Design System Compliance (CSS-Variablen)
- Responsive Layouts

**⏳ Offen:**
- 2FA-Integration
- LDAP/AD-Synchronisation
- OAuth2/SAML SSO
- SCIM 2.0 User Provisioning
- Performance-Optimierung für große Accounts-Mengen
- Passwort-Richtlinien (Komplexität, Ablauf)
- Approval-Workflows für kritische Aktionen
- Real-Time-Updates bei Permission-Changes
- Agency-Admin-Rolle (Cross-Tenant)
- Self-Service-Registrierung
- GDPR-Datenexport-Tool

### Prioritäten für Q1 2026

1. **Security-Audit** - Penetration-Testing für Mandantentrennung
2. **2FA-Rollout** - Pflicht für System-Admins
3. **Load-Testing** - 100.000 Accounts, 10.000 Sessions
4. **LDAP/AD-Integration** - Pilot mit 2 Organisationen
5. **Schulungen** - Onboarding für erste 10 Pilotkunden
6. **Dokumentation** - API-Docs, Admin-Handbuch

---

**Letzte Aktualisierung:** 15. Januar 2025
**Version:** 1.0
**Autor:** Philipp
**Review:** Ausstehend
