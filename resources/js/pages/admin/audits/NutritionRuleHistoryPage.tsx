import React, { ReactNode } from "react";
import AdminPortalLayout from "@/layouts/Portals/AdminPortalLayout";
import {Link, usePage} from "@inertiajs/react";
import { FileSearchCorner, LayoutDashboard} from "lucide-react";
import {Breadcrumbs} from "@/components/Menu/Breadcrumbs";
import {Crumb} from "@/types/types";
import AdminDashboardController from "@/actions/App/Http/Controllers/Analytics/Admin/AdminDashboardController";
import {DataTableColumn, DataTableRowActionLink} from "@/types/datatable";
import DataTable from "@/components/Table/DataTable";
import {formatDate, initials} from "@/lib/utils";
import NutritionRuleHistoryController from "@/actions/App/Http/Controllers/Audits/NutritionRuleHistoryController";


export default function NutritionRuleHistoryPage(): ReactNode {

    const { nutritionRuleHistory } = usePage().props
    const BREADCRUMBS: Crumb[] = [
        { label: "Dashboard", icon: LayoutDashboard, href: AdminDashboardController.url() },
        { label: "Audit", icon: FileSearchCorner}
    ];

    const columns: DataTableColumn[] = [
        {
            key: "created_at",
            header: "Date",
            render: (row) => <div>
                <span className="whitespace-nowrap text-stone-500">{formatDate(row.created_at)}</span>
            </div>
        },
        {
            key: "name",
            header: "User",
            render: (row) =>  <div
                className="flex items-center gap-3 hover:bg-sage-50 transition-colors cursor-pointer">
                <div
                    className={`w-7 h-7 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}>{initials(row.changed_by.name)}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-sage-800">{row.changed_by.name}</div>
                </div>
            </div>
        },
        {
            key: "description",
            header: "Description",
            render: (row) => <span className="whitespace-nowrap text-stone-500">{row.action} nutrition rule: {row.nutrition_rule.name}</span>
        },

    ];

    const rowActionLink: DataTableRowActionLink = {
        href: (row:any) => NutritionRuleHistoryController.show(row.id).url
    }

    return (
        <AdminPortalLayout>
            <Breadcrumbs items={BREADCRUMBS} />
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h2 className="font-serif text-3xl text-emerald-950 sm:text-4xl">
                        Nutrition Rule History
                    </h2>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-emerald-700/80">
                        Audit trail for nutrition rules created by practitioners
                    </p>
                </div>
            </div>

                <DataTable
                    title="Nutrition Rules History"
                    data={nutritionRuleHistory.data}
                    columns={columns}
                    getRowId={(row: any): string => row.id}
                    getSearchText={(row) => `${row.user.name}`}
                    rowActionLink={rowActionLink}
                />


        </AdminPortalLayout>
    );
}
