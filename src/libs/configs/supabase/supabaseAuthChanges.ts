import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { supabaseClient } from './supabaseConfig';

const {} = supabaseClient.auth.onAuthStateChange(
   (event: AuthChangeEvent, _: Session | null) => {
      switch (event) {
         case 'INITIAL_SESSION':
            // handle initial session
            break;
         case 'SIGNED_IN':
            // handle sign in event
            break;
         case 'SIGNED_OUT':
            // handle sign out event
            break;
         case 'PASSWORD_RECOVERY':
            // handle password recovery event
            break;
         case 'TOKEN_REFRESHED':
            // handle token refreshed event
            break;
         case 'USER_UPDATED':
            // handle user updated event
            break;
         default:
            // handle any other events if necessary
            break;
      }
   },
);
