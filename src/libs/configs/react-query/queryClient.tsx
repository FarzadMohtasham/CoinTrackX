import { JSX, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type ReactQueryClientProps = {
   children: ReactNode;
};

export const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         staleTime: 60 * 1000,
      },
   },
});

export default function ReactQueryClient(
   props: ReactQueryClientProps,
): JSX.Element {
   return (
      <QueryClientProvider client={queryClient}>
         {props.children}
      </QueryClientProvider>
   );
}
