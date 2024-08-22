import { supabaseClient } from '@/libs/configs/supabase/supabaseConfig';

export const deleteTransactionAPI = async (
   user_id: string,
   id: number,
): Promise<null> => {
   const { error } = await supabaseClient
      .from('transactions')
      .delete()
      .eq('id', id)
      .eq('user_id', user_id);

   if (error) throw new Error(error.message);

   return null;
};
