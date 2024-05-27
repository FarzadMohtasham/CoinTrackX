import {useQuery} from "@tanstack/react-query";
import {getAssetHistory} from "@services/api/assets.api.ts";

export default function useCurrencyPriceQuery(selectedCurrency: string) {
    const {data: currencyPriceHistoryData, error, refetch, isLoading}: {
        data: object[] | any,
        error: any,
        refetch: any,
        isLoading: any
    } = useQuery({
        queryKey: ['currency-price'],
        queryFn: () => getAssetHistory(selectedCurrency, 'd1', 10),
        staleTime: 10000,
        retry: false,
    })

    return {currencyPriceHistoryData, error, refetch, isLoading}
}
