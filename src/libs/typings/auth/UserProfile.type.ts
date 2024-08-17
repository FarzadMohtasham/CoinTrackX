export type GetUserProfileParams = {
   user_id: string;
};

export type UserProfilePhoneNumberT = {
   countryCode: string;
   number: string;
};

export type UserProfile = {
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
   phone_number: UserProfilePhoneNumberT; // text
};

export type UpdateUserProfilePayload = {
   profile_img_url?: string; // text
   display_name?: string; // text
   first_name?: string; // text
   last_name?: string; // text
   date_of_birth?: string; // text
   country_of_residence?: string; // text
   phone_number?: UserProfilePhoneNumberT; // text
};
