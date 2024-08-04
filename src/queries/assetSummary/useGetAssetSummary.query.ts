import { useQuery } from '@tanstack/react-query';

import { AssetName } from '@Typings/Assets.api.type.ts';

import { getAssetSummaryApi } from '@Services/APIs/assets/assetSummary.api.ts';

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
