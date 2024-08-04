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
         '@assets': path.resolve(__dirname, './src/assets'),
         '@components': path.resolve(__dirname, './src/components'),
         '@data': path.resolve(__dirname, './src/data'),
         '@layouts': path.resolve(__dirname, './src/layouts'),
         '@configs': path.resolve(__dirname, './src/libs/configs'),
         '@handlers': path.resolve(__dirname, './src/libs/handlers'),
         '@hooks': path.resolve(__dirname, './src/libs/hooks'),
         '@schemas': path.resolve(__dirname, './src/libs/schemas'),
         '@themes': path.resolve(__dirname, './src/libs/themes'),
         '@typings': path.resolve(__dirname, './src/libs/typings'),
         '@utils': path.resolve(__dirname, './src/libs/utils'),
         '@validations': path.resolve(__dirname, './src/libs/validations'),
         '@pages': path.resolve(__dirname, './src/pages'),
         '@queries': path.resolve(__dirname, './src/queries'),
         '@services': path.resolve(__dirname, './src/services'),
         '@styles': path.resolve(__dirname, './src/styles'),
      },
   },
   server: {
      port: 3000,
      hmr: true,
      strictPort: true,
   },
});
