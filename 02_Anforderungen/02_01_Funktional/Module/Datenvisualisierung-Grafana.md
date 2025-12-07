# Modul: Datenvisualisierung (Grafana)

## Zweck und Mehrwert

Das Datenvisualisierungs-Modul ermöglicht die Einbindung von Grafana-Dashboards in die App, um komplexe Daten anschaulich darzustellen. Es richtet sich primär an Entscheidungsträger:innen, Analyst:innen und interessierte Bürger:innen, die detaillierte Einblicke in Smart-City-Daten, Infrastruktur-Monitoring oder statistische Auswertungen benötigen. Das Modul fördert Transparenz durch datenbasierte Visualisierungen.

## Zielgruppen und Nutzer:innen

* **Kommunalverwaltung**: Monitort Infrastruktur-KPIs (z. B. Energieverbrauch, Verkehrsaufkommen, Auslastung öffentlicher Einrichtungen)
* **Analyst:innen und Planer:innen**: Nutzen Dashboards für Datenanalyse und Entscheidungsfindung
* **Bürger:innen**: Interessieren sich für transparente Darstellung kommunaler Daten (z. B. Budget, Umweltdaten)
* **Redakteur:innen**: Binden Grafana-Dashboards in App-Seiten ein und pflegen Beschreibungen

## Funktionsumfang

* **Einbettung von Grafana-Dashboards**:
  * Grafana-Dashboards werden als iframes in die App eingebettet
  * Unterstützung für verschiedene Dashboard-Typen (Zeitreihen, Balkendiagramme, Karten, Tabellen)
* **Dashboard-Typen**:
  * **Infrastruktur-Monitoring**: Energieverbrauch, Wasserversorgung, Straßenbeleuchtung
  * **Verkehrsdaten**: Verkehrsaufkommen, Parkplatz-Auslastung, ÖPNV-Pünktlichkeit
  * **Umweltdaten**: Luftqualität, Lärmpegel, Temperatur, Niederschlag
  * **Budget und Finanzen**: Kommunalhaushalt, Ausgaben nach Bereichen
  * **Soziale Indikatoren**: Bevölkerungsentwicklung, Arbeitslosenquote, Kriminalitätsstatistik
* **Interaktive Dashboards**:
  * Zoom, Pan, Zeitbereichsauswahl (falls von Grafana unterstützt)
  * Filter und Variablen (z. B. Auswahl von Stadtteilen, Zeiträumen)
* **Responsive Einbettung**: Dashboards passen sich an verschiedene Bildschirmgrößen an
* **Beschreibungen und Kontext**: Redakteur:innen können erklärende Texte zu Dashboards hinzufügen

## Inhalte und Daten

* **Grafana-Dashboards**:
  * Dashboard-URL (Embed-Link von Grafana)
  * Dashboard-Titel, Beschreibung
  * Kategorie (z. B. Umwelt, Verkehr, Finanzen)
  * Sichtbarkeit (öffentlich, nur für angemeldete Nutzer:innen)
* **Datenquellen**:
  * Grafana greift auf Datenbanken zu (z. B. PostgreSQL, InfluxDB, Prometheus)
  * Daten können aus verschiedenen Quellen stammen (IoT-Sensoren, Verwaltungssysteme, externe APIs)
* **Widget-Konfiguration** (optional):
  * Einzelne Grafana-Panels können als Widgets auf dem Dashboard angezeigt werden

## Konfiguration im CMS

* **Dashboard-Verwaltung**:
  * **Dashboard hinzufügen**: Redakteur:innen geben Grafana-Embed-URL ein
  * **Titel und Beschreibung**: Erklärende Texte für Nutzer:innen
  * **Kategorie**: Zuordnung zu Themenbereichen (z. B. Umwelt, Verkehr, Finanzen)
  * **Sichtbarkeit**: Öffentlich oder nur für bestimmte Rollen (z. B. Verwaltungsmitarbeiter:innen)
* **Embed-Optionen**:
  * **Zeitbereich**: Standardzeitraum festlegen (z. B. letzte 24 Stunden, letzte 7 Tage)
  * **Theme**: Light/Dark Mode
  * **Interaktivität**: Filter und Zoom aktivieren/deaktivieren
* **Platzierung**: Dashboards können auf eigenen Seiten oder als Widgets eingebunden werden

## Integrationen und Schnittstellen

* **Grafana-Server**: CMS kommuniziert mit Grafana über Embed-URLs (iframes)
* **Single Sign-On (SSO)**: Optional Authentifizierung über Keycloak, sodass Nutzer:innen nicht zweimal anmelden müssen
* **Datenquellen**:
  * IoT-Plattformen (LoRaWAN, FIWARE)
  * Datenbanken (PostgreSQL, InfluxDB, Prometheus)
  * Externe APIs (z. B. Umweltbundesamt, Verkehrsverbünde)
* **Export-Funktionen**: Grafana ermöglicht Export von Diagrammen als PNG, PDF oder CSV (falls aktiviert)

## Nicht-funktionale Anforderungen

* **Performance**: Dashboards laden innerhalb von 3 Sekunden (abhängig von Datenmenge)
* **Responsive Design**: Dashboards passen sich an Smartphone, Tablet und Desktop an
* **Sicherheit**: Embed-URLs sind gegen unbefugten Zugriff geschützt (z. B. via API-Keys, SSO)
* **Barrierefreiheit**: Dashboards sollten mit Screenreadern nutzbar sein (soweit von Grafana unterstützt)
* **Datenschutz**: Keine personenbezogenen Daten in öffentlich zugänglichen Dashboards

## Monitoring und KPIs

* **Dashboard-Nutzung**: Wie oft werden Grafana-Dashboards aufgerufen?
* **Verweildauer**: Wie lange bleiben Nutzer:innen auf Dashboard-Seiten?
* **Beliebteste Dashboards**: Welche Dashboards werden am häufigsten angesehen?
* **Filter-Nutzung**: Wie oft werden Filter und Zeitbereiche angepasst?

## Abhängigkeiten

* **Grafana-Server**: Muss installiert und konfiguriert sein
* **Datenquellen**: Datenbanken oder APIs müssen verfügbar sein und Daten liefern
* **SSO (optional)**: Keycloak-Integration für nahtlosen Login
* **CMS-Modul**: Dashboard-Seiten müssen im CMS erstellbar und verwaltbar sein

## Offene Fragen

* Soll Grafana selbst gehostet oder als Cloud-Service genutzt werden?
* Welche Dashboards sollen prioritär erstellt werden (Umwelt, Verkehr, Finanzen)?
* Sollen Nutzer:innen eigene Dashboards erstellen können (Self-Service)?
* Wie wird mit großen Datenmengen umgegangen (Performance-Optimierung)?
* Sollen Dashboards exportierbar sein (PNG, PDF, CSV)?
* Sollen Alerts aus Grafana in der App angezeigt werden (z. B. "Luftqualität kritisch")?

## Notizen aus Vorarbeit

_(Hier können vorhandene Notizen aus Miro oder anderen Quellen eingefügt werden)_
