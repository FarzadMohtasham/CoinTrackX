// Styling imports
import './styles/index.css'
import 'react-loading-skeleton/dist/skeleton.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import {Toaster} from 'react-hot-toast'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {RouterProvider} from 'react-router-dom'
import {ThemeProvider} from 'styled-components'
import {ChakraProvider} from '@chakra-ui/react'

import router from './router.tsx'
import ReactQueryClient from '@query/queryClient.tsx'

import {styledComponents as styledComponentsTheme} from '@/lib/themes'
import {chakraUi as chakraUiTheme} from '@/lib/themes'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ReactQueryClient>
            {import.meta.env.VITE_NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false}/>}
            <Toaster
                position="top-center"
            />
            <ThemeProvider theme={styledComponentsTheme.lightTheme}>
                <ChakraProvider theme={chakraUiTheme}>
                    <RouterProvider router={router}/>
                </ChakraProvider>
            </ThemeProvider>
        </ReactQueryClient>
    </React.StrictMode>,
)
