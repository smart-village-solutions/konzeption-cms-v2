#!/usr/bin/env node

/**
 * Interaktiver Review für Requirements-Mapping
 *
 * Geht durch alle Packages und zeigt vorgeschlagene Requirements.
 * User kann bestätigen, ablehnen oder manuell hinzufügen.
 */

import { PrismaClient } from '@prisma/client';
import * as readline from 'readline';
import { stdin as input, stdout as output } from 'process';

const prisma = new PrismaClient();

const rl = readline.createInterface({ input, output });

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function clearScreen() {
  console.clear();
}

async function reviewPackage(pkg, index, total) {
  clearScreen();

  console.log('═'.repeat(80));
  console.log(`📦 Package ${index}/${total}: ${pkg.id} - ${pkg.title}`);
  console.log('═'.repeat(80));
  console.log(`\n📋 Story Points: ${pkg.storyPoints} | Milestone: ${pkg.milestone.code} | Cluster: ${pkg.cluster.name}`);
  console.log(`\n📝 Beschreibung:\n${pkg.description.substring(0, 300)}...`);

  // Vorgeschlagene Requirements laden
  const suggestions = await prisma.packageRequirement.findMany({
    where: {
      packageId: pkg.id,
      status: 'suggested'
    },
    include: {
      requirement: true
    },
    orderBy: {
      confidence: 'desc'
    }
  });

  if (suggestions.length === 0) {
    console.log('\n⚠️  Keine Vorschläge vorhanden (manuelle Suche erforderlich)');
    console.log('\nOptionen:');
    console.log('  [s] Search - Requirement suchen');
    console.log('  [n] Next - Nächstes Package');
    console.log('  [q] Quit - Beenden');

    const action = await question('\nAktion: ');

    if (action === 's') {
      await searchRequirements(pkg.id);
      return 'continue';
    } else if (action === 'q') {
      return 'quit';
    }
    return 'continue';
  }

  console.log(`\n\n🔗 Vorgeschlagene Requirements (${suggestions.length}):\n`);

  suggestions.forEach((pr, i) => {
    const req = pr.requirement;
    const conf = (pr.confidence * 100).toFixed(0);
    const indicator = pr.confidence >= 0.7 ? '✓' : pr.confidence >= 0.5 ? '○' : '·';

    console.log(`[${i + 1}] ${indicator} ${req.id} (confidence: ${conf}%)`);
    console.log(`    "${req.title}"`);
    console.log(`    📄 ${req.filePath}`);
    if (req.section) console.log(`    📍 Section: ${req.section}`);
    console.log('');
  });

  console.log('\n' + '─'.repeat(80));
  console.log('Optionen:');
  console.log('  [a] Accept all high confidence (≥70%)');
  console.log('  [c] Confirm selected (z.B. "1,2,5")');
  console.log('  [r] Reject selected (z.B. "3,4")');
  console.log('  [v] View details (Nummer eingeben)');
  console.log('  [s] Search for more');
  console.log('  [n] Next (ohne Änderung)');
  console.log('  [q] Quit');

  const action = await question('\nAktion: ');

  switch (action.toLowerCase()) {
    case 'a':
      // Accept all high confidence
      for (const pr of suggestions) {
        if (pr.confidence >= 0.7) {
          await prisma.packageRequirement.update({
            where: {
              packageId_requirementId: {
                packageId: pkg.id,
                requirementId: pr.requirement.id
              }
            },
            data: {
              status: 'confirmed',
              relevance: 'primary'
            }
          });
        }
      }
      const accepted = suggestions.filter(pr => pr.confidence >= 0.7).length;
      console.log(`\n✅ ${accepted} Requirements bestätigt`);
      await question('Weiter mit Enter...');
      return 'continue';

    case 'c':
      // Confirm selected
      const confirmNums = await question('Nummern (durch Komma getrennt): ');
      const confirmIndices = confirmNums.split(',').map(n => parseInt(n.trim()) - 1);

      for (const idx of confirmIndices) {
        if (idx >= 0 && idx < suggestions.length) {
          const pr = suggestions[idx];
          await prisma.packageRequirement.update({
            where: {
              packageId_requirementId: {
                packageId: pkg.id,
                requirementId: pr.requirement.id
              }
            },
            data: {
              status: 'confirmed',
              relevance: pr.confidence >= 0.7 ? 'primary' : 'secondary'
            }
          });
        }
      }
      console.log(`\n✅ ${confirmIndices.length} Requirements bestätigt`);
      await question('Weiter mit Enter...');
      return 'continue';

    case 'r':
      // Reject selected
      const rejectNums = await question('Nummern (durch Komma getrennt): ');
      const rejectIndices = rejectNums.split(',').map(n => parseInt(n.trim()) - 1);

      for (const idx of rejectIndices) {
        if (idx >= 0 && idx < suggestions.length) {
          const pr = suggestions[idx];
          await prisma.packageRequirement.update({
            where: {
              packageId_requirementId: {
                packageId: pkg.id,
                requirementId: pr.requirement.id
              }
            },
            data: {
              status: 'rejected'
            }
          });
        }
      }
      console.log(`\n❌ ${rejectIndices.length} Requirements abgelehnt`);
      await question('Weiter mit Enter...');
      return 'continue';

    case 'v':
      // View details
      const viewNum = await question('Nummer: ');
      const viewIdx = parseInt(viewNum) - 1;

      if (viewIdx >= 0 && viewIdx < suggestions.length) {
        const pr = suggestions[viewIdx];
        const req = pr.requirement;

        console.log('\n' + '═'.repeat(80));
        console.log(`📄 ${req.id}: ${req.title}`);
        console.log('═'.repeat(80));
        console.log(`\n${req.description}\n`);
        console.log(`📂 Quelle: ${req.filePath}`);
        if (req.section) console.log(`📍 Section: ${req.section}`);
        if (req.headingPath) console.log(`🗂️  Pfad: ${req.headingPath}`);
        if (req.lineNumber) console.log(`📏 Zeile: ${req.lineNumber}`);
        console.log(`\n🎯 Confidence: ${(pr.confidence * 100).toFixed(0)}%`);

        await question('\nZurück mit Enter...');
      }
      return 'same'; // Same package again

    case 's':
      // Search
      await searchRequirements(pkg.id);
      return 'same';

    case 'q':
      return 'quit';

    case 'n':
    default:
      return 'continue';
  }
}

async function searchRequirements(packageId) {
  console.log('\n🔍 Requirement suchen\n');
  const keyword = await question('Suchbegriff: ');

  if (!keyword) return;

  const results = await prisma.requirement.findMany({
    where: {
      OR: [
        { title: { contains: keyword, mode: 'insensitive' } },
        { description: { contains: keyword, mode: 'insensitive' } },
        { section: { contains: keyword, mode: 'insensitive' } }
      ]
    },
    take: 20
  });

  if (results.length === 0) {
    console.log('\n❌ Keine Requirements gefunden');
    await question('Zurück mit Enter...');
    return;
  }

  console.log(`\n✓ ${results.length} Requirements gefunden:\n`);

  results.forEach((req, i) => {
    console.log(`[${i + 1}] ${req.id}`);
    console.log(`    "${req.title}"`);
    console.log(`    📄 ${req.filePath}`);
    console.log('');
  });

  const addNum = await question('\nNummer zum Hinzufügen (oder Enter zum Abbrechen): ');

  if (addNum) {
    const idx = parseInt(addNum) - 1;
    if (idx >= 0 && idx < results.length) {
      const req = results[idx];

      // Check if already exists
      const existing = await prisma.packageRequirement.findUnique({
        where: {
          packageId_requirementId: {
            packageId,
            requirementId: req.id
          }
        }
      });

      if (existing) {
        console.log('\n⚠️  Requirement bereits zugeordnet');
      } else {
        await prisma.packageRequirement.create({
          data: {
            packageId,
            requirementId: req.id,
            status: 'confirmed',
            relevance: 'primary',
            confidence: 1.0 // Manual = 100%
          }
        });
        console.log('\n✅ Requirement hinzugefügt');
      }

      await question('Weiter mit Enter...');
    }
  }
}

async function showProgress() {
  const total = await prisma.workPackage.count();

  const withSuggestions = await prisma.workPackage.count({
    where: {
      requirements: {
        some: {
          status: 'suggested'
        }
      }
    }
  });

  const withConfirmed = await prisma.workPackage.count({
    where: {
      requirements: {
        some: {
          status: 'confirmed'
        }
      }
    }
  });

  const totalMappings = await prisma.packageRequirement.count();
  const confirmed = await prisma.packageRequirement.count({
    where: { status: 'confirmed' }
  });
  const rejected = await prisma.packageRequirement.count({
    where: { status: 'rejected' }
  });
  const suggested = await prisma.packageRequirement.count({
    where: { status: 'suggested' }
  });

  console.log('\n📊 Fortschritt:\n');
  console.log(`   Packages gesamt: ${total}`);
  console.log(`   Mit Vorschlägen: ${withSuggestions}`);
  console.log(`   Mit bestätigten Requirements: ${withConfirmed}`);
  console.log('');
  console.log(`   Mappings gesamt: ${totalMappings}`);
  console.log(`   ✅ Bestätigt: ${confirmed} (${(confirmed/totalMappings*100).toFixed(1)}%)`);
  console.log(`   ❌ Abgelehnt: ${rejected} (${(rejected/totalMappings*100).toFixed(1)}%)`);
  console.log(`   ⏳ Offen: ${suggested} (${(suggested/totalMappings*100).toFixed(1)}%)`);
}

async function main() {
  console.log('🚀 Requirements-Review gestartet\n');

  await showProgress();

  const start = await question('\nBei welchem Package starten? (1-83, oder Enter für 1): ');
  const startIndex = start ? parseInt(start) - 1 : 0;

  // Alle Packages laden
  const packages = await prisma.workPackage.findMany({
    include: {
      milestone: true,
      cluster: true
    },
    orderBy: {
      id: 'asc'
    }
  });

  let currentIndex = Math.max(0, Math.min(startIndex, packages.length - 1));

  while (currentIndex < packages.length) {
    const pkg = packages[currentIndex];
    const result = await reviewPackage(pkg, currentIndex + 1, packages.length);

    if (result === 'quit') {
      break;
    } else if (result === 'continue') {
      currentIndex++;
    }
    // 'same' bleibt beim gleichen Package
  }

  console.log('\n\n✅ Review beendet\n');
  await showProgress();

  rl.close();
}

main()
  .catch((e) => {
    console.error('❌ Fehler:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
