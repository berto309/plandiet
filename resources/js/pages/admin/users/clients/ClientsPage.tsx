import React from 'react';
import AdminPortalLayout from "@/layouts/Portals/AdminPortalLayout";
import {Crumb} from "@/types/types";
import {LayoutDashboard, Users} from "lucide-react";
import AdminDashboardController from "@/actions/App/Http/Controllers/Analytics/Admin/AdminDashboardController";
import {DataTableColumn, DataTableRowActionLink} from "@/types/datatable";
import PractitionersManagementController from "@/actions/App/Http/Controllers/Users/PractitionersManagementController";
import {Breadcrumbs} from "@/components/Menu/Breadcrumbs";
import DataTable from "@/components/Table/DataTable";
import {usePage} from "@inertiajs/react";
import {isUnderReview, isVerified} from "@/types/enums";
import {initials} from "@/lib/utils";
import ClientsOverviewController from "@/actions/App/Http/Controllers/Analytics/Client/ClientsOverviewController";

const ClientsPage = () => {

    const BREADCRUMBS: Crumb[] = [
        {label: "Dashboard", icon: LayoutDashboard, href: AdminDashboardController.url()},
        {label: "Clients", icon: Users}
    ];

    const {clients} = usePage().props

    const columns: DataTableColumn[] = [
        {
            key: "name",
            header: "Client",
            render: (row) =>
                <div
                    className="flex items-center gap-3 hover:bg-sage-50 transition-colors cursor-pointer">
                    <div
                        className={`w-7 h-7 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}>{initials(row.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-sage-800">{row.name}</div>
                        <div className="text-xs text-sage-400">{row.email}</div>
                    </div>
                </div>
        },
        {
            key: "email",
            header: "Email",
            render: (row) => <span className="whitespace-nowrap text-stone-500">{row.email}</span>
        },
        {
            key: "phone",
            header: "Phone",
            render: (row) => <span className="whitespace-nowrap text-stone-500">{row.phone}</span>
        },
        {
            key: "condition",
            header: "Condition",
            render: (row) => <span className="whitespace-nowrap text-stone-500">{row.condition_tag}</span>
        },
    ];



    const rowActionLink: DataTableRowActionLink = {
        href: (row:any) => ClientsOverviewController.show(row.id).url
    }

    return (
        <AdminPortalLayout>
            <Breadcrumbs items={BREADCRUMBS} />
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h2 className="font-serif text-3xl text-emerald-950 sm:text-4xl">
                        Clients
                    </h2>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-emerald-700/80">
                         List of all registered clients on the platform.
                    </p>
                </div>

            </div>


            <DataTable
                title="All Clients"
                data={clients.data}
                columns={columns}
                getRowId={(row: any): string => row.id}
                getSearchText={(row) => `${row.name}`}
                rowActionLink={rowActionLink}
            />
        </AdminPortalLayout>
    );



};

export default ClientsPage;
