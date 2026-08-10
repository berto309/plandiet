import {ComponentType, ReactNode} from "react";

export interface DataTableProps {
    title?: ReactNode;
    data: any;
    columns: DataTableColumn[];
    getRowId: (row: string|number) => string|number;
    /** Text used to match against the search box. Defaults to no search text (search hidden). */
    getSearchText?: (row: any) => string;
    searchPlaceholder?: string;
    filters?: DataTableFilter[];
    rowActions?: DataTableRowAction[];
    rowActionLink?: DataTableRowActionLink;
    bulkActions?: DataTableBulkAction[];
    pageSize?: number;
    /** Custom export handler. Receives the currently filtered rows. Falls back to a built-in CSV download using each column's csvValue. */
    onExport?: (rows: any) => void;
    /** Called with parsed CSV rows (header -> value) when a file is imported. Omit to hide the import button. */
    onImport?: (rows: Record<string, string>[]) => void;
    exportFilename?: string;
    emptyTitle?: string;
    emptyDescription?: string;
}


export type IconType = ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;

/** One column definition. `render` controls the cell's JSX; `csvValue`
 *  (optional) controls what gets written to an exported CSV file. */
export interface DataTableColumn {
    key: string;
    header: string;
    render: (row: any) => ReactNode;
    csvValue?: (row: any) => string;
    hideOnMobile?: boolean;
    className?: string;
}

export interface DataTableRowActionLink {
    tooltip?: string;
    href: (row: any) => string;
    show?: boolean;
}

/** A single item in the per-row "⋮" actions menu. */
export interface DataTableRowAction {
    label: string;
    icon: IconType;
    onClick: (row: any) => void;
    /** Return false to hide this action for a given row. */
    show?: (row: any) => boolean;
    danger?: boolean;
    /** Draws a divider above this action, useful to separate destructive actions. */
    startNewGroup?: boolean;
}

/** An action shown in the toolbar that appears once rows are selected. */
export interface DataTableBulkAction {
    label: string;
    icon: IconType;
    onClick: (rows: any) => void;
    danger?: boolean;
}

/** A single-select dropdown filter, e.g. filtering by status. */
export interface DataTableFilter {
    key: string;
    label: string;
    options: { value: string; label: string }[];
    getValue: (row: any) => string;
}



