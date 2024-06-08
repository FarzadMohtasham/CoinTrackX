import {JSX, useState} from 'react'
import {styled} from 'styled-components'
import Icon from '@components/ui/Icon.tsx'
import {Notification, NotificationStyledProps} from '@ts/type/Notifications.type.ts'
import {formatDistance} from "date-fns";
import {toast} from "react-hot-toast";

type SimpleNotifProps = {
    options: Notification & {
        closable?: boolean;
        icon_src?: string;
    }
}

type SimpleNotifStyled = {
    $type: string;
}

const SimpleNotifContainer: any = styled.div<NotificationStyledProps & SimpleNotifStyled>`
  display: flex;
  justify-content: space-between;
  height: max-content;
  border-radius: .8rem;
  border: .2rem solid ${props => props.theme.notif.border_color};
  z-index: 99;

  background-color: ${props => props.theme.notif[props.$type + '_color']};
  overflow: hidden;
`

const LeftColumnWrapper: any = styled.div`
  display: grid;
  place-content: center;
  border-right: .2rem solid ${props => props.theme.notif.border_color};
  padding: 0 1.5rem;
  background-color: ${props => props.theme.notif.icon_wrapper_bg_color};
`

const CenterColumnWrapper: any = styled.div`
  display: flex;
  flex-direction: column;
  gap: .5rem;
  padding: 2rem;

  .top-section {
    display: flex;
    gap: 1rem;
    align-items: center;

    .title {
      font-size: var(--font-size-body-sm);
      font-weight: 500;
    }

    .created-at {
      font-size: var(--font-size-body-xsm);
    }
  }

  .message {
    font-size: var(--font-size-body-xsm);
  }
`

const RightColumnWrapper: any = styled.div`
  width: max-content;
  height: 100%;
  padding: 1.5rem 1.5rem 0 0;

  img {
    cursor: pointer;
  }
`

export default function SimpleNotification(props: SimpleNotifProps): JSX.Element {
    const {
        title,
        type,
        priority,
        created_at,
        message,
        closable,
        icon_src = 'rocket-lunch.svg',
    } = props.options

    console.log(type)

    const [closed, setClosed] = useState<boolean>(false)

    const onCloseHandler = () => {
        setClosed(true)
        toast.success('Notification closed successfully')
    }

    return (
        <>
            {
                !closed && <SimpleNotifContainer $type={type}>
                    <LeftColumnWrapper className={'left-col'}>
                        <Icon icon_src={icon_src}
                              width={'25rem'}/>
                    </LeftColumnWrapper>

                    <CenterColumnWrapper className={'center-col'}>
                        <div className={'top-section'}>
                            <span className={'title'}>{title}</span>
                            <span
                                className={'created-at'}>
                        {
                            formatDistance(new Date(String(created_at)), new Date(), {addSuffix: true})
                        }
                    </span>
                        </div>
                        <span className={'message'}>{message}</span>
                    </CenterColumnWrapper>

                    {
                        closable && <RightColumnWrapper className={'right-col'}>
                            <Icon icon_src={'close.svg'}
                                  width={'20rem'}
                                  on_click_handler={onCloseHandler}
                            />
                        </RightColumnWrapper>
                    }
                </SimpleNotifContainer>
            }
        </>
    )
}












