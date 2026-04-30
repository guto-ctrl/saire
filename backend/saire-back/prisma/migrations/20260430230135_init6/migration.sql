/*
  Warnings:

  - You are about to drop the column `nomeArquivo` on the `Checklist` table. All the data in the column will be lost.
  - You are about to drop the column `compressorId` on the `Etiqueta` table. All the data in the column will be lost.
  - You are about to drop the column `numeroSerie` on the `Etiqueta` table. All the data in the column will be lost.
  - You are about to drop the column `qrCodeUrl` on the `Etiqueta` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Checklist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "compressorId" INTEGER NOT NULL,
    "data" DATETIME,
    "montador" TEXT,
    "cliente" TEXT,
    "ficha" BIGINT,
    "modelo" TEXT,
    "serie" TEXT,
    "hp" REAL,
    "voltagem" TEXT,
    "amperagem1Sem" REAL,
    "amperagem2Sem" REAL,
    "amperagem3Sem" REAL,
    "amperagem1Com" REAL,
    "amperagem2Com" REAL,
    "amperagem3Com" REAL,
    "pressaoAltaA" REAL,
    "pressaoAltaB" REAL,
    "pressaoBaixaA" REAL,
    "pressaoBaixaB" REAL,
    "bobina" BOOLEAN NOT NULL DEFAULT false,
    "placa" BOOLEAN NOT NULL DEFAULT false,
    "pistao" BOOLEAN NOT NULL DEFAULT false,
    "biela" BOOLEAN NOT NULL DEFAULT false,
    "bucha" BOOLEAN NOT NULL DEFAULT false,
    "sisRetOleo" BOOLEAN NOT NULL DEFAULT false,
    "valRegPreOleo" BOOLEAN NOT NULL DEFAULT false,
    "valSeg37bar" BOOLEAN NOT NULL DEFAULT false,
    "testeVazamento" BOOLEAN NOT NULL DEFAULT false,
    "observacao" TEXT,
    "assinaturaMontador" TEXT,
    "assinaturaRevisor" TEXT,
    "url" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Checklist_compressorId_fkey" FOREIGN KEY ("compressorId") REFERENCES "Compressor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Checklist" ("compressorId", "createdAt", "data", "id", "montador", "observacao", "url") SELECT "compressorId", "createdAt", "data", "id", "montador", "observacao", "url" FROM "Checklist";
DROP TABLE "Checklist";
ALTER TABLE "new_Checklist" RENAME TO "Checklist";
CREATE INDEX "Checklist_compressorId_idx" ON "Checklist"("compressorId");
CREATE TABLE "new_Compressor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "modelo" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "voltagem" TEXT,
    "frequencia" INTEGER,
    "corrente" REAL,
    "correnteBloqueadoY" REAL,
    "correnteBloqueadoYY" REAL,
    "volumeDeslocamento" REAL,
    "rotacao" INTEGER
);
INSERT INTO "new_Compressor" ("corrente", "correnteBloqueadoY", "correnteBloqueadoYY", "createdAt", "frequencia", "id", "marca", "modelo", "rotacao", "voltagem", "volumeDeslocamento") SELECT "corrente", "correnteBloqueadoY", "correnteBloqueadoYY", "createdAt", "frequencia", "id", "marca", "modelo", "rotacao", "voltagem", "volumeDeslocamento" FROM "Compressor";
DROP TABLE "Compressor";
ALTER TABLE "new_Compressor" RENAME TO "Compressor";
CREATE TABLE "new_Etiqueta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "checklistId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Etiqueta_checklistId_fkey" FOREIGN KEY ("checklistId") REFERENCES "Checklist" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Etiqueta" ("checklistId", "createdAt", "id") SELECT "checklistId", "createdAt", "id" FROM "Etiqueta";
DROP TABLE "Etiqueta";
ALTER TABLE "new_Etiqueta" RENAME TO "Etiqueta";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
