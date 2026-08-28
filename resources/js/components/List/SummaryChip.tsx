import React from 'react';
import {ConflictLevelEnum} from "@/types/enums";

const SummaryChip = ({
                         count, level, active, onClick,
                     }: { count: number; level: ConflictLevelEnum; active: boolean; onClick: () => void }) => {
    const styles: Record<ConflictLevelEnum, { base: string; active: string }> = {
        hard: { base: "border-red-200 text-red-600", active: "bg-red-50 border-red-300" },
        soft: { base: "border-amber-200 text-amber-600", active: "bg-amber-50 border-amber-300" },
        near: { base: "border-blue-200 text-blue-600", active: "bg-blue-50 border-blue-300" },
    };
    const labels = { hard: "Hard", soft: "Soft", near: "Near" };
    const s = styles[level];
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${s.base} ${active ? s.active : "bg-white hover:bg-gray-50"}`}
        >
            <span className="text-base font-semibold">{count}</span>
            <span>{labels[level]}</span>
        </button>
    );
}


export default SummaryChip;
