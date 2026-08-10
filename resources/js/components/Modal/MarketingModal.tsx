import React, {useEffect, useState} from "react";
import {C} from "@/support/const";
import {Link, useForm, usePage} from "@inertiajs/react";
import Error from "@/components/Notifications/Error";

interface MarketingModalProp {
    initialTab: string,
    onClose: () => void
}

export default function MarketingModal({initialTab, onClose}: MarketingModalProp) {

    const {status} = usePage().props
    const [tab, setTab] = useState(initialTab || "signin");


    const signInForm = useForm({
        email: '',
        password: '',
        remember: false
    })

    const forgotPasswordForm = useForm({
        email: ''
    })


    function signIn(e: React.MouseEvent<HTMLButtonElement>)
    {
        e.preventDefault()

        signInForm.post('login')
    }

    useEffect(() => {

    }, []);

    function forgotPassword(e: React.MouseEvent<HTMLButtonElement>)
    {
        e.preventDefault()

        forgotPasswordForm.post('/forgot-password')
    }

    return (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="modal-box max-w-md">
                <div style={{ padding: "1.75rem", background: C.charcoal, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 80% 0%,rgba(45,122,45,.2),transparent 50%)", pointerEvents: "none" }} />
                    <div className="display" style={{ fontSize: "1.5rem", fontWeight: 500, color: "rgba(134,239,172,.8)", marginBottom: 4, position: "relative", zIndex: 1 }}>PlanDiet</div>
                    <div style={{ fontSize: ".875rem", fontWeight: 300, color: "rgba(255,255,255,.4)", position: "relative", zIndex: 1 }}>Clinical nutrition, intelligently guided.</div>
                </div>

                <div style={{ display: "flex", background: C.ivoryDeep }}>
                    {[["signin", "Sign in"], ["forgot-password", "Forogt password"]].map(([key, label]) => (
                        <button key={key} onClick={() => setTab(key)} style={{ flex: 1, padding: "0.75rem", fontSize: ".875rem", fontWeight: tab === key ? 500 : 400, border: "none", borderBottom: `2px solid ${tab === key ? C.forest : "transparent"}`, color: tab === key ? C.forest : C.muted, background: "transparent", cursor: "pointer", transition: "all .2s" }}>{label}</button>
                    ))}
                </div>

                <div style={{ padding: "1.75rem" }}>
                    {tab === "signin" && (
                       <form onSubmit={signIn}>
                           <div className="ml-11 mb-5">
                               { signInForm.errors.email && <div className="grid place-items-center" style={{"marginBottom": "5px"}}>
                                   <span className="pill-gold" style={{"background": "rgb(254, 226, 226)", "color": "rgb(146, 64, 14)"}}>{signInForm.errors.email}</span>
                               </div>
                               }
                               <div style={{display: "flex", flexDirection: "column", gap: 12, marginBottom: 16}}>
                                   <div>
                                       <label style={{
                                           display: "block",
                                           fontSize: ".7rem",
                                           fontWeight: 600,
                                           textTransform: "uppercase",
                                           letterSpacing: ".1em",
                                           color: C.muted,
                                           marginBottom: 6
                                       }}>Email</label>
                                       <input type="email" value={signInForm.data.email}
                                              onChange={(e) => signInForm.setData('email', e.target.value)}
                                              placeholder="Enter email" style={{
                                           width: "100%",
                                           border: `1px solid ${C.ivoryDeep}`,
                                           borderRadius: 12,
                                           padding: "12px 16px",
                                           fontSize: ".875rem",
                                           color: C.charcoal,
                                           background: C.ivoryWarm,
                                           outline: "none"
                                       }} required autoFocus={true}/>
                                   </div>
                                   <div>
                                       <label style={{
                                           display: "block",
                                           fontSize: ".7rem",
                                           fontWeight: 600,
                                           textTransform: "uppercase",
                                           letterSpacing: ".1em",
                                           color: C.muted,
                                           marginBottom: 6
                                       }}>Password</label>
                                       <input type="password" value={signInForm.data.password}
                                              onChange={(e) => signInForm.setData('password', e.target.value)}
                                              placeholder="••••••••" style={{
                                           width: "100%",
                                           border: `1px solid ${C.ivoryDeep}`,
                                           borderRadius: 12,
                                           padding: "12px 16px",
                                           fontSize: ".875rem",
                                           color: C.charcoal,
                                           background: C.ivoryWarm,
                                           outline: "none"
                                       }} required/>
                                   </div>
                                   <div style={{textAlign: "right"}}><button onClick={() => setTab('forgot-password')}
                                                                        style={{fontSize: ".75rem", color: C.forest}} className="cursor-pointer">Forgot
                                       password?</button></div>
                               </div>
                               <button disabled={signInForm.processing} className="btn-shimmer" style={{
                                   width: "100%",
                                   color: "white",
                                   fontWeight: 500,
                                   padding: "14px",
                                   borderRadius: 12,
                                   fontSize: ".875rem",
                                   marginBottom: 12,
                                   opacity: signInForm.processing ? "75%" : "100%"
                               }}>Sign in
                               </button>
                               <p style={{
                                   textAlign: "center",
                                   fontSize: ".75rem",
                                   fontWeight: 300,
                                   color: C.muted
                               }}>New? <Link href="/register" style={{
                                   fontWeight: 500,
                                   color: C.forest,
                                   background: "none",
                                   border: "none",
                                   cursor: "pointer"
                               }}>Apply as practitioner →</Link></p>
                           </div>
                       </form>
                    )}

                    {tab === "signup" && (
                        <div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                                {[["First name", "Sarah"], ["Last name", "Okonkwo"]].map(([label, ph]) => (
                                    <div key={label}>
                                        <label style={{ display: "block", fontSize: ".7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: C.muted, marginBottom: 6 }}>{label}</label>
                                        <input type="text" placeholder={ph} style={{ width: "100%", border: `1px solid ${C.ivoryDeep}`, borderRadius: 12, padding: "10px 12px", fontSize: ".875rem", color: C.charcoal, background: C.ivoryWarm, outline: "none" }} />
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
                                <div>
                                    <label style={{ display: "block", fontSize: ".7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: C.muted, marginBottom: 6 }}>Professional email</label>
                                    <input type="email" placeholder="you@nhs.net" style={{ width: "100%", border: `1px solid ${C.ivoryDeep}`, borderRadius: 12, padding: "10px 12px", fontSize: ".875rem", color: C.charcoal, background: C.ivoryWarm, outline: "none" }} />
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                                    <div>
                                        <label style={{ display: "block", fontSize: ".7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: C.muted, marginBottom: 6 }}>Regulator</label>
                                        <select style={{ width: "100%", border: `1px solid ${C.ivoryDeep}`, borderRadius: 12, padding: "10px 12px", fontSize: ".875rem", color: C.charcoal, background: C.ivoryWarm, outline: "none" }}>
                                            <option>HCPC (UK)</option><option>AfN (UK)</option><option>AND (USA)</option><option>DAA (AU)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display: "block", fontSize: ".7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: C.muted, marginBottom: 6 }}>Reg. number</label>
                                        <input type="text" placeholder="DT12345" style={{ width: "100%", border: `1px solid ${C.ivoryDeep}`, borderRadius: 12, padding: "10px 12px", fontSize: ".875rem", color: C.charcoal, background: C.ivoryWarm, outline: "none" }} />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: "block", fontSize: ".7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: C.muted, marginBottom: 6 }}>Password</label>
                                    <input type="password" placeholder="Min. 8 characters" style={{ width: "100%", border: `1px solid ${C.ivoryDeep}`, borderRadius: 12, padding: "10px 12px", fontSize: ".875rem", color: C.charcoal, background: C.ivoryWarm, outline: "none" }} />
                                </div>
                            </div>
                            <label style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 16, cursor: "pointer" }}>
                                <input type="checkbox" style={{ marginTop: 2, accentColor: C.forest }} />
                                <span style={{ fontSize: ".75rem", fontWeight: 300, color: C.muted }}>I confirm I am a registered healthcare professional and agree to the Terms of Service.</span>
                            </label>
                            <button className="btn-shimmer" style={{ width: "100%", color: "white", fontWeight: 500, padding: "12px", borderRadius: 12, fontSize: ".875rem" }}>Continue to verification →</button>
                        </div>
                    )}

                    {tab === "forgot-password" && (
                        <form onSubmit={forgotPassword}>
                        <div className="space-y-3">
                            { status && <div className="grid place-items-center" style={{"marginBottom": "5px"}}>
                                <span className="pill">{status}</span>
                            </div>
                            }
                            <div style={{"marginBottom": "25px"}}>
                                <label style={{
                                    display: "block",
                                    fontSize: ".7rem",
                                    fontWeight: 600,
                                    textTransform: "uppercase",
                                    letterSpacing: ".1em",
                                    color: C.muted,
                                    marginBottom: 6
                                }}>Email</label>
                                <input type="email" value={forgotPasswordForm.data.email}
                                       onChange={(e) => forgotPasswordForm.setData('email', e.target.value)}
                                       placeholder="Enter email" style={{
                                    width: "100%",
                                    border: `1px solid ${C.ivoryDeep}`,
                                    borderRadius: 12,
                                    padding: "12px 16px",
                                    fontSize: ".875rem",
                                    color: C.charcoal,
                                    background: C.ivoryWarm,
                                    outline: "none"
                                }} required/>
                                <Error message={forgotPasswordForm.errors.email} />
                            </div>
                            <button disabled={forgotPasswordForm.processing} type="submit" className="btn-shimmer mt-1" style={{ width: "100%", color: "white", fontWeight: 500, padding: "12px", borderRadius: 12, fontSize: ".875rem", opacity: forgotPasswordForm.processing ? "75%" : "100%" }}>Reset password</button>
                        </div>
                        </form>
                    )}
                </div>

                <button onClick={onClose} style={{ position: "absolute", top: "1rem", right: "1rem", width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,.12)", color: "rgba(255,255,255,.6)", border: "none", cursor: "pointer", fontSize: ".875rem", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
            </div>
        </div>
    );
}
