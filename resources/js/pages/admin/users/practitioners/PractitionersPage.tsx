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
import {formatDate, initials} from "@/lib/utils";

const PractitionersPage = () => {

    const BREADCRUMBS: Crumb[] = [
        {label: "Dashboard", icon: LayoutDashboard, href: AdminDashboardController.url()},
        {label: "Practitioners", icon: Users}
    ];

    const {practitioners} = usePage().props

    const columns: DataTableColumn[] = [
        {
            key: "name",
            header: "Practitioner",
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
            key: "profession",
            header: "Profession",
            render: (row) => <span className="whitespace-nowrap text-stone-500">{row.practitioner_profile?.professional_title}</span>
        },
        {
            key: "reg_number",
            header: "Registration No",
            render: (row) => <span className="whitespace-nowrap text-stone-500">{row.practitioner_profile?.registration_number}</span>
        },
        {
            key: "verification_status",
            header: "Verification Status",
            render: function (row){
                let status: string = row.practitioner_profile?.verification_status

                if(isUnderReview(status)) {
                     return <span className="badge bg-yellow-100 text-yellow-700 uppercase">{status}</span>
                } else if(isVerified(status)) {
                    return <span className="badge bg-emerald-100 text-emerald-700 uppercase">{status}</span>
                } else {
                    return <span className="badge bg-red-100 text-red-700 uppercase">{status}</span>
                }
            }
        },
    ];



    const rowActionLink: DataTableRowActionLink = {
        href: (row:any) => PractitionersManagementController.show(row.id).url
    }

    return (
        <AdminPortalLayout>
            <Breadcrumbs items={BREADCRUMBS} />
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h2 className="font-serif text-3xl text-emerald-950 sm:text-4xl">
                        Practitioners
                    </h2>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-emerald-700/80">
                        Complete list of all registered practitioners on the platform.
                    </p>
                </div>

            </div>


            <DataTable
                title="All registered practitioners"
                data={practitioners.data}
                columns={columns}
                getRowId={(row: any): string => row.id}
                getSearchText={(row) => `${row.name}`}
                rowActionLink={rowActionLink}
            />
        </AdminPortalLayout>
    );
};

export default PractitionersPage;
