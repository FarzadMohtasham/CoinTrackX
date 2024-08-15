// Styling imports
import './styles/index.css';
import 'react-loading-skeleton/dist/skeleton.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
   BrowserRouter,
   Router,
   RouterProvider,
   useLocation,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ChakraProvider, theme as chakraTheme } from '@chakra-ui/react';

import router from '@configs/routes/index.routes.tsx';
import ReactQueryClient from '@configs/react-query/queryClient.tsx';
import styledComponentTheme from '@themes/styled-components.theme.ts';
import { AnimatePresence } from 'framer-motion';

const App = () => {
   return (
      <ChakraProvider theme={chakraTheme}>
         <ReactQueryClient>
            {import.meta.env.VITE_NODE_ENV === 'development' && (
               <ReactQueryDevtools initialIsOpen={false} />
            )}
            <Toaster position="top-center" />
            <ThemeProvider theme={styledComponentTheme.lightTheme}>
               <AnimatePresence mode="wait">
                  <RouterProvider router={router} />
               </AnimatePresence>
            </ThemeProvider>
         </ReactQueryClient>
      </ChakraProvider>
   );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <App />
   </React.StrictMode>,
);
