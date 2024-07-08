import {supabaseClient as supabase} from "@config/supabase.ts"
import {CreditDebitCard} from "@typings/component-types/CreditDebitCard.type.ts"
import useUser from "@hooks/useUser.ts";
import {AuthUser} from "@supabase/supabase-js";

/*
* This API will insert a creditDebitCard to the DB
* */
export const insertCreditDebitCard = async (cardInfo: CreditDebitCard) => {
    const {
        email,
        card_number,
        card_provider,
        exp,
        cvv,
        cardholder_name,
        as_main_payment,
        postal_code,
    } = cardInfo

    const {data, error} = await supabase
        .from('creditDebitCards')
        .insert([
            {
                email: email,
                cardholder_name: cardholder_name,
                card_provider: card_provider,
                card_number: card_number,
                exp: exp,
                cvv: cvv,
                postal_code: postal_code,
                as_main_payment: as_main_payment,
            },
        ])
        .select()

    return {data, error}
}

export const getCreditDebitCards = async () => {
    // @ts-ignore
    const {user}: {user: AuthUser} = useUser()

    let { data, error } = await supabase
        .from('creditDebitCards')
        .select("*")
        // Filters
        .eq('email', user.email)

    if (error) throw error

    return data
}
