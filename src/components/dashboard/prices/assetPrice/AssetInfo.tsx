import { styled } from 'styled-components';
import { AssetName } from '@typings/Assets.api.type.ts';
import Icon from '@components/ui/stuff/Icon.tsx';
import Skeleton from 'react-loading-skeleton';
import { amountToBeFixed } from '@utils/helpers.ts';
import Badge from '@components/ui/stuff/Badge.tsx';
import useGetAssetQuery from '@query/assets/useGetAsset.query.ts';
import { useEffect } from 'react';

type AssetInfoProps = {
  assetName: AssetName;
  hasErrorHandler: () => void;
  hasNoErrorHandler: () => void;
  refetchListener: number;
};

const AssetInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AssetInfoLeftCol = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  div.asset-details-wrapper {
    div.details {
      display: flex;
      align-items: center;
      gap: 10px;

      span.asset-name {
        font-weight: 500;
        font-size: var(--font-size-heading-3);
      }

      span.asset-symbol {
        font-size: var(--font-size-body-sm);
        color: var(--color-black-300);
        font-weight: 500;
      }
    }

    span.asset-desc {
      font-size: var(--font-size-body-xsm);
      color: var(--color-black-700);
    }
  }
`;

const AssetInfoRightCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  div.asset-price-details {
    display: flex;
    align-items: center;
    gap: 10px;

    span.asset-price {
      font-size: var(--font-size-heading-4);
      font-weight: 500;
    }
  }

  div.asset-price-sub-details {
    text-align: right;

    span.asset-24h-change-amount {
      font-size: var(--font-size-body-sm);
    }
  }
`;

export default function AssetInfo(props: AssetInfoProps) {
  const { assetName, hasErrorHandler, hasNoErrorHandler, refetchListener } =
    props;

  const {
    data: assetData,
    error: assetError,
    refetch: assetRefresh,
    isLoading: assetDataIsLoading,
  } = useGetAssetQuery(assetName as AssetName, {
    gcTime: 0,
  });

  useEffect(() => {
    if (assetError) hasErrorHandler();
    else hasNoErrorHandler();
  }, [assetError]);

  useEffect(() => {
    assetRefresh();
  }, [refetchListener]);

  return (
    <>
      {assetDataIsLoading ? (
        <Skeleton height={'100px'} />
      ) : (
        <AssetInfoContainer>
          <AssetInfoLeftCol>
            <div className={'asset-image-wrapper'}>
              <Icon
                iconSrc={`crypto/${assetData?.symbol.toLowerCase()}.svg`}
                width={'60px'}
              />
            </div>
            <div className={'asset-details-wrapper'}>
              <div className="details">
                <span className={'asset-name'}>{assetData?.name}</span>
                <span className={'asset-symbol'}>{assetData?.symbol}</span>
              </div>
              <span className={'asset-desc'}>Currency in USD. Market Open</span>
            </div>
          </AssetInfoLeftCol>

          <AssetInfoRightCol>
            <div className={'asset-price-details'}>
              <span className="asset-price">
                ${amountToBeFixed(Number(assetData?.priceUsd))}
              </span>
              <Badge type={'success'} borderRadius={'full'} outline>
                <Icon iconSrc={'arrow-up.svg'} width={'6px'} />
                {amountToBeFixed(Number(assetData?.changePercent24Hr))} %
              </Badge>
            </div>
            <div className="asset-price-sub-details">
              <span className={'asset-24h-change-amount'}>
                {Number(assetData?.changePercent24Hr) >= 0 && '+'}
                {amountToBeFixed(
                  (Number(assetData?.priceUsd) / 100) *
                    Number(assetData?.changePercent24Hr),
                )}
                $
              </span>
            </div>
          </AssetInfoRightCol>
        </AssetInfoContainer>
      )}
    </>
  );
}
