import React, {useState} from 'react';
import {ConflictLevelEnum, OperatorEnum} from "@/types/enums";
import {ConflictEntry} from "@/types/types";

const ConflictReportEntry = ({ entry, defaultOpen = false }: { entry: ConflictEntry; defaultOpen?: boolean }) => {
    const [open, setOpen] = useState(defaultOpen);
    const borderColors: Record<ConflictLevelEnum, string> = {
        hard: "border-red-200",
        soft: "border-amber-200",
        near: "border-blue-200",
    };

    const formatOp = (op: OperatorEnum, val?: number) => {
        const opLabels: Record<OperatorEnum, string> = {
            lte: `≤ ${val}`, gte: `≥ ${val}`, eq: `= ${val}`,
            exclude: "EXCLUDE", require: "REQUIRE", prioritize: "PRIORITIZE",
        };
        return opLabels[op] || op;
    };

    return (
        <div className={`border ${borderColors[entry.level]} rounded-xl overflow-hidden bg-white`}>
            <button
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-start gap-3 p-3.5 text-left hover:bg-gray-50/60 transition-colors"
            >
                <ConflictIcon level={entry.level} />
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-gray-900 leading-snug">
              {entry.type.replace(/_/g, " ").replace(/^\w/, c => c.toUpperCase())}
            </span>
                        <Badge level={entry.level} />
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{entry.message}</p>
                </div>
                <span className={`text-gray-400 text-xs transition-transform flex-shrink-0 mt-0.5 ${open ? "rotate-180" : ""}`}>▾</span>
            </button>

            {open && (
                <div className="border-t border-gray-100 p-3.5 space-y-3">
                    {/* Rule comparison grid */}
                    <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center">
                        <RulePill
                            label="Incoming rule"
                            value={`${entry.incoming_rule.nutrient}  ${formatOp(entry.incoming_rule.operator, entry.incoming_rule.value)}`}
                            sub={`${entry.incoming_rule.priority} priority`}
                        />
                        <div className="text-xs font-medium text-gray-400 text-center px-1">
                            {entry.level === "hard" ? "✕" : "vs"}
                        </div>
                        <RulePill
                            label="Conflicting rule"
                            value={`${entry.conflicting_rule.nutrient} ${formatOp(entry.conflicting_rule.operator, entry.conflicting_rule.value)}`}
                            sub={entry.conflicting_rule.label ? `${entry.conflicting_rule.priority} · ${entry.conflicting_rule.label}` : entry.conflicting_rule.priority}
                        />
                    </div>

                    {/* Viable window bar for range conflicts */}
                    {entry.detail?.typical_range_pct !== undefined && (
                        <ViableWindow pct={entry.detail.typical_range_pct} level={entry.level} />
                    )}
                    {entry.type === "impossible_range" && (
                        <ViableWindow pct={0} level={ConflictLevelEnum.HARD} />
                    )}
                </div>
            )}
        </div>
    );
};

function ConflictIcon({ level }: { level: ConflictLevelEnum }) {
    const styles: Record<ConflictLevelEnum, { bg: string; color: string; icon: string }> = {
        hard: { bg: "bg-red-50",   color: "text-red-600",   icon: "✕" },
        soft: { bg: "bg-amber-50", color: "text-amber-600", icon: "!" },
        near: { bg: "bg-blue-50",  color: "text-blue-600",  icon: "i" },
    };
    const s = styles[level];
    return (
        <div className={`w-7 h-7 rounded-md ${s.bg} flex items-center justify-center flex-shrink-0`}>
            <span className={`text-xs font-bold ${s.color}`}>{s.icon}</span>
        </div>
    );
}

function Badge({ level }: { level: ConflictLevelEnum }) {
    const styles: Record<ConflictLevelEnum, string> = {
        hard: "bg-red-50 text-red-700 border border-red-200",
        soft: "bg-amber-50 text-amber-700 border border-amber-200",
        near: "bg-blue-50 text-blue-700 border border-blue-200",
    };
    const labels = { hard: "Hard", soft: "Soft", near: "Near" };
    return (
        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${styles[level]}`}>
      {labels[level]}
    </span>
    );
}

function RulePill({ label, value, sub }: { label: string; value: string; sub?: string }) {
    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 min-w-0">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1">{label}</div>
            <div className="text-sm font-medium text-gray-900 font-mono">{value}</div>
            {sub && <div className="text-[11px] text-gray-500 mt-0.5">{sub}</div>}
        </div>
    );
}

function ViableWindow({ pct, level }: { pct: number; level: ConflictLevelEnum }) {
    const colors: Record<ConflictLevelEnum, string> = {
        hard: "bg-red-500", soft: "bg-amber-500", near: "bg-blue-500",
    };
    const textColors: Record<ConflictLevelEnum, string> = {
        hard: "text-red-600", soft: "text-amber-600", near: "text-blue-600",
    };
    return (
        <div className="flex items-center gap-2 mt-3">
            <span className="text-[11px] text-gray-500 flex-shrink-0">Viable window</span>
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full border border-gray-200 overflow-hidden">
                <div className={`h-full rounded-full ${colors[level]}`} style={{ width: `${Math.max(pct, 0)}%` }} />
            </div>
            <span className={`text-[11px] font-medium ${textColors[level]} flex-shrink-0`}>
        {pct.toFixed(1)}%
      </span>
        </div>
    );
}
export default ConflictReportEntry;
