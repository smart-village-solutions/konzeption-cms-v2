#!/usr/bin/env node

/**
 * Batch-Review mit Anthropic Batch API
 *
 * Erstellt Batch-Jobs für alle Packages und verarbeitet sie parallel.
 * Umgeht Token-Limits durch asynchrone Batch-Verarbeitung.
 */

import { PrismaClient } from '@prisma/client';
import { Anthropic } from '@anthropic-ai/sdk';
import { writeFileSync, readFileSync, existsSync } from 'fs';

const prisma = new PrismaClient();
const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null;

const BATCH_FILE = 'anthropic-batch-requests.jsonl';
const BATCH_ID_FILE = 'anthropic-batch-id.txt';

function createAnalysisPrompt(packageData, requirements) {
  return `Du bist ein Experte für Software-Anforderungsanalyse.
Analysiere das folgende Arbeitspaket und entscheide, welche der vorgeschlagenen Requirements wirklich relevant sind.

ARBEITSPAKET:
ID: ${packageData.id}
Titel: ${packageData.title}
Beschreibung: ${packageData.description}
Cluster: ${packageData.cluster}
Milestone: ${packageData.milestone}
Deliverables: ${packageData.deliverables}

VORGESCHLAGENE REQUIREMENTS (${requirements.length}):
${requirements.map((r, i) => `
${i + 1}. ${r.id} (Confidence: ${(r.confidence * 100).toFixed(0)}%)
   Titel: ${r.title}
   Beschreibung: ${r.description.substring(0, 300)}...
   Quelle: ${r.filePath} > ${r.section || 'N/A'}
`).join('\n')}

AUFGABE:
Analysiere jedes Requirement kritisch:
- CONFIRM primary: Wird direkt in diesem Package implementiert
- CONFIRM secondary: Wird genutzt/beeinflusst/getestet in diesem Package
- REJECT: Nicht relevant (nur zufälliger Keyword-Match)

WICHTIG:
- Sei streng und kritisch
- Keyword-Overlap alleine reicht NICHT
- Achte auf semantische Relevanz
- Bevorzuge weniger, aber relevante Requirements

Antworte NUR mit folgendem JSON (kein zusätzlicher Text):
{
  "decisions": [
    {
      "requirementId": "FR-...",
      "decision": "CONFIRM" | "REJECT",
      "relevance": "primary" | "secondary" | null,
      "reasoning": "Kurze klare Begründung (max 100 Zeichen)"
    }
  ]
}`;
}

async function createBatch() {
  console.log('🚀 Erstelle Batch für Anthropic API...\n');

  if (!anthropic) {
    console.error('❌ ANTHROPIC_API_KEY nicht gesetzt in .env');
    process.exit(1);
  }

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

  // JSONL für Batch erstellen
  const requests = [];

  for (const pkg of packages) {
    const packageData = {
      id: pkg.id,
      title: pkg.title,
      description: pkg.description,
      cluster: pkg.cluster.name,
      milestone: `${pkg.milestone.code} - ${pkg.milestone.title}`,
      deliverables: pkg.deliverables.map(d => d.description).join('; ')
    };

    const requirements = pkg.requirements.map(pr => ({
      id: pr.requirement.id,
      title: pr.requirement.title,
      description: pr.requirement.description,
      filePath: pr.requirement.filePath,
      section: pr.requirement.section,
      confidence: pr.confidence
    }));

    if (requirements.length === 0) continue;

    const prompt = createAnalysisPrompt(packageData, requirements);

    requests.push({
      custom_id: pkg.id,
      params: {
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2000,
        temperature: 0.2,
        messages: [{
          role: 'user',
          content: prompt
        }]
      }
    });
  }

  // JSONL schreiben (eine Zeile pro Request)
  const jsonl = requests.map(r => JSON.stringify(r)).join('\n');
  writeFileSync(BATCH_FILE, jsonl);

  console.log(`✅ Batch-Datei erstellt: ${BATCH_FILE}`);
  console.log(`   ${requests.length} Requests für API\n`);

  // Batch bei Anthropic einreichen
  console.log('📤 Sende Batch an Anthropic...');

  try {
    const batch = await anthropic.messages.batches.create({
      requests
    });

    console.log(`✅ Batch erstellt: ${batch.id}`);
    console.log(`   Status: ${batch.processing_status}`);
    console.log(`   Requests: ${batch.request_counts.processing} processing\n`);

    // Batch ID speichern
    writeFileSync(BATCH_ID_FILE, batch.id);

    console.log('⏱️  Die Verarbeitung läuft im Hintergrund.');
    console.log('   Dies kann 10-30 Minuten dauern.\n');
    console.log('💡 Prüfe Status mit: npm run requirements:batch-status');

  } catch (error) {
    console.error('❌ Fehler beim Erstellen des Batch:', error.message);
    process.exit(1);
  }
}

async function checkStatus() {
  if (!anthropic) {
    console.error('❌ ANTHROPIC_API_KEY nicht gesetzt');
    process.exit(1);
  }

  if (!existsSync(BATCH_ID_FILE)) {
    console.error('❌ Keine Batch ID gefunden. Erst Batch erstellen mit: npm run requirements:batch-create');
    process.exit(1);
  }

  const batchId = readFileSync(BATCH_ID_FILE, 'utf8').trim();

  console.log(`🔍 Prüfe Batch: ${batchId}\n`);

  try {
    const batch = await anthropic.messages.batches.retrieve(batchId);

    console.log(`📊 Status: ${batch.processing_status}`);
    console.log(`   Erstellt: ${new Date(batch.created_at).toLocaleString('de-DE')}`);

    if (batch.ended_at) {
      console.log(`   Beendet: ${new Date(batch.ended_at).toLocaleString('de-DE')}`);
    }

    console.log(`\n📈 Requests:`);
    console.log(`   ⏳ Processing: ${batch.request_counts.processing}`);
    console.log(`   ✅ Succeeded: ${batch.request_counts.succeeded}`);
    console.log(`   ❌ Errored: ${batch.request_counts.errored}`);
    console.log(`   ⚠️  Expired: ${batch.request_counts.expired}`);
    console.log(`   🚫 Canceled: ${batch.request_counts.canceled}`);

    if (batch.processing_status === 'ended') {
      console.log('\n✅ Batch abgeschlossen!');
      console.log('💡 Ergebnisse abrufen mit: npm run requirements:batch-results');
    } else if (batch.processing_status === 'in_progress') {
      console.log('\n⏳ Batch läuft noch...');
      console.log('   Bitte später nochmal prüfen.');
    }

  } catch (error) {
    console.error('❌ Fehler beim Abrufen des Status:', error.message);
    process.exit(1);
  }
}

async function getResults() {
  if (!anthropic) {
    console.error('❌ ANTHROPIC_API_KEY nicht gesetzt');
    process.exit(1);
  }

  if (!existsSync(BATCH_ID_FILE)) {
    console.error('❌ Keine Batch ID gefunden');
    process.exit(1);
  }

  const batchId = readFileSync(BATCH_ID_FILE, 'utf8').trim();

  console.log(`📥 Rufe Batch-Ergebnisse ab: ${batchId}\n`);

  try {
    // Erst Status prüfen
    const batch = await anthropic.messages.batches.retrieve(batchId);

    if (batch.processing_status !== 'ended') {
      console.error(`❌ Batch noch nicht fertig (Status: ${batch.processing_status})`);
      console.error('   Warte bis Status "ended" ist.');
      process.exit(1);
    }

    // Ergebnisse abrufen
    console.log('📦 Lade Ergebnisse...\n');

    const results = [];
    for await (const result of await anthropic.messages.batches.results(batchId)) {
      if (result.result.type === 'succeeded') {
        const packageId = result.custom_id;
        const response = result.result.message;
        const jsonText = response.content[0].text;

        try {
          const analysis = JSON.parse(jsonText);
          results.push({
            packageId,
            decisions: analysis.decisions
          });
          console.log(`✅ ${packageId}: ${analysis.decisions.length} Entscheidungen`);
        } catch (parseError) {
          console.error(`⚠️  ${packageId}: JSON Parse Fehler`);
        }
      } else {
        console.error(`❌ ${result.custom_id}: ${result.result.type}`);
      }
    }

    console.log(`\n✅ ${results.length} Packages verarbeitet\n`);

    // Ergebnisse anwenden
    console.log('💾 Wende Entscheidungen in Datenbank an...\n');

    let totalConfirmed = 0;
    let totalRejected = 0;

    for (const result of results) {
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
              notes: `AI-Batch-Review: ${decision.reasoning}`
            }
          });
          totalConfirmed++;
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
              notes: `AI-Batch-Review: ${decision.reasoning}`
            }
          });
          totalRejected++;
        }
      }
    }

    console.log('='.repeat(80));
    console.log('✅ Batch-Review abgeschlossen!\n');
    console.log(`📊 Ergebnisse:`);
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

  } catch (error) {
    console.error('❌ Fehler beim Abrufen der Ergebnisse:', error.message);
    process.exit(1);
  }
}

// CLI
const command = process.argv[2];

if (command === 'create') {
  createBatch()
    .catch(e => {
      console.error('❌ Fehler:', e);
      process.exit(1);
    })
    .finally(() => prisma.$disconnect());
} else if (command === 'status') {
  checkStatus()
    .catch(e => {
      console.error('❌ Fehler:', e);
      process.exit(1);
    })
    .finally(() => prisma.$disconnect());
} else if (command === 'results') {
  getResults()
    .catch(e => {
      console.error('❌ Fehler:', e);
      process.exit(1);
    })
    .finally(() => prisma.$disconnect());
} else {
  console.error('❌ Unbekannter Befehl:', command);
  console.error('\nNutzung:');
  console.error('  npm run requirements:batch-create   - Batch erstellen');
  console.error('  npm run requirements:batch-status   - Status prüfen');
  console.error('  npm run requirements:batch-results  - Ergebnisse abrufen');
  process.exit(1);
}
