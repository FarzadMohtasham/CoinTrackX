import { Line } from 'react-chartjs-2';
import Skeleton from 'react-loading-skeleton';
import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
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

import { AssetHistoryInterval, AssetName } from '@typings/Assets.api.type.ts';

import { useInvalidateQuery } from '@hooks/useInvalidateQuery.ts';
import useGetAssetHistory from '@queries/assets/useGetAssetHistory.query.ts';

import Select from '@components/ui/stuff/Select.tsx';
import { SelectMenuItem } from '@typings/components/Select.type.ts';

type AssetChartProps = {
   assetName: AssetName;
   hasErrorHandler: () => void;
   hasNoErrorHandler: () => void;
};

type CryptoHistoryRecord = {
   date: string;
   priceUsd: string;
   time: number;
};

ChartJS.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend,
);

const chartIntervalsList: SelectMenuItem[] = [
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

const AssetChartContainer = styled.div`
   .heading-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;

      .title {
         font-size: var(--font-size-body-lg);
         font-weight: 500;
         text-transform: capitalize;
      }
   }
`;

export default function AssetChart(props: AssetChartProps) {
   const [labels, setLabels] = useState<string[] | null>([]);
   const [datasets, setDatasets] = useState<number[]>([]);
   const [chartInterval, setChartInterval] =
      useState<AssetHistoryInterval>('d1');

   const { assetName, hasErrorHandler, hasNoErrorHandler } = props;

   const {
      currencyPriceHistoryData,
      error: assetChartError,
      isLoading: assetChartLoading,
   } = useGetAssetHistory(assetName, chartInterval);

   const invalidateAssetQuery = useInvalidateQuery(['getAssetHistory']);

   useEffect(() => {
      if (assetChartError) hasErrorHandler();
      else hasNoErrorHandler();
   }, [assetChartError]);

   useEffect(
      function updateLabelsAndDatasets(): void {
         if (currencyPriceHistoryData) {
            setDatasets(() => {
               return currencyPriceHistoryData.map(
                  (priceHistory: CryptoHistoryRecord) => priceHistory.priceUsd,
               );
            });

            setLabels((prevLabels: string[] | null): string[] | null => {
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

   useEffect(() => {
      invalidateAssetQuery();
   }, [chartInterval]);

   useEffect(() => {
      const interval = setInterval(() => {
         invalidateAssetQuery();
      }, 1000 * 60);

      return () => clearInterval(interval);
   }, []);

   useEffect(() => {
      if (assetChartError) hasErrorHandler();
      else hasNoErrorHandler();
   }, [assetChartError]);

   const chartOptions: ChartOptions = {
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

   const chartData: ChartData<'line'> = {
      labels: labels || [],
      datasets: [
         {
            label: 'Price of ' + props.assetName.toUpperCase(),
            data: datasets || [],
            borderColor: 'gray',
         },
      ],
   };

   return (
      <>
         {assetChartLoading ? (
            <Skeleton height={'300px'} count={1} />
         ) : (
            <AssetChartContainer>
               <div className={'heading-content'}>
                  <span className={'title'}>{props.assetName} chart</span>
                  <Select
                     items={chartIntervalsList}
                     itemSelectSetter={setChartInterval}
                  />
               </div>
               <Line
                  className={'asset-price'}
                  data={chartData}
                  // Todo: Fix this later
                  // @ts-ignore
                  options={chartOptions}
               />
            </AssetChartContainer>
         )}
      </>
   );
}
