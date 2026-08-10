import React, {useEffect, useState} from 'react';
import {Crumb, NutritionRule} from "@/types/types";
import {LayoutDashboard, Save, TestTubeDiagonal, User, Users} from "lucide-react";
import AdminDashboardController from "@/actions/App/Http/Controllers/Analytics/Admin/AdminDashboardController";
import {Head, Link, router, useForm, usePage} from "@inertiajs/react";
import {Breadcrumbs} from "@/components/Menu/Breadcrumbs";
import {
    getOperatorTranslation,
    isBreakfast,
    isCritical, isDinner,
    isHigh,
    isLow,
    isLunch,
    isMedium,
    isSnack,
    isSoft
} from "@/types/enums";
import {useToast} from "@/context/ToastContext";
import ViewSandbox from "@/actions/App/Http/Controllers/Tools/Sandbox/ViewSandbox";
import PractitionerPortalLayout from "@/layouts/Portals/PractitionerPortalLayout";
import EmptyState from "@/components/State/EmptyState";
import RunSandboxController from "@/actions/App/Http/Controllers/Tools/Sandbox/RunSandboxController";
import {splitRecipeStepsToArray} from "@/lib/utils";
import ViewSandboxResults from "@/actions/App/Http/Controllers/Tools/Sandbox/ViewSandboxResults";

const SandboxPage = () => {

    const BREADCRUMBS: Crumb[] = [
        {label: "Dashboard", icon: LayoutDashboard, href: AdminDashboardController.url()},
        {label: "Sandbox", icon: TestTubeDiagonal},
    ];

    const {practitionerClientsList, clientNutritionRulesList, sandboxTest} = usePage().props
    const toast = useToast()
    const {data, processing, post, setData, errors} = useForm({
        client_id: ''
    })

    const [showMore, setShowMore] = useState<undefined | number>(undefined);


    function getClientNutritionRules( e: React.ChangeEvent<HTMLSelectElement>)
    {

        setData('client_id', e.target.value)

        router.reload({
            data: {client_id: e.target.value},
            only: ['clientNutritionRulesList'],
            preserveUrl: true
        })


    }

    function runSandbox(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        post(RunSandboxController.url(), {
            preserveScroll: true,
            preserveState: true,
            only: ['sandboxTest'],
            onSuccess: () => {
                toast.success('Sandbox run successfully')
            },
            onError: (errors) => {
                console.error(errors)
                const firstError = Object.values(errors)[0]
                toast.error(typeof firstError === 'string' ? firstError : 'Something went wrong')
            },
        })
    }


    return (
        <PractitionerPortalLayout>
            <Head title="Sandbox"/>

            <Breadcrumbs items={BREADCRUMBS}/>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h2 className="font-serif text-3xl text-emerald-950 sm:text-4xl">
                        Sandbox
                    </h2>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-emerald-700/80">
                        A testing space for practitioners to trial and refine nutrition rules for
                        client use.
                    </p>
                </div>

                <Link href={ViewSandboxResults.url()}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 focus:ring-offset-stone-100">
                   All Sandbox results →
                </Link>
            </div>


            <div className="grid xl:grid-cols-2 gap-5">
                <form onSubmit={runSandbox}>
                    <div className="space-y-4">
                        <div className="bg-white rounded-2xl border border-sage-100 p-5">
                            <h2 className="text-sm font-semibold text-sage-700 mb-4">Client List</h2>
                            <div className="space-y-3">
                                <div><label
                                    className="block text-xs font-semibold text-sage-500 uppercase tracking-wider mb-1.5">Select client</label>
                                    <select onChange={getClientNutritionRules}
                                            className="w-full border border-sage-200 rounded-xl px-3 py-2.5 text-sm bg-cream text-sage-800" required>
                                        <option value="">Select</option>
                                        {practitionerClientsList.map((pcl: any) => (
                                            <option key={pcl.user.id} value={pcl.user.id}>{pcl.user.name} {pcl.user.client_health_profile?.conditions?.length > 0 ?  `-` : ''}  {pcl.user.client_health_profile.conditions?.join(' · ') }</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl border border-sage-100 overflow-hidden">
                            <div className="px-5 py-3 border-b border-sage-100 text-sm font-medium text-sage-700">Rules to
                                test
                                {clientNutritionRulesList && <span className="ml-1">
                                 ({ clientNutritionRulesList.filter(rl => rl.is_active).length } active + { clientNutritionRulesList.filter(rl => !rl.is_active).length } draft)
                            </span>
                                }
                            </div>
                            <div className="p-3 space-y-2">
                                {clientNutritionRulesList && clientNutritionRulesList.length > 0 ? (
                                    clientNutritionRulesList.map((rule: NutritionRule) => (
                                        <div key={rule.id} className={`flex items-center gap-2 ${rule.is_active ? 'bg-sage-50' : ''} rounded-xl px-3 py-2.5 text-xs`}><span
                                            className="font-mono text-sage-600 flex-1">{rule.nutrient} <span className="uppercase">{getOperatorTranslation(rule.operator)}</span> {rule.value}{rule.unit}</span>
                                            {isSoft(rule.constraint_type) ? <span title="constraint type" className="cursor-pointer badge bg-green-100 text-green-700 capitalize">{rule.constraint_type}</span> : <span title="constraint type" className="badge bg-red-100 text-red-700 capitalize">{rule.constraint_type}</span>}

                                            {isCritical(rule.priority) &&  <span title="priority" className="cursor-pointer badge bg-red-100 text-red-700 capitalize">{rule.priority}</span>}
                                            {isHigh(rule.priority) &&  <span title="priority" className="cursor-pointer badge bg-yellow-100 text-yellow-700 capitalize">{rule.priority}</span>}
                                            {isMedium(rule.priority) &&  <span title="priority" className="cursor-pointer badge bg-blue-100 text-blue-700 capitalize">{rule.priority}</span>}
                                            {isLow(rule.priority) &&  <span title="priority" className="cursor-pointer badge bg-gray-100 text-gray-700 capitalize">{rule.priority}</span>}
                                        </div>
                                    ))
                                ) : <EmptyState emptyTitle="No nutrition rules." />}
                            </div>
                        </div>
                        <button  type="submit" disabled={processing}
                                className={`${processing ? 'opacity-70' : 'opacity-100'} cursor-pointer w-full bg-sage-600 text-white font-medium py-3 rounded-xl hover:bg-sage-500 transition-all text-sm flex items-center justify-center gap-2`}>▶
                            Run sandbox test
                        </button>
                    </div>
                </form>
                <div className="bg-white rounded-2xl border border-sage-100 overflow-hidden">
                    <div className="px-5 py-4 border-b border-sage-100 flex items-center justify-between">
                        <span className="font-medium text-sage-800 text-sm">Test results</span>
                    </div>
                    {!sandboxTest ? (
                       processing ? (
                           <div className="h-full p-5 grid place-items-center">
                               <span className="font-medium text-green-800 text-sm">Fetching test results...</span>
                           </div>
                       ) : (
                           <div className="h-full grid place-items-center">
                               <span className="font-medium text-green-800 text-sm">Sandbox test results appear here.</span>
                           </div>

                       )
                    ): sandboxTest && (
                        <div className="p-5">
                            <div className="grid grid-cols-3 gap-3 mb-4">
                                <div className="bg-sage-50 rounded-xl p-3 text-center">
                                    <div className="font-display text-2xl text-sage-600">{sandboxTest.pass_count}</div>
                                    <div className="text-xs text-sage-400 uppercase tracking-wider mt-1">Passed</div>
                                </div>
                                <div className="bg-red-50 rounded-xl p-3 text-center">
                                    <div className="font-display text-2xl text-red-500">{sandboxTest.fail_count}</div>
                                    <div className="text-xs text-sage-400 uppercase tracking-wider mt-1">Rejected</div>
                                </div>
                                <div className="bg-amber-50 rounded-xl p-3 text-center">
                                    <div className="font-display text-2xl text-amber-500">{sandboxTest.results.near_misses.length}</div>
                                    <div className="text-xs text-sage-400 uppercase tracking-wider mt-1">Near-miss</div>
                                </div>
                            </div>
                            {/*<div*/}
                            {/*    className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 mb-4">⚠*/}
                            {/*    The new 500mg rule rejects 2 previously-safe meals. Consider relaxing to 550mg.*/}
                            {/*</div>*/}
                            <div className="space-y-2">
                                {sandboxTest.results.meals.map((meal,i) => (
                                    <div className="border border-sage-100 rounded-xl overflow-hidden">
                                        <button
                                            className="w-full cursor-pointer flex items-center gap-3 p-3 hover:bg-sage-50 text-left"
                                            onClick={() => setShowMore(showMore === i ? undefined : i)}>
                                            <div
                                                className="w-7 h-7 bg-amber-100 rounded-lg flex items-center justify-center text-sm flex-shrink-0">
                                                {isBreakfast(meal.meal_type) && <span>🌅</span>}
                                                {isLunch(meal.meal_type) && <span>☀️</span>}
                                                {isSnack(meal.meal_type) && <span>🍎</span>}
                                                {isDinner(meal.meal_type) && <span>🌙</span>}
                                            </div>
                                            <div className="flex-1 space-y-1 text-sm text-sage-800">
                                                <div
                                                    className="text-xs text-sage-400 uppercase tracking-wider font-medium">{meal.meal_type}
                                                </div>
                                                {meal.name}</div>
                                            <span className="badge bg-sage-100 text-sage-700">Pass</span>
                                        </button>
                                        <div className={`${showMore === i ? 'block' : 'hidden'} expand-content mt-3 space-y-3 animate-fade-in`}>
                                            <div>
                                                <div
                                                    className="text-xs font-semibold text-sage-400 uppercase tracking-wider mb-1 pl-3">Why chosen
                                                </div>
                                                <p className="text-xs text-sage-600 font-light px-3 py-1">{meal.why_chosen}</p>
                                            </div>
                                            <div>
                                                <div
                                                    className="text-xs font-semibold text-sage-400 uppercase tracking-wider mb-1 pl-3">Ingredients
                                                </div>
                                                <p className="text-xs text-sage-600 font-light px-3 py-1">{meal.ingredients}</p>
                                            </div>
                                            <div>
                                                <div
                                                    className="text-xs font-semibold text-sage-400 uppercase tracking-wider mb-1 pl-3">Recipe
                                                </div>
                                                {splitRecipeStepsToArray(meal.recipe_steps).map((step,i) => (
                                                    <p key={i} className="text-xs text-sage-600 font-light px-3 py-1">{i + 1}. {step}</p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    )}


                </div>
            </div>

        </PractitionerPortalLayout>
    );
};

export default SandboxPage;
