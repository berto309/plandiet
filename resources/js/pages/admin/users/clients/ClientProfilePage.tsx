import React from 'react';
import AdminPortalLayout from "@/layouts/Portals/AdminPortalLayout";
import {Crumb} from "@/types/types";
import {LayoutDashboard, User, Users} from "lucide-react";
import AdminDashboardController from "@/actions/App/Http/Controllers/Analytics/Admin/AdminDashboardController";
import {Breadcrumbs} from "@/components/Menu/Breadcrumbs";
import {Head, usePage} from "@inertiajs/react";
import ClientsOverviewController from "@/actions/App/Http/Controllers/Analytics/Client/ClientsOverviewController";
import {formatDate, getAge, initials} from "@/lib/utils";
import EmptyState from "@/components/State/EmptyState";
import {isCritical, isHigh, isLow, isMedium, isSoft} from "@/types/enums";
import NutritionRulesCard from "@/components/Card/NutritionRulesCard";

const ClientProfilePage = () => {

    const BREADCRUMBS: Crumb[] = [
        {label: "Dashboard", icon: LayoutDashboard, href: AdminDashboardController.url()},
        {label: "Clients", icon: Users, href: ClientsOverviewController.index.url()},
        {label: "Client Profile", icon: User}
    ];

    const {client} = usePage().props

    return (
        <AdminPortalLayout>
            <Head title="Client Profile"/>

            <Breadcrumbs items={BREADCRUMBS}/>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h2 className="font-serif text-3xl text-emerald-950 sm:text-4xl">
                        Client Profile
                    </h2>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-emerald-700/80">
                        View client's personal details, dietary preferences, and active nutrition plans managed through
                        the platform.
                    </p>
                </div>


            </div>

            <div className="md:grid-cols-2 gap-[1.2rem] grid-cols-1">
                <div>
                    <div className="card">
                        <div className="ch"><span className="ct">Client profile</span></div>
                        <div className="cb">
                            <div style={{"textAlign":"center", "marginBottom":"1rem"}}>
                                <div className="w-[52px] h-[52px] rounded-[50%] text-[#fff] font-[1.3rem] flex items-center justify-center" style={{"background":"var(--sage)","margin":"0 auto .6rem"}}>{initials(client.name)}</div>
                                <div className="text-[var(--dark)]" style={{"fontWeight":"500"}}>{client.name}</div>
                                <div className="capitalize" style={{"fontSize":"1rem", "color": "var(--muted)"}}>{client.date_of_birth && <span className="capitalize">{getAge(client.date_of_birth)} ·</span>} {client.gender}</div>
                                <div className="mt-[0.4rem]"> <span className={`badge bg-gray-100 text-gray-700 uppercase`}>{client.status}</span></div>
                            </div>
                            <div className="prow"><span className="pk">Email</span><span
                                className="pv">{client.email}</span></div>
                            <div className="prow"><span className="pk">Enrolled</span><span
                                className="pv">{formatDate(client.created_at)}</span></div>
                            <div className="prow"><span className="pk">Goal</span><span
                                className="pv">{client.client_health_profile?.primary_goal}</span></div>
                            <div className="prow"><span className="pk">Conditions</span><span
                                className="pv warn">{client.client_health_profile?.conditions?.join(' · ')}</span></div>
                            <div className="prow"><span className="pk">Allergies</span><span className="pv bad">{client.client_health_profile?.allergies?.join(' · ')}</span>
                            </div>
                            <div className="prow"><span className="pk">Dietary preferences</span><span className="pv bad">{client.client_health_profile?.dietary_preferences?.join(' · ')}</span>
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
                    <NutritionRulesCard client={client} />
                </div>
            </div>



        </AdminPortalLayout>
    );
};

export default ClientProfilePage;
