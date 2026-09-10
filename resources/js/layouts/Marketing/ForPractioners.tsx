import {C} from "@/support/const";

export default function ForPractioners() {
    return (
        <section id="for-practitioners" style={{ padding: "5rem 0", background: C.ivoryWarm }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
                <div className="sr" style={{ textAlign: "center", maxWidth: 768, margin: "0 auto 4rem" }}>
                    <div className="overline-text" style={{ color: C.forest, marginBottom: "1rem" }}>For dietitians & nutritionists</div>
                    <h2 className="section-xl display" style={{ color: C.charcoal, marginBottom: "1.25rem" }}>
                         <em style={{ fontStyle: "italic", color: C.forest }}>Evidence-based templates</em> for the conditions you treat
                    </h2>
                    <p style={{ fontSize: "clamp(1.05rem,1.5vw,1.25rem)", lineHeight: 1.75, fontWeight: 300, color: C.muted }}>
                        Each template is built from NICE, ADA, NHS, or specialist guidelines. Load the template as a starting point, then adjust values to the specific clinical picture in front of you. The constraint values are yours to set — the template just gets you there faster.
                    </p>
                </div>

                <div className="mb-16 grid grid-cols-1  items-start gap-10">
                    <div className="sr-r">
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: "1.5rem" }}>
                            {[
                                ["🩸", "Type 2 Diabetes", "ADA 2024 · NHS · Diabetes UK"],
                                ["❤️", "Hypertension", "NICE NG136 · AHA 2024"],
                                ["🫀", "High Cholesterol", "NICE CG181 · BHF 2024"],
                                ["🚫", "Nut / Food Allergy", "Anaphylaxis UK · BSACI"],
                                ["🌿", "IBS · Low FODMAP", "Monash University 2023"],
                                ["💧", "CKD", "KDIGO 2024 · BRS"],
                            ].map(([icon, name, sources]) => (
                                <div key={name} className="card-hover" style={{ padding: 16, borderRadius: "1rem", border: "1px solid rgba(31,94,31,.08)", background: "white", textAlign: "center" }}>
                                    <div style={{ fontSize: "1.5rem", marginBottom: 6 }}>{icon}</div>
                                    <div style={{ fontSize: ".875rem", fontWeight: 600, color: C.charcoal, marginBottom: 2 }}>{name}</div>
                                    <div style={{ fontSize: ".7rem", fontWeight: 300, color: C.mutedLight }}>{sources}</div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                {/* Testimonials */}
                <div className="sr" style={{marginTop: "24px"}}>
                    <div className="overline-text" style={{ color: C.forest, marginBottom: "1.5rem", textAlign: "center" }}>Practitioner voices</div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        {[
                            { initials: "SO", bg: C.forest, name: "Sarah Okonkwo, RD", role: "Registered Dietitian · NHS · HCPC", quote: "For the first time I have clinical-grade data on what my clients are eating between sessions. The compliance dashboard changes what we can discuss — I arrive informed, not guessing." },
                            { initials: "AH", bg: "#1e40af", name: "Dr. Amir Hassan, RNutr", role: "Clinical Nutritionist · Private practice", quote: "The sandbox feature gives me confidence. Before I tighten a rule I can see exactly which meals are affected. That kind of pre-deployment testing doesn't exist anywhere else." },
                            { initials: "LW", bg: "#7c3aed", name: "Lin Wei, SRD", role: "Renal Dietitian · Hospital trust", quote: "My CKD patients need very specific phosphorus and protein restrictions. The symbolic rule engine means I trust every meal generated — something I couldn't say about any other AI tool." },
                        ].map(({ initials, bg, name, role, quote }) => (
                            <div key={name} className="testimonial card-hover" style={{ padding: "1.75rem", borderRadius: "1rem", background: "white", border: "1px solid rgba(31,94,31,.08)" }}>
                                <div style={{ paddingTop: "1.25rem" }}>
                                    <p style={{ fontSize: ".875rem", lineHeight: 1.7, fontWeight: 300, color: C.muted, fontStyle: "italic", marginBottom: "1.25rem" }}>"{quote}"</p>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: bg, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".7rem", fontWeight: "bold", flexShrink: 0 }}>{initials}</div>
                                        <div><div style={{ fontSize: ".875rem", fontWeight: 600, color: C.charcoal }}>{name}</div><div style={{ fontSize: ".75rem", fontWeight: 300, color: C.mutedLight }}>{role}</div></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
