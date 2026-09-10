import {C} from "@/support/const";
import {usePage} from "@inertiajs/react";

export default function ProblemSection() {
    const {app} = usePage().props

    return (
        <section id="problem" style={{ padding: "5rem 0", background: C.ivoryWarm }}>
            <div style={{maxWidth: 1280, margin: "0 auto", padding: "0 2rem"}}>
                <div className="sr" style={{maxWidth: 768, marginBottom: "4rem"}}>
                    <div className="overline-text" style={{color: C.forest, marginBottom: "1rem"}}>Why practitioners
                        use {app.name}</div>
                    <h2 className="section-xl display" style={{color: C.charcoal, marginBottom: "1.5rem"}}>
                        What <em style={{fontStyle: "italic", color: C.forest}}>changes</em> for your practice
                    </h2>
                    <p style={{
                        fontSize: "clamp(1.05rem,1.5vw,1.25rem)",
                        lineHeight: 1.75,
                        fontWeight: 300,
                        color: C.muted
                    }}>
                        Your clinical expertise shouldn't be limited to the hours you're in the room with a
                        client. {app.name} makes your guidance available every day, without adding to your workload.
                    </p>
                </div>


                <div className="grid md:grid-cols-2 gap-6" style={{marginBottom: '40px'}}>

                    <div className="rounded-2xl bg-white border card-lift sr" data-delay="1"
                         style={{borderColor:"rgba(31,94,31,.08)", padding: '28px'}}>
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-5"
                             style={{background:"var(--forest-faint)"}}>📋
                        </div>
                        <h3 className="display" style={{marginBottom: "12px", fontSize:"1.3rem",fontWeight:"400",color:"var(--charcoal)"}}>Walk
                            into every consultation informed</h3>
                        <p className="body-sm" style={{color:"var(--muted)", marginBottom: "20px"}}>See exactly what your clients have been
                            eating between sessions — average sodium, carb adherence, fibre intake, meal ratings —
                            without asking them to keep a food diary. Your compliance dashboard is populated
                            automatically, ready before you even sit down.</p>
                        <div className="rounded-xl" style={{background:"var(--forest-faint)", padding: "16px"}}>
                            <div style={{marginBottom: "12px"}}>
                                <div className="flex justify-between text-xs mb-1.5" style={{color:"var(--muted)"}}><span>Sodium compliance — Marcus</span><span
                                    className="font-semibold" style={{color:"var(--forest)"}}>91%</span></div>
                                <div className="bar-track">
                                    <div className="bar-fill" style={{width:"91%"}}></div>
                                </div>
                            </div>
                            <div style={{marginBottom: "12px"}}>
                                <div className="flex justify-between text-xs mb-1.5" style={{color:"var(--muted)"}}><span>Carb ceiling — Fatima</span><span
                                    className="font-semibold" style={{color:"var(--forest)"}}>100%</span></div>
                                <div className="bar-track">
                                    <div className="bar-fill" style={{width:"100%"}}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1.5" style={{color:"var(--muted)"}}><span>Fibre target — Lin</span><span
                                    className="font-semibold" style={{color:"#d97706"}}>58%</span></div>
                                <div className="bar-track">
                                    <div className="bar-fill" style={{width:"58%", background:"#d97706"}}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-white border card-lift sr" data-delay="2"
                         style={{borderColor:"rgba(31,94,31,.08)", padding: '28px'}}>
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-5"
                             style={{background:"var(--forest-faint)"}}>🛡️
                        </div>
                        <h3 className="display" style={{fontSize:"1.3rem", marginBottom: "12px", fontWeight:"400", color:"var(--charcoal)"}}>Your
                            rules, enforced without exception</h3>
                        <p className="body-sm" style={{color:"var(--muted)", marginBottom: "20px"}}>The constraints you set — allergen
                            exclusions, nutrient limits, condition-specific targets — are enforced on every single meal,
                            every day. Not as suggestions. Not most of the time. Every time. A nut-free rule for a
                            client with anaphylaxis means no meal ever contains nuts.</p>
                        <div>
                            <div className="flex items-start gap-3  rounded-xl"
                                 style={{background:"var(--forest-faint)", padding: "14px", marginBottom: "10px"}}>
                                <span className="text-base flex-shrink-0">🚫</span>
                                <div>
                                    <div className="text-xs font-semibold" style={{marginBottom: "1px", color:"var(--charcoal)"}}>No
                                        allergen ever appears
                                    </div>
                                    <div className="text-xs font-light" style={{color:"var(--muted)"}}>Not 95% of the time —
                                        every time, guaranteed.
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 rounded-xl"
                                 style={{background:"var(--forest-faint)", padding: "14px", marginBottom: "10px"}}>
                                <span className="text-base flex-shrink-0">📊</span>
                                <div>
                                    <div className="text-xs font-semibold mb-0.5" style={{color:"var(--charcoal)"}}>Numeric
                                        limits are hard ceilings
                                    </div>
                                    <div className="text-xs font-light" style={{color:"var(--muted)"}}>Carbs, sodium,
                                        protein, phosphorus — no meal exceeds your set threshold.
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 rounded-xl"
                                 style={{background:"var(--forest-faint)", padding: "14px"}}>
                                <span className="text-base flex-shrink-0">⚡</span>
                                <div>
                                    <div className="text-xs font-semibold mb-0.5" style={{color:"var(--charcoal)"}}>Rule
                                        changes take effect within 60 seconds
                                    </div>
                                    <div className="text-xs font-light" style={{color:"var(--muted)"}}>Update a rule after a
                                        consultation — the next meal generation reflects it immediately.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-white border card-lift sr" data-delay="1"
                         style={{borderColor:"rgba(31,94,31,.08)",  padding: "28px"}}>
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                             style={{background:"var(--forest-faint)"}}>⚖️
                        </div>
                        <h3 className="display" style={{marginBottom: "12px", fontSize:"1.3rem", fontWeight:400, color:"var(--charcoal)"}}>Test
                            any rule change before it affects a client</h3>
                        <p className="body-sm" style={{marginBottom: "20px", color:"var(--muted)"}}>Before you publish a new constraint, run
                            a sandbox test against your client's real profile. You see exactly which meals pass and
                            which are excluded under the new rule — with a before-and-after comparison — before it goes
                            live. No surprises.</p>
                        <div className="p-4 rounded-xl text-xs" style={{marginBottom: "6px", background:"var(--forest-faint)", padding: "28px"}}>
                            <div className="font-medium " style={{marginBottom: "6px", color:"var(--charcoal)"}}>Draft rule: sodium ≤ 500mg
                                (tightened from 600mg)
                            </div>
                            <div className="flex items-center gap-2" style={{marginBottom: "6px",color:"var(--forest)"}}><span>✓</span><span>Lentil soup · 340mg — still passes</span>
                            </div>
                            <div className="flex items-center gap-2 line-through" style={{marginBottom: "4px", color:"#dc2626"}}>
                                <span>✗</span><span>Jerk chicken salad · 610mg — newly excluded</span></div>
                            <div className="rounded-lg text-xs"
                                 style={{marginTop: "2px", padding: "4px", background:"rgba(217,119,6,.1)", color:"#92400e"}}>⚠ 3 of 14 current meals newly
                                excluded — review before publishing
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-white border card-lift sr" data-delay="2"
                         style={{padding: "28px", borderColor:"rgba(31,94,31,.08)"}}>
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-5"
                             style={{background:"var(--forest-faint)"}}>📜
                        </div>
                        <h3 className="display"
                            style={{fontSize:"1.3rem", marginBottom: "12px", fontWeight:400, color:"var(--charcoal)"}}>Every decision, permanently
                            documented</h3>
                        <p className="body-sm mb-5" style={{color:"var(--muted)"}}>Every rule change is automatically logged
                            — who changed it, when, the previous value, the new value, and your clinical reason. A
                            complete, timestamped record for regulatory reviews, patient safety audits, or your own
                            reference.</p>
                        <div className="text-xs" style={{marginBottom: "8px", fontFamily:"monospace", color:"var(--muted)"}}>
                            <div className="rounded-xl border-l-2"
                                 style={{padding: "3px", marginTop: "12px", background:"var(--forest-faint)", borderColor:"var(--forest-light)"}}>
                                <div className="font-semibold mb-1"
                                     style={{color:"var(--charcoal)", fontFamily:"inherit"}}>sodium_mg: 600 → 550mg
                                </div>
                                <div>sarah@nhs.net · 01 May 2026 09:47</div>
                                <div className="italic" style={{marginTop: "1px", color:"var(--muted-light)"}}>"Ramipril dose increase
                                    — tighter Na control"
                                </div>
                            </div>
                            <div className="rounded-xl border-l-2"
                                 style={{padding: "12px", marginTop: "12px", background:"var(--ivory-warm)", borderColor:"var(--ivory-deep)"}}>
                                <div className="font-semibold mb-1"
                                     style={{color:"var(--charcoal)", fontFamily:"inherit"}}>fibre_g priority: medium → high
                                </div>
                                <div>sarah@nhs.net · 18 Mar 2026 14:22</div>
                            </div>
                        </div>
                    </div>

                </div>

                {/*-- Cultural sensitivity callout */}
                <div className="rounded-2xl sm:p-10 border sr-l"
                     style={{background:"white", padding: "32px", borderColor:"rgba(31,94,31,.08)"}}>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <div className="text-sm font-medium" style={{marginBottom: "12px", color:"var(--forest)"}}>Cultural sensitivity,
                                built in
                            </div>
                            <h3 className="section-md display" style={{marginBottom: "16px", color:"var(--charcoal)"}}>Meals your clients
                                will actually eat</h3>
                            <p className="body-sm" style={{color:"var(--muted)"}}>Your clients' cultural backgrounds and
                                food preferences are part of the picture. Clients choose their preferred cuisines and
                                dietary styles — West African, Mediterranean, South Asian, Middle Eastern, halal,
                                kosher, vegan — and every generated meal reflects those choices within your clinical
                                rules. Good food that's clinically safe isn't a trade-off.</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <span className="pill">🫙 West African</span>
                            <span className="pill">🌿 Mediterranean</span>
                            <span className="pill">🍱 South Asian</span>
                            <span className="pill">🕌 Halal</span>
                            <span className="pill">✡ Kosher</span>
                            <span className="pill">🌱 Vegan</span>
                            <span className="pill">🫐 Caribbean</span>
                            <span className="pill">🌸 East Asian</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
