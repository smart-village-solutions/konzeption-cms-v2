#!/usr/bin/env node

/**
 * Import-Script: YAML → SQLite Datenbank
 * Importiert alle Arbeitspakete aus Arbeitspakete.yml in die Datenbank
 */

import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prisma = new PrismaClient();

// Milestone-Mapping
const MILESTONES = [
  { code: 'MS1', title: 'Basis-Infrastruktur & MVP', description: 'Foundation, Authentication, Core Features' },
  { code: 'MS2', title: 'Kernmodule', description: 'Content-Module: Events, POIs, Tours, etc.' },
  { code: 'MS3', title: 'Konfiguration', description: 'E-Mail, Instanzen, i18n, Design, Navigation' },
  { code: 'MS4', title: 'Schnittstellen', description: 'APIs: GraphQL, REST, Schema.org, Webhooks' },
  { code: 'MS5', title: 'Monitoring & Logging', description: 'System-Monitoring, ELK, Analytics' },
  { code: 'MS6', title: 'Erweiterte Module', description: '20+ zusätzliche Features, Widgets, Community' },
  { code: 'MS7', title: 'Dashboard-Erweiterungen', description: 'Analytics, Reporting, Widgets' },
  { code: 'MS8', title: 'Hilfe & Support', description: 'Onboarding, Dokumentation, Release-Management' },
  { code: 'MS9', title: 'KI-Assistenz', description: 'KI-Provider, Content-KI, Chatbot' },
  { code: 'MS10', title: 'QA, Security & Go-Live', description: 'Testing, Audits, Compliance, Finalisierung' }
];

// Cluster-Liste (aus YAML extrahiert)
const CLUSTERS = [
  'Foundation',
  'Infrastruktur',
  'Backend',
  'Frontend',
  'DevOps',
  'Qualität',
  'Sicherheit',
  'Security',
  'Authentifizierung',
  'Mandantenverwaltung',
  'Organisation',
  'Benutzerverwaltung',
  'Medien',
  'Content-Module',
  'CMS-Core',
  'Dashboard',
  'Suche',
  'Datenschutz',
  'Konfiguration',
  'Schnittstellen',
  'Monitoring',
  'Nutzerfreundlichkeit',
  'Erweiterte Module',
  'Hilfe & Support',
  'KI-Assistenz',
  'Integration',
  'Governance',
  'Dokumentation',
  'Projektabschluss',
  'QA'
].map(name => ({ name, description: null }));

async function main() {
  console.log('🚀 Starte Import von Arbeitspakete.yml...\n');

  // 1. YAML laden
  const yamlPath = join(__dirname, '..', 'Arbeitspakete.yml');
  const yamlContent = readFileSync(yamlPath, 'utf8');
  const data = yaml.load(yamlContent);

  console.log(`📦 ${data.work_packages.length} Arbeitspakete gefunden\n`);

  // 2. Datenbank leeren
  console.log('🗑️  Lösche alte Daten...');
  await prisma.packageRequirement.deleteMany();
  await prisma.dependency.deleteMany();
  await prisma.acceptanceCriterion.deleteMany();
  await prisma.deliverable.deleteMany();
  await prisma.workPackage.deleteMany();
  await prisma.requirement.deleteMany();
  await prisma.cluster.deleteMany();
  await prisma.milestone.deleteMany();

  // 3. Milestones erstellen
  console.log('📍 Erstelle Milestones...');
  const milestoneMap = new Map();
  for (const ms of MILESTONES) {
    const created = await prisma.milestone.create({ data: ms });
    milestoneMap.set(ms.code, created.id);
    console.log(`   ✓ ${ms.code}: ${ms.title}`);
  }

  // 4. Clusters erstellen
  console.log('\n🏷️  Erstelle Clusters...');
  const clusterMap = new Map();
  for (const cluster of CLUSTERS) {
    const created = await prisma.cluster.create({ data: cluster });
    clusterMap.set(cluster.name, created.id);
  }
  console.log(`   ✓ ${CLUSTERS.length} Clusters erstellt`);

  // 5. Work Packages erstellen (ohne Dependencies)
  console.log('\n📦 Erstelle Work Packages...');
  const packageIds = [];

  for (const pkg of data.work_packages) {
    // Milestone ID ermitteln (Standard: MS1 für Pakete ohne Milestone)
    const milestoneCode = pkg.milestone || 'MS1';
    const milestoneId = milestoneMap.get(milestoneCode);
    if (!milestoneId) {
      console.warn(`   ⚠️  Milestone '${milestoneCode}' nicht gefunden für ${pkg.id}`);
      continue;
    }

    // Cluster ID ermitteln
    const clusterId = clusterMap.get(pkg.cluster);
    if (!clusterId) {
      console.warn(`   ⚠️  Cluster '${pkg.cluster}' nicht gefunden für ${pkg.id}`);
      continue;
    }

    // Work Package erstellen
    await prisma.workPackage.create({
      data: {
        id: pkg.id,
        title: pkg.title,
        description: pkg.description,
        storyPoints: pkg.story_points,
        status: pkg.status,
        milestoneId,
        clusterId
      }
    });

    packageIds.push(pkg.id);

    // Deliverables erstellen (Split by semicolon)
    if (pkg.deliverables) {
      const deliverables = pkg.deliverables.split(/[;,]/).map(d => d.trim()).filter(Boolean);
      for (const deliverable of deliverables) {
        await prisma.deliverable.create({
          data: {
            packageId: pkg.id,
            description: deliverable
          }
        });
      }
    }

    // Acceptance Criteria erstellen (Split by semicolon)
    if (pkg.acceptance) {
      const criteria = pkg.acceptance.split(';').map(c => c.trim()).filter(Boolean);
      for (const criterion of criteria) {
        await prisma.acceptanceCriterion.create({
          data: {
            packageId: pkg.id,
            criterion
          }
        });
      }
    }

    console.log(`   ✓ ${pkg.id}: ${pkg.title}`);
  }

  // 6. Dependencies erstellen
  console.log('\n🔗 Erstelle Dependencies...');
  let depCount = 0;

  for (const pkg of data.work_packages) {
    if (pkg.deps && Array.isArray(pkg.deps)) {
      for (const depId of pkg.deps) {
        // Prüfen, ob beide Packages existieren
        if (packageIds.includes(pkg.id) && packageIds.includes(depId)) {
          await prisma.dependency.create({
            data: {
              fromPackageId: pkg.id,
              toPackageId: depId
            }
          });
          depCount++;
        }
      }
    }
  }
  console.log(`   ✓ ${depCount} Dependencies erstellt`);

  console.log('\n✅ Import abgeschlossen!');
  console.log(`\n📊 Zusammenfassung:`);
  console.log(`   - ${MILESTONES.length} Milestones`);
  console.log(`   - ${CLUSTERS.length} Clusters`);
  console.log(`   - ${packageIds.length} Work Packages`);
  console.log(`   - ${depCount} Dependencies`);

  const deliverableCount = await prisma.deliverable.count();
  const acceptanceCount = await prisma.acceptanceCriterion.count();
  console.log(`   - ${deliverableCount} Deliverables`);
  console.log(`   - ${acceptanceCount} Acceptance Criteria`);

  console.log('\n💡 Nächster Schritt: npm run db:studio');
}

main()
  .catch((e) => {
    console.error('❌ Fehler beim Import:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
