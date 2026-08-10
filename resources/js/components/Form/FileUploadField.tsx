import React from 'react';
import {formatFileSize} from "@/lib/utils";
export function FileUploadField({ icon, label, description, file, error, onChange }: any) {
    const inputId = `file-${label.replace(/\s+/g, "-").toLowerCase()}`;

    if (file) {
        return (
            <div className="rounded-xl border p-3 flex items-center gap-3" style={{ borderColor: error ? "#fca5a5" : "var(--color-sage-200)", background: "var(--color-sage-50)" }}>
                <span className="text-lg shrink-0">{icon}</span>
                <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium truncate text-sage-700">
                        {file.name}
                    </div>
                    <div className="text-[11px] text-sage-400" >
                        {formatFileSize(file.size)}
                    </div>
                </div>
                <button type="button" onClick={() => onChange(null)} className="text-sm px-1 shrink-0 text-sage-400" aria-label={`Remove ${label}`}>
                    ✕
                </button>
            </div>
        );
    }

    return (
        <label htmlFor={inputId} className="rounded-xl border-2 border-dashed p-3 cursor-pointer flex items-center gap-3 transition-colors" style={{ borderColor: error ? "#fca5a5" : "var(--color-sage-200)" }}>
            <span className="text-lg opacity-50 shrink-0">{icon}</span>
            <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-sage-600" >
                    {label}
                </div>
                <div className="text-[11px] text-sage-400">
                    {description}
                </div>
                {error && (
                    <div className="text-[11px] mt-0.5" style={{ color: "#dc2626" }}>
                        {error}
                    </div>
                )}
            </div>
            <span className="text-[11px] font-medium shrink-0 text-sage-500">
        Upload
      </span>
            <input id={inputId} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(e) => onChange(e.target.files?.[0] ?? null)} />
        </label>
    );
}
