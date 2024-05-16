import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import useLocaleStorage from "./useLocaleStorage.ts";

export default function useAutoRedirectOnAuth(path: string = 'dashboard', routerReplace: boolean = false) {
    const navigate = useNavigate()

    useEffect(() => {
        const userLocalStorage: object | null = useLocaleStorage(import.meta.env.VITE_User_Auth_Local_Storage_KEY)
        console.log(userLocalStorage)

        if (userLocalStorage !== null) {
            if (JSON.parse(String(userLocalStorage)).access_token) {
                console.log('if2 true')
                navigate(path, {
                    replace: routerReplace
                })
            }
        }
    }, []);
}



