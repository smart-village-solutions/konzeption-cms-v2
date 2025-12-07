# **Milestone 8: Hilfebereich & Ticketsystem**

**Status:** 🔴 Geplant

## Kurzbeschreibung

Ein integrierter Hilfe- und Supportbereich ermöglicht Schulungen, Dokumentation und direkte Supportanfragen innerhalb des CMS.

## Ziele & Mehrwert

* **Geschäftsziel:** Reduktion der Supportkosten, bessere Kundenzufriedenheit.
* **Technisches Ziel:** Aufbau eines Docs-Systems sowie Ticket-Workflow.
* **Nutzerziel:** Kommunen finden Hilfe schnell und einfach und können Support strukturiert anfragen.

## Bestandteile

### Hilfe & Dokumentation (bestehend)
* Dokumentationssystem (Markdown-basiert)
* Suchfunktion
* Ticket-System
* Tutorials & Onboarding

### Onboarding und Benutzerführung **[MUSS]**
* **Interaktiver Onboarding-Tour:**
  * Schritt-für-Schritt-Anleitung beim ersten Login (First-Time User Experience)
  * Highlight wichtiger UI-Elemente mit Overlay und Erklärungen
  * Tooltips mit "Nächster Schritt" und "Überspringen"-Buttons
  * Kontextbezogene Hilfe: Erklärungen basierend auf aktuellem Modul/Bereich
  * Fortschrittsanzeige: Schritte 1-5 von 10 abgeschlossen
  * Tour-Themen: Dashboard-Überblick, Erste Inhalte erstellen, Rechte-Management, Wichtige Einstellungen
  * Wiederholung möglich: "Tour erneut starten"-Funktion im Hilfe-Menü
  * Multi-Sprachen-Support für Onboarding-Inhalte
  * Analytics: Tracking welche Schritte abgeschlossen/übersprungen werden
  * Personalisierung: Rolle-basierte Tour-Inhalte (Admin sieht andere Schritte als Redakteur)

* **Guided Walkthroughs für komplexe Aufgaben:**
  * Assistenten für häufige Workflows (z.B. "Erste Veranstaltung anlegen", "Design anpassen")
  * Split-Screen: Anleitung links, Arbeitsbereich rechts
  * Validierung von Eingaben während Walkthrough
  * "Best Practices"-Hinweise integriert
  * Optional: Video-Tutorials eingebettet in Walkthrough

* **Contextual Help (Kontexthilfe):**
  * "?"-Icon in jedem Formularfeld für Feld-spezifische Hilfe
  * Sidebar mit Hilfe-Inhalten basierend auf aktueller Seite
  * "Need help?"-Widget im Footer (immer verfügbar)
  * Quick-Links zu relevanten Dokumentations-Artikeln

### Release-Management und Release-Historie (NEU)
* **Versionsverwaltung des CMS:**
  * Anzeige der aktuellen CMS-Version
  * Historie aller installierten Versionen
  * Semantic Versioning (Major.Minor.Patch)
  * Release-Datum und Release-Status
* **Release Notes & Changelogs:**
  * Markdown-basierte Release Notes pro Version
  * Kategorisierung: Neue Features, Verbesserungen, Bugfixes, Breaking Changes, Sicherheit
  * Verlinkung zu Issues/Tickets
  * Migration Guides bei Breaking Changes
  * Automatische Benachrichtigung bei neuen Releases
* **Geplante Releases:**
  * Roadmap zukünftiger Releases
  * Release-Zeitplan (geplantes Datum)
  * Feature-Liste pro Release
  * Beta/RC-Versionen kennzeichnen
* **Rollback-Mechanismen:**
  * Rollback auf vorherige Version
  * Backup vor Update automatisch erstellen
  * Datenbank-Migrations-Rollback
  * "Emergency Rollback"-Funktion für kritische Situationen
  * Rollback-Log: Wer hat wann welche Version zurückgerollt
* **Feature-Flags-Management:**
  * Zentrale Übersicht aller Feature-Flags
  * Aktivieren/Deaktivieren von Features pro Instanz oder global
  * Rollout-Strategien: Alle, Prozentsatz, spezifische Instanzen, A/B-Testing
  * Feature-Flag-Historie (wann wurde was aktiviert/deaktiviert)
  * Abhängigkeiten zwischen Features (Flag A erfordert Flag B)
  * Ablaufdatum für temporäre Flags
* **Update-Prozess:**
  * Update-Benachrichtigungen für Administratoren
  * Pre-Update-Checks (Kompatibilität, Backup vorhanden, etc.)
  * Wartungsmodus während Update
  * Update-Log mit allen Schritten
  * Post-Update-Validierung
* **Kompatibilitäts-Matrix:**
  * Kompatibilität mit Drittanbieter-Modulen
  * API-Versionen und Deprecations
  * Datenbank-Versionen (PostgreSQL, etc.)
  * Node.js/Runtime-Anforderungen
* **Release-Automatisierung:**
  * CI/CD-Integration
  * Automatische Changelog-Generierung aus Git-Commits
  * Automatisierte Tests vor Release
  * Release-Approval-Workflow

---
