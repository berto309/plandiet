import {C} from "@/support/const";
import {Link} from "@inertiajs/react";

interface HeroProp {
    onAuth: (action: string) => void
}
export default function Hero({onAuth}: HeroProp) {
    return (
        <section className="hero-bg" style={{ minHeight: "100vh", paddingTop: 96, paddingBottom: 0, display: "flex", flexDirection: "column" }} id="hero">
            {/* Orbs */}
            {[
                { w: "55vw", h: "55vw", top: "-15%", right: "-10%", bg: "radial-gradient(ellipse,rgba(45,122,45,.1),transparent 65%)" },
                { w: "35vw", h: "35vw", bottom: "-10%", left: "-5%", bg: "radial-gradient(ellipse,rgba(200,148,30,.07),transparent 60%)" },
                { w: "25vw", h: "25vw", top: "20%", left: "15%", bg: "radial-gradient(ellipse,rgba(31,94,31,.05),transparent 70%)" },
            ].map((o, i) => (
                <div key={i} style={{ position: "absolute", borderRadius: "50%", pointerEvents: "none", width: o.w, height: o.h, top: o.top, right: o.right, bottom: o.bottom, left: o.left, background: o.bg }} />
            ))}

            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem", flex: 1, display: "flex", flexDirection: "column" }}>
                {/* Eyebrow */}
          {/*      <div className="sr" data-delay="1" style={{ textAlign: "center", marginBottom: "1.5rem" }}>*/}
          {/*<span className="pill">*/}
          {/*  <span className="pulse" style={{ width: 6, height: 6, borderRadius: "50%", background: C.forest, display: "inline-block" }} />*/}
          {/*  Neurosymbolic AI · Clinically Governed · HCPC Verified*/}
          {/*</span>*/}
          {/*      </div>*/}

                {/* Headline */}
                <div className="sr" data-delay="2" style={{ textAlign: "center", maxWidth: 900, margin: "0 auto" }}>
                    <h1 className="hero-xl display" style={{ color: C.charcoal }}>
                        Your clinical rules,<br />
                        <em style={{ color: C.forest, fontStyle: "italic" }}>Every client's</em><br />
                        daily meals
                    </h1>
                </div>

                <div className="sr" data-delay="3" style={{ textAlign: "center", maxWidth: 640, margin: "1.5rem auto 2.5rem", fontSize: "clamp(1.05rem,1.5vw,1.25rem)", lineHeight: 1.75, fontWeight: 300, color: C.muted }}>
                    PlanDiet generates personalised, safe meal plans for your clients every single day — governed entirely by the constraints you set. Your expertise, extended between every appointment.
                </div>

                {/* CTAs */}
                <div className="sr" data-delay="4" style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center", marginBottom: "1.5rem" }}>
                    <Link href="/register" className="btn-shimmer" style={{ color: "white", fontWeight: 500, fontSize: ".875rem", padding: "1rem 2rem", borderRadius: 999, boxShadow: "0 4px 16px rgba(31,94,31,.3)" }}>Apply as a Practitioner →</Link>
                </div>

                {/* Trust badges */}
                <div className="sr" data-delay="5" style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", justifyContent: "center", marginBottom: "4rem" }}>
                    {[
                        ["For HCPC and AfN verified practitioners"],
                        // ["AfN GDPR compliant"],
                        ["Zero hard-rule violations"],
                        // ["Full audit trail"],
                    ].map(([label]) => (
                        <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: ".75rem", fontWeight: 500, color: C.muted }}>
                            <span style={{ color: C.forestLight }}>✓</span>{label}
                        </div>
                    ))}
                </div>

                {/* Dashboard mockup */}
                <div className="sr-scale" data-delay="3" style={{ position: "relative", maxWidth: 1024, margin: "0 auto", width: "100%" }}>
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-4 pb-0 relative">

                        {/* LEFT: Practitioner rules */}
                        <div className="float-a" style={{ borderRadius: "1rem", overflow: "hidden", boxShadow: "0 25px 50px rgba(0,0,0,.35)", background: C.charcoal }}>
                            <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
                                <div className="mono" style={{ fontSize: ".7rem", color: "rgba(255,255,255,.3)", marginBottom: 2 }}>practitioner view</div>
                                <div style={{ fontSize: ".875rem", fontWeight: 500, color: "rgba(255,255,255,.85)" }}>Fatima Al-Hassan — Rules</div>
                            </div>
                            <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: 10 }}>
                                {[
                                    { dot: "#f87171", rule: "nuts → EXCLUDE", badge: "critical", badgeBg: "rgba(248,113,113,.15)", badgeColor: "#fca5a5" },
                                    { dot: "#fbbf24", rule: "carbs_g ≤ 40/meal", badge: "hard", badgeBg: "rgba(251,191,36,.15)", badgeColor: "#fcd34d" },
                                    { dot: "#fbbf24", rule: "sodium_mg ≤ 550", badge: "hard", badgeBg: "rgba(251,191,36,.15)", badgeColor: "#fcd34d" },
                                    { dot: "#86efac", rule: "GI ≤ 55", badge: "soft", badgeBg: "rgba(134,239,172,.15)", badgeColor: "#a7f3d0" },
                                    { dot: "#fbbf24", rule: "halal → REQUIRED", badge: "hard", badgeBg: "rgba(251,191,36,.15)", badgeColor: "#fcd34d" },
                                ].map(({ dot, rule, badge, badgeBg, badgeColor }) => (
                                    <div key={rule} style={{ display: "flex", alignItems: "center", gap: 10, borderRadius: 12, padding: "10px 12px", background: "rgba(255,255,255,.05)" }}>
                                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: dot, flexShrink: 0 }} />
                                        <span className="mono" style={{ fontSize: ".7rem", flex: 1, color: "rgba(255,255,255,.75)" }}>{rule}</span>
                                        <span style={{ fontSize: ".65rem", padding: "2px 6px", borderRadius: 4, background: badgeBg, color: badgeColor }}>{badge}</span>
                                    </div>
                                ))}
                            </div>
                            <div style={{ padding: "0 16px 16px" }}>
                                <button style={{ width: "100%", fontSize: ".7rem", fontWeight: 500, padding: "8px", borderRadius: 8, background: "rgba(255,255,255,.08)", color: "rgba(255,255,255,.6)", border: "none", cursor: "pointer" }}>+ Add rule</button>
                            </div>
                        </div>

                        {/* CENTRE: Client view */}
                        <div className="float-b" style={{ borderRadius: "1rem", overflow: "hidden", boxShadow: "0 25px 50px rgba(0,0,0,.1)", background: "white", border: "1px solid #e8dcc4" }}>
                            <div style={{ padding: "12px 16px", borderBottom: "1px solid #e8dcc4" }}>
                                <div className="mono" style={{ fontSize: ".7rem", color: C.mutedLight, marginBottom: 2 }}>client receives</div>
                                <div style={{ fontSize: ".875rem", fontWeight: 500, color: C.charcoal }}>Thursday, 1 May — 4 meals</div>
                            </div>
                            <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: 8 }}>
                                {[
                                    { bg: "#fffbeb", icon: "🌅", slot: "Breakfast", meal: "Greek yogurt & cucumber", carbs: "22g", color: C.forest },
                                    { bg: C.forestFaint, icon: "☀️", slot: "Lunch", meal: "Grilled chicken & quinoa", carbs: "36g", color: C.forest },
                                    { bg: "#eff6ff", icon: "🌙", slot: "Dinner", meal: "Baked salmon & sweet potato", carbs: "38g ⚠", color: "#d97706" },
                                    { bg: "#fdf4ff", icon: "🫙", slot: "Snack", meal: "Hummus & vegetable sticks", carbs: "16g", color: C.forest },
                                ].map(({ bg, icon, slot, meal, carbs, color }) => (
                                    <div key={slot} style={{ display: "flex", alignItems: "center", gap: 10, borderRadius: 12, padding: 10, background: bg }}>
                                        <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{icon}</span>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ fontSize: ".7rem", fontWeight: 600, color: C.charcoal }}>{slot}</div>
                                            <div style={{ fontSize: ".65rem", color: C.muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{meal}</div>
                                        </div>
                                        <span className="mono" style={{ fontSize: ".7rem", fontWeight: 500, flexShrink: 0, color }}>{carbs}</span>
                                    </div>
                                ))}
                            </div>
                            <div style={{ padding: "0 12px 12px", display: "flex", flexWrap: "wrap", gap: 6 }}>
                                {["✓ Nut-free", "✓ Halal", "✓ Low GI"].map((t) => <span key={t} className="pill" style={{ fontSize: ".65rem" }}>{t}</span>)}
                            </div>
                        </div>

                        {/* RIGHT: Compliance view */}
                        <div className="float-c" style={{ borderRadius: "1rem", overflow: "hidden", boxShadow: "0 25px 50px rgba(0,0,0,.1)", background: "white", border: "1px solid #e8dcc4" }}>
                            <div style={{ padding: "12px 16px", borderBottom: "1px solid #e8dcc4" }}>
                                <div className="mono" style={{ fontSize: ".7rem", color: C.mutedLight, marginBottom: 2 }}>Your compliance view</div>
                                <div style={{ fontSize: ".875rem", fontWeight: 500, color: C.charcoal }}>This week — Fatima</div>
                            </div>
                            <div style={{display: "flex", flexDirection: "column", gap: 10, padding: "12px"}}>
                                {[["Sodium compliance", "87%", C.forestLight], ["Fibre target", "65%", "#d97706"], ["Carb ceiling adherence", "100%", C.forest]].map(([label, val, color]) => (
                                    <div key={label}>
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            fontSize: ".75rem",
                                            color: C.muted,
                                            marginBottom: 4,
                                            padding:"10px",
                                            paddingLeft:"0"
                                        }}><span>{label}</span><span style={{fontWeight: 500, color}}>{val}</span></div>
                                        <div style={{height: 6, borderRadius: 999, background: C.ivoryDeep}}>
                                            <div style={{
                                                height: "100%",
                                                borderRadius: 999,
                                                background: color,
                                                width: val
                                            }}/>
                                        </div>
                                    </div>
                                ))}
                                <div className="p-3 rounded-xl text-xs" style={{background:"var(--forest-faint)", marginTop: "16px"}}>
                                    <div className="font-medium mb-0.5" style={{color:"var(--forest)"}}>Ready for Tuesday's
                                        session
                                    </div>
                                    <div style={{color:"var(--muted)", padding: "12px", background: "#eff6ff", borderRadius: 12,}}>Fibre shortfall — avg 18g/day vs 30g target. No food
                                        diary needed.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Fade */}
                    <div
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-[#f9f5ec] to-transparent"/>
                </div>
            </div>
        </section>
    );
}
