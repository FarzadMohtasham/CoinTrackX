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
         '@config': path.resolve(__dirname, './src/config'),
         '@data': path.resolve(__dirname, './src/data'),
         '@feature': path.resolve(__dirname, './src/feature'),
         '@hooks': path.resolve(__dirname, './src/lib/hooks'),
         '@jest': path.resolve(__dirname, './src/jest'),
         '@layout': path.resolve(__dirname, './src/layout'),
         '@pages': path.resolve(__dirname, './src/pages'),
         '@query': path.resolve(__dirname, './src/query'),
         '@services': path.resolve(__dirname, './src/services'),
         '@styles': path.resolve(__dirname, './src/styles'),
         '@tests': path.resolve(__dirname, './src/tests'),
         '@typings': path.resolve(__dirname, './src/lib/typings'),
         '@utils': path.resolve(__dirname, './src/lib/utils'),
         '@lib': path.resolve(__dirname, './src/lib'),
         '@validations': path.resolve(__dirname, './src/lib/validations'),
         '@themes': path.resolve(__dirname, './src/lib/themes'),
      },
   },
   server: {
      port: 3000,
      hmr: true,
      strictPort: true,
   },
});
