/*
  Warnings:

  - You are about to drop the column `numeroSerie` on the `Refrigerador` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Refrigerador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "modelo" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Refrigerador" ("createdAt", "id", "modelo") SELECT "createdAt", "id", "modelo" FROM "Refrigerador";
DROP TABLE "Refrigerador";
ALTER TABLE "new_Refrigerador" RENAME TO "Refrigerador";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
