import React from 'react';
import {Crumb} from "@/types/types";
import {LayoutDashboard, User} from "lucide-react";
import AdminDashboardController from "@/actions/App/Http/Controllers/Analytics/Admin/AdminDashboardController";
import {Breadcrumbs} from "@/components/Menu/Breadcrumbs";
import {Head, Link, usePage} from "@inertiajs/react";
import {formatDate, getAge, initials} from "@/lib/utils";
import NutritionRulesCard from "@/components/Card/NutritionRulesCard";
import ClientPortalLayout from "@/layouts/Portals/ClientPortalLayout";
import ClientProfileController from "@/actions/App/Http/Controllers/Users/ClientProfileController";

const ClientAccountProfilePage = () => {

    const BREADCRUMBS: Crumb[] = [
        {label: "Dashboard", icon: LayoutDashboard, href: AdminDashboardController.url()},
        {label: "Profile", icon: User}
    ];

    const {auth} = usePage().props

    return (
        <ClientPortalLayout>
            <Head title="My Profile"/>

            <Breadcrumbs items={BREADCRUMBS}/>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h2 className="font-serif text-3xl text-emerald-950 sm:text-4xl">
                         Profile
                    </h2>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-emerald-700/80">
                        View your personal information here. To update your profile or change password click on the <Link className="hover:underline" href={ClientProfileController.edit.url()}><b>Edit →</b></Link>
                    </p>
                </div>


            </div>

            <div className="md:grid-cols-2 gap-[1.2rem] grid-cols-1">
                <div>
                    <div className="card">
                        <div className="ch">
                            <span className="ct">Client profile</span>
                            <Link href={ClientProfileController.edit.url()}
                                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-800 px-5 py-2 text-xs font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 focus:ring-offset-stone-100">
                                Edit →
                            </Link>
                        </div>
                        <div className="cb">
                            <div style={{"textAlign":"center", "marginBottom":"1rem"}}>
                                <div className="w-13 h-13 rounded-[50%] text-white font-[1.3rem] flex items-center justify-center" style={{"background":"var(--sage)","margin":"0 auto .6rem"}}>{initials(auth.user.name)}</div>
                                <div className="text-(--dark)" style={{"fontWeight":"500"}}>{auth.user.name}</div>
                                <div className="capitalize" style={{"fontSize":"1rem", "color": "var(--muted)"}}>{auth.user.date_of_birth && <span className="capitalize">{getAge(auth.user.date_of_birth)} ·</span>} {auth.user.gender}</div>
                                <div className="mt-[0.4rem]"> <span className={`badge bg-gray-100 text-gray-700 uppercase`}>{auth.user.status}</span></div>
                            </div>
                            <div className="prow"><span className="pk">Email</span><span
                                className="pv">{auth.user.email}</span></div>
                            <div className="prow"><span className="pk">Enrolled</span><span
                                className="pv">{formatDate(auth.user.created_at)}</span></div>
                            <div className="prow"><span className="pk">Goal</span><span
                                className="pv">{auth.user.client_health_profile?.primary_goal}</span></div>
                            <div className="prow"><span className="pk">Conditions</span><span
                                className="pv warn">{auth.user.client_health_profile?.conditions?.join(' · ')}</span></div>
                            <div className="prow"><span className="pk">Allergies</span><span className="pv bad">{auth.user.client_health_profile?.allergies?.join(' · ')}</span>
                            </div>
                            <div className="prow"><span className="pk">Dietary preferences</span><span className="pv bad">{auth.user.client_health_profile?.dietary_preferences?.join(' · ')}</span>
                            </div>


                        </div>
                    </div>
                    {/*<div className="card">*/}
                    {/*    <div className="ch"><span className="ct">Clinical notes</span><span*/}
                    {/*        className="badge b-info">Private</span></div>*/}
                    {/*    <div className="cb">*/}
                    {/*        <div style={{"fontSize":".8rem", "color":"var(--text)", "lineHeight": "1.6", "fontWeight":"300"}}>T2DM*/}
                    {/*            diagnosed 2019. Currently on Metformin 500mg BD. Weight loss target: 8kg over 6 months.*/}
                    {/*            Patient motivated and engaged. Watch HbA1c at next appointment.*/}
                    {/*        </div>*/}
                    {/*        <button className="btn btn-outline mt-[0.7rem] w-full justify-center block">Edit notes*/}
                    {/*        </button>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>

                <div>

                    {/*Nutrition RULES SUMMARY */}
                    <NutritionRulesCard client={auth.user} />
                </div>
            </div>


        </ClientPortalLayout>
    );
};

export default ClientAccountProfilePage;
