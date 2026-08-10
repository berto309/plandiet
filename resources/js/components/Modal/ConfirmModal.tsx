import { useEffect, useState } from "react";
import type { ComponentType, ReactNode } from "react";

export type IconType = ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;

export interface ConfirmModalConfig {
    title: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    danger?: boolean;
    processing: boolean;
    icon?: IconType;
    maxWidth?: 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
}

export interface ConfirmModalProps {
    /** Pass null to keep the modal closed. Any non-null value opens it. */
    config: ConfirmModalConfig | null;
    children?: ReactNode;
    onCancel: () => void;
    onConfirm: () => void;
}

/**
 * Generic confirm/alert dialog with an overlay fade and a scale + slide-up
 * panel transition. Reusable for any destructive or confirmation flow —
 * pass a new `config` object to open it with different copy.
 */
export default function ConfirmModal({ config, children, onCancel, onConfirm }: ConfirmModalProps): ReactNode {
    const [mounted, setMounted] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (config) {
            setMounted(true);
            const raf = requestAnimationFrame(() => setShow(true));
            return () => cancelAnimationFrame(raf);
        }
        setShow(false);
        const t = setTimeout(() => setMounted(false), 180);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [config]);

    useEffect(() => {
        function handleKey(e: KeyboardEvent) {
            if (e.key === "Escape") onCancel();
        }
        if (config) document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [config, onCancel]);

    if (!mounted || !config) return null;

    const Icon = config.icon;
    const danger = Boolean(config.danger);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className={`absolute inset-0 bg-stone-900/50 backdrop-blur-sm transition-opacity duration-200 ${
                    show ? "opacity-100" : "opacity-0"
                }`}
                onClick={onCancel}
            />
            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="confirm-modal-title"
                className={`relative w-full max-w-${config.maxWidth ?? 'sm'} rounded-2xl bg-white p-6 shadow-2xl transition-all duration-200 ease-out ${
                    show ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-95 opacity-0"
                }`}
            >
                {Icon && (
                    <div
                        className={`mb-4 flex h-11 w-11 items-center justify-center rounded-full ${
                            danger ? "bg-red-100" : "bg-emerald-100"
                        }`}
                    >
                        <Icon size={20} className={danger ? "text-red-600" : "text-emerald-700"} />
                    </div>
                )}
                <h3 id="confirm-modal-title" className="font-serif text-lg text-emerald-950 mb-4">
                    {config.title}
                </h3>

                {config.description ? <p className="mt-1.5 text-sm text-stone-500">{config.description}</p>
                : children }
                <div className="mt-6 flex justify-end gap-2.5">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-100"
                    >
                        {config.cancelLabel ?? "Cancel"}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={config.processing}
                        className={`rounded-full px-4 py-2 text-sm font-medium text-white transition-colors ${
                            danger ? "bg-red-600 hover:bg-red-700" : "bg-emerald-800 hover:bg-emerald-700"
                        }${
                            config.processing ? "opacity-75" : "opacity-100"
                        }`}
                    >
                        {config.confirmLabel ?? "Confirm"}
                    </button>
                </div>
            </div>
        </div>
    );
}
