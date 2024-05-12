import {styled} from "styled-components"
import {MutableRefObject, useEffect, useRef, useState} from "react"
import Icon from "./Icon.tsx"

type NotificationContainerProps = {
    ref: MutableRefObject<any>
}

type NotificationStyledProps = {
    $priority: string;
    $type: string;
}

type Notifications = {
    title: string;
    message: string;
    type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
    priority: 'high' | 'middle' | 'low';
}

const NotificationsContainer = styled.div<NotificationContainerProps>`
  display: grid;
  place-content: center;
  cursor: pointer;
  position: relative;
`

const NotificationsWrapper = styled.div`
  width: 30rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--color-black-50);
  position: absolute;
  top: 4rem;
  right: 0;
  padding: 1rem;
  border-radius: 1.4rem;
`

const NotificationStyled = styled.div<NotificationStyledProps>`
  background-color: var(--color-black-100);
  padding: 1rem;
  border-radius: .8rem;

  span.title {
    font-size: var(--font-size-body-md);
    display: block;
    margin-bottom: .5rem;
    font-weight: 500;
  }

  span.message {
    font-size: var(--font-size-body-sm);
    display: block;
  }
`

export default function Notifications() {
    const [notifIsOpen, setNotifIsOpen] = useState(false)
    const notificationRef = useRef<HTMLElement | null>(null)
    // TODO Load and set Notifications from API
    const [notifications /*, setNotifications*/] = useState<[] | Notifications[]>([
        {
            title: 'Notification title',
            message: 'Welcome to the CoinTrackX application, We love you :)',
            type: 'primary',
            priority: 'high',
        },
        {
            title: 'Notification title',
            message: 'Notifications message',
            type: 'primary',
            priority: 'high',
        },
    ])

    const onNotificationsClickHandler = (): void => {
        setNotifIsOpen(true)
    }

    const handleOnOutsideClick = (e: Event) => {
        if ((notificationRef.current && !e?.composedPath().includes(notificationRef.current)) && !notifIsOpen) {
            setNotifIsOpen(false)
        }
    }

    useEffect(() => {
        document.body.addEventListener('click', handleOnOutsideClick)
        return () => {
            document.body.removeEventListener('click', handleOnOutsideClick)
        }
    }, []);

    return (
        notifications.length > 0 && <NotificationsContainer ref={notificationRef}>
            <Icon icon_src={'notifications.svg'}
                  icon_alt={'notification icon'}
                  width={'30rem'}
                  on_click_handler={onNotificationsClickHandler}/>

            {
                notifIsOpen && <NotificationsWrapper>
                    {
                        notifications.map((notification, index) => {
                            const {
                                title, message, priority, type,
                            } = notification

                            return (
                                <NotificationStyled $priority={priority}
                                                    $type={type}
                                                    key={title + index}
                                >
                                    <span className={'title'}>{title}</span>
                                    <span className="message">{message}</span>
                                </NotificationStyled>
                            )
                        })
                    }
                </NotificationsWrapper>
            }
        </NotificationsContainer>
    )
}

export async function loader() {

}