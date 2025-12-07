#!/usr/bin/env node

/**
 * Automatisches Mapping von Requirements zu Work Packages
 *
 * Verwendet Keyword-Matching um Vorschläge zu generieren:
 * - Extrahiert Keywords aus Package (title, description, deliverables)
 * - Extrahiert Keywords aus Requirement (title, description, section)
 * - Berechnet Similarity-Score
 * - Speichert Top-Matches als "suggested" in package_requirements
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Stopwords (deutsch & englisch)
const STOPWORDS = new Set([
  'der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einer', 'eines',
  'und', 'oder', 'aber', 'mit', 'von', 'zu', 'im', 'am', 'ist', 'sind',
  'wird', 'werden', 'hat', 'haben', 'für', 'auf', 'als', 'nach', 'bei',
  'the', 'a', 'an', 'and', 'or', 'but', 'with', 'from', 'to', 'in', 'at',
  'is', 'are', 'was', 'were', 'has', 'have', 'for', 'on', 'as', 'by'
]);

function tokenize(text) {
  if (!text) return [];

  return text
    .toLowerCase()
    .replace(/[^a-zäöüß0-9\s]/gi, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !STOPWORDS.has(word));
}

function extractKeywords(text) {
  const tokens = tokenize(text);
  const frequency = new Map();

  for (const token of tokens) {
    frequency.set(token, (frequency.get(token) || 0) + 1);
  }

  return frequency;
}

function calculateSimilarity(packageKeywords, requirementKeywords) {
  let score = 0;
  let totalWeight = 0;

  // Für jedes Keyword im Package
  for (const [keyword, pkgFreq] of packageKeywords) {
    if (requirementKeywords.has(keyword)) {
      const reqFreq = requirementKeywords.get(keyword);
      // TF-IDF-ähnlicher Score (je häufiger, desto wichtiger)
      const weight = Math.min(pkgFreq, reqFreq);
      score += weight * weight; // Quadratisch für bessere Gewichtung
      totalWeight += weight;
    }
  }

  // Normalisieren auf 0-1
  if (totalWeight === 0) return 0;

  const maxPossible = Math.max(
    [...packageKeywords.values()].reduce((a, b) => a + b, 0),
    [...requirementKeywords.values()].reduce((a, b) => a + b, 0)
  );

  return Math.min(1.0, score / maxPossible);
}

function applyBonus(score, packageText, requirement) {
  let bonus = 0;

  // Exakte Matches mit hohem Bonus
  const exactMatches = [
    'authentifizierung', 'dashboard', 'monitoring', 'logging',
    'backup', 'security', 'audit', 'performance', 'skalierbarkeit',
    'barrierefreiheit', 'accessibility', 'i18n', 'lokalisierung'
  ];

  for (const term of exactMatches) {
    if (packageText.toLowerCase().includes(term) &&
        requirement.title.toLowerCase().includes(term)) {
      bonus += 0.2;
    }
  }

  // Section-Match
  if (requirement.section) {
    const section = requirement.section.toLowerCase();
    if (packageText.toLowerCase().includes(section)) {
      bonus += 0.15;
    }
  }

  // Cluster-Match (z.B. Package in Cluster "Sicherheit" + Requirement aus Sicherheit.md)
  // Wird später mit Cluster-Info ergänzt

  return Math.min(1.0, score + bonus);
}

async function mapRequirements() {
  console.log('🚀 Starte Auto-Mapping...\n');

  // Alle Packages laden
  console.log('📦 Lade Work Packages...');
  const packages = await prisma.workPackage.findMany({
    include: {
      cluster: true,
      milestone: true
    }
  });
  console.log(`   ✓ ${packages.length} Packages geladen\n`);

  // Alle Requirements laden
  console.log('📝 Lade Requirements...');
  const requirements = await prisma.requirement.findMany();
  console.log(`   ✓ ${requirements.length} Requirements geladen\n`);

  // Alte Mappings löschen
  console.log('🗑️  Lösche alte Mappings...');
  await prisma.packageRequirement.deleteMany();
  console.log('   ✓ Alte Mappings gelöscht\n');

  console.log('🔗 Erstelle Mappings...\n');

  let totalMappings = 0;
  const MIN_CONFIDENCE = 0.3; // Mindest-Score für Vorschlag
  const MAX_SUGGESTIONS = 15;  // Max. Vorschläge pro Package

  for (const pkg of packages) {
    // Package-Text zusammenstellen
    const packageText = [
      pkg.title,
      pkg.description,
      pkg.cluster.name
    ].join(' ');

    const packageKeywords = extractKeywords(packageText);

    // Scores für alle Requirements berechnen
    const scores = [];

    for (const req of requirements) {
      const reqText = [
        req.title,
        req.description,
        req.section || '',
        req.headingPath || ''
      ].join(' ');

      const reqKeywords = extractKeywords(reqText);
      let score = calculateSimilarity(packageKeywords, reqKeywords);
      score = applyBonus(score, packageText, req);

      if (score >= MIN_CONFIDENCE) {
        scores.push({ requirement: req, score });
      }
    }

    // Top-N sortiert nach Score
    scores.sort((a, b) => b.score - a.score);
    const topMatches = scores.slice(0, MAX_SUGGESTIONS);

    // In Datenbank speichern
    for (const match of topMatches) {
      await prisma.packageRequirement.create({
        data: {
          packageId: pkg.id,
          requirementId: match.requirement.id,
          confidence: Math.round(match.score * 100) / 100, // 2 Dezimalstellen
          status: 'suggested',
          relevance: match.score > 0.7 ? 'primary' : 'secondary'
        }
      });
      totalMappings++;
    }

    const avgScore = topMatches.length > 0
      ? (topMatches.reduce((sum, m) => sum + m.score, 0) / topMatches.length).toFixed(2)
      : 0;

    console.log(`   ${pkg.id}: ${topMatches.length} Vorschläge (Ø ${avgScore})`);
  }

  console.log(`\n✅ Auto-Mapping abgeschlossen!\n`);
  console.log(`📊 Zusammenfassung:`);
  console.log(`   - ${packages.length} Packages verarbeitet`);
  console.log(`   - ${totalMappings} Mappings erstellt`);
  console.log(`   - Ø ${(totalMappings / packages.length).toFixed(1)} Vorschläge pro Package`);

  // Statistiken
  const highConfidence = await prisma.packageRequirement.count({
    where: { confidence: { gte: 0.7 } }
  });
  const mediumConfidence = await prisma.packageRequirement.count({
    where: { confidence: { gte: 0.5, lt: 0.7 } }
  });
  const lowConfidence = await prisma.packageRequirement.count({
    where: { confidence: { lt: 0.5 } }
  });

  console.log(`\n   🎯 High Confidence (≥0.7): ${highConfidence}`);
  console.log(`   📊 Medium Confidence (0.5-0.7): ${mediumConfidence}`);
  console.log(`   ⚠️  Low Confidence (<0.5): ${lowConfidence}`);

  // Packages ohne Vorschläge
  const packagesWithoutMappings = await prisma.workPackage.count({
    where: {
      requirements: {
        none: {}
      }
    }
  });

  if (packagesWithoutMappings > 0) {
    console.log(`\n   ⚠️  ${packagesWithoutMappings} Packages ohne Vorschläge (manuelle Prüfung nötig)`);
  }

  console.log(`\n💡 Nächster Schritt: npm run requirements:review`);
}

mapRequirements()
  .catch((e) => {
    console.error('❌ Fehler beim Auto-Mapping:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
