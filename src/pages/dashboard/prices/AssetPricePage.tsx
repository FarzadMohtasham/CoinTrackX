import { JSX, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import AssetInfo from '@components/dashboard/prices/assetPrice/AssetInfo.tsx';
import AssetSummary from '@components/dashboard/prices/assetPrice/AssetSummary.tsx';
import GoBack from '@components/ui/stuff/GoBack.tsx';

import { AssetName } from '@typings/Assets.api.type.ts';

import AssetChart from '@components/dashboard/prices/assetPrice/AssetChart.tsx';
import AssetMarkets from '@components/dashboard/prices/assetPrice/AssetMarkets.tsx';
import Heading from '@components/ui/stuff/Heading.tsx';
import Button from '@components/ui/stuff/Button.tsx';

type ErrorStatesProps = {
   assetInfoHasError: boolean;
   assetSummaryHasError: boolean;
   assetChartHasError: boolean;
   assetMarketsHasError: boolean;
};

type DispatchProps = {
   type:
      | 'assetInfoHasError'
      | 'assetSummaryHasError'
      | 'assetChartHasError'
      | 'assetMarketsHasError'
      | 'assetInfoHasNoError'
      | 'assetSummaryHasNoError'
      | 'assetChartHasNoError'
      | 'assetMarketsHasNoError';
};

const AssetPriceContainer = styled.div.attrs<{ $hasError: boolean }>(
   ({ $hasError }) => ({
      style: { display: $hasError ? 'none' : 'grid' },
   }),
)`
   grid-template-columns: repeat(9, 1fr);
   padding: 32px 20px;

   .asset-price-wrapper {
      margin-bottom: 24px;
   }
`;

const AssetPriceWrapper = styled.div.attrs({
   className: 'asset-price-wrapper',
})`
   display: flex;
   flex-direction: column;
   gap: 40px;

   @media screen and (max-width: ${(props: any) =>
         props.theme.breakpoints.sm}) {
      grid-column: 1 / 10;
   }

   @media screen and (min-width: ${(props: any) =>
         props.theme.breakpoints.sm}) {
      grid-column: 2 / 9;
   }

   @media screen and (min-width: ${(props: any) =>
         props.theme.breakpoints.lg}) {
      grid-column: 3 / 8;
   }
`;

const ErrorContainer = styled.div.attrs<{ $hasError: boolean }>(
   ({ $hasError }) => ({
      style: { display: $hasError ? 'block' : 'none' },
   }),
)`
   display: grid;
   place-content: center;
   height: 100%;
`;

const ErrorWrapper = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 5px;

   span.error-message {
      margin-bottom: 10px;
      text-align: center;
   }
`;

const reducer = (state: ErrorStatesProps, dispatch: DispatchProps) => {
   switch (dispatch.type) {
      case 'assetInfoHasError':
         return { ...state, assetInfoHasError: true };
      case 'assetSummaryHasError':
         return { ...state, assetSummaryHasError: true };
      case 'assetChartHasError':
         return { ...state, assetChartHasError: true };
      case 'assetMarketsHasError':
         return { ...state, assetMarketsHasError: true };

      case 'assetInfoHasNoError':
         return { ...state, assetInfoHasError: false };
      case 'assetSummaryHasNoError':
         return { ...state, assetSummaryHasError: false };
      case 'assetChartHasNoError':
         return { ...state, assetChartHasError: false };
      case 'assetMarketsHasNoError':
         return { ...state, assetMarketsHasError: false };
   }
};

export default function AssetPricePage(): JSX.Element {
   const [errorStates, dispatchError] = useReducer(reducer, {
      assetInfoHasError: false,
      assetSummaryHasError: false,
      assetChartHasError: false,
      assetMarketsHasError: false,
   } as ErrorStatesProps);
   const [refetchListener, setRefetchListener] = useState<number>(0);
   const { assetName } = useParams<Readonly<string>>();

   const {
      assetInfoHasError,
      assetSummaryHasError,
      assetChartHasError,
      assetMarketsHasError,
   }: ErrorStatesProps = errorStates;

   const hasError =
      assetInfoHasError ??
      assetSummaryHasError ??
      assetChartHasError ??
      assetMarketsHasError;

   return (
      <>
         {hasError && (
            <ErrorContainer $hasError={hasError}>
               <ErrorWrapper>
                  <Heading headingType={'h3'}>
                     Sorry, There is an error!
                  </Heading>
                  <span className={'error-message'}>
                     There was an error while fetching asset data from the
                     server, Please refetch or contact with the admin.
                  </span>
                  <Button
                     onClickHandler={() =>
                        setRefetchListener(refetchListener + 1)
                     }
                  >
                     Try again
                  </Button>
               </ErrorWrapper>
            </ErrorContainer>
         )}

         <AssetPriceContainer $hasError={hasError}>
            <AssetPriceWrapper>
               <GoBack link={'/dashboard/prices'}>Go Back</GoBack>
               <AssetInfo
                  assetName={assetName as AssetName}
                  refetchListener={refetchListener}
                  hasErrorHandler={() =>
                     dispatchError({ type: 'assetInfoHasError' })
                  }
                  hasNoErrorHandler={() =>
                     dispatchError({ type: 'assetInfoHasNoError' })
                  }
               />
               <AssetSummary
                  assetName={assetName as AssetName}
                  refetchListener={refetchListener}
                  hasErrorHandler={() =>
                     dispatchError({ type: 'assetSummaryHasError' })
                  }
                  hasNoErrorHandler={() =>
                     dispatchError({ type: 'assetSummaryHasNoError' })
                  }
               />
               <AssetChart
                  assetName={assetName as AssetName}
                  refetchListener={refetchListener}
                  hasErrorHandler={() =>
                     dispatchError({ type: 'assetChartHasError' })
                  }
                  hasNoErrorHandler={() =>
                     dispatchError({ type: 'assetChartHasNoError' })
                  }
               />
               <AssetMarkets
                  assetName={assetName as AssetName}
                  refetchListener={refetchListener}
                  hasErrorHandler={() =>
                     dispatchError({ type: 'assetMarketsHasError' })
                  }
                  hasNoErrorHandler={() =>
                     dispatchError({ type: 'assetMarketsHasNoError' })
                  }
               />
            </AssetPriceWrapper>
         </AssetPriceContainer>
      </>
   );
}
