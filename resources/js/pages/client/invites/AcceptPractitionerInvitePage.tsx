import React, {Component, useEffect, useState} from 'react';
import useScrollReveal from "@/hooks/useScrollReveal";
import MarketingNavbar from "@/layouts/Marketing/MarketingNavbar";
import MarketingFooter from "@/layouts/Marketing/Footer";
import MarketingModal from "@/components/Modal/MarketingModal";
import {C} from "@/support/const";
import Error from "@/components/Notifications/Error";
import {Head, useForm, usePage} from "@inertiajs/react";
import {enumToArray} from "@/lib/utils";
import InviteController from "@/actions/App/Http/Controllers/Invites/InviteController";
import ClientAccountController from "@/actions/App/Http/Controllers/Users/ClientAccountController";
import {useToast} from "@/context/ToastContext";




export default function AcceptPractitionerInvitePage() {
    <Head title="Accept Practitioner Invitation" />

    const {status, email, token, genders, inviteId, practitionerId} = usePage().props
    const [authModal, setAuthModal] = useState<string | undefined>(undefined);
    const [showStt, setShowStt] = useState(false);
    const toast = useToast()

    useScrollReveal();

    useEffect(() => {
        const onScroll = () => setShowStt(window.scrollY > 400);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);

    }, []);

    const acceptInviteForm = useForm({
        name: '',
        email: '',
        phone: '',
        date_of_birth: '',
        address: '',
        post_code: '',
        gender: '',
        password: '',
        password_confirmation: '',
        invite_id: inviteId,
        practitioner_id: practitionerId,
        token
    })

    function acceptInvite(e: React.MouseEvent<HTMLButtonElement>)
    {
        e.preventDefault()
        acceptInviteForm.post(ClientAccountController.acceptInvite.url(), {
            onSuccess: () => {
                toast.success('Invite accepted. Click <a href="#">Sign in</a> to login')
            },
            onError: (errors) => {

                const firstError = Object.values(errors)[0]
                toast.error(typeof firstError === 'string' ? firstError : 'Something went wrong')
            },
        })


    }

    return (
        <div className="mealai-root">
            <style>
                {`*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`}
            </style>
            <MarketingNavbar onAuth={(tab) => setAuthModal(tab)} />

            <section id="problem" style={{ padding: "5rem 0", background: C.ivoryWarm }}>
                <div className="modal-box mt-8 md:max-w-[75%] max-w-md" style={{margin: "0 auto"}}>
                    <div style={{ padding: "1.75rem", background: C.charcoal, position: "relative", overflow: "hidden" }}>
                        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 80% 0%,rgba(45,122,45,.2),transparent 50%)", pointerEvents: "none" }} />
                        <div className="display" style={{ fontSize: "1.5rem", fontWeight: 500, color: "rgba(134,239,172,.8)", marginBottom: 4, position: "relative", zIndex: 1 }}>PlanDiet</div>
                        <div style={{ fontSize: ".875rem", fontWeight: 300, color: "rgba(255,255,255,.4)", position: "relative", zIndex: 1 }}>Clinical nutrition, intelligently guided.</div>
                    </div>

                    <div style={{ display: "flex", background: C.ivoryDeep }}>
                        {[["reset-password", "Create account"]].map(([key, label]) => (
                            <div key={key} style={{ flex: 1, padding: "0.75rem", fontSize: ".875rem", fontWeight:  500 , border: "none", borderBottom: `2px solid  C.forest`, color:  C.forest , background: "transparent", cursor: "pointer", transition: "all .2s" }}>{label}</div>
                        ))}
                    </div>

                    <div style={{ padding: "1.75rem" }}>

                        { status && <div className="grid place-items-center" style={{"marginBottom": "5px"}}>
                            <span className="pill">{status}</span>
                        </div>
                        }

                        <form onSubmit={acceptInvite}>
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
                                    }}>Name</label>
                                    <input type="text" value={acceptInviteForm.data.name}
                                           onChange={(e) => acceptInviteForm.setData('name', e.target.value)}
                                           placeholder="Enter name" style={{
                                        width: "100%",
                                        border: `1px solid ${C.ivoryDeep}`,
                                        borderRadius: 12,
                                        padding: "12px 16px",
                                        fontSize: ".875rem",
                                        color: C.charcoal,
                                        background: C.ivoryWarm,
                                        outline: "none"
                                    }} required/>
                                    <Error message={acceptInviteForm.errors.name} />
                                </div>
                                <div style={{"marginBottom": "25px"}} className="md:flex items-center md:gap-5 space-y-5 ">
                                    <div className="w-full">
                                        <label style={{
                                            display: "block",
                                            fontSize: ".7rem",
                                            fontWeight: 600,
                                            textTransform: "uppercase",
                                            letterSpacing: ".1em",
                                            color: C.muted,
                                            marginBottom: 6
                                        }}>Email</label>
                                        <input type="email" value={acceptInviteForm.data.email}
                                               onChange={(e) => acceptInviteForm.setData('email', e.target.value)}
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
                                        <Error message={acceptInviteForm.errors.email} />
                                    </div>
                                    <div className="w-full">
                                        <label style={{
                                            display: "block",
                                            fontSize: ".7rem",
                                            fontWeight: 600,
                                            textTransform: "uppercase",
                                            letterSpacing: ".1em",
                                            color: C.muted,
                                            marginBottom: 6
                                        }}>Phone</label>
                                        <input type="phone" value={acceptInviteForm.data.phone}
                                               onChange={(e) => acceptInviteForm.setData('phone', e.target.value)}
                                               placeholder="Enter phone" style={{
                                            width: "100%",
                                            border: `1px solid ${C.ivoryDeep}`,
                                            borderRadius: 12,
                                            padding: "12px 16px",
                                            fontSize: ".875rem",
                                            color: C.charcoal,
                                            background: C.ivoryWarm,
                                            outline: "none"
                                        }} required/>
                                        <Error message={acceptInviteForm.errors.phone} />
                                    </div>
                                </div>
                                <div style={{"marginBottom": "25px"}} className="md:flex items-center md:gap-5 space-y-5 ">
                                    <div className="w-full">
                                        <label style={{
                                            display: "block",
                                            fontSize: ".7rem",
                                            fontWeight: 600,
                                            textTransform: "uppercase",
                                            letterSpacing: ".1em",
                                            color: C.muted,
                                            marginBottom: 6
                                        }}>Date of Birth</label>
                                        <input type="date" value={acceptInviteForm.data.date_of_birth}
                                               onChange={(e) => acceptInviteForm.setData('date_of_birth', e.target.value)}
                                               style={{
                                            width: "100%",
                                            border: `1px solid ${C.ivoryDeep}`,
                                            borderRadius: 12,
                                            padding: "12px 16px",
                                            fontSize: ".875rem",
                                            color: C.charcoal,
                                            background: C.ivoryWarm,
                                            outline: "none"
                                        }} required/>
                                        <Error message={acceptInviteForm.errors.date_of_birth} />
                                    </div>
                                    <div className="w-full">
                                        <label style={{
                                            display: "block",
                                            fontSize: ".7rem",
                                            fontWeight: 600,
                                            textTransform: "uppercase",
                                            letterSpacing: ".1em",
                                            color: C.muted,
                                            marginBottom: 6
                                        }}>Gender</label>
                                        <select onChange={(e) => acceptInviteForm.setData('gender', e.target.value)} style={{
                                            width: "100%",
                                            border: `1px solid ${C.ivoryDeep}`,
                                            borderRadius: 12,
                                            padding: "12px 16px",
                                            fontSize: ".875rem",
                                            color: C.charcoal,
                                            background: C.ivoryWarm,
                                            outline: "none"
                                        }}>
                                          <option value="">Select</option>
                                            {enumToArray(genders).map((g: any) => (
                                                <option value={g.id}>{g.name}</option>
                                            ))}
                                        </select>
                                        <Error message={acceptInviteForm.errors.gender} />
                                    </div>
                                </div>
                                <div style={{"marginBottom": "25px"}} className="md:flex items-center md:gap-5 space-y-5 ">
                                    <div className="w-full">
                                        <label style={{
                                            display: "block",
                                            fontSize: ".7rem",
                                            fontWeight: 600,
                                            textTransform: "uppercase",
                                            letterSpacing: ".1em",
                                            color: C.muted,
                                            marginBottom: 6
                                        }}>Address</label>
                                        <input type="text" value={acceptInviteForm.data.address}
                                               onChange={(e) => acceptInviteForm.setData('address', e.target.value)}
                                               style={{
                                                   width: "100%",
                                                   border: `1px solid ${C.ivoryDeep}`,
                                                   borderRadius: 12,
                                                   padding: "12px 16px",
                                                   fontSize: ".875rem",
                                                   color: C.charcoal,
                                                   background: C.ivoryWarm,
                                                   outline: "none"
                                               }} required/>
                                        <Error message={acceptInviteForm.errors.address} />
                                    </div>
                                    <div className="w-full">
                                        <label style={{
                                            display: "block",
                                            fontSize: ".7rem",
                                            fontWeight: 600,
                                            textTransform: "uppercase",
                                            letterSpacing: ".1em",
                                            color: C.muted,
                                            marginBottom: 6
                                        }}>Post Code</label>
                                        <input type="text" value={acceptInviteForm.data.post_code}
                                               onChange={(e) => acceptInviteForm.setData('post_code', e.target.value)}
                                               style={{
                                                   width: "100%",
                                                   border: `1px solid ${C.ivoryDeep}`,
                                                   borderRadius: 12,
                                                   padding: "12px 16px",
                                                   fontSize: ".875rem",
                                                   color: C.charcoal,
                                                   background: C.ivoryWarm,
                                                   outline: "none"
                                               }} required/>
                                        <Error message={acceptInviteForm.errors.post_code} />
                                    </div>
                                </div>
                                <div style={{"marginBottom": "25px"}} className="md:flex items-center md:gap-5 space-y-5 ">
                                    <div className="w-full">
                                        <label style={{
                                            display: "block",
                                            fontSize: ".7rem",
                                            fontWeight: 600,
                                            textTransform: "uppercase",
                                            letterSpacing: ".1em",
                                            color: C.muted,
                                            marginBottom: 6
                                        }}>Password</label>
                                        <input type="password" value={acceptInviteForm.data.password}
                                               onChange={(e) => acceptInviteForm.setData('password', e.target.value)}
                                               placeholder="Enter password" style={{
                                            width: "100%",
                                            border: `1px solid ${C.ivoryDeep}`,
                                            borderRadius: 12,
                                            padding: "12px 16px",
                                            fontSize: ".875rem",
                                            color: C.charcoal,
                                            background: C.ivoryWarm,
                                            outline: "none"
                                        }} required/>
                                        <Error message={acceptInviteForm.errors.password} />
                                    </div>
                                    <div className="w-full">
                                        <label style={{
                                            display: "block",
                                            fontSize: ".7rem",
                                            fontWeight: 600,
                                            textTransform: "uppercase",
                                            letterSpacing: ".1em",
                                            color: C.muted,
                                            marginBottom: 6
                                        }}>Confirm password</label>
                                        <input type="password" value={acceptInviteForm.data.password_confirmation}
                                               onChange={(e) => acceptInviteForm.setData('password_confirmation', e.target.value)}
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
                                        <Error message={acceptInviteForm.errors.password_confirmation} />
                                    </div>
                                </div>
                                <button disabled={acceptInviteForm.processing} type="submit" className="btn-shimmer mt-1" style={{ width: "100%", color: "white", fontWeight: 500, padding: "12px", borderRadius: 12, fontSize: ".875rem", opacity: acceptInviteForm.processing ? "75%" : "100%" }}>Register</button>
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

