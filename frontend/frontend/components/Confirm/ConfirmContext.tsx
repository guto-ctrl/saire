"use client";

import {
    createContext,
    useCallback,
    useContext,
    useRef,
    useState,
    type ReactNode,
} from "react";

interface ConfirmOptions {
    title?: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: "danger" | "warning" | "info";
}

interface ConfirmContextValue {
    confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextValue | null>(null);

interface PendingConfirm {
    options: ConfirmOptions;
    resolve: (value: boolean) => void;
}

export function ConfirmProvider({ children }: { children: ReactNode }) {
    const [pending, setPending] = useState<PendingConfirm | null>(null);
    const resolveRef = useRef<((value: boolean) => void) | null>(null);

    const confirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
        return new Promise((resolve) => {
            resolveRef.current = resolve;
            setPending({ options, resolve });
        });
    }, []);

    function handleResolve(value: boolean) {
        resolveRef.current?.(value);
        resolveRef.current = null;
        setPending(null);
    }

    return (
        <ConfirmContext.Provider value={{ confirm }}>
            {children}
            {pending && (
                <ConfirmDialog
                    options={pending.options}
                    onConfirm={() => handleResolve(true)}
                    onCancel={() => handleResolve(false)}
                />
            )}
        </ConfirmContext.Provider>
    );
}

export function useConfirm() {
    const ctx = useContext(ConfirmContext);
    if (!ctx) throw new Error("useConfirm must be used inside <ConfirmProvider>");
    return ctx.confirm;
}

/* ========================
   DIALOG COMPONENT
======================== */

import "./ConfirmModal.css";

const VARIANT_ICONS: Record<string, string> = {
    danger: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`,
    warning: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
    info: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
};

interface ConfirmDialogProps {
    options: ConfirmOptions;
    onConfirm: () => void;
    onCancel: () => void;
}

function ConfirmDialog({ options, onConfirm, onCancel }: ConfirmDialogProps) {
    const {
        title,
        message,
        confirmLabel = "Confirmar",
        cancelLabel = "Cancelar",
        variant = "danger",
    } = options;

    return (
        <div className="confirm-overlay" onClick={onCancel}>
            <div
                className={`confirm-dialog confirm-dialog--${variant}`}
                onClick={(e) => e.stopPropagation()}
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="confirm-title"
                aria-describedby="confirm-message"
            >
                {/* Ícone */}
                <div className={`confirm-icon-wrap confirm-icon-wrap--${variant}`}>
                    <span
                        className="confirm-icon"
                        dangerouslySetInnerHTML={{ __html: VARIANT_ICONS[variant] }}
                    />
                </div>

                {/* Texto */}
                <div className="confirm-body">
                    {title && (
                        <h3 id="confirm-title" className="confirm-title">
                            {title}
                        </h3>
                    )}
                    <p id="confirm-message" className="confirm-message">
                        {message}
                    </p>
                </div>

                {/* Botões */}
                <div className="confirm-actions">
                    <button
                        className="confirm-btn confirm-btn--cancel"
                        onClick={onCancel}
                        autoFocus
                    >
                        {cancelLabel}
                    </button>
                    <button
                        className={`confirm-btn confirm-btn--${variant}`}
                        onClick={onConfirm}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
