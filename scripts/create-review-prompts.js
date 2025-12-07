#!/usr/bin/env node

/**
 * Direkter AI-Review mit GitHub Copilot Edits
 *
 * Geht Package für Package durch und erstellt für jedes eine
 * Analyse-Anfrage an den AI Agent (mich).
 */

import { PrismaClient } from '@prisma/client';
import { writeFileSync } from 'fs';

const prisma = new PrismaClient();

async function createAnalysisPrompts() {
  console.log('🚀 Erstelle Analyse-Prompts für AI Agent...\n');

  // Packages mit Suggestions laden (nur erste 10 für Start)
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
        },
        take: 15 // Max 15 pro Package
      },
      deliverables: true
    },
    orderBy: {
      id: 'asc'
    },
    take: 10 // Erstmal nur 10 Packages
  });

  console.log(`📦 Starte mit ${packages.length} Packages\n`);

  let promptsMarkdown = '# AI Requirements Review\n\n';
  promptsMarkdown += 'Für jedes Package: Analysiere die Requirements und bestätige nur die wirklich relevanten.\n\n';
  promptsMarkdown += '**Entscheidungs-Kriterien:**\n';
  promptsMarkdown += '- CONFIRM primary: Requirement wird direkt in diesem Package implementiert\n';
  promptsMarkdown += '- CONFIRM secondary: Requirement wird genutzt/beeinflusst dieses Package\n';
  promptsMarkdown += '- REJECT: Nicht relevant (nur Keyword-Overlap)\n\n';
  promptsMarkdown += '---\n\n';

  for (const pkg of packages) {
    promptsMarkdown += `## ${pkg.id}: ${pkg.title}\n\n`;
    promptsMarkdown += `**Cluster:** ${pkg.cluster.name} | **Milestone:** ${pkg.milestone.code}\n\n`;
    promptsMarkdown += `**Beschreibung:**\n${pkg.description}\n\n`;
    promptsMarkdown += `**Deliverables:**\n${pkg.deliverables.map(d => `- ${d.description}`).join('\n')}\n\n`;
    promptsMarkdown += `### Vorgeschlagene Requirements (${pkg.requirements.length}):\n\n`;

    for (const pr of pkg.requirements) {
      const req = pr.requirement;
      promptsMarkdown += `#### ${req.id} (${(pr.confidence * 100).toFixed(0)}%)\n`;
      promptsMarkdown += `- **Titel:** ${req.title}\n`;
      promptsMarkdown += `- **Beschreibung:** ${req.description.substring(0, 300)}${req.description.length > 300 ? '...' : ''}\n`;
      promptsMarkdown += `- **Quelle:** ${req.filePath} > ${req.section || 'N/A'}\n`;
      promptsMarkdown += `- **Entscheidung:** [ ] CONFIRM (primary/secondary) | [ ] REJECT\n`;
      promptsMarkdown += `- **Begründung:** _TODO: Analysiere und begründe_\n\n`;
    }

    promptsMarkdown += '---\n\n';
  }

  writeFileSync('ai-review-prompts.md', promptsMarkdown);

  console.log('✅ Prompts erstellt: ai-review-prompts.md');
  console.log('\n📝 NÄCHSTER SCHRITT:');
  console.log('1. Öffne ai-review-prompts.md');
  console.log('2. Für jedes Package: Analysiere die Requirements');
  console.log('3. Markiere Entscheidung: [x] CONFIRM oder [x] REJECT');
  console.log('4. Schreibe Begründung');
  console.log('5. Speichern');
  console.log('6. Rufe auf: npm run requirements:parse-decisions');
}

createAnalysisPrompts()
  .catch(e => {
    console.error('❌ Fehler:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
