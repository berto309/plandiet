import React, {useEffect} from 'react';
import {Crumb} from "@/types/types";
import {Edit, LayoutDashboard, User} from "lucide-react";
import {Breadcrumbs} from "@/components/Menu/Breadcrumbs";
import {Head, useForm, usePage} from "@inertiajs/react";
import FormCard from "@/components/Form/FormCard";
import {enumToArray} from "@/lib/utils";
import Error from "@/components/Notifications/Error";
import {useToast} from "@/context/ToastContext";
import PractitionerPortalLayout from "@/layouts/Portals/PractitionerPortalLayout";
import PractitionerProfileController from "@/actions/App/Http/Controllers/Users/PractitionerProfileController";
import PractitionerDashboardController
    from "@/actions/App/Http/Controllers/Analytics/Practitioner/PractitionerDashboardController";

const EditPractitionerAccountProfilePage = () => {

    const BREADCRUMBS: Crumb[] = [
        {label: "Dashboard", icon: LayoutDashboard, href: PractitionerDashboardController.url()},
        {label: "My profile", icon: User, href: PractitionerProfileController.index.url()},
        {label: "Edit", icon: Edit},

    ];

    const {auth, genders} = usePage().props
    const  toast = useToast()
    const saveProfile = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        profileForm.put(PractitionerProfileController.update.url(), {
            onSuccess: () => {
                toast.success('Profile updated')
            },
            onError: (errors) => {

                const firstError = Object.values(errors)[0]
                toast.error(typeof firstError === 'string' ? firstError : 'Something went wrong')
            },
        })



    }

    const changePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()


        passwordForm.put(PractitionerProfileController.changePassword.url(), {
            onSuccess: () => {
                toast.success('Password updated. Please login again.')
            },
            onError: (errors) => {


                const firstError = Object.values(errors)[0]
                toast.error(typeof firstError === 'string' ? firstError : 'Something went wrong')
            },

        })





    }

    const updatePractitionerProfile = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        practitionerProfileForm.put(PractitionerProfileController.updatePractitionerProfileInfo.url(), {
            onSuccess: () => {
                toast.success('Practitioner profile updated.')
            },
            onError: (errors) => {


                const firstError = Object.values(errors)[0]
                toast.error(typeof firstError === 'string' ? firstError : 'Something went wrong')
            },

        })

    }

    const profileForm = useForm({
        name: auth.user.name,
        email: auth.user.email,
        phone: auth.user.phone,
        gender: auth.user.gender,
        role: auth.user.role,
        status: auth.user.status,
        address: auth.user.address ?? '',
        post_code: auth.user.post_code ?? '',
        city: auth.user.city ?? '',
        date_of_birth: auth.user.date_of_birth,
    })

    const practitionerProfileForm = useForm({
        'practice_name': auth.user.practitioner_profile?.practice_name,
        'bio': auth.user.practitioner_profile?.bio,
        'website': auth.user.practitioner_profile?.website
    })

    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    })


    return (
        <PractitionerPortalLayout>
            <Head title="Profile" />

            <Breadcrumbs items={BREADCRUMBS}/>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h2 className="font-serif text-3xl text-emerald-950 sm:text-4xl">
                        My profile
                    </h2>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-emerald-700/80">
                        Manage your personal information and account security.
                    </p>
                </div>


            </div>


            <FormCard title="Personal Information">
                <form onSubmit={saveProfile}>
                    <div className="grid gap-5">
                        <label htmlFor="rule" className="block">
                       <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                          Name
                        </span>
                            <input
                                id="rule"
                                type="text"
                                value={profileForm.data.name}
                                onChange={(e) => profileForm.setData('name', e.target.value)}
                                className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"
                                required
                                autoComplete="off"
                            />
                            <Error message={profileForm.errors.name} />
                        </label>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2 mt-6">
                        <label htmlFor="email" className="block">
                <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                  Email
                </span>
                            <input
                                type="email"
                                value={profileForm.data.email}
                                onChange={(e) => profileForm.setData('email', e.target.value)}
                                className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"
                                autoComplete="off"
                                required
                            />
                            <Error message={profileForm.errors.email} />
                        </label>
                        <label htmlFor="nutrient" className="block">
                <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                 Phone
                </span>
                            <input
                                id="phone"
                                type="text"
                                value={profileForm.data.phone}
                                onChange={(e) => profileForm.setData('phone', e.target.value)}
                                className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"
                                autoComplete="off"
                            />
                            <Error message={profileForm.errors.phone} />
                        </label>

                    </div>
                    <div className="grid gap-5 sm:grid-cols-3 mt-6">
                        <label htmlFor="status" className="block">
                        <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                              Account Status
                        </span>
                            <div className="block text-lg font-semibold tracking-wide text-grey-800/80 uppercase">{auth.user.status}</div>
                        </label>
                        <label htmlFor="value" className="block">
                        <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                              Date of Birth
                        </span>
                            <input
                                id="date_of_birth"
                                type="date"
                                value={profileForm.data.date_of_birth}
                                onChange={(e) => profileForm.setData('date_of_birth', e.target.value)}
                                className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"
                                autoComplete="off"
                            />
                            <Error message={profileForm.errors.date_of_birth} />
                        </label>
                        <label className="block">
                        <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                              Gender
                        </span>
                            <select value={profileForm.data.gender} onChange={(e) => profileForm.setData('gender', e.target.value)} className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20" required>
                                <option value="">Select</option>
                                {enumToArray(genders).map((op: any) => (
                                    <option key={op.value} value={op.value}>{op.label}</option>
                                ))}
                            </select>
                            <Error message={profileForm.errors.gender} />
                        </label>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2 mt-6">
                        <label htmlFor="city" className="block">
                <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                  City
                </span>
                            <input
                                type="city"
                                value={profileForm.data.city}
                                onChange={(e) => profileForm.setData('city', e.target.value)}
                                className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 outline-none transition-colors focus:ring-2 focus:ring-emerald-600/20"
                                autoComplete="off"
                                required
                            />
                            <Error message={profileForm.errors.city} />
                        </label>
                        <label htmlFor="post_code" className="block">
                            <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                                Post code
                            </span>
                            <input
                                id="post_code"
                                type="text"
                                value={profileForm.data.post_code}
                                onChange={(e) => profileForm.setData('post_code', e.target.value)}
                                className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 outline-none transition-colors focus:ring-2 focus:ring-emerald-600/20"
                                autoComplete="off"
                            />
                            <Error message={profileForm.errors.post_code} />
                        </label>

                    </div>
                    <div className="grid gap-5 mt-6">
                        <label htmlFor="address" className="block">
                       <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                          Address
                        </span>
                            <textarea
                                id="address"
                                value={profileForm.data.address}
                                onChange={(e) => profileForm.setData('address', e.target.value)}
                                className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 outline-none transition-colors focus:ring-2 focus:ring-emerald-600/20"

                            >
                            </textarea>
                            <Error message={profileForm.errors.address} />
                        </label>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={profileForm.processing}
                            onClick={() => {
                            }}
                            className={`${profileForm.processing ? 'opacity-70' : 'opacity-100'} cursor-pointer mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2`}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </FormCard>


            <FormCard title="My practitioner profile information">
                <form onSubmit={updatePractitionerProfile}>
                    <div className="grid gap-5">
                        <label htmlFor="practice_name" className="block">
                       <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                          Practice name
                        </span>
                            <input
                                id="practice_name"
                                type="text"
                                value={practitionerProfileForm.data.practice_name}
                                onChange={(e) => practitionerProfileForm.setData('practice_name', e.target.value)}
                                className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"
                                required
                                autoComplete="off"
                            />
                            <Error message={practitionerProfileForm.errors.practice_name} />
                        </label>
                    </div>
                    <div className="grid gap-5 mt-5">
                        <label htmlFor="website" className="block">
                       <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                          Website
                        </span>
                            <input
                                id="website"
                                type="text"
                                value={practitionerProfileForm.data.website}
                                onChange={(e) => practitionerProfileForm.setData('website', e.target.value)}
                                className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"
                                autoComplete="off"
                            />
                            <Error message={practitionerProfileForm.errors.website} />
                        </label>
                    </div>

                    <div className="grid gap-5 mt-5">
                        <label htmlFor="bio" className="block">
                       <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                          Bio
                        </span>
                            <textarea
                                id="bio"
                                value={practitionerProfileForm.data.bio}
                                onChange={(e) => practitionerProfileForm.setData('bio', e.target.value)}
                                className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"
                                required
                            ></textarea>
                            <Error message={practitionerProfileForm.errors.bio} />
                        </label>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={practitionerProfileForm.processing}
                            onClick={() => {
                            }}
                            className={`${practitionerProfileForm.processing ? 'opacity-70' : 'opacity-100'} cursor-pointer mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2`}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </FormCard>

            <FormCard title="Change password">
                <form onSubmit={changePassword}>
                    <div className="grid gap-5">
                        <label htmlFor="current_password" className="block">
                       <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                          Current password
                        </span>
                            <input
                                id="current_password"
                                type="password"
                                value={passwordForm.data.current_password}
                                onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                                className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"
                                required
                            />
                            <Error message={passwordForm.errors.current_password} />
                        </label>
                    </div>
                    <div className="grid gap-5 mt-5">
                        <label htmlFor="password" className="block">
                       <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                          New password
                        </span>
                            <input
                                id="password"
                                type="password"
                                value={passwordForm.data.password}
                                onChange={(e) => passwordForm.setData('password', e.target.value)}
                                className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"
                                required
                            />
                            <Error message={passwordForm.errors.password} />
                        </label>
                    </div>
                    <div className="grid gap-5 mt-5">
                        <label htmlFor="password" className="block">
                       <span className="mb-1.5 block text-xs font-semibold tracking-wide text-emerald-800/80 uppercase">
                          Confirm password
                        </span>
                            <input
                                id="password_confirmation"
                                type="password"
                                value={passwordForm.data.password_confirmation}
                                onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                                className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"
                                required
                            />
                            <Error message={passwordForm.errors.password_confirmation} />
                        </label>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={passwordForm.processing}
                            onClick={() => {
                            }}
                            className={`${passwordForm.processing ? 'opacity-70' : 'opacity-100'} cursor-pointer mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2`}
                        >
                            Change password
                        </button>
                    </div>
                </form>
            </FormCard>
        </PractitionerPortalLayout>
    );
};

export default EditPractitionerAccountProfilePage;
