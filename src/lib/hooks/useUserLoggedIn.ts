export default function useUserLoggedIn(): boolean {
  return !!JSON.parse(
    localStorage.getItem(
      import.meta.env.VITE_User_Auth_Local_Storage_KEY
    ) as string
  )?.access_token;
}
