"use client";

import {
    Modal,
    BaseModalProps
} from "../../components/Modal/Modal";

interface EditCompressorModalProps
    extends BaseModalProps {

}

export function EditCompressorModal({
    isOpen,
    onClose
}: EditCompressorModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <h1>Editar Compressor</h1>
        </Modal>
    )
}