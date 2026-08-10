import React, {ReactNode, useEffect, useState} from "react";

import {Head, useForm, usePage} from "@inertiajs/react";
import { LayoutDashboard} from "lucide-react";
import {Breadcrumbs} from "@/components/Menu/Breadcrumbs";
import {Crumb, MealPlanItem, NutritionRule} from "@/types/types";
import ClientPortalLayout from "@/layouts/Portals/ClientPortalLayout";
import {formatDate, getDatePlusDay, initials, splitRecipeStepsToArray} from "@/lib/utils";
import EmptyState from "@/components/State/EmptyState";
import {isBreakfast, isDinner, isLunch, isSnack, isVerified} from "@/types/enums";
import {useToast} from "@/context/ToastContext";
import MealPlanController from "@/actions/App/Http/Controllers/Meal/MealPlanController";
import MealRatingController from "@/actions/App/Http/Controllers/Meal/MealRatingController";
import ConfirmModal, {ConfirmModalConfig} from "@/components/Modal/ConfirmModal";
import MealSwapController from "@/actions/App/Http/Controllers/Meal/MealSwapController";




export default function ClientDashboardPage(): ReactNode {

    const { auth, client_dashboard_analytics } = usePage().props
    const BREADCRUMBS: Crumb[] = [
        { label: "Dashboard", icon: LayoutDashboard },
    ];

    const [mealType, setMealType] = useState('all')
    const [showMore, setShowMore] = useState<undefined | number>(undefined);
    const [selectedMeal, setSelectedMeal] = useState<MealPlanItem>();
    const [confirmVerificationModal, setConfirmSwapMealModal] = useState<ConfirmModalConfig | null>(null)


    const filteredMeals =
        client_dashboard_analytics.meals.filter(meal =>
            mealType === "all" ? true : meal.meal_type === mealType
        );


    const toast = useToast()
    const [rating, setRating] = useState(0)
    const {data, processing, post, setData, errors} = useForm({
    })

    const rateForm = useForm({
        rating: 0
    })

    const mealSwapForm = useForm({
        meal_id: ''
    })



    function toggleMealCard(id: number) {
        setShowMore(showMore === id ? undefined : id)
    }

    function openSwapModal(meal: MealPlanItem) {

        setSelectedMeal(meal)

        setConfirmSwapMealModal({
            title: `Swap ${meal.meal_type}`,
            confirmLabel: "Yes, swap",
            processing: false,
            danger: false,
            maxWidth: 'lg'
        })
    }

    function rateMeal(meal: number, rating: number) {

        rateForm.setData('rating', rating)

        rateForm.put(MealRatingController.url(meal), {
            onError: (errors) => {
                const firstError = Object.values(errors)[0]
                toast.error(typeof firstError === 'string' ? firstError : 'Something went wrong')
            }
        })
    }



    function confirmSwap() {


        mealSwapForm.put(MealSwapController.url(selectedMeal?.id!),{
            onSuccess: () => {
                toast.success('Meal plan generated successfully')
            },
            onError: (errors) => {
                const firstError = Object.values(errors)[0]
                toast.error(typeof firstError === 'string' ? firstError : 'Something went wrong')
            },
        })

    }


    function generateMealPlan(e: any) {
        e.preventDefault()

        if(auth.user.client_health_profile === null){
            toast.info('Please complete your health profile with practitioner before generating a meal plan.')
            return;
        }

        post(MealPlanController.url(),{
            onSuccess: () => {
                toast.success('Meal plan generated successfully')
            },
            onError: (errors) => {
                const firstError = Object.values(errors)[0]
                toast.error(typeof firstError === 'string' ? firstError : 'Something went wrong')
            },
        })
    }

    return (
        <ClientPortalLayout>
            <Head title="My Account" />
            <Breadcrumbs items={BREADCRUMBS}/>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                <div>
                    <div className="flex items-center gap-2 mb-1 text-xs text-sage-400 font-light">{filteredMeals.length > 0 && <span
                        className={`w-1.5 h-1.5 bg-sage-400 rounded-full  animate-pulse'`}></span>} {getDatePlusDay()}
                    </div>
                    <h1 className="font-display text-2xl sm:text-3xl text-sage-900">Your daily meal plan</h1>
                    {client_dashboard_analytics.meals.length > 0 && <p className="text-sm text-sage-400 font-light mt-1">{client_dashboard_analytics.meals.length} meals · all rules verified by {client_dashboard_analytics.practitioner.name}</p>}
                </div>
                <form onSubmit={generateMealPlan}>
                    <button id="clientGenBtn"
                            type="submit"
                            disabled={processing}
                            className={`${processing ? 'opacity-75' : 'opacity-100'} cursor-pointer bg-sage-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-sage-500 transition-all flex items-center gap-2 self-start`}>
                        {processing ? 'Generating meal plan' : 'Generate meal plan'}
                    </button>
                </form>
            </div>


            {/*Nutrition strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
                <div className="bg-white rounded-2xl p-3.5 border border-sage-100">
                    <div className="text-xs text-sage-400 uppercase tracking-wider font-medium mb-1">Calories</div>
                    <div className="font-display text-2xl text-sage-800">{auth.user.client_health_profile?.target_calories?.toLocaleString()}</div>
                    {/*<div className="text-xs text-sage-500 mt-0.5">99% of 1,800</div>*/}
                    <div className="comp-bar mt-1.5">
                        <div className="comp-fill bg-sage-800" style={{width: `${client_dashboard_analytics.compliance.calories}%`}}></div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-3.5 border border-sage-100">
                    <div className="text-xs text-sage-400 uppercase tracking-wider font-medium mb-1">Protein</div>
                    <div className="font-display text-2xl text-sage-600">{auth.user.client_health_profile?.target_protein_g?.toLocaleString()}g</div>
                    {/*<div className="text-xs text-sage-500 mt-0.5">104% ↑</div>*/}
                    <div className="comp-bar mt-1.5">
                        <div className={`comp-fill bg-sage-500`} style={{width: `${client_dashboard_analytics.compliance.protein_g}%`}}></div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-3.5 border border-sage-100">
                    <div className="text-xs text-sage-400 uppercase tracking-wider font-medium mb-1">Carbs</div>
                    <div className="font-display text-2xl text-amber-500">{auth.user.client_health_profile?.target_carbs_g?.toLocaleString()}g</div>
                    {client_dashboard_analytics.compliance.carbs_g > 90 && <div className="text-xs text-amber-500 mt-0.5">{client_dashboard_analytics.compliance.carbs_g}% — Near limit</div>}
                    <div className="comp-bar mt-1.5">
                        <div className={`comp-fill bg-amber-400`} style={{width: `${client_dashboard_analytics.compliance.carbs_g}%`}}></div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-3.5 border border-sage-100">
                    <div className="text-xs text-sage-400 uppercase tracking-wider font-medium mb-1">Fibre</div>
                    <div className="font-display text-2xl text-sage-600">{auth.user.client_health_profile?.target_fibre_g?.toLocaleString()}g</div>
                    {/*<div className="text-xs text-sage-500 mt-0.5">103% ✓</div>*/}
                    <div className="comp-bar mt-1.5">
                        <div className={`comp-fill bg-sage-500`} style={{width: `${client_dashboard_analytics.compliance.fibre_g}%`}}></div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-3.5 border border-sage-100 col-span-2 sm:col-span-1">
                    <div className="text-xs text-sage-400 uppercase tracking-wider font-medium mb-1">Sodium</div>
                    <div className="font-display text-2xl text-purple-500">{auth.user.client_health_profile?.target_sodium_mg?.toLocaleString()}mg</div>
                    {client_dashboard_analytics.compliance.sodium_mg > 80 && <div className="text-xs text-purple-500 mt-0.5">{client_dashboard_analytics.compliance.sodium_mg}% — watch Na</div>}
                    <div className="comp-bar mt-1.5">
                        <div className={`comp-fill bg-purple-400`} style={{width: `${client_dashboard_analytics.compliance.sodium_mg}%`}}></div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-5">
                <div className="bg-white rounded-2xl border border-sage-100 p-4">
                    <div className="text-sm font-medium text-sage-700 mb-3">Nutrition rules</div>
                    <div className="space-y-2 text-xs">
                        {auth.user.nutrition_rules.length > 0 ? (
                            auth.user.nutrition_rules.map((rule: NutritionRule) => (
                                rule.is_active ?
                                    (
                                        <div key={rule.id} className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-sage-500 shrink-0"></span>
                                            <span className="flex-1 text-sage-600"><span className="uppercase">{rule.nutrient} {rule.operator_translation}</span> {rule.value}{rule.unit}</span>

                                        </div>
                                    ):
                                    (
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                                            <span className="flex-1 text-sage-600"><span className="uppercase">{rule.nutrient} {rule.operator_translation}</span> {rule.value}{rule.unit}</span>
                                        </div>
                                    )
                            ))
                        ): (
                            <EmptyState emptyTitle="No nutrition rules" />
                        )}
                    </div>



                </div>
                <div className="bg-white rounded-2xl border border-sage-100 p-4">
                    <div className="text-sm font-medium text-sage-700 mb-3">Your practitioner</div>
                    <div className="flex items-center gap-3 mb-3">
                        <div
                            className="w-10 h-10 rounded-full bg-sage-500 text-white font-display text-lg flex items-center justify-center shrink-0">
                            {initials(client_dashboard_analytics.practitioner.name)}
                        </div>
                        <div>
                            <div className="text-sm font-medium text-sage-800">{client_dashboard_analytics.practitioner.name}</div>
                            <div className="text-xs text-sage-400 font-light">{client_dashboard_analytics.practitioner.professional_title} · {client_dashboard_analytics.practitioner.regulator}</div>
                            <div className="text-xs text-sage-500 mt-0.5"><a href={`mailto:${client_dashboard_analytics.practitioner.email}`} target="_blank" title="Mail practitioner">{client_dashboard_analytics.practitioner.email}</a></div>
                            <div className="text-xs text-sage-500 mt-0.5">{isVerified(client_dashboard_analytics.practitioner.verification_status) ? '✓ Verified' : ''}</div>
                        </div>
                    </div>
                    {client_dashboard_analytics.practitioner.next_review_date && <p className="text-xs text-sage-400 font-light">Next review: <strong className="text-sage-600">{formatDate(client_dashboard_analytics.practitioner.next_review_date)}</strong></p>}
                </div>
                <div className="bg-white rounded-2xl border border-sage-100 p-4">
                    {client_dashboard_analytics.streak >= 7 &&  <div className="text-sm font-medium text-sage-700 mb-3">{client_dashboard_analytics.streak}-day streak 🔥</div>}
                    <div className="font-display text-4xl text-sage-600 text-center my-3">{client_dashboard_analytics.streak}</div>
                    {client_dashboard_analytics.streak > 0 ? (
                        <p className="text-xs text-sage-400 text-center font-light">Keep generating plans to maintain your
                            streak!</p>

                        ) : (
                            <p className="text-xs text-sage-400 text-center font-light">Generate meal plans to start your
                                streak!</p>
                        )}
                </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 my-5">
            {/*Meal tabs*/}
            <div className="flex gap-1 overflow-x-auto pb-1">
                <button onClick={() => setMealType('all')} className={`meal-tab-btn ${mealType === 'all' ? 'bg-sage-600 text-white' : 'bg-white border border-sage-200 text-sage-700'} text-xs font-medium px-4 py-2 rounded-full shrink-0 cursor-pointer`} >All meals</button>
                <button onClick={() => setMealType('breakfast')} className={`meal-tab-btn ${mealType === 'breakfast' ? 'bg-sage-600 text-white' : 'bg-white border border-sage-200 text-sage-700'} text-xs font-medium px-4 py-2 rounded-full shrink-0 cursor-pointer`} >🌅 Breakfast</button>
                <button onClick={() => setMealType('lunch')} className={`meal-tab-btn ${mealType === 'lunch' ? 'bg-sage-600 text-white' : 'bg-white border border-sage-200 text-sage-700'} text-xs font-medium px-4 py-2 rounded-full shrink-0 cursor-pointer`}>☀️ Lunch</button>
                <button onClick={() => setMealType('snack')}  className={`meal-tab-btn ${mealType === 'snack' ? 'bg-sage-600 text-white' : 'bg-white border border-sage-200 text-sage-700'} text-xs font-medium px-4 py-2 rounded-full shrink-0 cursor-pointer`} >🍎 Snack</button>
                <button onClick={() => setMealType('dinner')}  className={`meal-tab-btn ${mealType === 'dinner' ? 'bg-sage-600 text-white' : 'bg-white border border-sage-200 text-sage-700'} text-xs font-medium px-4 py-2 rounded-full shrink-0 cursor-pointer`}>🌙 Dinner</button>
            </div>

            <form onSubmit={generateMealPlan}>
                <button id="clientGenBtn"
                        type="submit"
                        disabled={processing}
                        className={`${processing ? 'opacity-75' : 'opacity-100'} cursor-pointer bg-sage-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-sage-500 transition-all flex items-center gap-2 self-start`}>
                    {processing ? 'Generating meal plan' : 'Generate meal plan'}
                </button>
            </form>
            </div>





            {processing ? (
                <EmptyState emptyTitle="Generating meal plan for the day..." />
            ) : (
               <>
                   {filteredMeals.length > 0 && (
                       <div className="grid lg:grid-cols-1 gap-5 mb-5" id="mealCardsGrid">

                           {filteredMeals.map((meal) => {
                               if(isBreakfast(meal.meal_type))
                               {
                                   return (
                                       <div key={meal.id} className="meal-card-item bg-white rounded-2xl border border-sage-100 overflow-hidden hover-lift"
                                                 data-type="breakfast">
                                           <div className="h-1 bg-amber-400"></div>
                                           <div className="p-4">
                                               <div className="flex items-start gap-3">
                                                   <div
                                                       className="w-11 h-11 bg-amber-100 rounded-xl flex items-center justify-center text-xl shrink-0">🌅
                                                   </div>
                                                   <div className="flex-1 min-w-0">
                                                       <div className="text-xs text-sage-400 uppercase tracking-wider font-medium">{meal.meal_type} · 8:00 AM
                                                       </div>
                                                       <div className="font-display text-base text-sage-800 mt-0.5 leading-tight">
                                                           {meal.name}
                                                       </div>
                                                       <div className="text-xs text-sage-400 font-light mt-1">{meal.description}
                                                       </div>
                                                   </div>
                                                   <div className="font-display text-xl text-sage-600 shrink-0">{meal.calories}<span
                                                       className="text-xs text-sage-400 font-sans font-light">kcal</span></div>
                                               </div>
                                               <div className="flex flex-wrap gap-1.5 mt-3">
                                                   <span
                                                       className="mp bg-amber-100 text-amber-700">Carbs — {meal.carbs_g.toLocaleString()}g</span>
                                                   <span
                                                       className="mp bg-blue-100 text-blue-700">Protein — {meal.protein_g.toLocaleString()}g</span>
                                                   <span
                                                       className="mp bg-pink-100 text-pink-700">Fat — {meal.fat_g}g</span>
                                                   <span
                                                       className="mp bg-indigo-100 text-indigo-700">Sat Fat — {meal.sat_fat_g}g</span>
                                                   <span
                                                       className="mp bg-purple-100 text-purple-700">Fibre — {meal.fibre_g}g</span>
                                                   <span
                                                       className="mp bg-sage-100 text-sage-700">Sodium — {meal.sodium_mg}mg</span>
                                                   {meal.was_swapped && <span
                                                       className="badge bg-purple-100 text-purple-700 text-xs px-2">Swapped</span>}
                                               </div>
                                               <div className="flex items-center gap-2 mt-3 pt-3 border-t border-sage-50">
                                                   <span className="text-xs text-sage-500 flex items-center gap-1"><span className="text-sm">✓</span> All rules passed</span>
                                               </div>
                                               {/*Expandable */}
                                               <div className="mt-3">
                                                   <button onClick={()=> toggleMealCard(meal.id)}
                                                           className="w-full text-left text-xs text-sage-500 hover:text-sage-700 font-medium flex items-center gap-1">
                                                       <span className="expand-label">{ showMore !== meal.id ? 'Show ingredients & why →' : 'Hide ↑'}</span>
                                                   </button>
                                                   <div className={`expand-content ${showMore === meal.id ? 'block' : 'hidden'}  mt-3 space-y-3 animate-fade-in`}>
                                                       <div>
                                                           <div
                                                               className="text-xs font-semibold text-sage-400 uppercase tracking-wider mb-1">Ingredients
                                                           </div>
                                                           <p className="text-xs text-sage-600 font-light">{meal.ingredients}</p></div>
                                                       <div className="bg-sage-50 rounded-xl p-3">
                                                           <div
                                                               className="text-xs font-semibold text-sage-500 uppercase tracking-wider mb-1">Why
                                                               this meal?
                                                           </div>
                                                           <p className="text-xs text-sage-600 font-light">{meal.why_chosen}</p>
                                                       </div>
                                                       <div className="bg-sage-50 rounded-xl p-3">
                                                           <div
                                                               className="text-xs font-semibold text-sage-500 uppercase tracking-wider mb-1">
                                                               Recipe steps
                                                           </div>
                                                           {splitRecipeStepsToArray(meal.recipe_steps).map((step,i) => (
                                                               <p key={i} className="text-xs text-sage-600 font-light px-3 py-1">{i + 1}. {step}</p>
                                                           ))}
                                                       </div>

                                                       <div className="flex items-center justify-between">
                                                           <div>
                                                               <div className="text-xs text-sage-400 mb-1">Rate</div>
                                                               <div className="flex gap-0.5" id="stars-b">
                                                                   {[1,2,3,4,5].map(i => (
                                                                       <button key={i} onClick={()=> rateMeal(meal.id,i )}><span  className={`star-btn ${meal.rating >= i ? "lit" : ""}`}>★</span></button>
                                                                   ))}
                                                               </div>
                                                           </div>
                                                           <div className="flex gap-2">
                                                               <button onClick={() => openSwapModal(meal)}
                                                                       className="cursor-pointer border border-sage-200 text-sage-700 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-sage-50">⇄
                                                                   Swap
                                                               </button>

                                                           </div>
                                                       </div>
                                                   </div>
                                               </div>
                                           </div>
                                       </div>
                                   )
                               }

                               if(isDinner(meal.meal_type))
                               {
                                   return  (
                                       <div key={meal.id} className="meal-card-item bg-white rounded-2xl border border-sage-100 overflow-hidden hover-lift"
                                            data-type="dinner">
                                           <div className="h-1 bg-blue-400"></div>
                                           <div className="p-4">
                                               <div className="flex items-start gap-3">
                                                   <div
                                                       className="w-11 h-11 bg-amber-100 rounded-xl flex items-center justify-center text-xl shrink-0">🌙
                                                   </div>
                                                   <div className="flex-1 min-w-0">
                                                       <div className="text-xs text-sage-400 uppercase tracking-wider font-medium">{meal.meal_type} · 6:00 PM
                                                       </div>
                                                       <div className="font-display text-base text-sage-800 mt-0.5 leading-tight">
                                                           {meal.name}
                                                       </div>
                                                       <div className="text-xs text-sage-400 font-light mt-1">{meal.description}
                                                       </div>
                                                   </div>
                                                   <div className="font-display text-xl text-sage-600 shrink-0">{meal.calories}<span
                                                       className="text-xs text-sage-400 font-sans font-light">kcal</span></div>
                                               </div>
                                               <div className="flex items-center gap-2 mt-3 pt-3 border-t border-sage-50">
                                                   <span className="text-xs text-sage-500 flex items-center gap-1"><span className="text-sm">✓</span> All rules passed</span>
                                               </div>
                                               {/*Expandable */}
                                               <div className="mt-3">
                                                   <button onClick={()=> toggleMealCard(meal.id)}
                                                           className="w-full text-left text-xs text-sage-500 hover:text-sage-700 font-medium flex items-center gap-1">
                                                       <span className="expand-label">{ showMore !== meal.id ? 'Show ingredients & why →' : 'Hide ↑'}</span>
                                                   </button>
                                                   <div className={`expand-content ${showMore === meal.id ? 'block' : 'hidden'}  mt-3 space-y-3 animate-fade-in`}>
                                                       <div>
                                                           <div
                                                               className="text-xs font-semibold text-sage-400 uppercase tracking-wider mb-1">Ingredients
                                                           </div>
                                                           <p className="text-xs text-sage-600 font-light">{meal.ingredients}</p></div>
                                                       <div className="bg-sage-50 rounded-xl p-3">
                                                           <div
                                                               className="text-xs font-semibold text-sage-500 uppercase tracking-wider mb-1">Why
                                                               this meal?
                                                           </div>
                                                           <p className="text-xs text-sage-600 font-light">{meal.why_chosen}</p>
                                                       </div>
                                                       <div className="bg-sage-50 rounded-xl p-3">
                                                           <div
                                                               className="text-xs font-semibold text-sage-500 uppercase tracking-wider mb-1">
                                                               Recipe steps
                                                           </div>
                                                           {splitRecipeStepsToArray(meal.recipe_steps).map((step,i) => (
                                                               <p key={i} className="text-xs text-sage-600 font-light px-3 py-1">{i + 1}. {step}</p>
                                                           ))}
                                                       </div>

                                                       <div className="flex items-center justify-between">
                                                           <div>
                                                               <div className="text-xs text-sage-400 mb-1">Rate</div>
                                                               <div className="flex gap-0.5" id="stars-b">
                                                                   {[1,2,3,4,5].map(i => (
                                                                       <button key={i} onClick={()=> rateMeal(meal.id,i )}><span  className={`star-btn ${meal.rating >= i ? "lit" : ""}`}>★</span></button>
                                                                   ))}
                                                               </div>
                                                           </div>
                                                           <div className="flex gap-2">
                                                               <button onClick={() => openSwapModal(meal)}
                                                                       className="cursor-pointer border border-sage-200 text-sage-700 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-sage-50">⇄
                                                                   Swap
                                                               </button>

                                                           </div>
                                                       </div>
                                                   </div>
                                               </div>
                                           </div>
                                       </div>

                                   )
                               }


                               if(isLunch(meal.meal_type))
                               {
                                   return (
                                       <div key={meal.id} className="meal-card-item bg-white rounded-2xl border border-sage-100 overflow-hidden hover-lift"
                                            data-type="lunch">
                                           <div className="h-1 bg-emerald-400"></div>
                                           <div className="p-4">
                                               <div className="flex items-start gap-3">
                                                   <div
                                                       className="w-11 h-11 bg-amber-100 rounded-xl flex items-center justify-center text-xl shrink-0">☀️
                                                   </div>
                                                   <div className="flex-1 min-w-0">
                                                       <div className="text-xs text-sage-400 uppercase tracking-wider font-medium">{meal.meal_type} · 12:30 PM
                                                       </div>
                                                       <div className="font-display text-base text-sage-800 mt-0.5 leading-tight">
                                                           {meal.name}
                                                       </div>
                                                       <div className="text-xs text-sage-400 font-light mt-1">{meal.description}
                                                       </div>
                                                   </div>
                                                   <div className="font-display text-xl text-sage-600 shrink-0">{meal.calories}<span
                                                       className="text-xs text-sage-400 font-sans font-light">kcal</span></div>
                                               </div>
                                               <div className="flex flex-wrap gap-1.5 mt-3">
                                                   <span className="mp bg-amber-100 text-amber-700">Carbs — {meal.carbs_g.toLocaleString()}g</span>
                                                   <span className="mp bg-blue-100 text-blue-700">Protein — {meal.protein_g.toLocaleString()}g</span>
                                                   <span className="mp bg-pink-100 text-pink-700">Fat — {meal.fat_g}g</span>
                                                   <span className="mp bg-indigo-100 text-indigo-700">Sat Fat — {meal.sat_fat_g}g</span>
                                                   <span className="mp bg-purple-100 text-purple-700">Fibre — {meal.fibre_g}g</span>
                                                   <span className="mp bg-sage-100 text-sage-700">Sodium — {meal.sodium_mg}mg</span>
                                               </div>
                                               <div className="flex items-center gap-2 mt-3 pt-3 border-t border-sage-50">
                                                   <span className="text-xs text-sage-500 flex items-center gap-1"><span className="text-sm">✓</span> All rules passed</span>
                                               </div>
                                               {/*Expandable */}
                                               <div className="mt-3">
                                                   <button onClick={()=> toggleMealCard(meal.id)}
                                                           className="w-full text-left text-xs text-sage-500 hover:text-sage-700 font-medium flex items-center gap-1">
                                                       <span className="expand-label">{ showMore !== meal.id ? 'Show ingredients & why →' : 'Hide ↑'}</span>
                                                   </button>
                                                   <div className={`expand-content ${showMore === meal.id ? 'block' : 'hidden'}  mt-3 space-y-3 animate-fade-in`}>
                                                       <div>
                                                           <div
                                                               className="text-xs font-semibold text-sage-400 uppercase tracking-wider mb-1">Ingredients
                                                           </div>
                                                           <p className="text-xs text-sage-600 font-light">{meal.ingredients}</p></div>
                                                       <div className="bg-sage-50 rounded-xl p-3">
                                                           <div
                                                               className="text-xs font-semibold text-sage-500 uppercase tracking-wider mb-1">Why
                                                               this meal?
                                                           </div>
                                                           <p className="text-xs text-sage-600 font-light">{meal.why_chosen}</p>
                                                       </div>
                                                       <div className="bg-sage-50 rounded-xl p-3">
                                                           <div
                                                               className="text-xs font-semibold text-sage-500 uppercase tracking-wider mb-1">
                                                               Recipe steps
                                                           </div>
                                                           {splitRecipeStepsToArray(meal.recipe_steps).map((step,i) => (
                                                               <p key={i} className="text-xs text-sage-600 font-light px-3 py-1">{i + 1}. {step}</p>
                                                           ))}
                                                       </div>

                                                       <div className="flex items-center justify-between">
                                                           <div>
                                                               <div className="text-xs text-sage-400 mb-1">Rate</div>
                                                               <div className="flex gap-0.5" id="stars-b">
                                                                   {[1,2,3,4,5].map(i => (
                                                                       <button key={i} onClick={()=> rateMeal(meal.id,i )}><span  className={`star-btn ${meal.rating >= i ? "lit" : ""}`}>★</span></button>
                                                                   ))}
                                                               </div>
                                                           </div>
                                                           <div className="flex gap-2">
                                                               <button onClick={() => openSwapModal(meal)}
                                                                       className="cursor-pointer border border-sage-200 text-sage-700 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-sage-50">⇄
                                                                   Swap
                                                               </button>

                                                           </div>
                                                       </div>
                                                   </div>
                                               </div>
                                           </div>
                                       </div>
                                   );

                               }

                               if(isSnack(meal.meal_type))
                               {
                                 return (
                                     <div key={meal.id} className="meal-card-item bg-white rounded-2xl border border-sage-100 overflow-hidden hover-lift"
                                          data-type="snack">
                                         <div className="h-1 bg-pink-400"></div>
                                         <div className="p-4">
                                             <div className="flex items-start gap-3">
                                                 <div
                                                     className="w-11 h-11 bg-amber-100 rounded-xl flex items-center justify-center text-xl shrink-0">🍎
                                                 </div>
                                                 <div className="flex-1 min-w-0">
                                                     <div className="text-xs text-sage-400 uppercase tracking-wider font-medium">{meal.meal_type} · 2:30 PM
                                                     </div>
                                                     <div className="font-display text-base text-sage-800 mt-0.5 leading-tight">
                                                         {meal.name}
                                                     </div>
                                                     <div className="text-xs text-sage-400 font-light mt-1">{meal.description}
                                                     </div>
                                                 </div>
                                                 <div className="font-display text-xl text-sage-600 shrink-0">{meal.calories}<span
                                                     className="text-xs text-sage-400 font-sans font-light">kcal</span></div>
                                             </div>
                                             <div className="flex flex-wrap gap-1.5 mt-3">
                                                 <span className="mp bg-amber-100 text-amber-700">Carbs — {meal.carbs_g.toLocaleString()}g</span>
                                                 <span className="mp bg-blue-100 text-blue-700">Protein — {meal.protein_g.toLocaleString()}g</span>
                                                 <span className="mp bg-pink-100 text-pink-700">Fat — {meal.fat_g}g</span>
                                                 <span className="mp bg-indigo-100 text-indigo-700">Sat Fat — {meal.sat_fat_g}g</span>
                                                 <span className="mp bg-purple-100 text-purple-700">Fibre — {meal.fibre_g}g</span>
                                                 <span className="mp bg-sage-100 text-sage-700">Sodium — {meal.sodium_mg}mg</span>
                                             </div>

                                             <div className="flex items-center gap-2 mt-3 pt-3 border-t border-sage-50">
                                                 <span className="text-xs text-sage-500 flex items-center gap-1"><span className="text-sm">✓</span> All rules passed</span>
                                             </div>
                                             {/*Expandable */}
                                             <div className="mt-3">
                                                 <button onClick={()=> toggleMealCard(meal.id)}
                                                         className="w-full text-left text-xs text-sage-500 hover:text-sage-700 font-medium flex items-center gap-1">
                                                     <span className="expand-label">{ showMore !== meal.id ? 'Show ingredients & why →' : 'Hide ↑'}</span>
                                                 </button>
                                                 <div className={`expand-content ${showMore === meal.id ? 'block' : 'hidden'}  mt-3 space-y-3 animate-fade-in`}>
                                                     <div>
                                                         <div
                                                             className="text-xs font-semibold text-sage-400 uppercase tracking-wider mb-1">Ingredients
                                                         </div>
                                                         <p className="text-xs text-sage-600 font-light">{meal.ingredients}</p></div>
                                                     <div className="bg-sage-50 rounded-xl p-3">
                                                         <div
                                                             className="text-xs font-semibold text-sage-500 uppercase tracking-wider mb-1">Why
                                                             this meal?
                                                         </div>
                                                         <p className="text-xs text-sage-600 font-light">{meal.why_chosen}</p>
                                                     </div>
                                                     <div className="bg-sage-50 rounded-xl p-3">
                                                         <div
                                                             className="text-xs font-semibold text-sage-500 uppercase tracking-wider mb-1">
                                                             Recipe steps
                                                         </div>
                                                         {splitRecipeStepsToArray(meal.recipe_steps).map((step,i) => (
                                                             <p key={i} className="text-xs text-sage-600 font-light px-3 py-1">{i + 1}. {step}</p>
                                                         ))}
                                                     </div>

                                                     <div className="flex items-center justify-between">
                                                         <div>
                                                             <div className="text-xs text-sage-400 mb-1">Rate</div>
                                                             <div className="flex gap-0.5" id="stars-b">
                                                                 {[1,2,3,4,5].map(i => (
                                                                     <button key={i} onClick={()=> rateMeal(meal.id,i )}><span  className={`star-btn ${meal.rating >= i ? "lit" : ""}`}>★</span></button>
                                                                 ))}
                                                             </div>
                                                         </div>
                                                         <div className="flex gap-2">
                                                             <button onClick={() => openSwapModal(meal)}
                                                                     className="cursor-pointer border border-sage-200 text-sage-700 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-sage-50">⇄
                                                                 Swap
                                                             </button>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                         </div>
                                     </div>
                                 );

                               }



                               return null
                           })}


                       </div>
                   )}

                   {filteredMeals.length == 0 && <div className="bg-white rounded-2xl border border-sage-100 p-4">
                       <EmptyState emptyTitle="No meals generated today"/>
                   </div>}
               </>
            )}



            <ConfirmModal
                config={confirmVerificationModal}
                onCancel={() => setConfirmSwapMealModal(null)}
                onConfirm={confirmSwap}
            >
                <div className="text-sm text-gray-500 my-1">Are you sure you want to swap <b>{selectedMeal?.name}</b> with another meal?</div>

            </ConfirmModal>

        </ClientPortalLayout>
    );
}
