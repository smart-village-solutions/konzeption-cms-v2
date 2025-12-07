#!/usr/bin/env node

/**
 * KI-gestützter Requirements-Review Agent
 *
 * Analysiert Package-Beschreibungen und Requirements mit KI,
 * um intelligente Entscheidungen über die Zuordnung zu treffen.
 *
 * Verwendet Claude/GPT für semantische Analyse statt nur Keyword-Matching.
 */

import { PrismaClient } from '@prisma/client';
import { Anthropic } from '@anthropic-ai/sdk';

const prisma = new PrismaClient();

// Anthropic Claude initialisieren (falls API Key verfügbar)
const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null;

async function analyzeWithAI(packageData, requirements) {
  if (!anthropic) {
    throw new Error('ANTHROPIC_API_KEY nicht gesetzt. Bitte in .env definieren.');
  }

  const prompt = `Du bist ein Experte für Software-Anforderungsanalyse.
Analysiere das folgende Arbeitspaket und entscheide, welche der vorgeschlagenen Requirements wirklich relevant sind.

ARBEITSPAKET:
ID: ${packageData.id}
Titel: ${packageData.title}
Beschreibung: ${packageData.description}
Cluster: ${packageData.cluster.name}
Milestone: ${packageData.milestone.code} - ${packageData.milestone.title}
Deliverables: ${packageData.deliverables}

VORGESCHLAGENE REQUIREMENTS (${requirements.length}):
${requirements.map((r, i) => `
${i + 1}. ${r.requirement.id} (Confidence: ${(r.confidence * 100).toFixed(0)}%)
   Titel: ${r.requirement.title}
   Beschreibung: ${r.requirement.description.substring(0, 200)}...
   Quelle: ${r.requirement.filePath}
   Section: ${r.requirement.section || 'N/A'}
`).join('\n')}

AUFGABE:
Analysiere jedes Requirement und entscheide:
- CONFIRM: Wenn das Requirement direkt für dieses Package relevant ist (primär oder sekundär)
- REJECT: Wenn das Requirement nicht relevant ist oder nur durch Keyword-Überlappung matched

Gib deine Antwort als JSON zurück:
{
  "decisions": [
    {
      "requirementId": "FR-...",
      "decision": "CONFIRM" | "REJECT",
      "relevance": "primary" | "secondary" | null,
      "reasoning": "Kurze Begründung"
    }
  ],
  "summary": "Zusammenfassung der Analyse"
}

Antworte NUR mit dem JSON, ohne zusätzlichen Text.`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      temperature: 0.2, // Niedrig für konsistente Ergebnisse
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    const jsonText = response.content[0].text;
    return JSON.parse(jsonText);
  } catch (error) {
    console.error('KI-Analyse fehlgeschlagen:', error.message);
    return null;
  }
}

async function reviewPackageWithAI(pkg, index, total) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`📦 [${index}/${total}] ${pkg.id} - ${pkg.title}`);
  console.log('='.repeat(80));

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
    console.log('   ⚠️  Keine Vorschläge (übersprungen)');
    return;
  }

  console.log(`   🔍 Analysiere ${suggestions.length} Vorschläge mit KI...`);

  // Deliverables laden für besseren Kontext
  const deliverables = await prisma.deliverable.findMany({
    where: { packageId: pkg.id }
  });

  const packageData = {
    ...pkg,
    deliverables: deliverables.map(d => d.description).join('; ')
  };

  // KI-Analyse
  const analysis = await analyzeWithAI(packageData, suggestions);

  if (!analysis) {
    console.log('   ❌ KI-Analyse fehlgeschlagen, Package übersprungen');
    return;
  }

  console.log(`   💭 KI-Zusammenfassung: ${analysis.summary}`);
  console.log('');

  // Entscheidungen anwenden
  let confirmed = 0;
  let rejected = 0;

  for (const decision of analysis.decisions) {
    const mapping = suggestions.find(s => s.requirement.id === decision.requirementId);

    if (!mapping) continue;

    if (decision.decision === 'CONFIRM') {
      await prisma.packageRequirement.update({
        where: {
          packageId_requirementId: {
            packageId: pkg.id,
            requirementId: decision.requirementId
          }
        },
        data: {
          status: 'confirmed',
          relevance: decision.relevance || 'secondary',
          notes: `KI-Analyse: ${decision.reasoning}`
        }
      });
      confirmed++;
      console.log(`   ✅ ${decision.requirementId}: ${decision.reasoning}`);
    } else {
      await prisma.packageRequirement.update({
        where: {
          packageId_requirementId: {
            packageId: pkg.id,
            requirementId: decision.requirementId
          }
        },
        data: {
          status: 'rejected',
          notes: `KI-Analyse: ${decision.reasoning}`
        }
      });
      rejected++;
      console.log(`   ❌ ${decision.requirementId}: ${decision.reasoning}`);
    }
  }

  console.log(`\n   📊 Ergebnis: ${confirmed} bestätigt, ${rejected} abgelehnt`);
}

async function main() {
  console.log('🤖 KI-gestützter Requirements-Review Agent\n');

  // API Key prüfen
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ Fehler: ANTHROPIC_API_KEY nicht gesetzt');
    console.error('\nBitte API Key in .env Datei hinzufügen:');
    console.error('ANTHROPIC_API_KEY=sk-ant-...\n');
    process.exit(1);
  }

  // Statistiken vor Review
  const totalPackages = await prisma.workPackage.count();
  const withSuggestions = await prisma.workPackage.count({
    where: {
      requirements: {
        some: { status: 'suggested' }
      }
    }
  });

  console.log(`📊 Status:`);
  console.log(`   Packages gesamt: ${totalPackages}`);
  console.log(`   Mit offenen Vorschlägen: ${withSuggestions}\n`);

  if (withSuggestions === 0) {
    console.log('✅ Alle Packages bereits reviewed!');
    return;
  }

  console.log(`🚀 Starte KI-Review für ${withSuggestions} Packages...\n`);
  console.log('⏱️  Dies kann einige Minuten dauern...\n');

  // Packages mit Suggestions laden
  const packages = await prisma.workPackage.findMany({
    where: {
      requirements: {
        some: { status: 'suggested' }
      }
    },
    include: {
      milestone: true,
      cluster: true
    },
    orderBy: {
      id: 'asc'
    }
  });

  let completed = 0;
  const startTime = Date.now();

  for (const pkg of packages) {
    await reviewPackageWithAI(pkg, ++completed, packages.length);

    // Fortschritt
    if (completed % 5 === 0) {
      const elapsed = (Date.now() - startTime) / 1000;
      const avgTime = elapsed / completed;
      const remaining = (packages.length - completed) * avgTime;

      console.log(`\n⏱️  Fortschritt: ${completed}/${packages.length} (${(completed/packages.length*100).toFixed(0)}%)`);
      console.log(`   Geschätzte Restzeit: ${Math.ceil(remaining / 60)} Minuten\n`);
    }
  }

  // Finale Statistiken
  console.log('\n' + '='.repeat(80));
  console.log('✅ KI-Review abgeschlossen!\n');

  const stats = await prisma.packageRequirement.groupBy({
    by: ['status'],
    _count: true
  });

  console.log('📊 Finale Statistiken:\n');
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
    console.log(`\n   ⚠️  ${withoutReqs} Packages ohne bestätigte Requirements`);
    console.log('   💡 Diese benötigen manuelle Nachbearbeitung');
  }

  console.log('\n💡 Nächster Schritt: npm run requirements:validate');
}

main()
  .catch((e) => {
    console.error('❌ Fehler:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
