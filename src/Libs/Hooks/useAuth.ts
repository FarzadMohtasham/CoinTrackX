import { supabaseClient } from '@/Libs/Config/Supabase/supabaseConfig';

async function signOut() {
   await supabaseClient.auth.signOut();
}

export default { signOut };
