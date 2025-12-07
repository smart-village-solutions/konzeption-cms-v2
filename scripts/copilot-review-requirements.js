#!/usr/bin/env node

/**
 * KI-gestützter Requirements-Review über GitHub Copilot
 *
 * Nutzt GitHub Copilot als AI Agent um Package-Requirements zu analysieren.
 * Erstellt für jedes Package eine Analyse-Anfrage und verarbeitet Entscheidungen.
 */

import { PrismaClient } from '@prisma/client';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

const prisma = new PrismaClient();

const BATCH_FILE = 'ai-review-batch.json';
const RESULTS_FILE = 'ai-review-results.json';

async function prepareBatch() {
  console.log('🚀 Bereite Batch für AI-Review vor...\n');

  // Packages mit Suggestions laden
  const packages = await prisma.workPackage.findMany({
    where: {
      requirements: {
        some: { status: 'suggested' }
      }
    },
    include: {
      milestone: true,
      cluster: true,
      requirements: {
        where: { status: 'suggested' },
        include: {
          requirement: true
        },
        orderBy: {
          confidence: 'desc'
        }
      },
      deliverables: true
    },
    orderBy: {
      id: 'asc'
    }
  });

  console.log(`📦 ${packages.length} Packages mit Vorschlägen gefunden\n`);

  // Batch-Daten erstellen
  const batch = packages.map(pkg => ({
    packageId: pkg.id,
    title: pkg.title,
    description: pkg.description,
    cluster: pkg.cluster.name,
    milestone: `${pkg.milestone.code} - ${pkg.milestone.title}`,
    deliverables: pkg.deliverables.map(d => d.description).join('; '),
    requirements: pkg.requirements.map(pr => ({
      id: pr.requirement.id,
      title: pr.requirement.title,
      description: pr.requirement.description,
      filePath: pr.requirement.filePath,
      section: pr.requirement.section,
      confidence: pr.confidence
    }))
  }));

  // In Datei schreiben
  writeFileSync(BATCH_FILE, JSON.stringify(batch, null, 2));

  console.log(`✅ Batch-Datei erstellt: ${BATCH_FILE}`);
  console.log(`\n📋 Inhalt:`);
  console.log(`   - ${batch.length} Packages`);
  console.log(`   - ${batch.reduce((sum, p) => sum + p.requirements.length, 0)} Requirements gesamt`);

  console.log('\n' + '='.repeat(80));
  console.log('📝 ANLEITUNG FÜR AI AGENT (GitHub Copilot):');
  console.log('='.repeat(80));
  console.log(`
1. Öffne die Datei: ${BATCH_FILE}

2. Für jedes Package in der Datei:
   - Analysiere die Package-Beschreibung und Deliverables
   - Prüfe jedes Requirement auf echte Relevanz
   - Entscheide: CONFIRM (relevant) oder REJECT (nicht relevant)
   - Bestimme Relevance: "primary" (direkt relevant) oder "secondary" (unterstützend)
   - Schreibe kurze Begründung

3. Erstelle eine neue Datei: ${RESULTS_FILE}

4. Format der Results-Datei:
   [
     {
       "packageId": "WP-001",
       "decisions": [
         {
           "requirementId": "FR-...",
           "decision": "CONFIRM" | "REJECT",
           "relevance": "primary" | "secondary" | null,
           "reasoning": "Kurze Begründung warum relevant/nicht relevant"
         }
       ]
     }
   ]

5. Rufe dann auf: npm run requirements:apply-results

WICHTIG:
- Sei streng: Nur wirklich relevante Requirements bestätigen
- Keywords-Overlap alleine reicht nicht
- Achte auf semantische Bedeutung
- Primary = direkt implementiert, Secondary = wird genutzt/beeinflusst
`);

  console.log('='.repeat(80));
  console.log('\n💡 Bereit für AI Agent Review!');
}

async function applyResults() {
  console.log('🚀 Wende AI-Review-Ergebnisse an...\n');

  if (!existsSync(RESULTS_FILE)) {
    console.error(`❌ Fehler: ${RESULTS_FILE} nicht gefunden`);
    console.error('Bitte erst AI-Review durchführen und Results-Datei erstellen.');
    process.exit(1);
  }

  // Results laden
  const results = JSON.parse(readFileSync(RESULTS_FILE, 'utf8'));

  console.log(`📋 ${results.length} Packages mit Entscheidungen gefunden\n`);

  let totalConfirmed = 0;
  let totalRejected = 0;

  for (const result of results) {
    console.log(`📦 ${result.packageId}:`);

    for (const decision of result.decisions) {
      if (decision.decision === 'CONFIRM') {
        await prisma.packageRequirement.update({
          where: {
            packageId_requirementId: {
              packageId: result.packageId,
              requirementId: decision.requirementId
            }
          },
          data: {
            status: 'confirmed',
            relevance: decision.relevance || 'secondary',
            notes: `AI-Review: ${decision.reasoning}`
          }
        });
        totalConfirmed++;
        console.log(`   ✅ ${decision.requirementId}: ${decision.reasoning}`);
      } else {
        await prisma.packageRequirement.update({
          where: {
            packageId_requirementId: {
              packageId: result.packageId,
              requirementId: decision.requirementId
            }
          },
          data: {
            status: 'rejected',
            notes: `AI-Review: ${decision.reasoning}`
          }
        });
        totalRejected++;
        console.log(`   ❌ ${decision.requirementId}: ${decision.reasoning}`);
      }
    }
    console.log('');
  }

  console.log('='.repeat(80));
  console.log('✅ AI-Review-Ergebnisse angewendet!\n');
  console.log(`📊 Zusammenfassung:`);
  console.log(`   ✅ Bestätigt: ${totalConfirmed}`);
  console.log(`   ❌ Abgelehnt: ${totalRejected}`);

  // Finale Statistiken
  const stats = await prisma.packageRequirement.groupBy({
    by: ['status'],
    _count: true
  });

  console.log('\n📊 Gesamt-Status:\n');
  for (const stat of stats) {
    const emoji = stat.status === 'confirmed' ? '✅' : stat.status === 'rejected' ? '❌' : '⏳';
    console.log(`   ${emoji} ${stat.status}: ${stat._count}`);
  }

  // Packages ohne Requirements
  const withoutReqs = await prisma.workPackage.count({
    where: {
      requirements: {
        none: { status: 'confirmed' }
      }
    }
  });

  if (withoutReqs > 0) {
    console.log(`\n⚠️  ${withoutReqs} Packages ohne bestätigte Requirements`);
  }
}

// CLI
const command = process.argv[2];

if (command === 'prepare' || !command) {
  prepareBatch()
    .catch(e => {
      console.error('❌ Fehler:', e);
      process.exit(1);
    })
    .finally(() => prisma.$disconnect());
} else if (command === 'apply') {
  applyResults()
    .catch(e => {
      console.error('❌ Fehler:', e);
      process.exit(1);
    })
    .finally(() => prisma.$disconnect());
} else {
  console.error('❌ Unbekannter Befehl:', command);
  console.error('Nutzung: node ai-review-requirements.js [prepare|apply]');
  process.exit(1);
}
