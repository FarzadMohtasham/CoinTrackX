import { supabaseClient } from '@/Libs/Configs/Supabase/supabaseConfig';
import { AssetName } from '@/Libs/Typings/Assets.api.type';
import { AssetSummary } from '@/Libs/Typings/AssetSummary.type';

const defaultAssetSummary: AssetSummary = {
   asset_name: 'default',
   asset_summary:
      'There is no any summary for this asset, Please contact with website support.',
};

/**
 * This TypeScript function retrieves an asset summary from a Supabase database based on the provided
 * asset name.
 * @param {AssetName} assetName - The `assetName` parameter in the `getAssetSummaryApi` function is of
 * type `AssetName`. It is used to specify the name of the asset for which you want to retrieve the
 * summary information.
 * @returns The function `getAssetSummaryApi` is returning the asset summary data for the specified
 * `assetName`. If there is an error during the retrieval process, it will throw an error. If no data
 * is found for the specified asset name, it will return a default asset summary.
 */
export const getAssetSummaryApi = async (
   assetName: AssetName,
): Promise<any> => {
   const {
      data,
      error,
   }: {
      data: AssetSummary | any;
      error: Error | any;
   } = await supabaseClient
      .from('assetSummary')
      .select()
      .eq('asset_name', assetName);

   if (error) throw error;

   return data[0] ?? (defaultAssetSummary as AssetSummary);
};
