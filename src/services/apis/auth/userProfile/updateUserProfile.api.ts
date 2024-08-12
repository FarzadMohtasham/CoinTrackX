import { supabaseClient } from '@/libs/configs/supabase/supabaseConfig';
import { UpdateUserProfilePayload } from '@/libs/typings/auth/UserProfile.type';
import { User, UserResponse } from '@supabase/supabase-js';

export const updateUserProfile = async (payload: UpdateUserProfilePayload) => {
   const getUserResponse: UserResponse = await supabaseClient.auth.getUser();
   const authenticatedUser = getUserResponse.data.user as User;

   if (Object.keys(payload).length === 0) throw new Error('Nothing to update!');

   const userProfileUpdatePayload: { [key: string]: any } = {};

   for (const [key, val] of Object.entries(payload)) {
      userProfileUpdatePayload[key] = val;
   }

   const { data, error } = await supabaseClient
      .from('users_profile')
      .update(userProfileUpdatePayload)
      .eq('user_id', authenticatedUser.id)
      .select();

   if (error) throw new Error(error.message);

   return data;
};
