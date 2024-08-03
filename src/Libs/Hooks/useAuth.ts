import { supabaseClient } from '@Config/Supabase/supabaseConfig';

async function signOut() {
   await supabaseClient.auth.signOut();
}

export default { signOut };
