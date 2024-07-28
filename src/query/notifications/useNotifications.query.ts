import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchNotifications } from '@/Services/API/notifications/notifications.api';
import { Notification } from '@/Lib/Typings/Components/Notifications.type';

export function useNotificationsQuery() {
   const {
      data,
      isLoading,
   }: UseQueryResult<
      { data: Notification[] | undefined; error: string },
      Error
   > = useQuery({
      queryKey: ['notifs'],
      queryFn: fetchNotifications,
   });

   return {
      data,
      isLoading,
   };
}
