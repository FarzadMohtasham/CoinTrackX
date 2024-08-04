import { supabaseClient } from '@configs/supabase/supabaseConfig.ts';

async function signOut() {
   await supabaseClient.auth.signOut();
}

export default { signOut };
