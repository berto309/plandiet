import type { ReactNode } from "react";
import AdminPortalLayout from "@/layouts/Portals/AdminPortalLayout";
import {formatDate, getDatePlusDay, greetUser, initials} from "@/lib/utils";
import {Link, usePage} from "@inertiajs/react";
import {ArrowRight, LayoutDashboard} from "lucide-react";
import VerificationQueueController from "@/actions/App/Http/Controllers/VerificationQueue/VerificationQueueController";
import ClientsOverviewController from "@/actions/App/Http/Controllers/Analytics/Client/ClientsOverviewController";
import EmptyState from "@/components/State/EmptyState";
import {Breadcrumbs} from "@/components/Menu/Breadcrumbs";
import {Crumb} from "@/types/types";
import PractitionersManagementController from "@/actions/App/Http/Controllers/Users/PractitionersManagementController";
import RuleTemplateController from "@/actions/App/Http/Controllers/Tools/RuleEditor/RuleTemplateController";


export default function AdminDashboardPage(): ReactNode {

    const { auth, analytics } = usePage().props
    const BREADCRUMBS: Crumb[] = [
        { label: "Dashboard", icon: LayoutDashboard },
    ];

    return (
        <AdminPortalLayout>
            <Breadcrumbs items={BREADCRUMBS} />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>

                    <h1 className="font-display text-2xl text-sage-900">{greetUser(auth.user.name)}</h1>
                    <p className="text-sm text-sage-400 font-light mt-0.5">{getDatePlusDay()}</p>
                </div>
                <Link href={RuleTemplateController.index.url()}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 focus:ring-offset-stone-100">+
                    Add rule
                </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
                <div className="bg-white rounded-2xl shadow-sm p-3.5 border border-sage-100">
                    <div className="text-xs text-sage-400 uppercase tracking-wider font-medium mb-1">Total clients</div>
                    <div className="font-display text-2xl text-blue-400">{analytics.stats.total_clients}</div>
                    {/*<div className="text-xs text-sage-500 mt-0.5">99% of 1,800</div>*/}
                    {/*<div className="comp-bar mt-1.5">*/}
                    {/*    <div className="comp-fill bg-sage-500 w-[99%]"></div>*/}
                    {/*</div>*/}
                </div>
                <div className="bg-white rounded-2xl shadow-sm p-3.5 border border-sage-100">
                    <div className="text-xs text-sage-400 uppercase tracking-wider font-medium mb-1">Unverified
                        Practitioners
                    </div>
                    <div className="font-display text-2xl text-purple-600">{analytics.stats.total_unverified_practitioners}</div>
                    {/*<div className="text-xs text-sage-500 mt-0.5">104% ↑</div>*/}
                    {/*<div className="comp-bar mt-1.5">*/}
                    {/*    <div className="comp-fill bg-sage-500 w-full" ></div>*/}
                    {/*</div>*/}
                </div>
                <div className="bg-white rounded-2xl shadow-sm p-3.5 border border-sage-100">
                    <div className="text-xs text-sage-400 uppercase tracking-wider font-medium mb-1">Verified
                        practitioners
                    </div>
                    <div className="font-display text-2xl text-amber-500">{analytics.stats.total_verified_practitioners}</div>
                    {/*<div className="text-xs text-amber-500 mt-0.5">93% — near limit</div>*/}
                    {/*<div className="comp-bar mt-1.5">*/}
                    {/*    <div className="comp-fill bg-amber-400 w-[93%]" ></div>*/}
                    {/*</div>*/}
                </div>
                <div className="bg-white rounded-2xl shadow-sm p-3.5 border border-sage-100">
                    <div className="text-xs text-sage-400 uppercase tracking-wider font-medium mb-1">Meal plans
                        generated today
                    </div>
                    <div className="font-display text-2xl text-sage-600">{analytics.stats.meal_plans_generated_today}</div>
                    {/*<div className="text-xs text-sage-500 mt-0.5">103% ✓</div>*/}
                    {/*<div className="comp-bar mt-1.5">*/}
                    {/*    <div className="comp-fill bg-sage-500 w-full"></div>*/}
                    {/*</div>*/}
                </div>

            </div>

            <div className="space-y-5">
                {/*<div className="bg-white rounded-2xl border border-sage-100 overflow-hidden">*/}
                {/*    <div className="px-5 py-4 border-b border-sage-100 flex items-center justify-between"><span*/}
                {/*        className="font-medium text-sage-800 text-sm">Alerts this week</span><span*/}
                {/*        className="badge bg-amber-100 text-amber-700">7 near-misses</span></div>*/}
                {/*    <div className="p-4 space-y-2">*/}
                {/*        <div className="flex gap-3 text-xs">*/}
                {/*            <div className="w-2 h-2 rounded-full bg-amber-400 mt-0.5 flex-shrink-0"></div>*/}
                {/*            <div><span className="font-medium text-sage-700">Marcus</span> — sodium near daily ceiling*/}
                {/*                (1,380/1,500mg)*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div className="flex gap-3 text-xs">*/}
                {/*            <div className="w-2 h-2 rounded-full bg-amber-400 mt-0.5 flex-shrink-0"></div>*/}
                {/*            <div><span className="font-medium text-sage-700">Fatima</span> — dinner carbs at 38g (limit*/}
                {/*                40g)*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div className="flex gap-3 text-xs">*/}
                {/*            <div className="w-2 h-2 rounded-full bg-red-400 mt-0.5 flex-shrink-0"></div>*/}
                {/*            <div><span className="font-medium text-sage-700">Tom</span> — no plan generated for 5 days*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div className="flex gap-3 text-xs">*/}
                {/*            <div className="w-2 h-2 rounded-full bg-sage-400 mt-0.5 flex-shrink-0"></div>*/}
                {/*            <div><span className="font-medium text-sage-700">Aisha</span> — fibre target consistently*/}
                {/*                exceeded ↑*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="grid lg:grid-cols-2 gap-5">

                    <div className="bg-white rounded-2xl shadow-sm border border-sage-100 overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-sage-100 font-medium text-sage-800 text-sm">
                            <span className="font-medium text-sage-800 text-sm">Recent practitioners under review</span>
                            <Link href={VerificationQueueController.url()}
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-800 px-5 py-1.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 focus:ring-offset-stone-100">
                                View all
                                <ArrowRight size={15} />
                            </Link>
                        </div>
                        <div className="divide-y divide-sage-50">
                            { analytics.recent_practitioners_under_review.length > 0 ?
                                analytics.recent_practitioners_under_review.map((practitioner: any) => (
                                    <Link href={PractitionersManagementController.show.url(practitioner.id)} key={practitioner.id}
                                         className="flex items-center gap-3 px-5 py-3 hover:bg-sage-50 transition-colors cursor-pointer">
                                        <div
                                            className={`w-7 h-7 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}>{initials(practitioner.name)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-medium text-sage-800">{practitioner.name}</div>
                                            <div className="text-xs text-sage-400">Joined · {formatDate(practitioner.created_at)}</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`badge bg-yellow-100 text-yellow-700 uppercase`}>{practitioner.practitioner_profile?.verification_status}</span>
                                        </div>
                                    </Link>

                                ))
                                : <EmptyState emptyTitle="No unverified practitioners" emptyDescription="No practitioner under review avaialable" />
                            }
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-sage-100 overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-sage-100 font-medium text-sage-800 text-sm">
                            <span className="font-medium text-sage-800 text-sm">Recent clients</span>
                            <Link href={ClientsOverviewController.index.url()}
                                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-800 px-5 py-1.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 focus:ring-offset-stone-100">
                                View all
                                <ArrowRight size={15} />
                            </Link>
                        </div>
                        <div className="divide-y divide-sage-50">
                            { analytics.recent_clients.length > 0 ?
                                analytics.recent_clients.map((client: any) => (
                                    <Link href={ClientsOverviewController.show.url(client.id)} key={client.id}
                                         className="flex items-center gap-3 px-5 py-3 hover:bg-sage-50 transition-colors cursor-pointer">
                                        <div
                                            className={`w-7 h-7 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}>{initials(client.name)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-medium text-sage-800">{client.name}</div>
                                            <div className="text-xs text-sage-400">Joined · {formatDate(client.created_at)}</div>
                                        </div>
                                        {/*<div className="flex items-center gap-2">*/}
                                        {/*    <div className="comp-bar w-14">*/}
                                        {/*        <div className="comp-fill bg-sage-500 w-[95%]"></div>*/}
                                        {/*    </div>*/}
                                        {/*    <span className="text-xs text-sage-600 font-medium">95%</span>*/}
                                        {/*</div>*/}
                                    </Link>
                                ))
                                : <EmptyState emptyTitle="No clients" emptyDescription="No clients avaialable" />
                            }
                        </div>
                    </div>

                </div>
            </div>
        </AdminPortalLayout>
    );
}
