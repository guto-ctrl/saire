"use client";

import { useState } from "react";

import Header from "../components/Header/Header";
import { NewCompressorModal } from "../modals/NewCompressorModal/NewCompressor";
import { SelectCompressorModal } from "../modals/SelectCompressorModal/SelectCompressorModal";
import { EditCompressorModal } from "../modals/EditCompressorModal/EditCompressorModal";

import BitzerLabel from "../components/Labels/BitzerLabel";
import { Compressor } from "../models/Compressor";
import { usePrintLabel } from "../hooks/usePrintLabel";

// Dimensões físicas do rótulo térmico em milímetros
const LABEL_WIDTH_MM  = 100;
const LABEL_HEIGHT_MM = 40;

export default function Home() {
  const [isNewModalOpen, setIsNewModalOpen] =
    useState(false);

  const [isSelectModalOpen, setIsSelectModalOpen] =
    useState(false);

  const [editingId, setEditingId] =
    useState<number | null>(null);
  const [isEditOpen, setIsEditOpen] =
    useState(false);

  const [selectedCompressor, setSelectedCompressor] = useState<Compressor | null>(null);
  const [serialNumber, setSerialNumber] = useState("");

  const { printRef, print } = usePrintLabel({
    widthMm:  LABEL_WIDTH_MM,
    heightMm: LABEL_HEIGHT_MM,
  });

  return (

    <div className="container-main">
      <Header
        onOpenNewModal={() =>
          setIsNewModalOpen(true)
        }
        onOpenSelectModal={() =>
          setIsSelectModalOpen(true)
        }
      />

      <SelectCompressorModal
        isOpen={isSelectModalOpen}
        onClose={() => setIsSelectModalOpen(false)}
        onSelect={(c) => {
          setSelectedCompressor(c);
        }}
        onEdit={(c) => {
          setEditingId(c.compressorId);
          setIsEditOpen(true);
        }}
      />

      <EditCompressorModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        compressorId={editingId}
      />

      <NewCompressorModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
      />

      {selectedCompressor && (
        <div className="preview-section">
          <h2 className="preview-title">
            Pré-visualização da Etiqueta
          </h2>

          <div className="serial-group">
            <label htmlFor="serial-input" className="serial-label">
              Nº de Série para a impressão:
            </label>
            <input
              id="serial-input"
              type="text"
              placeholder="Digite o número de série..."
              value={serialNumber}
              className="serial-input"
              // O onChange captura o que é digitado e atualiza o estado instantaneamente
              onChange={(e) => setSerialNumber(e.target.value)}
            />
          </div>

          <div className="print-area">
            {/* printRef aponta apenas para a etiqueta — o hook usa esse HTML na janela de impressão */}
            <div ref={printRef}>
              <BitzerLabel
                compressor={selectedCompressor}
                serialNumber={serialNumber}
              />
            </div>
            <button
              className="btn-print"
              onClick={print}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" /><rect x="6" y="14" width="12" height="8" rx="1" /></svg>
              Imprimir Etiqueta
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
