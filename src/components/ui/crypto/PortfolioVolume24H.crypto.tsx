import { styled } from 'styled-components';
import Icon from '@components/ui/stuff/Icon.tsx';
import Badge from '@components/ui/stuff/Badge.tsx';
import { JSX } from 'react';

const Container = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   width: 100%;
`;

const LeftCol = styled.div`
   display: flex;
   flex-direction: column;
   gap: 15px;

   .top-bar {
      display: flex;
      align-items: center;
      gap: 8px;

      span {
         font-weight: 500;
         color: var(--color-black-500);
         font-size: var(--font-size-body-sm);
      }
   }

   .content {
      span {
         font-weight: bold;
         font-size: var(--font-size-heading-2);
      }
   }
`;

const RightCol = styled.div``;

export default function PortfolioVolume24HCrypto(): JSX.Element {
   return (
      <Container>
         <LeftCol>
            <div className={'top-bar'}>
               <Icon iconSrc={'portfolio-volume.svg'} width={'20px'} />
               <span>VOLUME (24H)</span>
            </div>

            <div className={'content'}>
               <span>$7,472</span>
            </div>
         </LeftCol>

         <RightCol>
            <Badge borderRadius={'full'} type={'success'} outline>
               <Icon iconSrc={'arrow-up.svg'} width={'12px'} />
               1.37%
            </Badge>
         </RightCol>
      </Container>
   );
}
