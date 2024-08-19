import { supabaseClient } from '@/libs/configs/supabase/supabaseConfig';
import {
   Transaction,
   UpdatedTransaction,
} from '@/libs/typings/Transaction.type';

export const updateTransactionAPI = async (
   id: number,
   user_id: string,
   updatedTransaction: UpdatedTransaction,
): Promise<Transaction> => {
   const { data, error } = await supabaseClient
      .from('transactions')
      .update(updatedTransaction)
      .eq('user_id', user_id)
      .eq('id', id)
      .select();

   if (error) throw new Error(error.message);

   return data as unknown as Transaction;
};
