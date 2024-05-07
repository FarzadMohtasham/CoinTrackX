import {supabaseClient} from "../../config/supabase.ts"
import {AuthResponse} from "@supabase/supabase-js";

export async function login(email: string, password: string) {
    const {data, error}: AuthResponse = await supabaseClient.auth.signInWithPassword({email, password})

    if (error) throw new Error(error.message)

    return data
}

export async function signup({firstName, lastName}: {
    firstName: string,
    lastName: string
}, email: string, password: string) {
    const { data, error }: AuthResponse = await supabaseClient.auth.signUp({
        email, password,
    })

    if (error) throw new Error(error.message)

    return data
}





