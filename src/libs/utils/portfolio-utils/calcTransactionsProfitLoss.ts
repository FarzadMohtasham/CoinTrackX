import { SortedTransactionsByAsset } from '@/libs/typings/AssetsPortfolioUtils.type';
import { getAssets } from '@/services/apis/assets/assets.api';

export type CalculatedTransactionProfitLoss = {
   assetName: string;
   amount: number;
   currentPrice: number;
   change24hr: string;
   averageBuy: number;
   total: number;
   allProfitLoss: number;
};
export type CalculatedTransactionsProfitLoss =
   CalculatedTransactionProfitLoss[];

export async function calcTransactionsProfitLoss(
   sortedTransactions: SortedTransactionsByAsset[],
): Promise<{ data: CalculatedTransactionsProfitLoss; error: any }> {
   let result = {
      data: [],
      error: null,
   };

   try {
      const assets = await getAssets();
   } catch (e) {
      result.error = e;
   }

   return result;
}
