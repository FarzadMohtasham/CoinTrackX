import {
   PostgrestSingleResponse,
   User,
   UserResponse,
} from '@supabase/supabase-js';
import { supabaseClient } from '@/libs/configs/supabase/supabaseConfig';
import { UserProfile } from '@/libs/typings/auth/UserProfile.type';

export const getUserProfile = async (): Promise<UserProfile> => {
   const getUserResponse: UserResponse = await supabaseClient.auth.getUser();
   const authenticatedUser = getUserResponse.data.user as User;

   const { data, error }: PostgrestSingleResponse<any[]> = await supabaseClient
      .from('users_profile')
      .select('*')
      .eq('user_id', authenticatedUser.id);

   if (error) throw new Error(error.message);

   return data[0];
};
