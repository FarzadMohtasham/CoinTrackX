/*
-> Commented properties add automatically by Supabase
*/
export type TransactionWithoutAutoAddedProps = {
   // id: number;
   // created_at: string; // timestamp with time zone
   // user_id: string; // uuid
   type: string; // text
   asset: string; // text
   pair: string; // text
   amount: number; // double precision
   price: number; // double precision
   fee: number; // double precision
   fee_currency: number; // double precision
   notes: string; // text
   deduct_from_usd: boolean; // boolean
   date: string; // date
   time: string; // time without time zone
   portfolio: string; // text
   email: string; // text
};

export type Transaction = {
   id: number;
   created_at: string; // timestamp with time zone
   user_id: string; // uuid
   type: string; // text
   asset: string; // text
   pair: string; // text
   amount: number; // double precision
   price: number; // double precision
   fee: number; // double precision
   fee_currency: number; // double precision
   notes: string; // text
   deduct_from_usd: boolean; // boolean
   date: string; // date
   time: string; // time without time zone
   portfolio: string; // text
   email: string; // text
};

export type UpdatedTransaction = TransactionWithoutAutoAddedProps & {};
