import React from 'react';
import {Crumb, Media} from "@/types/types";
import {LayoutDashboard, Save, User, Users} from "lucide-react";
import {Head, Link, useForm, usePage} from "@inertiajs/react";
import {Breadcrumbs} from "@/components/Menu/Breadcrumbs";
import {formatDate, getAge, initials} from "@/lib/utils";
import {isVerified} from "@/types/enums";
import EmptyState from "@/components/State/EmptyState";
import PractitionerDashboardController
    from "@/actions/App/Http/Controllers/Analytics/Practitioner/PractitionerDashboardController";
import PractitionerProfileController from "@/actions/App/Http/Controllers/Users/PractitionerProfileController";
import PractitionerPortalLayout from "@/layouts/Portals/PractitionerPortalLayout";

const PractitionerProfilePage = () => {

    const BREADCRUMBS: Crumb[] = [
        {label: "Dashboard", icon: LayoutDashboard, href: PractitionerDashboardController.url()},
        {label: "Profile", icon: User}
    ];

    const {auth} = usePage().props







    return (
        <PractitionerPortalLayout>
            <Head title="Practitioner Profile"/>

            <Breadcrumbs items={BREADCRUMBS}/>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h2 className="font-serif text-3xl text-emerald-950 sm:text-4xl">
                        Practitioner Profile
                    </h2>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-emerald-700/80">
                        View  personal details, credentials etc on the platform. To update your profile or change password click on the <Link className="hover:underline" href={PractitionerProfileController.edit.url()}><b>Edit →</b></Link>
                    </p>
                </div>

            </div>

            <div className="prac-detail-layout">
                <div>
                    {/*PROFILE CARD */}
                    <div className="card">
                        <div className="ch">
                            <span className="ct">Profile</span>
                            <Link href={PractitionerProfileController.edit.url()}
                                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-800 px-5 py-2 text-xs font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 focus:ring-offset-stone-100">
                                Edit →
                            </Link>
                        </div>
                        <div className="cb">
                            <div className="text-center mb-4">
                                <div style={{"textAlign":"center", "marginBottom":"1rem"}}>
                                    <div className="w-13 h-13 rounded-[50%] text-white font-[1.3rem] flex items-center justify-center" style={{"background":"var(--sage)","margin":"0 auto .6rem"}}>{initials(auth.user.name)}</div>
                                    <div className="text-(--dark)" style={{"fontWeight":"500"}}>{auth.user.name}</div>
                                    <div className="capitalize" style={{"fontSize":"1rem", "color": "var(--muted)"}}>{auth.user.date_of_birth && <span className="capitalize">{getAge(auth.user.date_of_birth)} · </span>}
                                        {isVerified(auth.user.practitioner_profile.verification_status) ?
                                            <span className="badge bg-emerald-100 text-emerald-700 uppercase">{auth.user.practitioner_profile.verification_status}</span> :
                                            <span className="badge bg-red-100 text-red-700 uppercase">{auth.user.practitioner_profile.verification_status}</span>
                                        }
                                    </div>
                                    <div className="mt-[0.4rem]"> </div>
                                </div>
                                <div className="prow"><span className="pk">Email</span><span
                                    className="pv">{auth.user.email}</span></div>
                                <div className="prow"><span className="pk">Status</span><span
                                    className="pv ok capitalize">{auth.user.status}</span></div>
                                <div className="prow"><span className="pk">Date of birth</span>{auth.user.date_of_birth && <span className="pv">{formatDate(auth.user.date_of_birth)}</span>}
                                </div>
                                <div className="prow"><span className="pk">Gender</span><span className="pv capitalize">{auth.user.gender}</span>
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
                                    <a href={auth.user.practitioner_profile.website} style={{ "color":"var(--sage)", "textDecoration":"none"}}>{auth.user.practitioner_profile.website}</a>
                                </span>
                            </div>
                            <div className="prow"><span className="pk">Email</span><span
                                className="pv">{auth.user.email}</span></div>
                            <div className="prow"><span className="pk">Phone</span><span
                                className="pv">{auth.user.phone}</span></div>
                            <div className="prow"><span className="pk">Address</span><span
                                className="pv">{auth.user.address} {auth.user.post_code}, {auth.user.city}</span></div>
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
                                className="badge b-info">{auth.user.practitioner_profile.regulator}</span></div>
                            <div className="cb">
                                <div className="info-grid">
                                    <div className="prow"><span className="pk">Professional title</span><span
                                        className="pv">{auth.user.practitioner_profile.professional_title}</span></div>
                                    <div className="prow"><span className="pk">Credential type</span><span
                                        className="pv">{auth.user.practitioner_profile.credential_type}</span></div>
                                    <div className="prow"><span className="pk">Registration number</span><span
                                        className="pv">{auth.user.practitioner_profile.registration_number}</span></div>
                                    <div className="prow"><span className="pk">Regulator</span><span
                                        className="pv">{auth.user.practitioner_profile.regulator}</span></div>
                                    <div className="prow"><span className="pk">Country of practice</span><span
                                        className="pv">{auth.user.practitioner_profile.country_of_practice}</span></div>
                                    <div className="prow"><span className="pk">Practice name</span><span className="pv">{auth.user.practitioner_profile.practice_name}</span>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div>

                            {/*Document upload */}
                            <div className="card">
                                <div className="ch"><span className="ct">Documents uploaded</span></div>
                                <div className="cb">
                                    {auth.user.practitioner_documents?.length > 0 ? (
                                        <div className="grid sm:grid-cols-2 gap-3">
                                            {auth.user.practitioner_documents.map((doc: Media) => (
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

                                    { isVerified(auth.user.practitioner_profile.verification_status) && (
                                        <>
                                            <div className="verify-banner vb-ok">
                                                <div className="vb-icon">✓</div>
                                                <div>
                                                    <div className="vb-title">Verified</div>
                                                    <div className="vb-sub">Credentials confirmed with regulator</div>
                                                </div>
                                            </div>
                                            <div className="prow mt-[0.9rem]"><span className="pk">Date</span><span
                                                className="pv">{formatDate(auth.user.practitioner_profile.verified_at)}</span>
                                            </div>
                                            <div className="prow"><span className="pk">Updated by</span><span className="pv">{auth.user.practitioner_profile.verified_by?.name}</span>
                                            </div>
                                        </>
                                    )}


                                    <div className="prow"><span className="pk">Verification status</span><span
                                        className="pv capitalize">{auth.user.practitioner_profile?.verification_status}</span></div>
                                    {auth.user.practitioner_profile.rejection_reason &&
                                        <>
                                            <div className="prow"><span className="pk">Rejection reason</span></div>
                                            <div className="bio-text mt-3">{auth.user.practitioner_profile.rejection_reason}</div>
                                        </>
                                    }
                                    {auth.user.practitioner_profile.suspension_reason &&
                                        <>
                                            <div className="prow"><span className="pk">Suspension reason</span></div>
                                            <div className="bio-text mt-3">{auth.user.practitioner_profile.suspension_reason}</div>
                                        </>
                                    }

                                </div>
                            </div>
                        </div>

                        {/*BIO */}
                        <div className="card">
                            <div className="ch"><span className="ct">Bio</span></div>
                            <div className="cb">
                                <div className="bio-text">{auth.user.practitioner_profile.bio}
                                </div>
                                {/*<button className="btn btn-outline mt-[0.7rem] w-full justify-center block">Edit bio*/}
                                {/*</button>*/}
                            </div>
                        </div>


                    </div>
                </div>

            </div>



        </PractitionerPortalLayout>
    );
};

export default PractitionerProfilePage;
