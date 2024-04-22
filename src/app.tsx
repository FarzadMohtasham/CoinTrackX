// Styling imports
import './styles/index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import {ThemeProvider} from "styled-components";
import {lightTheme} from './utils/themes.ts'
import router from "./router.tsx";
import {Toaster} from "react-hot-toast";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Toaster
            position="top-center"
        />
        <ThemeProvider theme={lightTheme}>
            <RouterProvider router={router}/>
        </ThemeProvider>
    </React.StrictMode>,
)
