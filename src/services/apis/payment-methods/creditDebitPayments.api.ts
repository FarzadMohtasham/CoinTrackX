import { PostgrestError } from '@supabase/supabase-js';

import {
   supabaseClient as supabase,
   supabaseClient,
} from '@configs/supabase/supabaseConfig.ts';

import { CreditDebitCard } from '@typings/components/CreditDebitCard.type.ts';

/*
 * This API will insert a creditDebitCard to the DB
 * */
export const createCreditDebitCard = async (
   cardInfo: CreditDebitCard,
): Promise<any> => {
   const { data: userData } = await supabaseClient.auth.getUser();

   const {
      card_number,
      card_provider,
      exp,
      cvv,
      cardholder_name,
      as_main_payment,
      postal_code,
   } = cardInfo;

   const { data, error }: { data: any[] | null; error: PostgrestError | null } =
      await supabase
         .from('creditDebitCards')
         .insert([
            {
               email: userData.user?.email,
               cardholder_name: cardholder_name.trim(),
               card_provider: card_provider,
               card_number: card_number,
               exp: exp,
               cvv: cvv,
               postal_code: postal_code,
               as_main_payment: as_main_payment,
            },
         ])
         .select();

   if (error) throw error;

   return data;
};

export const getCreditDebitCards = async (): Promise<any> => {
   // @ts-ignore
   const { data: userData } = await supabaseClient.auth.getUser();

   const {
      data,
      error,
   }: { data: CreditDebitCard[] | null; error: PostgrestError | null } =
      await supabase
         .from('creditDebitCards')
         .select('*')
         // Filters
         .eq('email', userData.user?.email);

   if (error) throw error;

   return data;
};

export const updateCreditDebitCard = async (
   id: number,
   newCreditDebitCardInfo: CreditDebitCard,
): Promise<any> => {
   // @ts-ignore
   const { data: userData } = await supabaseClient.auth.getUser();

   const {
      data,
      error,
   }: { data: CreditDebitCard[] | null; error: PostgrestError | null } =
      await supabase
         .from('creditDebitCards')
         .update({
            email: newCreditDebitCardInfo.email,
            cardholder_name: newCreditDebitCardInfo.cardholder_name.trim(),
            card_provider: newCreditDebitCardInfo.card_provider,
            card_number: newCreditDebitCardInfo.card_number,
            exp: newCreditDebitCardInfo.exp,
            cvv: newCreditDebitCardInfo.cvv,
            postal_code: newCreditDebitCardInfo.postal_code,
            as_main_payment: newCreditDebitCardInfo.as_main_payment,
         })
         .eq('id', id)
         .eq('email', userData.user?.email)
         .select();

   if (error) throw error;

   return data;
};

export const deleteCreditDebitCard = async (id: number): Promise<any> => {
   // @ts-ignore
   const { data: userData } = await supabaseClient.auth.getUser();

   const { error }: { error: PostgrestError | null } = await supabase
      .from('creditDebitCards')
      .delete()
      .eq('id', id)
      .eq('email', userData.user?.email);

   if (error) throw error;

   return null;
};
