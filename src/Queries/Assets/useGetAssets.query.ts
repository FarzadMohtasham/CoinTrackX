import { useQuery } from '@tanstack/react-query';

import { getAssets } from '@/Services/APIs/assets/assets.api';

import { Asset } from '@/Libs/Typings/Assets.api.type';

export default function useGetAssetsQuery(
   staleTime: number = 1000 * 60 * 60,
   retry: boolean = false,
   refetchOnWindowFocus: boolean = true,
   refetchOnReconnect: boolean = true,
) {
   const {
      data,
      error,
      refetch,
      isLoading,
   }: {
      data: Asset[] | any;
      error: any;
      refetch: any;
      isLoading: any;
   } = useQuery({
      queryKey: ['use-get-assets'],
      queryFn: () => getAssets(),
      staleTime: staleTime,
      retry: retry,
      refetchOnWindowFocus: refetchOnWindowFocus,
      refetchOnReconnect: refetchOnReconnect,
   });

   return { data, error, refetch, isLoading };
}
