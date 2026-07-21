"use client";

import { useEffect, useState } from "react";
import { getCompressores, deleteCompressor } from "../../services/CompressorService";
import { Compressor } from "../../models/Compressor"
import { Modal, BaseModalProps } from "../../components/Modal/Modal";
import { useToast } from "../../components/Toast/ToastContext";
import { useConfirm } from "../../components/Confirm/ConfirmContext";

interface SelectCompressorModalProps extends BaseModalProps {
    onSelect: (compressor: Compressor) => void;
    onEdit: (compressor: Compressor) => void;
}

export function SelectCompressorModal({
    isOpen,
    onClose,
    onSelect,
    onEdit
}: SelectCompressorModalProps) {

    const { toast } = useToast();
    const confirm = useConfirm();

    const [compressores, setCompressores] = useState<Compressor[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (isOpen) {
            loadCompressores();
        }
    }, [isOpen]);

    async function loadCompressores() {
        const data = await getCompressores();
        setCompressores(data);
    }

    const filtered = compressores.filter((c) =>
        c.modelo.toLowerCase().includes(search.toLowerCase()) ||
        c.marca.toLowerCase().includes(search.toLowerCase())
    );

    function handleSelect(compressor: Compressor) {
        onSelect(compressor);
        onClose();
    }

    async function handleDelete(id: number) {

        const confirmed = await confirm({
            title: "Excluir compressor",
            message: "Deseja realmente excluir este compressor? Esta ação não pode ser desfeita.",
            confirmLabel: "Sim, excluir",
            cancelLabel: "Cancelar",
            variant: "danger",
        });

        if (!confirmed) return;

        try {

            await deleteCompressor(id);

            toast("Compressor excluído com sucesso!", "success");

            await loadCompressores();

        } catch (err) {

            console.error("Erro ao excluir compressor:", err);

            toast("Erro ao excluir compressor.", "error");
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>

            <Modal.Header>
                <h1>Selecionar Compressor</h1>

                <input
                    type="text"
                    placeholder="Buscar por modelo ou marca..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Modal.Header>

            <Modal.Body>
                <div className="list">
                    {filtered.map((c) => (
                        <div key={c.compressorId} className="item">

                            <div
                                className="item-info"
                                onClick={() => handleSelect(c)}
                            >
                                <strong>{c.modelo}</strong>
                                <span>{c.marca}</span>
                            </div>

                            <div className="item-actions">

                                <button
                                    className="btn-edit"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // console.log("Editar", c);
                                        onEdit(c);
                                    }}
                                >
                                    ✏️
                                    Editar
                                </button>

                                <button
                                    className="btn-delete"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // console.log("Excluir", c);
                                        handleDelete(c.compressorId);
                                    }}
                                >
                                    🗑
                                    Excluir
                                </button>

                            </div>

                        </div>
                    ))}
                </div>
            </Modal.Body>

            <Modal.Footer>
                <button type="button" onClick={onClose} className="button-cancel">
                    Cancelar
                </button>
            </Modal.Footer>

        </Modal>
    );
}