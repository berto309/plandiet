import React, {useState} from 'react';
import {ConflictReport} from "@/types/types";
import SummaryChip from "@/components/List/SummaryChip";
import {ConflictLevelEnum} from "@/types/enums";
import ConflictReportEntry from "@/components/List/ConflictReportEntry";

const ConflictReportCard = ({conflictReport} : {conflictReport: ConflictReport|null}) => {

    const [filterLevel, setFilterLevel] = useState<ConflictLevelEnum | "all">("all");

    const allConflicts = conflictReport
        ? [...conflictReport.hard, ...conflictReport.soft, ...conflictReport.near]
        : [];
    const visible = filterLevel === "all"
        ? allConflicts
        : allConflicts.filter(c => c.level === filterLevel);

    return (
        conflictReport && (
            <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-5">
                {/* Report header */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${conflictReport.has_hard_conflicts ? "bg-red-500" : conflictReport.has_soft_conflicts ? "bg-amber-500" : "bg-blue-400"}`} />
                        <span className="text-sm font-medium text-gray-900">Conflict report</span>
                    </div>
                    <span className="text-[11px] text-gray-400">{conflictReport.existing.length} rules checked</span>
                </div>

                {/* Banner */}
                {/*{conflictReport.has_hard_conflicts && (*/}
                {/*    <div className="mb-4 bg-red-50 border border-red-200 rounded-xl px-3.5 py-3">*/}
                {/*        <p className="text-xs font-semibold text-red-700 mb-0.5">Plan generation blocked</p>*/}
                {/*        <p className="text-xs text-red-600 leading-relaxed">*/}
                {/*            Hard conflicts must be resolved or force-overridden before this rule can be saved and generation resumes.*/}
                {/*        </p>*/}
                {/*    </div>*/}
                {/*)}*/}
                {/*{!conflictReport.has_hard_conflicts && conflictReport.has_soft_conflicts && (*/}
                {/*    <div className="mb-4 bg-amber-50 border border-amber-200 rounded-xl px-3.5 py-3">*/}
                {/*        <p className="text-xs font-semibold text-amber-700 mb-0.5">Generation allowed — narrow viable space</p>*/}
                {/*        <p className="text-xs text-amber-600 leading-relaxed">*/}
                {/*            Soft conflicts reduce meal variety but do not block generation. Consider relaxing constraints.*/}
                {/*        </p>*/}
                {/*    </div>*/}
                {/*)}*/}

                {/* Summary chips */}
                <div className="flex gap-2 mb-3 flex-wrap">
                    {conflictReport.hard.length > 0 && (
                        <SummaryChip count={conflictReport.hard.length} level={ConflictLevelEnum.HARD}
                                     active={filterLevel === ConflictLevelEnum.HARD}
                                     onClick={() => setFilterLevel(f => f === ConflictLevelEnum.HARD ? "all" : ConflictLevelEnum.HARD)} />
                    )}
                    {conflictReport.soft.length > 0 && (
                        <SummaryChip count={conflictReport.soft.length} level={ConflictLevelEnum.SOFT}
                                     active={filterLevel === ConflictLevelEnum.SOFT}
                                     onClick={() => setFilterLevel(f => f === ConflictLevelEnum.SOFT ? "all" : ConflictLevelEnum.SOFT)} />
                    )}
                    {conflictReport.near.length > 0 && (
                        <SummaryChip count={conflictReport.near.length} level={ConflictLevelEnum.NEAR}
                                     active={filterLevel === ConflictLevelEnum.NEAR}
                                     onClick={() => setFilterLevel(f => f === ConflictLevelEnum.NEAR ? "all" : ConflictLevelEnum.NEAR)} />
                    )}
                    {filterLevel !== "all" && (
                        <button onClick={() => setFilterLevel("all")}
                                className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1">
                            Show all
                        </button>
                    )}
                </div>

                {/* Conflict cards */}
                <div className="space-y-2">
                    {visible.map((entry, i) => (
                        <ConflictReportEntry key={i} entry={entry} defaultOpen={i === 0 && entry.level === ConflictLevelEnum.HARD} />
                    ))}
                </div>

                {/* Existing rule reference */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-2">Rules for this client</p>
                    <div className="space-y-1.5">
                        {conflictReport.existing.map(r => (
                            <div key={r.id} className="flex items-center justify-between text-xs text-gray-500 bg-gray-50 rounded-lg px-2.5 py-1.5">
                                <span className="font-mono">{r.nutrient} {r.operator === "lte" ? "≤" : r.operator === "gte" ? "≥" : r.operator} {r.value ?? ""}</span>
                                <span className="text-gray-400 text-[10px]">{r.priority}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    );
};

export default ConflictReportCard;
