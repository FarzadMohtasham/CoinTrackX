import { ComponentProps } from 'react';
import { ThemeProvider } from 'styled-components';
import styledComponentTheme from '../Themes/styled-components.theme';

export default function JestProvider({ children }: ComponentProps<any>) {
   return (
      <ThemeProvider theme={styledComponentTheme.lightTheme}>
         {children}
      </ThemeProvider>
   );
}
