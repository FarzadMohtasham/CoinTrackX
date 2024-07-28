import { useQuery } from '@tanstack/react-query';
import { AssetName } from '@/Lib/Typings/Assets.api.type';
import { getAssetSummaryApi } from '@/Services/API/assets/assetSummary.api';

export default function useGetAssetSummaryQuery(assetName: AssetName) {
   return useQuery({
      queryKey: ['get-asset-summary', assetName],
      queryFn: () => getAssetSummaryApi(assetName),
      staleTime: 1000 * 60 * 60,
      gcTime: 1000 * 60 * 60,
      retry: true,
      refetchOnWindowFocus: true,
   });
}
