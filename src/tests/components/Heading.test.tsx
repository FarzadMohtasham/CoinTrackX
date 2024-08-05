import { render, screen } from '@utils/testUtils.tsx';

import Heading from '@components/ui/stuff/Heading.tsx';

describe('Check heading value', () => {
   it('should have "Im Heading" as content', () => {
      render(<Heading>Im Heading</Heading>);
      screen.getByText('Im Heading');
   });
});

describe('Heading tag types check', () => {
   it('should be H1', () => {
      render(<Heading tagName="h1">Heading 1</Heading>);
      screen.getByRole('heading', {
         level: 1,
      });
   });

   it('should be H2', () => {
      render(<Heading tagName="h2">Heading 1</Heading>);
      screen.getByRole('heading', {
         level: 2,
      });
   });

   it('should be H3', () => {
      render(<Heading tagName="h3">Heading 1</Heading>);
      screen.getByRole('heading', {
         level: 3,
      });
   });

   it('should be H4', () => {
      render(<Heading tagName="h4">Heading 1</Heading>);
      screen.getByRole('heading', {
         level: 4,
      });
   });

   it('should be H5', () => {
      render(<Heading tagName="h5">Heading 1</Heading>);
      screen.getByRole('heading', {
         level: 5,
      });
   });

   it('should be H6', () => {
      render(<Heading tagName="h6">Heading 1</Heading>);
      screen.getByRole('heading', {
         level: 6,
      });
   });
});

describe('Check className', () => {
   it('should have specified className', () => {
      const className = 'classified-heading';
      render(<Heading className={className}>Heading with class</Heading>);
      const headingElement = screen.getByText('Heading with class');
      expect(headingElement).toHaveClass(className);
   });
});
