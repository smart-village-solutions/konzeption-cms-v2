#!/usr/bin/env node

/**
 * Requirements-Extraktion aus Markdown-Dateien
 *
 * Liest alle Markdown-Dateien in 02_Anforderungen/ und extrahiert:
 * - Überschriften-Hierarchie
 * - Aufzählungspunkte als Requirements
 * - Generiert IDs (FR-* für funktional, NFR-* für nicht-funktional)
 * - Importiert in Datenbank
 */

import { PrismaClient } from '@prisma/client';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prisma = new PrismaClient();

const REQUIREMENTS_DIR = join(__dirname, '..', '02_Anforderungen');

// Zähler für ID-Generierung
const counters = new Map();

function getNextId(prefix) {
  const current = counters.get(prefix) || 0;
  const next = current + 1;
  counters.set(prefix, next);
  return `${prefix}-${String(next).padStart(3, '0')}`;
}

function extractRequirements(filePath, content) {
  const requirements = [];
  const lines = content.split('\n');

  // Bestimme Typ basierend auf Pfad
  const isFunctional = filePath.includes('02_01_Funktional');
  const requirementType = isFunctional ? 'functional' : 'non-functional';
  const category = isFunctional ? 'Funktional' : 'Nicht-funktional';

  // Dateiname für Präfix (ohne .md)
  const fileName = basename(filePath, '.md')
    .replace(/[^a-zA-Z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  const idPrefix = isFunctional ? `FR-${fileName}` : `NFR-${fileName}`;

  let currentSection = null;
  let headingStack = [];
  let inCodeBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNumber = i + 1;

    // Code-Block-Tracking
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) continue;

    // Überschriften
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const heading = headingMatch[2].trim();

      // Stack aktualisieren
      headingStack = headingStack.slice(0, level - 1);
      headingStack.push(heading);

      // Section merken (erste H2-Überschrift)
      if (level === 2) {
        currentSection = heading;
      }

      continue;
    }

    // Aufzählungspunkte als Requirements
    const bulletMatch = line.match(/^\s*[\*\-]\s+(.+)$/);
    if (bulletMatch && currentSection) {
      let text = bulletMatch[1].trim();

      // Überspringe Meta-Informationen und sehr kurze Einträge
      if (text.length < 10) continue;
      if (text.startsWith('**Messkriterium')) continue;
      if (text.startsWith('**Beispiel')) continue;

      // Entferne Markdown-Formatierung für Titel
      const title = text
        .replace(/\*\*(.+?)\*\*/g, '$1')  // Bold
        .replace(/\*(.+?)\*/g, '$1')       // Italic
        .replace(/`(.+?)`/g, '$1')         // Code
        .substring(0, 200);                // Max 200 Zeichen

      // Beschreibung: Nächste Zeilen bis zum nächsten Bullet/Überschrift
      let description = text;
      let j = i + 1;
      while (j < lines.length) {
        const nextLine = lines[j].trim();
        if (!nextLine ||
            nextLine.startsWith('#') ||
            nextLine.match(/^\s*[\*\-]\s+/) ||
            nextLine.startsWith('```')) {
          break;
        }
        description += ' ' + nextLine;
        j++;
      }

      // Requirement erstellen
      const requirement = {
        id: getNextId(idPrefix),
        title,
        description: description.substring(0, 1000), // Max 1000 Zeichen
        category,
        requirementType,
        filePath: relative(join(__dirname, '..'), filePath),
        section: currentSection,
        headingPath: headingStack.join(' > '),
        lineNumber,
        priority: 'Should', // Default, kann später angepasst werden
        status: 'active'
      };

      requirements.push(requirement);
    }
  }

  return requirements;
}

function walkDirectory(dir) {
  const files = [];

  const items = readdirSync(dir);
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...walkDirectory(fullPath));
    } else if (item.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

async function main() {
  console.log('🚀 Starte Requirements-Extraktion...\n');

  // Alle Markdown-Dateien finden
  console.log('📂 Durchsuche Verzeichnis:', REQUIREMENTS_DIR);
  const mdFiles = walkDirectory(REQUIREMENTS_DIR);
  console.log(`   ✓ ${mdFiles.length} Markdown-Dateien gefunden\n`);

  // Alte Requirements löschen
  console.log('🗑️  Lösche alte Requirements...');
  await prisma.packageRequirement.deleteMany();
  await prisma.requirement.deleteMany();
  console.log('   ✓ Alte Daten gelöscht\n');

  // Requirements extrahieren
  console.log('📝 Extrahiere Requirements...');
  let totalRequirements = 0;

  for (const filePath of mdFiles) {
    const content = readFileSync(filePath, 'utf8');
    const requirements = extractRequirements(filePath, content);

    if (requirements.length > 0) {
      const relPath = relative(REQUIREMENTS_DIR, filePath);
      console.log(`   ${relPath}: ${requirements.length} Requirements`);

      // In Datenbank speichern
      for (const req of requirements) {
        await prisma.requirement.create({ data: req });
        totalRequirements++;
      }
    }
  }

  console.log(`\n✅ Extraktion abgeschlossen!\n`);
  console.log(`📊 Zusammenfassung:`);
  console.log(`   - ${mdFiles.length} Dateien durchsucht`);
  console.log(`   - ${totalRequirements} Requirements extrahiert`);

  // Statistiken
  const functionalCount = await prisma.requirement.count({
    where: { requirementType: 'functional' }
  });
  const nonFunctionalCount = await prisma.requirement.count({
    where: { requirementType: 'non-functional' }
  });

  console.log(`\n   📦 Funktionale Requirements: ${functionalCount}`);
  console.log(`   ⚙️  Nicht-funktionale Requirements: ${nonFunctionalCount}`);

  // Top 5 Dateien mit meisten Requirements
  const byFile = await prisma.requirement.groupBy({
    by: ['filePath'],
    _count: true,
    orderBy: { _count: { id: 'desc' } },
    take: 5
  });

  console.log(`\n   📄 Top 5 Dateien:`);
  for (const item of byFile) {
    const fileName = basename(item.filePath);
    console.log(`      - ${fileName}: ${item._count} Requirements`);
  }

  console.log(`\n💡 Nächster Schritt: npm run requirements:auto-map`);
}

main()
  .catch((e) => {
    console.error('❌ Fehler bei der Extraktion:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
