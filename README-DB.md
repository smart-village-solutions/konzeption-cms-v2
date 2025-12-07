# Arbeitspakete-Datenbank

## Setup

```bash
# Dependencies installieren
npm install

# Prisma Client generieren
npm run db:generate

# Datenbank initialisieren (Migration)
npm run db:migrate

# YAML-Daten importieren
npm run db:import

# Prisma Studio öffnen (GUI)
npm run db:studio
```

## Datenbankstruktur

### Tabellen

- **milestones**: 10 Milestones (MS1-MS10)
- **clusters**: Verschiedene Cluster (Foundation, Backend, Frontend, etc.)
- **work_packages**: 83 Arbeitspakete mit Story Points
- **deliverables**: Lieferbare Ergebnisse pro Paket (1:N)
- **acceptance_criteria**: Akzeptanzkriterien pro Paket (1:N)
- **dependencies**: Paket-Abhängigkeiten (M:N Selbstreferenz)
- **requirements**: Anforderungen aus Markdown-Dateien
- **package_requirements**: Verknüpfung Pakete ↔ Anforderungen (M:N)

## Nutzung

### Prisma Studio (GUI)
```bash
npm run db:studio
```
Öffnet Browser-Interface auf http://localhost:5555

### Queries (Beispiele)

```javascript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Alle Pakete aus MS3 mit >8 Story Points
const packages = await prisma.workPackage.findMany({
  where: {
    milestone: { code: 'MS3' },
    storyPoints: { gt: 8 }
  },
  include: {
    deliverables: true,
    acceptanceCriteria: true,
    dependsOn: true
  }
});

// Story Points pro Milestone
const stats = await prisma.workPackage.groupBy({
  by: ['milestoneId'],
  _sum: { storyPoints: true },
  _count: true
});

// Pakete mit ihren Dependencies
const withDeps = await prisma.workPackage.findUnique({
  where: { id: 'WP-001' },
  include: {
    dependsOn: {
      include: { toPackage: true }
    }
  }
});
```

## Backup & Export

```bash
# Backup (SQLite-Datei)
cp arbeitspakete.db arbeitspakete.backup.db

# SQL-Export
sqlite3 arbeitspakete.db .dump > backup.sql
```

## Migration zu PostgreSQL (später)

```prisma
// In schema.prisma ändern:
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Dann: `npm run db:migrate`
