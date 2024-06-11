import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import useUser from "@hooks/useUser.ts";

export default function useDashboardProtectRoute(path: string = 'dashboard', routerReplace: boolean = false): void {
    const navigate = useNavigate()

    useEffect((): void => {
        const user = useUser()

        if (user === null) {
            navigate(path, {
                replace: routerReplace
            })
        }
    }, []);
}