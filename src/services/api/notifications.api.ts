import {supabaseClient} from '@config/supabase.ts'
import {Notifications as NotificationsT} from '@ts/type/Notifications.type.ts'

export async function fetchNotifications() {
    const {data: response, error}: { data: NotificationsT | any, error: any } = await supabaseClient
        .from('notifications')
        .select('*')

    return {data: response, error}
}