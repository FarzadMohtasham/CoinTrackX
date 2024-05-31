// Styling imports
import './styles/index.css'
import 'react-loading-skeleton/dist/skeleton.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import {ThemeProvider} from 'styled-components'
import {lightTheme} from '@utils/themes.ts'
import router from './router.tsx'
import {Toaster} from 'react-hot-toast'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import ReactQueryClient from '@query/queryClient.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ReactQueryClient>
            {import.meta.env.VITE_NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false}/>}
            <Toaster
                position="top-center"
            />
            <ThemeProvider theme={lightTheme}>
                <RouterProvider router={router}/>
            </ThemeProvider>
        </ReactQueryClient>
    </React.StrictMode>,
)
