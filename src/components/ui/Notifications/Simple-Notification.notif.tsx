import { JSX, useState } from 'react';
import { styled } from 'styled-components';
import Icon from '@/Components/UI/Stuff/Icon';
import { NotificationStyledProps } from '@/Lib/Typings/Components/Notifications.type';
import { formatDistance } from 'date-fns';
import {
   SimpleNotifProps,
   SimpleNotifStyled,
} from '@/Lib/Typings/Components/Notification.type';

const SimpleNotifContainer: any = styled.div<
   NotificationStyledProps & SimpleNotifStyled
>`
   display: flex;
   justify-content: space-between;
   border-radius: 8px;
   overflow: hidden;
   width: ${(props) => props.$width};
   height: ${(props) => props.$height};
   border: 2px solid ${(props) => props.theme.notif.border_color};
   background-color: ${(props) => props.theme.notif[props.$type + '_color']};

   .notif-icon {
      width: ${(props) => props.$iconSize};
   }

   .close-icon {
      width: ${(props) => props.$closeIconSize};
   }

   .left-column-wrapper {
      flex: 0 0 auto;
   }
`;

const LeftColumnWrapper: any = styled.div.attrs({
   className: 'left-column-wrapper',
})`
   display: grid;
   place-content: center;
   border-right: 2px solid ${(props) => props.theme.notif.border_color};
   padding: 0 15px;
   background-color: ${(props) => props.theme.notif.icon_wrapper_bg_color};
`;

const CenterColumnWrapper: any = styled.div.attrs({
   className: 'center-column-wrapper',
})`
   display: flex;
   flex-direction: column;
   flex-grow: 1;
   gap: 5px;
   padding: 12px;
   justify-content: center;

   .top-section {
      display: flex;
      gap: 10px;
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
`;

const RightColumnWrapper: any = styled.div.attrs({
   className: 'right-column-wrapper',
})`
   width: max-content;
   height: 100%;
   padding: 15px 15px 0 0;

   img {
      cursor: pointer;
   }
`;

export default function SimpleNotification(
   props: SimpleNotifProps,
): JSX.Element {
   const {
      id = 1,
      createdAt = null,
      title = null,
      message = null,
      type = 'success',
      closable = false,
      iconSrc = 'rocket-lunch.svg',
      iconSize = '50px',
      closeIconSize = '50px',
      width = '100%',
      height = 'max-content',
   } = props.options;

   const { onNotifClose } = props;

   const [closed, setClosed] = useState<boolean>(false);

   const onCloseHandler = () => {
      setClosed(true);
      if (onNotifClose) {
         onNotifClose(id);
      }
   };

   return (
      <>
         {!closed && (
            <SimpleNotifContainer
               $type={type}
               $iconSize={iconSize}
               $closeIconSize={closeIconSize}
               $height={height}
               $width={width}
            >
               <LeftColumnWrapper className={'left-col'}>
                  <Icon
                     iconSrc={iconSrc}
                     className={'notif-icon'}
                     height={iconSize}
                     width={iconSize}
                  />
               </LeftColumnWrapper>

               <CenterColumnWrapper className={'center-col'}>
                  <div className={'top-section'}>
                     <span className={'title'}>{title}</span>
                     {createdAt !== null && (
                        <span className={'created-at'}>
                           {formatDistance(
                              new Date(String(createdAt)),
                              new Date(),
                              {
                                 addSuffix: true,
                              },
                           )}
                        </span>
                     )}
                  </div>
                  {message && <span className={'message'}>{message}</span>}
               </CenterColumnWrapper>

               {closable && (
                  <RightColumnWrapper className={'right-col'}>
                     <Icon
                        iconSrc={'close.svg'}
                        className={'close-icon'}
                        width={'20px'}
                        onClickHandler={onCloseHandler}
                     />
                  </RightColumnWrapper>
               )}
            </SimpleNotifContainer>
         )}
      </>
   );
}
