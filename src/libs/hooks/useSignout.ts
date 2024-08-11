import { supabaseClient } from '@configs/supabase/supabaseConfig.ts';
import { AuthError } from '@supabase/supabase-js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useSignout() {
   const navigate = useNavigate();

   const signout = async (): Promise<{ error: AuthError | null }> => {
      const signoutResult = await supabaseClient.auth.signOut();

      if (signoutResult.error) {
         toast.error('Signout was unsuccessful, Please try again!');
         return signoutResult;
      }

      toast.success('Successfully signed out');
      navigate('/login');

      return { error: null };
   };

   return {
      signout,
   };
}
