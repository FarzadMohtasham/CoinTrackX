import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';
import styledComponentTheme from '../Themes/styled-components.theme';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
   return (
      <ThemeProvider theme={styledComponentTheme.lightTheme}>
         {children}
      </ThemeProvider>
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
