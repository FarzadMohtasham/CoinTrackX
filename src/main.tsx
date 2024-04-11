import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

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
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
