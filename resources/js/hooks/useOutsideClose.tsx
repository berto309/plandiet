import {useEffect, useRef} from "react";

export function useOutsideClose(onClose: () => void) {
    const ref = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) onClose();
        }
        function handleKey(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        document.addEventListener("mousedown", handleClick);
        document.addEventListener("keydown", handleKey);
        return () => {
            document.removeEventListener("mousedown", handleClick);
            document.removeEventListener("keydown", handleKey);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return ref;
}
