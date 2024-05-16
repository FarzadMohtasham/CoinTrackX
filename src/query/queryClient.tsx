import {QueryClientProvider, QueryClient, QueryCache} from "@tanstack/react-query";
import {ReactNode} from "react";

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
            console.log(error)
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