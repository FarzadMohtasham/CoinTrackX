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
            '@Layouts': path.resolve(__dirname, './src/Layouts'),
            
            '@Configs': path.resolve(__dirname, './src/Libs/Configs'),
            '@Handlers': path.resolve(__dirname, './src/Libs/Handlers'),
            '@Hooks': path.resolve(__dirname, './src/Libs/Hooks'),
            '@Providers': path.resolve(__dirname, './src/Libs/Providers'),
            '@Schemas': path.resolve(__dirname, './src/Libs/Schemas'),
            '@Themes': path.resolve(__dirname, './src/Libs/Themes'),
            '@Typings': path.resolve(__dirname, './src/Libs/Typings'),
            '@Utils': path.resolve(__dirname, './src/Libs/Utils'),
            '@Validations': path.resolve(__dirname, './src/Libs/Validations'),
               
            '@Pages': path.resolve(__dirname, './src/Pages'),
            '@Queries': path.resolve(__dirname, './src/Queries'),
            '@Services': path.resolve(__dirname, './src/Services'),
            '@Styles': path.resolve(__dirname, './src/Styles'),
        },
    },
    server: {
        port: 3000,
        hmr: true,
        strictPort: true,
    },
});
