import React, {useState} from 'react';
import AdminPortalLayout from "@/layouts/Portals/AdminPortalLayout";
import {
    Crumb, diffStates, NutritionRuleHistory,
    NutritionRuleHistoryEntry,
    resolveChangedByLabel,
    resolveInitials,
    resolveRecordMeta, resolveRuleName
} from "@/types/types";
import {ChartNetwork, Clock, Hash, LayoutDashboard, User} from "lucide-react";
import AdminDashboardController from "@/actions/App/Http/Controllers/Analytics/Admin/AdminDashboardController";
import {formatDate} from "@/lib/utils";
import {Breadcrumbs} from "@/components/Menu/Breadcrumbs";
import {usePage} from "@inertiajs/react";

const ShowNutritionRuleHistoryPage = () => {
    const BREADCRUMBS: Crumb[] = [
        { label: "Dashboard", icon: LayoutDashboard, href: AdminDashboardController.url() },
        { label: "Nutrition Rule Audits", icon: ChartNetwork}
    ];

    const { nutritionRuleHistoryItem } = usePage().props

    const entry: NutritionRuleHistory =  nutritionRuleHistoryItem
    const [showUnchanged, setShowUnchanged] = useState(false);

    const rows = diffStates(entry.previous_state, entry.new_state);
    const changedRows = rows.filter((r) => r.status !== "unchanged");
    const unchangedRows = rows.filter((r) => r.status === "unchanged");
    const isInitial = entry.previous_state === null;
    const changedByLabel = resolveChangedByLabel(entry);
    const initials = resolveInitials(entry);


    return (
        <AdminPortalLayout>
            <Breadcrumbs items={BREADCRUMBS} />
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h2 className="font-serif text-3xl text-emerald-950 sm:text-4xl">
                        Nutrition Rule Change
                    </h2>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-emerald-700/80">
                        View changes made by practitioner on a nutrition rule
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-[260px_1fr]">
                {/* Left: meta */}
                <div className="space-y-5">
                    <div className="rounded-2xl border border-sage/10 bg-white p-5">
                        <div className="mb-3 text-[0.78rem] font-medium text-muted">Changed by</div>
                        <div className="mb-4 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-pale text-[0.75rem] font-medium text-sage">
                  {initials}
                </span>
                            <div>
                                <div className="text-[0.83rem] font-medium text-ink">{changedByLabel}</div>
                                <div className="flex items-center gap-1 text-[0.72rem] text-muted">
                                    <User size={10} /> Practitioner
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2.5 border-t border-sage/10 pt-4 text-[0.78rem]">
                            <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-muted">
                    <Clock size={12} /> Timestamp
                  </span>
                                <span className="text-right text-ink">{formatDate(entry.created_at)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-muted">
                    <Hash size={12} /> History ID
                  </span>
                                <span className="text-ink">{entry.id}</span>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-sage/10 bg-white p-5">
                        <div className="mb-2 text-[0.78rem] font-medium text-muted">Change reason</div>
                        <div className="text-[0.81rem] font-light leading-relaxed text-ink-text">
                            {entry.change_reason ?? <span className="text-muted">No reason was provided for this change.</span>}
                        </div>
                    </div>
                </div>

                {/* Right: diff */}
                <div className="rounded-2xl border border-sage/10 bg-white p-5">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="text-[0.78rem] font-medium text-muted">{isInitial ? "Initial values" : "Field changes"}</div>
                        {!isInitial && unchangedRows.length > 0 && (
                            <button onClick={() => setShowUnchanged((s) => !s)} className="text-[0.72rem] font-medium text-sage hover:underline">
                                {showUnchanged ? "Hide" : "Show"} {unchangedRows.length} unchanged field{unchangedRows.length === 1 ? "" : "s"}
                            </button>
                        )}
                    </div>

                    <div className="divide-y divide-sage/5">
                        {(showUnchanged ? rows : changedRows).map((row) => (
                            <div key={row.key} className="grid grid-cols-[110px_1fr] items-start gap-3 py-2.5 text-[0.8rem]">
                                <div className="pt-1 text-muted">{row.label}</div>
                                <div className="flex flex-wrap items-center gap-2">
                                    {row.status === "changed" && (
                                        <>
                                            <span className="rounded-md bg-danger/10 px-2 py-1 text-danger line-through decoration-danger/50">{row.prev}</span>
                                            <span className="text-muted">→</span>
                                            <span className="rounded-md bg-sage-pale px-2 py-1 font-medium text-sage">{row.next}</span>
                                        </>
                                    )}
                                    {row.status === "added" && <span className="rounded-md bg-sage-pale px-2 py-1 font-medium text-sage">{row.next}</span>}
                                    {row.status === "removed" && (
                                        <span className="rounded-md bg-danger/10 px-2 py-1 text-danger line-through decoration-danger/50">{row.prev}</span>
                                    )}
                                    {row.status === "unchanged" && <span className="rounded-md bg-cream px-2 py-1 text-ink-text">{row.next}</span>}
                                </div>
                            </div>
                        ))}

                        {changedRows.length === 0 && !showUnchanged && (
                            <div className="py-6 text-center text-[0.8rem] text-muted">No field-level changes recorded for this entry.</div>
                        )}
                    </div>
                </div>
            </div>
        </AdminPortalLayout>
    );
};

export default ShowNutritionRuleHistoryPage;
