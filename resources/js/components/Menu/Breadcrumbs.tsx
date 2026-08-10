import {Crumb} from "@/types/types";
import {ReactNode} from "react";
import {ChevronRight} from "lucide-react";
import {Link} from "@inertiajs/react";

export function Breadcrumbs({ items }: { items: Crumb[] }): ReactNode {
    return (
        <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm">
                {items.map((crumb, i) => {
                    const isLast = i === items.length - 1;
                    const Icon = crumb.icon;
                    return (
                        <li key={crumb.label} className="flex items-center gap-1.5">
                            {i > 0 && <ChevronRight size={14} className="text-stone-400" />}
                            {isLast ? (
                                <span className="flex items-center gap-1.5 font-medium text-emerald-900">
                  {Icon && <Icon size={14} className="text-emerald-600" />}
                                    {crumb.label}
                </span>
                            ) : (
                                <Link
                                    href={crumb.href}
                                    className="flex items-center gap-1.5 text-stone-500 transition-colors hover:text-emerald-800"
                                >
                                    {Icon && <Icon size={14} />}
                                    {crumb.label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
