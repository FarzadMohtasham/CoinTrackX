import { useEffect, useState } from 'react';
import { supabaseClient } from '../configs/supabase/supabaseConfig';

export type UseUserLoggedInResponse = {
   loading: boolean;
   userLoggedIn: boolean;
};

export default function useUserLoggedIn(): UseUserLoggedInResponse {
   const [loading, setLoading] = useState<boolean>(true);
   const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

   useEffect(() => {
      supabaseClient.auth.getUser().then((user) => {
         if (user.data.user) setUserLoggedIn(true);
      });

      setTimeout(() => {
         setLoading(false);
      }, 1000);
   }, []);

   return {
      loading,
      userLoggedIn,
   };
}
