import {useQuery, UseQueryResult} from '@tanstack/react-query'
import {fetchNotifications} from '@services/api/notifications.api.ts'
import {Notification} from '@ts/type/Notifications.type.ts'

export function useNotificationsQuery() {
    const {data, isLoading}: UseQueryResult<{ data: Notification[] | undefined, error: string }, Error> = useQuery({
        queryKey: ['notifications'],
        queryFn: fetchNotifications
    })

    return {
        data, isLoading
    }
}