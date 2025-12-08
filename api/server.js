#!/usr/bin/env node

/**
 * REST API Server für Arbeitspakete-Datenbank
 *
 * Bietet RESTful Endpoints für:
 * - Work Packages (CRUD)
 * - Requirements (CRUD + Search)
 * - Package-Requirement Mappings (CRUD + Bulk Operations)
 * - Statistics & Reports
 */

import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.API_PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Request Logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

// ==================== HEALTH & INFO ====================

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/info', async (req, res) => {
  try {
    const stats = await getStatistics();
    res.json({
      version: '1.0.0',
      database: 'SQLite (arbeitspakete.db)',
      statistics: stats
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== WORK PACKAGES ====================

// GET /api/packages - List all work packages
app.get('/api/packages', async (req, res) => {
  try {
    const { milestone, cluster, status, search } = req.query;

    const where = {};
    if (milestone) where.milestone = { code: milestone };
    if (cluster) where.cluster = { name: cluster };
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { id: { contains: search } },
        { title: { contains: search } },
        { description: { contains: search } }
      ];
    }

    const packages = await prisma.workPackage.findMany({
      where,
      include: {
        milestone: true,
        cluster: true,
        deliverables: true,
        acceptanceCriteria: true,
        requirements: {
          include: {
            requirement: true
          }
        }
      },
      orderBy: { id: 'asc' }
    });

    res.json({
      count: packages.length,
      data: packages
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/packages/:id - Get single work package
app.get('/api/packages/:id', async (req, res) => {
  try {
    const pkg = await prisma.workPackage.findUnique({
      where: { id: req.params.id },
      include: {
        milestone: true,
        cluster: true,
        deliverables: true,
        acceptanceCriteria: true,
        requirements: {
          include: {
            requirement: true
          }
        },
        dependsOn: {
          include: {
            toPackage: true
          }
        },
        dependencyFor: {
          include: {
            fromPackage: true
          }
        }
      }
    });

    if (!pkg) {
      return res.status(404).json({ error: 'Package not found' });
    }

    res.json(pkg);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/packages - Create work package
app.post('/api/packages', async (req, res) => {
  try {
    const { id, title, description, storyPoints, milestoneId, clusterId, deliverables, acceptanceCriteria } = req.body;

    const pkg = await prisma.workPackage.create({
      data: {
        id,
        title,
        description,
        storyPoints,
        milestoneId,
        clusterId,
        deliverables: deliverables ? {
          create: deliverables.map(d => ({ description: d }))
        } : undefined,
        acceptanceCriteria: acceptanceCriteria ? {
          create: acceptanceCriteria.map(c => ({ criterion: c }))
        } : undefined
      },
      include: {
        milestone: true,
        cluster: true,
        deliverables: true,
        acceptanceCriteria: true
      }
    });

    res.status(201).json(pkg);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PATCH /api/packages/:id - Update work package
app.patch('/api/packages/:id', async (req, res) => {
  try {
    const { title, description, storyPoints, status, milestoneId, clusterId } = req.body;

    const pkg = await prisma.workPackage.update({
      where: { id: req.params.id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(storyPoints && { storyPoints }),
        ...(status && { status }),
        ...(milestoneId && { milestoneId }),
        ...(clusterId && { clusterId })
      },
      include: {
        milestone: true,
        cluster: true,
        deliverables: true,
        acceptanceCriteria: true
      }
    });

    res.json(pkg);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/packages/:id - Delete work package
app.delete('/api/packages/:id', async (req, res) => {
  try {
    await prisma.workPackage.delete({
      where: { id: req.params.id }
    });

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ==================== REQUIREMENTS ====================

// GET /api/requirements - List all requirements
app.get('/api/requirements', async (req, res) => {
  try {
    const { category, type, priority, status, file, search, limit = 100, offset = 0 } = req.query;

    const where = {};
    if (category) where.category = category;
    if (type) where.requirementType = type;
    if (priority) where.priority = priority;
    if (status) where.status = status;
    if (file) where.filePath = { contains: file };
    if (search) {
      where.OR = [
        { id: { contains: search } },
        { title: { contains: search } },
        { description: { contains: search } }
      ];
    }

    const [total, requirements] = await Promise.all([
      prisma.requirement.count({ where }),
      prisma.requirement.findMany({
        where,
        include: {
          packages: {
            include: {
              package: true
            }
          }
        },
        take: parseInt(limit),
        skip: parseInt(offset),
        orderBy: { id: 'asc' }
      })
    ]);

    res.json({
      total,
      limit: parseInt(limit),
      offset: parseInt(offset),
      data: requirements
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/requirements/:id - Get single requirement
app.get('/api/requirements/:id', async (req, res) => {
  try {
    const requirement = await prisma.requirement.findUnique({
      where: { id: req.params.id },
      include: {
        packages: {
          include: {
            package: {
              include: {
                milestone: true,
                cluster: true
              }
            }
          }
        }
      }
    });

    if (!requirement) {
      return res.status(404).json({ error: 'Requirement not found' });
    }

    res.json(requirement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/requirements - Create requirement
app.post('/api/requirements', async (req, res) => {
  try {
    const { id, title, description, category, requirementType, filePath, section, headingPath, lineNumber, priority } = req.body;

    const requirement = await prisma.requirement.create({
      data: {
        id,
        title,
        description,
        category,
        requirementType,
        filePath,
        section,
        headingPath,
        lineNumber,
        priority
      }
    });

    res.status(201).json(requirement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PATCH /api/requirements/:id - Update requirement
app.patch('/api/requirements/:id', async (req, res) => {
  try {
    const { title, description, priority, status } = req.body;

    const requirement = await prisma.requirement.update({
      where: { id: req.params.id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(priority && { priority }),
        ...(status && { status })
      }
    });

    res.json(requirement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/requirements/:id - Delete requirement
app.delete('/api/requirements/:id', async (req, res) => {
  try {
    await prisma.requirement.delete({
      where: { id: req.params.id }
    });

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ==================== MAPPINGS ====================

// GET /api/mappings - List all package-requirement mappings
app.get('/api/mappings', async (req, res) => {
  try {
    const { packageId, requirementId, status, relevance, minConfidence } = req.query;

    const where = {};
    if (packageId) where.packageId = packageId;
    if (requirementId) where.requirementId = requirementId;
    if (status) where.status = status;
    if (relevance) where.relevance = relevance;
    if (minConfidence) where.confidence = { gte: parseFloat(minConfidence) };

    const mappings = await prisma.packageRequirement.findMany({
      where,
      include: {
        package: {
          include: {
            milestone: true,
            cluster: true
          }
        },
        requirement: true
      },
      orderBy: [
        { confidence: 'desc' },
        { packageId: 'asc' }
      ]
    });

    res.json({
      count: mappings.length,
      data: mappings
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/mappings - Create mapping
app.post('/api/mappings', async (req, res) => {
  try {
    const { packageId, requirementId, relevance, status, confidence, notes } = req.body;

    const mapping = await prisma.packageRequirement.create({
      data: {
        packageId,
        requirementId,
        relevance,
        status: status || 'suggested',
        confidence,
        notes
      },
      include: {
        package: true,
        requirement: true
      }
    });

    res.status(201).json(mapping);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PATCH /api/mappings/:packageId/:requirementId - Update mapping
app.patch('/api/mappings/:packageId/:requirementId', async (req, res) => {
  try {
    const { packageId, requirementId } = req.params;
    const { relevance, status, confidence, notes } = req.body;

    const mapping = await prisma.packageRequirement.update({
      where: {
        packageId_requirementId: {
          packageId,
          requirementId
        }
      },
      data: {
        ...(relevance && { relevance }),
        ...(status && { status }),
        ...(confidence !== undefined && { confidence }),
        ...(notes !== undefined && { notes })
      },
      include: {
        package: true,
        requirement: true
      }
    });

    res.json(mapping);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/mappings/:packageId/:requirementId - Delete mapping
app.delete('/api/mappings/:packageId/:requirementId', async (req, res) => {
  try {
    const { packageId, requirementId } = req.params;

    await prisma.packageRequirement.delete({
      where: {
        packageId_requirementId: {
          packageId,
          requirementId
        }
      }
    });

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST /api/mappings/bulk-update - Bulk update mappings
app.post('/api/mappings/bulk-update', async (req, res) => {
  try {
    const { updates } = req.body;

    if (!Array.isArray(updates)) {
      return res.status(400).json({ error: 'updates must be an array' });
    }

    const results = await Promise.all(
      updates.map(({ packageId, requirementId, relevance, status, notes }) =>
        prisma.packageRequirement.update({
          where: {
            packageId_requirementId: {
              packageId,
              requirementId
            }
          },
          data: {
            ...(relevance && { relevance }),
            ...(status && { status }),
            ...(notes !== undefined && { notes })
          }
        })
      )
    );

    res.json({
      updated: results.length,
      data: results
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ==================== MILESTONES & CLUSTERS ====================

// GET /api/milestones - List all milestones
app.get('/api/milestones', async (req, res) => {
  try {
    const milestones = await prisma.milestone.findMany({
      include: {
        packages: true
      },
      orderBy: { code: 'asc' }
    });

    res.json({
      count: milestones.length,
      data: milestones
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/clusters - List all clusters
app.get('/api/clusters', async (req, res) => {
  try {
    const clusters = await prisma.cluster.findMany({
      include: {
        packages: true
      },
      orderBy: { name: 'asc' }
    });

    res.json({
      count: clusters.length,
      data: clusters
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== STATISTICS & REPORTS ====================

// GET /api/stats - Get database statistics
app.get('/api/stats', async (req, res) => {
  try {
    const stats = await getStatistics();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/stats/coverage - Get requirements coverage by package
app.get('/api/stats/coverage', async (req, res) => {
  try {
    const packages = await prisma.workPackage.findMany({
      include: {
        requirements: {
          where: {
            status: 'confirmed'
          }
        },
        milestone: true,
        cluster: true
      },
      orderBy: { id: 'asc' }
    });

    const coverage = packages.map(pkg => ({
      packageId: pkg.id,
      title: pkg.title,
      milestone: pkg.milestone.code,
      cluster: pkg.cluster.name,
      confirmedRequirements: pkg.requirements.length,
      storyPoints: pkg.storyPoints
    }));

    const summary = {
      totalPackages: packages.length,
      packagesWithRequirements: coverage.filter(c => c.confirmedRequirements > 0).length,
      packagesWithoutRequirements: coverage.filter(c => c.confirmedRequirements === 0).length,
      averageRequirementsPerPackage: (coverage.reduce((sum, c) => sum + c.confirmedRequirements, 0) / packages.length).toFixed(2)
    };

    res.json({
      summary,
      coverage
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/stats/requirements-by-file - Get requirements grouped by source file
app.get('/api/stats/requirements-by-file', async (req, res) => {
  try {
    const requirements = await prisma.requirement.groupBy({
      by: ['filePath', 'category'],
      _count: true,
      orderBy: {
        _count: {
          filePath: 'desc'
        }
      }
    });

    const byFile = requirements.reduce((acc, r) => {
      const fileName = r.filePath.split('/').pop();
      if (!acc[fileName]) {
        acc[fileName] = {
          filePath: r.filePath,
          functional: 0,
          nonFunctional: 0,
          total: 0
        };
      }
      if (r.category === 'Funktional') {
        acc[fileName].functional += r._count;
      } else {
        acc[fileName].nonFunctional += r._count;
      }
      acc[fileName].total += r._count;
      return acc;
    }, {});

    res.json({
      files: Object.values(byFile).sort((a, b) => b.total - a.total)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== HELPER FUNCTIONS ====================

async function getStatistics() {
  const [
    workPackages,
    requirements,
    mappings,
    confirmedMappings,
    milestones,
    clusters
  ] = await Promise.all([
    prisma.workPackage.count(),
    prisma.requirement.count(),
    prisma.packageRequirement.count(),
    prisma.packageRequirement.count({ where: { status: 'confirmed' } }),
    prisma.milestone.count(),
    prisma.cluster.count()
  ]);

  return {
    workPackages,
    requirements,
    mappings: {
      total: mappings,
      confirmed: confirmedMappings,
      suggested: mappings - confirmedMappings
    },
    milestones,
    clusters
  };
}

// ==================== ERROR HANDLING ====================

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ==================== SERVER START ====================

const server = app.listen(PORT, () => {
  console.log(`\n🚀 API Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📚 API Info: http://localhost:${PORT}/api/info\n`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('\nSIGINT received, shutting down gracefully...');
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
});
