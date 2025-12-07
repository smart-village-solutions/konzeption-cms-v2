# Plan: Abgleich Anforderungen mit Roadmap/Milestones

**Stand:** 7. Dezember 2025  
**Ziel:** Sicherstellen, dass alle Anforderungen aus der Anforderungsübersicht in den 10 Milestones abgedeckt sind

---

## Überblick

### Ausgangslage

- ✅ **Anforderungsübersicht vollständig** (19 Kategorien, 500+ Anforderungen)
- ✅ **10 Milestones definiert** (Milestone_01.md bis Milestone_10.md)
- ❓ **Abdeckung unklar**: Welche Anforderungen sind in welchem Milestone? Was fehlt?

### Ziel des Abgleichs

1. **Vollständigkeit prüfen**: Sind alle Anforderungen in Milestones zugeordnet?
2. **Lücken identifizieren**: Welche Anforderungen fehlen in den Milestones?
3. **Zuordnung dokumentieren**: Mapping Anforderung → Milestone(s)
4. **Milestones ergänzen**: Fehlende Anforderungen zuordnen
5. **Konsistenz sichern**: Überschneidungen vermeiden, logische Reihenfolge prüfen

---

## Methodik

### Phase 1: Vorbereitung (30 Min.)

**Schritt 1.1: Milestone-Struktur erfassen**
- Alle 10 Milestone-Dateien lesen
- Übersicht erstellen: Titel, Status, Hauptbestandteile
- Grobe Kategorisierung nach Themen

**Schritt 1.2: Anforderungs-Kategorien listen**
- 11 funktionale Kategorien (1.1-1.11)
- 8 nicht-funktionale Kategorien (2.1-2.8)
- Priorisierung beachten ([MUSS], [SOLLTE], [KANN])

**Output:** Mapping-Tabelle (Anforderungskategorie → erwarteter Milestone)

---

### Phase 2: Systematischer Abgleich (6-8h)

**Strategie:** Kategorie-für-Kategorie durch alle Anforderungen gehen

#### Phase 2.1: Funktionale Anforderungen (5-6h)

**Für jede Anforderungskategorie:**

1. **Anforderungen aus Übersicht lesen**
   - Alle [MUSS], [SOLLTE], [KANN] Anforderungen erfassen
   - Besonders: Messkriterien beachten

2. **In Milestones suchen**
   - Grep-Suche nach Schlüsselbegriffen
   - Manuelle Prüfung der relevanten Milestones
   - Dokumentieren: Wo gefunden? Vollständig? Teilweise?

3. **Status bewerten**
   - ✅ Vollständig abgedeckt
   - ⚠️ Teilweise abgedeckt (Details fehlen, Messkriterien fehlen)
   - ❌ Nicht gefunden (fehlt komplett)

4. **Lücken dokumentieren**
   - Fehlende Anforderungen auflisten
   - Empfohlenen Milestone vorschlagen
   - Priorität bewerten

**Abgleich-Reihenfolge (nach Priorität):**

1. **1.1 Benutzer- und Rechteverwaltung** → Erwartung: Milestone 1
2. **1.2 Allgemeine CMS-Funktionen** → Erwartung: Milestone 1-3
   - Dashboard → MS1
   - Export-Funktionen → MS2
   - Karten-Darstellung → MS2
   - **Mehrsprachigkeit** → MS3 (neu ergänzt in Übersicht!)
   - **Medienverwaltung** → MS1 (neu ergänzt in Übersicht!)
3. **1.3 App-Gestaltung** → Erwartung: Milestone 4
4. **1.4 Schnittstellen** → Erwartung: Milestone 5-6
5. **1.5 Monitoring** → Erwartung: Milestone 7-8
6. **1.6 KI-Integration** → Erwartung: Milestone 8-9
7. **1.7 Hilfe-System** → Erwartung: Milestone 3-4
8. **1.8 Releases** → Erwartung: Milestone 10
9. **1.9 Daten-Löschkonzept** → Erwartung: Milestone 3 oder 7
10. **1.10 Modulmanagement** → Erwartung: Milestone 1-2
11. **1.11 Module (60 Stück)** → Erwartung: Verteilt auf MS2-9

**Besondere Aufmerksamkeit:**

- **Neu ergänzte Anforderungen** (Mehrsprachigkeit, Medienverwaltung) prüfen
- **Messkriterien** explizit abgleichen
- **60 Module** einzeln prüfen (Sampling-Strategie nutzen)

#### Phase 2.2: Nicht-funktionale Anforderungen (1-2h)

**Ansatz:** Quick-Check, da nicht-funktionale Anforderungen meist übergreifend gelten

**Für jede Kategorie:**

1. **Prüfen ob erwähnt:**
   - Performance-Anforderungen in Milestones?
   - Sicherheitsanforderungen explizit genannt?
   - Deployment-Strategien beschrieben?

2. **Zuordnung:**
   - Nicht-funktionale Anforderungen gelten meist für ALLE Milestones
   - Aber: Einige haben konkrete Umsetzungs-Milestones
   - Z.B.: Monitoring-Dashboard → MS7, Security-Audit → MS8

**Abgleich-Reihenfolge:**

1. **2.1 Qualität/Zuverlässigkeit** → Performance-Metriken in MS7-8?
2. **2.2 Sicherheit/Datenschutz** → Security-Konzept in MS1, Tests in MS8?
3. **2.3 Betrieb/Wartung** → Deployment in MS10?
4. **2.4 Nutzerfreundlichkeit** → Barrierefreiheit durchgängig?
5. **2.5 Interoperabilität** → API-Standards in MS5-6?
6. **2.6 Governance** → Open Source-Aspekte in MS10?
7. **2.7 FIT-Richtlinien** → Compliance in MS8-10?
8. **2.8 BSI Lifecycle** → Security-Prozesse in MS8?

---

### Phase 3: Lücken-Analyse und Zuordnung (2-3h)

**Schritt 3.1: Lücken konsolidieren**
- Alle fehlenden Anforderungen sammeln
- Nach Priorität sortieren ([MUSS] zuerst)
- Nach Themen gruppieren

**Schritt 3.2: Milestone-Zuordnung vorschlagen**

Für jede fehlende Anforderung:

1. **Logischen Milestone identifizieren:**
   - Technische Abhängigkeiten beachten
   - Thematische Kohärenz wahren
   - Milestone-Größe berücksichtigen (nicht überladen)

2. **Alternative Milestones prüfen:**
   - Passt besser in MS X oder MS Y?
   - Könnte auf 2 Milestones aufgeteilt werden?
   - Ist ein neuer Milestone nötig? (Nein, max. 10!)

3. **Priorisierung:**
   - [MUSS]: Muss in einen der 10 Milestones
   - [SOLLTE]: Sollte zugeordnet werden, ggf. optionale Erweiterung
   - [KANN]: Optional, kann als "Nice-to-Have" für späteren Milestone markiert werden

**Schritt 3.3: Empfehlungen formulieren**

Für jeden Milestone mit Lücken:

```markdown
### Milestone X: [Titel]

**Fehlende Anforderungen (MUSS):**
1. [Anforderung] (aus Kategorie 1.X)
2. [Anforderung] (aus Kategorie 2.X)

**Fehlende Anforderungen (SOLLTE):**
1. [Anforderung]
2. [Anforderung]

**Empfehlung:** Diese Anforderungen in Milestone_0X.md ergänzen, Sektion "XYZ"
```

---

### Phase 4: Dokumentation (1-2h)

**Schritt 4.1: Ergebnis-Dokument erstellen**

Datei: `Anforderungen-Roadmap-Abgleich-Ergebnisse.md`

Struktur:

```markdown
# Abgleich-Ergebnisse: Anforderungen vs. Milestones

## Executive Summary
- X% aller Anforderungen abgedeckt
- Y Anforderungen fehlen komplett
- Z Anforderungen teilweise abgedeckt

## Detailanalyse pro Milestone

### Milestone 1: Rollenrechte & MVP
**Abgedeckte Anforderungen:**
- 1.1 Benutzer/Rechte: ✅ Vollständig
- 1.2 Medienverwaltung: ✅ Vollständig
- ...

**Fehlende Anforderungen:**
- [Liste]

**Empfohlene Ergänzungen:**
- [Liste mit Begründung]

### Milestone 2: [...]
[...]

## Kritische Lücken

### MUSS-Anforderungen ohne Milestone
1. [Anforderung] → Empfehlung: MS X
2. [...]

### Wichtige SOLLTE-Anforderungen ohne Milestone
[...]

## Überlappungen und Konflikte
[Falls Anforderungen in mehreren Milestones auftauchen]

## Empfehlungen zur Milestone-Anpassung
[Konkrete Änderungsvorschläge für Milestone-Dateien]
```

**Schritt 4.2: Mapping-Matrix erstellen**

Tabelle: Alle Anforderungskategorien × Milestones

```markdown
| Anforderung | MS1 | MS2 | MS3 | MS4 | MS5 | MS6 | MS7 | MS8 | MS9 | MS10 |
|-------------|-----|-----|-----|-----|-----|-----|-----|-----|-----|------|
| 1.1 Benutzer/Rechte | ✅ | - | - | - | - | - | - | - | - | - |
| 1.2 CMS-Funktionen | ⚠️ | ✅ | ⚠️ | - | - | - | - | - | - | - |
| ... | ... | ... | ... | ... | ... | ... | ... | ... | ... | ... |
```

Legende:
- ✅ Vollständig abgedeckt
- ⚠️ Teilweise abgedeckt
- ❌ Fehlend
- - Nicht relevant für diesen Milestone

**Schritt 4.3: Änderungsvorschläge für Milestone-Dateien**

Für jeden Milestone mit Lücken:

```markdown
## Änderungsvorschläge Milestone_0X.md

### Sektion "Bestandteile" ergänzen:

**Neu hinzufügen:**

#### [Kategorie-Name]
- [Anforderung 1]
- [Anforderung 2]
- [...]

**Begründung:** Diese Anforderungen sind MUSS-Anforderungen aus Kategorie 1.X und passen thematisch zu MS X, weil [...]
```

---

### Phase 5: Validierung (1h)

**Schritt 5.1: Konsistenz-Checks**

- [ ] Alle [MUSS]-Anforderungen einem Milestone zugeordnet?
- [ ] Alle [SOLLTE]-Anforderungen geprüft?
- [ ] Keine Überlappungen/Konflikte?
- [ ] Milestones ausgewogen groß?
- [ ] Technische Abhängigkeiten eingehalten?
- [ ] Prioritäten-Reihenfolge logisch?

**Schritt 5.2: Stakeholder-Review (optional)**

- Ergebnisse mit Team/Auftraggeber reviewen
- Priorisierung bestätigen lassen
- Milestone-Zuordnungen diskutieren

**Schritt 5.3: Finale Anpassungen**

- Feedback einarbeiten
- Dokumentation finalisieren

---

### Phase 6: Umsetzung (variabel, je nach Lücken)

**Schritt 6.1: Milestone-Dateien aktualisieren**

Für jeden Milestone mit Ergänzungen:

1. Milestone_0X.md öffnen
2. Sektion "Bestandteile" erweitern
3. Fehlende Anforderungen einfügen
4. Struktur/Formatierung anpassen
5. Speichern und committen

**Schritt 6.2: Cross-References aktualisieren**

- Anforderungsübersicht: Links zu Milestones einfügen?
- Milestone-Dateien: Links zu Anforderungen einfügen?
- Roadmap-Übersicht aktualisieren (falls vorhanden)

**Schritt 6.3: Finale Dokumentation**

- README oder Projektdoku aktualisieren
- Change-Log erstellen (was wurde ergänzt?)
- Team informieren

---

## Zeitschätzung

| Phase | Beschreibung | Aufwand | Kumulativ |
|-------|-------------|---------|-----------|
| Phase 1 | Vorbereitung | 30 Min. | 30 Min. |
| Phase 2.1 | Funktionale Anforderungen | 5-6h | 5,5-6,5h |
| Phase 2.2 | Nicht-funktionale Anforderungen | 1-2h | 6,5-8,5h |
| Phase 3 | Lücken-Analyse & Zuordnung | 2-3h | 8,5-11,5h |
| Phase 4 | Dokumentation | 1-2h | 9,5-13,5h |
| Phase 5 | Validierung | 1h | 10,5-14,5h |
| Phase 6 | Umsetzung (Milestone-Updates) | 2-4h | 12,5-18,5h |
| **GESAMT** | | **~12-19h** | **2-3 Arbeitstage** |

---

## Erfolgskriterien

✅ **Vollständigkeit:** Alle [MUSS]-Anforderungen sind in Milestones zugeordnet  
✅ **Konsistenz:** Keine Widersprüche oder Überlappungen  
✅ **Nachvollziehbarkeit:** Mapping-Matrix zeigt klare Zuordnung  
✅ **Umsetzbarkeit:** Milestone-Dateien sind aktualisiert und einsatzbereit  
✅ **Qualität:** Dokumentation ist vollständig und verständlich

---

## Werkzeuge & Hilfsmittel

### Für die Durchführung:

1. **Grep/Suche:** Schnelles Finden von Schlüsselbegriffen in Milestones
2. **Spreadsheet/Tabelle:** Mapping-Matrix pflegen
3. **Markdown-Editor:** Ergebnis-Dokument schreiben
4. **Git:** Versionierung der Änderungen

### Dateien:

- **Input:**
  - `/02_Anforderungen/Anforderungsuebersicht.md` (791 Zeilen, 19 Kategorien)
  - `/04_Roadmap/Milestone_01.md` bis `Milestone_10.md` (10 Dateien)
  - `/02_Anforderungen/02_01_Funktional/*.md` (19 Detaildateien zur Referenz)

- **Output:**
  - `Anforderungen-Roadmap-Abgleich-Ergebnisse.md` (neu)
  - `Milestone_01.md` bis `Milestone_10.md` (aktualisiert)
  - Optional: `Anforderungen-Milestone-Mapping.csv` (Tabelle)

---

## Risiken & Herausforderungen

### Risiken:

1. **Umfang unterschätzt:** 500+ Anforderungen × 10 Milestones = viele Kombinationen
   - **Mitigation:** Sampling-Strategie nutzen, Fokus auf [MUSS]-Anforderungen

2. **Milestones überladen:** Zu viele Anforderungen in einem Milestone
   - **Mitigation:** Priorisierung streng anwenden, [KANN]-Anforderungen zurückstellen

3. **Unklare Zuordnung:** Anforderung passt zu mehreren Milestones
   - **Mitigation:** Klare Entscheidungskriterien (technische Abhängigkeiten, Kohärenz)

4. **Neue Anforderungen:** Während des Abgleichs werden weitere Lücken entdeckt
   - **Mitigation:** Dokumentieren, aber nicht im laufenden Abgleich hinzufügen (separate Liste)

### Herausforderungen:

- **60 Module einzeln abgleichen:** Sehr zeitaufwendig
  - **Lösung:** Sampling + Gruppierung nach Modul-Kategorien

- **Nicht-funktionale Anforderungen:** Gelten übergreifend, schwer zuzuordnen
  - **Lösung:** Marker "gilt für alle Milestones" + konkrete Umsetzungs-Milestones identifizieren

- **Mehrsprachigkeit & Medienverwaltung:** Neu ergänzte Anforderungen
  - **Lösung:** Besonders sorgfältig prüfen, da noch nicht in Milestones eingeplant

---

## Nächste Schritte

**Option A: Sofort starten**
- Ich beginne jetzt mit Phase 1 (Vorbereitung)
- Lese alle 10 Milestone-Dateien
- Erstelle initiale Mapping-Tabelle

**Option B: Plan reviewen**
- Du prüfst den Plan
- Anpassungen/Ergänzungen
- Dann Start

**Option C: Fokussiert starten**
- Wir beginnen mit den wichtigsten Kategorien (1.1, 1.2, 1.11)
- Proof-of-Concept für 3-4 Kategorien
- Dann Vollständiger Abgleich

**Was ist deine Präferenz?**

---

## Anhang: Erwartete Milestone-Zuordnung (Initial)

Basierend auf groben Milestone-Titeln:

| Milestone | Erwartete Anforderungskategorien |
|-----------|----------------------------------|
| **MS1** | 1.1 Benutzer/Rechte, 1.2 Medienverwaltung (neu!), 1.10 Modulmanagement (Basis) |
| **MS2** | 1.11 Module (Kern-Module), 1.2 Export-Funktionen, Karten-Darstellung |
| **MS3** | 1.2 Mehrsprachigkeit (neu!), E-Mail-Config, App-Instanzen, 1.9 Löschkonzept? |
| **MS4** | 1.3 App-Gestaltung, 1.7 Hilfe-System |
| **MS5** | 1.4 Schnittstellen (APIs) |
| **MS6** | 1.4 Schnittstellen (Fachverfahren) |
| **MS7** | 1.5 Monitoring, 2.1 Performance |
| **MS8** | 1.6 KI-Integration, 2.2 Security, 2.8 BSI Lifecycle |
| **MS9** | 1.11 Module (Advanced), 2.4 Barrierefreiheit |
| **MS10** | 1.8 Releases, 2.3 Deployment, 2.6 Governance |

**Hinweis:** Dies ist eine erste Vermutung basierend auf Milestone-Titeln. Der tatsächliche Abgleich wird zeigen, ob diese Zuordnung stimmt und wo Lücken sind.
