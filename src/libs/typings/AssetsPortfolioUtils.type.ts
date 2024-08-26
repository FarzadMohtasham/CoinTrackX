import { AssetName } from "./Assets.api.type";
import { Transaction } from "./Transaction.type";

export type SortedTransactionsByAsset = {
   asset: AssetName;
   transactions: Transaction[];
};
