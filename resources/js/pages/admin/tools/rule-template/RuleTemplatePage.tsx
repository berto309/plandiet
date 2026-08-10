import React from 'react';
import AdminPortalLayout from "@/layouts/Portals/AdminPortalLayout";
import {Crumb} from "@/types/types";
import {LayoutDashboard, Scale, Users} from "lucide-react";
import AdminDashboardController from "@/actions/App/Http/Controllers/Analytics/Admin/AdminDashboardController";
import {Breadcrumbs} from "@/components/Menu/Breadcrumbs";
import {usePage} from "@inertiajs/react";

const RuleTemplatePage = () => {

    const BREADCRUMBS: Crumb[] = [
        {label: "Dashboard", icon: LayoutDashboard, href: AdminDashboardController.url()},
        {label: "Rule Templates", icon: Scale}
    ];

    const {ruleTemplates} = usePage().props



    return (
        <AdminPortalLayout>
            <Breadcrumbs items={BREADCRUMBS} />
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h2 className="font-serif text-3xl text-emerald-950 sm:text-4xl">
                        Rule Templates
                    </h2>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-emerald-700/80">
                        Predefined nutrition rule templates to help practitioners build client nutrition rules faster.
                    </p>
                </div>

            </div>


        </AdminPortalLayout>
    );



};

export default RuleTemplatePage;
