import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { fetchNotifications } from '@services/apis/notifications/notifications.api.ts';

import { Notification } from '@typings/components/Notifications.type.ts';

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
