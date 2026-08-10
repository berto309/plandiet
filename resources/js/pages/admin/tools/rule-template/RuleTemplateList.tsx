import React from 'react';
import AdminPortalLayout from "@/layouts/Portals/AdminPortalLayout";
import {Crumb} from "@/types/types";
import {LayoutDashboard, Scale, Users} from "lucide-react";
import AdminDashboardController from "@/actions/App/Http/Controllers/Analytics/Admin/AdminDashboardController";
import {DataTableColumn, DataTableRowActionLink} from "@/types/datatable";
import {Breadcrumbs} from "@/components/Menu/Breadcrumbs";
import DataTable from "@/components/Table/DataTable";
import {Link, usePage} from "@inertiajs/react";
import RuleTemplateController from "@/actions/App/Http/Controllers/Tools/RuleEditor/RuleTemplateController";

const RuleTemplateList = () => {

    const BREADCRUMBS: Crumb[] = [
        {label: "Dashboard", icon: LayoutDashboard, href: AdminDashboardController.url()},
        {label: "Rule Templates", icon: Scale}
    ];

    const {ruleTemplates} = usePage().props

    const columns: DataTableColumn[] = [
        {
            key: "name",
            header: "Template",
            render: (row) => <span className="whitespace-nowrap text-stone-500">{row.name}</span>
        },
        {
            key: "nutrient",
            header: "Nutrient",
            render: (row) => <span className="whitespace-nowrap text-stone-500">{row.nutrient} {row.operator_translation} {row.default_value}{row.unit}</span>
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
        href: (row:any) => RuleTemplateController.show(row.slug).url
    }

    return (
        <AdminPortalLayout>
            <Breadcrumbs items={BREADCRUMBS} />
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h2 className="font-serif text-3xl text-emerald-950 sm:text-4xl">
                        Rule Templates
                    </h2>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-emerald-700/80">
                        Predefined nutrition rule templates to help practitioners build client nutrition rules faster.
                    </p>
                </div>
                <Link href={RuleTemplateController.create.url()}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 focus:ring-offset-stone-100">+
                    Add rule
                </Link>

            </div>

            <DataTable
                title="Rule Templates"
                data={ruleTemplates.data}
                columns={columns}
                getRowId={(row: any): string => row.id}
                getSearchText={(row) => `${row.name}`}
                rowActionLink={rowActionLink}
            />
        </AdminPortalLayout>
    );



};

export default RuleTemplateList;
