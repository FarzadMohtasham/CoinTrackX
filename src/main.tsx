import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import {ThemeProvider} from "styled-components";
import {lightTheme} from './utils/themes.ts'
import router from "./router.tsx";
import supabaseClient from "./config/supabase.ts";

// Styling imports
import './styles/index.css'

console.log(supabaseClient)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider theme={lightTheme}>
            <RouterProvider router={router}/>
        </ThemeProvider>
    </React.StrictMode>,
)
