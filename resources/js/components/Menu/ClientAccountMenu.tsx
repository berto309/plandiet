import {AccountMenuProps, IconType} from "@/types/types";
import {ReactNode, useEffect, useRef, useState} from "react";
import {ChevronsUpDown, LogOut, User} from "lucide-react";
import {Link, useForm, usePage} from "@inertiajs/react";
import {initials} from "@/lib/utils";
import ClientProfileController from "@/actions/App/Http/Controllers/Users/ClientProfileController";

export function ClientAccountMenu({align = "left", direction = "up", variant = "full", triggerClassName = "",}: AccountMenuProps): ReactNode {
    const {auth} = usePage().props

    const [open, setOpen] = useState<boolean>(false);
    const rootRef = useRef<HTMLDivElement | null>(null);

    const logoutForm = useForm()


    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        function handleKey(e: KeyboardEvent) {
            if (e.key === "Escape") setOpen(false);
        }
        document.addEventListener("mousedown", handleClick);
        document.addEventListener("keydown", handleKey);
        return () => {
            document.removeEventListener("mousedown", handleClick);
            document.removeEventListener("keydown", handleKey);
        };
    }, []);

    const items: { label: string; icon: IconType; danger?: boolean, href: string }[] = [
        { label: "Profile", icon: User, href: ClientProfileController.index.url() },
        // { label: "Settings", icon: Settings, href: AdminSettingsController.index.url() },
        { label: "Logout", icon: LogOut, danger: true, href:'/logout' },
    ];

    const isCompact = variant === "compact";
    const isUp = direction === "up";

    return (
        <div ref={rootRef} className="relative">
            {isCompact ? (
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    aria-haspopup="menu"
                    aria-expanded={open}
                    aria-label="Account menu"
                    className={`flex h-8 w-8 items-center justify-center rounded-full bg-emerald-800 text-xs font-semibold text-white ring-offset-2 transition-all hover:bg-emerald-700 ${
                        open ? "ring-2 ring-emerald-700" : ""
                    } ${triggerClassName}`}
                >
                    {initials(auth.user.name)}
                </button>
            ) : (
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    aria-haspopup="menu"
                    aria-expanded={open}
                    className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-emerald-900 ${triggerClassName}`}
                >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-xs font-semibold text-emerald-50">
                        {initials(auth.user.name)}
                    </div>
                    <div className="min-w-0 flex-1 text-left">
                        <p className="truncate text-sm font-medium text-white">{auth.user.name}</p>
                        <p className="flex items-center gap-1 uppercase text-xs text-emerald-400">
                            <User size={12} />
                            My account
                        </p>
                    </div>
                    <ChevronsUpDown size={15} className="shrink-0 text-emerald-400" />
                </button>
            )}

            <div
                role="menu"
                className={`absolute z-50 w-56 rounded-xl border border-stone-200 bg-white p-1.5 shadow-lg ring-1 ring-stone-900/5 transition-all duration-150 ease-out ${
                    align === "left" ? "left-0" : "right-0"
                } ${isUp ? "bottom-full mb-2 origin-bottom" : "top-full mt-2 origin-top"} ${
                    open
                        ? "translate-y-0 scale-100 opacity-100"
                        : `pointer-events-none scale-95 opacity-0 ${isUp ? "translate-y-1" : "-translate-y-1"}`
                }`}
            >
                {isCompact && (
                    <div className="mb-1 border-b border-stone-100 px-3 py-2">
                        <p className="truncate text-sm font-medium text-stone-900">{auth.user.name}</p>
                        <p className="flex items-center gap-1 uppercase text-xs text-emerald-700">
                            {/*<ShieldCheck size={12} /> HCPC Verified*/}
                            <User size={12} />
                            My Account
                        </p>
                    </div>
                )}
                {items.map((item, idx) => (
                    <Link
                        key={item.label}
                        method={item.label === 'Logout' ? 'post' : 'get'}
                        href={item.href}
                        role="menuitem"
                        onClick={() => setOpen(false) }
                        className={`flex w-full items-center gap-2.5 cursor-pointer rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                            item.danger
                                ? "text-red-600 hover:bg-red-50"
                                : "text-stone-700 hover:bg-emerald-50 hover:text-emerald-900"
                        } ${idx === items.length - 1 ? "mt-1 border-t border-stone-100 pt-2.5" : ""}`}
                    >
                        <item.icon size={16} className={item.danger ? "text-red-500" : "text-stone-400"} />
                        {item.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}
