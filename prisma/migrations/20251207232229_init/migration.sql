-- CreateTable
CREATE TABLE "milestones" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "clusters" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "work_packages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "storyPoints" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "milestoneId" INTEGER NOT NULL,
    "clusterId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "work_packages_milestoneId_fkey" FOREIGN KEY ("milestoneId") REFERENCES "milestones" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "work_packages_clusterId_fkey" FOREIGN KEY ("clusterId") REFERENCES "clusters" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "deliverables" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "packageId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "deliverables_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "work_packages" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "acceptance_criteria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "packageId" TEXT NOT NULL,
    "criterion" TEXT NOT NULL,
    CONSTRAINT "acceptance_criteria_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "work_packages" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "dependencies" (
    "fromPackageId" TEXT NOT NULL,
    "toPackageId" TEXT NOT NULL,

    PRIMARY KEY ("fromPackageId", "toPackageId"),
    CONSTRAINT "dependencies_fromPackageId_fkey" FOREIGN KEY ("fromPackageId") REFERENCES "work_packages" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "dependencies_toPackageId_fkey" FOREIGN KEY ("toPackageId") REFERENCES "work_packages" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "requirements" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "sourceFile" TEXT,
    "priority" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "package_requirements" (
    "packageId" TEXT NOT NULL,
    "requirementId" TEXT NOT NULL,
    "relevance" TEXT,
    "notes" TEXT,

    PRIMARY KEY ("packageId", "requirementId"),
    CONSTRAINT "package_requirements_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "work_packages" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "package_requirements_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "requirements" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "milestones_code_key" ON "milestones"("code");

-- CreateIndex
CREATE UNIQUE INDEX "clusters_name_key" ON "clusters"("name");

-- CreateIndex
CREATE INDEX "work_packages_milestoneId_idx" ON "work_packages"("milestoneId");

-- CreateIndex
CREATE INDEX "work_packages_clusterId_idx" ON "work_packages"("clusterId");

-- CreateIndex
CREATE INDEX "work_packages_status_idx" ON "work_packages"("status");

-- CreateIndex
CREATE INDEX "deliverables_packageId_idx" ON "deliverables"("packageId");

-- CreateIndex
CREATE INDEX "acceptance_criteria_packageId_idx" ON "acceptance_criteria"("packageId");

-- CreateIndex
CREATE INDEX "dependencies_toPackageId_idx" ON "dependencies"("toPackageId");

-- CreateIndex
CREATE INDEX "requirements_category_idx" ON "requirements"("category");

-- CreateIndex
CREATE INDEX "requirements_priority_idx" ON "requirements"("priority");

-- CreateIndex
CREATE INDEX "package_requirements_requirementId_idx" ON "package_requirements"("requirementId");
