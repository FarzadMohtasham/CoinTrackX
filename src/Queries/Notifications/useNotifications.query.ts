import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchNotifications } from '@Services/APIs/notifications/notifications.api';
import { Notification } from '@Typings/Components/Notifications.type';

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
