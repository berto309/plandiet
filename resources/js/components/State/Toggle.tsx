import type { ReactNode } from "react";

/**
 * Reusable on/off switch.
 *
 * <Toggle
 *   checked={active}
 *   onChange={setActive}
 *   label="Account status"
 *   onLabel="Active"
 *   offLabel="Inactive"
 * />
 */

interface ToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    description?: string;
    /** Text shown next to the switch when on. Defaults to "On". */
    onLabel?: string;
    /** Text shown next to the switch when off. Defaults to "Off". */
    offLabel?: string;
    disabled?: boolean;
    size?: "sm" | "md";
}

export default function Toggle({
                                   checked,
                                   onChange,
                                   label,
                                   description,
                                   onLabel = "On",
                                   offLabel = "Off",
                                   disabled = false,
                                   size = "md",
                               }: ToggleProps): ReactNode {
    const track = size === "sm" ? "h-5 w-9" : "h-6 w-11";
    const thumb = size === "sm" ? "h-4 w-4" : "h-5 w-5";
    const thumbTranslate = size === "sm" ? "translate-x-4" : "translate-x-5";

    const switchEl = (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={label ?? (checked ? onLabel : offLabel)}
            disabled={disabled}
            onClick={() => !disabled && onChange(!checked)}
            className={`relative inline-flex shrink-0 items-center rounded-full transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:ring-offset-2 ${track} ${
                checked ? "bg-emerald-700" : "bg-stone-300"
            } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
        >
      <span
          className={`inline-block transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out ${thumb} ${
              checked ? thumbTranslate : "translate-x-0.5"
          }`}
      />
        </button>
    );

    if (!label && !description) {
        return switchEl;
    }

    return (
        <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
                {label && <p className="text-sm font-medium text-stone-800">{label}</p>}
                {description && <p className="mt-0.5 text-xs text-stone-500">{description}</p>}
            </div>
            <div className="flex items-center gap-2">
        <span
            className={`text-xs font-medium ${checked ? "text-emerald-700" : "text-stone-400"}`}
        >
          {checked ? onLabel : offLabel}
        </span>
                {switchEl}
            </div>
        </div>
    );
}
