import React, {useEffect} from 'react';
import AdminPortalLayout from "@/layouts/Portals/AdminPortalLayout";
import {Crumb} from "@/types/types";
import {LayoutDashboard, PlusIcon, Scale} from "lucide-react";
import AdminDashboardController from "@/actions/App/Http/Controllers/Analytics/Admin/AdminDashboardController";
import {Breadcrumbs} from "@/components/Menu/Breadcrumbs";
import RuleTemplateController from "@/actions/App/Http/Controllers/Tools/RuleEditor/RuleTemplateController";
import {Head, useForm, usePage} from "@inertiajs/react";
import FormCard from "@/components/Form/FormCard";
import {enumToArray} from "@/lib/utils";
import Toggle from "@/components/State/Toggle";
import Error from "@/components/Notifications/Error";
import {useToast} from "@/context/ToastContext";

const CreateRuleTemplatePage = () => {

    const BREADCRUMBS: Crumb[] = [
        {label: "Dashboard", icon: LayoutDashboard, href: AdminDashboardController.url()},
        {label: "Rule Templates", icon: Scale, href: RuleTemplateController.index.url()},
        {label: "Create", icon: PlusIcon}
    ];

    const {ruleCategories, ruleOperators, rulePriorities, ruleConstraintTypes, ruleUnits} = usePage().props
    const {flash} = usePage()
    const  toast = useToast()
    const createRuleTemplate = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        post(RuleTemplateController.store().url, {
            onSuccess: () => {
                toast.success('Rule template created')
            },
            onError: (errors) => {
                console.error(errors)
                const firstError = Object.values(errors)[0]
                toast.error(typeof firstError === 'string' ? firstError : 'Something went wrong')
            },
        })

    }

    const {data, setData, post, processing, errors} = useForm({
        name: '',
        condition_tag: '',
        nutrient: '',
        operator: '',
        default_value: '',
        unit: '',
        constraint_type: '',
        category: '',
        priority: '',
        clinical_rationale: '',
        evidence_source: '',
        is_active: false
    })

    return (
        <AdminPortalLayout>
            <Head title="Create Rule Template" />

            <Breadcrumbs items={BREADCRUMBS}/>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h2 className="font-serif text-3xl text-emerald-950 sm:text-4xl">
                        Create Rule Template
                    </h2>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-emerald-700/80">
                        Define a reusable nutrition rule template practitioners can quickly apply to their clients.
                    </p>
                </div>


            </div>


            <FormCard>
                <form onSubmit={createRuleTemplate}>
                    <div className="grid gap-5">
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
                  Condition Tag eg. hypertension, diabetes_t2
                </span>
                            <input
                                type="text"
                                value={data.condition_tag}
                                onChange={(e) => setData('condition_tag', e.target.value)}
                                className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"
                                autoComplete="off"
                                required
                            />
                            <Error message={errors.condition_tag} />
                        </label>
                        <label htmlFor="nutrient" className="block">
                <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                  Nutrient eg. carbs_g, energy
                </span>
                            <input
                                id="nutrient"
                                type="text"
                                value={data.nutrient}
                                onChange={(e) => setData('nutrient', e.target.value)}
                                className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"
                                autoComplete="off"
                                required
                            />
                            <Error message={errors.nutrient} />
                        </label>

                    </div>
                    <div className="grid gap-5 sm:grid-cols-3 mt-6">
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
                                value={data.default_value}
                                onChange={(e) => setData('default_value', e.target.value)}
                                className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"
                                autoComplete="off"
                            />
                            <Error message={errors.default_value} />
                        </label>
                        <label className="block">
                        <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                              Unit
                        </span>
                            <select onChange={(e) => setData('unit', e.target.value)} className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20">
                                <option value="">Select</option>
                                {enumToArray(ruleUnits).map((op: any) => (
                                    <option key={op.value} value={op.value}>{op.label}</option>
                                ))}
                            </select>
                            <Error message={errors.unit} />
                        </label>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-3 mt-6">
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
                        <label htmlFor="category" className="block">
                        <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                              Category
                        </span>
                            <select id="category" onChange={(e) => setData('category', e.target.value)} className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20" required>
                                <option value="">Select</option>
                                {enumToArray(ruleCategories).map((op: any) => (
                                    <option key={op.value} value={op.value}>{op.label}</option>
                                ))}
                            </select>
                            <Error message={errors.category} />
                        </label>
                        <label htmlFor="priority" className="block">
                        <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                              Priority
                        </span>
                            <select id="priority" onChange={(e) => setData('priority', e.target.value)} className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20" required>
                                <option value="">Select</option>
                                {enumToArray(rulePriorities).map((op: any) => (
                                    <option key={op.value} value={op.value}>{op.label}</option>
                                ))}
                            </select>
                            <Error message={errors.priority} />
                        </label>


                    </div>
                    <div className="grid gap-5  mt-6">
                        <label htmlFor="clinical_rationale" className="block">
                       <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                          Clinical Rationale
                        </span>
                            <textarea id="clinical_rationale" onChange={(e) => setData('clinical_rationale', e.target.value)} className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"></textarea>
                            <Error message={errors.clinical_rationale} />
                        </label>
                    </div>
                    <div className="grid gap-5  mt-6">
                        <label htmlFor="evidence_source" className="block">
                       <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                          Evidence source
                        </span>
                            <textarea id="evidence_source" onChange={(e) => setData('evidence_source', e.target.value)} className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"></textarea>
                            <Error message={errors.evidence_source} />
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
                            Create
                        </button>
                    </div>
                </form>
            </FormCard>
        </AdminPortalLayout>
    );
};

export default CreateRuleTemplatePage;
