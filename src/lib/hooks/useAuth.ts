import { supabaseClient } from '@/lib/config/supabase/supabase.ts';

async function signOut() {
   await supabaseClient.auth.signOut();
}

export default { signOut };
