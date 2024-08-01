import { styled } from 'styled-components';
import Icon from '@/Components/UI/Stuff/Icon';
import Badge from '@/Components/UI/Stuff/Badge';
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
            <Badge
               borderRadius={'full'}
               type={'success'}
               iconSrc={'arrow-up.svg'}
               iconSize={'12px'}
               outline
            >
               1.37%
            </Badge>
         </RightCol>
      </Container>
   );
}
