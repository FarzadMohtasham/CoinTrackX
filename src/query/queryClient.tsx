import {QueryClientProvider, QueryClient, QueryCache} from '@tanstack/react-query'
import {ReactNode} from 'react'
import {toast} from 'react-hot-toast'

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
        onError: error => {
            toast.error(error.message)
        },
    })
})

export default function ReactQueryClient(props: ReactQueryClientProps) {
    return (
        <QueryClientProvider client={queryClient}>
            {props.children}
        </QueryClientProvider>
    )
}