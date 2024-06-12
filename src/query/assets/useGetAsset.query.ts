import {useQuery} from '@tanstack/react-query'

import {getAsset} from '@services/api/assets/assets.api.ts'

import {Asset, AssetName} from "@typings/type/Assets.api.type.ts";

export default function useGetAssetsQuery(
    assetName: AssetName = 'bitcoin',
    staleTime: number = 1000 * 60 * 60,
    retry: boolean = false,
    refetchOnWindowFocus: boolean = true,
    refetchOnReconnect: boolean = true
) {
    const {data, error, refetch, isLoading}: {
        data: Asset[] | any,
        error: any,
        refetch: any,
        isLoading: any
    } = useQuery({
        queryKey: ['use-get-assets'],
        queryFn: () => getAsset(assetName),
        staleTime: staleTime,
        retry: retry,
        refetchOnWindowFocus: refetchOnWindowFocus,
        refetchOnReconnect: refetchOnReconnect
    })

    return {data, error, refetch, isLoading}
}