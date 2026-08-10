import React from 'react';

const EmptyState = ({emptyTitle, emptyDescription}: {emptyTitle: string, emptyDescription?: string}) => {
    return (
        <div className="px-7 py-14 text-center">
            <p className="text-sm font-medium text-stone-600">{emptyTitle}</p>
            { emptyDescription &&  <p className="mt-1 text-sm text-stone-400">{emptyDescription}</p> }
        </div>
    );
};

export default EmptyState;
