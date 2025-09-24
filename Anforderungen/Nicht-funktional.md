# Nicht-funktionale Anforderungen

Die Qualität und Nachhaltigkeit von CMS 2.0 wird maßgeblich durch nicht-funktionale Anforderungen bestimmt. Diese Anforderungen definieren, wie das System unabhängig von konkreten Funktionen beschaffen sein muss, damit es langfristig zuverlässig, sicher und nutzerfreundlich betrieben werden kann.

## 1. Qualität und Zuverlässigkeit

* **Performance**

  * Inhalte und Redaktionsprozesse sollen schnell und ohne wahrnehmbare Verzögerungen ausgeführt werden.
  * **Messkriterium:** Antwortzeiten im Backend ≤ 500 ms bei 95 % aller Anfragen; Seitenaufbau im Frontend ≤ 2 Sekunden.
* **Verfügbarkeit und Ausfallsicherheit**

  * Das System soll hochverfügbar sein und Redundanzen bieten, sodass auch bei Störungen ein stabiler Betrieb gewährleistet ist.
  * **Messkriterium:** Jahresverfügbarkeit ≥ 99,5 %; Recovery Time Objective (RTO) < 4 Stunden.
* **Zuverlässigkeit**

  * Fehler in der Verarbeitung müssen minimiert und klar behandelt werden.
  * **Messkriterium:** Keine ungefangenen Exceptions im Produktivbetrieb; dokumentierte Fehlerbehandlung mit Logs.
* **Skalierbarkeit**

  * Das System muss für kleine Gemeinden wie auch für große Landkreise performant laufen.
  * **Messkriterium:** Unterstützt ≥ 1.000 gleichzeitige Nutzer\:innen und ≥ 500.000 Inhaltsobjekte ohne Performanceeinbruch.

## 2. Betrieb und Wartung

* **Wartbarkeit**

  * Klare Architektur und saubere Code-Strukturen ermöglichen einfache Weiterentwicklung.
  * **Messkriterium:** Technische Dokumentation vollständig; Code-Komplexität (Cyclomatic Complexity) < 15 pro Funktion.
* **Erweiterbarkeit**

  * Modulare Architektur (API-first, Plugin-Ansatz) für zukünftige Funktionen.
  * **Messkriterium:** Neue Module können ohne Änderungen am Core integriert werden.
* **Einfache Installation und Betrieb**

  * Auch kleinere Kommunen oder externe Dienstleister sollen das System betreiben können.
  * **Messkriterium:** Installation in < 2 Stunden auf einer Standard-VM; vollständige Installationsanleitung verfügbar.
* **Selfhosting-Möglichkeit**

  * Betrieb durch Kommunen oder Partner möglich.
  * **Messkriterium:** Bereitstellung von Docker-Compose-Setup.
* **Dokumentation**

  * Vollständige, verständliche Dokumentation für Admins, Redakteur\:innen und Entwickler\:innen.
  * **Messkriterium:** Handbücher (Online), API-Dokumentation und Tutorials vorhanden.

## 3. Sicherheit und Datenschutz

* **IT-Sicherheit**

  * Einhaltung einschlägiger Standards (BSI-Grundschutz, IT-Sicherheits-Leitlinien).
  * **Messkriterium:** Erfolgreicher Penetrationstest vor Livegang; regelmäßige Sicherheitsupdates.
* **Datenschutz & DSGVO-Konformität**

  * Rechtskonforme Verarbeitung personenbezogener Daten inkl. Audit-Logs und Löschkonzept.
  * **Messkriterium:** Datenschutzfolgeabschätzung (DSFA) dokumentiert; Audit-Logs mindestens 6 Monate vorgehalten.
* **Fehlerbehandlung**

  * Sichere Protokollierung und Behandlung von Fehlern.
  * **Messkriterium:** 100 % der Fehler mit Statuscodes > 400 werden im Monitoring erfasst.
* **Testabdeckung**

  * Hohe Testabdeckung zur Sicherung der Stabilität.
  * **Messkriterium:** ≥ 80 % automatisierte Testabdeckung (Unit & Integration Tests); 100 % kritische Funktionen getestet.

## 4. Nutzerfreundlichkeit

* **Gestaltung**

  * Light and Dark Mode
  * Anpassbares Logo basierend auf dem App-Icon
  * 
  

* **Usability**

  * Intuitive und leicht erlernbare Bedienung.
  * **Messkriterium:** Nutzer\:innen benötigen < 2 Stunden Einarbeitung für Basisfunktionen; Usability-Test mit SUS-Score ≥ 75.
* **Barrierefreiheit**

  * BITV- und WCAG-konform.
  * **Messkriterium:** BITV-Test (Selbstbewertung) mit mindestens 90/100 Punkten.
* **Benutzerfreundlicher Editor**

  * Inhalte sollen einfach erstellt werden können.
  * **Messkriterium:** Mindestens 80 % der Testpersonen bewerten die Inhaltsbearbeitung als „einfach“ oder „sehr einfach“.
* **Lokalisierung**

  * Unterstützung mehrerer Sprachen und regionaler Anpassungen.
  * **Messkriterium:** UI in mindestens Deutsch und Englisch vollständig verfügbar.

## 5. Interoperabilität und Integration

* **Offene Standards**

  * Schnittstellen auf Basis etablierter Standards (REST/GraphQL, JSON, XML etc.).
  * **Messkriterium:** Alle API-Endpunkte sind dokumentiert.
* **Kompatibilität**

  * Anbindung an externe CMS, urbane Datenplattformen und Tourismus-Systeme.
  * **Messkriterium:** Erfolgreicher Integrationstest mit mindestens zwei externen Systemen.
* **Integration**

  * Nahtloses Zusammenspiel mit kommunalen Anwendungen.
  * **Messkriterium:** Import/Export von Standardformaten (RSS, Open311, xZuFi) funktioniert ohne manuelle Nachbearbeitung.

## 6. Governance und Nachhaltigkeit

* **Open Source**

  * Offener Quellcode und transparente Governance.
  * **Messkriterium:** Code auf öffentlicher Plattform (z. B. GitHub oder OpenCode.de); Lizenz klar ausgewiesen (z. B. EUPL oder GPLv3).
* **Zeitgemäße Software-Architektur**

  * Moderne Frameworks sichern Zukunftsfähigkeit.
  * **Messkriterium:** Architektur-Review abgeschlossen; CI/CD-Pipeline vorhanden.
* **Design-Standards**

  * Interface entspricht etablierten Vorgaben.
  * **Messkriterium:** Abnahme durch UX-/Design-Review erfolgreich.
