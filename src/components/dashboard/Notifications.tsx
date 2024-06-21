import {JSX, useEffect, useRef, useState} from 'react'
import {styled} from 'styled-components'
import Skeleton from 'react-loading-skeleton'
import _ from 'lodash'

import Icon from '../ui/stuff/Icon.tsx'

import {useNotificationsQuery} from '@query/notifications/useNotifications.query.ts'

import {
    Notification,
    NotificationContainerProps
} from '@typings/component-types/Notifications.type.ts'
import SimpleNotification from '@components/ui/notifs/Simple-Notification.notif.tsx'
import {NotificationOptions} from '@typings/component-types/Notification.type.ts'

const NotificationsContainer = styled.div<NotificationContainerProps>`
  display: grid;
  place-content: center;
  position: relative;

  .notifications-icon {
    cursor: pointer;
  }
`

const NotificationsWrapper = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: ${props => props.theme.notif.notifs_container_bg_color};
  position: absolute;
  top: 4rem;
  right: 0;
  padding: 1rem;
  border-radius: 1.4rem;
  z-index: 50;
`

export default function Notifications(): JSX.Element {
    const [notifIsOpen, setNotifIsOpen] = useState(false)
    const notificationRef = useRef<HTMLElement | null>(null)
    const [notifications, setNotifications] = useState<[] | Notification[]>([])

    const {data: response, isLoading} = useNotificationsQuery()

    const onNotificationsClickHandler = (): void => {
        setNotifIsOpen(true)
    }

    const handleOnOutsideClick = (e: Event): void => {
        if ((notificationRef.current && !e.composedPath().includes(notificationRef.current)) && !notifIsOpen) {
            setNotifIsOpen(false)
        }
    }

    const removeNotification = (notifId: number): void => {
        setNotifications((notifs: Notification[]) => notifs.filter(notif => notif.id !== notifId))
        setNotifIsOpen(false)
    }

    useEffect((): void => {
        function filterNotifByPriority(priority: string, data: Notification[] = response?.data || []): Notification[] {
            return data.filter((notif: Notification): boolean => notif.priority === priority)
        }

        if (!response?.data?.length) return

        const filterByHigh: Notification[] = filterNotifByPriority('high')
        const filterByMiddle: Notification[] = filterNotifByPriority('middle')
        const filterByLow: Notification[] = filterNotifByPriority('low')

        const filteredNotifications: Notification[] = _.union(filterByHigh, filterByMiddle, filterByLow)

        setNotifications(filteredNotifications)
    }, [response]);

    useEffect(() => {
        document.body.addEventListener('click', handleOnOutsideClick)

        return (): void => {
            document.body.removeEventListener('click', handleOnOutsideClick)
        }
    }, []);

    return (
        <>
            {
                isLoading ?
                    <Skeleton width={'4rem'} height={'4rem'} style={{borderRadius: '.8rem'}}/>
                    :
                    notifications.length > 0 && <NotificationsContainer ref={notificationRef}>
                        <Icon iconSrc={'notifications.svg'}
                              iconAlt={'notifications icon'}
                              width={'30rem'}
                              className={'notifications-icon'}
                              onClickHandler={onNotificationsClickHandler}/>

                        {
                            notifIsOpen && <NotificationsWrapper>
                                {
                                    notifications.map((notificationOptions: Notification, index: number) => {
                                        const notifOptions: NotificationOptions = {
                                            ...notificationOptions,
                                            height: 'max-content',
                                            iconSize: '2rem',
                                            closeIconSize: '2rem',
                                        }

                                        return (
                                            <SimpleNotification options={notifOptions}
                                                                onNotifClose={removeNotification}
                                                                key={index}/>
                                        )
                                    })
                                }
                            </NotificationsWrapper>
                        }
                    </NotificationsContainer>
            }
        </>
    )
}
