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
            <div style={{maxWidth: 1280, margin: "0 auto", padding: "0 2rem"}}>
                <div className="sr" style={{textAlign: "center", maxWidth: 768, margin: "0 auto 4rem"}}>
                    <div className="overline-text" style={{color: "rgba(134,239,172,.5)", marginBottom: "1rem"}}>How it
                        works
                    </div>
                    <h2 className="section-xl display" style={{color: "white", marginBottom: "1.25rem"}}>
                        Up and running <em style={{fontStyle: "italic", color: "rgba(134,239,172,.8)"}}>in four
                        steps</em>
                    </h2>
                    <p style={{
                        fontSize: "clamp(1.05rem,1.5vw,1.25rem)",
                        lineHeight: 1.75,
                        fontWeight: 300,
                        color: "rgba(255,255,255,.45)"
                    }}>From verification to your first client's meal plan — here's exactly what the process looks
                        like.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5" style={{marginBottom: "64px"}}>
                    <div className="rounded-2xl sr" data-delay="1"
                         style={{padding: "36px", background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)"}}>
                        <div className="text-3xl" style={{marginBottom: "16px"}}>✅</div>
                        <div className="text-sm font-semibold" style={{color:"white", marginBottom: "8px"}}>1. Apply and get verified</div>
                        <p className="text-xs font-light leading-relaxed" style={{color:"rgba(255,255,255,.4)"}}>Submit your
                            HCPC or AfN number and professional documents. We verify your registration and approve your
                            account within 2 business days. Only verified clinicians can set rules or invite
                            clients.</p>
                    </div>
                    <div className="rounded-2xl sr" data-delay="2"
                         style={{padding: "24px", background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)"}}>
                        <div className="text-3xl"  style={{marginBottom: "16px"}}>📋</div>
                        <div className="text-sm font-semibold" style={{marginBottom: "8px", color:"white"}}>2. Set up a client</div>
                        <p className="text-xs font-light leading-relaxed" style={{color:"rgba(255,255,255,.4)"}}>Enter
                            conditions, allergies, medication notes, and nutrition targets from your consultation notes.
                            Load evidence-based templates as a starting point and personalise the values. Send a secure
                            invite link — the client's account is instantly linked to your rules.</p>
                    </div>
                    <div className="rounded-2xl sr" data-delay="3"
                         style={{background:"rgba(45,122,45,.08)", padding: "24px", border:"1px solid rgba(134,239,172,.15)"}}>
                        <div className="text-3xl" style={{marginBottom: "16px"}}>🍽️</div>
                        <div className="text-sm font-semibold" style={{marginBottom: "8px", color:"#86efac"}}>3. Client generates daily
                            plans
                        </div>
                        <p className="text-xs font-light leading-relaxed" style={{color:"rgba(255,255,255,.4)"}}>Your client
                            taps Generate. Four personalised meals arrive — culturally relevant, with ingredients and
                            prep notes. Every meal has already been validated against all your rules before it reaches
                            them. They never see the clinical machinery.</p>
                    </div>
                    <div className="p-6 rounded-2xl sr" data-delay="4"
                         style={{padding: "36px", background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.07)"}}>
                        <div className="text-3xl" style={{marginBottom: "16px"}}>📊</div>
                        <div className="text-sm font-semibold mb-2" style={{color:"white"}}>4. Arrive at consultations
                            informed
                        </div>
                        <p className="text-xs font-light leading-relaxed" style={{color:"rgba(255,255,255,.4)"}}>Your
                            compliance dashboard shows you everything that's happened since the last session — sodium
                            averages, meal ratings, which targets are being hit and which need attention. Better
                            clinical conversations, grounded in real data.</p>
                    </div>
                </div>

                 {/*Practitioner flows */}
                <div className="grid lg:grid-cols-2 gap-6">
                    {/*Invite system */}
                    <div className="rounded-2xl overflow-hidden sr-l"
                         style={{background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.07)"}}>
                        <div className="border-b" style={{padding: "28px", borderColor:"rgba(255,255,255,.06)"}}>
                            <div className="text-sm font-medium mb-4" style={{color:"rgba(134,239,172,.6)"}}>Client
                                onboarding
                            </div>
                            <h3 className="section-md display" style={{marginBottom:"12px", color:"white;font-size:1.7rem"}}>Every client
                                linked to you from day one</h3>
                            <p className="body-sm" style={{color:"rgba(255,255,255,.45)"}}>Clients don't arrive
                                independently. They join via a secure invite you send. From the moment they create their
                                account, they're clinically linked — their meal plans governed by your rules
                                immediately, with nothing for them to configure.</p>
                        </div>
                        <div className="p-7 space-y-3">
                            <div className="flex items-start gap-3 rounded-xl"
                                 style={{padding: "14px", background:"rgba(255,255,255,.05)"}}>
                                <span className="text-base flex-shrink-0">✉️</span>
                                <div>
                                    <div className="text-sm font-medium" style={{marginBottom: "1px", color:"rgba(255,255,255,.8)"}}>You
                                        send a secure invite
                                    </div>
                                    <div className="text-xs font-light" style={{color:"rgba(255,255,255,.4)"}}>Single-use
                                        link, expires in 7 days. Pre-links the client to your practice on registration.
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3.5 rounded-xl"
                                 style={{padding: "14px", background:"rgba(255,255,255,.05)"}}>
                                <span className="text-base flex-shrink-0">🔐</span>
                                <div>
                                    <div className="text-sm font-medium"
                                         style={{marginBottom: "1px",color:"rgba(255,255,255,.8)"}}>Client sets up in minutes
                                    </div>
                                    <div className="text-xs font-light" style={{color:"rgba(255,255,255,.4)"}}>Name,
                                        password, food preferences only — no clinical data asked of them at any stage.
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3.5 rounded-xl"
                                 style={{padding: "14px", background:"rgba(255,255,255,.05)"}}>
                                <span className="text-base flex-shrink-0">🛡️</span>
                                <div>
                                    <div className="text-sm font-medium " style={{marginBottom: "1px",color:"rgba(255,255,255,.8)"}}>Your
                                        rules activate immediately
                                    </div>
                                    <div className="text-xs font-light" style={{color:"rgba(255,255,255,.4)"}}>Their first
                                        plan generation is already governed by your clinical rules — no delay, no setup
                                        required from the client.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*Audit trail */}
                    <div className="rounded-2xl overflow-hidden sr-r"
                         style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)"}}>
                        <div className="border-b" style={{padding: "28px", borderColor:"rgba(255,255,255,.06)"}}>
                            <div className="text-sm font-medium"
                                 style={{color:"rgba(134,239,172,.6)", marginBottom: "16px"}}>Accountability
                            </div>
                            <h3 className="section-md display" style={{marginBottom: "12px", color:"white", fontSize:"1.7rem"}}>A record of
                                every clinical decision</h3>
                            <p className="body-sm" style={{color:"rgba(255,255,255,.45)"}}>Every rule update is logged
                                automatically with the timestamp, your name, the old value, the new value, and your
                                documented reason. Supports regulatory requirements, clinical governance reviews, and
                                patient safety documentation.</p>
                        </div>
                        <div  style={{padding: "28px", fontFamily:"monospace"}}>
                            <div className="rounded-xl border-l-2 text-xs"
                                 style={{padding: "14px", marginBottom: "12px", background:"rgba(45,122,45,.1)", borderColor:"rgba(134,239,172,.3)"}}>
                                <div className="font-semibold mb-1"
                                     style={{marginBottom: "4px", color:"rgba(255,255,255,.8)",fontFamily:"inherit"}}>sodium_mg: 600 → 550mg
                                    UPDATED
                                </div>
                                <div style={{color:"rgba(255,255,255,.35)"}}>sarah@nhs.net · 01 May 2026 09:47</div>
                                <div className="italic"
                                     style={{marginTop: "1px", color:"rgba(255,255,255,.3)", fontFamily:"inherit"}}>"Ramipril dose increase —
                                    tighter Na control"
                                </div>
                            </div>
                            <div className="rounded-xl border-l-2 text-xs"
                                 style={{padding: "14px",  marginBottom: "12px",  background:"rgba(255,255,255,.03)", borderColor:"rgba(255,255,255,.1)"}}>
                                <div className="font-semibold"
                                     style={{color:"rgba(255,255,255,.8)", marginBottom: "4px", fontFamily:"inherit"}}>fibre_g priority: medium →
                                    high
                                </div>
                                <div style={{color:"rgba(255,255,255,.35)"}}>sarah@nhs.net · 18 Mar 2026 14:22</div>
                            </div>
                            <div className="rounded-xl border-l-2 text-xs"
                                 style={{padding: "14px",   background:"rgba(255,255,255,.03)", borderColor:"rgba(255,255,255,.1)"}}>
                                <div className="font-semibold"
                                     style={{color:"rgba(255,255,255,.8)", marginBottom: "4px", fontFamily:"inherit"}}>4 rules applied from T2DM +
                                    Nut allergy templates
                                </div>
                                <div style={{color:"rgba(255,255,255,.35)"}}>sarah@nhs.net · 10 Mar 2026 — client enrolled
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
