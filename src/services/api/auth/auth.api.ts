import { AuthResponse, Session, User } from '@supabase/supabase-js';
import { supabaseClient } from '@/Lib/Config/Supabase/supabaseConfig';

type LoginReturnT = { user: User | null; session: Session | null };

/**
 * This TypeScript function logs in a user with the provided email and password using Supabase
 * authentication and returns the login data.
 * @param {string} email - The `email` parameter is a string that represents the email address of the
 * user trying to log in.
 * @param {string} password - The `password` parameter in the `login` function is a string that
 * represents the user's password. It is used as one of the inputs for the user authentication process
 * when attempting to sign in with the provided email and password.
 * @returns The `login` function is returning a Promise that resolves to a `LoginReturnT` type. The
 * `LoginReturnT` type is not explicitly defined in the provided code snippet, so it would depend on
 * how it is defined elsewhere in the codebase.
 */
export async function login(
   email: string,
   password: string,
): Promise<LoginReturnT> {
   const { data, error }: AuthResponse =
      await supabaseClient.auth.signInWithPassword({ email, password });

   if (error) throw new Error(error.message);

   return data;
}

/**
 * The `signup` function in TypeScript handles user sign up by sending the email and password to a
 * Supabase client for authentication.
 * @param  - The `signup` function takes the following parameters:
 * @param {string} email - The `email` parameter in the `signup` function represents the email address
 * that the user provides during the signup process. This email will be used as part of the
 * authentication process for creating a new user account.
 * @param {string} password - The `password` parameter in the `signup` function represents the password
 * that the user will use to create their account. It is a required field for the user to sign up
 * successfully.
 * @returns The `signup` function is returning a `Promise` that resolves to a `LoginReturnT` type. The
 * `data` from the `AuthResponse` object is being returned if the sign-up process is successful.
 */
export async function signup(
   {}: {
      firstName: string;
      lastName: string;
   },
   email: string,
   password: string,
): Promise<LoginReturnT> {
   const { data, error }: AuthResponse = await supabaseClient.auth.signUp({
      email,
      password,
   });

   if (error) throw new Error(error.message);

   return data;
}
