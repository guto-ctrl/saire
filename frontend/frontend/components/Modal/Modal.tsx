"use client";

import { ReactNode } from "react";

export interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode;
}

export function Modal({ isOpen, onClose, children }: BaseModalProps) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}

function ModalHeader({ children }: { children: React.ReactNode }) {
  return <div className="modal-header">{children}</div>;
}
Modal.Header = ModalHeader;

function ModalBody({ children }: { children: React.ReactNode }) {
  return <div className="modal-body">{children}</div>;
}
Modal.Body = ModalBody;

function ModalFooter({ children }: { children: React.ReactNode }) {
  return <div className="modal-footer">{children}</div>;
}
Modal.Footer = ModalFooter;