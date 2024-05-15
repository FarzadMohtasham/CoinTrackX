import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {fetchNotifications} from '@services/api/notifications.api.ts'

import {Notifications as NotificationsT} from "@ts/type/Notifications.type.ts";

export function useNotificationsQuery() {
    const {data, isLoading}: UseQueryResult<NotificationsT, Error> = useQuery({
        queryKey: ['notifications'],
        queryFn: fetchNotifications
    })

    return {
        data, isLoading
    }
}