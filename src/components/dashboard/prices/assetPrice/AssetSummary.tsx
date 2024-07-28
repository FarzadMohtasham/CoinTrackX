import { JSX, useEffect } from 'react';
import { styled } from 'styled-components';
import Skeleton from 'react-loading-skeleton';

import useGetAssetSummaryQuery from '@/Queries/AssetSummary/useGetAssetSummary.query';

import { AssetName } from '@/Libs/Typings/Assets.api.type';

type AssetSummaryProps = {
   assetName: AssetName;
   hasErrorHandler: () => void;
   hasNoErrorHandler: () => void;
   refetchListener: number;
};

const AssetSummaryContainer = styled.div`
   display: flex;
   flex-direction: column;
   gap: 16px;

   .summary-title {
      font-size: var(--font-size-body-lg);
      font-weight: 500;
      display: block;
   }

   .summary-info {
      display: block;
      font-size: var(--font-size-body-sm);
      color: var(--color-black-600);
      font-weight: 400;
      text-align: justify;
   }
`;

export default function AssetSummary(props: AssetSummaryProps): JSX.Element {
   const { assetName, hasErrorHandler, hasNoErrorHandler, refetchListener } =
      props;

   const {
      data: assetSummaryData,
      error: assetSummaryError,
      isLoading: assetSummaryIsLoading,
      refetch: assetSummaryRefresh,
   } = useGetAssetSummaryQuery(assetName);

   useEffect((): void => {
      if (assetSummaryError) hasErrorHandler();
      else hasNoErrorHandler();
   }, [assetSummaryError]);

   useEffect((): void => {
      assetSummaryRefresh().then();
   }, [refetchListener]);

   return (
      <>
         {assetSummaryIsLoading ? (
            <Skeleton height={'30px'} count={5} />
         ) : (
            <AssetSummaryContainer>
               <span className={'summary-title'}>About</span>
               <span className={'summary-info'}>
                  {assetSummaryData?.asset_summary}
               </span>
            </AssetSummaryContainer>
         )}
      </>
   );
}
