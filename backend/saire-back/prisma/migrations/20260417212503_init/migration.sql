/*
  Warnings:

  - You are about to drop the `Documento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Especificacoes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Refrigerador` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `refrigeradorId` on the `Etiqueta` table. All the data in the column will be lost.
  - Added the required column `checklistId` to the `Etiqueta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `compressorId` to the `Etiqueta` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Documento_tipo_idx";

-- DropIndex
DROP INDEX "Documento_refrigeradorId_idx";

-- DropIndex
DROP INDEX "Especificacoes_refrigeradorId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Documento";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Especificacoes";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Refrigerador";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Compressor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "modelo" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "voltagem" INTEGER,
    "frequencia" INTEGER,
    "corrente" REAL,
    "correnteBloqueadoY" REAL,
    "correnteBloqueadoYY" REAL,
    "volumeDeslocamento" REAL,
    "rotacao" INTEGER
);

-- CreateTable
CREATE TABLE "Checklist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "compressorId" INTEGER NOT NULL,
    "montador" TEXT,
    "data" DATETIME,
    "observacao" TEXT,
    "url" TEXT,
    "nomeArquivo" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Checklist_compressorId_fkey" FOREIGN KEY ("compressorId") REFERENCES "Compressor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Etiqueta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "compressorId" INTEGER NOT NULL,
    "checklistId" INTEGER NOT NULL,
    "numeroSerie" TEXT NOT NULL,
    "qrCodeUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Etiqueta_compressorId_fkey" FOREIGN KEY ("compressorId") REFERENCES "Compressor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Etiqueta_checklistId_fkey" FOREIGN KEY ("checklistId") REFERENCES "Checklist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Etiqueta" ("createdAt", "id", "numeroSerie", "qrCodeUrl") SELECT "createdAt", "id", "numeroSerie", "qrCodeUrl" FROM "Etiqueta";
DROP TABLE "Etiqueta";
ALTER TABLE "new_Etiqueta" RENAME TO "Etiqueta";
CREATE UNIQUE INDEX "Etiqueta_numeroSerie_key" ON "Etiqueta"("numeroSerie");
CREATE INDEX "Etiqueta_compressorId_idx" ON "Etiqueta"("compressorId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "Checklist_compressorId_idx" ON "Checklist"("compressorId");
