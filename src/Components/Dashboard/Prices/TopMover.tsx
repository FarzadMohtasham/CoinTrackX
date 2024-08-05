import { JSX } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import Skeleton from 'react-loading-skeleton';

import Icon from '@components/ui/stuff/Icon.tsx';

import { amountToBeFixed } from '@utils/helpers.ts';

import { TopMoverProps } from '@typings/components/TopMover.type.ts';

const TopMoverContainer = styled.div`
   width: 100%;
   height: 80px;
`;

const TopMoverWrapper = styled.div`
   border: 2px solid var(--color-black-50);
   border-radius: 8px;
   padding: 16px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   height: 100%;
`;

const TopMoverLeftCol = styled.div`
   display: flex;
   align-items: center;
   gap: 12px;

   .coin-icon-wrapper {
   }

   .coin-info-wrapper {
      display: flex;
      flex-direction: column;

      .coin-id {
         font-size: var(--font-size-body-sm);
         font-weight: 500;
      }

      .coin-symbol {
         font-size: var(--font-size-body-xsm);
         color: var(--color-black-300);
         font-weight: 500;
      }
   }
`;

const TopMoverRightCol = styled.div`
   display: flex;
   flex-direction: column;
   align-items: flex-end;
   gap: 5px;

   .coin-price {
      font-size: var(--font-size-body-sm);
      font-weight: 500;
   }

   .coin-price-24h-change {
      font-size: var(--font-size-body-xsm);
      color: var(--color-black-400);
      font-weight: 400;
   }
`;

export default function TopMover(props: TopMoverProps): JSX.Element {
   const {
      coinId = 'undefined',
      coinSymbol = 'undefined',
      price = 'undefined',
      changePercent24Hr = 'undefined',
      isLoading = false,
   }: TopMoverProps = props;

   const calc24HChangeAmount = (): string => {
      const priceToCalc: number = Number(Number(price).toFixed(3));
      const changePercent24HrToCalc: number = Number(
         Number(changePercent24Hr).toFixed(2),
      );

      const calcResult: number = (priceToCalc / 100) * changePercent24HrToCalc;

      return amountToBeFixed(calcResult);
   };

   return (
      <TopMoverContainer>
         {isLoading ? (
            <Skeleton height={'100%'} width={'100%'} borderRadius={'8px'} />
         ) : (
            <Link to={`/dashboard/prices/${coinId}`}>
               <TopMoverWrapper>
                  <TopMoverLeftCol>
                     <div className={'coin-icon-wrapper'}>
                        <Icon
                           iconSrc={`crypto/${coinSymbol.toLowerCase()}.svg`}
                           width={'40px'}
                        />
                     </div>

                     <div className={'coin-info-wrapper'}>
                        <span className={'coin-id'}>{coinId}</span>
                        <span className={'coin-symbol'}>{coinSymbol}</span>
                     </div>
                  </TopMoverLeftCol>

                  <TopMoverRightCol>
                     <span className={'coin-price'}>{price}$</span>

                     <span className={'coin-price-24h-change'}>
                        {changePercent24Hr}%({calc24HChangeAmount()}$)
                     </span>
                  </TopMoverRightCol>
               </TopMoverWrapper>
            </Link>
         )}
      </TopMoverContainer>
   );
}
