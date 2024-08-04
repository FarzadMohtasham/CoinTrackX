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
      alias: [
         { find: '@', replacement: path.join(__dirname, 'src') },
         {
            find: '@Assets',
            replacement: path.join(__dirname, 'src', 'Assets'),
         },
         {
            find: '@Components',
            replacement: path.join(__dirname, 'src', 'Components'),
         },
         { find: '@Data', replacement: path.join(__dirname, 'src', 'Data') },
         {
            find: '@Layouts',
            replacement: path.join(__dirname, 'src', 'Layouts'),
         },
         {
            find: '@Configs',
            replacement: path.join(__dirname, 'src', 'Libs', 'Configs'),
         },
         {
            find: '@Handlers',
            replacement: path.join(__dirname, 'src', 'Libs', 'Handlers'),
         },
         {
            find: '@Hooks',
            replacement: path.join(__dirname, 'src', 'Libs', 'Hooks'),
         },
         {
            find: '@Schemas',
            replacement: path.join(__dirname, 'src', 'Libs', 'Schemas'),
         },
         {
            find: '@Themes',
            replacement: path.join(__dirname, 'src', 'Libs', 'Themes'),
         },
         {
            find: '@Typings',
            replacement: path.join(__dirname, 'src', 'Libs', 'Typings'),
         },
         {
            find: '@Utils',
            replacement: path.join(__dirname, 'src', 'Libs', 'Utils'),
         },
         {
            find: '@Validations',
            replacement: path.join(__dirname, 'src', 'Libs', 'Validations'),
         },
         { find: '@Pages', replacement: path.join(__dirname, 'src', 'Pages') },
         {
            find: '@Queries',
            replacement: path.join(__dirname, 'src', 'Queries'),
         },
         {
            find: '@Services',
            replacement: path.join(__dirname, 'src', 'Services'),
         },
         {
            find: '@Styles',
            replacement: path.join(__dirname, 'src', 'Styles'),
         },
      ],
   },
   server: {
      port: 3000,
      hmr: true,
      strictPort: true,
   },
});
