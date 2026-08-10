import React from 'react';
import {Crumb} from "@/types/types";
import {LayoutDashboard, Mail, Send, Users} from "lucide-react";
import {Breadcrumbs} from "@/components/Menu/Breadcrumbs";
import {useForm} from "@inertiajs/react";
import PractitionerClientController from "@/actions/App/Http/Controllers/Users/PractitionerClientController";
import PractitionerPortalLayout from "@/layouts/Portals/PractitionerPortalLayout";
import FormCard from "@/components/Form/FormCard";
import Error from "@/components/Notifications/Error";
import InviteController from "@/actions/App/Http/Controllers/Invites/InviteController";
import {useToast} from "@/context/ToastContext";

const CreateInvitePage = () => {

    const BREADCRUMBS: Crumb[] = [
        {label: "Dashboard", icon: LayoutDashboard, href: PractitionerClientController.index.url()},
        {label: "Invites", icon: Mail},
        {label: "Send Invite", icon: Send}
    ];



    const toast = useToast()

    const {data, post, processing, setData, errors} = useForm({
        invited_name: '',
        email: '',
        next_review_date: ''
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





    return (
        <PractitionerPortalLayout>
            <Breadcrumbs items={BREADCRUMBS} />
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h2 className="font-serif text-3xl text-emerald-950 sm:text-4xl">
                        Send Invite
                    </h2>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-emerald-700/80">
                        Send an invite to your client
                    </p>
                </div>


            </div>


            <FormCard title="Send invite">
                <form onSubmit={sendInvite}>
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
                                />
                                <Error message={errors.email} />
                            </label>
                            <label htmlFor="next_review_date" className="block">
                       <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                          Appointment date after client accepts invite
                        </span>
                                <input
                                    id="next_review_date"
                                    type="date"
                                    value={data.next_review_date}
                                    onChange={(e) => setData('next_review_date', e.target.value)}
                                    className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"
                                    required
                                />
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
                            Send invite
                        </button>
                    </div>
                </form>
            </FormCard>


        </PractitionerPortalLayout>
    );



};

export default CreateInvitePage;
