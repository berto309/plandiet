import React, {ReactNode, useEffect, useState} from "react";

import {Head, router, usePage} from "@inertiajs/react";
import {ChartSpline, LayoutDashboard, User} from "lucide-react";
import {Breadcrumbs} from "@/components/Menu/Breadcrumbs";
import {Crumb, MealPlanItem} from "@/types/types";
import ClientDashboardController from "@/actions/App/Http/Controllers/Analytics/Client/ClientDashboardController";
import PractitionerPortalLayout from "@/layouts/Portals/PractitionerPortalLayout";
import PractitionerComplianceController
    from "@/actions/App/Http/Controllers/Tools/Compliance/PractitionerComplianceController";
import {formatDate, getCurrentDateISO, initials, sum} from "@/lib/utils";
import {isBreakfast, isLunch, isSnack, isVerified} from "@/types/enums";
import EmptyState from "@/components/State/EmptyState";
import {useToast} from "@/context/ToastContext";


export default function PractitionerClientCompliancePage(): ReactNode {

    const { client, clientComplianceTargets, mealHistory, clientStreak} = usePage().props
    const BREADCRUMBS: Crumb[] = [
        { label: "Dashboard", icon: LayoutDashboard, href: ClientDashboardController.url() },
        { label: "Compliance", icon: ChartSpline, href: PractitionerComplianceController.index.url()},
        { label: "Client", icon: User}
    ];


    const toast = useToast()
    const [date, setDate] = useState(getCurrentDateISO)
    const [processing, setProcessing] = useState(false)
    function filterByDate(e: any) {

        let removeStartEventListener = router.on("start", (event) => {
            setProcessing(true)
        });

        let removeFinishEventListener =  router.on("finish", (event) => {
            setProcessing(false)
        });



        router.reload({
            data: {date: e.target.value},

            preserveUrl: true
        })


    }





    return (
        <PractitionerPortalLayout>
            <Head title="Client Compliance" />
            <Breadcrumbs items={BREADCRUMBS}/>

            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h2 className="font-serif text-3xl text-emerald-950 sm:text-4xl">
                        Client Compliance
                    </h2>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-emerald-700/80">
                        View all compliance details of your client
                    </p>
                </div>

            </div>


            <div className="grid lg:grid-cols-2 gap-5">
                <div className="bg-white rounded-2xl border border-sage-100 p-4">
                    <div className="text-sm font-medium text-sage-700 mb-3">Client</div>
                    <div className="flex items-center gap-3 mb-3">
                        <div
                            className="w-10 h-10 rounded-full bg-sage-500 text-white font-display text-lg flex items-center justify-center shrink-0">
                            {initials(client.name)}
                        </div>
                        <div>
                            <div className="text-sm font-medium text-sage-800">{client.name}</div>
                            <div className="text-xs text-sage-400 font-light">{client.client_health_profile.conditions.join(' · ')}</div>
                            <div className="text-xs text-sage-500 mt-0.5"><a href={`mailto:${client.email}`} target="_blank" title="Mail client">{client.email}</a></div>
                            <div className="text-xs text-sage-500 mt-0.5">{clientStreak >= 7 &&  <span className="text-sm font-medium text-sage-700 mb-3">{clientStreak}-day clientStreak 🔥</span>}</div>
                            <div className="text-xs text-sage-500 mt-0.5">{clientStreak > 0 && <span className="text-sm font-medium text-sage-700 mb-3">Client is on streak {clientStreak}</span>}</div>
                        </div>
                    </div>
                    {client.practitioner_client.next_review_date && <p className="text-xs text-sage-400 font-light">Next review: <strong className="text-sage-600">{formatDate(client.practitioner_client?.next_review_date)}</strong></p>}
                </div>
                <div className="bg-white rounded-2xl border border-sage-100 overflow-hidden">
                    <div className="px-5 py-4 border-b border-sage-100 font-medium text-sage-800 text-sm">Nutrition compliance
                    </div>
                    <div className="p-4 space-y-3">
                        <div>
                            <div className="flex justify-between text-xs mb-1"><span className="text-sage-700">Calories</span><span
                                className="font-medium text-sage-600">{clientComplianceTargets.calories}%</span></div>
                            <div className="comp-bar">
                                <div className="comp-fill bg-sage-500" style={{width: `${clientComplianceTargets.calories}%`}}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs mb-1"><span className="text-sage-700">Protein</span><span
                                className="font-medium text-sage-600">{clientComplianceTargets.protein_g}%</span></div>
                            <div className="comp-bar">
                                <div className="comp-fill bg-sage-500" style={{width: `${clientComplianceTargets.protein_g}%`}}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs mb-1"><span className="text-sage-700">Carbohydrate</span><span
                                className="font-medium text-amber-600">{clientComplianceTargets.carbs_g}%</span></div>
                            <div className="comp-bar">
                                <div className="comp-fill bg-amber-500" style={{width: `${clientComplianceTargets.carbs_g}%`}}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs mb-1"><span className="text-sage-700">Fibre</span><span
                                className="font-medium text-blue-600">{clientComplianceTargets.fibre_g}%</span></div>
                            <div className="comp-bar">
                                <div className="comp-fill bg-blue-400" style={{width: `${clientComplianceTargets.fibre_g}%`}}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs mb-1"><span className="text-sage-700">Sodium </span><span
                                className="font-medium text-pink-600">{clientComplianceTargets.sodium_mg}%</span></div>
                            <div className="comp-bar">
                                <div className="comp-fill bg-pink-400" style={{width: `${clientComplianceTargets.sodium_mg}%`}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="font-display text-lg sm:text-xl text-sage-900 my-4">Meal History</h2>

            <div className="grid lg:grid-cols-3 gap-5">
                <div>
                    <div className="bg-white rounded-2xl border border-sage-100 overflow-hidden mb-4">
                        <div className="px-4 py-3 border-b border-sage-100 flex items-center justify-between">
                            <span className="font-medium text-sage-800 text-sm">Filter by date</span>
                        </div>
                        <div className="p-3">
                            <input value={date} onChange={filterByDate} type="date"  className="w-full rounded-lg border px-3.5 py-2.5 text-sm text-stone-900 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20" />
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-2">
                    <div className="bg-sage-900 rounded-2xl p-4 grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4 text-center">
                        <div>
                            <div className="font-display text-xl text-sage-300">{sum(mealHistory, "calories").toLocaleString()}</div>
                            <div className="text-xs text-sage-500 uppercase tracking-wider mt-0.5">kcal</div>
                        </div>
                        <div>
                            <div className="font-display text-xl text-sage-300">{sum(mealHistory, "protein_g").toLocaleString()}g</div>
                            <div className="text-xs text-sage-500 uppercase tracking-wider mt-0.5">protein</div>
                        </div>
                        <div>
                            <div className="font-display text-xl text-sage-300">{sum(mealHistory, "carbs_g").toLocaleString()}g</div>
                            <div className="text-xs text-sage-500 uppercase tracking-wider mt-0.5">carbs</div>
                        </div>
                        <div className="hidden sm:block">
                            <div className="font-display text-xl text-sage-300">{sum(mealHistory, "fibre_g").toLocaleString()}g</div>
                            <div className="text-xs text-sage-500 uppercase tracking-wider mt-0.5">fibre</div>
                        </div>
                        <div className="hidden sm:block">
                            <div className="font-display text-xl text-sage-300">{sum(mealHistory, "sodium_mg").toLocaleString()}mg</div>
                            <div className="text-xs text-sage-500 uppercase tracking-wider mt-0.5">sodium</div>
                        </div>
                    </div>
                    <div className="space-y-3">

                        {processing ? (
                            <EmptyState emptyTitle="Loading..." />
                        ) : (
                            <>
                                {mealHistory.length > 0 && (

                                    <>
                                        {mealHistory.map((meal: MealPlanItem) => {
                                            if (isBreakfast(meal.meal_type)) {
                                                return (

                                                    <div
                                                        key={meal.id}
                                                        className="bg-white rounded-2xl border border-sage-100 p-4 flex items-center gap-3 hover-lift">
                                                        <div
                                                            className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center text-lg shrink-0">🌅
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="text-xs text-sage-400 font-light uppercase tracking-wider">{meal.meal_type}
                                                            </div>
                                                            <div className="text-sm font-medium text-sage-800 truncate">{meal.name}
                                                            </div>
                                                            {meal.was_swapped && (
                                                                <div className="flex gap-1.5 mt-1"><span
                                                                    className="badge bg-purple-100 text-purple-700 text-xs px-2">Swapped</span></div>
                                                            )}
                                                        </div>
                                                        <div className="text-right shrink-0">
                                                            <div className="text-amber-400 text-sm">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <span key={i}>
                                                                         {i < meal.rating ? "★" : "☆"}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                            <div className="text-xs text-sage-400">{meal.rating}/5</div>
                                                        </div>
                                                    </div>
                                                );

                                            }

                                            if(isLunch(meal.meal_type))
                                                return (
                                                    <div
                                                        key={meal.id}
                                                        className="bg-white rounded-2xl border border-sage-100 p-4 flex items-center gap-3 hover-lift">
                                                        <div
                                                            className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center text-lg shrink-0">☀️
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="text-xs text-sage-400 font-light uppercase tracking-wider">{meal.meal_type}</div>
                                                            <div className="text-sm font-medium text-sage-800 truncate">{meal.name}
                                                            </div>
                                                            {meal.was_swapped && (
                                                                <div className="flex gap-1.5 mt-1"><span
                                                                    className="badge bg-purple-100 text-purple-700 text-xs px-2">Swapped</span></div>
                                                            )}
                                                        </div>
                                                        <div className="text-right shrink-0">
                                                            <div className="text-amber-400 text-sm">
                                                                <div className="text-amber-400 text-sm">
                                                                    {[...Array(5)].map((_, i) => (
                                                                        <span key={i}>
                                                                         {i < meal.rating ? "★" : "☆"}
                                                                    </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <div className="text-xs text-sage-400">{meal.rating}/5</div>
                                                        </div>
                                                    </div>
                                                );


                                            if(isSnack(meal.meal_type))
                                                return (
                                                    <div
                                                        key={meal.id}
                                                        className="bg-white rounded-2xl border border-sage-100 p-4 flex items-center gap-3 hover-lift">
                                                        <div
                                                            className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center text-lg shrink-0">🍎
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="text-xs text-sage-400 font-light uppercase tracking-wider">{meal.meal_type}</div>
                                                            <div className="text-sm font-medium text-sage-800 truncate">{meal.name}
                                                            </div>
                                                            {meal.was_swapped && (
                                                                <div className="flex gap-1.5 mt-1"><span
                                                                    className="badge bg-purple-100 text-purple-700 text-xs px-2">Swapped</span></div>
                                                            )}
                                                        </div>
                                                        <div className="text-right shrink-0">
                                                            <div className="text-amber-400 text-sm">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <span key={i}>
                                                                         {i < meal.rating ? "★" : "☆"}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                            <div className="text-xs text-sage-400">{meal.rating}/5</div>
                                                        </div>
                                                    </div>
                                                );

                                            return (

                                                <div
                                                    key={meal.id}
                                                    className="bg-white rounded-2xl border border-sage-100 p-4 flex items-center gap-3 hover-lift">
                                                    <div
                                                        className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center text-lg flex-shrink-0">🌙
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-xs text-sage-400 font-light uppercase tracking-wider">Dinner</div>
                                                        <div className="text-sm font-medium text-sage-800 truncate">{meal.name}
                                                        </div>
                                                        {meal.was_swapped && (
                                                            <div className="flex gap-1.5 mt-1"><span
                                                                className="badge bg-purple-100 text-purple-700 text-xs px-2">Swapped</span></div>
                                                        )}
                                                    </div>
                                                    <div className="text-right shrink-0">
                                                        <div className="text-amber-400 text-sm">
                                                            {[...Array(5)].map((_, i) => (
                                                                <span key={i}>
                                                                         {i < meal.rating ? "★" : "☆"}
                                                                    </span>
                                                            ))}
                                                        </div>
                                                        <div className="text-xs text-sage-400">{meal.rating}/5</div>
                                                    </div>
                                                </div>
                                            );

                                        })}
                                    </>


                                )}

                                {mealHistory.length == 0 && <div className="bg-white rounded-2xl border border-sage-100 p-4">
                                    <EmptyState emptyTitle="No meals generated on this day"/>
                                </div>}
                            </>
                        )}
                    </div>
                </div>
            </div>



        </PractitionerPortalLayout>
    );
}
