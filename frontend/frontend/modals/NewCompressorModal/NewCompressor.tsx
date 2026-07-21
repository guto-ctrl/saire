"use client";
import { useState } from "react";
import { createCompressor } from "../../services/CompressorService";
import { CompressorForm } from "../../components/Compressor/CompressorForm";
import { useToast } from "../../components/Toast/ToastContext";

import {
    Modal,
    BaseModalProps
} from "../../components/Modal/Modal";

interface NewCompressorModalProps
    extends BaseModalProps {

}

export function NewCompressorModal({
    isOpen,
    onClose
}: NewCompressorModalProps) {

    const { toast } = useToast();

    const [form, setForm] = useState({
        modelo: "",
        marca: "",
        voltagemNacional: "",
        frequencia: "",
        corrente: "",
        correnteMotorY: "",
        correnteMotorYY: "",
        volumeDeslocamento: "",
        rotacao: "",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSave() {
        try {
            console.log(form);
            await createCompressor({
                modelo: form.modelo,
                marca: form.marca,
                voltagemNacional: form.voltagemNacional ? Number(form.voltagemNacional) : undefined,
                frequencia: form.frequencia ? Number(form.frequencia) : undefined,
                corrente: form.corrente ? Number(form.corrente) : undefined,
                correnteMotorY: form.correnteMotorY ? Number(form.correnteMotorY) : undefined,
                correnteMotorYY: form.correnteMotorYY ? Number(form.correnteMotorYY) : undefined,
                volumeDeslocamento: form.volumeDeslocamento ? Number(form.volumeDeslocamento) : undefined,
                rotacao: form.rotacao ? Number(form.rotacao) : undefined,
            });

            toast(`Compressor "${form.modelo}" cadastrado com sucesso!`, "success");

            // opcional: limpar form
            setForm({
                modelo: "",
                marca: "",
                voltagemNacional: "",
                frequencia: "",
                corrente: "",
                correnteMotorY: "",
                correnteMotorYY: "",
                volumeDeslocamento: "",
                rotacao: "",
            });


            // fecha modal
            onClose();

            // opcional: recarregar lista
            // await refreshCompressores();

        } catch (err) {
            console.error("Erro ao criar compressor:", err);
            toast("Erro ao cadastrar compressor. Tente novamente.", "error");
        }
    }


    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <Modal.Header>
                <h1>Novo Compressor</h1>
                <p>Preencha os dados abaixo para cadastrar um novo compressor no sistema</p>
            </Modal.Header>

            <Modal.Body>
                <CompressorForm
                    form={form}
                    onChange={setForm}
                />
            </Modal.Body>

            <Modal.Footer>
                <button type="button" onClick={onClose} className="button-cancel">
                    Cancelar
                </button>

                <button type="button" onClick={handleSave} className="button-save">
                    Salvar
                </button>
            </Modal.Footer>

        </Modal>
    );
}