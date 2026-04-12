-- CreateTable
CREATE TABLE "Etiqueta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "refrigeradorId" INTEGER NOT NULL,
    "numeroSerie" TEXT NOT NULL,
    "qrCodeUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Etiqueta_refrigeradorId_fkey" FOREIGN KEY ("refrigeradorId") REFERENCES "Refrigerador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Etiqueta_refrigeradorId_idx" ON "Etiqueta"("refrigeradorId");
