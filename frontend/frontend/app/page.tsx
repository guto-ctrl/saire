"use client";

import { useState } from "react";

import Header from "../components/Header/Header";
import { NewCompressorModal } from "../modals/NewCompressorModal/NewCompressor";
import { SelectCompressorModal } from "../modals/SelectCompressorModal/SelectCompressorModal";
import { EditCompressorModal } from "../modals/EditCompressorModal/EditCompressorModal";

import BitzerLabel from "../components/Labels/BitzerLabel";
import { Compressor } from "../models/Compressor";


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

  const handlePrint = () => {
    window.print();
  };

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
        <div
          className="preview-section"
          style={{
            marginTop: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            width: "100%"
          }}
        >
          <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}>
            Pré-visualização da Etiqueta
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "5px", width: "300px" }}>
            <label htmlFor="serial-input" style={{ fontWeight: "500", color: "#555" }}>
              Nº de Série para a impressão:
            </label>
            <input
              id="serial-input"
              type="text"
              placeholder="Digite o número de série..."
              value={serialNumber}
              // O onChange captura o que é digitado e atualiza o estado instantaneamente
              onChange={(e) => setSerialNumber(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "16px",
                color: "#000"
              }}
            />
          </div>

          <div className="print-area">
            <BitzerLabel
              compressor={selectedCompressor}
              serialNumber={serialNumber}
            />
            <button
              onClick={handlePrint}
              style={{
                padding: "12px 24px",
                fontSize: "16px",
                fontWeight: "bold",
                backgroundColor: "#0070f3",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginTop: "20px"
              }}
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
