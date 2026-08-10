import React from 'react';
import {Crumb} from "@/types/types";
import {LayoutDashboard, Users} from "lucide-react";
import {DataTableColumn, DataTableRowActionLink} from "@/types/datatable";
import {Breadcrumbs} from "@/components/Menu/Breadcrumbs";
import DataTable from "@/components/Table/DataTable";
import {usePage} from "@inertiajs/react";
import {initials} from "@/lib/utils";
import PractitionerClientController from "@/actions/App/Http/Controllers/Users/PractitionerClientController";
import PractitionerPortalLayout from "@/layouts/Portals/PractitionerPortalLayout";

const PractitionerClientsPage = () => {

    const BREADCRUMBS: Crumb[] = [
        {label: "Dashboard", icon: LayoutDashboard, href: PractitionerClientController.index.url()},
        {label: "Clients", icon: Users}
    ];

    const {practitioner_clients} = usePage().props

    const columns: DataTableColumn[] = [
        {
            key: "name",
            header: "Client",
            render: (row) =>
                <div
                    className="flex items-center gap-3 hover:bg-sage-50 transition-colors cursor-pointer">
                    <div
                        className={`w-7 h-7 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}>{initials(row.user.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-sage-800">{row.user.name}</div>
                        <div className="text-xs text-sage-400">{row.user.email}</div>
                    </div>
                </div>
        },
        {
            key: "phone",
            header: "Phone",
            render: (row) => <span className="whitespace-nowrap text-stone-500">{row.user.phone}</span>
        },
        {
            key: "condition",
            header: "Condition",
            render: (row) => <span className="whitespace-nowrap text-stone-500">{row.user.client_health_profile?.conditions.length > 0 ? row.user.client_health_profile?.conditions?.join(', ') : ''}</span>
        },
    ];



    const rowActionLink: DataTableRowActionLink = {
        href: (row:any) => row.user.client_health_profile ?  PractitionerClientController.show(row.user.id).url :  PractitionerClientController.create(row.user.id).url
    }

    return (
        <PractitionerPortalLayout>
            <Breadcrumbs items={BREADCRUMBS} />
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h2 className="font-serif text-3xl text-emerald-950 sm:text-4xl">
                        Clients
                    </h2>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-emerald-700/80">
                        List of all your assigned clients on this platform.
                    </p>
                </div>

            </div>


            <DataTable
                title="All Clients"
                data={practitioner_clients.data}
                columns={columns}
                getRowId={(row: any): string => row.user.id}
                getSearchText={(row) => `${row.user.name}`}
                rowActionLink={rowActionLink}
            />
        </PractitionerPortalLayout>
    );



};

export default PractitionerClientsPage;
