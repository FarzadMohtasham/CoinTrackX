import {JSX, ReactNode} from 'react'
import {toast} from 'react-hot-toast'
import {QueryClientProvider, QueryClient, QueryCache} from '@tanstack/react-query'

type ReactQueryClientProps = {
    children: ReactNode
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000,
        },
    },
    queryCache: new QueryCache({
        onError: (error: Error): void => {
            toast.error(error.message)
        },
    })
})

export default function ReactQueryClient(props: ReactQueryClientProps): JSX.Element {
    return (
        <QueryClientProvider client={queryClient}>
            {props.children}
        </QueryClientProvider>
    )
}