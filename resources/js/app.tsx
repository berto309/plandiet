import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import {ComponentType, StrictMode} from "react";
import { createRoot } from 'react-dom/client';
import {ToastProvider} from "@/context/ToastContext";



const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent<ComponentType>(
            `./pages/${name}.tsx`,
            import.meta.glob<ComponentType>('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(

            <StrictMode>
                <ToastProvider defaultPosition="top-right">
                    <App {...props} />
                </ToastProvider>
            </StrictMode>

        );
    },
    strictMode: true,
    progress: {
        color: '#002c22',
    },
});
