import {C} from "@/support/const";

export default function Technology() {
    const stack = [
        ["Neural / LLM", "Google Gemini / Anthropic Claude Sonnet", "Structured JSON output, instruction-following reliability, large context window"],
        ["Symbolic Engine", "Custom PHP MealService class", "Deterministic logic: lte, gte, eq, exclude, prioritize"],
        ["Backend", "Laravel 13 / PHP 8.3"],
        ["Database", "MySQL 8.0", "full audit trail (nutrition_rule_history), JSON rule metadata"],
        ["Verification", "HCPC Public Register", "HCPC number lookup of practitioners"],
        ["Frontend", "React, InertiaJS, Typescript, CSS, IntentUI, Tailwind CSS v4", "production-grade, lightweight"],
    ];

    return (
        <section id="technology" style={{ padding: "5rem 0", background: C.ivory }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
                <div className="sr" style={{ maxWidth: 768, marginBottom: "4rem" }}>
                    <div className="overline-text" style={{ color: C.forest, marginBottom: "1rem" }}>Under the hood</div>
                    <h2 className="section-xl display" style={{ color: C.charcoal, marginBottom: "1.25rem" }}>Built on <em style={{ fontStyle: "italic", color: C.forest }}>neurosymbolic</em> AI</h2>
                    <p style={{ fontSize: "clamp(1.05rem,1.5vw,1.25rem)", lineHeight: 1.75, fontWeight: 300, color: C.muted }}>Why formal safety guarantees require more than a well-crafted prompt — and how PlanDiet's architecture delivers them.</p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start", marginBottom: "4rem" }}>
                    <div className="sr-l">
                        <h3 className="display" style={{ fontSize: "1.75rem", color: C.charcoal, marginBottom: "1.25rem" }}>Why not just prompt the LLM to follow the rules?</h3>
                        <p style={{ fontSize: ".875rem", lineHeight: 1.7, fontWeight: 300, color: C.muted, marginBottom: "1rem" }}>Most nutrition AI apps inject rules into the prompt and hope the model complies. This works most of the time. But most of the time isn't sufficient for clinical use: if an LLM produces a meal with 48g of carbs 5% of the time, that's hundreds of unsafe plan events across thousands of users.</p>
                        <p style={{ fontSize: ".875rem", lineHeight: 1.7, fontWeight: 300, color: C.muted, marginBottom: "1rem" }}>PlanDiet's neurosymbolic architecture separates generation from verification. The LLM generates good meal ideas. A completely separate deterministic system evaluates every candidate using formal logic operators. Not probability. Logic.</p>
                        <p style={{ fontSize: ".875rem", lineHeight: 1.7, fontWeight: 300, color: C.muted }}>The result: the LLM's creativity is fully preserved while the symbolic engine's rigour guarantees safety. These operate at different layers — not a trade-off.</p>
                    </div>
                    <div className="sr-r" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <div style={{ padding: 20, borderRadius: "1rem", background: "#fef2f2", border: "1px solid #fecaca" }}>
                            <div className="overline-text" style={{ color: "#dc2626", marginBottom: 12 }}>Traditional (prompt-based)</div>
                            <div className="mono" style={{ fontSize: ".75rem", padding: 16, borderRadius: 12, background: "#fee2e2", color: "#991b1b", lineHeight: 1.8 }}>
                                System: "User has nut allergy. Avoid nuts.<br />
                                User diabetic. Keep carbs &lt;40g."<br /><br />
                                <span style={{ color: "#b91c1c" }}>→ LLM might generate almond milk oats<br />→ LLM might suggest 47g carbs pasta<br />→ No verification. No guarantee.</span>
                            </div>
                        </div>
                        <div style={{ padding: 20, borderRadius: "1rem", background: C.forestFaint, border: `1px solid ${C.forestPale}` }}>
                            <div className="overline-text" style={{ color: C.forest, marginBottom: 12 }}>PlanDiet (neurosymbolic)</div>
                            <div className="mono" style={{ fontSize: ".75rem", padding: 16, borderRadius: 12, background: C.forestPale, color: C.charcoal, lineHeight: 1.8 }}>
                                LLM: generate creative candidates<br />
                                <span style={{ color: C.mutedLight }}>(no rules in the prompt)</span><br /><br />
                                RuleEngine.evaluate(meal, rules):<br />
                                <span style={{ color: C.forest }}>{"  if meal.contains('nuts') → REJECT"}<br />
                                    {"  if meal.carbs_g > 40 → REJECT"}<br />
                → Formal logic. 100% reliable.</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
