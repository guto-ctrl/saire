"use client";

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

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <h1>Novo Compressor</h1>
        </Modal>
    );
}