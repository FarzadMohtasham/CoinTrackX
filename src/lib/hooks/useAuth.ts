import {supabaseClient} from '@config/supabase.ts'


async function signOut() {
    await supabaseClient.auth.signOut()
}

export default {signOut}
