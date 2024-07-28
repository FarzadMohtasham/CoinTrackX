import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sass from 'sass';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    css: {
        preprocessorOptions: {
            scss: {
                implementation: sass,
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@Assets': path.resolve(__dirname, './src/Assets'),
            '@Components': path.resolve(__dirname, './src/Components'),
            '@Data': path.resolve(__dirname, './src/Data'),
            '@Layout': path.resolve(__dirname, './src/Layout'),
            
            '@Config': path.resolve(__dirname, './src/Lib/Config'),
            '@Handlers': path.resolve(__dirname, './src/Lib/Handlers'),
            '@Hooks': path.resolve(__dirname, './src/Lib/Hooks'),
            '@Jest': path.resolve(__dirname, './src/Lib/Jest'),
            '@Schema': path.resolve(__dirname, './src/Lib/Schema'),
            '@Themes': path.resolve(__dirname, './src/Lib/Themes'),
            '@Typings': path.resolve(__dirname, './src/Lib/Typings'),
            '@Utils': path.resolve(__dirname, './src/Lib/Utils'),
            '@Validations': path.resolve(__dirname, './src/Lib/Validations'),
               
            '@Pages': path.resolve(__dirname, './src/Lib/Pages'),
            '@Query': path.resolve(__dirname, './src/Lib/Query'),
            '@Services': path.resolve(__dirname, './src/Lib/Services'),
            '@Styles': path.resolve(__dirname, './src/Lib/Styles'),
            '@Tests': path.resolve(__dirname, './src/Lib/Tests'),
        },
    },
    server: {
        port: 3000,
        hmr: true,
        strictPort: true,
    },
});
