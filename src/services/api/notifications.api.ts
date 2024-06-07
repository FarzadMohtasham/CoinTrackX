import {supabaseClient} from '@config/supabase.ts'
import {Notifications as NotificationsT} from '@ts/type/Notifications.type.ts'

type FetchNotificationsResponse = { data: NotificationsT | any, error: any }

export async function fetchNotifications(): Promise<FetchNotificationsResponse> {
    const {data: response, error}: FetchNotificationsResponse = await supabaseClient
        .from('notifications')
        .select('*')

    return {data: response, error}
}