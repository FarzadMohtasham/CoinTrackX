import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import sass from 'sass'
import {fileURLToPath, URL} from "url";

const srcFolders = ['assets', 'components', 'config', 'data', 'feature', 'hooks', 'jest', 'layout', 'pages', 'query', 'services', 'styles', 'tests', 'ts', 'utils', 'validation']
const resolveAlias: { find: string; replacement: string; }[] = []
srcFolders.map(folderName => {
    resolveAlias.push({
        find: `@${folderName}`,
        replacement: fileURLToPath(new URL(`./src/${folderName}/`, import.meta.url))
    })
})

// {
//     find: "@components",
//         replacement: fileURLToPath(new URL('./src/components/', import.meta.url))
// },

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    css: {
        preprocessorOptions: {
            scss: {
                implementation: sass
            }
        }
    },
    resolve: {
        alias: resolveAlias
    },
    server: {
        port: 3000,
        hmr: true,
        strictPort: true,
    }
})












