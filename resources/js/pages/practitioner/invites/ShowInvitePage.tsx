import React from 'react';
import {Crumb} from "@/types/types";
import {LayoutDashboard, Mail, Send, Users} from "lucide-react";
import {Breadcrumbs} from "@/components/Menu/Breadcrumbs";
import {Link, useForm, usePage} from "@inertiajs/react";
import PractitionerClientController from "@/actions/App/Http/Controllers/Users/PractitionerClientController";
import PractitionerPortalLayout from "@/layouts/Portals/PractitionerPortalLayout";
import FormCard from "@/components/Form/FormCard";
import Error from "@/components/Notifications/Error";
import InviteController from "@/actions/App/Http/Controllers/Invites/InviteController";
import {useToast} from "@/context/ToastContext";
import {arformatDateTime} from "@/lib/utils";

const ShowInvitePage = () => {

    const BREADCRUMBS: Crumb[] = [
        {label: "Dashboard", icon: LayoutDashboard, href: PractitionerClientController.index.url()},
        {label: "Invites", icon: Mail},
        {label: "Client Invite", icon: Send}
    ];


    const {invite} = usePage().props
    const toast = useToast()


    const {data, put, processing, setData, errors} = useForm({
        invited_name: invite.invited_name,
        email: invite.email,
        next_review_date: invite.next_review_date
    })

    const revokeForm = useForm({})

    function resendInvite(e: React.MouseEvent<HTMLButtonElement>)
    {
        e.preventDefault()
        put(InviteController.resend.url(invite.id),{
            onSuccess: () => {
                toast.success('Invite resent')
            },
            onError: (errors) => {

                const firstError = Object.values(errors)[0]
                toast.error(typeof firstError === 'string' ? firstError : 'Something went wrong')
            },
        })
    }


    function revokeInvite(id: number) {

        revokeForm.delete(InviteController.revoke.url(id))
    }

    return (
        <PractitionerPortalLayout>
            <Breadcrumbs items={BREADCRUMBS} />
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h2 className="font-serif text-3xl text-emerald-950 sm:text-4xl">
                        Client Invite
                    </h2>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-emerald-700/80">
                        View an invite sent to your client
                    </p>
                </div>


                    <button
                        onClick={() => revokeInvite(invite.id)} disabled={revokeForm.processing}
                          className={`${revokeForm.processing ? 'opacity-75' : 'opacity-100'} cursor-pointer inline-flex items-center justify-center gap-2 rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 focus:ring-offset-stone-100`}>
                        Revoke invite
                    </button>


            </div>


            <FormCard title="Send invite">
                <form onSubmit={resendInvite}>
                    <div className="grid gap-5  mb-8">
                        <label htmlFor="current_password" className="block">
                       <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                          Client Name
                        </span>
                            <input
                                id="client"
                                type="text"
                                value={data.invited_name}
                                onChange={(e) => setData('invited_name', e.target.value)}
                                className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"
                                required
                                autoFocus
                                autoComplete="off"
                                readOnly
                            />
                            <Error message={errors.invited_name} />
                        </label>
                        <div className="grid gap-5 md:grid-cols-2 mb-8">
                            <label htmlFor="email" className="block">
                       <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                          Email
                        </span>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"
                                    required
                                    autoFocus
                                    autoComplete="off"
                                    readOnly
                                />
                                <Error message={errors.email} />
                            </label>
                            <label htmlFor="next_review_date" className="block">
                       <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                          Appointment date after client accepts invite
                        </span>
                                {formatDateTime(data.next_review_date)}
                                <Error message={errors.next_review_date} />
                            </label>
                        </div>
                    </div>


                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            onClick={() => {
                            }}
                            className={`${processing ? 'opacity-70' : 'opacity-100'} cursor-pointer mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2`}
                        >
                            Resend invite
                        </button>
                    </div>
                </form>
            </FormCard>


        </PractitionerPortalLayout>
    );



};

export default ShowInvitePage;
