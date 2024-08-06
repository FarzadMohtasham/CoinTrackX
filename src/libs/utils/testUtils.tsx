import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';
import { ChakraProvider, theme as chakraTheme } from '@chakra-ui/react';
import styledComponentTheme from '@themes/styled-components.theme.ts';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
   return (
      <ChakraProvider theme={chakraTheme}>
         <ThemeProvider theme={styledComponentTheme.lightTheme}>
            {children}
         </ThemeProvider>
      </ChakraProvider>
   );
};

const customRender = (
   ui: ReactElement,
   options?: Omit<RenderOptions, 'wrapper'>,
) =>
   render(ui, {
      wrapper: AllTheProviders,
      ...options,
   });

export * from '@testing-library/react';
export { customRender as render };
