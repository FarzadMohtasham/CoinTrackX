import { useQuery } from '@tanstack/react-query';

import { getAsset } from '@/Services/API/assets/assets.api';

import {
   Asset,
   AssetAPIQueryReturnOptions,
   AssetName,
   QueryOptions,
} from '@/Lib/Typings/Assets.api.type';

const defaultOptions: QueryOptions = {
   staleTime: 1000 * 60 * 60,
   gcTime: 1000 * 60 * 60,
   retry: false,
   refetchOnWindowFocus: true,
   refetchOnReconnect: true,
};

export default function useGetAssetQuery(
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
      data: Asset | any;
      error: any;
      refetch: any;
      isLoading: any;
   } = useQuery({
      queryKey: ['use-get-asset', assetName],
      queryFn: () => getAsset(assetName),
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
   } as AssetAPIQueryReturnOptions<Asset>;
}
