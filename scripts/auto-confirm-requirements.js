#!/usr/bin/env node

/**
 * Automatische Bestätigung aller High-Confidence Mappings
 *
 * Bestätigt automatisch alle Vorschläge mit Confidence >= 0.7
 * und markiert Low-Confidence (<0.4) als rejected.
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function autoConfirm() {
  console.log('🚀 Starte automatische Bestätigung...\n');

  // High Confidence bestätigen (≥70%)
  console.log('✅ Bestätige High-Confidence Mappings (≥70%)...');
  const highConfResult = await prisma.packageRequirement.updateMany({
    where: {
      status: 'suggested',
      confidence: { gte: 0.7 }
    },
    data: {
      status: 'confirmed',
      relevance: 'primary'
    }
  });
  console.log(`   ✓ ${highConfResult.count} Mappings bestätigt\n`);

  // Medium Confidence bestätigen (50-70%)
  console.log('📊 Bestätige Medium-Confidence Mappings (50-70%)...');
  const medConfResult = await prisma.packageRequirement.updateMany({
    where: {
      status: 'suggested',
      confidence: { gte: 0.5, lt: 0.7 }
    },
    data: {
      status: 'confirmed',
      relevance: 'secondary'
    }
  });
  console.log(`   ✓ ${medConfResult.count} Mappings bestätigt\n`);

  // Low Confidence ablehnen (<40%)
  console.log('❌ Lehne Low-Confidence Mappings (<40%) ab...');
  const lowConfResult = await prisma.packageRequirement.updateMany({
    where: {
      status: 'suggested',
      confidence: { lt: 0.4 }
    },
    data: {
      status: 'rejected'
    }
  });
  console.log(`   ✓ ${lowConfResult.count} Mappings abgelehnt\n`);

  // Restliche (40-50%) lassen wir als suggested für manuelle Review
  const remaining = await prisma.packageRequirement.count({
    where: { status: 'suggested' }
  });
  console.log(`⏳ ${remaining} Mappings (40-50% Confidence) bleiben für manuelle Review\n`);

  // Statistiken
  console.log('═'.repeat(60));
  console.log('📊 Finale Statistiken:\n');

  const stats = await prisma.packageRequirement.groupBy({
    by: ['status'],
    _count: true
  });

  const total = stats.reduce((sum, s) => sum + s._count, 0);

  for (const stat of stats) {
    const percent = (stat._count / total * 100).toFixed(1);
    const emoji = stat.status === 'confirmed' ? '✅' : stat.status === 'rejected' ? '❌' : '⏳';
    console.log(`   ${emoji} ${stat.status}: ${stat._count} (${percent}%)`);
  }

  console.log('\n');

  // Packages ohne Requirements
  const packagesWithoutReqs = await prisma.workPackage.findMany({
    where: {
      requirements: {
        none: {
          status: 'confirmed'
        }
      }
    },
    select: {
      id: true,
      title: true
    }
  });

  if (packagesWithoutReqs.length > 0) {
    console.log(`⚠️  ${packagesWithoutReqs.length} Packages ohne bestätigte Requirements:\n`);
    for (const pkg of packagesWithoutReqs.slice(0, 10)) {
      console.log(`   - ${pkg.id}: ${pkg.title}`);
    }
    if (packagesWithoutReqs.length > 10) {
      console.log(`   ... und ${packagesWithoutReqs.length - 10} weitere`);
    }
    console.log('\n   💡 Diese benötigen manuelle Zuordnung via Suche\n');
  }

  // Coverage pro Milestone
  console.log('📈 Coverage pro Milestone:\n');

  const milestones = await prisma.milestone.findMany({
    orderBy: { code: 'asc' }
  });

  for (const ms of milestones) {
    const packages = await prisma.workPackage.count({
      where: { milestoneId: ms.id }
    });

    const withReqs = await prisma.workPackage.count({
      where: {
        milestoneId: ms.id,
        requirements: {
          some: {
            status: 'confirmed'
          }
        }
      }
    });

    const reqCount = await prisma.packageRequirement.count({
      where: {
        status: 'confirmed',
        package: {
          milestoneId: ms.id
        }
      }
    });

    const coverage = packages > 0 ? (withReqs / packages * 100).toFixed(0) : 0;
    const bar = '█'.repeat(Math.floor(coverage / 10)) + '░'.repeat(10 - Math.floor(coverage / 10));

    console.log(`   ${ms.code}: ${bar} ${coverage}% (${withReqs}/${packages} Packages, ${reqCount} Reqs)`);
  }

  console.log('\n✅ Automatische Bestätigung abgeschlossen!');
}

autoConfirm()
  .catch((e) => {
    console.error('❌ Fehler:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
