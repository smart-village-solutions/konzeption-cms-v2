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

# Funktion zum Erstellen eines PDF-Headers
create_header() {
    local title="$1"
    local output_file="$2"

    cat > "$output_file" << HEADER
---
title: "$title"
author: "Smart Village Solutions"
date: "Stand: Dezember 2025"
toc: true
toc-depth: 2
numbersections: true
geometry: margin=2.5cm
fontsize: 11pt
linestretch: 1.15
lang: de-DE
---

\\newpage

HEADER
}

# Funktion zum Hinzufügen einer Datei
add_file() {
    local file="$1"
    local output_file="$2"
    local indent_level="${3:-0}"

    if [ -f "$file" ]; then
        # Prüfe ob Datei nicht leer ist und nicht README.md oder ToDos.md
        if [ -s "$file" ] && [[ ! "$file" =~ README\.md$ ]] && [[ ! "$file" =~ ToDos\.md$ ]]; then
            local basename=$(basename "$file" .md)
            echo -e "${GREEN}$(printf '%*s' $((indent_level*2)) '')✓ $basename${NC}"
            echo "" >> "$output_file"
            echo "\\newpage" >> "$output_file"
            echo "" >> "$output_file"
            cat "$file" >> "$output_file"
            return 0
        fi
    fi
    return 1
}

# Funktion zum rekursiven Durchlaufen von Verzeichnissen
process_directory() {
    local dir="$1"
    local output_file="$2"
    local indent_level="${3:-0}"
    local section_name="${4:-$(basename "$dir")}"

    if [ ! -d "$dir" ]; then
        return
    fi

    echo -e "${BLUE}$(printf '%*s' $((indent_level*2)) '')📁 $section_name${NC}"

    # Sortiere Dateien: erst Verzeichnisse, dann Markdown-Dateien
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
                    add_file "$item" "$output_file" "$indent_level"
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
            add_file "$item" "$output_file" "$indent_level"
        fi
    done

    # Verarbeite Unterverzeichnisse (alphabetisch)
    for item in "${files_to_process[@]}"; do
        if [ -z "$item" ]; then continue; fi
        if [ -d "$item" ]; then
            local subdir_name=$(basename "$item")
            # Überspringe bestimmte Verzeichnisse
            if [[ "$subdir_name" != "temp_pdf_build" ]] && [[ "$subdir_name" != ".git" ]]; then
                process_directory "$item" "$output_file" $((indent_level + 1)) "$subdir_name"
            fi
        fi
    done
}

# Funktion zum Generieren eines PDFs
generate_pdf() {
    local markdown_file="$1"
    local output_pdf="$2"
    local pdf_title="$3"

    echo -e "\n${BLUE}═══ Erzeuge PDF: $pdf_title ═══${NC}\n"
    echo -e "${YELLOW}Generiere PDF: $output_pdf${NC}"

    # Pandoc-Befehl mit erweiterten Optionen
    pandoc "$markdown_file" \
        -o "$output_pdf" \
        --pdf-engine=xelatex \
        --from=markdown+yaml_metadata_block+hard_line_breaks \
        --to=pdf \
        --toc \
        --toc-depth=2 \
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
        --variable=mainfont:"Inter" \
        --variable=monofont:"Courier New" \
        --filter pandoc-crossref 2>/dev/null || \
    pandoc "$markdown_file" \
        -o "$output_pdf" \
        --pdf-engine=xelatex \
        --from=markdown+yaml_metadata_block+hard_line_breaks \
        --to=pdf \
        --toc \
        --toc-depth=2 \
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
        --variable=mainfont:"Inter" \
        --variable=monofont:"Courier New"

    if [ $? -eq 0 ]; then
        echo -e "\n${GREEN}✓ PDF erfolgreich erstellt: $output_pdf${NC}"

        # Zeige Dateigröße
        FILE_SIZE=$(du -h "$output_pdf" | cut -f1)
        echo -e "${GREEN}  Dateigröße: $FILE_SIZE${NC}"

        # Seitenzahl ermitteln (wenn pdfinfo verfügbar)
        if command -v pdfinfo &> /dev/null; then
            PAGES=$(pdfinfo "$output_pdf" 2>/dev/null | grep "Pages:" | awk '{print $2}')
            if [ -n "$PAGES" ]; then
                echo -e "${GREEN}  Seiten: $PAGES${NC}"
            fi
        fi
    else
        echo -e "\n${RED}✗ Fehler bei PDF-Generierung: $output_pdf${NC}"
        return 1
    fi
}

##############################################################################
# PDF 1: Einleitung & Anforderungen
##############################################################################

COMBINED_REQUIREMENTS="$TEMP_DIR/requirements.md"
OUTPUT_REQUIREMENTS_PDF="CMS-Konzeption-Anforderungen.pdf"

echo -e "\n${BLUE}╔═══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  PDF 1: Einleitung & Anforderungen                           ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════════════════════════╝${NC}\n"

echo -e "${YELLOW}Kombiniere Markdown-Dateien für Anforderungen...${NC}"

create_header "Smart Village CMS 2.0 - Einleitung & Anforderungen" "$COMBINED_REQUIREMENTS"

echo -e "\n${BLUE}═══ Verarbeite Dokumentstruktur ═══${NC}\n"

# 1. Einleitung
if [ -d "01_Einleitung" ]; then
    echo -e "${YELLOW}Kapitel 1: Einleitung${NC}"
    process_directory "01_Einleitung" "$COMBINED_REQUIREMENTS" 0 "Einleitung"
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
                add_file "02_Anforderungen/02_01_Funktional/$main_file" "$COMBINED_REQUIREMENTS" 1
            fi
        done

        # Module-Verzeichnis
        if [ -d "02_Anforderungen/02_01_Funktional/Module" ]; then
            echo -e "${YELLOW}    Module${NC}"
            process_directory "02_Anforderungen/02_01_Funktional/Module" "$COMBINED_REQUIREMENTS" 2 "Module"
        fi
    fi

    # 2.2 Nicht-funktionale Anforderungen
    if [ -d "02_Anforderungen/02_02_Nicht-funktional" ]; then
        echo -e "\n${YELLOW}  2.2 Nicht-funktionale Anforderungen${NC}"
        process_directory "02_Anforderungen/02_02_Nicht-funktional" "$COMBINED_REQUIREMENTS" 1 "Nicht-funktionale Anforderungen"
    fi
fi

# Generiere PDF für Anforderungen
generate_pdf "$COMBINED_REQUIREMENTS" "$OUTPUT_REQUIREMENTS_PDF" "Einleitung & Anforderungen"

##############################################################################
# PDF 2: Roadmap
##############################################################################

COMBINED_ROADMAP="$TEMP_DIR/roadmap.md"
OUTPUT_ROADMAP_PDF="CMS-Konzeption-Roadmap.pdf"

echo -e "\n${BLUE}╔═══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  PDF 2: Roadmap                                              ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════════════════════════╝${NC}\n"

echo -e "${YELLOW}Kombiniere Markdown-Dateien für Roadmap...${NC}"

create_header "Smart Village CMS 2.0 - Roadmap & Meilensteine" "$COMBINED_ROADMAP"

echo -e "\n${BLUE}═══ Verarbeite Roadmap ═══${NC}\n"

# Roadmap
if [ -d "04_Roadmap" ]; then
    echo -e "${YELLOW}Roadmap${NC}"
    process_directory "04_Roadmap" "$COMBINED_ROADMAP" 0 "Roadmap"
fi

# Generiere PDF für Roadmap
generate_pdf "$COMBINED_ROADMAP" "$OUTPUT_ROADMAP_PDF" "Roadmap"

##############################################################################
# Abschluss
##############################################################################

echo -e "\n${BLUE}╔═══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Zusammenfassung                                             ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════════════════════════╝${NC}\n"

echo -e "${GREEN}✓ Erfolgreich generierte PDFs:${NC}"
echo -e "${GREEN}  1. $OUTPUT_REQUIREMENTS_PDF${NC}"
echo -e "${GREEN}  2. $OUTPUT_ROADMAP_PDF${NC}"

# Optional: Öffne PDFs automatisch (macOS)
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo -e "\n${YELLOW}Öffne PDFs...${NC}"
    open "$OUTPUT_REQUIREMENTS_PDF"
    sleep 1
    open "$OUTPUT_ROADMAP_PDF"
fi

# Aufräumen
echo -e "\n${YELLOW}Räume auf...${NC}"
rm -rf "$TEMP_DIR"

echo -e "\n${GREEN}=== Fertig! ===${NC}"
