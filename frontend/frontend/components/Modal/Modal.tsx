"use client";

import { ReactNode } from "react";

export interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode;
}

export function Modal({
    isOpen,
    onClose,
    children
}: BaseModalProps) {

    if (!isOpen) return null;

    return (
        <div className="modal">

            {/* Fundo escuro */}
            <div
                className="modal-background"
                onClick={onClose}
            />

            {/* Conteúdo */}
            <div className="modal-content">
                {children}
            </div>

        </div>
    );
}