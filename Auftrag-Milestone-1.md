# CMS-Upgrade – Rollenmanagement & mobile Content-Erstellung für die „Mein Quartier“ App


hiermit bieten wir Ihnen den Ausbau der „Mein Quartier App“ (und damit der zugrundliegenden
open-source Software „Smart Village App“) an. Grundlage sind die vorangegangenen
Abstimmungsgespräche, der grafische Prototyp unter https://cms2.smart-village.app
(Passwort „innovation“), die gemeinsam erarbeiteten Anforderungen unter
https://github.com/smart-village-solutions/konzeption-cms-
v2/blob/main/Anforderungen/Funktional/Benutzer.md, https://github.com/smart-village-
solutions/konzeption-cms-v2/blob/main/Anforderungen/Nicht-funktional.md und die unter
https://github.com/smart-village-solutions/konzeption-cms-
v2/blob/main/Systemarchitektur/Umsetzung-Rollen-Rechte.md beschriebene
Systemarchitektur.

Ziel der Ausbaumaßnamen ist Erweiterung des bestehenden Rollen- und Rechtemanagements
im Frontend der App auf der Basis von Keycloak auf die Benuzterverwaltung im Backend und
dem Redaktionssystem und Möglichkeit der Bearbeitung von App-Inhalten aus der App heraus
für berechtigte Nutzende.

**Ausgangssituation und Zielsetzung**

Der Betrieb der App und des Redaktionssystems der Mein Quartier App erfordert ein
hochsicheres, mandantenfähiges und schnelles Identity and Access Management (IAM). Dieses
Angebot umfasst die Konzeption und Implementierung eines zentralen IAM-Systems, das
Keycloak für die technische Authentifizierung nutzt und die gesamte fachliche
Rechteverwaltung (RBAC/ABAC) im CMS abbildet.

Kernziel: Eine zentrale Berechtigungsprüfung unter 10 0 ms für alle Daten, Funktionen und
Module zu gewährleisten.

Unsere Leistungspakete sind bewusst modular und klar voneinander abgegrenzt konzipiert, um
Ihnen eine schrittweise Umsetzung und gesicherte Abnahme zu ermöglichen. Wir verstehen,
dass sich Anforderungen im Projektverlauf entwickeln können, daher sind Anpassungen am
Leistungsumfang selbstverständlich nach gemeinsamer Absprache möglich.

Um jedoch die zugesagte Preis- und Planungssicherheit für beide Seiten zu gewährleisten, gilt
folgende partnerschaftliche Regelung: Scope-Erweiterungen, also Mehrleistungen, führen
grundsätzlich zu einem separaten Change Request, der den zusätzlichen Aufwand klar
definiert. Eine Verschiebung von Prioritäten ist innerhalb des Gesamtbudgets kompensierbar,
sofern ein neuer Aufwand durch eine gleichwertige Streichung an anderer Stelle im
Leistungsverzeichnis ausgeglichen wird. Jede Erweiterung, die nicht auf diese Weise
kompensiert werden kann, erfordert eine offizielle Anpassung des Festpreisangebots und der
Gesamtlaufzeit durch einen gemeinsamen Change Request Prozess.

## Leistungsumfang und Kosten

**1. Architektur & Basis-IAM-Inkrement**
Dieses Paket liefert die konzeptionelle und technische Basis für das gesamte Projekt, indem es
die Architektur des IAM-Systems festlegt und die Kernkomponenten von Keycloak aufsetzt. Es
ist die Voraussetzung für die gesamte nachfolgende Implementierung.
    - **Architektur-Design:** Erstellung des detaillierten technischen Architektur-Designs für
       den gesamten Identitäts- und Zugriffsmanagement-Service (IAM-Service), die
       Permission Engine und das notwendige logische Datenbank-Schema
       (Postgres/Supabase) gemäß dem Zielbild des Konzepts.
    - **Keycloak-Basis-Setup:** Einrichtung des dedizierten Keycloak-Realms für die
       vereinbarte Test-/Entwicklungsumgebung.
    - **Client & Token Setup:** Konfiguration der spezifischen Clients für das CMS sowie Aufbau
       des initialen Token-Setups (OIDC-Claims), um die Authentifizierung zu ermöglichen.

**Abnahmekriterien**
Das Paket gilt als erfolgreich abgeschlossen und abgenommen, wenn alle folgenden Kriterien
erfüllt sind:

- Die Architekturdokumentation (inkl. Logik des DB-Schemas, Schnittstellenkonzept) liegt
    in finaler, freigegebener Form vor.
- Der dedizierte Keycloak-Realm und die zugehörigen Clients sind in der vereinbarten
    Testumgebung funktionsfähig eingerichtet.
- Ein erfolgreicher Authentifizierungs-Flow (Login) eines Keycloak-Test-Users über einen
    der konfigurierten Clients ist nachweisbar.
- Das ausgestellte OIDC-Token enthält die korrekten Claims gemäß dem initialen Token-
    Setup.



**2. Accounts & Organisationen**
Dieses Paket übersetzt die im Architekturkonzept definierten fachlichen Entitäten in lauffähige
Code-Module und legt damit die Basis für die gesamte Geschäftslogik des IAM-Services.

- **Datenmodelle Implementierung:** Implementierung des im Architekturkonzept (Paket 1)
    entworfenen Postgres-Datenbank-Schemas (im iam-Schema) für die Kernentitäten
    iam.accounts und iam.organizations.
- **Organisations-Hierarchie & Mandantenfähigkeit** : Implementierung der Logik zur
    Abbildung der hierarchischen Organisationsstrukturen (z.B. Stadt → Stadteil) sowie die
    Sicherstellung der Mandantenfähigkeit auf Datenebene.
- **Minimaler IAM-Service (Core-Sync)** : Implementierung der Synchronisations-Logik, die
    die Keycloak-User-ID (sub) nach dem Login oder bei Neuregistrierung mit dem
    entsprechenden iam.accounts-Datensatz verknüpft und synchronisiert.
- **Basis-CRUD-Operationen** : Implementierung der Backend-Endpunkte (API-
    Schnittstellen) für die Erstellung, das Lesen, die Aktualisierung und das Löschen
    (CRUD) von Accounts und Organisationen, die vom CMS-UI genutzt werden.
- **Admin-UI Integration** : Erweiterung der Admin-UI Basics um funktionale Komponenten
    zur Anzeige, Bearbeitung und Verwaltung der Accounts und Organisationsstrukturen
    (inkl. des Onboarding-Status).

**Abnahmekriterien**
Das Paket gilt als erfolgreich abgeschlossen und abgenommen, wenn alle folgenden Kriterien
erfüllt sind:

- Die Datenbanktabellen iam.accounts und iam.organizations sind im Postgres-Schema
    der Testumgebung angelegt und entsprechen dem freigegebenen Design.
- Die Synchronisations-Logik funktioniert fehlerfrei: Nach einem Login über Keycloak
    existiert ein korrekter Datensatz in iam.accounts mit korrekter Verknüpfung zur
    Keycloak-ID.
- Die Hierarchische Abbildung ist funktional: Die Anlage einer neuen Organisation kann
    erfolgreich einer übergeordneten Organisation zugewiesen werden.
- Die CRUD-Operationen für Accounts und Organisationen sind über die Backend-API
    durch einen Test-Administrator erfolgreich durchführbar.
- Die Admin-UI bildet die Benutzerliste und die Organisationsstruktur korrekt ab und
    ermöglicht die Zuweisung eines Accounts zu einer Organisation.



**3. Rollenmodell, Gruppen & Vererbungen**
Dieses Paket ist das Herzstück der Autorisierungslogik und setzt die komplexen Anforderungen
an RBAC (Role-Based Access Control), ABAC (Attribute-Based Access Control) sowie die
organisatorische Hierarchie um.

- **Rollen-Implementierung** : Implementierung der verschiedenen System-Personas (z.B.
    System-Administrator, Redakteur) als feste Rollen sowie die Architektur zur Anlage
    mandantenspezifischer Custom-Rollen in der iam.roles-Tabelle.
- **Gruppen-Modell** : Implementierung des Backend-Modells (iam.groups) und der
    zugehörigen Logik zur Bündelung von Permissions und zur Zuweisung zu Accounts.
- **Feingranulare Permissions** : Implementierung der Datenbank-Modelle zur Speicherung
    der feingranularen Berechtigungen (Modul/Content-Type/Geo) gemäß der Struktur
    (subject, action, resource_type, resource_id?, scope).
- **Hierarchische Vererbung (RBAC/ABAC)** : Implementierung der komplexen
    Vererbungslogik, die Rollenberechtigungen über die Organisations-Hierarchie
    (Landkreis → Gemeinde) und über Geografische Attribute (Geo-Vererbung) korrekt
    auflöst.
- **Verwaltungs-UI** : Erweiterung der CMS-UI um die notwendigen Oberflächen zur Anlage,
    Bearbeitung und Zuweisung von System- und Custom-Rollen, Gruppen sowie zur
    Verknüpfung von Accounts mit Rollen und Gruppen.

**Abnahmekriterien**
Das Paket gilt als erfolgreich abgeschlossen und abgenommen, wenn alle folgenden Kriterien
erfüllt sind:

- Die **Datenbankmodelle** für Rollen, Gruppen und Berechtigungen (iam.roles, iam.groups,
    iam.role_permissions) sind angelegt und mit den notwendigen CRUD-Funktionen
    hinterlegt.
- Die **System-Personas** sind angelegt und mit einem initialen Set an Berechtigungen
    (Permissions) versehen.
- Die **Rollen-Vererbung** ist funktional: Ein Test-User mit einer Rolle auf **Stadtebene**
    erhält automatisch die korrekten effektiven Berechtigungen für alle zugeordneten
    **Stadtteile** (Nachweis über Backend-Abfrage).
- Die **Geo-Vererbung** ist funktional: Die Zuweisung einer geographicPermission zu einer
    Region resultiert in der korrekten Auflösung der Berechtigung für alle untergeordneten
    geografischen Entitäten.
- Die **Admin-UI** ermöglicht die **korrekte Zuweisung** von Rollen und Gruppen zu einem
    Account und spiegelt die effektiven (vererbten) Rollen korrekt wider.



**4. Permission Engine & High-Performance AuthZ**
Dieses Paket ist entscheidend für die Latenz und Skalierbarkeit des gesamten CMS, da es die
Berechtigungsprüfung unter die geforderte 100 ms-Grenze bringt.

- **Permission Engine API** : Entwicklung des zentralen IAM-Service-Endpunkts, der als
    einzige Quelle für Berechtigungsentscheidungen im CMS dient (Implementierung des
    Algorithmus zur Berechtigungsberechnung).
- **High-Performance Cache** : Aufbau und Konfiguration eines Redis-basierten Caches zur
    Speicherung von Precomputed Permission Snapshots.
- **Caching-Logik** : Implementierung der Logik für Cache-Hits (In-Memory-Checks) und
    Cache-Misses (Datenbankabfrage, Berechnung und Speichern in Redis).
- **Basiskommunikation** : Implementierung eines Mechanismus zur Cache-Invalidierung
    bei Änderungen der Kernentitäten (z.B. Rollenwechsel, Gruppenänderung) durch
    Events.
- **Performance-Tuning** : Analyse und Optimierung des Berechnungsalgorithmus zur
    Einhaltung der kritischen < 100 ms Latenzanforderung für den Endpunkt.

**Abnahmekriterien**
Das Paket gilt als erfolgreich abgeschlossen und abgenommen, wenn alle folgenden Kriterien
erfüllt sind:

- Der zentrale Autorisierungs-Endpunkt ist in der Entwicklungs-/Testumgebung
    erreichbar und liefert korrekte Entscheidungen.
- Die Redis-Integration ist nachweisbar funktionsfähig: Berechtigungs-Snapshots werden
    nach dem ersten Aufruf im Redis gespeichert und beim zweiten Aufruf von dort
    geladen.
- Latenztest (Performanz): Die Berechtigungsprüfung (Cache-Hit-Szenario) überschreitet
    die zugesicherte Latenz von 100 ms (P95-Wert) bei den vereinbarten Lastbedingungen
    nicht (Messung wird dokumentiert).
- Die Basis-Cache-Invalidierung funktioniert: Eine Änderung der Rolle eines Test-Users
    führt nachweislich zur Löschung des zugehörigen Permission-Snapshots in Redis.



**5. Rechtstexte & Akzeptanzsystem**
Dieses Paket adressiert die rechtlichen Compliance-Anforderungen bezüglich
Nutzungsbedingungen und Datenschutzerklärungen.

- **Datenmodell Rechtstexte** : Implementierung der Tabellen in der Datenbank zur
    Speicherung von Rechtstexten (AGB, Datenschutzerklärung) inkl. Versionsverwaltung.
- **Akzeptanz-Workflow** : Implementierung einer Logik, die beim Login-Prozess prüft, ob
    der angemeldete Benutzer die neueste Version der notwendigen Rechtstexte akzeptiert
    hat.

- **Erzwingung der Akzeptanz** : Bereitstellung eines Redirects bzw. einer IAM-Hook-
    Funktion, der den Benutzer zur Akzeptanz zwingt, bevor der Zugang zum System
    gewährt wird.
- **Nachweis & Export** : Implementierung einer Funktion im Admin-UI, die einen
    revisionssicheren Nachweis liefert, wann und welche Version eines Rechtstextes von
    einem Benutzer akzeptiert wurde.

**Abnahmekriterien**
Das Paket gilt als erfolgreich abgeschlossen und abgenommen, wenn alle folgenden Kriterien
erfüllt sind:

- Das Datenmodell ermöglicht die Anlage und Versionsverwaltung von mindestens zwei
    unterschiedlichen Rechtstexten.
- Die Erzwingungslogik ist funktional: Ein Test-User, der eine neue Version eines
    Rechtstextes noch nicht akzeptiert hat, wird beim Login zur Akzeptanz gezwungen.
- Nach der Akzeptanz wird der Akzeptanz-Vorgang (Datum und Versionsnummer)
    unveränderbar protokolliert.
- Die Nachweisfunktion im Admin-UI liefert für einen beliebigen Benutzer einen Export
    der akzeptierten Rechtstexte, der die Einhaltung der Nachweispflichten (DSGVO)
    belegt.



**6. Mobile Content-Erstellung**
Dieses Paket erweitert die App um die Fähigkeit zur Erstellung und Bearbeitung der Kerninhalte
(Nachrichten, Orte, Events). Es nutzt die bereits etablierten Logik der Rechteprüfung und baut
auf der Struktur der vorhandenen "Schwarzes Brett"-Funktion auf.

- **Rechteprüfung & AuthZ-Integration** : Vollständige Integration der Permission Engine in
    die neuen Content-Authoring-Flows, um vor jeder Aktion (Erstellen / Bearbeiten /
    Löschen) zu prüfen, ob der eingeloggte Nutzer die nötigen Rechte (basierend auf Rolle,
    Organisation und geografischem Kontext) besitzt.
- **Datenmodell-Integration** : Erweiterung der existierenden Datenmodelle für
    Nachrichten, Orte und Events um die notwendigen IAM-Attribute (ownerAccountId,
    ownerOrganizationId) zur korrekten Zuweisung und Berechtigungsprüfung.
- **UI-Flows für Content-Erstellung** : Implementierung der Frontend-Benutzeroberflächen
    in der App, die es Nutzenden mit passenden Rechten ermöglichen, die drei genannten
    Content-Typen neu zu erstellen.
- **UI-Flows für Content-Bearbeitung** : Implementierung der Frontend-
    Benutzeroberflächen in der App, die es Nutzenden ermöglichen, vorhandene Inhalte der
    genannten drei Typen, für die sie berechtigt sind (z.B. als Owner oder Redakteur der
    Organisation), zu bearbeiten.
- **Datenvalidierung & API-Mapping** : Sicherstellung der korrekten Datenvalidierung und
    des Mappings von Nutzereingaben auf die CMS-Backend-APIs, unter Beibehaltung der Sicherheitsstandards.

**Abnahmekriterien**
Das Paket gilt als erfolgreich abgeschlossen und abgenommen, wenn alle folgenden Kriterien
erfüllt sind:

- Ein Test-Nutzer mit der Rolle 'Redakteur' und korrekter Organisationszuweisung kann
    erfolgreich alle drei Content-Typen (Nachrichten, Orte, Events) in der App erstellen.
- Ein Test-Nutzer ohne Authoring-Rechte sieht die entsprechenden UI-Buttons zum
    Erstellen/Bearbeiten nicht und wird beim Versuch der API-Interaktion mit einem
    korrekten "Forbidden" Fehler abgewiesen.
- Jeder neu erstellte oder bearbeitete Inhalt wird im Backend korrekt mit dem Account
    und Organisation des handelnden Nutzers verknüpft.
- Ein Nutzer kann nur Inhalte bearbeiten, die entweder von ihm selbst erstellt wurden
    oder für deren Verwaltung er über seine Rolle (z.B. App-/Feature-Manager der
    Organisation) Berechtigungen besitzt.
