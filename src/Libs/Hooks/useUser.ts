import useUserLoggedIn from '@/Libs/Hooks/useUserLoggedIn';
import useLocaleStorage from '@/Libs/Hooks/useLocaleStorage';

export default function useUser(): AuthResponse | null {
   const userLoggedIn = useUserLoggedIn();

   if (!userLoggedIn) return null;

   return JSON.parse(
      useLocaleStorage(import.meta.env.VITE_User_Auth_Local_Storage_KEY),
   ) as AuthResponse;
}
