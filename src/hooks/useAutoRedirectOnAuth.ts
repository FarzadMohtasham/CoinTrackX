import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import useLocaleStorage from "./useLocaleStorage.ts";
import env from "../utils/env.ts";

export default function useAutoRedirectOnAuth(path: string = 'dashboard', routerReplace: boolean = false) {
    const navigate = useNavigate()

    useEffect(() => {
        const userLocalStorage: object | null = useLocaleStorage(env.User_Auth_Local_Storage)

        if (userLocalStorage !== null) {
            if (JSON.parse(String(userLocalStorage)).access_token) {
                navigate(path, {
                    replace: routerReplace
                })
            }
        }
    }, []);
}



