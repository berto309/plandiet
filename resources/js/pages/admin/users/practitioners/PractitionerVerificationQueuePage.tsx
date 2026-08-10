import type { ReactNode } from "react";
import AdminPortalLayout from "@/layouts/Portals/AdminPortalLayout";
import {usePage} from "@inertiajs/react";
import {LayoutDashboard, ShieldCheck} from "lucide-react";
import {Breadcrumbs} from "@/components/Menu/Breadcrumbs";
import {Crumb} from "@/types/types";
import AdminDashboardController from "@/actions/App/Http/Controllers/Analytics/Admin/AdminDashboardController";
import DataTable from "@/components/Table/DataTable";
import {DataTableColumn, DataTableRowActionLink} from "@/types/datatable";
import {formatDate} from "@/lib/utils";
import PractitionersManagementController from "@/actions/App/Http/Controllers/Users/PractitionersManagementController";

export default function PractitionerVerificationQueuePage(): ReactNode {


    const BREADCRUMBS: Crumb[] = [
        {label: "Dashboard", icon: LayoutDashboard, href: AdminDashboardController.url()},
        {label: "Verification Queue", icon: ShieldCheck}
    ];


    const {verificationQueue} = usePage().props

    const columns: DataTableColumn[] = [
        {
            key: "applicant",
            header: "Applicant",
            render: (row) => <span className="whitespace-nowrap text-stone-500">{row.name}</span>
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
            key: "submitted",
            header: "Submitted",
            render: (row) => <span className="whitespace-nowrap text-stone-500">{formatDate(row.practitioner_profile?.created_at)}</span>
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
                        Verification Queue
                    </h2>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-emerald-700/80">
                        Review practitioner applications and verify credentials
                    </p>
                </div>

            </div>



            <DataTable
                title="Practitioners under review"
                data={verificationQueue.data}
                columns={columns}
                getRowId={(row: any): string => row.id}
                getSearchText={(row) => `${row.name}`}
                rowActionLink={rowActionLink}
            />

        </AdminPortalLayout>
    );
}
