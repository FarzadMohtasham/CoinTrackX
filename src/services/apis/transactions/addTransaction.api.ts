import { supabaseClient } from '@/libs/configs/supabase/supabaseConfig';
import { Transaction } from '@/libs/typings/Transaction.type';

export const addNewTransactionAPI = async (
   transaction: Transaction,
): Promise<Transaction> => {
   const { data, error } = await supabaseClient
      .from('transactions')
      .insert([transaction])
      .select();

   if (error) throw new Error(error.message);

   return data as unknown as Transaction;
};
