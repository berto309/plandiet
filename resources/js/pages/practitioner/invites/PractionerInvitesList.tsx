import React, {useState} from 'react';
import {Crumb} from "@/types/types";
import {Ban, LayoutDashboard, Mail, RefreshCw, Trash2, Users} from "lucide-react";
import {DataTableColumn, DataTableRowAction, DataTableRowActionLink} from "@/types/datatable";
import {Breadcrumbs} from "@/components/Menu/Breadcrumbs";
import DataTable from "@/components/Table/DataTable";
import {Link, useForm, usePage} from "@inertiajs/react";
import {formatDate, getDatePlusDay, initials} from "@/lib/utils";
import PractitionerClientController from "@/actions/App/Http/Controllers/Users/PractitionerClientController";
import PractitionerPortalLayout from "@/layouts/Portals/PractitionerPortalLayout";
import InviteController from "@/actions/App/Http/Controllers/Invites/InviteController";
import {useToast} from "@/context/ToastContext";
import {ConfirmModalConfig} from "@/components/Modal/ConfirmModal";

const PractitionerInvitesPage = () => {

    const BREADCRUMBS: Crumb[] = [
        {label: "Dashboard", icon: LayoutDashboard, href: PractitionerClientController.index.url()},
        {label: "Invites", icon: Mail}
    ];


    const {invites} = usePage().props

    const toast = useToast()

    const [confirmRevokeModal, setconfirmRevokeModal] = useState<ConfirmModalConfig | null>(null)
    const [confirmResendModal, setconfirmResendModal] = useState<ConfirmModalConfig | null>(null)

    const {data, post, processing, setData, errors} = useForm({
       id: ''
    })

    function sendInvite(e: React.MouseEvent<HTMLButtonElement>)
    {
        e.preventDefault()
        post(InviteController.store().url,{
            onSuccess: () => {
                toast.success('Invite sent to client')
            },
            onError: (errors) => {

                const firstError = Object.values(errors)[0]
                toast.error(typeof firstError === 'string' ? firstError : 'Something went wrong')
            },
        })
    }

    const openResendModal = (row: any) => {

        setData('id', row.id)

        setconfirmResendModal({
            title: "Resend invite?",
            confirmLabel: "Yes",
            processing: processing,
            danger: false,
        })
    }


    const openRevokeModal = (row: any) => {

        setData('id', row.id)

        setconfirmResendModal({
            title: "Revoke/Delete invite?",
            confirmLabel: "Yes",
            processing: processing,
            danger: false,
        })
    }

    const columns: DataTableColumn[] = [
        {
            key: "invited_name",
            header: "Client",
            render: (row) =>
                <div
                    className="flex items-center gap-3 hover:bg-sage-50 transition-colors cursor-pointer">
                    <div
                        className={`w-7 h-7 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}>{initials(row.invited_name)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-sage-800">{row.invited_name}</div>
                        <div className="text-xs text-sage-400">{row.email}</div>
                    </div>
                </div>
        },
        {
            key: "status",
            header: "Status",
            render: (row) => <span className="whitespace-nowrap text-stone-500 uppercase">{row.status}</span>
        },
        {
            key: "expires_at",
            header: "Expires",
            render: (row) => <span className="whitespace-nowrap text-stone-500 upppercase">{formatDate(row.expires_at)}</span>
        },
        {
            key: "created_at",
            header: "Date invited",
            render: (row) => <span className="whitespace-nowrap text-stone-500 upppercase">{formatDate(row.created_at)}</span>
        },
    ];



    const rowActionLink: DataTableRowActionLink = {
        href: (row:any) => InviteController.show(row.id).url
    }

    const rowActions: DataTableRowAction[] = [
        {
            label: "Resend invite",
            icon: RefreshCw,
            show: (row) => row.status === "pending" || row.status === "expired",
            onClick: (row) => openResendModal(row),
        },
        {
            label: "Revoke invite",
            icon: Ban,
            danger: true,
            show: (row) => row.status === "pending",
            onClick: (row)=> openRevokeModal(row),
        },
    ];

    return (
        <PractitionerPortalLayout>
            <Breadcrumbs items={BREADCRUMBS} />
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h2 className="font-serif text-3xl text-emerald-950 sm:text-4xl">
                        Invites
                    </h2>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-emerald-700/80">
                        List of all invitations sent to your clients
                    </p>
                </div>

                <Link href={InviteController.create.url()}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 focus:ring-offset-stone-100">+
                    Create invite
                </Link>
            </div>




            <DataTable
                title="Invite List"
                data={invites.data}
                columns={columns}
                getRowId={(row: any): string => row.id}
                getSearchText={(row) => `${row.invited_name}`}
                rowActionLink={rowActionLink}
            />
        </PractitionerPortalLayout>
    );



};

export default PractitionerInvitesPage;
