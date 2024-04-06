import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(() => {
    return {
        resolve: {
            alias: {
                src: '/src'
            }
        },
        build: {
            outDir: 'build'
        },
        server: {
            port: 3000
        },
        plugins: [react()]
    };
});