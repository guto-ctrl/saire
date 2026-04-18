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
    CONSTRAINT "Etiqueta_checklistId_fkey" FOREIGN KEY ("checklistId") REFERENCES "Checklist" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Etiqueta" ("checklistId", "compressorId", "createdAt", "id", "numeroSerie", "qrCodeUrl") SELECT "checklistId", "compressorId", "createdAt", "id", "numeroSerie", "qrCodeUrl" FROM "Etiqueta";
DROP TABLE "Etiqueta";
ALTER TABLE "new_Etiqueta" RENAME TO "Etiqueta";
CREATE UNIQUE INDEX "Etiqueta_numeroSerie_key" ON "Etiqueta"("numeroSerie");
CREATE INDEX "Etiqueta_compressorId_idx" ON "Etiqueta"("compressorId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
