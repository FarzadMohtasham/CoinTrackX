import { supabaseClient } from '@/Lib/Config/Supabase/supabaseConfig';

async function signOut() {
   await supabaseClient.auth.signOut();
}

export default { signOut };
