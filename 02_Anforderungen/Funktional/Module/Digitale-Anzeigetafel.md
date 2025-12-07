# Modul: Digitale Anzeigetafel

## Zweck und Mehrwert

Die Digitale Anzeigetafel ist ein Modul für öffentliche Displays (z. B. in Rathäusern, Bibliotheken, Bushaltestellen, Marktplätzen), das aktuelle Informationen aus der App automatisch anzeigt. Es dient als Informations-Hub für Bürger:innen ohne Smartphone und fördert die Sichtbarkeit wichtiger kommunaler Inhalte im öffentlichen Raum. Die Anzeigetafel kann im Vollbild-Modus betrieben werden und rotiert automatisch durch verschiedene Inhalte.

## Zielgruppen und Nutzer:innen

* **Bürger:innen**: Sehen aktuelle Informationen an öffentlichen Orten (ohne Smartphone)
* **Besucher:innen**: Informieren sich über Events, Öffnungszeiten, Wegbeschreibungen
* **Kommunalverwaltung**: Nutzt digitale Tafeln zur Informationsvermittlung und Bürgerkommunikation
* **Redakteur:innen**: Konfigurieren, welche Inhalte auf welchen Tafeln angezeigt werden

## Funktionsumfang

* **Automatische Inhaltsrotation**:
  * Verschiedene Inhalte werden in einem konfigurierbaren Intervall (z. B. alle 10 Sekunden) angezeigt
  * Unterstützte Inhaltstypen:
    * **News**: Aktuelle Nachrichten aus dem News-Modul
    * **Events**: Kommende Veranstaltungen
    * **Baustellen**: Verkehrsstörungen und Baustellen
    * **Wetter**: Aktuelle Wetterdaten und Vorhersage
    * **Umfragen**: Laufende Umfragen mit QR-Code zur Teilnahme
    * **Wichtige Hinweise**: Notfallmeldungen, Warnungen, Ankündigungen
    * **Statische Inhalte**: Öffnungszeiten, Kontaktinformationen, Stadtplan
* **Layout-Optionen**:
  * Vollbild-Modus (für große Displays)
  * Split-Screen (mehrere Inhalte gleichzeitig)
  * Seitenleiste mit Live-Infos (Uhrzeit, Wetter, Ticker)
* **Interaktivität** (optional):
  * Touchscreen-Unterstützung für Kiosk-Modus (Nutzer:innen können durch Inhalte navigieren)
  * QR-Codes für Weiterleitung zur App oder zu Detailseiten
* **Zeitsteuerung**: Inhalte können zeitgesteuert angezeigt werden (z. B. nur während Öffnungszeiten)
* **Standort-basierte Inhalte**: Tafeln an verschiedenen Standorten zeigen relevante lokale Inhalte (z. B. Bibliothek zeigt Öffnungszeiten, Bushaltestelle zeigt Abfahrtszeiten)

## Inhalte und Daten

* **Inhalts-Daten** aus verschiedenen Modulen:
  * News, Events, Baustellen, Wetter, Umfragen, statische Seiten
* **Tafel-Konfiguration**:
  * Tafel-ID, Standort, Bildschirmgröße
  * Rotations-Intervall (Sekunden)
  * Layout-Typ (Vollbild, Split-Screen, mit Seitenleiste)
  * Zeitplan (z. B. nur Mo-Fr 8-18 Uhr)
  * Ausgewählte Inhalte (welche Module/Kategorien werden angezeigt?)
* **Notfallmeldungen**: Haben Priorität und unterbrechen normale Rotation

## Konfiguration im CMS

* **Tafel-Verwaltung**:
  * **Tafel hinzufügen**: Name, Standort, Beschreibung
  * **Inhaltsauswahl**: Welche Module/Kategorien sollen angezeigt werden?
  * **Rotations-Intervall**: Wie lange wird jeder Inhalt angezeigt? (Standard: 10-15 Sekunden)
  * **Layout-Typ**: Vollbild, Split-Screen, mit Seitenleiste
  * **Zeitplan**: Betriebszeiten (z. B. Mo-Fr 8-18 Uhr, Wochenende aus)
* **Inhalts-Priorisierung**:
  * Wichtige Inhalte (z. B. Notfallmeldungen) werden öfter angezeigt
  * Redakteur:innen können Inhalte manuell "featuren" (hervorheben)
* **Vorschau**: Redakteur:innen können Tafel-Inhalte im CMS simulieren und testen
* **Remote-Management**: Tafeln können aus der Ferne gesteuert werden (z. B. Ein/Aus, Inhalte anpassen)

## Integrationen und Schnittstellen

* **CMS-Module**: Bezieht Daten aus News, Events, Baustellen, Wetter, Umfragen, etc.
* **Notfallwarnsystem**: Integration mit Warndiensten (z. B. NINA, KATWARN)
* **ÖPNV-Daten**: Echtzeit-Abfahrtszeiten an Bushaltestellen
* **Sensoren**: Aktuelle Umweltdaten (Luftqualität, Temperatur) von lokalen Sensoren
* **Authentifizierung**: Tafeln authentifizieren sich über API-Keys oder OAuth

## Nicht-funktionale Anforderungen

* **Performance**: Inhalte laden innerhalb von 2 Sekunden
* **Zuverlässigkeit**: Tafeln müssen 24/7 stabil laufen (Watchdog, automatische Neustarts bei Fehlern)
* **Offline-Fähigkeit**: Gecachte Inhalte werden auch bei Verbindungsproblemen angezeigt
* **Responsive Design**: Tafeln funktionieren auf verschiedenen Bildschirmgrößen (Full HD, 4K, Portrait, Landscape)
* **Barrierefreiheit**: Große Schrift, hoher Kontrast, einfache Sprache

## Monitoring und KPIs

* **Tafel-Verfügbarkeit**: Uptime-Monitoring (sind Tafeln online?)
* **Inhalts-Rotation**: Wie oft werden verschiedene Inhalte angezeigt?
* **Interaktionen** (bei Touchscreen): Wie oft navigieren Nutzer:innen durch Inhalte?
* **QR-Code-Scans**: Wie oft werden QR-Codes gescannt?

## Abhängigkeiten

* **CMS-Module**: News, Events, Baustellen, Wetter, etc. müssen implementiert sein
* **Display-Hardware**: Bildschirme, Media-Player (z. B. Raspberry Pi, NUC, Smart TVs)
* **Netzwerk**: Stabile Internetverbindung oder lokales Caching
* **Remote-Management-Tool**: Für Fernsteuerung und Monitoring (z. B. Screenly, Xibo, Yodeck)

## Offene Fragen

* Welche Display-Hardware wird verwendet? (Smart TVs, Raspberry Pi, dedizierte Digital Signage Player?)
* Sollen Tafeln Touch-Interaktivität bieten (Kiosk-Modus)?
* Sollen Tafeln dynamische Werbung/Sponsoring anzeigen können?
* Wie wird mit Stromausfällen umgegangen (automatischer Neustart, Offline-Modus)?
* Sollen Nutzer:innen Feedback zu angezeigten Inhalten geben können (z. B. via QR-Code)?
* Sollen Tafeln mehrsprachig sein (automatischer Sprachwechsel)?

## Notizen aus Vorarbeit

_(Hier können vorhandene Notizen aus Miro oder anderen Quellen eingefügt werden)_
