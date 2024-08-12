import { AuthChangeEvent, createClient, Session } from '@supabase/supabase-js';
import { queryClient } from '../react-query/queryClient';
import { checkAndCreateUserProfileForFirstTime } from '@/services/apis/auth/userProfile.api';

// export const supabaseClient = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_API_KEY)
export const supabaseClient = createClient(
   'https://zwrleecsvygsftotatty.supabase.co',
   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3cmxlZWNzdnlnc2Z0b3RhdHR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyNjgzMzgsImV4cCI6MjAyODg0NDMzOH0.wBXhT_krBgiAWZqCN5XVDcidWJmXLNcRs6GnjfJEPx8',
);

supabaseClient.auth.onAuthStateChange(
   (event: AuthChangeEvent, _: Session | null) => {
      switch (event) {
         case 'INITIAL_SESSION':
            // handle initial session
            break;
         case 'SIGNED_IN':
            // handle sign in event
            checkAndCreateUserProfileForFirstTime();
            break;
         case 'SIGNED_OUT':
            // handle sign out event
            queryClient.clear();
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
