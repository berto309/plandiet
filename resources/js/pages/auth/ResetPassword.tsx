import React, {Component, useEffect, useState} from 'react';
import useScrollReveal from "@/hooks/useScrollReveal";
import MarketingNavbar from "@/layouts/Marketing/MarketingNavbar";
import MarketingFooter from "@/layouts/Marketing/Footer";
import MarketingModal from "@/components/Modal/MarketingModal";
import {C} from "@/support/const";
import Error from "@/components/Notifications/Error";
import {useForm, usePage} from "@inertiajs/react";




export default function ResetPassword() {
    const {status, email, token} = usePage().props
    const [authModal, setAuthModal] = useState<string | undefined>(undefined);
    const [showStt, setShowStt] = useState(false);


    useScrollReveal();

    useEffect(() => {
        const onScroll = () => setShowStt(window.scrollY > 400);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);

    }, []);

    const changePasswordForm = useForm({
        password: '',
        email,
        token,
        password_confirmation: ''
    })

    function changePassword(e: React.MouseEvent<HTMLButtonElement>)
    {
        e.preventDefault()
        changePasswordForm.post('/reset-password')


    }

    return (
        <div className="mealai-root">
            <style>
                {`*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`}
            </style>
            <MarketingNavbar onAuth={(tab) => setAuthModal(tab)} />

            <section id="problem" style={{ padding: "5rem 0", background: C.ivoryWarm }}>
                <div className="modal-box mt-8" style={{margin: "0 auto"}}>
                    <div style={{ padding: "1.75rem", background: C.charcoal, position: "relative", overflow: "hidden" }}>
                        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 80% 0%,rgba(45,122,45,.2),transparent 50%)", pointerEvents: "none" }} />
                        <div className="display" style={{ fontSize: "1.5rem", fontWeight: 500, color: "rgba(134,239,172,.8)", marginBottom: 4, position: "relative", zIndex: 1 }}>PlanDiet</div>
                        <div style={{ fontSize: ".875rem", fontWeight: 300, color: "rgba(255,255,255,.4)", position: "relative", zIndex: 1 }}>Clinical nutrition, intelligently guided.</div>
                    </div>

                    <div style={{ display: "flex", background: C.ivoryDeep }}>
                        {[["reset-password", "Reset Password"]].map(([key, label]) => (
                            <div key={key} style={{ flex: 1, padding: "0.75rem", fontSize: ".875rem", fontWeight:  500 , border: "none", borderBottom: `2px solid  C.forest`, color:  C.forest , background: "transparent", cursor: "pointer", transition: "all .2s" }}>{label}</div>
                        ))}
                    </div>

                    <div style={{ padding: "1.75rem" }}>



                            <form onSubmit={changePassword}>
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
                                        }}>Password</label>
                                        <input type="password" value={changePasswordForm.data.password}
                                               onChange={(e) => changePasswordForm.setData('password', e.target.value)}
                                               placeholder="Enter new password" style={{
                                            width: "100%",
                                            border: `1px solid ${C.ivoryDeep}`,
                                            borderRadius: 12,
                                            padding: "12px 16px",
                                            fontSize: ".875rem",
                                            color: C.charcoal,
                                            background: C.ivoryWarm,
                                            outline: "none"
                                        }} required/>
                                        <Error message={changePasswordForm.errors.password} />
                                    </div>
                                    <div style={{"marginBottom": "25px"}}>
                                        <label style={{
                                            display: "block",
                                            fontSize: ".7rem",
                                            fontWeight: 600,
                                            textTransform: "uppercase",
                                            letterSpacing: ".1em",
                                            color: C.muted,
                                            marginBottom: 6
                                        }}>Confirm password</label>
                                        <input type="password" value={changePasswordForm.data.password_confirmation}
                                               onChange={(e) => changePasswordForm.setData('password_confirmation', e.target.value)}
                                               placeholder="Confirm password" style={{
                                            width: "100%",
                                            border: `1px solid ${C.ivoryDeep}`,
                                            borderRadius: 12,
                                            padding: "12px 16px",
                                            fontSize: ".875rem",
                                            color: C.charcoal,
                                            background: C.ivoryWarm,
                                            outline: "none"
                                        }} required/>
                                        <Error message={changePasswordForm.errors.password_confirmation} />
                                    </div>
                                    <button disabled={changePasswordForm.processing} type="submit" className="btn-shimmer mt-1" style={{ width: "100%", color: "white", fontWeight: 500, padding: "12px", borderRadius: 12, fontSize: ".875rem", opacity: changePasswordForm.processing ? "75%" : "100%" }}>Change password</button>
                                </div>
                            </form>

                    </div>

                </div>
            </section>
            <MarketingFooter />
            { authModal && <MarketingModal initialTab={authModal} onClose={() => setAuthModal(undefined)} /> }

            {showStt && (
                <button className="stt-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>↑</button>
            )}
        </div>
    );
}

