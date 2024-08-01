import { render, screen } from '@testing-library/react';
import JestProvider from '@/Libs/Providers/JestProvider';
import Button from '@/Components/UI/Stuff/Button';

describe('Button Component', () => {
   test('Testing Button Component - Value', () => {
      render(
         <JestProvider>
            <Button>test button</Button>
         </JestProvider>,
      );
      const buttonElement = screen.getByText(/test button/i); // Corrected the typo here
      expect(buttonElement).toBeInTheDocument();
   });
});
