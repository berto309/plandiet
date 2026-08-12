import { useState } from "react";
import {C} from "@/support/const";

const faqs = [
    {
        q: "Can any nutritionist join, or only UK-registered practitioners?",
        a: "PlanDiet currently supports HCPC and AfN which are regulators based in the UK."
    },
    {
        q: "What happens when rules from multiple conditions conflict?",
        a: "The rule engine detects conflicts and asks the practitioner to decide."
    },
    {
        q: "Does the client see the clinical rules governing their meals?",
        a: "Clients only see simplified explanations."
    }
];

export default function FAQ() {
    const FAQS = [
        ["Can any nutritionist join, or only UK-registered practitioners?", "PlanDiet currently supports HCPC (UK dietitians), AfN (UK nutritionists), AND (USA), DAA (Australia), Dietitians Canada, and CORU (Ireland). We verify against each country's professional register. For regions without a formal register, we accept a degree certificate plus employer letter, subject to additional manual review."],
        // ["What happens when rules from multiple conditions conflict?", "The rule engine includes automatic conflict detection. When a practitioner creates or updates a rule, the system checks for contradictions with existing rules and surfaces a warning with a suggested priority resolution. The practitioner makes the final clinical decision — the system never resolves conflicts automatically."],
        ["Does the client see the clinical rules governing their meals?", "No. Clients see a simplified summary (e.g. \"carb count\" and \"nut-free\") but not the raw clinical rule logic. This is by design: the rule language is clinical, not consumer-friendly, and showing limits directly could cause anxiety."],
        ["How quickly do rule changes take effect?", "Rule changes are hot-reloaded into the engine within 60 seconds of saving, using a TTL-based rule cache. No redeployment needed. The next time the affected client generates a plan, the updated rules are automatically in effect."],
        ["Is patient data shared with the AI provider?", "The LLM receives only anonymised nutritional parameters — max carbs per meal, target calories, cuisine preferences — never patient names, email addresses, or medical records. All personally identifiable data stays within our database. API calls contain the minimum information necessary for meal generation only."],
        // ["What happens if a practitioner's registration lapses?", "The system polls the HCPC register every 24 hours. If a practitioner's registration status changes to lapsed or suspended, their account is immediately suspended and their clients are notified in-app. Client meal plans continue to work, but no new clinical rules will be applied until the practitioner's account is restored."],
    ];
    const [open, setOpen] = useState<undefined | number>(undefined);

    return (
        <section id="faq" style={{ padding: "5rem 0", background: C.ivory }}>
            <div style={{ maxWidth: 768, margin: "0 auto", padding: "0 2rem" }}>
                <div className="sr" style={{ textAlign: "center", marginBottom: "3rem" }}>
                    <div className="overline-text" style={{ color: C.forest, marginBottom: "1rem" }}>FAQ</div>
                    <h2 className="section-xl display" style={{ color: C.charcoal }}>Common questions</h2>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {FAQS.map(([q, a], i) => (
                        <div key={i} className="sr" style={{ background: "white", borderRadius: "1rem", border: "1px solid rgba(31,94,31,.08)", overflow: "hidden" }}>
                            <button
                                onClick={() => setOpen(open === i ? undefined : i)}
                                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 1.5rem", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                            >
                                <span style={{ fontSize: ".875rem", fontWeight: 500, color: C.charcoal, flex: 1, paddingRight: 16 }}>{q}</span>
                                <span style={{ color: C.forest, fontSize: "1.1rem", transition: "transform .3s", transform: open === i ? "rotate(45deg)" : "none", flexShrink: 0 }}>+</span>
                            </button>
                            <div className={`acc-body${open === i ? " open" : ""}`}>
                                <div style={{ padding: "0 1.5rem 1.25rem" }}>
                                    <p style={{ fontSize: ".875rem", lineHeight: 1.7, fontWeight: 300, color: C.muted }}>{a}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
