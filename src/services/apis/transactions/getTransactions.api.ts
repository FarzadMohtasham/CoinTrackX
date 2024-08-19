import { supabaseClient } from '@/libs/configs/supabase/supabaseConfig';
import { Transaction } from '@/libs/typings/Transaction.type';

export const getTransactionsAPI = async (
   user_id: string,
): Promise<Transaction[]> => {
   const { data: transactions, error } = await supabaseClient
      .from('transactions')
      .select('*')
      .eq('user_id', user_id);

   if (error) throw new Error(error.message);

   return transactions as unknown as Transaction[];
};
