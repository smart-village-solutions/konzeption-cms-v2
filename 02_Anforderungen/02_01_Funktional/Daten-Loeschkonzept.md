# Anforderungen: Daten-Löschkonzept

Dieses Kapitel beschreibt die Anforderungen an das Daten-Löschkonzept im CMS 2.0, um DSGVO-Konformität sicherzustellen und personenbezogene sowie inhaltliche Daten rechtskonform zu entfernen.

## Zielsetzung

* Das CMS muss ein **umfassendes Löschkonzept** implementieren, das sicherstellt, dass personenbezogene Daten und Inhalte bei Bedarf vollständig, nachweisbar und rechtskonform entfernt werden können.
* Das Löschkonzept muss die **Anforderungen der DSGVO** erfüllen, insbesondere:
  * **Art. 17 DSGVO**: Recht auf Löschung („Recht auf Vergessenwerden")
  * **Art. 5 Abs. 1 lit. e DSGVO**: Speicherbegrenzung (Daten dürfen nur so lange gespeichert werden, wie es für den Zweck erforderlich ist)
  * **Art. 30 DSGVO**: Nachweispflicht (Dokumentation von Löschvorgängen)
* Gleichzeitig müssen **gesetzliche Aufbewahrungsfristen** (z. B. für Verträge, Rechnungen, Audit-Logs) berücksichtigt werden.

---

## Datenklassifizierung und Löschfristen

Das System unterscheidet verschiedene Datentypen mit jeweils eigenen Löschfristen:

### Personenbezogene Daten

* **Nutzerdaten** (Name, E-Mail, Telefon, Adresse):
  * Löschung nach **Deaktivierung des Accounts** und Ablauf einer Aufbewahrungsfrist (z. B. 30 Tage für mögliche Wiederherstellung)
  * Ausnahme: Bei laufenden Verträgen oder rechtlichen Verpflichtungen (z. B. Gewährleistung) erst nach Ablauf der gesetzlichen Frist
* **Login-Daten und Passwörter**:
  * Sofortige Löschung bei Account-Deaktivierung (nach Aufbewahrungsfrist)
* **Audit-Logs mit personenbezogenen Daten**:
  * Aufbewahrung für **mindestens 6 Monate** (Sicherheit und Compliance)
  * Automatische Löschung nach **12 Monaten** (sofern keine rechtlichen Gründe dagegensprechen)
* **Session-Daten und Cookies**:
  * Automatische Löschung nach **Session-Ende** bzw. nach Ablauf der Cookie-Laufzeit
* **IP-Adressen und Tracking-Daten**:
  * Anonymisierung nach **90 Tagen**, sofern keine Sicherheitsvorfälle untersucht werden müssen

### Inhaltsdaten

* **Veröffentlichte Inhalte** (News, Events, statische Seiten):
  * Manuelle Löschung durch berechtigte Redakteur:innen
  * Optionale **automatische Archivierung** nach Ablaufdatum (z. B. alte Events)
  * **Soft-Delete** (Inhalte werden zunächst als „gelöscht" markiert, können wiederhergestellt werden)
  * **Hard-Delete** nach **30 Tagen** im Papierkorb
* **Entwürfe und unveröffentlichte Inhalte**:
  * Automatische Löschung nach **6 Monaten Inaktivität** (konfigurierbar)
* **Medien (Bilder, Dokumente, Videos)**:
  * Warnung vor Löschung, falls noch in Verwendung
  * Soft-Delete → Hard-Delete nach **30 Tagen**
  * Medien mit **rechtlichen Aufbewahrungspflichten** (z. B. Verträge, Rechnungen) werden entsprechend länger gespeichert

### User-Generated Content (UGC)

* **Kommentare, Forenbeiträge, Bewertungen**:
  * Nutzer:innen können **eigene Inhalte jederzeit löschen** (Recht auf Vergessenwerden)
  * Moderator:innen können Inhalte löschen (z. B. bei Verstößen gegen Community-Regeln)
  * Gelöschte Inhalte werden **anonymisiert** angezeigt (z. B. „Dieser Beitrag wurde vom Nutzer entfernt"), um Thread-Strukturen zu erhalten
  * **Hard-Delete nach 90 Tagen**, falls rechtlich zulässig

### Metadaten und Versionierung

* **Versionshistorien** (von Inhalten und Medien):
  * Aufbewahrung für **12 Monate** nach letzter Änderung
  * Ältere Versionen werden automatisch gelöscht (konfigurierbar)
* **Änderungsprotokolle ohne personenbezogene Daten**:
  * Können unbegrenzt gespeichert werden
* **Änderungsprotokolle mit personenbezogenen Daten**:
  * Löschung nach **12 Monaten** (wie Audit-Logs)

---

## Technische Umsetzung

### Soft-Delete vs. Hard-Delete

* **Soft-Delete** (empfohlener Standard):
  * Daten werden **nicht physisch gelöscht**, sondern mit einem Flag `deleted_at` markiert
  * Ermöglicht **Wiederherstellung** bei versehentlicher Löschung
  * Gelöschte Daten werden in der Anwendung nicht mehr angezeigt
  * Nach Ablauf einer Frist (z. B. 30 Tage) erfolgt automatisch ein Hard-Delete
* **Hard-Delete** (endgültige Löschung):
  * Daten werden **physisch aus der Datenbank entfernt**
  * Zusätzlich müssen **Backups bereinigt** werden (siehe unten)
  * Hard-Delete ist erforderlich bei:
    * Ausdrücklichem Nutzerwunsch (DSGVO Art. 17)
    * Ablauf gesetzlicher Aufbewahrungsfristen
    * Daten ohne Aufbewahrungspflicht nach Ablauf der Soft-Delete-Frist

### Anonymisierung als Alternative

* In bestimmten Fällen ist **Anonymisierung** sinnvoller als vollständige Löschung:
  * **Statistische Auswertungen** (z. B. Nutzungsstatistiken ohne Personenbezug)
  * **Thread-Strukturen in Foren** (gelöschte Beiträge werden anonymisiert angezeigt)
  * **Audit-Logs für Sicherheitszwecke** (Personenbezug wird entfernt, aber Aktionen bleiben nachvollziehbar)
* Anonymisierung bedeutet:
  * Personenbezogene Daten (Name, E-Mail, etc.) werden durch Pseudonyme ersetzt (z. B. „Nutzer XYZ")
  * Keine Möglichkeit mehr, die Daten einer realen Person zuzuordnen
  * DSGVO-konform, da kein Personenbezug mehr besteht

### Kaskadierendes Löschen

* Beim Löschen eines **Nutzer-Accounts** müssen **alle verknüpften Daten** berücksichtigt werden:
  * Persönliche Daten (Name, E-Mail, Telefon, Adresse)
  * Login-Daten (Passwort-Hashes, Tokens)
  * Berechtigungen und Rollenzuweisungen
  * Session-Daten
  * **Inhaltliche Beiträge** (News, Events, etc.): Je nach Anforderung entweder löschen oder anonymisieren (z. B. „Erstellt von: Ehemaliger Nutzer")
  * **Medien**: Falls ausschließlich vom gelöschten Nutzer verwendet, ebenfalls löschen
* Das System muss **Abhängigkeiten erkennen** und Nutzer:innen oder Administrator:innen **warnen**, falls Daten noch in Verwendung sind

### Löschung über mehrere Systeme hinweg

* Das CMS arbeitet mit **externen Systemen** zusammen (z. B. CDN, externe Medienspeicher, Caching-Layer, Keycloak):
  * Löschvorgänge müssen **system-übergreifend** erfolgen
  * API-Aufrufe an externe Dienste (z. B. S3, Cloudinary) zum Löschen von Medien
  * Cache-Invalidierung (z. B. Redis), um gelöschte Daten nicht mehr auszuliefern
  * **Keycloak**: Nutzer-Accounts müssen auch im Identity-Provider gelöscht werden
* Das System muss sicherstellen, dass Löschungen **konsistent** über alle Systeme hinweg erfolgen

### Backup-Bereinigung

* **Problem**: Gelöschte Daten können in **Backups** weiterhin vorhanden sein.
* **Lösung**:
  * Backups mit gelöschten personenbezogenen Daten werden **nach einer definierten Frist** (z. B. 90 Tage) automatisch überschrieben
  * Alternativ: **Selective Backup Restoration** – Backups bleiben erhalten, aber bei Wiederherstellung werden gelöschte Daten gefiltert
  * Dokumentation, dass Backups nach X Tagen keine gelöschten personenbezogenen Daten mehr enthalten
* Bei **rechtlich erzwungener Löschung** (z. B. durch Behördenanordnung) müssen Backups **manuell bereinigt** werden

---

## Nutzerrechte und Self-Service

* Nutzer:innen müssen die Möglichkeit haben, **eigene Daten einzusehen, zu korrigieren und zu löschen** (DSGVO Art. 15, 16, 17):
  * **Profil-Seite** mit Möglichkeit zur Account-Löschung
  * **Bestätigungsdialog**: „Möchten Sie Ihren Account wirklich löschen? Dieser Vorgang kann nicht rückgängig gemacht werden."
  * Nach Bestätigung: Account wird deaktiviert, Löschfrist beginnt (z. B. 30 Tage Widerrufsfrist)
  * Während der Widerrufsfrist: **Wiederherstellung möglich** durch Kontaktaufnahme mit Support
* Nutzer:innen können **einzelne Inhalte** (z. B. eigene Kommentare, Forenbeiträge) jederzeit löschen
* Administrator:innen können **Löschanfragen manuell bearbeiten**, falls Self-Service nicht möglich ist (z. B. bei komplexen Abhängigkeiten)

---

## Automatisierung und Monitoring

### Automatische Löschvorgänge

* Das System führt **regelmäßig automatische Löschvorgänge** durch (z. B. täglich, wöchentlich):
  * Ablauf von Löschfristen (z. B. Soft-Delete → Hard-Delete nach 30 Tagen)
  * Alte Audit-Logs (nach 12 Monaten)
  * Alte Versionshistorien (nach 12 Monaten)
  * Inaktive Entwürfe (nach 6 Monaten)
  * Abgelaufene Session-Daten
* Automatisierung erfolgt über **Cron-Jobs oder Scheduler** (z. B. Background Jobs in der Anwendung)

### Monitoring und Benachrichtigungen

* **Lösch-Dashboard** für Administrator:innen:
  * Übersicht über anstehende Löschvorgänge
  * Statistiken: Wie viele Daten wurden gelöscht? Wie viele sind noch im Soft-Delete-Status?
  * Warnungen bei fehlgeschlagenen Löschvorgängen
* **Benachrichtigungen** an betroffene Nutzer:innen:
  * „Ihr Account wird in 7 Tagen endgültig gelöscht. Falls Sie dies nicht möchten, melden Sie sich bitte an."
  * „Ihre Entwürfe wurden wegen Inaktivität gelöscht."

---

## Nachweisbarkeit und Dokumentation

* Alle Löschvorgänge müssen **protokolliert** werden (DSGVO Art. 30):
  * **Was** wurde gelöscht? (Datentyp, Anzahl der Datensätze)
  * **Wann** wurde gelöscht? (Zeitstempel)
  * **Wer** hat die Löschung ausgelöst? (Nutzer, Administrator, automatischer Prozess)
  * **Warum** wurde gelöscht? (Nutzerwunsch, Ablauf der Frist, rechtliche Verpflichtung)
* Lösch-Logs werden selbst nach einer definierten Frist gelöscht (z. B. **2 Jahre**), sofern keine rechtlichen Aufbewahrungspflichten bestehen
* **Export-Funktion** für Lösch-Logs, um bei Audits oder Behördenanfragen Nachweise liefern zu können

---

## Ausnahmen und Aufbewahrungspflichten

* **Rechtliche Aufbewahrungspflichten** haben Vorrang vor Löschfristen:
  * **Handels- und Steuerrecht** (z. B. Rechnungen, Verträge): 6-10 Jahre
  * **Gewährleistung und Haftung**: Daten müssen während der Verjährungsfristen aufbewahrt werden
  * **Strafverfolgung**: Daten dürfen nicht gelöscht werden, solang sie für laufende Ermittlungen benötigt werden
* Das System muss **Flags für Aufbewahrungspflichten** unterstützen:
  * `retention_until`: Datum, bis zu dem Daten mindestens gespeichert bleiben müssen
  * `legal_hold`: Flag, das eine Löschung verhindert (z. B. bei Gerichtsverfahren)
* Administrator:innen können **manuelle Aufbewahrungsfristen** setzen, falls erforderlich

---

## Rollen und Berechtigungen

* **Nutzer:innen**: Können eigene Daten und Inhalte löschen (Self-Service)
* **Redakteur:innen**: Können Inhalte löschen, für die sie zuständig sind (z. B. News, Events)
* **Moderator:innen**: Können User-Generated Content löschen (z. B. bei Verstößen)
* **Administrator:innen**: Können alle Daten löschen, Löschfristen konfigurieren, Lösch-Logs einsehen
* **Datenschutzbeauftragte**: Haben Zugriff auf Lösch-Logs und können Löschungen anordnen
* **System-Administrator:innen**: Können Hard-Deletes durchführen, Backups bereinigen, Lösch-Automatisierung konfigurieren

---

## Integration mit anderen Systemen

* **Keycloak (Identity Provider)**:
  * Nutzer-Löschung im CMS muss auch Account in Keycloak löschen (oder umgekehrt)
  * Synchronisierung über API oder Event-Bus
* **Externe Medienspeicher (S3, Cloudinary)**:
  * Lösch-API-Aufrufe an externe Dienste
  * Monitoring: Wurden Medien erfolgreich gelöscht?
* **CDN und Caching-Layer**:
  * Cache-Invalidierung, um gelöschte Inhalte nicht mehr auszuliefern
* **Ticketsystem (Jira, GitHub Issues, Zammad)**:
  * Support-Tickets mit personenbezogenen Daten müssen ebenfalls gelöscht oder anonymisiert werden
* **Analytics und Tracking**:
  * Nutzer-bezogene Tracking-Daten müssen anonymisiert oder gelöscht werden

---

## Testing und Qualitätssicherung

* **Testfälle** für das Löschkonzept:
  * Account-Löschung → Alle verknüpften Daten werden entfernt
  * Soft-Delete → Hard-Delete nach Ablauf der Frist
  * Kaskadierendes Löschen → Abhängigkeiten werden korrekt behandelt
  * Backup-Bereinigung → Gelöschte Daten sind nach X Tagen nicht mehr in Backups
  * Externe Systeme → Löschung erfolgt system-übergreifend
* **Performance-Tests**: Große Löschvorgänge (z. B. 10.000 Datensätze) dürfen das System nicht überlasten
* **Sicherheitstests**: Gelöschte Daten dürfen nicht wiederherstellbar sein (außer im Soft-Delete-Zeitraum)

---

## Dokumentation und Schulung

* **Datenschutzerklärung** muss Löschfristen und Nutzerrechte transparent erklären
* **Interne Dokumentation** für Administrator:innen:
  * Wie funktioniert das Löschkonzept?
  * Wie werden Löschfristen konfiguriert?
  * Wie werden Lösch-Logs ausgewertet?
* **Schulungen** für Redakteur:innen und Moderator:innen:
  * Wann sollen Inhalte gelöscht werden?
  * Wie funktioniert Soft-Delete vs. Hard-Delete?
  * Was passiert mit gelöschten User-Generated Content?
