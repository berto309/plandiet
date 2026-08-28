import {C} from "@/support/const";

export default function Features() {

    const FEATURES = [
        { icon: "🧠", title: "Neurosymbolic AI Engine", body: "Two AI systems working in tandem: Claude generates creative, culturally relevant meal candidates; a deterministic rule engine validates every suggestion against clinical constraints before it reaches the client.", extra: <div className="mono" style={{ fontSize: ".7rem", padding: 12, borderRadius: 12, background: C.forestFaint, color: C.forest }}>LLM candidates → hard filter → scored → explained</div> },
        { icon: "🛡️", title: "Hard Constraint Enforcement", body: "Critical rules — allergen exclusions, condition-specific nutrient limits, medication-related dietary restrictions — are enforced as symbolic logic operators. The AI literally cannot produce a plan that violates them.", extra: (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {[["#f87171","CRITICAL: Allergen exclusion — non-negotiable, zero exceptions"],["#fbbf24","HARD: Clinical nutrient limits — enforced absolutely"],[C.forestLight,"SOFT: Preference boosts — influence ranking, not filtering"]].map(([c,t]) => (
                        <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: ".75rem", color: C.muted }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: c, flexShrink: 0 }} />{t}</div>
                    ))}
                </div>
            )},
        { icon: "💬", title: "Explainability on Every Meal", body: "Every recommendation includes a plain-English rationale tracing exactly which clinical rules validated it and why it ranked over alternatives.", extra: <div style={{ padding: 12, borderRadius: 12, borderLeft: "2px solid #d4ecd4", background: C.ivoryWarm, fontSize: ".875rem", color: C.muted, fontStyle: "italic" }}>"Chosen because: fits your 40g carb limit (22g used). Nut-free. Halal. High protein (22g) supports your 90g daily target."</div> },
        { icon: "✅", title: "Practitioner Verification", body: "Three-layer verification: HCPC register lookup, document upload review, and manual human review. Approval within 2-3 business days.", extra: (
                <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: ".75rem", color: C.muted }}>
                    {["HCPC API → real-time credential lookup with name match","Document review: certificate, insurance, photo ID","Human credentialing review → approval within 48h","Annual re-verification + expiry alerts"].map((s, i) => (
                        <div key={s} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}><span style={{ fontWeight: 600, color: C.forest }}>{i+1}.</span>{s}</div>
                    ))}
                </div>
            )},
        { icon: "📊", title: "Compliance Dashboard", body: "Practitioners get a real-time view of every client's nutritional adherence — average daily sodium, fibre intake, carbohydrate compliance, meal ratings, and swap patterns — all without asking clients to keep a food diary.", extra: (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[["Sodium compliance","87%",C.forestLight],["Fibre target","65%","#d97706"],["Hard rule adherence","100%",C.forest]].map(([label,val,color]) => (
                        <div key={label}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".75rem", color: C.muted, marginBottom: 4 }}><span>{label}</span><span style={{ fontWeight: 500, color }}>{val}</span></div>
                            <div style={{ height: 6, borderRadius: 999, background: C.ivoryDeep }}><div style={{ height: "100%", borderRadius: 999, background: color, width: val }} /></div>
                        </div>
                    ))}
                </div>
            )},
        { icon: "🧪", title: "Rule Sandbox", body: "Before publishing any rule change, practitioners test it against a client's real profile. The system shows exactly which candidate meals would pass or fail — with a before/after comparison — before a single live plan is affected.", extra: (
                <div style={{ padding: 12, borderRadius: 12, background: C.forestFaint, display: "flex", flexDirection: "column", gap: 6, fontSize: ".75rem" }}>
                    <div style={{ display: "flex", gap: 8, color: C.forest }}><span>✓</span>Greek yogurt · 22g carbs → Pass</div>
                    <div style={{ display: "flex", gap: 8, color: "#dc2626" }}><span>✗</span><span style={{ textDecoration: "line-through", opacity: .7 }}>Egusi soup · 640mg Na → Fail (draft rule)</span></div>
                    <div style={{ color: "#d97706" }}>⚠ 3/14 meals newly excluded — review before publishing</div>
                </div>
            )},
        { icon: "🌍", title: "Cultural Sensitivity", body: "Clients set cuisine preferences. The LLM generates meals that feel familiar and culturally relevant — West African, Mediterranean, South Asian, Middle Eastern — while clinical rules keep them safe.", extra: <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{["🫙 West African","🌿 Mediterranean","🍱 South Asian","🕌 Halal","✡ Kosher","🌱 Vegan"].map(t => <span key={t} className="pill" style={{ fontSize: ".7rem" }}>{t}</span>)}</div> },
        { icon: "📋", title: "Clinical Template Library", body: "Evidence-referenced rule templates covering the most common conditions, each backed by NHS, or specialist guidelines.", extra: <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{["T2DM · ADA 2024","Hypertension · NICE NG136","High Cholesterol · BHF","IBS · Monash 2023","CKD · KDIGO 2024"].map(t => <span key={t} className="pill-gold">{t}</span>)}</div> },
        { icon: "🔄", title: "Intelligent Meal Swaps", body: "When a client swaps a meal, the full neurosymbolic pipeline re-runs for just that slot — generating fresh alternatives already pre-validated against all clinical rules. Clients only ever see safe options.", extra: (
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {[["Lentil soup & wholegrain bread","340mg Na ✓"],["Jerk chicken salad (low-salt)","490mg Na ✓"]].map(([meal,stat]) => (
                        <div key={meal} style={{ display: "flex", alignItems: "center", gap: 8, padding: 8, borderRadius: 12, background: C.forestFaint, fontSize: ".75rem" }}>
                            <span style={{ flex: 1, color: C.muted }}>{meal}</span>
                            <span className="mono" style={{ color: C.forest }}>{stat}</span>
                        </div>
                    ))}
                </div>
            )},
    ];

    return (
        <section id="features" style={{ padding: "5rem 0", background: C.ivory }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
                <div className="sr" style={{ textAlign: "center", maxWidth: 768, margin: "0 auto 4rem" }}>
                    <div className="overline-text" style={{ color: C.forest, marginBottom: "1rem" }}>Platform features</div>
                    <h2 className="section-xl display" style={{ color: C.charcoal, marginBottom: "1.25rem" }}>
                        Everything your practice needs, <em style={{ fontStyle: "italic", color: C.forest }}>nothing it doesn't</em>
                    </h2>
                    <p style={{ fontSize: "clamp(1.05rem,1.5vw,1.25rem)", lineHeight: 1.75, fontWeight: 300, color: C.muted }}>Three roles. One platform. Clinical safety enforced at every layer.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
                    {FEATURES.map(({ icon, title, body, extra }, i) => (
                        <div key={title} className={`feat-card card-hover sr`} style={{ padding: "1.75rem", borderRadius: "1rem", border: "1px solid rgba(31,94,31,.08)", background: "white" }}>
                            <div style={{ width: 48, height: 48, borderRadius: 16, background: C.forestFaint, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", marginBottom: "1.25rem" }}>{icon}</div>
                            <h3 className="display" style={{ fontSize: "1.3rem", color: C.charcoal, fontWeight: 400, marginBottom: "0.75rem" }}>{title}</h3>
                            <p style={{ fontSize: ".875rem", lineHeight: 1.7, fontWeight: 300, color: C.muted, marginBottom: "1rem" }}>{body}</p>
                            {extra}
                        </div>
                    ))}
                </div>

                {/* Invite system wide card */}
                <div className="sr-scale grid lg:grid-cols-2 grid-cols-1 overflow-hidden rounded-2xl border border-[rgba(31,94,31,0.1)]"
                     style={{marginTop: "50px"}}>
                    <div style={{ padding: "2.5rem", background: C.forest }}>
                        <div className="overline-text" style={{ color: "rgba(216,244,216,.5)", marginBottom: "1rem" }}>Invite-only access</div>
                        <h3 className="display" style={{ fontSize: "2rem", color: "white", marginBottom: "1rem" }}>Every client linked to a <em style={{ fontStyle: "italic", color: "rgba(134,239,172,.85)" }}>verified clinician</em></h3>
                        <p style={{ fontSize: "1rem", lineHeight: 1.75, fontWeight: 300, color: "rgba(255,255,255,.6)", marginBottom: "1.5rem" }}>Clients don't sign up independently. They join via a secure, single-use invite link sent by their registered practitioner.</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            {[["✉️","Practitioner sends invite","Single-use signed token, expires in 7 days"],["🔐","Client registers with minimal friction","Name, password, food preferences only"],["🛡️","Rules activate immediately","First plan already governed by the practitioner's clinical rules"]].map(([icon,title,desc]) => (
                                <div key={title} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px", borderRadius: 12, background: "rgba(255,255,255,.08)" }}>
                                    <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{icon}</span>
                                    <div><div style={{ fontSize: ".875rem", fontWeight: 500, color: "rgba(255,255,255,.85)", marginBottom: 2 }}>{title}</div><div style={{ fontSize: ".75rem", fontWeight: 300, color: "rgba(255,255,255,.5)" }}>{desc}</div></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ padding: "2.5rem", background: "white" }}>
                        <div className="overline-text" style={{ color: C.forest, marginBottom: "1rem" }}>Full audit trail</div>
                        <h3 className="display" style={{ fontSize: "2rem", color: C.charcoal, marginBottom: "1rem" }}>Every rule change <em style={{ fontStyle: "italic", color: C.forest }}>documented forever</em></h3>
                        <p style={{ fontSize: "1rem", lineHeight: 1.75, fontWeight: 300, color: C.muted, marginBottom: "1.5rem" }}>Every rule update is logged: who changed it, when, previous value, new value, and a practitioner-entered reason.</p>
                        <div className="mono" style={{ fontSize: ".75rem", color: C.muted, display: "flex", flexDirection: "column", gap: 12 }}>
                            {[
                                { bg: C.forestFaint, border: C.forestLight, title: "sodium_mg: 600 → 550mg UPDATED", meta: "sarah@nhs.net · 01 May 2026 09:47", note: "\"Ramipril dose increase — tighter Na control\"" },
                            { bg: C.ivoryWarm, border: C.ivoryDeep, title: "fibre_g priority: medium → high", meta: "sarah@nhs.net · 18 Mar 2026 09:22" },
                            { bg: C.ivoryWarm, border: C.ivoryDeep, title: "4 rules from templates on enrolment", meta: "T2DM, Nut allergy ×2, Low GI · 10 Mar 2026" },
                                ].map(({ bg, border, title, meta, note }) => (
                                <div key={title} style={{ padding: 12, borderRadius: 12, background: bg, borderLeft: `2px solid ${border}` }}>
                            <div style={{ fontWeight: 500, color: C.charcoal, marginBottom: 4 }}>{title}</div>
                            <div>{meta}</div>
                            {note && <div style={{ fontStyle: "italic", marginTop: 4, color: C.mutedLight }}>{note}</div>}
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
</section>
    );
}
