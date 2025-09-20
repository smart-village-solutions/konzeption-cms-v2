# Einleitung

Mit dem Projekt „CMS 2.0“ modernisieren wir das Redaktionssystem der Smart Village App grundlegend. Ziel ist eine integrierte Plattform, die Content-Management, Benutzerverwaltung, App-Design, Module und Schnittstellen in einem nutzerfreundlichen, sicheren und erweiterbaren System vereint.

Das vorliegende Konzept beschreibt die funktionalen und nicht-funktionalen Anforderungen sowie die allgemeine Systemarchitektur. Es dient als Grundlage, das Gesamtprojekt in klar abgegrenzte Arbeitspakete zu gliedern, die eigenständig beauftragt werden können und zugleich einen erkennbaren Beitrag zum gemeinsamen Ziel leisten.

## Zielsetzung

Das aktuelle Redaktionssystem stößt zunehmend an seine Grenzen: Redaktionsprozesse sind umständlich, Konfigurationsmöglichkeiten eingeschränkt, Erweiterungen nur schwer möglich, während Anforderungen an Datenschutz, Integration und Benutzerfreundlichkeit steigen.

CMS 2.0 setzt hier an und schafft **nachhaltigen Mehrwert** für die Kommunen:

* **Einfachere tägliche Arbeitsabläufe** für Verwaltung und Ehrenamt,
* **individuelle Gestaltungsmöglichkeiten** für Design und Module,
* eine **modulare Architektur** für zukünftige Erweiterungen,
* **DSGVO-konforme Datenspeicherung** und
* eine **verbesserte Integration** in kommunale Systeme.

Damit fördert das Projekt Beteiligung, Innovation und vor allem die **digitale Souveränität der Kommunen**.

### Erfolgskriterien

Das Projekt gilt als erfolgreich, wenn:

1. **Anwender\:innen** ihre tägliche Arbeit spürbar einfacher, schneller und sicherer erledigen können und das System durch verständliche Dokumentation und Schulungsmaterialien leicht zugänglich ist.
2. **Technisch** eine stabile, sichere und erweiterbare Architektur entsteht, die zukünftige Module, Schnittstellen und Drittanbieter-Integrationen ermöglicht.
3. **Community und Kommunen** sich mit dem Ergebnis identifizieren, weil sie im Prozess wirksam eingebunden waren – durch Ideen, Tests oder finanzielle Beiträge.

Darüber hinaus trägt CMS 2.0 dazu bei, den **Betrieb und die Skalierbarkeit der Smart Village App langfristig zu sichern**: durch geringere laufende Aufwände, mehr Unabhängigkeit und bessere Voraussetzungen für eine Nachnutzung durch weitere Kommunen.


## Zielgruppen

Das neue Redaktionssystem der Smart Village App soll die Bedürfnisse und Anforderungen eine Vielzahl unterschiedlicher Stakeholder:innen erfüllen. Auch wenn im praktischen Alltag die Rollen gerade in kleinen Kommunen häufig gebündelt werden, führen wir sie hier zunächst getrennt auf.

### System-Administrator:innen

- **Typische Vertreter:**
  - IT-Abteilung der Verwaltung
  - Externe Technikdienstleister oder Systemhäuser
- **Technischer Sachverstand:**
  - Sehr hoch – Kenntnisse in Serveradministration, Datenbanken, Nutzer- und Rechteverwaltung
  - Erfahrung mit Sicherheit, Backup und Update-Prozessen
- **Anforderungen an das System:**
  - Hohe Stabilität und Sicherheit
  - Klare Rollen- und Rechtekonzepte
  - Übersichtliche Admin-Tools, Logging- und Monitoring-Funktionen

### App-Manager:innen

- **Typische Vertreter:**
  - Digitalisierungsbeauftragte in der Verwaltung
  - Projektleiter:innen für die App
  - Externe Technikdienstleister oder Systemhäuser
- **Technischer Sachverstand:**
  - Mittel bis hoch – Grundverständnis für Backend, aber keine tiefen IT-Kenntnisse
  - Fokus auf Steuerung, Koordination, nicht auf Programmierung
- **Anforderungen an das System:**
  - Intuitives Dashboard mit Überblick über Module, Inhalte und Statistiken
  - Werkzeuge zur Steuerung und Koordination (z. B. Freigabeprozesse, Nutzungsberichte)
  - Einfache Möglichkeiten, Rollen zuzuweisen

### Feature-Manager:innen

- **Typische Vertreter:**
  - Verwaltungsmitarbeiter:innen in Fachabteilungen (z. B. Abfallwirtschaft, Tourismus, Verkehr)
  - Projektkoordinator:innen
  - Externe Technikdienstleister oder Systemhäuser
- **Technischer Sachverstand:**
  - Mittel – können Systeme konfigurieren, aber brauchen klare Anleitungen
  - Erfahrung in Fachsoftware, aber keine tiefe IT-Administration
- **Anforderungen an das System:**
  - Konfigurierbare Module (z. B. Müllkalender, Schadensmelder, Veranstaltungsplan)
  - Flexible Schnittstellen zu Fachsystemen
  - Übersichtliche und einfach bedienbare Konfigurationsmasken

### Designer:innen

- **Typische Vertreter:**
  - Öffentlichkeitsarbeit / Pressestellen
  - Externe Agenturen für Design & Kommunikation oder Systemhäuser
- **Technischer Sachverstand:**
  - Mittel – sehr fit in Grafik- und CMS-Systemen, aber weniger in technischer Administration
  - Fokus auf Design-Tools (z. B. Adobe, Canva, CMS)
- **Anforderungen an das System:**
  - Möglichkeit, Layout, Menüführung und Farbwelten anzupassen
  - Unterstützung von Corporate Design (Logos, Templates, Styleguides)
  - Vorschau- und Testfunktionen vor Veröffentlichung

### Schnittstellen-Manager:innen

- **Typische Vertreter:**
  - IT-Abteilung
  - Fachverantwortliche für Verkehr, Tourismus oder Stadtwerke
  - Externe Technikdienstleister oder Systemhäuser
- **Technischer Sachverstand:**
  - Hoch – Kenntnisse in API-Anbindungen, Datenformaten (XML, JSON, CSV)
  - Erfahrung mit Systemintegration und Prozessautomation
- **Anforderungen an das System:**
  - Offene Schnittstellen (APIs, Standards)
  - Dokumentation und Support für Integrationen
  - Monitoring und Fehlerprotokollierung bei Datenflüssen

### Redakteur:innen

- **Typische Vertreter:**
  - Öffentlichkeitsarbeit, Pressestellen
  - Redaktionelle Mitarbeiter:innen in der Verwaltung
  - Externe Redaktionsbüros
- **Technischer Sachverstand:**
  - Gering bis mittel – vertraut mit CMS-Systemen und Textarbeit, weniger IT
  - Starker Fokus auf Inhalte, Sprache, Rechtschreibung
- **Anforderungen an das System:**
  - Einfache Text- und Bildbearbeitung im Backend
  - Klare Workflows (z. B. Freigabe durch Redaktion)
  - Übersichtliche Struktur für Inhalte (Archiv, Versionierung)

### Moderator:innen und Supporter

- **Typische Vertreter:**
  - Community-Manager in der Verwaltung
  - Ehrenamtliche Multiplikatoren, z. B. Vereinslotsen
- **Technischer Sachverstand:**
  - Gering bis mittel – fit in Nutzung der App, wenig IT-Background
  - Schulungs- und Kommunikationserfahrung
- **Anforderungen an das System:**
  - Einfache Nutzerbetreuung (z. B. Passwort-Reset, Hilfetexte)
  - Übersichtliche Kontaktmöglichkeiten
  - Möglichkeit, Feedback aus der Community einzusehen und weiterzuleiten

### Inhaltsersteller:innen

- **Typische Vertreter:**
  - Mitarbeiter in den unterschiedlichen Fachabteilungen (Öffentlichkeitsarbeit, Personal, Wirtschafts- oder Kulturförderung, Tiefbau, ...)
  - Vereine, Unternehmen, Schulen, Tourismusbüros
- **Technischer Sachverstand:**
  - Gering bis mittel – fit in Office-Programmen und Social Media, aber keine IT-Profis
- **Anforderungen an das System:**
  - Sehr einfache Bedienung („wie Facebook posten“)
  - Klare Struktur (wohin poste ich was?)
  - Eingeschränkte Rechte (nur eigener Bereich, keine Fremdinhalte)

### Werbeverantwortliche und strategische Entscheider:innen

- **Typische Vertreter:**
  - Bürgermeister:innen
  - Leiter:innen von Marketing, Wirtschaftsförderung, Tourismus
  - Externe Beratungs- oder Systemhäuser
- **Technischer Sachverstand:**
  - Gering – Fokus liegt nicht auf Technik, sondern auf Strategie
  - Erfahrung mit Kommunikation und politischen Prozessen
- **Anforderungen an das System:**
  - Übersichts-Dashboards mit KPIs (Nutzung, Reichweite, Engagement)
  - Steuerung von Kampagnen und Anzeigen
  - Planbare Ressourcen- und Budgetverwaltung

## Abgrenzung und Kontext

### Eingeschlossen

CMS 2.0 umfasst die vollständige Neuentwicklung des Redaktionssystems der Smart Village App. Ziel ist ein modernes, benutzerfreundliches Werkzeug zur Inhaltspflege, App-Konfiguration (Farben, Kacheln, Logos) und rollenbasierten Rechtevergabe. Bestehende Funktionen wie Medienverwaltung, Vorschau und zeitgesteuerte Veröffentlichungen werden überarbeitet und erweitert. Das System basiert auf der bestehenden GraphQL-API, wird punktuell ergänzt und legt die technische Grundlage für ein zukünftiges Plugin-System. Datenschutz, IT-Sicherheit und DSGVO-Konformität sind integraler Bestandteil. Ergänzend entstehen UX-Prototypen, begleitende Nutzertests sowie eine verständliche Dokumentation und Schulungsmaterialien.

### Ausgeschlossen

Die mobile App selbst wird im Projekt nicht überarbeitet. Auch ein vollständiger Plugin-Marktplatz ist nicht Teil des Umfangs – lediglich dessen technische Basis wird vorbereitet. Eine umfassende Neustrukturierung der API oder der Datenhaltung ist nicht vorgesehen. Individuelle Anbindungen an kommunale Fachverfahren (z. B. DMS) werden nicht umgesetzt, aber perspektivisch mitgedacht. Der laufende Betrieb oder Hosting einzelner Instanzen ist nicht Bestandteil des Projekts.

### Kontext

Die Smart Village App wird bereits von zahlreichen Kommunen und kommunalen Unternehmen eingesetzt – von kleinen, amtszugehörigen Gemeinden bis hin zu Großstädten und Landkreisen. Die digitale Infrastruktur dieser Institutionen ist dabei sehr heterogen: Manche Kommunen pflegen ihre Inhalte umfassend über das bestehende CMS der Website, andere verfügen über spezialisierte Systeme wie Urbane Datenplattformen oder Tourismus Data Hubs. In einigen Fällen soll das neue CMS der Smart Village App sogar für die Verwaltung weiterer Inhalte genutzt werden, während bei anderen bislang keinerlei Strukturen existieren und unser System alle Aufgaben eigenständig übernehmen muss.

Diese Vielfalt macht ein flexibles, modulares und integrationsfähiges System erforderlich, das sich sowohl als eigenständige Lösung betreiben lässt als auch nahtlos in bestehende IT-Landschaften eingebunden werden kann. Zugleich soll das CMS nach dem Prinzip API-first als Headless-System ausgelegt sein, um Inhalte effizient und medienübergreifend (App, Web, Displays, Sprachassistenten) bereitzustellen.

Die Finanzierung des neuen CMS erfolgt verteilt über verschiedene Akteure der Smart Village App-Anwendergemeinschaft. Daraus ergibt sich die Notwendigkeit, das Gesamtvorhaben in Teilprojekte zu strukturieren, die jeweils einen klaren Mehrwert bieten, eigenständig beauftragt werden können und zugleich auf das gemeinsame Ziel einzahlen. Solche Teilprojekte können thematisch abgegrenzt sein (z. B. eine Admin-Oberfläche für ein bestimmtes Modul) oder als wiederverwendbare technische Komponenten konzipiert werden (z. B. ein Bild-Upload mit automatischer Größenoptimierung). Eine Roadmap-Logik mit Kernmodulen, optionalen Erweiterungen und Enabler-Komponenten sorgt für Transparenz und ermöglicht, unterschiedliche Finanzierungsinteressen zu vereinen.

Wesentlich ist zudem die Berücksichtigung externer Anforderungen. Dazu gehören unter anderem:

- die [IT-Sicherheits-Leitlinie](https://docs.fitko.de/fit/policies/informationssicherheitsleitlinie/)
- der [BSI-Grundschutz](https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/IT-Grundschutz-Kompendium/it-grundschutz-kompendium_node.html)
- die [Barrierefreie-Informationstechnik-Verordnung (BITV)](https://docs.fitko.de/fit/policies/barrierefreie-informationstechnikverordnung/)
- die [Föderalen IT-Architekturrichtlinien](https://docs.fitko.de/fit/policies/foederale-it-architekturrichtlinien/)
- die [Datenschutzgrundverordnung (DSGVO)](https://dsgvo-gesetz.de/)
- die [Vorgaben zu Open Source in den Modellprojekten Smart Cities](https://www.smart-city-dialog.de/regelungen-zu-open-source-fuer-modellprojekte-smart-cities)
- die Einhaltung und Kompatibilit zu externen Datenstandards (xZuFi, OParl, Open311, schema.org, ...)

Das Projekt folgt dem Anspruch, ein „echtes Open-Source-Projekt“ zu sein. Dies bedeutet:

- eine offene Governance-Struktur mit transparenten Entscheidungsprozessen,
- eine aktive Einbindung der Community und die Möglichkeit zu Contributions,
- eine klare Lizenzstrategie (z. B. EUPL oder AGPL) sowie
- eine nachhaltige Organisation des Betriebs über die Förderphase hinaus.
