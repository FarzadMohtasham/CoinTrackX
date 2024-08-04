import { supabaseClient } from '@Configs/Supabase/supabaseConfig.ts';

async function signOut() {
   await supabaseClient.auth.signOut();
}

export default { signOut };
