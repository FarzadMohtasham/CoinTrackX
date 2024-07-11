import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import useUserLoggedIn from '@hooks/useUserLoggedIn.ts'

export default function useDashboardProtectRoute(path: string = '/dashboard', routerReplace: boolean = false): void {
    const navigate = useNavigate()

    useEffect((): void => {
        const userLoggedIn = useUserLoggedIn()

        if (!userLoggedIn) {
            navigate(path, {
                replace: routerReplace
            })
        }
    }, []);
}