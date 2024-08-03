import { supabaseClient } from '@Configs/Supabase/supabaseConfig';
import { Notification } from '@Typings/Components/Notifications.type';

type FetchNotificationsResponse = { data: Notification | any; error: any };

/**
 * This TypeScript function fetches notifications data from a Supabase table and returns it along with
 * any potential errors.
 * @returns The `fetchNotifications` function returns a Promise that resolves to a
 * `FetchNotificationsResponse` object, which contains the `data` and `error` properties obtained from
 * querying the 'notifications' table using Supabase client.
 */
export async function fetchNotifications(): Promise<FetchNotificationsResponse> {
   const { data: response, error }: FetchNotificationsResponse =
      await supabaseClient.from('notifications').select('*');

   return { data: response, error };
}
