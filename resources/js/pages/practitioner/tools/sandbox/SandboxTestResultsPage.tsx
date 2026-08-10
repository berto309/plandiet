import React from 'react';
import {Crumb} from "@/types/types";
import {LayoutDashboard, ListChecks, TestTubeDiagonal, Users} from "lucide-react";
import {DataTableColumn, DataTableRowActionLink} from "@/types/datatable";
import {Breadcrumbs} from "@/components/Menu/Breadcrumbs";
import DataTable from "@/components/Table/DataTable";
import {Link, usePage} from "@inertiajs/react";
import {formatDate, initials} from "@/lib/utils";
import PractitionerClientController from "@/actions/App/Http/Controllers/Users/PractitionerClientController";
import PractitionerPortalLayout from "@/layouts/Portals/PractitionerPortalLayout";
import ViewSandbox from "@/actions/App/Http/Controllers/Tools/Sandbox/ViewSandbox";
import ShowSandboxTestResult from "@/actions/App/Http/Controllers/Tools/Sandbox/ShowSandboxTestResult";
import ViewSandboxResults from "@/actions/App/Http/Controllers/Tools/Sandbox/ViewSandboxResults";

const SandboxTestResultsPage = () => {

    const BREADCRUMBS: Crumb[] = [
        {label: "Dashboard", icon: LayoutDashboard, href: PractitionerClientController.index.url()},
        {label: "Sandbox", icon: TestTubeDiagonal, href: ViewSandbox.url()},
        {label: "Test Results", icon: ListChecks}
    ];

    const {sandBoxResults} = usePage().props



    const columns: DataTableColumn[] = [
        {
            key: "name",
            header: "Client",
            render: (row) =>
                <div
                    className="flex items-center gap-3 hover:bg-sage-50 transition-colors cursor-pointer">
                    <div
                        className={`w-7 h-7 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}>{initials(row.client.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-sage-800">{row.client.name}</div>
                        <div className="text-xs text-sage-400">{row.client.email}</div>
                    </div>
                </div>
        },
        {
            key: "pass_count",
            header: "Passes",
            render: (row) => <span className="whitespace-nowrap text-stone-500">{row.pass_count}</span>
        },
        {
            key: "fail_count",
            header: "Fails",
            render: (row) => <span className="whitespace-nowrap text-stone-500">{row.fail_count}</span>
        },
        {
            key: "created_at",
            header: "Date",
            render: (row) => <span className="whitespace-nowrap text-stone-500">{formatDate(row.created_at)}</span>
        },
    ];



    const rowActionLink: DataTableRowActionLink = {
        href: (row:any) => ShowSandboxTestResult.url(row.id)
    }

    return (
        <PractitionerPortalLayout>
            <Breadcrumbs items={BREADCRUMBS} />
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h2 className="font-serif text-3xl text-emerald-950 sm:text-4xl">
                        Sandbox Results
                    </h2>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-emerald-700/80">
                        List of all your test results ran on the sandbox based on your client nutrition rules
                    </p>
                </div>

                <Link href={ViewSandbox.url()}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 focus:ring-offset-stone-100">
                   Go to Sandbox →
                </Link>

            </div>


            <DataTable
                title="All Sandbox test results"
                data={sandBoxResults.data}
                columns={columns}
                getRowId={(row: any): string => row.client.id}
                getSearchText={(row) => `${row.client.name}`}
                rowActionLink={rowActionLink}
            />
        </PractitionerPortalLayout>
    );



};

export default SandboxTestResultsPage;
