import { useState } from "react";
import type { ComponentType, ReactNode } from "react";
import {
    LayoutDashboard,
    Users,
    ShieldCheck,
    Settings,
    Menu,
    X,
    Scale,
    User,
} from "lucide-react";
import {NavSection} from "@/types/types";
import {AdminAccountMenu} from "@/components/Menu/AdminAccountMenu";
import {Link, usePage} from "@inertiajs/react";
import AdminDashboardController from "@/actions/App/Http/Controllers/Analytics/Admin/AdminDashboardController";
import VerificationQueueController from "@/actions/App/Http/Controllers/VerificationQueue/VerificationQueueController";
import PractitionersManagementController from "@/actions/App/Http/Controllers/Users/PractitionersManagementController";
import ClientsOverviewController from "@/actions/App/Http/Controllers/Analytics/Client/ClientsOverviewController";
import RuleTemplateController from "@/actions/App/Http/Controllers/Tools/RuleEditor/RuleTemplateController";



const NAV_SECTIONS: NavSection[] = [
    {
        label: "Overview",
        items: [
            { name: "Dashboard", icon: LayoutDashboard, href: AdminDashboardController().url, },
            { name: "Verification Queue", icon: ShieldCheck, href: VerificationQueueController.url()},
            { name: "Practitioners", icon: Users, href: PractitionersManagementController.index.url()},
            { name: "Clients", icon: Users, href: ClientsOverviewController.index.url() },
            { name: "Rule Templates", icon: Scale, href: RuleTemplateController.index.url()}
        ],
    },
    // {
    //     label: "Account",
    //     items: [
    //         { name: "Settings", icon: Settings, href: AdminSettingsController.index.name },
    //         { name: "Profile", icon: User, href: AdminProfileController.index.name },
    //     ],
    // },
];



interface SidebarProps {
    onClose: () => void;
}

function Sidebar({ onClose }: SidebarProps): ReactNode {
    const {auth} = usePage().props

    return (
        <div className="flex h-full flex-col bg-emerald-950 text-emerald-50">
            <div className="flex items-center justify-between px-6 pt-7 pb-6">
                <div>
                    <h1 className="font-serif text-2xl tracking-tight text-white">
                        PlanDiet
                    </h1>
                    <p className="mt-0.5 text-[11px] text-capitalize font-medium tracking-[0.18em] text-emerald-400/80 uppercase">
                        {auth.user.role}
                    </p>
                </div>
                <button
                    onClick={onClose}
                    className="rounded-md p-1.5 text-emerald-300 hover:bg-emerald-900 hover:text-white md:hidden"
                    aria-label="Close menu"
                    type="button"
                >
                    <X size={20} />
                </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4">
                {NAV_SECTIONS.map((section: NavSection) => (
                    <div key={section.label} className="mb-6">
                        <p className="mb-2 px-2 text-[11px] font-semibold tracking-[0.18em] text-emerald-500/70 uppercase">
                            {section.label}
                        </p>
                        <ul className="space-y-1">
                            {section.items.map(({ name, icon: Icon, active, href }) => (
                                <li key={name}>
                                    <Link
                                        href={href}
                                        className={`group flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                                            active
                                                ? "border-emerald-800 bg-emerald-900 font-medium text-white"
                                                : "border-transparent text-emerald-200/80 hover:bg-emerald-900/60 hover:text-white"
                                        }`}
                                    >
                                        <Icon
                                            size={17}
                                            strokeWidth={2}
                                            className={
                                                active
                                                    ? "text-emerald-300"
                                                    : "text-emerald-500 group-hover:text-emerald-300"
                                            }
                                        />
                                        {name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </nav>
            <div className="border-t border-emerald-900 px-3 py-3 cursor-pointer">
            <AdminAccountMenu align="left" />
            </div>
        </div>
    );
}




export default function AdminPortalLayout({children}: {children : ReactNode }): ReactNode {
    const {app} = usePage().props
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    return (
        <div className="flex h-screen w-full overflow-hidden bg-stone-100 font-sans text-stone-900">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');
        .font-serif { font-family: 'Fraunces', ui-serif, serif; }
        .font-sans { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

            {/* Desktop sidebar */}
            <aside className="hidden w-64 shrink-0 md:block">
                <Sidebar onClose={() => {}} />
            </aside>

            {/* Mobile sidebar overlay */}
            {menuOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    <div
                        className="absolute inset-0 bg-stone-900/50"
                        onClick={() => setMenuOpen(false)}
                    />
                    <div className="absolute inset-y-0 left-0 w-72 shadow-xl">
                        <Sidebar onClose={() => setMenuOpen(false)} />
                    </div>
                </div>
            )}

            {/* Main content */}
            <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
                {/* Mobile top bar */}
                <div className="flex items-center justify-between gap-3 border-b border-stone-200 bg-stone-50/90 px-4 py-3 backdrop-blur md:hidden">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setMenuOpen(true)}
                            className="rounded-md p-1.5 text-stone-600 hover:bg-stone-200"
                            aria-label="Open menu"
                            type="button"
                        >
                            <Menu size={22} />
                        </button>
                        <span className="font-serif text-lg text-emerald-950">{ app.name }</span>
                    </div>
                    <AdminAccountMenu variant="compact" align="right" direction="down" />
                </div>

                <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-8 sm:px-8 md:py-12">

                    {children}
                </main>
            </div>
        </div>
    );
}
