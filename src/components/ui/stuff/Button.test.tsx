import { ThemeProvider } from 'styled-components';
import Button from './Button';
import { render, screen } from '@testing-library/react';
import styledComponentTheme from '@/Libs/Themes/styled-components.theme';

test('Testing Button Component - Value', () => {
   render(
      <ThemeProvider theme={styledComponentTheme.lightTheme}>
         <Button>test button</Button>
      </ThemeProvider>,
   );
   const buttonElement = screen.getByText(/test button/i); // Corrected the typo here
   expect(buttonElement).toBeInTheDocument();
});
