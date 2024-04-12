import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {ThemeProvider} from "styled-components";
import {lightTheme, darkTheme} from './utils/themes.ts'

// Styling imports
import './styles/index.css'

// Components
import Home from "./pages/Home.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>,
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider theme={lightTheme}>
            <RouterProvider router={router}/>
        </ThemeProvider>
    </React.StrictMode>,
)
