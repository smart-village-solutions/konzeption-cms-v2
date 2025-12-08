#!/usr/bin/env node

/**
 * Apply AI Review Results to Database
 *
 * Liest AI-Review Ergebnisse und wendet sie über die API an.
 *
 * Usage:
 *   node scripts/apply-ai-results.js <results-file.json>
 */

import { readFileSync } from 'fs';

const API_BASE = process.env.API_URL || 'http://localhost:3000';

async function applyResults(resultsFile) {
  console.log(`📖 Lade Ergebnisse aus ${resultsFile}...`);

  const results = JSON.parse(readFileSync(resultsFile, 'utf-8'));

  if (!Array.isArray(results)) {
    throw new Error('Results must be an array of packages with decisions');
  }

  console.log(`✅ ${results.length} Packages gefunden\n`);

  // Prepare bulk updates
  const updates = [];
  let confirmCount = 0;
  let rejectCount = 0;

  for (const packageResult of results) {
    const { packageId, decisions } = packageResult;

    if (!decisions || !Array.isArray(decisions)) {
      console.log(`⚠️  Skipping ${packageId}: no decisions array`);
      continue;
    }

    for (const decision of decisions) {
      const { requirementId, action, relevance, reasoning } = decision;

      if (action === 'CONFIRM') {
        updates.push({
          packageId,
          requirementId,
          status: 'confirmed',
          relevance: relevance || 'primary',
          notes: reasoning || 'Confirmed by AI'
        });
        confirmCount++;
      } else if (action === 'REJECT') {
        updates.push({
          packageId,
          requirementId,
          status: 'rejected',
          notes: reasoning || 'Rejected by AI'
        });
        rejectCount++;
      } else {
        console.log(`⚠️  Unknown action for ${packageId}/${requirementId}: ${action}`);
      }
    }
  }

  console.log(`📊 Vorbereitet:`);
  console.log(`   ✓ ${confirmCount} Confirmations`);
  console.log(`   ✗ ${rejectCount} Rejections`);
  console.log(`   Σ ${updates.length} Total Updates\n`);

  if (updates.length === 0) {
    console.log('⚠️  Keine Updates zum Anwenden.');
    return;
  }

  // Send bulk update to API
  console.log(`🚀 Sende Bulk-Update an ${API_BASE}/api/mappings/bulk-update...`);

  const response = await fetch(`${API_BASE}/api/mappings/bulk-update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ updates })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`API Error: ${error.error}`);
  }

  const result = await response.json();

  console.log(`\n✅ Erfolgreich aktualisiert: ${result.updated} Mappings`);

  // Get updated statistics
  const statsResponse = await fetch(`${API_BASE}/api/stats`);
  const stats = await statsResponse.json();

  console.log(`\n📊 Neue Statistik:`);
  console.log(`   Work Packages: ${stats.workPackages}`);
  console.log(`   Requirements: ${stats.requirements}`);
  console.log(`   Mappings:`);
  console.log(`     - Total: ${stats.mappings.total}`);
  console.log(`     - Confirmed: ${stats.mappings.confirmed}`);
  console.log(`     - Suggested: ${stats.mappings.suggested}`);
}

// Main
const resultsFile = process.argv[2];

if (!resultsFile) {
  console.error('Usage: node scripts/apply-ai-results.js <results-file.json>');
  process.exit(1);
}

applyResults(resultsFile)
  .then(() => {
    console.log('\n✅ Fertig!');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ Fehler:', error.message);
    process.exit(1);
  });
