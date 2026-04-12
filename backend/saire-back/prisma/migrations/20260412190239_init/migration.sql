-- CreateTable
CREATE TABLE "Refrigerador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "modelo" TEXT NOT NULL,
    "numeroSerie" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Especificacoes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "refrigeradorId" INTEGER NOT NULL,
    "voltagem" INTEGER,
    "frequencia" INTEGER,
    "corrente" REAL,
    "correnteBloqueadoY" REAL,
    "correnteBloqueadoYY" REAL,
    "volumeDeslocamento" REAL,
    "rotacao" INTEGER,
    CONSTRAINT "Especificacoes_refrigeradorId_fkey" FOREIGN KEY ("refrigeradorId") REFERENCES "Refrigerador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Documento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "refrigeradorId" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "nomeArquivo" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Documento_refrigeradorId_fkey" FOREIGN KEY ("refrigeradorId") REFERENCES "Refrigerador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Refrigerador_numeroSerie_key" ON "Refrigerador"("numeroSerie");

-- CreateIndex
CREATE UNIQUE INDEX "Especificacoes_refrigeradorId_key" ON "Especificacoes"("refrigeradorId");

-- CreateIndex
CREATE INDEX "Documento_refrigeradorId_idx" ON "Documento"("refrigeradorId");

-- CreateIndex
CREATE INDEX "Documento_tipo_idx" ON "Documento"("tipo");
