import React, {useEffect} from 'react';
import {Crumb} from "@/types/types";
import {Edit, LayoutDashboard, User} from "lucide-react";
import {Breadcrumbs} from "@/components/Menu/Breadcrumbs";
import {Head, useForm, usePage} from "@inertiajs/react";
import FormCard from "@/components/Form/FormCard";
import {enumToArray} from "@/lib/utils";
import Error from "@/components/Notifications/Error";
import {useToast} from "@/context/ToastContext";
import PractitionerPortalLayout from "@/layouts/Portals/PractitionerPortalLayout";
import PractitionerDashboardController
    from "@/actions/App/Http/Controllers/Analytics/Practitioner/PractitionerDashboardController";
import {FormSelect} from "@/components/Form/FormSelect";
import PractitionerClientController from "@/actions/App/Http/Controllers/Users/PractitionerClientController";

const EditPractitionerClientProfilePage = () => {


    const {client, allergiesList, dietaryPreferencesList, conditionsList, dietPrimaryGoalsList, cuisinePreferencesList, intolerancesList} = usePage().props
    const toast = useToast()

    const BREADCRUMBS: Crumb[] = [
        {label: "Dashboard", icon: LayoutDashboard, href: PractitionerDashboardController.url()},
        {label: "Client", icon: User, href: PractitionerClientController.show.url(client.id)},
        {label: "Edit", icon: Edit},

    ];

    function updateClientHealthProfile(e: any) {

        healthProfileForm.put(PractitionerClientController.updateClientHealthProfile.url(client.id), {
            onSuccess: () => {
                toast.success('Client health profile updated')
            },
            onError: (errors) => {

                const firstError = Object.values(errors)[0]
                toast.error(typeof firstError === 'string' ? firstError : 'Something went wrong')
            },
        })

    }
    const updateClinicalNotes = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        clinicalNotesForm.put(PractitionerClientController.updateClinicalNotes.url(client.id), {
            onSuccess: () => {
                toast.success('Clinical notes updated')
            },
            onError: (errors) => {

                const firstError = Object.values(errors)[0]
                toast.error(typeof firstError === 'string' ? firstError : 'Something went wrong')
            },
        })

    }


    const clinicalNotesForm = useForm({
        'clinical_notes': client.practitioner_client?.clinical_notes ?? ''
    })



    const healthProfileForm = useForm({
        conditions: client.client_health_profile.conditions,
        allergies: client.client_health_profile.allergies,
        intolerances: client.client_health_profile.intolerances,
        primary_goal: client.client_health_profile.primary_goal,
        height_cm: client.client_health_profile.height_cm,
        weight_kg: client.client_health_profile.weight_kg,
        target_calories: client.client_health_profile.target_calories,
        target_protein_g: client.client_health_profile.target_protein_g,
        target_carbs_g: client.client_health_profile.target_carbs_g,
        target_fat_g: client.client_health_profile.target_fat_g,
        target_fibre_g: client.client_health_profile.target_fibre_g,
        target_sodium_mg: client.client_health_profile.target_sodium_mg,
        cuisine_preferences: client.client_health_profile.cuisine_preferences,
        dietary_preferences: client.client_health_profile.dietary_preferences,
        meals_per_day: client.client_health_profile.meals_per_day,
        max_cooking_minutes: client.client_health_profile.max_cooking_minutes
    })


    return (
        <PractitionerPortalLayout>
            <Head title="Profile"/>

            <Breadcrumbs items={BREADCRUMBS}/>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h2 className="font-serif text-3xl text-emerald-950 sm:text-4xl">
                        {client.name} profile
                    </h2>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-emerald-700/80">
                        Manage your client health profile here
                    </p>
                </div>


            </div>



            <FormCard title="Health Profile">
                <form onSubmit={updateClientHealthProfile}>
                    <div className="grid gap-5">

                        <div className="grid gap-5 sm:grid-cols-2 mt-5">
                            {/* Primary Goal */}
                            <label htmlFor="primary_goal" className="block">
                            <span className="mb-1.5 block text-xs font-semibold uppercase text-emerald-800/80">
                                 Primary Goal
                            </span>
                                <input
                                    id="primary_goal"
                                    type="text"
                                    value={healthProfileForm.data.primary_goal}
                                    onChange={(e) => healthProfileForm.setData('primary_goal', e.target.value)}
                                    className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:ring-2 focus:ring-emerald-600/20"
                                    required
                                    autoComplete="off"
                                />
                                <Error message={healthProfileForm.errors.primary_goal}/>
                            </label>

                            {/* Cuisine Preferences */}
                            <label className="block">
                                 <span className="mb-1.5 block text-xs font-semibold uppercase text-emerald-800/80">
                                          Cuisine Preferences
                                </span>
                                <FormSelect
                                    multiple
                                    value={healthProfileForm.data.cuisine_preferences}
                                    options={enumToArray(cuisinePreferencesList)}
                                    onChange={(val: any) => healthProfileForm.setData("cuisine_preferences", val)}
                                />
                                <Error message={healthProfileForm.errors.cuisine_preferences}/>
                            </label>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2 mt-5">
                            {/* Conditions */}
                            <label className="block">
                                <span className="mb-1.5 block text-xs font-semibold uppercase text-emerald-800/80">
                                    Conditions
                                </span>
                                <FormSelect
                                    multiple
                                    value={healthProfileForm.data.conditions}
                                    options={enumToArray(conditionsList)}
                                    onChange={(val: any) => healthProfileForm.setData("conditions", val)}
                                />
                                <Error message={healthProfileForm.errors.conditions}/>
                            </label>

                            {/* Allergies */}
                            <label className="block">
                                 <span className="mb-1.5 block text-xs font-semibold uppercase text-emerald-800/80">
                                    Allergies
                                 </span>
                                <FormSelect
                                    multiple
                                    value={healthProfileForm.data.allergies}
                                    options={enumToArray(allergiesList)}
                                    onChange={(val: any) => healthProfileForm.setData("allergies", val)}
                                />
                                <Error message={healthProfileForm.errors.allergies}/>
                            </label>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2 mt-5">
                        {/* Intolerances */}
                        <label className="block">
                            <span className="mb-1.5 block text-xs font-semibold uppercase text-emerald-800/80">
                                Intolerances
                            </span>
                            <FormSelect
                                multiple
                                value={healthProfileForm.data.intolerances}
                                options={enumToArray(intolerancesList)}
                                onChange={(val: any) => healthProfileForm.setData("intolerances", val)}
                            />
                            <Error message={healthProfileForm.errors.intolerances}/>
                        </label>
                        {/* Dietary Preferences */}
                        <label className="block">
                            <span className="mb-1.5 block text-xs font-semibold uppercase text-emerald-800/80">
                                 Dietary Preferences
                            </span>
                            <FormSelect
                                multiple
                                value={healthProfileForm.data.dietary_preferences}
                                options={enumToArray(dietaryPreferencesList)}
                                onChange={(val: any) => healthProfileForm.setData("dietary_preferences", val)}
                            />
                            <Error message={healthProfileForm.errors.dietary_preferences}/>
                        </label>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2 mt-5">
                            <label  className="block">
                                    <span className="mb-1.5 block text-xs font-semibold uppercase text-emerald-800/80">
                                          Height (cm)
                                    </span>
                                <input
                                    type="number"
                                    value={healthProfileForm.data.height_cm}
                                    onChange={(e) => healthProfileForm.setData('height_cm')}
                                    className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm"
                                />
                                <Error message={healthProfileForm.errors.height_cm} />
                            </label>
                            <label  className="block">
                                 <span className="mb-1.5 block text-xs font-semibold uppercase text-emerald-800/80">
                                       Weight (Kg)
                                 </span>
                                <input
                                    type="number"
                                    value={healthProfileForm.data.weight_kg}
                                    onChange={(e) => healthProfileForm.setData('weight_kg')}
                                    className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm"
                                />
                                <Error message={healthProfileForm.errors.weight_kg}/>
                            </label>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-3 mt-5">
                            <label  className="block">
                                    <span className="mb-1.5 block text-xs font-semibold uppercase text-emerald-800/80">
                                         Target calories
                                    </span>
                                <input
                                    type="number"
                                    value={healthProfileForm.data.target_calories}
                                    onChange={(e) => healthProfileForm.setData('target_calories')}
                                    className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm"
                                />
                                <Error message={healthProfileForm.errors.target_calories} />
                            </label>
                            <label  className="block">
                                 <span className="mb-1.5 block text-xs font-semibold uppercase text-emerald-800/80">
                                      Target Protein (g)
                                 </span>
                                <input
                                    type="number"
                                    value={healthProfileForm.data.target_protein_g}
                                    onChange={(e) => healthProfileForm.setData('target_protein_g')}
                                    className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm"
                                />
                                <Error message={healthProfileForm.errors.target_protein_g}/>
                            </label>
                            <label  className="block">
                                 <span className="mb-1.5 block text-xs font-semibold uppercase text-emerald-800/80">
                                       Target Carbs (g)
                                 </span>
                                <input
                                    type="number"
                                    value={healthProfileForm.data.target_carbs_g}
                                    onChange={(e) => healthProfileForm.setData('target_carbs_g')}
                                    className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm"
                                />
                                <Error message={healthProfileForm.errors.target_carbs_g}/>
                            </label>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-3 mt-5">
                            <label  className="block">
                                    <span className="mb-1.5 block text-xs font-semibold uppercase text-emerald-800/80">
                                         Target Fat(g)
                                    </span>
                                <input
                                    type="number"
                                    value={healthProfileForm.data.target_fat_g}
                                    onChange={(e) => healthProfileForm.setData('target_fat_g')}
                                    className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm"
                                />
                                <Error message={healthProfileForm.errors.target_fat_g} />
                            </label>
                            <label  className="block">
                                 <span className="mb-1.5 block text-xs font-semibold uppercase text-emerald-800/80">
                                      Target Fibre (g)
                                 </span>
                                <input
                                    type="number"
                                    value={healthProfileForm.data.target_fibre_g}
                                    onChange={(e) => healthProfileForm.setData('target_fibre_g')}
                                    className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm"
                                />
                                <Error message={healthProfileForm.errors.target_fibre_g}/>
                            </label>
                            <label  className="block">
                                 <span className="mb-1.5 block text-xs font-semibold uppercase text-emerald-800/80">
                                       Target Sodium (mg)
                                 </span>
                                <input
                                    type="number"
                                    value={healthProfileForm.data.target_sodium_mg}
                                    onChange={(e) => healthProfileForm.setData('target_sodium_mg')}
                                    className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm"
                                />
                                <Error message={healthProfileForm.errors.target_sodium_mg}/>
                            </label>
                        </div>




          {/*                  'meals_per_day',*/}
          {/*                  'max_cooking_minutes'*/}
          {/*              ].map((field) => (*/}
          {/*                  <label key={field} className="block">*/}
          {/*<span className="mb-1.5 block text-xs font-semibold uppercase text-emerald-800/80">*/}
          {/*  {field.replace(/_/g, ' ')}*/}
          {/*</span>*/}
          {/*                      <input*/}
          {/*                          type="number"*/}
          {/*                          value={healthProfileForm.data[field] ?? ''}*/}
          {/*                          onChange={(e) =>*/}
          {/*                              healthProfileForm.setData(field as keyof HealthProfileForm, Number(e.target.value))*/}
          {/*                          }*/}
          {/*                          className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm"*/}
          {/*                      />*/}
          {/*                      <Error message={healthProfileForm.errors[field]}/>*/}
          {/*                  </label>*/}
          {/*              ))}*/}



                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={healthProfileForm.processing}
                            className={`${healthProfileForm.processing ? 'opacity-70' : 'opacity-100'} cursor-pointer mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700`}
                        >
                            Save Health Profile
                        </button>
                    </div>
                </form>
            </FormCard>


            <FormCard title="Clinical notes">
                <form onSubmit={updateClinicalNotes}>
                    <div className="grid gap-5">
                        <label htmlFor="clinical_notes" className="block">
                       <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                          Clinical Notes
                        </span>
                            <textarea
                                id="clinical_notes"
                                value={clinicalNotesForm.data.clinical_notes}
                                onChange={(e) => clinicalNotesForm.setData('clinical_notes', e.target.value)}
                                className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:ring-2 focus:ring-emerald-600/20"
                                required
                                autoComplete="off"
                            ></textarea>
                            <Error message={clinicalNotesForm.errors.clinical_notes}/>
                        </label>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={clinicalNotesForm.processing}
                            onClick={() => {
                            }}
                            className={`${clinicalNotesForm.processing ? 'opacity-70' : 'opacity-100'} cursor-pointer mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2`}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </FormCard>

        </PractitionerPortalLayout>
    );
};

export default EditPractitionerClientProfilePage;
