import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabaseClient } from '@/libs/configs/supabase/supabaseConfig';
import {
   GetUserProfileParams,
   UserProfile,
} from '@/libs/typings/auth/UserProfile.type';

export const getUserProfile = async ({
   user_id,
}: GetUserProfileParams): Promise<UserProfile> => {
   const { data, error }: PostgrestSingleResponse<any[]> = await supabaseClient
      .from('users_profile')
      .select('*')
      .eq('user_id', user_id);

   if (error) throw new Error(error.message);

   return data[0];
};
