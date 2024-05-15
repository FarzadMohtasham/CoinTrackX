// Styling imports
import './styles/index.css'
import 'react-loading-skeleton/dist/skeleton.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import {ThemeProvider} from "styled-components";
import {lightTheme} from '@utils/themes.ts'
import router from "./router.tsx";
import {Toaster} from "react-hot-toast";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000,
        },
    }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            {import.meta.env.VITE_NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false}/>}
            <Toaster
                position="top-center"
            />
            <ThemeProvider theme={lightTheme}>
                <RouterProvider router={router}/>
            </ThemeProvider>
        </QueryClientProvider>
    </React.StrictMode>,
)
