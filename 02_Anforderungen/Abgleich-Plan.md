# Plan: Abgleich Anforderungsübersicht mit Detailanforderungen

**Erstellt:** 7. Dezember 2025  
**Zweck:** Systematischer Abgleich der Anforderungsübersicht.md mit den funktionalen und nicht-funktionalen Detailanforderungen

---

## 1. Ziel und Scope

### Ziel
Sicherstellen, dass die **Anforderungsübersicht.md** vollständig, korrekt und konsistent mit allen Detailanforderungen ist.

### Scope
- **IN:** Alle funktionalen Anforderungen (02_01_Funktional/)
- **IN:** Alle nicht-funktionalen Anforderungen (02_02_Nicht-funktional/)
- **IN:** Konsistenz-Prüfung (Priorisierung, Formulierung, Vollständigkeit)
- **OUT:** Milestone-Planung (separate Gap-Analyse bereits vorhanden)

### Erwartete Outputs
1. **Vollständige Übersicht** - alle Anforderungen aus Details sind in Übersicht enthalten
2. **Konsistente Priorisierung** - [MUSS], [SOLLTE], [KANN] korrekt verwendet
3. **Strukturierte Kategorisierung** - logische Gruppierung
4. **Fehlende Anforderungen identifiziert** - Liste was ergänzt werden muss
5. **Inkonsistenzen dokumentiert** - Abweichungen zwischen Übersicht und Details

---

## 2. Mapping: Übersicht ↔ Detaildateien

### Funktionale Anforderungen

| Übersicht-Kategorie | Detaildatei(en) | Status | Priorität |
|---------------------|-----------------|--------|-----------|
| 1.1 Benutzer- und Rechteverwaltung | `Benutzer.md` | ✅ Vorhanden | **PRIO 1** |
| 1.2 Allgemeine CMS-Funktionen | `CMS.md` | ✅ Vorhanden | **PRIO 1** |
| 1.3 App-Gestaltung und Navigation | `App-Design.md` | ✅ Vorhanden | **PRIO 1** |
| 1.4 Schnittstellen und Integrationen | `Schnittstellen.md` | ✅ Vorhanden | **PRIO 2** |
| 1.5 Monitoring und Logging | `Monitoring.md` | ✅ Vorhanden | **PRIO 2** |
| 1.6 KI-Integration | `KI.md` | ✅ Vorhanden | **PRIO 2** |
| 1.7 Hilfe- und Support-System | `Hilfe.md` | ✅ Vorhanden | **PRIO 2** |
| 1.8 App-Veröffentlichung / Releases | `Releases.md` | ✅ Vorhanden | **PRIO 2** |
| 1.9 Daten-Löschkonzept | `Daten-Loeschkonzept.md` | ✅ Vorhanden | **PRIO 2** |
| 1.10 Modulmanagement | `CMS.md` (Modulverwaltung-Sektion) | ⚠️ Teil von CMS.md | **PRIO 2** |
| 1.11 Module (Übersicht) | `Module/*.md` (60 Dateien) | ⚠️ 55 Templates | **PRIO 3** |

### Nicht-funktionale Anforderungen

| Übersicht-Kategorie | Detaildatei(en) | Status | Priorität |
|---------------------|-----------------|--------|-----------|
| 2.1 Qualität und Zuverlässigkeit | `02_02_Nicht-funktional/` | 🔍 Zu prüfen | **PRIO 4** |
| 2.2 Sicherheit und Datenschutz | `02_02_Nicht-funktional/` | 🔍 Zu prüfen | **PRIO 4** |
| 2.3 Betrieb und Wartung | `02_02_Nicht-funktional/` | 🔍 Zu prüfen | **PRIO 4** |
| 2.4 Nutzerfreundlichkeit | `02_02_Nicht-funktional/` | 🔍 Zu prüfen | **PRIO 4** |
| 2.5 Interoperabilität und Integration | `02_02_Nicht-funktional/` | 🔍 Zu prüfen | **PRIO 4** |
| 2.6 Governance und Nachhaltigkeit | `02_02_Nicht-funktional/` | 🔍 Zu prüfen | **PRIO 4** |
| 2.7 Föderale IT-Architekturrichtlinien | `02_02_Nicht-funktional/` | 🔍 Zu prüfen | **PRIO 4** |
| 2.8 Secure Software Lifecycle | `02_02_Nicht-funktional/` | 🔍 Zu prüfen | **PRIO 4** |

---

## 3. Methodik

### Abgleich-Prozess pro Kategorie

1. **Lesen der Detaildatei**
   - Vollständigen Inhalt erfassen
   - Struktur und Gliederung verstehen
   - Anforderungen identifizieren

2. **Vergleich mit Übersicht**
   - Jede Anforderung in Detail → Übersicht suchen
   - Priorisierung prüfen (MUSS/SOLLTE/KANN)
   - Formulierung vergleichen
   - Vollständigkeit prüfen

3. **Dokumentation der Ergebnisse**
   - ✅ Übereinstimmung
   - ⚠️ Abweichung (unterschiedliche Formulierung/Priorisierung)
   - ❌ Fehlt komplett in Übersicht
   - 🔄 Redundant (mehrfach vorhanden)
   - 📝 Notizen zu Inkonsistenzen

4. **Ergänzung/Korrektur**
   - Fehlende Anforderungen zur Übersicht hinzufügen
   - Inkonsistenzen bereinigen
   - Struktur optimieren

### Tools und Techniken

- **Datei-Vergleich:** Visueller Vergleich Zeile für Zeile
- **Grep-Suche:** Schlüsselbegriffe in Übersicht suchen
- **Checkbox-Liste:** Fortschritt tracken
- **Notizen-Dokument:** Gefundene Issues dokumentieren

---

## 4. Phasen und Schritte

### PHASE 1: Vorbereitung (30 Min.)

#### Schritt 1.1: Struktur analysieren
- [ ] Liste aller Dateien in `02_01_Funktional/` erstellen
- [ ] Liste aller Dateien in `02_02_Nicht-funktional/` erstellen
- [ ] Übersicht-Struktur dokumentieren (bereits oben erledigt)

#### Schritt 1.2: Arbeitsumgebung vorbereiten
- [ ] Notizen-Dokument `Abgleich-Ergebnisse.md` erstellen
- [ ] Template für Abgleich-Notizen definieren
- [ ] Fortschritts-Tracker anlegen

**Output:** Vollständiges Mapping und Arbeitsstruktur

---

### PHASE 2: Funktionale Anforderungen (PRIO 1) - Kernfunktionen (3-4 Stunden)

Diese Phase ist kritisch, da hier die Basis-Funktionalität des CMS definiert wird.

#### Schritt 2.1: Benutzer- und Rechteverwaltung
**Datei:** `02_01_Funktional/Benutzer.md`

Aufgaben:
- [ ] Benutzer.md vollständig lesen
- [ ] Alle Anforderungen extrahieren (Liste erstellen)
- [ ] Mit Übersicht 1.1 vergleichen
- [ ] Fehlende Anforderungen identifizieren
- [ ] Priorisierung überprüfen
- [ ] Ergebnisse dokumentieren

**Fokus-Bereiche:**
- Rollen- und Rechtemanagement
- Authentifizierung (2FA, SSO, Passkeys)
- Benutzer-Accounts
- Datenschutz (DSGVO)
- Organisationsstrukturen

**Erwartete Issues:**
- Möglicherweise neue Anforderungen in Benutzer.md, die nicht in Übersicht sind
- Priorisierungs-Unterschiede (MUSS vs SOLLTE)

#### Schritt 2.2: Allgemeine CMS-Funktionen
**Datei:** `02_01_Funktional/CMS.md` (870 Zeilen - umfangreich!)

Aufgaben:
- [ ] CMS.md in Abschnitte unterteilen
- [ ] Abschnitt für Abschnitt mit Übersicht 1.2 abgleichen
- [ ] Besondere Aufmerksamkeit auf:
  - Dashboard (Widget-System)
  - Suche und Navigation
  - Export-Funktionen (CSV/JSON/GeoJSON)
  - Karten-Darstellung
  - App-Instanzen-Verwaltung
  - E-Mail-Konfiguration
  - Sprachverwaltung (i18n)
- [ ] Ergebnisse dokumentieren

**Bekannte Großthemen aus Gap-Analyse:**
- App-Instanzen-Verwaltung (umfangreich)
- E-Mail-Konfiguration (umfangreich)
- Sprachverwaltung (umfangreich)
- Export-Funktionen (detailliert)

#### Schritt 2.3: App-Gestaltung und Navigation
**Datei:** `02_01_Funktional/App-Design.md`

Aufgaben:
- [ ] App-Design.md lesen
- [ ] Mit Übersicht 1.3 vergleichen
- [ ] Fokus auf:
  - App-Branding (Logo, Farben, Fonts)
  - CI/CD-Pipeline
  - KI-gestützte Design-Übernahme
  - Listenansichten
- [ ] Ergebnisse dokumentieren

**Output PHASE 2:** Vollständiger Abgleich der 3 Kernbereiche, Liste fehlender/abweichender Anforderungen

---

### PHASE 3: Funktionale Anforderungen (PRIO 2) - Integrationen (3-4 Stunden)

#### Schritt 3.1: Schnittstellen und Integrationen
**Datei:** `02_01_Funktional/Schnittstellen.md`

Aufgaben:
- [ ] Schnittstellen.md lesen
- [ ] Mit Übersicht 1.4 vergleichen
- [ ] Fokus auf:
  - Schnittstellenmanager
  - API-Key-Verwaltung
  - Endpoint-Konfiguration
  - Mapping-Editor
  - Test-Werkzeug
- [ ] Ergebnisse dokumentieren

#### Schritt 3.2: Monitoring und Logging
**Datei:** `02_01_Funktional/Monitoring.md`

Aufgaben:
- [ ] Monitoring.md lesen
- [ ] Mit Übersicht 1.5 vergleichen
- [ ] Fokus auf:
  - Systemmonitoring
  - Schnittstellenmonitoring
  - Logging
  - Alerts und Warnungen
- [ ] Ergebnisse dokumentieren

#### Schritt 3.3: KI-Integration
**Datei:** `02_01_Funktional/KI.md`

Aufgaben:
- [ ] KI.md lesen
- [ ] Mit Übersicht 1.6 vergleichen
- [ ] Fokus auf:
  - Content-KI
  - Barrierefreiheits-KI
  - Klassifikation & Tagging
  - Duplicate Detection
  - KI-gestützte Konfiguration
- [ ] Ergebnisse dokumentieren

#### Schritt 3.4: Hilfe- und Support-System
**Datei:** `02_01_Funktional/Hilfe.md`

Aufgaben:
- [ ] Hilfe.md lesen
- [ ] Mit Übersicht 1.7 vergleichen
- [ ] Fokus auf:
  - Dokumentationssystem
  - Ticket-System
  - Tutorials
- [ ] Ergebnisse dokumentieren

#### Schritt 3.5: App-Veröffentlichung / Releases
**Datei:** `02_01_Funktional/Releases.md`

Aufgaben:
- [ ] Releases.md lesen
- [ ] Mit Übersicht 1.8 vergleichen
- [ ] Fokus auf:
  - Release-Management
  - Rollback-Mechanismen
  - Feature-Flags
- [ ] Ergebnisse dokumentieren

#### Schritt 3.6: Daten-Löschkonzept
**Datei:** `02_01_Funktional/Daten-Loeschkonzept.md`

Aufgaben:
- [ ] Daten-Loeschkonzept.md lesen
- [ ] Mit Übersicht 1.9 vergleichen
- [ ] Fokus auf:
  - DSGVO-Konformität
  - Löschfristen
  - Prozesse
- [ ] Ergebnisse dokumentieren

#### Schritt 3.7: Modulmanagement
**Datei:** `02_01_Funktional/CMS.md` (Modulverwaltung-Sektion)

Aufgaben:
- [ ] Modulverwaltung-Sektion in CMS.md finden
- [ ] Mit Übersicht 1.10 vergleichen
- [ ] Fokus auf:
  - Modul-Aktivierung/Deaktivierung
  - Modul-Konfiguration
  - Modul-Baukasten (No-Code)
  - SDK für externe Module
- [ ] Ergebnisse dokumentieren

**Output PHASE 3:** Vollständiger Abgleich der 7 Integrations-Bereiche

---

### PHASE 4: Funktionale Anforderungen (PRIO 3) - Module (6-8 Stunden)

⚠️ **Herausforderung:** 60 Module, davon 55 nur Templates (laut Gap-Analyse)

**Strategie:**
1. **Erst vollständig ausgearbeitete Module** (5 Module: News, Events, POIs, Touren, Baustellen?)
2. **Dann Template-Module** (55 Module - nur Struktur prüfen)

#### Schritt 4.1: Vollständig ausgearbeitete Module abgleichen
**Dateien:** `02_01_Funktional/Module/*.md` (5 ausgearbeitete)

Aufgaben:
- [ ] Liste der 5 ausgearbeiteten Module identifizieren (aus Gap-Analyse bekannt):
  - News.md
  - Events.md
  - POIs/Orte.md
  - Touren.md
  - Baustellen.md
- [ ] Jedes Modul einzeln abgleichen mit Übersicht 1.11
- [ ] Detaillierte Anforderungen extrahieren
- [ ] Priorisierung prüfen
- [ ] Ergebnisse dokumentieren

#### Schritt 4.2: Template-Module überprüfen (Sampling)
**Dateien:** `02_01_Funktional/Module/*.md` (55 Templates)

**Strategie:** Stichproben-Prüfung statt vollständiger Abgleich

Aufgaben:
- [ ] 10 Template-Module auswählen (z.B. Mängelmelder, Abfallkalender, Umfragen, etc.)
- [ ] Struktur prüfen: Sind sie wirklich nur Templates?
- [ ] Falls Templates: In Übersicht nur Modul-Name und "Template" vermerken
- [ ] Falls ausgearbeitet: Vollständiger Abgleich wie in 4.1
- [ ] Entscheidung dokumentieren: Sollen Templates in Übersicht detailliert sein?

**Diskussionspunkt:**
Sollen Template-Module in der Übersicht detailliert aufgeführt werden oder nur als "Geplante Module (Templates)" zusammengefasst?

**Output PHASE 4:** 
- Vollständiger Abgleich der 5 ausgearbeiteten Module
- Entscheidung über Behandlung von Template-Modulen
- Ggf. zusammenfassende Liste aller 60 Module mit Status

---

### PHASE 5: Nicht-funktionale Anforderungen (PRIO 4) (3-4 Stunden)

#### Schritt 5.1: Dateien in 02_02_Nicht-funktional/ identifizieren

Aufgaben:
- [ ] Alle Dateien in `02_02_Nicht-funktional/` auflisten
- [ ] Zuordnung zu Übersicht-Kategorien 2.1-2.8 erstellen

#### Schritt 5.2: Kategorie-für-Kategorie-Abgleich

**Für jede Kategorie (2.1 - 2.8):**
- [ ] Entsprechende Detaildatei(en) lesen
- [ ] Mit Übersicht vergleichen
- [ ] Fehlende Anforderungen identifizieren
- [ ] Priorisierung prüfen
- [ ] Ergebnisse dokumentieren

**Kategorien:**
1. [ ] 2.1 Qualität und Zuverlässigkeit
2. [ ] 2.2 Sicherheit und Datenschutz
3. [ ] 2.3 Betrieb und Wartung
4. [ ] 2.4 Nutzerfreundlichkeit
5. [ ] 2.5 Interoperabilität und Integration
6. [ ] 2.6 Governance und Nachhaltigkeit
7. [ ] 2.7 Föderale IT-Architekturrichtlinien (FIT)
8. [ ] 2.8 Secure Software Lifecycle (BSI TR-03185-2)

**Besondere Aufmerksamkeit:**
- Messkriterien (Performance-Anforderungen, Verfügbarkeit, etc.)
- Compliance-Anforderungen (WCAG, BITV, BSI, FIT)
- Sicherheitsstandards (OWASP, Penetrationstests, etc.)

**Output PHASE 5:** Vollständiger Abgleich aller nicht-funktionalen Anforderungen

---

### PHASE 6: Konsolidierung und Qualitätssicherung (2-3 Stunden)

#### Schritt 6.1: Ergebnisse zusammenfassen
- [ ] Alle Abgleich-Notizen aus Phasen 2-5 konsolidieren
- [ ] Kategorisieren:
  - ❌ Fehlende Anforderungen (Liste)
  - ⚠️ Inkonsistenzen (Liste mit Empfehlungen)
  - 🔄 Redundanzen (zu entfernen)
  - 📝 Verbesserungsvorschläge (Formulierung, Struktur)

#### Schritt 6.2: Priorisierung der Änderungen
- [ ] **CRITICAL:** Fehlende MUSS-Anforderungen
- [ ] **HIGH:** Inkonsistenzen in Priorisierung
- [ ] **MEDIUM:** Fehlende SOLLTE-Anforderungen
- [ ] **LOW:** Formulierungs-Optimierungen

#### Schritt 6.3: Änderungen an Übersicht durchführen
- [ ] Fehlende Anforderungen ergänzen
- [ ] Inkonsistenzen bereinigen
- [ ] Redundanzen entfernen
- [ ] Struktur optimieren (falls nötig)

#### Schritt 6.4: Qualitätssicherung
- [ ] Vollständigkeit prüfen: Alle wichtigen Anforderungen vorhanden?
- [ ] Konsistenz prüfen: Priorisierung einheitlich?
- [ ] Lesbarkeit prüfen: Verständlich formuliert?
- [ ] Verlinkung prüfen: Interne Referenzen korrekt?

#### Schritt 6.5: Abschlussdokumentation
- [ ] Änderungsprotokoll erstellen (was wurde ergänzt/geändert)
- [ ] Statistik erstellen:
  - Anzahl geprüfter Anforderungen
  - Anzahl ergänzter Anforderungen
  - Anzahl bereinigter Inkonsistenzen
- [ ] Lessons Learned dokumentieren

**Output PHASE 6:** 
- Aktualisierte, vollständige Anforderungsübersicht
- Änderungsprotokoll
- Qualitätsgesicherte Dokumentation

---

## 5. Erwartete Ergebnisse

### Quantitative Metriken
- **Anzahl geprüfter Anforderungen:** ~500-800 (geschätzt)
- **Abdeckungsgrad:** >95% (alle wesentlichen Anforderungen in Übersicht)
- **Konsistenzgrad:** 100% (keine Widersprüche zwischen Detail und Übersicht)

### Qualitative Outputs
1. **Vollständige Anforderungsübersicht** - Zentrale Referenz für alle Anforderungen
2. **Konsistente Dokumentation** - Einheitliche Priorisierung und Formulierung
3. **Nachvollziehbarkeit** - Klare Zuordnung Detail ↔ Übersicht
4. **Wartbarkeit** - Leicht aktualisierbar bei Änderungen

---

## 6. Zeitschätzung

| Phase | Aufwand | Kumulative Zeit |
|-------|---------|-----------------|
| Phase 1: Vorbereitung | 0,5 Stunden | 0,5h |
| Phase 2: Funktionale Anforderungen (PRIO 1) | 3-4 Stunden | 4,5h |
| Phase 3: Funktionale Anforderungen (PRIO 2) | 3-4 Stunden | 8,5h |
| Phase 4: Funktionale Anforderungen (PRIO 3) - Module | 6-8 Stunden | 16,5h |
| Phase 5: Nicht-funktionale Anforderungen | 3-4 Stunden | 20,5h |
| Phase 6: Konsolidierung & QS | 2-3 Stunden | 23,5h |
| **GESAMT** | **18-24 Stunden** | **~3 Arbeitstage** |

**Empfehlung:** Über 1 Woche verteilen (3-4 Stunden pro Tag)

---

## 7. Risiken und Mitigation

| Risiko | Wahrscheinlichkeit | Impact | Mitigation |
|--------|-------------------|--------|------------|
| **Umfang unterschätzt** (Module sehr umfangreich) | Hoch | Hoch | Sampling-Strategie für Templates |
| **Inkonsistenzen schwer zu bereinigen** | Mittel | Mittel | Klare Prioritäten definieren, ggf. Rücksprache |
| **Übersicht wird zu lang** | Mittel | Niedrig | Zusammenfassungen verwenden, Details verlinken |
| **Neue Anforderungen während Abgleich** | Niedrig | Mittel | In separatem Dokument sammeln, später integrieren |

---

## 8. Praktische Tipps

### Empfohlene Arbeitsweise
1. **Nicht alles auf einmal:** Phasenweise vorgehen, Pausen machen
2. **Notizen während Arbeit:** Sofort dokumentieren, nicht am Ende
3. **Stichproben bei großen Mengen:** Nicht jedes Template-Modul im Detail
4. **Rückfragen klären:** Bei Unklarheiten lieber nachfragen als raten
5. **Versionierung:** Vor großen Änderungen Backup der Übersicht erstellen

### Tools
- **Markdown-Editor:** VS Code mit Markdown-Preview
- **Datei-Vergleich:** VS Code Diff-Ansicht
- **Suche:** Grep oder VS Code Search
- **Notizen:** Separates Markdown-Dokument oder Checkboxen in diesem Plan

### Template für Abgleich-Notizen

```markdown
## Kategorie: [Name]
**Datei:** [Pfad]
**Datum:** [Datum]

### Übereinstimmungen
- [Anforderung X] ✅
- [Anforderung Y] ✅

### Fehlende Anforderungen
- ❌ [Detail-Anforderung Z] fehlt in Übersicht
  - Priorität: [MUSS/SOLLTE/KANN]
  - Empfehlung: In Abschnitt [X.Y] ergänzen

### Inkonsistenzen
- ⚠️ [Anforderung A]: Detail sagt MUSS, Übersicht sagt SOLLTE
  - Empfehlung: [Begründung und Lösung]

### Redundanzen
- 🔄 [Anforderung B] mehrfach vorhanden (Zeile X und Y)
  - Empfehlung: Zusammenfassen oder eine Version entfernen

### Verbesserungsvorschläge
- 📝 [Anforderung C]: Formulierung unklar
  - Vorschlag: [Neue Formulierung]
```

---

## 9. Nächste Schritte

### Sofort starten
1. [ ] Diesen Plan durchlesen und verstehen
2. [ ] Entscheidung: Wer führt den Abgleich durch?
3. [ ] Zeitslots einplanen (3 Tage innerhalb 1 Woche)
4. [ ] Arbeitsumgebung vorbereiten (Editoren, Notizen)

### Phase 1 beginnen
5. [ ] Dateiliste erstellen
6. [ ] Notizen-Dokument anlegen
7. [ ] Mit Abgleich starten (siehe Phasen 2-6)

### Nach Abschluss
8. [ ] Ergebnisse reviewen
9. [ ] Änderungsprotokoll teilen
10. [ ] Entscheiden: Sind weitere Iterationen nötig?

---

## 10. Erfolgskriterien

Der Abgleich ist erfolgreich, wenn:

- ✅ **Vollständigkeit:** Alle wesentlichen Anforderungen aus Details sind in Übersicht
- ✅ **Konsistenz:** Keine Widersprüche in Priorisierung oder Formulierung
- ✅ **Nachvollziehbarkeit:** Klares Mapping zwischen Detail und Übersicht
- ✅ **Wartbarkeit:** Strukturiert und leicht zu aktualisieren
- ✅ **Nutzbarkeit:** Als zentrale Referenz für Projekt verwendbar

---

**Ende des Plans**

Bei Fragen oder Anpassungsbedarf kann dieser Plan jederzeit erweitert oder modifiziert werden.
