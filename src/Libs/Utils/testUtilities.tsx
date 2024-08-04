import { render } from '@testing-library/react';
import JestProvider from '@Providers/JestProvider';
import { ReactElement } from 'react';

const customRender = (ui: ReactElement, options?: any) =>
   render(ui, {
      wrapper: ({ children }) => <JestProvider>{children}</JestProvider>,
      ...options,
   });

export * from '@testing-library/react';
export { customRender as render };
