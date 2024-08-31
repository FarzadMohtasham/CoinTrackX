import { Asset } from '@/libs/typings/Assets.api.type';
import { SortedTransactionsByAsset } from '@/libs/typings/AssetsPortfolioUtils.type';
import { Transaction } from '@/libs/typings/Transaction.type';
import { getAssets } from '@/services/apis/assets/assets.api';

export type CalculatedTransactionProfitLoss = {
   assetName: string;
   assetSymbol: string;
   amount: number;
   currentPrice: number;
   change24hrPercent: string;
   averageBuy: number;
   allFee: number;
   total: number;
   allProfitLoss: number;
};
export type CalculatedTransactionsProfitLoss =
   CalculatedTransactionProfitLoss[];

export async function calcTransactionsProfitLoss(
   sortedTransactions: SortedTransactionsByAsset[],
): Promise<{ data: CalculatedTransactionsProfitLoss; error: Error | any }> {
   let result: { data: CalculatedTransactionProfitLoss[]; error: any } = {
      data: [],
      error: null,
   };

   try {
      const assets: Asset[] | null = await getAssets();
      if (assets === null) return result;

      sortedTransactions.forEach((sortedTransaction) => {
         const calculatedTransaction: CalculatedTransactionProfitLoss = {
            assetName: '',
            assetSymbol: '',
            amount: 0,
            currentPrice: 0,
            change24hrPercent: '',
            averageBuy: 0,
            allFee: 0,
            total: 0,
            allProfitLoss: 0,
         };
         const currentAsset = assets.find(
            (val) => val.symbol.toLowerCase() === sortedTransaction.asset,
         );
         if (!currentAsset) throw new Error('Asset not found');

         calculatedTransaction.assetName = currentAsset.name;
         calculatedTransaction.assetSymbol = currentAsset.symbol;
         calculatedTransaction.amount = sortedTransaction.transactions.reduce(
            (acc: number, currentTransaction: Transaction) => {
               if (currentTransaction.type === 'buy')
                  return acc + currentTransaction.amount;
               else if (currentTransaction.type === 'sell')
                  return acc - currentTransaction.amount;
               else return acc;
            },
            0,
         );
         calculatedTransaction.currentPrice = Number(currentAsset.priceUsd);
         calculatedTransaction.change24hrPercent =
            currentAsset.changePercent24Hr;
         calculatedTransaction.averageBuy =
            sortedTransaction.transactions.reduce(
               (acc: number, currentTransaction: Transaction) => {
                  if (currentTransaction.type === 'buy')
                     return acc + currentTransaction.price;
                  else if (currentTransaction.type === 'sell')
                     return acc - currentTransaction.price;
                  else return acc;
               },
               0,
            );
         calculatedTransaction.allFee = sortedTransaction.transactions.reduce(
            (acc: number, currentTransaction: Transaction) =>
               acc + currentTransaction.fee,
            0,
         );
         calculatedTransaction.total =
            calculatedTransaction.amount * calculatedTransaction.currentPrice;

         calculatedTransaction.allProfitLoss =
            calculatedTransaction.averageBuy * calculatedTransaction.amount -
            calculatedTransaction.total;

         result.data.push(calculatedTransaction);
      });
   } catch (e) {
      result.error = e;
   }

   return result;
}
