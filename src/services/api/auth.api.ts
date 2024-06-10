import {AuthResponse, Session, User} from '@supabase/supabase-js'
import {supabaseClient} from '@config/supabase.ts'

type LoginReturnT = { user: User | null, session: Session | null }

export async function login(email: string, password: string): Promise<LoginReturnT> {
    const {data, error}: AuthResponse = await supabaseClient.auth.signInWithPassword({email, password})

    if (error) throw new Error(error.message)

    return data
}

// @typings-ignore
export async function signup({}: {
    firstName: string,
    lastName: string
}, email: string, password: string): Promise<LoginReturnT> {
    const {data, error}: AuthResponse = await supabaseClient.auth.signUp({
        email, password,
    })

    if (error) throw new Error(error.message)

    return data
}





