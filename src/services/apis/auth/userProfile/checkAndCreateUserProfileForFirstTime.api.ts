import { supabaseClient } from '@/libs/configs/supabase/supabaseConfig';
import {
   PostgrestSingleResponse,
   User,
   UserResponse,
} from '@supabase/supabase-js';

export const checkAndCreateUserProfileForFirstTime = async (): Promise<any> => {
   const getUserResponse: UserResponse = await supabaseClient.auth.getUser();
   const authenticatedUser = getUserResponse.data.user as User;

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
