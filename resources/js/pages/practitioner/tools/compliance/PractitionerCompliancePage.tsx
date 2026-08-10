import React, {ReactNode, useEffect, useState} from "react";

import {Head, usePage} from "@inertiajs/react";
import {ChartSpline, LayoutDashboard} from "lucide-react";
import {Breadcrumbs} from "@/components/Menu/Breadcrumbs";
import {Crumb} from "@/types/types";
import PractitionerPortalLayout from "@/layouts/Portals/PractitionerPortalLayout";
import PractitionerDashboardController
    from "@/actions/App/Http/Controllers/Analytics/Practitioner/PractitionerDashboardController";
import {DataTableColumn, DataTableRowActionLink} from "@/types/datatable";
import {initials} from "@/lib/utils";
import ClientsOverviewController from "@/actions/App/Http/Controllers/Analytics/Client/ClientsOverviewController";
import DataTable from "@/components/Table/DataTable";
import PractitionerComplianceController
    from "@/actions/App/Http/Controllers/Tools/Compliance/PractitionerComplianceController";




export default function ClientCompliancePage(): ReactNode {

    const { practitionerCompliance } = usePage().props
    const BREADCRUMBS: Crumb[] = [
        { label: "Dashboard", icon: LayoutDashboard, href: PractitionerDashboardController.url() },
        { label: "Compliance", icon: ChartSpline}
    ];


    const columns: DataTableColumn[] = [
        {
            key: "name",
            header: "Client",
            render: (row) =>
                <div
                    className="flex items-center gap-3 hover:bg-sage-50 transition-colors cursor-pointer">
                    <div
                        className={`w-7 h-7 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center shrink-0`}>{initials(row.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-sage-800">{row.name}</div>
                        <div className="text-xs text-sage-400">{row.email}</div>
                    </div>
                </div>
        },
        {
            key: "phone",
            header: "Phone",
            render: (row) => <span className="whitespace-nowrap text-stone-500">{row.phone}</span>
        },
        {
            key: "condition",
            header: "Condition",
            render: (row) => <span className="whitespace-nowrap text-stone-500">{row.conditions.join(' · ')}</span>
        },
        {
            key: "plans",
            header: "Plans",
            render: (row) => <span className="whitespace-nowrap text-stone-500">{row.meal_plans_count}/7</span>
        },
    ];



    const rowActionLink: DataTableRowActionLink = {
        href: (row:any) => PractitionerComplianceController.show(row.id).url
    }




    return (
        <PractitionerPortalLayout>
            <Head title="Compliance" />
            <Breadcrumbs items={BREADCRUMBS}/>

            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h2 className="font-serif text-3xl text-emerald-950 sm:text-4xl">
                        Compliance
                    </h2>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-emerald-700/80">
                        The compliance page helps to review nutrition targets, track meal-plan adherence, and identify potential areas where a client’s plan may need attention or can be used a part in meetings with clients.
                    </p>
                </div>

            </div>


            <DataTable
                title="Client compliances this week"
                data={practitionerCompliance.data}
                columns={columns}
                getRowId={(row: any): string => row.id}
                getSearchText={(row) => `${row.name}`}
                rowActionLink={rowActionLink}
            />


        </PractitionerPortalLayout>
    );
}
