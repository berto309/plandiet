import React, {ReactNode} from 'react';

const FormCard = ({title, children}: {title?: string, children: ReactNode}) => {
    return (
        <section className="mb-6 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-7">
            {title &&  <h3 className="mb-5 font-serif text-lg text-emerald-950">{title}</h3>}
            {children}
        </section>
    );
};

export default FormCard;
