import { useQuery } from '@tanstack/react-query';

import { getAssetMarkets } from '@/Services/APIs/assets/assets.api';

import {
   AssetMarketProps,
   AssetMarketsAPIQueryReturnProps,
   AssetName,
   QueryOptions,
} from '@/Libs/Typings/Assets.api.type';
import { assetNamesWithSymbols } from '@/Data/assetsList';

const defaultOptions: QueryOptions = {
   staleTime: 1000 * 60 * 60,
   gcTime: 1000 * 60 * 60,
   retry: false,
   refetchOnWindowFocus: true,
   refetchOnReconnect: true,
};

export default function useGetAssetMarketsQuery(
   assetName: AssetName,
   options: QueryOptions = defaultOptions,
) {
   const queryOptions: QueryOptions = {
      ...defaultOptions,
      ...options,
   };

   const {
      data,
      error,
      refetch,
      isLoading,
   }: {
      data: AssetMarketProps[] | any;
      error: any;
      refetch: any;
      isLoading: any;
   } = useQuery({
      queryKey: ['use-get-market', assetName],
      queryFn: () => getAssetMarkets(assetNamesWithSymbols[assetName]),
      staleTime: queryOptions.staleTime,
      gcTime: queryOptions.gcTime,
      retry: queryOptions.retry,
      refetchOnWindowFocus: queryOptions.refetchOnWindowFocus,
      refetchOnReconnect: queryOptions.refetchOnReconnect,
   });

   return {
      data,
      error,
      refetch,
      isLoading,
   } as AssetMarketsAPIQueryReturnProps;
}
