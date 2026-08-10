import React, {ReactNode, useEffect, useState} from "react";

import {Head, useForm, usePage} from "@inertiajs/react";
import {Calendar, ChartSpline, LayoutDashboard} from "lucide-react";
import {Breadcrumbs} from "@/components/Menu/Breadcrumbs";
import {Crumb} from "@/types/types";
import ClientPortalLayout from "@/layouts/Portals/ClientPortalLayout";
import ClientDashboardController from "@/actions/App/Http/Controllers/Analytics/Client/ClientDashboardController";
import PractitionerPortalLayout from "@/layouts/Portals/PractitionerPortalLayout";




export default function ClientCompliancePage(): ReactNode {

const { auth, client_dashboard_analytics } = usePage().props
    const BREADCRUMBS: Crumb[] = [
        { label: "Dashboard", icon: LayoutDashboard, href: ClientDashboardController.url() },
        { label: "Compliance", icon: ChartSpline}
    ];





            return (
            <PractitionerPortalLayout>
                <Head title="Compliance" />
                <Breadcrumbs items={BREADCRUMBS}/>

                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <h2 className="font-serif text-3xl text-emerald-950 sm:text-4xl">
                            Compliance
                        </h2>
                        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-emerald-700/80">
                            Your compliance reflects how closely you’ve followed your prescribed nutrition and meal plan over the selected period.
                            Consistent adherence helps ensure optimal progress toward your health and wellness goals.
                            Your compliance helps to review nutrition targets, track meal-plan adherence, and identify potential areas where a client’s plan may need attention.
                        </p>
                    </div>

                </div>





            </PractitionerPortalLayout>
            );
            }
