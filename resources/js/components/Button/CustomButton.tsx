import React, {ReactNode} from 'react';

const CustomButton = ({text} : {text: string}) => {
    return (
        <button
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 focus:ring-offset-stone-100">+
            {text}
        </button>
    );
};

export default CustomButton;
