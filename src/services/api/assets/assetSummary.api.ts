import { supabaseClient } from '@config/supabase.ts';
import { AssetName } from '@typings/Assets.api.type.ts';
import { AssetSummary } from '@typings/AssetSummary.type.ts';

const defaultAssetSummary: AssetSummary = {
   asset_name: 'default',
   asset_summary: 'There is no any summary for this asset, Please contact with website support.'
};

export const getAssetSummaryApi = async (assetName: AssetName): Promise<any> => {
   let { data, error }: {
      data: AssetSummary | any,
      error: Error | any,
   } = await supabaseClient
      .from('assetSummary')
      .select()
      .eq('asset_name', assetName);

   if (error) throw error;

   return data[0] ?? defaultAssetSummary as AssetSummary;
};