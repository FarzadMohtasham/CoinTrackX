import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {ThemeProvider} from "styled-components";
import {lightTheme} from './utils/themes.ts'

// Styling imports
import './styles/index.css'

// Pages
import Home from './pages/Home.tsx'

import Login from './pages/auth/Login.tsx'
import Signup from './pages/auth/Signup.tsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
        children: [
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/signup",
                element: <Signup/>
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider theme={lightTheme}>
            <RouterProvider router={router}/>
        </ThemeProvider>
    </React.StrictMode>,
)
