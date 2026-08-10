import React, {useEffect, useState} from 'react';
import {Crumb, Media} from "@/types/types";
import {LayoutDashboard, Save, User, Users} from "lucide-react";
import AdminDashboardController from "@/actions/App/Http/Controllers/Analytics/Admin/AdminDashboardController";
import PractitionersManagementController from "@/actions/App/Http/Controllers/Users/PractitionersManagementController";
import {Head, useForm, usePage} from "@inertiajs/react";
import AdminPortalLayout from "@/layouts/Portals/AdminPortalLayout";
import {Breadcrumbs} from "@/components/Menu/Breadcrumbs";
import {enumToArray, formatDate, getAge, initials} from "@/lib/utils";
import {isHCPC, isRejected, isSuspended, isVerified} from "@/types/enums";
import ConfirmModal, {ConfirmModalConfig, IconType} from "@/components/Modal/ConfirmModal";
import {useToast} from "@/context/ToastContext";
import Error from "@/components/Notifications/Error";
import EmptyState from "@/components/State/EmptyState";

const PractitionerProfilePage = () => {

    const BREADCRUMBS: Crumb[] = [
        {label: "Dashboard", icon: LayoutDashboard, href: AdminDashboardController.url()},
        {label: "Practitioners", icon: Users, href: PractitionersManagementController.index.url()},
        {label: "Practitioner Profile", icon: User}
    ];

    const {practitioner, flash, verificationStatuses} = usePage().props
    const toast = useToast()
    const {data, processing, put, setData, errors} = useForm({
        verification_status: '',
        rejection_reason: '',
        suspension_reason: ''
    })

    const [confirmVerificationModal, setConfirmVerificationModal] = useState<ConfirmModalConfig | null>(null)
    const [showRejectionReason, setShowRejectionReason] = useState(false)
    const [showSuspensionReason, setShowSuspensionReason] = useState(false)


    useEffect(() => {
        if(isRejected(data.verification_status)){
            setShowRejectionReason(true)
        } else {
            setShowRejectionReason(false)
        }

        if(isSuspended(data.verification_status)){
            setShowSuspensionReason(true)
        } else {
            setShowSuspensionReason(false)
        }


    }, [data.verification_status]);

    function updateVerificationStatus(){
        put(PractitionersManagementController.updateVerificationStatus.url(practitioner.id), {
            onSuccess: () => {
                console.log(flash)
                setConfirmVerificationModal(null)
                toast.success('Verification updated')
            }}
        )
    }
    const openVerifyPractitionerModal = (e: React.MouseEvent<HTMLButtonElement>) => {

        setData('verification_status', practitioner.practitioner_profile.verification_status)

        setConfirmVerificationModal({
            title: "Update Practitioner Status",
            confirmLabel: "Yes, update",
            processing: processing,
            danger: false,
        })
    }


    return (
            <AdminPortalLayout>
            <Head title="Practitioner Profile"/>

            <Breadcrumbs items={BREADCRUMBS}/>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h2 className="font-serif text-3xl text-emerald-950 sm:text-4xl">
                        Practitioner Profile
                    </h2>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-emerald-700/80">
                        View practitioner's personal details, credentials etc on the platform.
                    </p>
                </div>

                <button onClick={openVerifyPractitionerModal}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-medium text-white cursor-pointer shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 focus:ring-offset-stone-100">
                    <Save size={18} />
                    Update verification status
                </button>
            </div>

            <div className="prac-detail-layout">
                <div>
                    {/*PROFILE CARD */}
                    <div className="card">
                        <div className="ch"><span className="ct">Practitioner profile</span></div>
                        <div className="cb">
                            <div className="text-center mb-[1rem]">
                                <div style={{"textAlign":"center", "marginBottom":"1rem"}}>
                                    <div className="w-[52px] h-[52px] rounded-[50%] text-[#fff] font-[1.3rem] flex items-center justify-center" style={{"background":"var(--sage)","margin":"0 auto .6rem"}}>{initials(practitioner.name)}</div>
                                    <div className="text-[var(--dark)]" style={{"fontWeight":"500"}}>{practitioner.name}</div>
                                    <div className="capitalize" style={{"fontSize":"1rem", "color": "var(--muted)"}}>{practitioner.date_of_birth && <span className="capitalize">{getAge(practitioner.date_of_birth)} · </span>}
                                        {isVerified(practitioner.practitioner_profile.verification_status) ?
                                            <span className="badge bg-emerald-100 text-emerald-700 uppercase">{practitioner.practitioner_profile.verification_status}</span> :
                                            <span className="badge bg-red-100 text-red-700 uppercase">{practitioner.practitioner_profile.verification_status}</span>
                                        }
                                    </div>
                                    <div className="mt-[0.4rem]"> </div>
                                </div>
                            <div className="prow"><span className="pk">Email</span><span
                                className="pv">{practitioner.email}</span></div>
                            <div className="prow"><span className="pk">Status</span><span
                                className="pv ok capitalize">{practitioner.status}</span></div>
                            <div className="prow"><span className="pk">Date of birth</span>{practitioner.date_of_birth && <span className="pv">{formatDate(practitioner.date_of_birth)}</span>}
                            </div>
                            <div className="prow"><span className="pk">Gender</span><span className="pv capitalize">{practitioner.gender}</span>
                            </div>
                        </div>
                    </div>


                </div>
                    {/*CONTACT & WEB */}
                    <div className="card">
                        <div className="ch"><span className="ct">Contact & web</span></div>
                        <div className="cb">
                            <div className="prow">
                                <span className="pk">Website</span><span className="pv">
                                    <a href={practitioner.practitioner_profile.website} style={{ "color":"var(--sage)", "textDecoration":"none"}}>{practitioner.practitioner_profile.website}</a>
                                </span>
                            </div>
                            <div className="prow"><span className="pk">Email</span><span
                                className="pv">{practitioner.email}</span></div>
                            <div className="prow"><span className="pk">Phone</span><span
                                className="pv">{practitioner.phone}</span></div>
                            <div className="prow"><span className="pk">Address</span><span
                                className="pv">{practitioner.address} {practitioner.post_code}, {practitioner.city}</span></div>
                            {/*<div className="prow"><span className="pk">Clients managed</span><span*/}
                            {/*    className="pv">34</span></div>*/}
                            {/*<div className="prow"><span className="pk">Templates in use</span><span*/}
                            {/*    className="pv">12</span></div>*/}
                        </div>
                    </div>
                    <div>
                        {/*CREDENTIALS */}
                            <div className="card">
                                <div className="ch"><span className="ct">Credentials & registration</span><span
                                    className="badge b-info">{practitioner.practitioner_profile.regulator}</span></div>
                                <div className="cb">
                                    <div className="info-grid">
                                        <div className="prow"><span className="pk">Professional title</span><span
                                            className="pv">{practitioner.practitioner_profile.professional_title}</span></div>
                                        <div className="prow"><span className="pk">Credential type</span><span
                                            className="pv">{practitioner.practitioner_profile.credential_type}</span></div>
                                        <div className="prow"><span className="pk">Registration number</span><span
                                            className="pv">{practitioner.practitioner_profile.registration_number}</span></div>
                                        <div className="prow"><span className="pk">Regulator</span><span
                                            className="pv">{practitioner.practitioner_profile.regulator}</span></div>
                                        <div className="prow"><span className="pk">Country of practice</span><span
                                            className="pv">{practitioner.practitioner_profile.country_of_practice}</span></div>
                                        <div className="prow"><span className="pk">Practice name</span><span className="pv">{practitioner.practitioner_profile.practice_name}</span>
                                        </div>
                                    </div>
                                    {
                                        isHCPC(practitioner.practitioner_profile.regulator) ?
                                            <a href="https://www.hcpc-uk.org/check-the-register/" target="_blank" className="btn btn-outline mt-[0.7rem] w-full justify-center block text-center">Check HCPC Register
                                            </a>
                                            :
                                            <a href="https://www.associationfornutrition.org/register/search-the-register" target="_blank" className="btn btn-outline mt-[0.7rem] w-full justify-center block text-center">Check AfN Register
                                            </a>
                                    }
                                </div>

                            </div>

                        <div>

                             {/*Document upload */}
                            <div className="card">
                                <div className="ch"><span className="ct">Documents uploaded</span></div>
                                <div className="cb">
                                    {practitioner.practitioner_documents?.length > 0 ? (
                                        <div className="grid sm:grid-cols-2 gap-3">
                                            {practitioner.practitioner_documents.map((doc: Media) => (
                                                <div
                                                    className="border border-sage-200 rounded-xl p-3 bg-sage-50 flex items-center gap-3">
                                                    <span className="text-lg">📄</span>
                                                    <div className="flex-1 min-w-0">
                                                        <div
                                                            className="text-xs font-medium text-sage-700 truncate">{doc.file_name}</div>
                                                        <div className="text-[13px] text-sage-400">
                                                            {doc.collection_name}
                                                        </div>
                                                    </div>
                                                    <a href={doc.original_url} target="_blank" className="text-sage-500 text-xs hover:underline">View</a>
                                                </div>
                                            ))}
                                        </div>
                                    ) : <EmptyState emptyTitle="No documents uploaded" />
                                    }
                                </div>
                            </div>


                    {/*VERIFICATION CARD */}
                    <div className="card">
                        <div className="ch"><span className="ct">Verification</span></div>
                        <div className="cb">

                            { isVerified(practitioner.practitioner_profile.verification_status) && (
                                <>
                                    <div className="verify-banner vb-ok">
                                        <div className="vb-icon">✓</div>
                                        <div>
                                            <div className="vb-title">Verified</div>
                                            <div className="vb-sub">Credentials confirmed with regulator</div>
                                        </div>
                                    </div>
                                    <div className="prow mt-[0.9rem]"><span className="pk">Date</span><span
                                        className="pv">{formatDate(practitioner.practitioner_profile.verified_at)}</span>
                                    </div>
                                    <div className="prow"><span className="pk">Updated by</span><span className="pv">{practitioner.practitioner_profile.verified_by?.name}</span>
                                    </div>
                                </>
                            )}


                            <div className="prow"><span className="pk">Verification status</span><span
                                className="pv capitalize">{practitioner.practitioner_profile?.verification_status}</span></div>
                            {practitioner.practitioner_profile.rejection_reason &&
                                <>
                                    <div className="prow"><span className="pk">Rejection reason</span></div>
                                    <div className="bio-text mt-3">{practitioner.practitioner_profile.rejection_reason}</div>
                                </>
                            }
                            {practitioner.practitioner_profile.suspension_reason &&
                                <>
                                    <div className="prow"><span className="pk">Suspension reason</span></div>
                                    <div className="bio-text mt-3">{practitioner.practitioner_profile.suspension_reason}</div>
                                </>
                            }

                        </div>
                    </div>
                </div>

                     {/*BIO */}
                    <div className="card">
                        <div className="ch"><span className="ct">Bio</span></div>
                        <div className="cb">
                            <div className="bio-text">{practitioner.practitioner_profile.bio}
                            </div>
                            {/*<button className="btn btn-outline mt-[0.7rem] w-full justify-center block">Edit bio*/}
                            {/*</button>*/}
                        </div>
                    </div>


                </div>
            </div>

            </div>

        <ConfirmModal
            config={confirmVerificationModal}
            onCancel={() => setConfirmVerificationModal(null)}
            onConfirm={updateVerificationStatus}
        >
            <label htmlFor="operator" className="block">

                <select value={data.verification_status}  onChange={(e) => setData('verification_status', e.target.value)} id="operator" className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20" required>
                    <option value="">Select</option>
                    {enumToArray(verificationStatuses).map((op: any) => (
                        <option key={op.value} value={op.value}>{op.label}</option>
                    ))}
                </select>
                <div className="text-sm text-gray-500 my-1">Updating status will notify the practitioner about status update via email. </div>
                <Error message={errors.verification_status} />
            </label>
            {showRejectionReason && <label htmlFor="rejection_reason" className="block mt-4">
                       <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                          Rejection reason
                        </span>
                <textarea value={data.rejection_reason} id="rejection_reason" onChange={(e) => setData('rejection_reason', e.target.value)} className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"></textarea>
                <Error message={errors.rejection_reason} />
            </label>}
            {showSuspensionReason && <label htmlFor="suspension_reason" className="block mt-4">
                       <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                          Suspension reason
                        </span>
                <textarea value={data.suspension_reason} id="suspension_reason" onChange={(e) => setData('suspension_reason', e.target.value)} className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"></textarea>
                <Error message={errors.suspension_reason} />
            </label>}
        </ConfirmModal>


        </AdminPortalLayout>
    );
};

export default PractitionerProfilePage;
