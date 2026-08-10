import React from 'react';
import {Crumb} from "@/types/types";
import {LayoutDashboard, Scale} from "lucide-react";
import AdminDashboardController from "@/actions/App/Http/Controllers/Analytics/Admin/AdminDashboardController";
import {DataTableColumn, DataTableRowActionLink} from "@/types/datatable";
import {Breadcrumbs} from "@/components/Menu/Breadcrumbs";
import DataTable from "@/components/Table/DataTable";
import {Link, usePage} from "@inertiajs/react";
import RuleTemplateController from "@/actions/App/Http/Controllers/Tools/RuleEditor/RuleTemplateController";
import NutritionRuleController from "@/actions/App/Http/Controllers/Tools/RuleEditor/NutritionRuleController";
import PractitionerPortalLayout from "@/layouts/Portals/PractitionerPortalLayout";

const NutritionRulesListPage = () => {

    const BREADCRUMBS: Crumb[] = [
        {label: "Dashboard", icon: LayoutDashboard, href: AdminDashboardController.url()},
        {label: "Rule Editor", icon: Scale}
    ];

    const {nutritionRules} = usePage().props

    const columns: DataTableColumn[] = [
        {
            key: "name",
            header: "Name",
            render: (row) => <div>
                <span className="whitespace-nowrap text-stone-500">{row.name}</span>
                <div className="font-medium text-(--dark)">{row.client.name}</div>
            </div>
        },
        {
            key: "nutrient",
            header: "Nutrient",
            render: (row) => <span className="whitespace-nowrap text-stone-500">{row.nutrient} {row.operator_translation} {row.value}{row.unit}</span>
        },
        {
            key: "is_active",
            header: "Active",
            render: (row) => <span className="whitespace-nowrap text-stone-500">{row.is_active ? 'Yes' : 'No'}</span>
        },
        {
            key: "constraint_type",
            header: "Constraint",
            render: (row) => <span className="whitespace-nowrap text-stone-500 uppercase">{row.constraint_type}</span>
        },

    ];



    const rowActionLink: DataTableRowActionLink = {
        href: (row:any) => NutritionRuleController.show(row.id).url
    }

    return (
        <PractitionerPortalLayout>
            <Breadcrumbs items={BREADCRUMBS} />
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h2 className="font-serif text-3xl text-emerald-950 sm:text-4xl">
                        Rule Editor
                    </h2>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-emerald-700/80">
                        A workspace where practitioners can view, organize, and refine the nutrition rules they’ve created for clients.
                    </p>
                </div>
                <Link href={NutritionRuleController.create.url()}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 focus:ring-offset-stone-100">+
                    Add nutrition rule
                </Link>

            </div>

            <DataTable
                title="Nutrition rules"
                data={nutritionRules.data}
                columns={columns}
                getRowId={(row: any): string => row.id}
                getSearchText={(row) => `${row.name}`}
                rowActionLink={rowActionLink}
            />
        </PractitionerPortalLayout>
    );



};

export default NutritionRulesListPage;
