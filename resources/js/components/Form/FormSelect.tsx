import React from "react";
import Select, { MultiValue, SingleValue, GetOptionLabel, } from "react-select";
export interface Option { value: string; label: string; }
interface Props {
    value: string | string[];
    options: Option[];
    multiple?: boolean;
    onChange: (value: string | string[]) => void;
    getOptionLabel?: GetOptionLabel<Option>;
}
export const FormSelect: React.FC<Props> = ({ value, options, multiple = false, onChange, getOptionLabel, }) => {
    const selected = multiple ?
        options.filter( (opt) => Array.isArray(value) && value.includes(opt.value) )
        : options.find((opt) => opt.value === value) || null;
    return (
        <label className="block text-sm">
            <Select<Option, boolean> isMulti={multiple} options={options} value={selected} getOptionLabel={getOptionLabel}
                                     onChange={(val) =>
                                     { if (multiple)
                                     { const arr = (val as MultiValue<Option>).map( (v) => v.value ); onChange(arr);
                                     } else
                                     {
                                         const single = val as SingleValue<Option>; onChange(single?.value || "");
                                     }
                                     }} classNames={
                { control: ({ isFocused }) =>
                        [ "rounded-md border px-2 py-1 text-sm bg-white",
                            isFocused ? "border-emerald-600 ring-2 ring-emerald-600/20" : "border-stone-300", ]
                            .join(" "),
                    menu: () => "bg-white border border-stone-200 rounded-md shadow-md mt-1",
                    option: ({ isFocused, isSelected }) =>
                        [ "px-3 py-2 cursor-pointer text-sm", isSelected ? "bg-emerald-600 text-white" : isFocused ? "bg-emerald-50 text-stone-900" : "text-stone-700", ]
                            .join(" "),
                    multiValue: () => "bg-emerald-100 text-emerald-800 rounded px-2 py-0.5",
                    multiValueRemove: () => "text-emerald-700 hover:bg-emerald-600 hover:text-white rounded", }} />
        </label> );
};
