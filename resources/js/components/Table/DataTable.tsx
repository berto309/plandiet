import {
    DataTableBulkAction,
    DataTableColumn,
    DataTableProps,
    DataTableRowAction,
    DataTableRowActionLink
} from "@/types/datatable";
import {ReactNode, useEffect, useMemo, useRef, useState} from "react";
import {Pagination} from "@/components/Table/Pagination";
import {ArrowRight, Check, ChevronDown, Download, MoreVertical, Search, Upload, X} from "lucide-react";
import {useOutsideClose} from "@/hooks/useOutsideClose";
import {Link} from "@inertiajs/react";
import ClientsOverviewController from "@/actions/App/Http/Controllers/Analytics/Client/ClientsOverviewController";

function RowActionsMenu({row, actions, openUp,}: { row: []; actions: DataTableRowAction[]; openUp: boolean; }): ReactNode {
    const [open, setOpen] = useState(false);
    const ref = useOutsideClose(() => setOpen(false));
    const visible = actions.filter((a) => !a.show || a.show(row));
    if (visible.length === 0) return null;

    return (
       <div ref={ref} className="relative inline-block">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={open}
                aria-label="Row actions"
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700 ${
                    open ? "bg-stone-100 text-stone-700" : ""
                }`}
            >
                <MoreVertical size={17}/>
            </button>

            <div
                role="menu"
                className={`absolute right-0 z-[10000000] w-52 rounded-xl border border-stone-200 bg-white p-1.5 shadow-lg ring-1 ring-stone-900/5 transition-all duration-150 ease-out ${
                    openUp ? "bottom-full mb-2 origin-bottom-right" : "top-full mt-2 origin-top-right"
                } ${
                    open
                        ? "translate-y-0 scale-100 opacity-100"
                        : `pointer-events-none scale-95 opacity-0 ${openUp ? "translate-y-1" : "-translate-y-1"}`
                }`}
            >
                {visible.map((action, idx) => (
                    <button
                        key={action.label}
                        type="button"
                        role="menuitem"
                        onClick={() => {
                            setOpen(false);
                            action.onClick(row);
                        }}
                        className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                            action.danger
                                ? "text-red-600 hover:bg-red-50"
                                : "text-stone-700 hover:bg-emerald-50 hover:text-emerald-900"
                        } ${action.startNewGroup && idx > 0 ? "mt-1 border-t border-stone-100 pt-2.5" : ""}`}
                    >
                        <action.icon size={16} className={action.danger ? "text-red-500" : "text-stone-400"}/>
                        {action.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

function RowActionLink({row, action}: {row: [], action: DataTableRowActionLink}): ReactNode {
    return (

        (action.show ?? true) && <Link href={action.href(row)}
                             title={action?.tooltip ?? 'View'}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-800 px-5 py-1.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 focus:ring-offset-stone-100">
            <ArrowRight size={15} />
        </Link>
    );
}
function FilterDropdown({label, value, options, onChange,}: { label: string; value: string; options: { value: string; label: string }[]; onChange: (v: string) => void; }): ReactNode {
    const [open, setOpen] = useState(false);
    const ref = useOutsideClose(() => setOpen(false));
    const current = options.find((o) => o.value === value) ?? options[0];

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={open}
                className="flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:border-stone-400"
            >
                <span className="text-stone-400">{label}:</span>
                {current?.label}
                <ChevronDown
                    size={15}
                    className={`text-stone-400 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
                />
            </button>

            <div
                role="listbox"
                className={`absolute right-0 z-40 mt-2 w-48 origin-top-right rounded-xl border border-stone-200 bg-white p-1.5 shadow-lg ring-1 ring-stone-900/5 transition-all duration-150 ease-out ${
                    open
                        ? "translate-y-0 scale-100 opacity-100"
                        : "pointer-events-none -translate-y-1 scale-95 opacity-0"
                }`}
            >
                {options.map((o) => (
                    <button
                        key={o.value}
                        type="button"
                        role="option"
                        aria-selected={value === o.value}
                        onClick={() => {
                            onChange(o.value);
                            setOpen(false);
                        }}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-stone-700 transition-colors hover:bg-emerald-50 hover:text-emerald-900"
                    >
                        {o.label}
                        {value === o.value && <Check size={15} className="text-emerald-700"/>}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default function DataTable({
                                        title,
                                         data,
                                         columns,
                                         getRowId,
                                         getSearchText,
                                         searchPlaceholder = "Search…",
                                         filters = [],
                                         rowActions,
                                         rowActionLink,
                                         bulkActions,
                                         pageSize = 10,
                                         onExport,
                                         onImport,
                                         exportFilename = "export.csv",
                                         emptyTitle = "No results found",
                                         emptyDescription = "Try a different search term or filter.",
                                     }: DataTableProps): ReactNode {
    const [search, setSearch] = useState("");
    const [filterValues, setFilterValues] = useState<Record<string, string>>({});
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const headerCheckboxRef = useRef<HTMLInputElement | null>(null);

    const selectable = Boolean(bulkActions && bulkActions.length > 0);

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        return data.filter((row: any) => {
            const matchesQuery = !q || !getSearchText || getSearchText(row).toLowerCase().includes(q);
            const matchesFilters = filters.every((f) => {
                const active = filterValues[f.key] ?? "all";
                return active === "all" || f.getValue(row) === active;
            });
            return matchesQuery && matchesFilters;
        });
    }, [data, search, filterValues, filters, getSearchText]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const safePage = Math.min(page, totalPages);
    const pageItems = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

    useEffect(() => {
        setPage(1);
        setSelected(new Set());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, filterValues]);

    useEffect(() => {
        if (!headerCheckboxRef.current) return;
        const ids = pageItems.map(getRowId);
        const onPage = ids.filter((id: string) => selected.has(id));
        headerCheckboxRef.current.indeterminate = onPage.length > 0 && onPage.length < ids.length;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected, pageItems]);

    const allOnPageSelected = pageItems.length > 0 && pageItems.every((row: []) => selected.has(getRowId(row)));

    function toggleAllOnPage() {
        setSelected((prev) => {
            const next = new Set(prev);
            const ids = pageItems.map(getRowId);
            if (allOnPageSelected) ids.forEach((id) => next.delete(id));
            else ids.forEach((id) => next.add(id));
            return next;
        });
    }

    function toggleOne(id: string) {
        setSelected((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    }

    function toCsv(rows: any, columns: DataTableColumn[]): string {
        const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
        const header = columns.map((c) => escape(c.header)).join(",");
        const lines = rows.map((row: []) =>
            columns.map((c) => escape(c.csvValue ? c.csvValue(row) : "")).join(",")
        );
        return [header, ...lines].join("\r\n");
    }

    function handleExport() {
        if (onExport) {
            onExport(filtered);
            return;
        }
        downloadCsv(toCsv(filtered, columns), exportFilename);
    }

    function parseCsv(text: string): Record<string, string>[] {
        const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
        if (lines.length === 0) return [];
        const headers = splitCsvLine(lines[0]).map((h) => h.trim());
        return lines.slice(1).map((line) => {
            const values = splitCsvLine(line);
            const row: Record<string, string> = {};
            headers.forEach((h, i) => {
                row[h] = (values[i] ?? "").trim();
            });
            return row;
        });
    }

    function splitCsvLine(line: string): string[] {
        const result: string[] = [];
        let cur = "";
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            const ch = line[i];
            if (ch === '"') {
                inQuotes = !inQuotes;
            } else if (ch === "," && !inQuotes) {
                result.push(cur);
                cur = "";
            } else {
                cur += ch;
            }
        }
        result.push(cur);
        return result;
    }


    function downloadCsv(content: string, filename: string) {
        const blob = new Blob([content], {type: "text/csv;charset=utf-8;"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file || !onImport) return;
        const reader = new FileReader();
        reader.onload = () => {
            const text = String(reader.result ?? "");
            onImport(parseCsv(text));
        };
        reader.readAsText(file);
        e.target.value = "";
    }

    const selectedRows = data.filter((row: any) => selected.has(getRowId(row)));

    return (
        <section className="rounded-2xl border border-stone-200 bg-white shadow-sm">
            {/* Toolbar */}
            <div
                className="flex flex-col gap-3 border-b border-stone-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                {title && <h3 className="font-serif text-lg text-emerald-950">{title}</h3>}
                <div className="flex flex-wrap items-center gap-2.5">
                    {getSearchText && (
                        <div className="relative">
                            <Search
                                size={15}
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                            />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder={searchPlaceholder}
                                className="w-full rounded-lg border border-stone-300 bg-stone-50 py-2.5 pl-9 pr-8 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 sm:w-56"
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch("")}
                                    aria-label="Clear search"
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                                >
                                    <X size={14}/>
                                </button>
                            )}
                        </div>
                    )}

                    {filters.map((f) => (
                        <FilterDropdown
                            key={f.key}
                            label={f.label}
                            value={filterValues[f.key] ?? "all"}
                            options={f.options}
                            onChange={(v) => setFilterValues((prev) => ({...prev, [f.key]: v}))}
                        />
                    ))}

                    {onExport && (
                        <button
                            type="button"
                            onClick={handleExport}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:border-stone-400 hover:bg-stone-50"
                        >
                            <Download size={15} className="text-stone-400"/> Export
                        </button>
                    )}

                    {onImport && (
                        <>
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:border-stone-400 hover:bg-stone-50"
                            >
                                <Upload size={15} className="text-stone-400"/> Import
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".csv,text/csv"
                                onChange={handleImportFile}
                                className="hidden"
                            />
                        </>
                    )}
                </div>
            </div>

            {/* Bulk actions bar */}
            {selectable && (
                <div
                    className={`overflow-hidden transition-all duration-200 ease-out ${
                        selected.size > 0 ? "max-h-16 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="flex items-center justify-between bg-emerald-50 px-6 py-3 sm:px-7">
                        <p className="text-sm font-medium text-emerald-900">{selected.size} selected</p>
                        <div className="flex items-center gap-2">
                            {bulkActions?.map((action: DataTableBulkAction) => (
                                <button
                                    key={action.label}
                                    type="button"
                                    onClick={() => action.onClick(selectedRows)}
                                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                                        action.danger
                                            ? "border-red-300 bg-white text-red-600 hover:bg-red-50"
                                            : "border-emerald-300 bg-white text-emerald-800 hover:bg-emerald-100"
                                    }`}
                                >
                                    <action.icon size={13}/>
                                    {action.label}
                                </button>
                            ))}
                            <button
                                type="button"
                                onClick={() => setSelected(new Set())}
                                className="px-2 text-xs font-medium text-stone-500 hover:text-stone-700"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Table */}
            {pageItems.length === 0 ? (
                <div className="px-7 py-14 text-center">
                    <p className="text-sm font-medium text-stone-600">{emptyTitle}</p>
                    <p className="mt-1 text-sm text-stone-400">{emptyDescription}</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[560px] text-sm">
                        <thead>
                        <tr className="border-b border-stone-200 text-left text-xs font-semibold tracking-wide text-stone-400 uppercase">
                            {selectable && (
                                <th className="w-10 px-6 py-3 sm:px-7">
                                    <input
                                        ref={headerCheckboxRef}
                                        type="checkbox"
                                        checked={allOnPageSelected}
                                        onChange={toggleAllOnPage}
                                        className="h-4 w-4 rounded border-stone-300 text-emerald-700 focus:ring-emerald-600/30"
                                        aria-label="Select all rows on this page"
                                    />
                                </th>
                            )}
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className={`px-4 py-3 font-semibold ${col.hideOnMobile ? "hidden sm:table-cell" : ""} ${
                                        col.className ?? ""
                                    }`}
                                >
                                    {col.header}
                                </th>
                            ))}
                            {rowActions && rowActions.length > 0 && <th className="w-10 px-4 py-3 sm:px-7"/>}
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-200">
                        {pageItems.map((row:any, idx:any) => {
                            const id = getRowId(row);
                            return (
                                <tr key={idx} className="transition-colors hover:bg-stone-50/60">
                                    {selectable && (
                                        <td className="px-6 py-4 align-middle sm:px-7">
                                            <input
                                                type="checkbox"
                                                checked={selected.has(id)}
                                                onChange={() => toggleOne(id)}
                                                className="h-4 w-4 rounded border-stone-300 text-emerald-700 focus:ring-emerald-600/30"
                                                aria-label="Select row"
                                            />
                                        </td>
                                    )}
                                    {columns.map((col) => (
                                        <td
                                            key={col.key}
                                            className={`px-4 py-4 align-middle ${col.hideOnMobile ? "hidden sm:table-cell" : ""} ${
                                                col.className ?? ""
                                            }`}
                                        >
                                            {col.render(row)}
                                        </td>
                                    ))}
                                    {rowActions && rowActions.length > 0 && (
                                        <td className="px-4 py-4 text-right align-middle sm:px-7">
                                            <RowActionsMenu
                                                row={row}
                                                actions={rowActions}
                                                openUp={idx >= pageItems.length - 2 && pageItems.length > 2}
                                            />
                                        </td>
                                    )}
                                    {rowActionLink && (
                                        <td className="px-2 py-2 align-midde sm: px-7">
                                            <RowActionLink row={row} action={rowActionLink} />
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            )}

            <Pagination
                page={safePage}
                totalPages={totalPages}
                totalItems={filtered.length}
                pageSize={pageSize}
                onPageChange={setPage}
            />
        </section>
    );
}
