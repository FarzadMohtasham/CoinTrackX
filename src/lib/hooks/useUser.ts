import useUserLoggedIn from "@hooks/useUserLoggedIn.ts";
import useLocaleStorage from "@hooks/useLocaleStorage.ts";

export default function useUser(): Object | boolean {
    const userLoggedIn = useUserLoggedIn()

    if (!userLoggedIn) return false

    return JSON.parse(useLocaleStorage(import.meta.env.VITE_User_Auth_Local_Storage_KEY))
}