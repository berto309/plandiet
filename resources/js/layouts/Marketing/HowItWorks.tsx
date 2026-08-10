import {C} from "@/support/const";

export default function HowItWorks() {
    const roles = [
        {
            icon: "⬡", color: "#d8b4fe", bg: "rgba(168,85,247,.2)", border: "rgba(168,85,247,.3)",
            role: "Platform Admin", name: "Dr. Amir Hassan",
            steps: [
                ["Builds evidence-based templates", "Creates the clinical baseline: T2DM carb limits, hypertension sodium ceilings — backed by NICE, ADA, and NHS guidelines."],
                ["Verifies practitioner credentials", "Reviews HCPC API results, checks uploaded documents, approves accounts. Only verified professionals can invite clients."],
                ["Monitors platform health", "Tracks aggregate metrics — zero hard-rule violations, template adoption, insurance expiry alerts."],
            ]
        },
        {
            icon: "◉", color: "#86efac", bg: "rgba(45,122,45,.25)", border: "rgba(134,239,172,.3)",
            role: "Practitioner", name: "Sarah Okonkwo, RD",
            cardBg: "rgba(45,122,45,.08)", cardBorder: "rgba(134,239,172,.15)",
            steps: [
                ["Registers and gets verified", "Submits HCPC number, uploads certificate and insurance, receives approval within 2 business days."],
                ["Onboards client clinically", "Enters conditions, medications, allergies from consultation notes. Sends secure invite."],
                ["Sets, tests and monitors rules", "Loads templates, personalises values, runs sandbox tests. Updates take effect within 60 seconds."],
                ["Informed consultations", "Arrives knowing Fatima averaged 1,380mg sodium, hit her fibre target, and rated salmon 5 stars."],
            ]
        },
        {
            icon: "●", color: "#93c5fd", bg: "rgba(59,130,246,.2)", border: "rgba(147,197,253,.3)",
            role: "Client", name: "Fatima Al-Hassan",
            cardBg: "rgba(59,130,246,.07)", cardBorder: "rgba(147,197,253,.15)",
            steps: [
                ["Joins via practitioner invite", "Clicks a secure 7-day invite link. Sets up in minutes — name, password, food preferences only."],
                ["Generates today's plan", "Taps Generate. Within 3 seconds: 4 personalised meals with macros, prep time, and plain-English explanations."],
                ["Swaps and rates", "Swaps any meal she doesn't want — replacements already rule-checked. Rates meals to improve future plans."],
                ["Richer consultations", "At her next appointment, Sarah already knows Fatima's sodium average and favourite meals. No food diary."],
            ]
        },
    ];

    return (
        <section id="how-it-works" style={{ padding: "5rem 0", background: C.charcoal }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
                <div className="sr" style={{ textAlign: "center", maxWidth: 768, margin: "0 auto 4rem" }}>
                    <div className="overline-text" style={{ color: "rgba(134,239,172,.5)", marginBottom: "1rem" }}>How it works</div>
                    <h2 className="section-xl display" style={{ color: "white", marginBottom: "1.25rem" }}>
                        From practitioner to plate, <em style={{ fontStyle: "italic", color: "rgba(134,239,172,.8)" }}>every step explained</em>
                    </h2>
                    <p style={{ fontSize: "clamp(1.05rem,1.5vw,1.25rem)", lineHeight: 1.75, fontWeight: 300, color: "rgba(255,255,255,.45)" }}>Three perspectives, one connected system.</p>
                </div>

                <div className="mb-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {roles.map(({ icon, color, bg, border, role, name, steps, cardBg, cardBorder }) => (
                        <div key={role} className="sr">
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.25rem" }}>
                                <div style={{ width: 36, height: 36, borderRadius: "50%", background: bg, border: `1px solid ${border}`, color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".875rem" }}>{icon}</div>
                                <div>
                                    <div style={{ fontSize: ".875rem", fontWeight: 500, color: "white" }}>{role}</div>
                                    <div style={{ fontSize: ".75rem", fontWeight: 300, color: "rgba(255,255,255,.35)" }}>{name}</div>
                                </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                {steps.map(([title, desc], i) => (
                                    <div key={title} style={{ padding: 16, borderRadius: 16, background: cardBg || "rgba(255,255,255,.04)", border: `1px solid ${cardBorder || "rgba(255,255,255,.07)"}` }}>
                                        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                                            <div style={{ width: 24, height: 24, borderRadius: "50%", background: cardBg ? "rgba(134,239,172,.2)" : "rgba(168,85,247,.3)", color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".7rem", fontWeight: "bold", flexShrink: 0, marginTop: 2 }}>{i + 1}</div>
                                            <div>
                                                <div style={{ fontSize: ".875rem", fontWeight: 500, color: "rgba(255,255,255,.85)", marginBottom: 4 }}>{title}</div>
                                                <div style={{ fontSize: ".75rem", fontWeight: 300, lineHeight: 1.6, color: "rgba(255,255,255,.45)" }}>{desc}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pipeline detail */}
                <div className="sr-scale" style={{ borderRadius: "1.5rem", padding: "2.5rem", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)" }}>
                    <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                        <div className="overline-text" style={{ color: "rgba(134,239,172,.5)", marginBottom: 8 }}>Inside the engine</div>
                        <h3 className="display" style={{ fontSize: "2rem", color: "white" }}>The neurosymbolic pipeline in detail</h3>
                    </div>
                    <div style={{marginBottom: "32px"}} className="grid md:grid-cols-5 gap-4 items-start mb-8">
                        {[
                            { icon: "📥", title: "Request received", desc: "Profile + preferences + active rules loaded from database", bg: "rgba(255,255,255,.05)", border: "rgba(255,255,255,.07)", titleColor: "rgba(255,255,255,.75)" },
                            null,
                            { icon: "🧠", title: "Neural layer", desc: "LLM generates 5 creative candidates per meal slot. Culturally varied, preference-matched. No rules in the prompt.", bg: "rgba(45,122,45,.1)", border: "rgba(134,239,172,.15)", titleColor: "#86efac" },
                            null,
                            { icon: "⚖️", title: "Symbolic layer", desc: "Rule engine filters hard constraints, scores soft rules by priority weight, selects best per slot, generates rationale.", bg: "rgba(251,191,36,.07)", border: "rgba(251,191,36,.15)", titleColor: "#fcd34d" },
                        ].map((item, i) => item === null
                            ? <div key={i} style={{ textAlign: "center", fontSize: "1.5rem", color: "rgba(255,255,255,.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>→</div>
                            : (
                                <div key={item.title} style={{ textAlign: "center", padding: 16, borderRadius: 16, background: item.bg, border: `1px solid ${item.border}` }}>
                                    <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>{item.icon}</div>
                                    <div style={{ fontSize: ".875rem", fontWeight: 500, color: item.titleColor, marginBottom: 6 }}>{item.title}</div>
                                    <div style={{ fontSize: ".75rem", fontWeight: 300, color: "rgba(255,255,255,.4)", lineHeight: 1.5 }}>{item.desc}</div>
                                </div>
                            )
                        )}
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                        {[
                            ["Hard rule filter (symbolic)", "Each candidate evaluated against all hard rules using formal logic operators: lte, gte, eq, exclude. Any violation → immediate rejection. 100% deterministic. No exceptions, ever."],
                            ["Soft rule scoring (symbolic)", "Surviving candidates scored by priority-weighted soft rules: fibre targets, GI preference, potassium boosts, cuisine bonus. Highest-scored meal per slot selected."],
                            ["Explainability trace (symbolic)", "For each selected meal: which rules it passed, why it beat alternatives, any near-misses within 10% of a hard limit. Client gets plain English. Practitioner gets full clinical trace."],
                        ].map(([title, desc]) => (
                            <div key={title} style={{ padding: 16, borderRadius: 16, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)" }}>
                                <div style={{ fontSize: ".875rem", fontWeight: 500, color: "rgba(255,255,255,.6)", marginBottom: 8 }}>{title}</div>
                                <div style={{ fontSize: ".75rem", fontWeight: 300, lineHeight: 1.6, color: "rgba(255,255,255,.35)" }}>{desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
