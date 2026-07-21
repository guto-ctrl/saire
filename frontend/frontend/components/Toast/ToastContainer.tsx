"use client";

import { useToast, type Toast, type ToastType } from "./ToastContext";
import "./Toast.css";

const ICONS: Record<ToastType, string> = {
    success: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`,
    error: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
    warning: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`,
    info: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
};

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
    return (
        <div className={`toast toast--${toast.type}`} role="alert" aria-live="polite">
            <span
                className="toast__icon"
                dangerouslySetInnerHTML={{ __html: ICONS[toast.type] }}
            />
            <span className="toast__message">{toast.message}</span>
            <button
                className="toast__close"
                onClick={onDismiss}
                aria-label="Fechar notificação"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                </svg>
            </button>
            {/* Progress bar */}
            <div className="toast__progress" />
        </div>
    );
}

export function ToastContainer() {
    const { toasts, dismiss } = useToast();

    return (
        <div className="toast-container" aria-label="Notificações">
            {toasts.map((t) => (
                <ToastItem key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
            ))}
        </div>
    );
}
