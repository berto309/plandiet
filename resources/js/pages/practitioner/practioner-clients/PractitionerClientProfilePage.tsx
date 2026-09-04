import React, {useState} from 'react';
import {Crumb} from "@/types/types";
import {Calendar, LayoutDashboard, User, Users} from "lucide-react";
import AdminDashboardController from "@/actions/App/Http/Controllers/Analytics/Admin/AdminDashboardController";
import {Breadcrumbs} from "@/components/Menu/Breadcrumbs";
import {Head, Link, useForm, usePage} from "@inertiajs/react";
import {formatDate, getAge, initials} from "@/lib/utils";
import PractitionerClientController from "@/actions/App/Http/Controllers/Users/PractitionerClientController";
import ConfirmModal, {ConfirmModalConfig} from "@/components/Modal/ConfirmModal";
import Error from "@/components/Notifications/Error";
import {useToast} from "@/context/ToastContext";
import PractitionerPortalLayout from "@/layouts/Portals/PractitionerPortalLayout";
import NutritionRulesCard from "@/components/Card/NutritionRulesCard";


const PractitionerClientProfilePage = () => {

    const BREADCRUMBS: Crumb[] = [
        {label: "Dashboard", icon: LayoutDashboard, href: AdminDashboardController.url()},
        {label: "Clients", icon: Users, href: PractitionerClientController.index.url()},
        {label: "Client Profile", icon: User}
    ];

    const {client} = usePage().props
    const toast = useToast()
    const [confirmNextReviewDateModal, setConfirmNextReviewDateModal] = useState<ConfirmModalConfig | null>(null)

    const {data, put, processing, errors, setData} = useForm({
        'next_review_date' : client.practitioner_client?.next_review_date
    })

    const openSetNextReviewDateModal = (e: React.MouseEvent<HTMLButtonElement>) => {


        setConfirmNextReviewDateModal({
            title: "Set next review date",
            confirmLabel: "Yes, update",
            processing: processing,
            danger: false,
        })
    }


    function setNextReviewDate() {
        put(PractitionerClientController.updateClientNextReviewDate.url(client.id), {
            onSuccess: () => {
                setConfirmNextReviewDateModal(null)
                toast.success('Verification updated')
            }}
        )
    }

    return (
        <PractitionerPortalLayout>
            <Head title="Client Profile"/>

            <Breadcrumbs items={BREADCRUMBS}/>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h2 className="font-serif text-3xl text-emerald-950 sm:text-4xl">
                        Client Profile
                    </h2>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-emerald-700/80">
                        View client's personal and nutrition details. To make changes to client profile click on <Link className="hover:underline" href={PractitionerClientController.edit.url(client.id)}><b>Edit →</b></Link>
                    </p>
                </div>

                <button
                      onClick={openSetNextReviewDateModal}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 focus:ring-offset-stone-100">
                    Next review date <Calendar size={14}/>
                </button>


            </div>

            <div className="md:grid-cols-2 gap-[1.2rem] grid-cols-1">
                <div>
                    <div className="card">
                        <div className="ch">
                            <span className="ct">Client profile</span>
                            <Link href={PractitionerClientController.edit.url(client.id)}
                                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-800 px-5 py-2 text-xs font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 focus:ring-offset-stone-100">
                                Edit →
                            </Link>
                        </div>
                        <div className="cb">
                            <div style={{"textAlign":"center", "marginBottom":"1rem"}}>
                                <div className="w-[52px] h-[52px] rounded-[50%] text-[#fff] font-[1.3rem] flex items-center justify-center" style={{"background":"var(--sage)","margin":"0 auto .6rem"}}>{initials(client.name)}</div>
                                <div className="text-[var(--dark)]" style={{"fontWeight":"500"}}>{client.name}</div>
                                <div className="capitalize" style={{"fontSize":"1rem", "color": "var(--muted)"}}>{client.date_of_birth && <span className="capitalize">{getAge(client.date_of_birth)} ·</span>} {client.gender}</div>
                                <div className="mt-[0.4rem]"> <span className={`badge bg-gray-100 text-gray-700 uppercase`}>{client.status}</span></div>
                            </div>
                            <div className="prow"><span className="pk">Email</span><span
                                className="pv">{client.email}</span></div>
                            <div className="prow"><span className="pk">Next review date</span><span
                                className="pv">{client.practitioner_client?.next_review_date ? formatDate(client.practitioner_client?.next_review_date) : ''}</span></div>
                            <div className="prow"><span className="pk">Enrolled</span><span
                                className="pv">{formatDate(client.created_at)}</span></div>
                            <div className="prow"><span className="pk">Goal</span><span
                                className="pv">{client.client_health_profile?.primary_goal}</span></div>
                            <div className="prow"><span className="pk">Conditions</span><span
                                className="pv warn">{client.client_health_profile?.conditions?.join(' · ')}</span></div>
                            <div className="prow"><span className="pk">Allergies</span><span className="pv bad">{client.client_health_profile?.allergies?.join(' · ')}</span>
                            </div>
                            <div className="prow"><span className="pk">Dietary preferences</span><span className="pv bad">{client.client_health_profile?.dietary_preferences?.length > 0 && client.client_health_profile?.dietary_preferences?.join(' · ')}</span>
                            </div>


                        </div>
                    </div>

                        <div className="card">
                            <div className="ch"><span className="ct">Clinical notes</span></div>
                            <div className="cb">
                                <div style={{"fontSize":".8rem", "color":"var(--text)", "lineHeight": "1.6", "fontWeight":"300"}}>
                                    {client.practitioner_client?.clinical_notes}
                                </div>
                                <Link href={PractitionerClientController.edit.url(client.id) + '#clinical_notes'} className="btn btn-outline text-center mt-[0.7rem] w-full justify-center block">Manage notes
                                </Link>
                            </div>
                        </div>

                </div>

                <div>

                    {/*Nutrition RULES SUMMARY */}
                    <NutritionRulesCard client={client} />
                </div>
            </div>


            <ConfirmModal
                config={confirmNextReviewDateModal}
                onCancel={() => setConfirmNextReviewDateModal(null)}
                onConfirm={setNextReviewDate}
            >
                <label htmlFor="next_review_date" className="block">
                    <input type="datetime-local" value={data.next_review_date}  onChange={(e) => setData('next_review_date', e.target.value)} id="operator" className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm placeholder-stone-400 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20" required />
                    <div style={{"fontSize" : "0.8rem"}} className="text-sage-500">Client will be notified of next review date</div>
                    <Error message={errors.next_review_date} />
                </label>
            </ConfirmModal>
        </PractitionerPortalLayout>
    );
};

export default PractitionerClientProfilePage;
