interface AppMetadata {
   provider: string;
   providers: string[];
}

interface UserMetadata {
   email: string;
   email_verified: boolean;
   phone_verified: boolean;
   sub: string;
}

interface IdentityData {
   email: string;
   email_verified: boolean;
   phone_verified: boolean;
   sub: string;
}

interface Identity {
   identity_id: string;
   id: string;
   user_id: string;
   identity_data: IdentityData;
   provider: string;
   last_sign_in_at: string;
   created_at: string;
   updated_at: string;
   email: string;
}

interface UserType {
   id: string;
   aud: string;
   role: string;
   email: string;
   email_confirmed_at: string;
   phone: string;
   confirmed_at: string;
   last_sign_in_at: string;
   app_metadata: AppMetadata;
   user_metadata: UserMetadata;
   identities: Identity[];
   created_at: string;
   updated_at: string;
   is_anonymous: boolean;
}

interface AuthResponse {
   access_token: string;
   token_type: string;
   expires_in: number;
   expires_at: number;
   refresh_token: string;
   user: UserType;
}
