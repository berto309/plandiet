import React, {useState} from 'react';
import {ConflictReport, Crumb} from "@/types/types";
import {Edit, LayoutDashboard, PlusIcon, Scale} from "lucide-react";
import {Breadcrumbs} from "@/components/Menu/Breadcrumbs";
import {Head, useForm, usePage} from "@inertiajs/react";
import FormCard from "@/components/Form/FormCard";
import {enumToArray} from "@/lib/utils";
import Toggle from "@/components/State/Toggle";
import Error from "@/components/Notifications/Error";
import {useToast} from "@/context/ToastContext";
import PractitionerPortalLayout from "@/layouts/Portals/PractitionerPortalLayout";
import PractitionerDashboardController
    from "@/actions/App/Http/Controllers/Analytics/Practitioner/PractitionerDashboardController";
import NutritionRuleController from "@/actions/App/Http/Controllers/Tools/RuleEditor/NutritionRuleController";
import {getOperatorTranslation} from "@/types/enums";
import ConflictReportCard from "@/components/Card/ConflictReportCard";



const EditNutritionRulePage = () => {

    const BREADCRUMBS: Crumb[] = [
        {label: "Dashboard", icon: LayoutDashboard, href: PractitionerDashboardController.url()},
        {label: "Nutrition rule", icon: Scale, href: NutritionRuleController.index.url()},
        {label: "Edit", icon: Edit}
    ];


    const {nutritionRule, practitionerClientsList, ruleTemplateList, ruleOperators, rulePriorities, ruleConstraintTypes, ruleUnits} = usePage().props
    const  toast = useToast()
    const [conflictReport, setConflictReport] = useState<ConflictReport | null>(null);


    function getSelectedTemplate(value: string) {

        if(value != '')
        {
            let id = Number(value)
            let selectedTemplate: any = ruleTemplateList.find(r => r.id === id);


            setData({
                name: selectedTemplate?.name,
                client_id: data.client_id,
                nutrient: selectedTemplate?.nutrient,
                operator: selectedTemplate?.operator,
                value: selectedTemplate?.default_value,
                unit: selectedTemplate?.unit,
                constraint_type: selectedTemplate?.constraint_type,
                priority: selectedTemplate?.priority,
                practitioner_note: data.practitioner_note,
                is_active: data.is_active
            })



        } else {
            reset();
        }

    }

    const updateNutritionRule = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        put(NutritionRuleController.update.url(nutritionRule.id), {
            onSuccess: (page) => {

                if(page.flash.toast)
                {
                    toast.success(page.flash.toast.message)
                }
            },
            onError: (errors) => {

                const firstError = Object.values(errors)[0]
                toast.error(typeof firstError === 'string' ? firstError : 'Something went wrong')
            },
            onFlash: ({alert}) => {
                if(alert){
                    toast.error(
                        alert.title,
                        alert.message
                    )

                    setConflictReport(alert.data.conflict_report)

                }
            },
        })

    }

    const {data, setData, put, processing, errors, reset} = useForm({
        name: nutritionRule.name,
        client_id: nutritionRule.client?.id.toString(),
        nutrient: nutritionRule.nutrient,
        operator: nutritionRule.operator,
        value: nutritionRule.value,
        unit: nutritionRule.unit,
        constraint_type: nutritionRule.constraint_type,
        priority: nutritionRule.priority,
        practitioner_note: nutritionRule.practitioner_note,
        is_active: nutritionRule.is_active
    })

    return (
        <PractitionerPortalLayout>
            <Head title="Nutrition Rule" />

            <Breadcrumbs items={BREADCRUMBS}/>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h2 className="font-serif text-3xl text-emerald-950 sm:text-4xl">
                         Nutrition Rule
                    </h2>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-emerald-700/80">
                        View or edit nutrition rule for your client
                    </p>
                </div>


            </div>

            <FormCard title="Nutrition Rule Form">
                <form onSubmit={updateNutritionRule}>
                    <div className="grid gap-5">
                        <label htmlFor="operator" className="block">
                            <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                              Client
                            </span>
                            <div>{nutritionRule.client.name}</div>
                            <Error message={errors.client_id} />
                        </label>
                    </div>
                    <div className="grid gap-5 mt-6 hidden">
                        <label htmlFor="templates" className="block">
                            <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                              Rule templates
                            </span>
                            <select   onChange={(e) => getSelectedTemplate(e.target.value)} id="templates" className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20">
                                <option value="">Select</option>
                                {ruleTemplateList.map((rl: any) => (
                                    <option key={rl.id} value={rl.id}>{rl.name} - {rl.nutrient} {getOperatorTranslation(rl.operator)} {rl.default_value}{rl.unit}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className="grid gap-5 mt-6">
                        <label htmlFor="rule" className="block">
                             <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                                 Rule name
                             </span>
                            <input
                                id="rule"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"
                                required
                            />
                            <Error message={errors.name} />
                        </label>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2 mt-6">
                        <label htmlFor="condition_tag" className="block">
                         <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                            Nutrient eg. carbs_g, energy
                         </span>
                            <input
                                type="text"
                                value={data.nutrient}
                                onChange={(e) => setData('nutrient', e.target.value)}
                                className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"
                                autoComplete="off"
                                required
                            />
                            <Error message={errors.nutrient} />
                        </label>
                        <label htmlFor="operator" className="block">
                            <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                              Operator
                            </span>
                            <select value={data.operator}  onChange={(e) => setData('operator', e.target.value)} id="operator" className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20" required>
                                <option value="">Select</option>
                                {enumToArray(ruleOperators).map((op: any) => (
                                    <option key={op.value} value={op.value}>{op.label}</option>
                                ))}
                            </select>
                            <Error message={errors.operator} />
                        </label>
                        <label htmlFor="value" className="block">
                        <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                              Value
                        </span>
                            <input
                                id="value"
                                type="number"
                                value={data.value}
                                onChange={(e) => setData('value', e.target.value)}
                                className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"
                                autoComplete="off"
                            />
                            <Error message={errors.value} />
                        </label>
                        <label className="block">
                        <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                              Unit
                        </span>
                            <select value={data.unit} onChange={(e) => setData('unit', e.target.value)} className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20">
                                <option value="">Select</option>
                                {enumToArray(ruleUnits).map((op: any) => (
                                    <option key={op.value} value={op.value}>{op.label}</option>
                                ))}
                            </select>
                            <Error message={errors.unit} />
                        </label>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2 mt-6">
                        <label htmlFor="constraint_type" className="block">
                        <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                              Constraint Type
                        </span>
                            <select value={data.constraint_type} onChange={(e) => setData('constraint_type', e.target.value)} id="constraint_type" className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20" required>
                                <option value="">Select</option>
                                {enumToArray(ruleConstraintTypes).map((op: any) => (
                                    <option key={op.value} value={op.value}>{op.label}</option>
                                ))}
                            </select>
                            <Error message={errors.constraint_type} />
                        </label>
                        <label htmlFor="priority" className="block">
                        <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                              Priority
                        </span>
                            <select value={data.priority} id="priority" onChange={(e) => setData('priority', e.target.value)} className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20" required>
                                <option value="">Select</option>
                                {enumToArray(rulePriorities).map((op: any) => (
                                    <option key={op.value} value={op.value}>{op.label}</option>
                                ))}
                            </select>
                            <Error message={errors.priority} />
                        </label>
                    </div>
                    <div className="grid gap-5  mt-6">
                        <label htmlFor="practitioner_note" className="block">
                       <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                          Practitioner Note
                        </span>
                            <textarea value={data.practitioner_note} id="practitioner_note" onChange={(e) => setData('practitioner_note', e.target.value)} className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20">

                            </textarea>
                            <Error message={errors.practitioner_note} />
                        </label>
                    </div>
                    <div className="grid gap-5 mt-6">
                        <label htmlFor="evidence_source" className="block">
                       <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                          Active
                        </span>
                            <Toggle
                                checked={data.is_active}
                                onChange={(checked) => setData('is_active', checked)}
                            />
                        </label>

                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            onClick={() => {
                            }}
                            className={`${processing ? 'opacity-70' : 'opacity-100'} cursor-pointer mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2`}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </FormCard>

            {/* Conflict report */}
            <ConflictReportCard conflictReport={conflictReport} />

        </PractitionerPortalLayout>
    );
};

export default EditNutritionRulePage;
