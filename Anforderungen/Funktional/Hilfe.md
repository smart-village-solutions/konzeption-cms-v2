# Anforderungen: Hilfe- und Support-System

Dieses Kapitel beschreibt die Anforderungen an das integrierte Hilfe- und Support-System im CMS 2.0.

## Community-getriebene Hilfeartikel

* Das CMS soll **Hilfeartikel direkt in der Oberfläche** anzeigen können, die aus einem öffentlichen GitHub-Repository geladen werden.
* Diese Artikel werden **von der Community gepflegt** – Anwender:innen, Dienstleister und die Kernentwicklung können gemeinsam Anleitungen, FAQ und Best Practices beisteuern.
* Die Hilfe soll **kontextsensitiv** sein: Wer gerade ein Modul konfiguriert oder einen Content-Typ bearbeitet, bekommt passende Artikel direkt angezeigt (z. B. „Wie richte ich den Abfallkalender ein?").
* Änderungen am GitHub-Repository (neue Artikel, Korrekturen, Übersetzungen) werden **automatisch ins CMS übernommen**, ohne dass Administrator:innen manuell eingreifen müssen.
* Nutzer:innen können direkt aus der Hilfe heraus **Verbesserungsvorschläge** ans Repository melden oder selbst Beiträge einreichen (Pull Requests).

---

## Integriertes Ticketsystem

* Berechtigte Nutzer:innen sollen **direkt aus dem CMS heraus Support-Tickets öffnen** können, wenn sie auf Probleme stoßen oder Fragen haben, die über die Hilfe-Artikel hinausgehen.
* Das CMS verbindet sich dafür mit dem **Ticketsystem des Dienstleisters** (z. B. Jira, GitHub Issues, Zammad oder ähnliche Systeme).
* Beim Erstellen eines Tickets werden **relevante Kontextinformationen automatisch mitgesendet**: Welches Modul war geöffnet? Welche Aktion wurde versucht? Welche Browser-/System-Version wird genutzt?
* Nutzer:innen können den **Status ihrer Tickets einsehen**, Rückfragen beantworten und Lösungen direkt im CMS nachverfolgen, ohne das System wechseln zu müssen.
* Administrator:innen und Support-Manager:innen erhalten eine **Übersicht aller offenen Tickets** ihrer Organisation, können Tickets priorisieren und bei Bedarf eskalieren.
* Das System soll **Benachrichtigungen** senden, wenn ein Ticket bearbeitet, kommentiert oder geschlossen wurde.

---

## CMS-Einführung für Erst-User

* Nutzer:innen, die sich **zum ersten Mal anmelden**, werden durch eine **interaktive Einführung** geleitet (Onboarding-Tour).
* Die Einführung erklärt Schritt für Schritt:
  * Wo finde ich welche Funktionen? (Navigation, Dashboard, wichtige Module)
  * Wie erstelle ich meinen ersten Inhalt? (z. B. News-Artikel, Event)
  * Wo kann ich mein Profil anpassen? (Passwort, Sprache, Benachrichtigungen)
  * Wie funktioniert die Zusammenarbeit im Team? (Rollen, Freigabeprozesse)
* Die Tour soll **optional und jederzeit überspringbar** sein – erfahrene Nutzer:innen werden nicht gezwungen, sie anzusehen.
* Nach Abschluss der Einführung können Nutzer:innen die Tour **jederzeit erneut starten**, falls sie eine Auffrischung brauchen.
* Administrator:innen können **eigene Onboarding-Schritte** hinzufügen, die spezifisch für ihre Organisation oder ihre Workflows sind (z. B. „So reichst du Inhalte zur Freigabe ein").

---

## Volltextsuche in der Hilfe

* Das CMS bietet eine **Volltextsuche über alle Hilfeartikel**, damit Nutzer:innen schnell Antworten auf ihre Fragen finden.
* Die Suche soll **Vorschläge während der Eingabe** anzeigen (Auto-Suggest) und häufig gesuchte Begriffe priorisieren.
* Suchergebnisse werden **nach Relevanz sortiert** – Artikel, die zum aktuellen Kontext passen (z. B. gerade geöffnetes Modul), erscheinen weiter oben.
* Nutzer:innen können Suchergebnisse **filtern** (z. B. nach Thema, Modul, Zielgruppe) und **bewerten**, ob ein Artikel hilfreich war („War diese Antwort nützlich?").
* Die Suche durchsucht nicht nur die Hilfe-Artikel, sondern auch:
  * **Offizielle Dokumentation** (z. B. technische Handbücher, API-Referenzen)
  * **Community-Beiträge** (z. B. Foren-Threads, wenn verfügbar)
  * **Bekannte Fehlermeldungen** und deren Lösungen
* Wenn keine passenden Ergebnisse gefunden werden, wird den Nutzer:innen angeboten, **direkt ein Support-Ticket zu öffnen** oder eine Frage in der Community zu stellen.

---

## Release Notes & Changelog

* Das CMS zeigt **direkt im System einsehbare Release Notes** an, damit Nutzer:innen jederzeit nachvollziehen können, was sich geändert hat.
* Nach einem Update werden Nutzer:innen beim nächsten Login auf **neue Features und wichtige Änderungen** hingewiesen – kurz und verständlich formuliert.
* Die Release Notes enthalten **Links zu den passenden Hilfeartikeln**, sodass Nutzer:innen neue Funktionen direkt ausprobieren und verstehen können.
* Neben neuen Features werden auch **Bugfixes, Verbesserungen und Breaking Changes** dokumentiert, damit Administrator:innen und Power-User:innen gut informiert sind.
* Die Release Notes sind **dauerhaft einsehbar** in einem eigenen Bereich (z. B. „Neuigkeiten" oder „Changelog"), nicht nur beim ersten Login nach einem Update.
* Nutzer:innen können selbst entscheiden, ob sie **Benachrichtigungen zu neuen Versionen** per E-Mail oder In-App-Nachricht erhalten möchten.

---

## Mehrsprachigkeit und Barrierefreiheit

* Alle Hilfeartikel und die Einführungs-Tour sollen **mehrsprachig** verfügbar sein – mindestens Deutsch und Englisch.
* Die Suche erkennt automatisch die **Sprache der Nutzer:innen** und zeigt passende Artikel an.
* Das Hilfe-System muss **barrierefrei** sein (WCAG 2.1 Level AA): Screenreader-Unterstützung, Tastaturnavigation, kontrastreiche Darstellung.
* Videos und interaktive Elemente der Onboarding-Tour benötigen **Untertitel und Transkripte**.

---

## Feedback und kontinuierliche Verbesserung

* Nutzer:innen können zu jedem Hilfeartikel **Feedback geben**: „War dieser Artikel hilfreich? Ja / Nein / Teilweise".
* Bei negativem Feedback öffnet sich ein optionales Textfeld, in dem Nutzer:innen beschreiben können, was gefehlt hat oder unklar war.
* Dieses Feedback wird an die **Community und das Redaktionsteam** weitergeleitet, damit Artikel kontinuierlich verbessert werden.
* Administrator:innen erhalten **regelmäßige Reports**, welche Hilfeartikel am häufigsten gesucht, am besten bewertet oder am meisten kritisiert wurden.
* Das System soll **automatisch vorschlagen**, welche Artikel überarbeitet oder neu erstellt werden sollten – basierend auf Suchanfragen ohne Treffer, häufigen Support-Tickets oder schlechten Bewertungen.
