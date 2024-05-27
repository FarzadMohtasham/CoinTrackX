import {useQuery} from "@tanstack/react-query";
import {getAssetHistory} from "@services/api/assets.api.ts";
import {AssetHistoryInterval} from "@ts/type/Assets.api.type.ts";

export default function useCurrencyPriceQuery(selectedCurrency: string, chartInterval: AssetHistoryInterval = 'd1', historyLength: number = 10) {
    const {data: currencyPriceHistoryData, error, refetch, isLoading}: {
        data: object[] | any,
        error: any,
        refetch: any,
        isLoading: any
    } = useQuery({
        queryKey: ['currency-price'],
        queryFn: () => getAssetHistory(selectedCurrency, chartInterval, historyLength),
        staleTime: 10000,
        retry: false,
    })

    return {currencyPriceHistoryData, error, refetch, isLoading}
}
