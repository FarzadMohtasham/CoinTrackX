// Styling imports
import './styles/index.css'
import 'react-loading-skeleton/dist/skeleton.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import {Toaster} from 'react-hot-toast'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {RouterProvider} from 'react-router-dom'
import {ThemeProvider} from 'styled-components'
import {ChakraProvider, theme as chakraTheme} from '@chakra-ui/react'

import router from './router.tsx'
import ReactQueryClient from '@query/queryClient.tsx'

import styledComponentTheme from '@/lib/themes/styled-components.theme.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ChakraProvider theme={chakraTheme}>
            <ReactQueryClient>
                {import.meta.env.VITE_NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false}/>}
                <Toaster
                    position="top-center"
                />
                <ThemeProvider theme={styledComponentTheme.lightTheme}>
                    <RouterProvider router={router}/>
                </ThemeProvider>
            </ReactQueryClient>
        </ChakraProvider>
    </React.StrictMode>,
)
