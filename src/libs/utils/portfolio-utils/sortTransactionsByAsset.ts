import { AssetName } from '@/libs/typings/Assets.api.type';
import { SortedTransactionsByAsset } from '@/libs/typings/AssetsPortfolioUtils.type';
import { Transaction } from '@/libs/typings/Transaction.type';

export async function sortTransactionsByAsset(
   transactions: Transaction[],
): Promise<SortedTransactionsByAsset[]> {
   const sortedTransactions: {
      [key: AssetName | string]: SortedTransactionsByAsset;
   } = {};

   if (transactions.length === 0) return [];

   transactions.map((transaction) => {
      // Check asset be in sortedTransactions, if not, create a new one and add transaction to it
      if (!sortedTransactions[transaction.asset]) {
         sortedTransactions[transaction.asset] = {
            asset: transaction.asset,
            transactions: [transaction],
         };
         return;
      }

      // Added transaction to sortedTransaction
      sortedTransactions[transaction.asset].transactions.push(transaction);
   });

   // converting sortedTransaction to SortedTransactionsByAsset array format
   const SortedTransactionsByAssetArray: SortedTransactionsByAsset[] =
      Object.values(sortedTransactions);

   return SortedTransactionsByAssetArray;
}
