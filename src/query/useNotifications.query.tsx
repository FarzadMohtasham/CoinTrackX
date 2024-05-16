import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {fetchNotifications} from '@services/api/notifications.api.ts'
import {Notifications} from "@ts/type/Notifications.type.ts";

export function useNotificationsQuery() {
    const {data, isLoading}: UseQueryResult<{ data: Notifications[] | undefined, error: string }, Error> = useQuery({
        queryKey: ['notifications'],
        queryFn: fetchNotifications
    })

    return {
        data, isLoading
    }
}