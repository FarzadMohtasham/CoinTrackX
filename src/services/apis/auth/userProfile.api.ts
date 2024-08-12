import { supabaseClient } from '@/libs/configs/supabase/supabaseConfig';
import {
   PostgrestSingleResponse,
   User,
   UserResponse,
} from '@supabase/supabase-js';

interface UserProfile {
   id: number; // bigint
   created_at: string; // timestamp with time zone
   user_id: string; // uuid
   email: string;
   profile_img_url: string; // text
   display_name: string; // text
   first_name: string; // text
   last_name: string; // text
   date_of_birth: string; // text
   country_of_residence: string; // text
   phone_number: string; // text
}

type GetUserProfileParams = {
   user_id: string;
};
type CreateUserProfileParams = { payload: UserProfile };
type UpdateUserProfileParams = {};

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
   const { error: createUserProfileError } = await supabaseClient
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

   console.log(createUserProfileError);
};

export const updateUserProfile = async ({}: UpdateUserProfileParams) => {};
