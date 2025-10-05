# Anforderungen: Benutzer- und Rechteverwaltung

Dieses Kapitel beschreibt die Anforderungen an die Benutzer- und Rechteverwaltung im CMS 2.0.

## Rollen- und Rechtemanagement

* Das System muss erlauben, **fein abgestufte Rechte** zu vergeben: Wer darf was sehen, bearbeiten oder freigeben? Dies soll bis auf Ebene einzelner Module oder Funktionen möglich sein.
* Es muss möglich sein, **eigene Rollen** (z. B. „Vereinsredakteur“ oder „Fachadmin Tourismus“) anzulegen und flexibel zu gestalten.
* Rechte sollen sich **vererben** können – zum Beispiel, dass eine Landkreisrolle automatisch auch für die Gemeinden gilt.
* Der **Zugriff auf Inhalte und Module** soll sowohl an einzelne Personen als auch an bestimmte Rollen gebunden werden können.
* **Änderungen an Rechten** müssen automatisch dokumentiert werden, damit später nachvollziehbar ist, wer wann etwas geändert hat.
* Jede Rollen- oder Rechteänderung soll einen **konfigurierbaren Genehmigungsworkflow** durchlaufen (Vier-Augen-Prinzip, Eskalationsstufen, automatische Benachrichtigungen).
* Administrator:innen sollen bei wichtigen Änderungen an Rollen und Rechten **Benachrichtigungen** erhalten.
* Für Supportfälle sollen Administrator:innen die Möglichkeit haben, die **Rolle eines Nutzers temporär zu übernehmen**, um Fehler nachzustellen oder Hilfestellung zu leisten.
* Wenn ein Inhalt von mehreren Personen bearbeitet werden darf, muss es einen **klaren Besitzer** geben. Dieser entscheidet, wer mitarbeiten darf. Können andere Personen nicht direkt Änderungen vornehmen, soll es die Möglichkeit geben, **Änderungsanträge** einzureichen. Der Besitzer entscheidet dann, ob er diese annimmt oder ablehnt.

---

## Authentifizierung und Sicherheit

* Nutzer:innen sollen sich sicher anmelden können, zum Beispiel mit einer **Zwei-Faktor-Authentifizierung** oder mit modernen Verfahren wie **Passkeys**.
* Das CMS nutzt einen **zentralen Anmeldedienst (Keycloak)**, damit sich Personen nur ein einziges Mal anmelden müssen und denselben Zugang auch in anderen Anwendungen nutzen können.
* Für Kommunen mit bestehender Identity-Infrastruktur muss das System **Single-Sign-on via SAML/OIDC** unterstützen (z. B. Kommunal-AD, BundID, Servicekonto).
* Es gelten verbindliche **Passwort- und Passkey-Richtlinien** (Mindestlänge, Rotation, gesperrte Wiederverwendung). Self-Service-Reset und Fallback-Codes müssen revisionssicher dokumentiert werden.
* Sicherheitsrelevante Ereignisse (fehlgeschlagene Logins, Gerätewechsel, Policy-Verstöße) lösen **konfigurierbare Alerts** aus und können an SIEM-Systeme angebunden werden.
* **Inaktive Konten** sollen nach einer definierten Zeitspanne automatisch gesperrt werden, um Missbrauch vorzubeugen.

---

## Benutzer-Accounts und Profile

* Jede Person soll einen **eigenen Zugang** haben, der einer Organisation oder Gruppe zugeordnet werden kann.
* Der Zugang zur App und zum CMS soll **einheitlich** erfolgen – niemand soll sich zwei verschiedene Logins merken müssen.
* Nutzer:innen sollen ihr **Profil selbst verwalten** können, etwa ihr Passwort ändern oder ihre Kontaktdaten aktualisieren.
* Es muss eine **klare Trennung** zwischen internen Nutzerkonten und externen Datenlieferanten geben, damit Verantwortlichkeiten eindeutig sind.
* Onboarding erfolgt über einen **standardisierten Aufnahmeprozess** (Einladung, Antrag, Freigabe durch Verantwortliche) inklusive verpflichtender Schulungs-/Nutzungsbestätigung.
* Offboarding muss automatisiert sicherstellen, dass **alle Rollen, Tokens, Gerätebindungen und Zugänge** einer Person entzogen und Inhalte neu zugewiesen werden.
* Für Vertretungen und Urlaubsübergaben sollen **temporäre Vertretungsrechte** mit Ablaufdatum hinterlegt werden können.

---

## Datenschutz und Compliance

* Das System muss ein **Löschkonzept** bieten, damit personenbezogene Daten bei Bedarf vollständig und nachweisbar entfernt werden können.
* Nutzer:innen müssen ihre Daten auf Wunsch **DSGVO-konform exportieren** können.
* Das System soll an **regelmäßige Überprüfungen** erinnern – zum Beispiel, ob Nutzerkonten noch aktiv gebraucht werden oder ob Inhalte aktualisiert werden müssen.
* Alle sicherheits- oder datenschutzrelevanten Aktionen werden in einem **unveränderbaren Audit-Log** mit Exportfunktion (CSV/JSON) festgehalten und können revisionssicher archiviert werden.
* Verantwortliche benötigen **Reporting-Dashboards** (z. B. aktive Accounts pro Organisation, offene Rechteanträge, Audit-Findings) samt CSV-/BI-Export.

---

## Organisation und Struktur

* Die Benutzer- und Rechteverwaltung muss **mehrstufige Organisationsstrukturen** abbilden können. So können Rollen und Rechte über Landkreis, Region, Gemeinde und Ortsteil hinweg konsistent und nachvollziehbar vergeben werden.
* Eine Person kann in **mehreren Organisationen** tätig sein. Sie kann entscheiden, ob sie Inhalte als Privatperson oder im Namen einer ihrer zugeordneten Organisationen veröffentlicht.
* Um die Privatsphäre zu schützen, sollen Organisationen die Möglichkeit haben, festzulegen, ob Redakteur:innen **mit ihrem Namen** oder **immer anonym** im Namen der Organisation posten.
* Falls die Namensnennung erlaubt ist, muss jede:r Redakteur:in diese Funktion **selbst aktiv freischalten** ("Privacy by Default").
* Der Beitritt zu einer Organisation soll **zentral gesteuert** werden können, entweder über ein **Einladungsprinzip** (Einladungen werden von bestehenden Administrator:innen oder Inhaber:innen verschickt) oder über ein **Bewerbungsprinzip** (Nutzer:innen können sich initiativ bewerben).
* Für gemeinsame Nutzung über Verwaltungsebene hinweg muss das System **Mandantenfähigkeit mit delegierbarer Administration** (z. B. Landkreis ↔ Gemeinde) unterstützen, inkl. Schnittstellen zu vorhandenen kommunalen Verwaltungsportalen.
