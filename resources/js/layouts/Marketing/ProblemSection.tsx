import {C} from "@/support/const";

export default function ProblemSection() {
    return (
        <section id="problem" style={{ padding: "5rem 0", background: C.ivoryWarm }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
                <div className="sr" style={{ maxWidth: 768, marginBottom: "4rem" }}>
                    <div className="overline-text" style={{ color: C.forest, marginBottom: "1rem" }}>The challenge</div>
                    <h2 className="section-xl display" style={{ color: C.charcoal, marginBottom: "1.5rem" }}>
                        AI nutrition tools have a fundamental <em style={{ fontStyle: "italic", color: C.forest }}>safety gap</em>
                    </h2>
                    <p style={{ fontSize: "clamp(1.05rem,1.5vw,1.25rem)", lineHeight: 1.75, fontWeight: 300, color: C.muted }}>
                        Large language models are generative, creative, and contextually aware — but they are probabilistic systems. They cannot guarantee that a meal plan is clinically safe for a specific patient.
                    </p>
                </div>

                <div style={{marginBottom: '60px'}} className="mb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { icon: "🚨", bg: "#fee2e2", title: "LLMs cannot enforce hard constraints", body: "Prompting an LLM to \"avoid nuts\" or \"keep carbs under 40g\" is a request, not a guarantee. The model may follow it 95% of the time — but for a patient managing anaphylaxis or diabetes, 95% is not sufficient. You need 100%, enforced by formal logic." },
                        { icon: "⚖️", bg: "#fef3c7", title: "No professional accountability structure", body: "Consumer nutrition apps allow any user to input any \"rule.\" There's no verification that the constraint is clinically appropriate, or that the person setting it holds a professional qualification. Clinical decisions need clinical authority behind them." },
                        { icon: "📊", bg: C.forestFaint, title: "No between-appointment visibility", body: "Dietitians rely on patient self-reporting between sessions — an unreliable, burdensome process. There's no clinical-grade data on whether meal recommendations are actually being followed between consultations." },
                    ].map(({ icon, bg, title, body }) => (
                        <div key={title} className="sr card-hover" style={{ padding: "1.5rem", borderRadius: "1rem", border: "1px solid rgba(31,94,31,.08)", background: "white" }}>
                            <div style={{ width: 44, height: 44, borderRadius: 12, background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", marginBottom: "1rem" }}>{icon}</div>
                            <h3 className="display" style={{ fontSize: "1.25rem", color: C.charcoal, marginBottom: "0.75rem" }}>{title}</h3>
                            <p style={{ fontSize: ".875rem", lineHeight: 1.7, fontWeight: 300, color: C.muted }}>{body}</p>
                        </div>
                    ))}
                </div>

                {/* Solution banner */}
                <div className="sr-scale grid md:grid-cols-2 overflow-hidden rounded-3xl bg-[#2B2B2B]">
                    <div style={{ padding: "2.5rem" }}>
                        <div className="overline-text" style={{ color: C.forestPale, marginBottom: "1rem" }}>PlanDiet's answer</div>
                        <h3 className="section-lg display" style={{ color: "white", marginBottom: "1rem" }}>
                            Neurosymbolic AI: creativity with <em style={{ fontStyle: "italic", color: "rgba(134,239,172,.8)" }}>formal guarantees</em>
                        </h3>
                        <p style={{ fontSize: "1rem", lineHeight: 1.75, fontWeight: 300, color: "rgba(255,255,255,.55)", marginBottom: "1.5rem" }}>
                            Two systems, one pipeline. The neural layer (LLM) generates creative, culturally relevant meal candidates. The symbolic layer (rule engine) validates every candidate against clinical constraints using deterministic logic — not probability.
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                            {[
                                "Hard constraints enforced by formal logic — never probabilistic",
                                "Only HCPC/AfN-verified practitioners can set clinical rules",
                                "Weekly compliance data generated automatically — no food diary required",
                                "Every meal explained in plain English — transparent, auditable AI",
                            ].map((text) => (
                                <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: C.forest, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2, color: "white", fontSize: ".7rem" }}>✓</div>
                                    <p style={{ fontSize: ".875rem", fontWeight: 500, color: "rgba(255,255,255,.75)" }}>{text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ padding: "2.5rem", display: "flex", alignItems: "center", justifyContent: "center", borderLeft: "1px solid rgba(255,255,255,.08)" }}>
                        <div style={{ width: "100%", maxWidth: 280 }}>
                            <div className="overline-text" style={{ color: "rgba(134,239,172,.5)", marginBottom: "1rem", textAlign: "center" }}>How it differs</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: 12, borderRadius: 12, background: "rgba(255,255,255,.05)" }}>
                                    <span style={{ flex: 1, fontSize: ".875rem", fontWeight: 500, color: "rgba(255,255,255,.65)" }}>Prompt-only AI safety</span>
                                    <span style={{ color: "#f87171", fontSize: ".8rem" }}>Probabilistic</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: 12, borderRadius: 12, background: "rgba(45,122,45,.12)", border: "1px solid rgba(134,239,172,.2)" }}>
                                    <span style={{ flex: 1, fontSize: ".875rem", fontWeight: 500, color: "rgba(255,255,255,.85)" }}>PlanDiet symbolic engine</span>
                                    <span style={{ color: "#86efac", fontSize: ".8rem" }}>Deterministic ✓</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
