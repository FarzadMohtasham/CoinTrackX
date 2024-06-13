import {useQuery} from '@tanstack/react-query'
import {getAssetHistory} from '@services/api/assets/assets.api.ts'
import {AssetHistoryInterval, AssetName} from '@typings/type/Assets.api.type.ts'

export default function useGetAssetHistory(assetName: AssetName, chartInterval: AssetHistoryInterval = 'd1', historyLength: number = 10) {
    const {data: currencyPriceHistoryData, error, refetch, isLoading}: {
        data: object[] | any,
        error: any,
        refetch: any,
        isLoading: any
    } = useQuery({
        queryKey: ['currency-price', assetName],
        queryFn: () => getAssetHistory(assetName, chartInterval, historyLength),
        staleTime: 1000 * 10,
        retry: false,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true
    })

    return {currencyPriceHistoryData, error, refetch, isLoading}
}