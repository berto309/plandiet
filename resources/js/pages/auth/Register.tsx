import React, {Component, useEffect, useState} from 'react';
import useScrollReveal from "@/hooks/useScrollReveal";
import MarketingNavbar from "@/layouts/Marketing/MarketingNavbar";
import {useForm, usePage} from "@inertiajs/react";
import {enumToArray, formatFileSize} from "@/lib/utils";
import Error from "@/components/Notifications/Error";
import {FileUploadField} from "@/components/Form/FileUploadField";
import {ReviewRow} from "@/components/List/ReviewRow";
import {Check} from "lucide-react";
import RegisterPractitionerController from "@/actions/App/Http/Controllers/Users/RegisterPractitionerController";
import {useToast} from "@/context/ToastContext";
import MarketingModal from "@/components/Modal/MarketingModal";


export default function Register() {
    const {genders, regulators, profTitles, countries, proofOfIdentitiesList} = usePage().props
    const [authModal, setAuthModal] = useState<string | undefined>(undefined);
    const [showStt, setShowStt] = useState(false);

    const [stepIndex, setStepIndex] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const toast = useToast();

    const STEPS = [
        {key: "account", label: "Account"},
        {key: "professional", label: "Professional"},
        {key: "documents", label: "Documents"},
        {key: "review", label: "Review"},
    ];


    const progressNodes = [...STEPS.map((s) => s.label), "Complete"];
    const currentStep = STEPS[stepIndex];

    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const DOCUMENT_FIELDS = [
        {
            key: "proof_of_identity_file",
            icon: "👤",
            label: "Proof of identity",
            description: "Certified copy of a passport or driver's licence"
        },
        {
            key: "proof_of_address",
            icon: "📄",
            label: "Proof of address",
            description: "Certified copy of a recent utility bill or bank statement"
        },
        {
            key: "qualification_certificate",
            icon: "🎓",
            label: "Qualification certificate",
            description: "Certified copy of your professional qualification certificate"
        },
    ];

    function calculateAge(dob: any) {
        if (!dob) return null;
        const birth = new Date(dob);
        if (Number.isNaN(birth.getTime())) return null;
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
        return age;
    }

    function validateAccountStep() {



    }

    function validateProfessionalStep() {



    }

    function validateDocumentsStep() {


    }


    function validateStep(key: any) {
        if (key === "account") return validateAccountStep();
        if (key === "professional") return validateProfessionalStep();
        if (key === "documents") return validateDocumentsStep();
        return {};
    }

    function goNext(e:any) {
        // const errors = validateStep(currentStep.key);
        // if (Object.keys(errors).length > 0) return;
        e.preventDefault();
        e.stopPropagation();
            setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));

    }


    function goBack() {
        setError({});
        setStepIndex((i) => Math.max(i - 1, 0));
    }

    function goToStep(index: any) {
        if (index < stepIndex) {
            setError({});
            setStepIndex(index);
        }
    }



    function handleSubmit(e: any) {
        e.preventDefault();
        clearErrors();


            post(RegisterPractitionerController.url(),{
                onSuccess: () => {
                    setSubmitted(true);
                },
                onError: (errors) => {

                    const firstError = Object.values(errors)[0]
                    const firstKeyError = Object.keys(errors)[0]
                    let stepNumberMatch = firstKeyError.match(/step(\d+)/)
                    let step = stepNumberMatch?.[1]
                    if(step) goToStep(step)
                    toast.error(typeof firstError === 'string' ? firstError : 'Something went wrong')
                },
            })


        return;
        // if (!data.confirm_accuracy) {
        //     setError({confirm_accuracy: "Please confirm the information provided is accurate."});
        //     return;
        // }
        // setTimeout(() => {
        //     // setProcessing(false);
        //     // setSubmitted(true);
        // }, 600);

    }


    function inputColorStyle(hasError: any) {
        return {
            borderColor: hasError ? "#fca5a5" : "var(--color-sage-200)",
            background: "var(--color-cream)",
            color: "var(--color-sage-800)"
        };
    }






    const inputClasses = "w-full rounded-xl border px-3 py-2.5 text-sm";


    useScrollReveal();

    useEffect(() => {
        const onScroll = () => setShowStt(window.scrollY > 400);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);

    }, []);

    const {data, processing, errors, post, setError, setData, clearErrors} = useForm({
        step0: {
            name: "",
            email: "",
            phone: "",
            date_of_birth: "",
            gender: "",
            password: "",
            password_confirmation: "",
            post_code: "",
            address: "",
            city: "",
        },
        step1: {
            professional_title: "",
            registration_number: "",
            country_of_practice: "",
            website:"",
            regulator: "",
            practice_name: "",
        },
        step2: {
            proof_of_identity: '',
            proof_of_identity_file: null,
            proof_of_address: null,
            qualification_certificate: null,
        },
        confirm_accuracy: false,
    })


    return (

        <div className="mealai-root">

            <MarketingNavbar onAuth={(tab) => setAuthModal(tab)}/>


            {
                submitted ?  (
                    <div className="min-h-screen" style={{ background: "var(--color-cream)" }}>

                        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full text-xl sm:text-2xl flex items-center justify-center mx-auto mb-5 bg-sage-500 text-sage-100">
                                <Check size={30} className="text-white" />
                            </div>
                            <h1 className="text-xl sm:text-2xl mb-2 text-sage-900">
                                Submitted for verification
                            </h1>
                            <p className="text-sm font-light mb-8 text-sage-500">
                                Thanks, {data.step0.name.split(" ")[0] || "user"}. You will receive an email on confirmation of completing your registration as well what to do next. Our admin team will review your details and documents shortly.
                            </p>

                            <div className="rounded-2xl p-4 flex gap-4 mb-6 text-left border" style={{ background: "#fffbeb", borderColor: "#fde68a" }}>
                                <span className="text-2xl shrink-0">⏳</span>
                                <div>
                                    <div className="font-medium text-sm text-sage-800">
                                        Details and Documents submitted — under review
                                    </div>
                                    <div className="text-[11px] font-light mt-1 text-sage-500">
                                        Estimated 1–3 business days
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border p-5 text-left" style={{ borderColor: "var(--color-sage-100)", background: "#fff" }}>
                                <h2 className="text-sm font-semibold mb-3 text-sage-700">
                                    What happens next
                                </h2>
                                <ul className="text-sm font-light space-y-2 text-sage-600">
                                    <li>• Our admin team reviews your submitted documents</li>
                                    <li>• We verify your {data.step1.regulator || "regulator"} registration status</li>
                                    <li>• You'll get an email once your account is verified</li>
                                </ul>
                            </div>

                            {/*<button*/}
                            {/*    onClick={() => {*/}
                            {/*        setSubmitted(false);*/}
                            {/*        setStepIndex(0);*/}
                            {/*    }}*/}
                            {/*    className="mt-7 text-xs underline text-sage-500"*/}
                            {/*>*/}
                            {/*    ← Restart preview*/}
                            {/*</button>*/}
                        </div>
                    </div>
                ): (
                    <div className="min-h-screen bg-cream">
                        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 mt-8">
                            <div className="mb-5 sm:mb-6">
                                <h1 className="text-xl sm:text-2xl text-sage-900">
                                    Practitioner registration
                                </h1>
                                <p className="text-xs sm:text-sm font-light mt-1 text-sage-400" >
                                    Complete all steps to submit your details for review
                                </p>
                            </div>

                            <div className="flex items-center mb-2 overflow-x-auto pb-2 -mx-1 px-1">
                                {progressNodes.map((label, i) => {
                                    const isComplete = i < stepIndex;
                                    const isCurrent = i === stepIndex;
                                    const isFuture = i > stepIndex;
                                    const isTrailingVerified = i === progressNodes.length - 1;
                                    return (
                                        <div key={label} className="flex items-center shrink-0">
                                            {i > 0 && (
                                                <div className="h-0.5 mx-2 sm:mx-3 w-6 sm:w-8" style={{ background: i <= stepIndex ? "var(--color-sage-300)" : "var(--color-sage-100)" }} />
                                            )}
                                            <button
                                                type="button"
                                                disabled={isFuture || isTrailingVerified}
                                                onClick={() => !isTrailingVerified && goToStep(i)}
                                                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs flex items-center justify-center font-semibold"
                                                style={{
                                                    cursor: isFuture || isTrailingVerified ? "default" : "pointer",
                                                    background: isComplete ? "var(--color-sage-600)" : "transparent",
                                                    color: isComplete ? "#fff" : isCurrent ? "var(--color-sage-600)" : "var(--color-sage-300)",
                                                    border: isComplete ? "none" : `2px solid ${isCurrent ? "var(--color-sage-600)" : "var(--color-sage-100)"}`,
                                                }}
                                            >
                                                {isComplete ? "✓" : i + 1}
                                            </button>
                                            <span className="ml-2 text-xs hidden sm:block" style={{ color: isCurrent ? "var(--color-sage-600)" : isComplete ? "var(--color-sage-500)" : "var(--color-sage-300)", fontWeight: isCurrent ? 500 : 400 }}>
                  {label}
                </span>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="text-xs mb-6 sm:hidden font-medium" style={{ color: "var(--color-sage-600)" }}>
                                Step {stepIndex + 1} of {STEPS.length} · {currentStep.label}
                            </div>
                            <div className="hidden sm:block sm:mb-8" />

                            <form onSubmit={handleSubmit}>
                                {currentStep.key === "account" && (
                                    <div className="rounded-2xl border p-4 sm:p-5 space-y-4" style={{ borderColor: "var(--color-sage-100)", background: "#fff" }}>
                                        <h2 className="text-sm font-semibold" style={{ color: "var(--color-sage-700)" }}>
                                            Account &amp; personal details
                                        </h2>

                                        <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--color-sage-500)" }}>
                                                Full name
                                            </label>
                                            <input type="text" value={data.step0.name} onChange={(e) => setData("step0.name", e.target.value)} placeholder="Enter your name" className={inputClasses} style={inputColorStyle(!!errors['step0.name'])} required/>
                                            <Error message={errors['step0.name']} />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--color-sage-500)" }}>
                                                    Email
                                                </label>
                                                <input type="email" value={data.step0.email} onChange={(e) => setData("step0.email", e.target.value)} placeholder="myemail@example.com" className={inputClasses} style={inputColorStyle(!!errors['step0.email'])} required />
                                                <span style={{"fontSize" : "1rem"}} className="text-amber-600">Please use your professional email (e.g. your nhs email). This is important during verification process.</span>
                                                <Error message={errors['step0.email']} />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--color-sage-500)" }}>
                                                    Phone
                                                </label>
                                                <input type="tel" value={data.step0.phone} onChange={(e) => setData("step0.phone", e.target.value)} placeholder="07123 456789" className={inputClasses} style={inputColorStyle(!!errors['step0.phone'])} required autoComplete="phone"/>
                                                <Error message={errors['step0.phone']} />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--color-sage-500)" }}>
                                                    Date of Birth
                                                </label>
                                                <input type="date" value={data.step0.date_of_birth} onChange={(e) => setData("step0.date_of_birth", e.target.value)} className={inputClasses} style={inputColorStyle(!!errors['step0.date_of_birth'])} required/>
                                                <Error message={errors['step0.date_of_birth']} />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--color-sage-500)" }}>
                                                    Gender
                                                </label>
                                                <select value={data.step0.gender} onChange={(e) => setData("step0.gender", e.target.value)} className={inputClasses} style={inputColorStyle(!!errors['step0.gender'])} required>
                                                    <option value="">Select…</option>
                                                    {enumToArray(genders).map((g:any) => (
                                                        <option key={g.value} value={g.value}>
                                                            {g.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                <Error message={errors['step0.gender']} />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--color-sage-500)" }}>
                                                    Password
                                                </label>
                                                <input type="password" value={data.step0.password} onChange={(e) => setData("step0.password", e.target.value)} placeholder="At least 8 characters" className={inputClasses} style={inputColorStyle(!!errors['step0.phone'])} autoComplete="current-password" required/>
                                                <Error message={errors['step0.password']} />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--color-sage-500)" }}>
                                                    Confirm Password
                                                </label>
                                                <input type="password" value={data.step0.password_confirmation} onChange={(e) => setData("step0.password_confirmation", e.target.value)} placeholder="Re-enter password" className={inputClasses} style={inputColorStyle(!!errors['step0.phone'])} autoComplete="password_confirmation" required/>
                                                <Error message={errors['step0.password_confirmation']} />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--color-sage-500)" }}>
                                                City
                                            </label>
                                            <input type="text" value={data.step0.city} onChange={(e) => setData("step0.city", e.target.value)} placeholder="Enter city" className={inputClasses} style={inputColorStyle(!!errors['step0.city'])} autoComplete="city" required/>
                                            <Error message={errors['step0.city']} />
                                        </div>
                                            <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--color-sage-500)" }}>
                                                Post code
                                            </label>
                                            <input type="text" value={data.step0.post_code} onChange={(e) => setData("step0.post_code", e.target.value)} placeholder="e.g. SB2 3DG" className={inputClasses} style={inputColorStyle(!!errors['step0.post_code'])} />
                                            <Error message={errors['step0.post_code']} />
                                        </div>
                                        </div>

                                        <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--color-sage-500)" }}>
                                                Address
                                            </label>
                                            <textarea value={data.step0.address} onChange={(e) => setData("step0.address", e.target.value)} rows={2} placeholder="eg. Street, city, county" className={`${inputClasses} resize-none`} style={inputColorStyle(!!errors['step0.address'])} />
                                            <Error message={errors['step0.address']} />
                                        </div>

                                    </div>
                                )}

                                {currentStep.key === "professional" && (
                                    <div className="rounded-2xl border p-4 sm:p-5 space-y-4" style={{ borderColor: "var(--color-sage-100)", background: "#fff" }}>
                                        <h2 className="text-sm font-semibold text-sage-700">
                                            Professional details
                                        </h2>
                                        <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--color-sage-500)" }}>
                                                Professional title
                                            </label>
                                            <select value={data.step1.professional_title} onChange={(e) => setData("step1.professional_title", e.target.value)} className={inputClasses} style={inputColorStyle(!!errors['step1.professional_title'])} required>
                                                <option value="">Select…</option>
                                                {enumToArray(profTitles).map((t:any) => (
                                                    <option key={t.value} value={t.value}>
                                                        {t.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <Error message={errors['step1.professional_title']} />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--color-sage-500)" }}>
                                                Regulator
                                            </label>
                                            <select value={data.step1.regulator} onChange={(e) => setData("step1.regulator", e.target.value)} className={inputClasses} style={inputColorStyle(!!errors['step0.gender'])} required>
                                                <option value="">Select…</option>
                                                {enumToArray(regulators).map((r:any) => (
                                                    <option key={r.value} value={r.value}>
                                                        {r.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <p className="text-[11px] font-light mt-1.5 text-sage-600">
                                                We'll check your registration status with your regulator.
                                            </p>
                                            <Error message={errors['step1.registration_number']} />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--color-sage-500)" }}>
                                                Registration number
                                            </label>
                                            <input type="text" value={data.step1.registration_number} onChange={(e) => setData("step1.registration_number", e.target.value)} placeholder="e.g. DH113DG" className={inputClasses} style={inputColorStyle(!!errors['step1.registration_number'])} />
                                            <Error message={errors['step1.registration_number']} />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--color-sage-500)" }}>
                                                Practice name
                                            </label>
                                            <input type="text" value={data.step1.practice_name} onChange={(e) => setData("step1.practice_name", e.target.value)} placeholder="e.g. ABC Nutrition Clinic" className={inputClasses} style={inputColorStyle(!!errors['step1.practice_name'])}  required/>
                                            <Error message={errors['step1.practice_name']} />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--color-sage-500)" }}>
                                                Country of practice
                                            </label>
                                            <select value={data.step1.country_of_practice} onChange={(e) => setData("step1.country_of_practice", e.target.value)} className={inputClasses} style={inputColorStyle(!!errors['step1.country_of_practice'])} required>
                                                <option value="">Select…</option>
                                                {enumToArray(countries).map((t:any) => (
                                                    <option key={t.value} value={t.value}>
                                                        {t.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <Error message={errors['step1.country_of_practice']} />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--color-sage-500)" }}>
                                                Website Link (Optional)
                                            </label>
                                            <input type="text" value={data.step1.website} onChange={(e) => setData("step1.website", e.target.value)} placeholder="e.g. https://abc.com" className={inputClasses} style={inputColorStyle(!!errors['step0.phone'])} autoComplete="website" />
                                            <Error message={errors['step1.website']} />
                                        </div>
                                    </div>
                                )}

                                {currentStep.key === "documents" && (
                                    <div className="rounded-2xl border p-4 sm:p-5" style={{ borderColor: "var(--color-sage-100)", background: "#fff" }}>
                                        <h2 className="text-sm font-semibold mb-1" style={{ color: "var(--color-sage-700)" }}>
                                            Document upload
                                        </h2>
                                        <p className="text-[11px] font-light mb-4 text-sage-400">
                                            All documents must be certified copies (e.g. stamped by a solicitor, GP, or notary).
                                        </p>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--color-sage-500)" }}>
                                                    Proof of Identity
                                                </label>
                                                <select value={data.step2.proof_of_identity} onChange={(e) => setData("step2.proof_of_identity", e.target.value)} className={inputClasses} style={inputColorStyle(!!errors['step2.proof_of_identity'])} required>
                                                    <option value="">Select…</option>
                                                    {enumToArray(proofOfIdentitiesList).map((p:any) => (
                                                        <option key={p.value} value={p.value}>
                                                            {p.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                <Error message={errors['step2.proof_of_identity']} />
                                            </div>
                                            <FileUploadField  icon="🧑" label="Proof of identity" description="Certified copy of a passport, driver's licence or national identity card" file={data.step2.proof_of_identity_file} error={errors['step2.proof_of_identity_file']}  onChange={(file: any) => setData('step2.proof_of_identity_file', file)} />
                                            <FileUploadField  icon="📄" label="Proof of address" description="Certified copy of a recent utility bill or bank statement" file={data.step2.proof_of_address} error={errors['step2.proof_of_address']}  onChange={(file: any) => setData('step2.proof_of_address', file)} />
                                            <FileUploadField  icon="🎓" label="Qualification certificate" description="Certified copy of your professional qualification certificate" file={data.step2.qualification_certificate} error={errors['step2.qualification_certificate']}  onChange={(file: any) => setData('step2.qualification_certificate', file)} />
                                        </div>
                                    </div>
                                )}

                                {currentStep.key === "review" && (
                                    <div className="space-y-4">
                                        <div className="rounded-2xl border p-4 sm:p-5" style={{ borderColor: "var(--color-sage-100)", background: "#fff" }}>
                                            <div className="flex items-center justify-between mb-3">
                                                <h2 className="text-sm font-semibold" style={{ color: "var(--color-sage-700)" }}>
                                                    Account &amp; personal details
                                                </h2>
                                                <button type="button" onClick={() => goToStep(0)} className="text-xs font-medium" style={{ color: "var(--color-sage-500)" }}>
                                                    Edit
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                                <ReviewRow label="Name" value={data.step0.name} />
                                                <ReviewRow label="Email" value={data.step0.email} />
                                                <ReviewRow label="Phone" value={data.step0.phone} />
                                                <ReviewRow label="Date of birth" value={data.step0.date_of_birth} />
                                                <ReviewRow label="Gender" value={data.step0.gender} />
                                                <ReviewRow label="City" value={data.step0.city} />
                                                <ReviewRow label="Post code" value={data.step0.post_code} />
                                                <ReviewRow label="Address" value={data.step0.address}  />
                                            </div>
                                        </div>

                                        <div className="rounded-2xl border p-4 sm:p-5" style={{ borderColor: "var(--color-sage-100)", background: "#fff" }}>
                                            <div className="flex items-center justify-between mb-3">
                                                <h2 className="text-sm font-semibold" style={{ color: "var(--color-sage-700)" }}>
                                                    Professional details
                                                </h2>
                                                <button type="button" onClick={() => goToStep(1)} className="text-xs font-medium" style={{ color: "var(--color-sage-500)" }}>
                                                    Edit
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                                <ReviewRow label="Professional title" value={data.step1.professional_title} />
                                                <ReviewRow label="Regulator" value={data.step1.regulator} />
                                                <ReviewRow label="Registration Number" value={data.step1.registration_number}  />
                                                <ReviewRow label="Practice name" value={data.step1.practice_name}  />
                                                <ReviewRow label="Country Practiced" value={data.step1.country_of_practice}  />
                                                <ReviewRow label="Website" value={data.step1.website}  />

                                            </div>
                                        </div>

                                        <div className="rounded-2xl border p-4 sm:p-5" style={{ borderColor: "var(--color-sage-100)", background: "#fff" }}>
                                            <div className="flex items-center justify-between mb-3">
                                                <h2 className="text-sm font-semibold" style={{ color: "var(--color-sage-700)" }}>
                                                    Documents
                                                </h2>
                                                <button type="button" onClick={() => goToStep(2)} className="text-xs font-medium" style={{ color: "var(--color-sage-500)" }}>
                                                    Edit
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <div key="proof_of_identity_file" className="rounded-xl border p-3 flex items-center gap-3" style={{ borderColor: "var(--color-sage-200)", background: "var(--color-sage-50)" }}>
                                                    <span className="text-lg shrink-0">🧑</span>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-xs font-medium truncate" style={{ color: "var(--color-sage-700)" }}>
                                                            {data.step2.proof_of_identity_file ? '' : 'Not uploaded'}
                                                            {/*{file ? file?.name : "Not uploaded"}*/}
                                                        </div>
                                                        <div className="text-[11px] font-light" style={{ color: "var(--color-sage-400)" }}>
                                                            Certified copy of a passport, driver's licence or national identity card
                                                        </div>
                                                    </div>
                                                    {data.step2.proof_of_identity_file && (
                                                        <span className="text-sm shrink-0" style={{ color: "var(--color-sage-400)" }}>
                                                                    ✓
                                                            </span>
                                                    )}
                                                </div>
                                                <div key="proof_of_address" className="rounded-xl border p-3 flex items-center gap-3" style={{ borderColor: "var(--color-sage-200)", background: "var(--color-sage-50)" }}>
                                                    <span className="text-lg shrink-0">📄</span>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-xs font-medium truncate" style={{ color: "var(--color-sage-700)" }}>
                                                            {data.step2.proof_of_address ? '' : 'Not uploaded'}
                                                            {/*{file ? file?.name : "Not uploaded"}*/}
                                                        </div>
                                                        <div className="text-[11px] font-light" style={{ color: "var(--color-sage-400)" }}>
                                                            Certified copy of a recent utility bill or bank statement
                                                        </div>
                                                    </div>
                                                    {data.step2.proof_of_address && (
                                                        <span className="text-sm shrink-0" style={{ color: "var(--color-sage-400)" }}>
                                                                    ✓
                                                            </span>
                                                    )}
                                                </div>
                                                <div key="qualification_certificate" className="rounded-xl border p-3 flex items-center gap-3" style={{ borderColor: "var(--color-sage-200)", background: "var(--color-sage-50)" }}>
                                                    <span className="text-lg shrink-0">🎓</span>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-xs font-medium truncate" style={{ color: "var(--color-sage-700)" }}>
                                                            {data.step2.qualification_certificate ? '' : 'Not uploaded'}
                                                            {/*{file ? file?.name : "Not uploaded"}*/}
                                                        </div>
                                                        <div className="text-[11px] font-light" style={{ color: "var(--color-sage-400)" }}>
                                                            Certified copy of your professional qualification certificate
                                                        </div>
                                                    </div>
                                                    {data.step2.qualification_certificate && (
                                                        <span className="text-sm shrink-0" style={{ color: "var(--color-sage-400)" }}>
                                                                    ✓
                                                            </span>
                                                    )}
                                                </div>

                                            </div>
                                        </div>

                                        <label className="flex items-start gap-3 rounded-xl px-4 py-3 cursor-pointer" style={{ background: "var(--color-sage-50)" }}>
                                            <input
                                                type="checkbox"
                                                checked={data.confirm_accuracy}
                                                onChange={(e) => {
                                                    setData("confirm_accuracy", e.target.checked);
                                                    // setError((p: any) => ({ ...p, confirm_accuracy: undefined }));
                                                }}
                                                className="mt-0.5 shrink-0"
                                            />

                                            <span className="text-sm" style={{ color: "var(--color-sage-700)" }}>
                  I confirm the information provided is accurate and the documents uploaded are certified true copies.
                </span>
                                        </label>
                                        {errors.confirm_accuracy && (
                                            <p className="text-[11px] -mt-2" style={{ color: "#dc2626" }}>
                                                {errors.confirm_accuracy}
                                            </p>
                                        )}
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-2 mt-5">
                                    {stepIndex > 0 && (
                                        <button type="button" onClick={goBack} className="border text-sm font-medium px-4 sm:px-5 py-2.5 rounded-full text-sage-700" style={{ borderColor: "var(--color-sage-200)",  background: "#fff" }}>
                                            ← Back
                                        </button>
                                    )}
                                    <div className="flex-1" />
                                    {currentStep.key !== "review" ? (
                                        <button type="button" onClick={goNext} className="text-sm cursor-pointer font-medium px-4 sm:px-5 py-2.5 rounded-full" style={{ background: "var(--color-sage-600)", color: "#fff" }}>
                                            Continue →
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="text-sm font-medium cursor-pointer px-4 sm:px-5 py-2.5 rounded-full bg-sage-600"
                                            style={{ color: "#fff", opacity: processing ? 0.6 : 1, cursor: processing ? "default" : "pointer" }}
                                        >
                                            {processing ? "Submitting…" : "Submit for verification"}
                                        </button>


                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }


            { authModal && <MarketingModal initialTab={authModal} onClose={() => setAuthModal(undefined)} /> }

            {showStt && (
                <button className="stt-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>↑</button>
            )}

        </div>
    );

}
