import { JSX, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { styled } from 'styled-components';
import { Line } from 'react-chartjs-2';
import {
   CategoryScale,
   Chart as ChartJS,
   ChartData,
   ChartOptions,
   Legend,
   LinearScale,
   LineElement,
   PointElement,
   Title,
   Tooltip,
} from 'chart.js';

import Select from '@components/ui/stuff/Select.tsx';
import Button from '@components/ui/stuff/Button.tsx';

import { SelectMenuItem } from '@typings/components/Select.type.ts';
import useGetAssetHistory from '@queries/assets/useGetAssetHistory.query.ts';
import { AssetHistoryInterval, AssetName } from '@typings/Assets.api.type.ts';

ChartJS.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend,
);

const currencyList: SelectMenuItem[] = [
   {
      name: 'btc',
      value: 'bitcoin',
      default: true,
      iconSrc: 'crypto/btc.svg',
   },
   {
      name: 'eth',
      value: 'ethereum',
      default: false,
      iconSrc: 'crypto/eth.svg',
   },
   {
      name: 'bnb',
      value: 'binance-coin',
      default: false,
      iconSrc: 'crypto/bnb.svg',
   },
   {
      name: 'xrp',
      value: 'xrp',
      default: false,
      iconSrc: 'crypto/xrp.svg',
   },
   {
      name: 'sol',
      value: 'solana',
      default: false,
      iconSrc: 'crypto/sol.svg',
   },
   {
      name: 'dogecoin',
      value: 'dogecoin',
      default: false,
      iconSrc: 'crypto/doge.svg',
   },
];
const chartIntervals: SelectMenuItem[] = [
   {
      name: '1 Min',
      value: 'm1',
      iconSrc: '',
      default: false,
   },
   {
      name: '5 Min',
      value: 'm5',
      iconSrc: '',
      default: false,
   },
   {
      name: '15 Min',
      value: 'm15',
      iconSrc: '',
      default: false,
   },
   {
      name: '30 Min',
      value: 'm30',
      iconSrc: '',
      default: false,
   },
   {
      name: '1 Hour',
      value: 'h1',
      iconSrc: '',
      default: false,
   },
   {
      name: '2 Hour',
      value: 'h2',
      iconSrc: '',
      default: false,
   },
   {
      name: '6 Hour',
      value: 'h6',
      iconSrc: '',
      default: false,
   },
   {
      name: '12 Hour',
      value: 'h12',
      iconSrc: '',
      default: false,
   },
   {
      name: '1 Day',
      value: 'd1',
      iconSrc: '',
      default: true,
   },
];

const CurrencyPriceContainer = styled.div`
   display: grid;
`;

const Header = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   margin-bottom: 15px;

   span {
      font-weight: bold;
      font-size: var(--font-size-body-lg);
   }

   div.options {
      display: flex;
      align-items: center;
      gap: 10px;
   }
`;

const ContentWrapper = styled.div``;

const Content = styled.div`
   display: flex;
   flex-direction: column;
   gap: 10px;
   max-width: 99.99%;
   transition: max-width 0s ease-in-out;

   span {
      font-size: var(--font-size-body-sm);
   }
`;

const RequestError = styled.div`
   width: 100%;
   height: 100px;

   display: flex;
   align-items: center;
   flex-direction: column;
   padding: 50px 0;

   span {
      margin-bottom: 20px;
   }
`;

type Labels = string[];

type CryptoHistoryRecord = {
   date: string;
   priceUsd: string;
   time: number;
};

export default function CurrencyPrice(): JSX.Element {
   const [labels, setLabels] = useState<Labels | null>(null);
   const [datasets, setDatasets] = useState<number[] | null>(null);
   const [selectedCurrency, setSelectedCurrency] = useState<string>('bitcoin');

   const [selectedChartInterval, setSelectedChartInterval] =
      useState<AssetHistoryInterval>(() => {
         return chartIntervals.filter(
            (interval: SelectMenuItem) => interval.default,
         )[0].value as AssetHistoryInterval;
      });

   const { currencyPriceHistoryData, error, refetch, isLoading } =
      useGetAssetHistory(selectedCurrency as AssetName, selectedChartInterval);

   const options: ChartOptions<'line'> = {
      animation: false,
      plugins: {
         tooltip: {
            enabled: true,
         },
         legend: {
            position: 'bottom',
         },
      },
      responsive: true,
   };

   const fake_data: ChartData<'line'> = {
      labels: labels || [],
      datasets: [
         {
            label: 'Price of ' + selectedCurrency.toUpperCase(),
            data: datasets || [],
            borderColor: 'gray',
         },
      ],
   };

   const reloadChartHandler = (): void => {
      refetch();
   };

   useEffect(
      function onSelectedCurrencyUpdate(): void {
         reloadChartHandler();
      },
      [selectedCurrency, selectedChartInterval],
   );

   useEffect(
      function updateLabelsAndDatasets(): void {
         if (currencyPriceHistoryData) {
            setDatasets(() => {
               return currencyPriceHistoryData.map(
                  (priceHistory: CryptoHistoryRecord) => priceHistory.priceUsd,
               );
            });

            setLabels((prevLabels: Labels | null): string[] | null => {
               if (!currencyPriceHistoryData) return prevLabels;

               return currencyPriceHistoryData.map(
                  (priceHistory: CryptoHistoryRecord) => {
                     return priceHistory.date.split('T')[0];
                  },
               );
            });
         }
      },
      [currencyPriceHistoryData],
   );

   return (
      <CurrencyPriceContainer>
         <Header>
            <span>Currency Price</span>
            <div className={'options'}>
               <Select
                  $menuItems={currencyList}
                  $hasIcon
                  $newValueSetter={(newState: string) =>
                     setSelectedCurrency(newState)
                  }
               />
               <Select
                  $menuItems={chartIntervals}
                  $newValueSetter={(newState: AssetHistoryInterval) =>
                     setSelectedChartInterval(newState)
                  }
               />
            </div>
         </Header>

         {isLoading ? (
            <Skeleton width={'100%'} height={'400px'} borderRadius={'20px'} />
         ) : (
            <ContentWrapper>
               {error && (
                  <RequestError>
                     <span>Failed to load chart data, Please reload chart</span>
                     <Button
                        icon={'chart-white.svg'}
                        onClickHandler={reloadChartHandler}
                     >
                        Reload Chart
                     </Button>
                  </RequestError>
               )}

               {!error && (
                  <Content>
                     <span>Chart reloads every 10s!</span>
                     <Line
                        className={'asset-price'}
                        data={fake_data}
                        options={options}
                     />
                  </Content>
               )}
            </ContentWrapper>
         )}
      </CurrencyPriceContainer>
   );
}
