import { AssetName } from './Assets.api.type';

export type Transaction = {
   id?: number;
   created_at?: string; // timestamp with time zone
   user_id?: string; // uuid
   email?: string; // text
   type: 'buy' | 'sell';
   asset: AssetName;
   pair: TransactionPair;
   amount: number; // double precision
   price: number; // double precision
   fee: number; // double precision
   fee_currency: 'USD'; // Text
   notes: string; // text
   deduct_from_usd: boolean; // boolean
   time: string; // time: string; // time with time zone
   portfolio: TransactionPortfolio;
};

export type UpdatedTransaction = Transaction & {};

// /////////////////////////////////////////////////////

export type TransactionPair = 'USD';
export type TransactionPortfolio = 'Default';
