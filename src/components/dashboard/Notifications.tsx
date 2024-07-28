import { JSX, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import _ from 'lodash';

import Icon from '../UI/Stuff/Icon.tsx';

import { useNotificationsQuery } from '@/Queries/Notifications/useNotifications.query.ts';

import {
   Notification,
   NotificationContainerProps,
} from '@/Libs/Typings/Components/Notifications.type.ts';
import SimpleNotification from '@/Components/UI/Notifications/Simple-Notification.notif.tsx';
import { NotificationOptions } from '@/Libs/Typings/Components/Notification.type.ts';

const NotificationsContainer = styled.div<NotificationContainerProps>`
   display: grid;
   place-content: center;
   position: relative;

   .notifications-icon {
      cursor: pointer;
   }
`;

const NotificationsWrapper = styled.div`
   width: 400px;
   display: flex;
   flex-direction: column;
   gap: 10px;
   background-color: ${(props) => props.theme.notif.notifs_container_bg_color};
   position: absolute;
   top: 40px;
   padding: 10px;
   border-radius: 14px;
   z-index: 11;

   @media screen and (min-width: ${(props) => props.theme.breakpoints.sm}) {
      right: 0;
   }

   @media screen and (max-width: ${(props) => props.theme.breakpoints.sm}) {
      right: -80px;
   }
`;

export default function Notifications(): JSX.Element {
   const [notifIsOpen, setNotifIsOpen] = useState(false);
   const notificationRef = useRef<HTMLElement | null>(null);
   const [notifications, setNotifications] = useState<[] | Notification[]>([]);

   const { data: response, isLoading } = useNotificationsQuery();

   const onNotificationsClickHandler = (): void => {
      setNotifIsOpen(true);
   };

   const handleOnOutsideClick = (e: Event): void => {
      if (
         notificationRef.current &&
         !e.composedPath().includes(notificationRef.current) &&
         !notifIsOpen
      ) {
         setNotifIsOpen(false);
      }
   };

   const removeNotification = (notifId: number): void => {
      setNotifications((notifs: Notification[]) =>
         notifs.filter((notif) => notif.id !== notifId),
      );
      setNotifIsOpen(false);
   };

   useEffect((): void => {
      function filterNotifByPriority(
         priority: string,
         data: Notification[] = response?.data || [],
      ): Notification[] {
         return data.filter(
            (notif: Notification): boolean => notif.priority === priority,
         );
      }

      if (!response?.data?.length) return;

      const filterByHigh: Notification[] = filterNotifByPriority('high');
      const filterByMiddle: Notification[] = filterNotifByPriority('middle');
      const filterByLow: Notification[] = filterNotifByPriority('low');

      const filteredNotifications: Notification[] = _.union(
         filterByHigh,
         filterByMiddle,
         filterByLow,
      );

      setNotifications(filteredNotifications);
   }, [response]);

   useEffect(() => {
      document.body.addEventListener('click', handleOnOutsideClick);

      return (): void => {
         document.body.removeEventListener('click', handleOnOutsideClick);
      };
   }, []);

   return (
      <>
         {isLoading ? (
            <Skeleton
               width={'40px'}
               height={'40px'}
               style={{ borderRadius: '8px' }}
            />
         ) : (
            notifications.length > 0 && (
               <NotificationsContainer ref={notificationRef}>
                  <Icon
                     iconSrc={'notifications.svg'}
                     iconAlt={'notifications icon'}
                     width={'30px'}
                     className={'notifications-icon'}
                     onClickHandler={onNotificationsClickHandler}
                  />

                  {notifIsOpen && (
                     <NotificationsWrapper>
                        {notifications.map(
                           (
                              notificationOptions: Notification,
                              index: number,
                           ) => {
                              const notifOptions: NotificationOptions = {
                                 ...notificationOptions,
                                 height: 'max-content',
                                 iconSize: '20px',
                                 closeIconSize: '20px',
                              };

                              return (
                                 <SimpleNotification
                                    options={notifOptions}
                                    onNotifClose={removeNotification}
                                    key={index}
                                 />
                              );
                           },
                        )}
                     </NotificationsWrapper>
                  )}
               </NotificationsContainer>
            )
         )}
      </>
   );
}
