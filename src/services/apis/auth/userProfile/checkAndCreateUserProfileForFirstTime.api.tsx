import { supabaseClient } from '@/libs/configs/supabase/supabaseConfig';
import {
   PostgrestSingleResponse,
   User,
   UserResponse,
} from '@supabase/supabase-js';
import toast from 'react-hot-toast';

export const checkAndCreateUserProfileForFirstTime = async (): Promise<any> => {
   const user: UserResponse = await supabaseClient.auth.getUser();
   const authenticatedUser = user.data.user as User;

   if (!user || !authenticatedUser) {
      toast((t) => {
         t.duration = 10 * 1000;

         return (
            <span>
               Something went wrong, Some part of application may not work as
               expected, Please reload the page
            </span>
         );
      });

      // localStorage.clear();

      return;
   }

   const { data: currentUserProfile, error }: PostgrestSingleResponse<any[]> =
      await supabaseClient
         .from('users_profile')
         .select('*')
         .eq('user_id', authenticatedUser.id)
         .eq('email', authenticatedUser.email);
   if (error || currentUserProfile[0]) {
      return;
   }

   const currentTimestampz = new Date().toISOString();
   await supabaseClient
      .from('users_profile')
      .insert([
         {
            created_at: currentTimestampz,
            email: authenticatedUser.email,
            profile_img_url: '',
            display_name: '',
            first_name: '',
            last_name: '',
            date_of_birth: '',
            country_of_residence: '',
            phone_number: '',
         },
      ])
      .select();
};
