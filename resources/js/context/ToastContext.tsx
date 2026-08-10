import {createContext, type ReactNode, useCallback, useContext, useEffect, useRef, useState} from "react";
import {Toast, ToastOptions, ToastPosition, ToastType} from "@/components/Notifications/Toast";

const ToastContext = createContext<ToastContextValue | null>(null);

interface ToastRecord {
    id: string;
    type: ToastType;
    title: string;
    description?: string;
    duration: number;
    position: ToastPosition;
}

interface ToastContextValue {
    showToast: (options: ToastOptions) => string;
    dismissToast: (id: string) => void;
    success: (title: string, description?: string, options?: Partial<ToastOptions>) => string;
    error: (title: string, description?: string, options?: Partial<ToastOptions>) => string;
    warning: (title: string, description?: string, options?: Partial<ToastOptions>) => string;
    info: (title: string, description?: string, options?: Partial<ToastOptions>) => string;
}


const ALL_POSITIONS: ToastPosition[] = [
    "top-right",
    "top-left",
    "top-center",
    "bottom-right",
    "bottom-left",
    "bottom-center",
];

const POSITION_CLASSES: Record<ToastPosition, string> = {
    "top-right": "top-4 right-4 items-end",
    "top-left": "top-4 left-4 items-start",
    "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
    "bottom-right": "bottom-4 right-4 items-end",
    "bottom-left": "bottom-4 left-4 items-start",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
};


export function useToast(): ToastContextValue {
    const ctx = useContext(ToastContext);
    if (!ctx) {
        throw new Error("useToast must be used within a <ToastProvider>");
    }
    return ctx;
}


export function ToastProvider({
                                  children,
                                  defaultPosition = "top-right",
                              }: {
    children: ReactNode;
    defaultPosition?: ToastPosition;
}): ReactNode {
    const [toasts, setToasts] = useState<ToastRecord[]>([]);

    const dismissToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const showToast = useCallback(
        (options: ToastOptions) => {
            const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
            const record: ToastRecord = {
                id,
                type: options.type ?? "info",
                title: options.title,
                description: options.description,
                duration: options.duration ?? 4000,
                position: options.position ?? defaultPosition,
            };
            setToasts((prev) => [...prev, record]);
            return id;
        },
        [defaultPosition]
    );

    const success = useCallback(
        (title: string, description?: string, options?: Partial<ToastOptions>) =>
            showToast({ type: "success", title, description, ...options }),
        [showToast]
    );
    const error = useCallback(
        (title: string, description?: string, options?: Partial<ToastOptions>) =>
            showToast({ type: "error", title, description, ...options }),
        [showToast]
    );
    const warning = useCallback(
        (title: string, description?: string, options?: Partial<ToastOptions>) =>
            showToast({ type: "warning", title, description, ...options }),
        [showToast]
    );
    const info = useCallback(
        (title: string, description?: string, options?: Partial<ToastOptions>) =>
            showToast({ type: "info", title, description, ...options }),
        [showToast]
    );

    const value: ToastContextValue = { showToast, dismissToast, success, error, warning, info };

    return (
        <ToastContext.Provider value={value}>
            {children}
            {ALL_POSITIONS.map((pos) => {
                const items = toasts.filter((t) => t.position === pos);
                if (items.length === 0) return null;
                const isBottom = pos.startsWith("bottom");
                return (
                    <div
                        key={pos}
                        className={`pointer-events-none fixed z-[100] flex w-full max-w-[calc(100vw-2rem)] gap-3 sm:w-auto ${
                            isBottom ? "flex-col-reverse" : "flex-col"
                        } ${POSITION_CLASSES[pos]}`}
                    >
                        {items.map((toast) => (
                            <Toast key={toast.id} toast={toast} onDismiss={() => dismissToast(toast.id)} />
                        ))}
                    </div>
                );
            })}
        </ToastContext.Provider>
    );
}
