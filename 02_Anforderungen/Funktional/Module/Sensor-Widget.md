# Modul: Sensor-Widget

## Zweck und Mehrwert

Das Sensor-Widget zeigt Echtzeit-Daten von IoT-Sensoren in der Smart City auf dem Dashboard oder anderen Seiten an. Es ermöglicht Bürger:innen und Entscheidungsträger:innen, aktuelle Umwelt- und Infrastrukturdaten kompakt zu visualisieren (z. B. Luftqualität, Lärmpegel, Parkverfügbarkeit, Temperatur, Füllstände). Das Widget fördert Transparenz und datenbasierte Entscheidungen.

## Zielgruppen und Nutzer:innen

* **Bürger:innen**: Möchten Umweltdaten (Luftqualität, Lärm, Temperatur) in ihrer Nachbarschaft einsehen
* **Allergiker:innen**: Interessieren sich für Pollendaten und Luftqualität
* **Pendler:innen**: Benötigen Informationen zu Parkplatz-Verfügbarkeit oder Fahrradstellplätzen
* **Kommunalverwaltung**: Monitort Infrastruktur (Füllstände von Mülltonnen, Pegelstände)
* **Redakteur:innen**: Konfigurieren, welche Sensoren prominent im Widget angezeigt werden

## Funktionsumfang

* **Anzeige von Sensor-Daten**: Echtzeit-Daten von konfigurierten Sensoren werden im Widget angezeigt
* **Sensor-Typen**:
  * **Luftqualität**: PM2.5, PM10, NO2, O3, CO2
  * **Lärmpegel**: Dezibel (dB)
  * **Temperatur und Luftfeuchtigkeit**
  * **Parkplatz-Verfügbarkeit**: Anzahl freier Parkplätze
  * **Füllstände**: Mülltonnen, Altglas-Container, Pegelstände
  * **Pollen**: Pollenflugvorhersage
  * **Verkehrsdichte**: Anzahl Fahrzeuge pro Stunde
* **Visualisierung**:
  * Numerische Werte (z. B. "23°C", "42 freie Parkplätze")
  * Farbcodierung (grün = gut, gelb = mittel, rot = schlecht)
  * Kleine Diagramme (Sparklines) für Verlaufsdaten
  * Icons/Symbole für schnelle Erfassung
* **Interaktion**:
  * Klick/Tap auf Sensor führt zu Detail-Seite mit Verlaufsdiagrammen und historischen Daten
  * Link zu "Alle Sensoren anzeigen" (Karte mit allen Sensor-Standorten)
* **Standort-basierte Anzeige**: Sensoren in der Nähe des Nutzer-Standorts werden priorisiert
* **Schwellenwerte**: Warnungen bei Überschreitung von Grenzwerten (z. B. hohe Luftverschmutzung)

## Inhalte und Daten

* **Sensor-Daten** von IoT-Plattformen:
  * Sensor-ID, Typ, Standort (GPS-Koordinaten)
  * Messwert, Einheit, Zeitstempel
  * Schwellenwerte (gut/mittel/schlecht)
* **Widget-Konfiguration**:
  * Ausgewählte Sensoren (IDs oder Typen)
  * Anzahl angezeigter Sensoren
  * Layout-Optionen (Liste, Kacheln, Kompaktansicht)
* **Externe Datenquellen**:
  * Luftqualitätsdaten: Umweltbundesamt, OpenAQ
  * Parkplatzdaten: Kommunale Parkhäuser, ParkAPI
  * Wetterdaten: OpenWeatherMap, DWD
  * Pollendaten: DWD Pollenflug

## Konfiguration im CMS

* **Widget-Einstellungen**:
  * Auswahl der anzuzeigenden Sensoren (Dropdown mit allen verfügbaren Sensoren)
  * Anzahl der Sensoren im Widget (Standard: 3-5)
  * Layout-Typ: Kompakt (nur Werte), Erweitert (mit Sparklines)
  * Farbcodierung aktivieren/deaktivieren
  * Sortierung: Nach Standort, nach Sensor-Typ, nach Priorität
* **Platzierung**: Widget kann auf Dashboard, Startseite, Umwelt-Seite platziert werden
* **Schwellenwert-Konfiguration**: Redakteur:innen können Grenzwerte festlegen (z. B. "Luftqualität > 50 = Warnung")

## Integrationen und Schnittstellen

* **IoT-Plattformen**: Anbindung an LoRaWAN, TTN (The Things Network), FIWARE, OpenSenseMap
* **Externe APIs**:
  * Luftqualität: Umweltbundesamt API, OpenAQ API
  * Wetter: OpenWeatherMap, DWD API
  * Parken: ParkAPI, kommunale Parkhaussysteme
  * Pollen: DWD Pollenflug API
* **Karten-Modul**: Integration von Sensor-Standorten auf Karte
* **Push-Nachrichten**: Benachrichtigung bei Überschreitung von Schwellenwerten
* **Datenvisualisierung (Grafana)**: Verlinkung zu detaillierten Dashboards

## Nicht-funktionale Anforderungen

* **Performance**: Widget lädt innerhalb von 1 Sekunde
* **Echtzeit-Updates**: Sensor-Daten aktualisieren sich automatisch alle 5-15 Minuten (konfigurierbar)
* **Responsive Design**: Funktioniert auf allen Bildschirmgrößen
* **Offline-Fähigkeit**: Letzte gecachte Sensor-Daten werden auch offline angezeigt
* **Barrierefreiheit**: WCAG 2.1 AA-konform, Farbcodierung mit zusätzlichen Text-Labels

## Monitoring und KPIs

* **Widget-Nutzung**: Wie oft wird das Widget angezeigt?
* **Klickrate**: Wie viele Nutzer:innen klicken auf Sensoren für Details?
* **Beliebteste Sensor-Typen**: Welche Sensoren werden am häufigsten angesehen?
* **Warnungs-Interaktion**: Wie viele Nutzer:innen reagieren auf Schwellenwert-Warnungen?

## Abhängigkeiten

* **IoT-Backend**: Sensor-Daten müssen über API abrufbar sein
* **Dashboard-Modul**: Widget muss in Dashboard-System integrierbar sein
* **Karten-Modul**: Für Standort-basierte Anzeige (optional)
* **Push-Nachrichten-Modul**: Für Schwellenwert-Warnungen (optional)

## Offene Fragen

* Welche Sensoren sollen prioritär integriert werden? (Luftqualität, Parken, Füllstände?)
* Sollen historische Daten im Widget angezeigt werden (Tagesverlauf)?
* Sollen Nutzer:innen eigene Sensor-Favoriten speichern können?
* Sollen Sensoren aus verschiedenen Quellen aggregiert werden?
* Wie wird mit fehlenden oder veralteten Sensor-Daten umgegangen?

## Notizen aus Vorarbeit

_(Hier können vorhandene Notizen aus Miro oder anderen Quellen eingefügt werden)_
