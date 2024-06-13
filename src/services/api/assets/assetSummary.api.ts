import {supabaseClient} from "@config/supabase.ts";
import {AssetName} from "@typings/type/Assets.api.type.ts";
import {AssetSummary} from "@typings/type/AssetSummary.type.ts";

export const getAssetSummaryApi = async (assetName: AssetName) => {
    let {data, error}: {
        data: AssetSummary | any,
        error: Error | any,
    } = await supabaseClient
        .from('assetSummary')
        .select()
        .eq('asset_name', assetName)

    if (error) throw error;

    return data[0] as AssetSummary
}