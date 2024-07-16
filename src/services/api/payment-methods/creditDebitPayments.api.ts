import { AuthUser, PostgrestError } from '@supabase/supabase-js';
import { supabaseClient as supabase } from '@config/supabase.ts';

import { CreditDebitCard } from '@typings/component-types/CreditDebitCard.type.ts';

import useUser from '@hooks/useUser.ts';

/*
 * This API will insert a creditDebitCard to the DB
 * */
export const insertCreditDebitCard = async (
  cardInfo: CreditDebitCard
): Promise<any> => {
  const {
    email,
    card_number,
    card_provider,
    exp,
    cvv,
    cardholder_name,
    as_main_payment,
    postal_code
  } = cardInfo;

  const { data, error }: { data: any[] | null; error: PostgrestError | null } =
    await supabase
      .from('creditDebitCards')
      .insert([
        {
          email: email,
          cardholder_name: cardholder_name.trim(),
          card_provider: card_provider,
          card_number: card_number,
          exp: exp,
          cvv: cvv,
          postal_code: postal_code,
          as_main_payment: as_main_payment
        }
      ])
      .select();

  return { data, error };
};

export const getCreditDebitCards = async (): Promise<any> => {
  // @ts-ignore
  const { user }: { user: AuthUser } = useUser();

  let {
    data,
    error
  }: { data: CreditDebitCard[] | null; error: PostgrestError | null } =
    await supabase
      .from('creditDebitCards')
      .select('*')
      // Filters
      .eq('email', user.email);

  if (error) throw error;

  return data;
};

export const updateCreditDebitCard = async (id: number, newCreditDebitCardInfo: CreditDebitCard): Promise<any> => {
  // @ts-ignore
  const { user }: { user: AuthUser } = useUser();

  let {
    data,
    error
  }: { data: CreditDebitCard[] | null; error: PostgrestError | null } = await supabase
    .from('creditDebitCards')
    .update({
      email: newCreditDebitCardInfo.email,
      cardholder_name: newCreditDebitCardInfo.cardholder_name.trim(),
      card_provider: newCreditDebitCardInfo.card_provider,
      card_number: newCreditDebitCardInfo.card_number,
      exp: newCreditDebitCardInfo.exp,
      cvv: newCreditDebitCardInfo.cvv,
      postal_code: newCreditDebitCardInfo
        .postal_code,
      as_main_payment: newCreditDebitCardInfo.as_main_payment
    })
    .eq('id', id)
    .eq('email', user.email)
    .select();

  if (error) throw error;

  return data;
};

export const deleteCreditDebitCard = async (id: number): Promise<any> => {
  // @ts-ignore
  const { user }: { user: AuthUser } = useUser();

  let {
    error
  }: { error: PostgrestError | null } = await supabase
    .from('creditDebitCards')
    .delete()
    .eq('id', id)
    .eq('email', user.email);

  if (error) throw error;

  return undefined
};