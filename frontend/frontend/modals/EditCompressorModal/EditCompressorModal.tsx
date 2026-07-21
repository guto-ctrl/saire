"use client";

import { useEffect, useState } from "react";
import {
  getCompressorById,
  updateCompressor
} from "../../services/CompressorService";

import { Modal, BaseModalProps } from "../../components/Modal/Modal";
import { CompressorForm, CompressorFormData } from "../../components/Compressor/CompressorForm";
import { useToast } from "../../components/Toast/ToastContext";

interface EditCompressorModalProps extends BaseModalProps {
  compressorId: number | null;
  onUpdated?: () => void;
}

export function EditCompressorModal({
  isOpen,
  onClose,
  compressorId,
  onUpdated
}: EditCompressorModalProps) {

  const { toast } = useToast();

  const [form, setForm] = useState<CompressorFormData>({
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

  useEffect(() => {
    if (!isOpen || !compressorId) return;

    async function load() {
      const data = await getCompressorById(compressorId);

      setForm({
        modelo: data.modelo ?? "",
        marca: data.marca ?? "",
        voltagemNacional: data.voltagemNacional?.toString() ?? "",
        frequencia: data.frequencia?.toString() ?? "",
        corrente: data.corrente?.toString() ?? "",
        correnteMotorY: data.correnteMotorY?.toString() ?? "",
        correnteMotorYY: data.correnteMotorYY?.toString() ?? "",
        volumeDeslocamento: data.volumeDeslocamento?.toString() ?? "",
        rotacao: data.rotacao?.toString() ?? "",
      });
    }

    load();
  }, [isOpen, compressorId]);

  async function handleUpdate() {
    if (!compressorId) return;

    try {
      await updateCompressor(compressorId, {
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

      toast(`Compressor "${form.modelo}" atualizado com sucesso!`, "success");
      onUpdated?.();
      onClose();
    } catch (err) {
      console.error("Erro ao atualizar compressor:", err);
      toast("Erro ao atualizar compressor. Tente novamente.", "error");
    }
  }

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>

      <Modal.Header>
        <h1>Editar Compressor</h1>
        <p>Atualize os dados do compressor</p>
      </Modal.Header>

      <Modal.Body>
        <CompressorForm
          form={form}
          onChange={setForm}
        />
      </Modal.Body>

      <Modal.Footer>
        <button onClick={onClose} className="button-cancel">
          Cancelar
        </button>

        <button onClick={handleUpdate} className="button-save">
          Salvar alterações
        </button>
      </Modal.Footer>

    </Modal>
  );
}