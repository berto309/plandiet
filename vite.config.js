import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import { bunny } from 'laravel-vite-plugin/fonts';
import tailwindcss from '@tailwindcss/vite';
import inertia from '@inertiajs/vite'
import {wayfinder} from "@laravel/vite-plugin-wayfinder";
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.tsx','resources/css/app.css'],
            refresh: true,
            fonts: [
                bunny('Instrument Sans', {
                    weights: [400, 500, 600],
                }),
            ],
        }),
        inertia({
            ssr: false,
        }),
        react(),
        wayfinder(),
        tailwindcss(),
    ],
    optimizedFallbacks: false,
    server: {
        host: '127.0.0.1',
        hmr: {
            host: 'plandiet.test',
        },
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },

    },
});
