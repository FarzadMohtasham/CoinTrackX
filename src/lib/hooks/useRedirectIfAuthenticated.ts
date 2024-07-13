import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocaleStorage from './useLocaleStorage.ts';

export default function useRedirectIfAuthenticated(
  path: string = '/dashboard',
  routerReplace: boolean = false,
) {
  const navigate = useNavigate();

  useEffect((): void => {
    const userLocalStorage: object | null = useLocaleStorage(
      import.meta.env.VITE_User_Auth_Local_Storage_KEY,
    );

    if (userLocalStorage !== null) {
      if (JSON.parse(String(userLocalStorage)).access_token) {
        navigate(path, {
          replace: routerReplace,
        });
      }
    }
  }, []);
}
