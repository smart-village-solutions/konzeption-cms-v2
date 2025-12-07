#!/bin/bash

# Script zur automatischen Generierung von PDFs aus Markdown-Dateien
# Die Struktur wird dynamisch aus den Ordnern ermittelt
# Benötigt: pandoc, texlive (für PDF-Generierung)
# Installation: brew install pandoc basictex (macOS)

set -e  # Beende bei Fehler

# Farben für Output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Automatische PDF-Generierung für CMS Konzeption ===${NC}"

# Prüfe ob pandoc installiert ist
if ! command -v pandoc &> /dev/null; then
    echo -e "${RED}ERROR: pandoc ist nicht installiert${NC}"
    echo "Installation: brew install pandoc (macOS) oder apt-get install pandoc (Linux)"
    exit 1
fi

# Arbeitsverzeichnis
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Temp-Verzeichnis
TEMP_DIR="temp_pdf_build"

echo -e "${YELLOW}Erstelle temporäres Verzeichnis...${NC}"
rm -rf "$TEMP_DIR"
mkdir -p "$TEMP_DIR"

# Funktion zum Hinzufügen einer Datei
add_file() {
    local file="$1"
    local indent_level="${2:-0}"

    if [ -f "$file" ]; then
        # Prüfe ob Datei nicht leer ist und nicht README.md oder ToDos.md
        if [ -s "$file" ] && [[ ! "$file" =~ README\.md$ ]] && [[ ! "$file" =~ ToDos\.md$ ]]; then
            local basename=$(basename "$file" .md)
            echo -e "${GREEN}$(printf '%*s' $((indent_level*2)) '')✓ $basename${NC}"
            echo "" >> "$COMBINED_MD"
            echo "\\newpage" >> "$COMBINED_MD"
            echo "" >> "$COMBINED_MD"
            cat "$file" >> "$COMBINED_MD"
            return 0
        fi
    fi
    return 1
}

# Funktion zum rekursiven Durchlaufen von Verzeichnissen
process_directory() {
    local dir="$1"
    local indent_level="${2:-0}"
    local section_name="${3:-$(basename "$dir")}"

    if [ ! -d "$dir" ]; then
        return
    fi

    echo -e "${BLUE}$(printf '%*s' $((indent_level*2)) '')📁 $section_name${NC}"

    # Sortiere Dateien: erst Verzeichnisse, dann Markdown-Dateien
    # Bevorzuge bestimmte Reihenfolgen
    local files_to_process=()

    # Sammle alle Einträge
    while IFS= read -r item; do
        files_to_process+=("$item")
    done < <(find "$dir" -maxdepth 1 \( -type f -name "*.md" -o -type d \) ! -name ".*" ! -path "$dir" | sort)

    # Verarbeite zuerst spezielle Dateien in fester Reihenfolge
    local special_files=(
        "Einleitung.md"
        "allgemein.md"
        "Nicht-funktional.md"
    )

    for special in "${special_files[@]}"; do
        for item in "${files_to_process[@]}"; do
            if [[ "$(basename "$item")" == "$special" ]]; then
                if [ -f "$item" ]; then
                    add_file "$item" "$indent_level"
                fi
                # Entferne aus Array
                files_to_process=("${files_to_process[@]/$item}")
            fi
        done
    done

    # Verarbeite restliche Markdown-Dateien (alphabetisch)
    for item in "${files_to_process[@]}"; do
        if [ -z "$item" ]; then continue; fi
        if [ -f "$item" ] && [[ "$item" == *.md ]]; then
            add_file "$item" "$indent_level"
        fi
    done

    # Verarbeite Unterverzeichnisse (alphabetisch)
    for item in "${files_to_process[@]}"; do
        if [ -z "$item" ]; then continue; fi
        if [ -d "$item" ]; then
            local subdir_name=$(basename "$item")
            # Überspringe bestimmte Verzeichnisse
            if [[ "$subdir_name" != "temp_pdf_build" ]] && [[ "$subdir_name" != ".git" ]]; then
                process_directory "$item" $((indent_level + 1)) "$subdir_name"
            fi
        fi
    done
}

# Hauptstruktur basierend auf nummerierten Ordnern
echo -e "\n${BLUE}═══ Verarbeite Dokumentstruktur ═══${NC}\n"

# 1. Einleitung
if [ -d "01_Einleitung" ]; then
    echo -e "${YELLOW}Kapitel 1: Einleitung${NC}"
    process_directory "01_Einleitung" 0 "Einleitung"
fi

# 2. Anforderungen
if [ -d "02_Anforderungen" ]; then
    echo -e "\n${YELLOW}Kapitel 2: Anforderungen${NC}"

    # 2.1 Funktionale Anforderungen
    if [ -d "02_Anforderungen/02_01_Funktional" ]; then
        echo -e "${YELLOW}  2.1 Funktionale Anforderungen${NC}"

        # Hauptdateien zuerst
        for main_file in "Benutzer.md" "CMS.md" "App-Design.md" "Schnittstellen.md" "Monitoring.md" "KI.md" "Hilfe.md" "Releases.md" "Daten-Loeschkonzept.md"; do
            if [ -f "02_Anforderungen/02_01_Funktional/$main_file" ]; then
                add_file "02_Anforderungen/02_01_Funktional/$main_file" 1
            fi
        done

        # Module-Verzeichnis
        if [ -d "02_Anforderungen/02_01_Funktional/Module" ]; then
            echo -e "${YELLOW}    Module${NC}"
            process_directory "02_Anforderungen/02_01_Funktional/Module" 2 "Module"
        fi
    fi

    # 2.2 Nicht-funktionale Anforderungen
    if [ -d "02_Anforderungen/02_02_Nicht-funktional" ]; then
        echo -e "\n${YELLOW}  2.2 Nicht-funktionale Anforderungen${NC}"
        process_directory "02_Anforderungen/02_02_Nicht-funktional" 1 "Nicht-funktionale Anforderungen"
    fi
fi

# 3. Systemarchitektur
if [ -d "03_Systemarchitektur" ]; then
    echo -e "\n${YELLOW}Kapitel 3: Systemarchitektur${NC}"
    process_directory "03_Systemarchitektur" 0 "Systemarchitektur"
fi

# 4. Roadmap
if [ -d "04_Roadmap" ]; then
    echo -e "\n${YELLOW}Kapitel 4: Roadmap${NC}"
    process_directory "04_Roadmap" 0 "Roadmap"
fi

# 5. Anhang
if [ -d "09_Anhang" ]; then
    echo -e "\n${YELLOW}Kapitel 5: Anhang${NC}"
    process_directory "09_Anhang" 0 "Anhang"
fi

# Weitere nummerierte Verzeichnisse automatisch erkennen
for dir in [0-9][0-9]_*/; do
    if [ -d "$dir" ]; then
        dir_name=$(basename "$dir")
        # Überspringe bereits verarbeitete
        if [[ ! "$dir_name" =~ ^(01_Einleitung|02_Anforderungen|03_Systemarchitektur|04_Roadmap|09_Anhang) ]]; then
            echo -e "\n${YELLOW}Zusätzliches Kapitel: $dir_name${NC}"
            process_directory "$dir" 0 "$dir_name"
        fi
    fi
done

echo -e "\n${BLUE}═══ Erzeuge PDF mit pandoc ═══${NC}\n"
echo -e "${YELLOW}Generiere PDF: $OUTPUT_PDF${NC}"

# Pandoc-Befehl mit erweiterten Optionen
pandoc "$COMBINED_MD" \
    -o "$OUTPUT_PDF" \
    --pdf-engine=xelatex \
    --from=markdown+yaml_metadata_block+hard_line_breaks \
    --to=pdf \
    --toc \
    --toc-depth=3 \
    --number-sections \
    --highlight-style=tango \
    --variable=colorlinks:true \
    --variable=linkcolor:blue \
    --variable=urlcolor:blue \
    --variable=toccolor:black \
    --variable=documentclass:report \
    --variable=papersize:a4 \
    --variable=geometry:margin=2.5cm \
    --variable=fontsize:11pt \
    --variable=mainfont:"Helvetica" \
    --variable=monofont:"Courier New" \
    --filter pandoc-crossref 2>/dev/null || \
pandoc "$COMBINED_MD" \
    -o "$OUTPUT_PDF" \
    --pdf-engine=xelatex \
    --from=markdown+yaml_metadata_block+hard_line_breaks \
    --to=pdf \
    --toc \
    --toc-depth=3 \
    --number-sections \
    --highlight-style=tango \
    --variable=colorlinks:true \
    --variable=linkcolor:blue \
    --variable=urlcolor:blue \
    --variable=toccolor:black \
    --variable=documentclass:report \
    --variable=papersize:a4 \
    --variable=geometry:margin=2.5cm \
    --variable=fontsize:11pt

if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}✓ PDF erfolgreich erstellt: $OUTPUT_PDF${NC}"

    # Zeige Dateigröße
    FILE_SIZE=$(du -h "$OUTPUT_PDF" | cut -f1)
    echo -e "${GREEN}  Dateigröße: $FILE_SIZE${NC}"

    # Seitenzahl ermitteln (wenn pdfinfo verfügbar)
    if command -v pdfinfo &> /dev/null; then
        PAGES=$(pdfinfo "$OUTPUT_PDF" 2>/dev/null | grep "Pages:" | awk '{print $2}')
        if [ -n "$PAGES" ]; then
            echo -e "${GREEN}  Seiten: $PAGES${NC}"
        fi
    fi

    # Optional: Öffne PDF automatisch (macOS)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo -e "\n${YELLOW}Öffne PDF...${NC}"
        open "$OUTPUT_PDF"
    fi
else
    echo -e "\n${RED}✗ Fehler bei PDF-Generierung${NC}"
    echo -e "${YELLOW}Tipp: Prüfe ob xelatex installiert ist (brew install --cask mactex)${NC}"
    exit 1
fi

# Aufräumen (optional auskommentieren zum Debugging)
echo -e "\n${YELLOW}Räume auf...${NC}"
rm -rf "$TEMP_DIR"

echo -e "\n${GREEN}=== Fertig! ===${NC}"
