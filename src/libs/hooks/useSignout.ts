import { supabaseClient } from '@configs/supabase/supabaseConfig.ts';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useSignout() {
   const navigate = useNavigate();

   const signout = async () => {
      const { error } = await supabaseClient.auth.signOut();

      if (error) {
         toast.error('Signout was unsuccessful, Please try again!');
         return;
      }

      toast.success('Successfully signed out');
      navigate('/login');
   };

   return {
      signout,
   };
}
