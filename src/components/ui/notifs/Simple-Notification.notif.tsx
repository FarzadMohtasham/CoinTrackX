import {JSX, useState} from 'react'
import {styled} from 'styled-components'
import Icon from '@components/ui/stuff/Icon.tsx'
import {NotificationStyledProps} from '@typings/type/component-types/Notifications.type.ts'
import {formatDistance} from 'date-fns'
import {toast} from 'react-hot-toast'
import {SimpleNotifProps, SimpleNotifStyled} from '@typings/type/component-types/Notification.type.ts'

const SimpleNotifContainer: any = styled.div<NotificationStyledProps & SimpleNotifStyled>`
    display: flex;
    justify-content: space-between;
    border-radius: .8rem;
    overflow: hidden;
    width: ${props => props.$width};
    height: ${props => props.$height};
    border: .2rem solid ${props => props.theme.notif.border_color};
    background-color: ${props => props.theme.notif[props.$type + '_color']};

    .notif-icon {
        width: ${props => props.$iconSize};
    }

    .close-icon {
        width: ${props => props.$closeIconSize};
    }

    .left-column-wrapper {
        flex: 0 0 auto;
    }
`

const LeftColumnWrapper: any = styled.div.attrs({
    className: 'left-column-wrapper',
})`
    display: grid;
    place-content: center;
    border-right: .2rem solid ${props => props.theme.notif.border_color};
    padding: 0 1.5rem;
    background-color: ${props => props.theme.notif.icon_wrapper_bg_color};
`

const CenterColumnWrapper: any = styled.div.attrs({
    className: 'center-column-wrapper',
})`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: .5rem;
    padding: 2rem;
    justify-content: center;

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

const RightColumnWrapper: any = styled.div.attrs({
    className: 'right-column-wrapper',
})`
    width: max-content;
    height: 100%;
    padding: 1.5rem 1.5rem 0 0;

    img {
        cursor: pointer;
    }
`

export default function SimpleNotification(props: SimpleNotifProps): JSX.Element {
    const {
        id = 1,
        title = null,
        type = 'success',
        createdAt = null,
        message = null,
        closable = false,
        iconSrc = 'rocket-lunch.svg',
        width = '100%',
        height = 'max-content',
        iconSize = '10rem',
        closeIconSize = '10rem',
    } = props.options

    const {onNotifClose} = props

    const [closed, setClosed] = useState<boolean>(false)

    const onCloseHandler = () => {
        setClosed(true)
        if (onNotifClose) {
            onNotifClose(id)
        }
        toast.success('Notification closed successfully')
    }

    return (
        <>
            {
                !closed && <SimpleNotifContainer $type={type}
                                                 $iconSize={iconSize}
                                                 $closeIconSize={closeIconSize}
                                                 $height={height}
                                                 $width={width}>
                    <LeftColumnWrapper className={'left-col'}>
                        <Icon iconSrc={iconSrc}
                              className={'notif-icon'}
                              width={'25rem'}/>
                    </LeftColumnWrapper>

                    <CenterColumnWrapper className={'center-col'}>
                        <div className={'top-section'}>
                            <span className={'title'}>{title}</span>
                            {
                                createdAt !== null && <span
                                    className={'created-at'}>
                                    {
                                        formatDistance(new Date(String(createdAt)), new Date(), {addSuffix: true})
                                    }
                                </span>
                            }
                        </div>
                        {
                            message && <span className={'message'}>
                            {message}
                            </span>
                        }
                    </CenterColumnWrapper>

                    {
                        closable && <RightColumnWrapper className={'right-col'}>
                            <Icon iconSrc={'close.svg'}
                                  className={'close-icon'}
                                  width={'20rem'}
                                  onClickHandler={onCloseHandler}
                            />
                        </RightColumnWrapper>
                    }
                </SimpleNotifContainer>
            }
        </>
    )
}












