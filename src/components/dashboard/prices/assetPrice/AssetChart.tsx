import {AssetHistoryInterval, AssetName} from "@typings/type/Assets.api.type.ts";
import useGetAssetHistory from "@query/assets/useGetAssetHistory.query.ts";
import {useEffect, useState} from "react";
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
    Tooltip
} from 'chart.js'
import {SelectMenuItem} from "@typings/type/Select.type.ts";
import {Line} from "react-chartjs-2";
import Skeleton from "react-loading-skeleton";
import Select from "@components/ui/stuff/Select.tsx";
import {styled} from "styled-components";

type AssetChartProps = {
    assetName: AssetName;
}

type CryptoHistoryRecord = {
    date: string;
    priceUsd: string;
    time: number;
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

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
]

const AssetChartContainer = styled.div`
    .heading-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 3rem;

        .title {
            font-size: var(--font-size-body-lg);
            font-weight: 500;
            text-transform: capitalize;
        }
    }
`

export default function AssetChart(props: AssetChartProps) {
    const [labels, setLabels] = useState<string[] | null>([]);
    const [datasets, setDatasets] = useState<number[]>([]);
    const [chartInterval, setChartInterval] = useState<AssetHistoryInterval>('d1')

    const {
        currencyPriceHistoryData,
        error,
        refetch,
        isLoading,
    } = useGetAssetHistory(props.assetName, chartInterval)

    useEffect(function updateLabelsAndDatasets(): void {
        if (currencyPriceHistoryData) {
            setDatasets(() => {
                return currencyPriceHistoryData.map((priceHistory: CryptoHistoryRecord) => priceHistory.priceUsd)
            })

            setLabels((prevLabels: string[] | null): string[] | null => {
                if (!currencyPriceHistoryData) return prevLabels

                return currencyPriceHistoryData.map((priceHistory: CryptoHistoryRecord) => {
                    return priceHistory.date.split('T')[0]
                })
            })
        }
    }, [currencyPriceHistoryData]);

    useEffect(() => {
        refetch()
    }, [chartInterval]);

    useEffect(() => {
        const interval = setInterval(() => {
            refetch()
        }, 1000 * 60)

        return () => clearInterval(interval)
    }, []);

    const chartOptions: ChartOptions = {
        animation: false,
        plugins: {
            tooltip: {
                enabled: true
            },
            legend: {
                position: "bottom"
            },
        },
        responsive: true,
    }

    const chartData: ChartData<'line'> = {
        labels: labels || [],
        datasets: [
            {
                label: 'Price of ' + props.assetName.toUpperCase(),
                data: datasets || [],
                borderColor: 'gray'
            }
        ]
    }

    return (
        <>
            {
                isLoading ?
                    <Skeleton height={'30rem'} count={1}/>
                    :
                    <AssetChartContainer>
                        <div className={'heading-content'}>
                            <span className={'title'}>{props.assetName} chart</span>
                            <Select $menuItems={chartIntervalsList}
                                    $newValueSetter={setChartInterval}
                            />
                        </div>
                        <Line
                            className={'asset-price'}
                            data={chartData}
                            options={chartOptions}
                        />
                    </AssetChartContainer>
            }
        </>
    )
}