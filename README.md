# Konzept Smart Village App CMS 2.0

Dieses Dokument beschreibt die Konzeption des neuen Content-Management-Systems für die Smart Village App. Das neue CMS löst das bisherige Ruby-on-Rails-basierte System ab und bietet moderne, skalierbare Funktionen für Kommunen.

## Übersicht

Das Projekt gliedert sich in folgende Hauptbereiche:

1. **Anforderungsanalyse** – Detaillierte Erfassung aller funktionalen und nicht-funktionalen Anforderungen
2. **Systemarchitektur** – Technische Umsetzungskonzepte für kritische Bereiche
3. **Roadmap** – 10 Milestones für die schrittweise Umsetzung
4. **Gap-Analyse** – Abgleich der Anforderungen mit den Milestones

## 📂 Dokumentenstruktur

### 1. [Einleitung](01_Einleitung/Einleitung.md)
Projekthintergrund, Zielsetzung und Rahmenbedingungen

### 2. Anforderungen
Zentrale Übersicht: **[Anforderungsübersicht](02_Anforderungen/Anforderungsuebersicht.md)** (19 Kategorien, 500+ Anforderungen)

#### 2.1 Funktionale Anforderungen ([02_Anforderungen/02_01_Funktional/](02_Anforderungen/02_01_Funktional/))

**Kernbereiche:**
- **[Benutzer- und Rechteverwaltung](02_Anforderungen/02_01_Funktional/Benutzer.md)** – Rollen, Rechte, Authentifizierung, SSO
- **[Content- und Medien-Management](02_Anforderungen/02_01_Funktional/CMS.md)** – Workflows, Versionierung, Mediathek
- **[App-Design und Instanzverwaltung](02_Anforderungen/02_01_Funktional/App-Design.md)** – Theme-Editor, Multi-Tenancy
- **[Schnittstellen und Integrationen](02_Anforderungen/02_01_Funktional/Schnittstellen.md)** – APIs, Datenimport, Schema.org
- **[Monitoring/Logging/Versionierung](02_Anforderungen/02_01_Funktional/Monitoring.md)** – ELK-Stack, System-Überwachung
- **[App-Veröffentlichung und Releases](02_Anforderungen/02_01_Funktional/Releases.md)** – CI/CD, Feature-Flags
- **[KI-Integration](02_Anforderungen/02_01_Funktional/KI.md)** – Content-Assistenz, Alt-Text-Generierung, Chatbot
- **[Hilfe und Support](02_Anforderungen/02_01_Funktional/Hilfe.md)** – Dokumentation, Ticketsystem, Onboarding
- **[Datenlöschkonzept (DSGVO)](02_Anforderungen/02_01_Funktional/Daten-Loeschkonzept.md)** – Löschanträge, Archivierung

**Module** ([02_Anforderungen/02_01_Funktional/Module/](02_Anforderungen/02_01_Funktional/Module/)):
- Über 60 Module dokumentiert (News, Events, POIs, Touren, Abfallkalender, Mängelmelder, etc.)
- Jedes Modul mit detaillierten Anforderungen für Content-Erstellung und Verwaltung

#### 2.2 [Nicht-funktionale Anforderungen](02_Anforderungen/02_02_Nicht-funktional/)
Performance, Sicherheit, Skalierbarkeit, Barrierefreiheit, Wartbarkeit

### 3. [Systemarchitektur](03_Systemarchitektur/)
Technische Konzepte für kritische Bereiche:
- **[Umsetzung Rollen & Rechte](03_Systemarchitektur/Umsetzung-Rollen-Rechte.md)** – RBAC, Row-Level Security, Vererbung
- **[User-Generated Content](03_Systemarchitektur/User-Generated-Content.md)** – Moderation, Workflows

### 4. [Roadmap](04_Roadmap/)
**10 Milestones** für die schrittweise Umsetzung:

1. **[Milestone 1: Rollenrechte & MVP](04_Roadmap/Milestone_01.md)**
   Authentifizierung, Rollen-System, News-Modul, Medienverwaltung, DSGVO-Löschkonzept

2. **[Milestone 2: Ablösung der Kernmodule](04_Roadmap/Milestone_02.md)**
   Events, POIs, Touren, Abfallkalender, Suche & Navigation

3. **[Milestone 3: Ablösung der Konfigurationsdateien](04_Roadmap/Milestone_03.md)**
   App-Config UI, E-Mail-Verwaltung, Instanzen-Management, i18n, Theme-Editor, Modul-Management

4. **[Milestone 4: Verwaltung der Schnittstellen](04_Roadmap/Milestone_04.md)**
   API-Manager, GraphQL, REST, Schema.org, GeoJSON-Import

5. **[Milestone 5: Monitoring](04_Roadmap/Milestone_05.md)**
   ELK/OpenSearch, System-Monitoring, Alerting

6. **[Milestone 6: Erweiterte Module & Ökosystem](04_Roadmap/Milestone_06.md)**
   Zusatzmodule, SDK für externe Entwickler

7. **[Milestone 7: Dashboard](04_Roadmap/Milestone_07.md)**
   Analytics, Reporting, Widget-System, KPIs

8. **[Milestone 8: Hilfebereich & Ticketsystem](04_Roadmap/Milestone_08.md)**
   Dokumentation, Onboarding-Tour, Release-Management

9. **[Milestone 9: KI-Assistenz](04_Roadmap/Milestone_09.md)**
   Content-KI, Barrierefreiheits-KI, LLM-Provider-Management

10. **[Milestone 10: Qualitätssicherung & Abschluss](04_Roadmap/Milestone_10.md)**
    Tests, Security-Audits, BSI IT-Grundschutz, Governance, Dokumentation

### 5. Analysen & Berichte
- **[Gap-Analyse: Anforderungen vs. Milestones](Gap-Analyse-Anforderungen-Milestones.md)**
  Abgleich aller Anforderungen mit den 10 Milestones, Identifikation fehlender Features
- **[Anforderungen-Roadmap-Abgleich-Plan](02_Anforderungen/Anforderungen-Roadmap-Abgleich-Plan.md)**
  Methodisches Vorgehen für den systematischen Abgleich

### 6. [Anhang](09_Anhang/)
- BSI-Dokumentation (IT-Grundschutz)
- Standards und Richtlinien

### 7. Arbeitspakete
Alle Arbeitspakete werden strukturiert in **[Arbeitspakete.yml](Arbeitspakete.yml)** erfasst und verwaltet.

## 📊 Projekt-Status

- ✅ **Anforderungsanalyse abgeschlossen** – 19 Kategorien mit 500+ Anforderungen dokumentiert
- ✅ **Roadmap definiert** – 10 Milestones mit detaillierten Bestandteilen
- ✅ **Gap-Analyse durchgeführt** – 61% Abdeckung, 62 fehlende MUSS-Anforderungen identifiziert und in Milestones integriert
- 🔄 **Systemarchitektur** – Ausgewählte kritische Bereiche konzeptioniert
- ⏳ **Umsetzung** – Steht bevor

## 🎯 Kernziele

1. **Ablösung des Legacy-Systems** – Migration von Ruby on Rails zu moderner Architektur
2. **Self-Service für Kommunen** – Keine Server-Konfiguration mehr notwendig
3. **Skalierbarkeit** – Multi-Tenancy, Cloud-ready
4. **Moderne Features** – KI-Assistenz, automatisierte Workflows, umfassendes Monitoring
5. **DSGVO-Compliance** – Vollständige Datenschutz-Konformität
6. **Barrierefreiheit** – WCAG 2.1 AA / BITV 2.0

## 📄 Generierte Dokumente

Das Projekt enthält Scripts zur PDF-Generierung:
- **[CMS-Konzeption-Anforderungen.pdf](CMS-Konzeption-Anforderungen.pdf)** – Alle Anforderungsdokumente
- **[CMS-Konzeption-Roadmap.pdf](CMS-Konzeption-Roadmap.pdf)** – Alle 10 Milestones

Generierung mit: `./generate-pdf.sh`

## 📝 Offene Punkte

Siehe [ToDos.md](ToDos.md) für aktuelle Aufgaben und offene Fragen.
