import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-react";


export type ToastType = "success" | "error" | "warning" | "info";

export type ToastPosition =
    | "top-right"
    | "top-left"
    | "top-center"
    | "bottom-right"
    | "bottom-left"
    | "bottom-center";

export interface ToastOptions {
    type?: ToastType;
    title: string;
    description?: string;
    /** ms before auto-dismiss. Pass 0 to persist until manually closed. Default 4000. */
    duration?: number;
    position?: ToastPosition;
}

interface ToastRecord {
    id: string;
    type: ToastType;
    title: string;
    description?: string;
    duration: number;
    position: ToastPosition;
}



const TYPE_STYLES: Record<
    ToastType,
    { icon: typeof CheckCircle2; iconBg: string; iconColor: string; bar: string }
> = {
    success: { icon: CheckCircle2, iconBg: "bg-emerald-100", iconColor: "text-emerald-600", bar: "bg-emerald-500" },
    error: { icon: XCircle, iconBg: "bg-red-100", iconColor: "text-red-600", bar: "bg-red-500" },
    warning: { icon: AlertTriangle, iconBg: "bg-amber-100", iconColor: "text-amber-600", bar: "bg-amber-500" },
    info: { icon: Info, iconBg: "bg-sky-100", iconColor: "text-sky-600", bar: "bg-sky-500" },
};


export function Toast({ toast, onDismiss }: { toast: ToastRecord; onDismiss: () => void }): ReactNode {
    const [show, setShow] = useState(false);
    const [barShrunk, setBarShrunk] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const isTop = toast.position.startsWith("top");
    const isLeft = toast.position.endsWith("left");
    const isCenter = toast.position.endsWith("center");

    const handleClose = useCallback(() => {
        setShow(false);
        if (timerRef.current) clearTimeout(timerRef.current);
        setTimeout(onDismiss, 200);
    }, [onDismiss]);

    useEffect(() => {
        const showRaf = requestAnimationFrame(() => setShow(true));
        const barRaf = requestAnimationFrame(() => setBarShrunk(true));
        return () => {
            cancelAnimationFrame(showRaf);
            cancelAnimationFrame(barRaf);
        };
    }, []);

    useEffect(() => {
        if (toast.duration <= 0) return;
        timerRef.current = setTimeout(handleClose, toast.duration);
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [toast.duration, handleClose]);

    const enterTranslate = isCenter
        ? isTop
            ? "-translate-y-3"
            : "translate-y-3"
        : isLeft
            ? "-translate-x-3"
            : "translate-x-3";

    const { icon: Icon, iconBg, iconColor, bar } = TYPE_STYLES[toast.type];

    return (
        <div
            role="status"
            aria-live="polite"
            className={`pointer-events-auto w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-stone-200 bg-white shadow-lg transition-all duration-200 ease-out ${
                show
                    ? "translate-x-0 translate-y-0 scale-100 opacity-100"
                    : `scale-95 opacity-0 ${enterTranslate}`
            }`}
        >
            <div className="flex items-start gap-3 p-4">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${iconBg}`}>
                    <Icon size={17} className={iconColor} />
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-stone-900">{toast.title}</p>
                    {toast.description && (
                        <p className="mt-0.5 text-sm leading-snug text-stone-500">{toast.description}</p>
                    )}
                </div>
                <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Dismiss notification"
                    className="rounded-md p-1 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600"
                >
                    <X size={15} />
                </button>
            </div>
            {toast.duration > 0 && (
                <div className="h-1 w-full bg-stone-100">
                    <div
                        className={`h-full ${bar}`}
                        style={{
                            width: barShrunk ? "0%" : "100%",
                            transitionProperty: "width",
                            transitionTimingFunction: "linear",
                            transitionDuration: `${toast.duration}ms`,
                        }}
                    />
                </div>
            )}
        </div>
    );
}
