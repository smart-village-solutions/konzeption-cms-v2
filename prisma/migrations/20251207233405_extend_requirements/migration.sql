/*
  Warnings:

  - You are about to drop the column `sourceFile` on the `requirements` table. All the data in the column will be lost.
  - Added the required column `filePath` to the `requirements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requirementType` to the `requirements` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_package_requirements" (
    "packageId" TEXT NOT NULL,
    "requirementId" TEXT NOT NULL,
    "relevance" TEXT,
    "status" TEXT NOT NULL DEFAULT 'suggested',
    "confidence" REAL,
    "notes" TEXT,

    PRIMARY KEY ("packageId", "requirementId"),
    CONSTRAINT "package_requirements_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "work_packages" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "package_requirements_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "requirements" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_package_requirements" ("notes", "packageId", "relevance", "requirementId") SELECT "notes", "packageId", "relevance", "requirementId" FROM "package_requirements";
DROP TABLE "package_requirements";
ALTER TABLE "new_package_requirements" RENAME TO "package_requirements";
CREATE INDEX "package_requirements_requirementId_idx" ON "package_requirements"("requirementId");
CREATE INDEX "package_requirements_status_idx" ON "package_requirements"("status");
CREATE INDEX "package_requirements_confidence_idx" ON "package_requirements"("confidence");
CREATE TABLE "new_requirements" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "requirementType" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "section" TEXT,
    "headingPath" TEXT,
    "lineNumber" INTEGER,
    "priority" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_requirements" ("category", "createdAt", "description", "id", "priority", "title", "updatedAt") SELECT "category", "createdAt", "description", "id", "priority", "title", "updatedAt" FROM "requirements";
DROP TABLE "requirements";
ALTER TABLE "new_requirements" RENAME TO "requirements";
CREATE INDEX "requirements_category_idx" ON "requirements"("category");
CREATE INDEX "requirements_requirementType_idx" ON "requirements"("requirementType");
CREATE INDEX "requirements_priority_idx" ON "requirements"("priority");
CREATE INDEX "requirements_status_idx" ON "requirements"("status");
CREATE INDEX "requirements_filePath_idx" ON "requirements"("filePath");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
