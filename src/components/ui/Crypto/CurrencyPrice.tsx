import {Dispatch, SetStateAction, useEffect, useState} from 'react'
import Skeleton from 'react-loading-skeleton'
import {styled} from 'styled-components'
import {Line} from 'react-chartjs-2'
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

import Select from '@components/ui/Select.tsx'
import Button from '@components/ui/Button.tsx'

import {SelectMenuItem} from '@ts/type/Select.type.ts'
import useGetAssetHistory from '@query/assets/useGetAssetHistory.query.ts'
import {AssetHistoryInterval} from '@ts/type/Assets.api.type.ts'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const currencyList: SelectMenuItem[] = [
    {
        name: 'btc',
        value: 'bitcoin',
        default: true,
        icon_src: 'crypto/btc.svg',
    },
    {
        name: 'eth',
        value: 'ethereum',
        default: false,
        icon_src: 'crypto/eth.svg'
    },
    {
        name: 'bnb',
        value: 'binance-coin',
        default: false,
        icon_src: 'crypto/bnb.svg'
    },
    {
        name: 'xrp',
        value: 'xrp',
        default: false,
        icon_src: 'crypto/xrp.svg'
    },
    {
        name: 'sol',
        value: 'solana',
        default: false,
        icon_src: 'crypto/sol.svg'
    },
    {
        name: 'dogecoin',
        value: 'dogecoin',
        default: false,
        icon_src: 'crypto/doge.svg'
    },
]
const chartIntervals: SelectMenuItem[] = [
    {
        name: '1 Min',
        value: 'm1',
        icon_src: '',
        default: false,
    },
    {
        name: '5 Min',
        value: 'm5',
        icon_src: '',
        default: false,
    },
    {
        name: '15 Min',
        value: 'm15',
        icon_src: '',
        default: false,
    },
    {
        name: '30 Min',
        value: 'm30',
        icon_src: '',
        default: false,
    },
    {
        name: '1 Hour',
        value: 'h1',
        icon_src: '',
        default: false,
    },
    {
        name: '2 Hour',
        value: 'h2',
        icon_src: '',
        default: false,
    },
    {
        name: '6 Hour',
        value: 'h6',
        icon_src: '',
        default: false,
    },
    {
        name: '12 Hour',
        value: 'h12',
        icon_src: '',
        default: false,
    },
    {
        name: '1 Day',
        value: 'd1',
        icon_src: '',
        default: true,
    },
]

const CurrencyPriceContainer = styled.div`
  display: grid;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  span {
    font-weight: bold;
    font-size: var(--font-size-body-lg);
  }

  div.options {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`

const ContentWrapper = styled.div``

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 99.99%;
  transition: max-width 0s ease-in-out;

  span {
    font-size: var(--font-size-body-sm);
  }
`

const RequestError = styled.div`
  width: 100%;
  height: 10rem;

  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 5rem 0;

  span {
    margin-bottom: 2rem;
  }
`

type Labels = string[];

type CryptoHistoryRecord = {
    date: string;
    priceUsd: string;
    time: number;
}

export default function CurrencyPrice() {
    const [labels, setLabels]: [Labels | null, Dispatch<SetStateAction<Labels | null>>] = useState<Labels | null>(null)
    const [datasets, setDatasets]: [number[] | null, Dispatch<SetStateAction<number[] | null>>] = useState<number[] | null>(null)
    const [selectedCurrency, setSelectedCurrency] = useState<string>('bitcoin')
    const [selectedChartInterval, setSelectedChartInterval] = useState<AssetHistoryInterval>(() => {
        return chartIntervals.filter(interval => interval.default)[0].value as AssetHistoryInterval
    })

    const {
        currencyPriceHistoryData,
        error,
        refetch,
        isLoading
    } = useGetAssetHistory(selectedCurrency, selectedChartInterval)

    const options: ChartOptions<'line'> = {
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

    const fake_data: ChartData<'line'> = {
        labels: labels || [],
        datasets: [
            {
                label: 'Price of ' + selectedCurrency.toUpperCase(),
                data: datasets || [],
                borderColor: 'gray'
            }
        ]
    }

    const reloadChartHandler = () => {
        refetch()
    }

    useEffect(function onSelectedCurrencyUpdate() {
        reloadChartHandler()
    }, [selectedCurrency, selectedChartInterval]);

    useEffect(function updateLabelsAndDatasets() {
        if (currencyPriceHistoryData) {
            setDatasets(() => {
                return currencyPriceHistoryData.map((priceHistory: CryptoHistoryRecord) => priceHistory.priceUsd)
            })

            setLabels((prevLabels) => {
                if (!currencyPriceHistoryData) return prevLabels

                return currencyPriceHistoryData.map((priceHistory: CryptoHistoryRecord) => {
                    return priceHistory.date.split('T')[0]
                })
            })
        }
    }, [currencyPriceHistoryData]);

    return (
        <CurrencyPriceContainer>
            <Header>
                <span>
                    Currency Price
                </span>
                <div className={'options'}>
                    <Select $menu_items={currencyList}
                            $has_icon
                            $new_value_setter={(newState: string) => setSelectedCurrency(newState)}
                    />
                    <Select $menu_items={chartIntervals}
                            $new_value_setter={(newState: AssetHistoryInterval) => setSelectedChartInterval(newState)}
                    />
                </div>
            </Header>

            {
                isLoading ? <Skeleton width={'100%'}
                                      height={'40rem'}
                                      borderRadius={'2rem'}
                    />
                    :
                    <ContentWrapper>
                        {
                            error &&
                            <RequestError>
                                <span>
                                    Failed to load chart data, Please reload chart
                                </span>
                                <Button icon={'chart-white.svg'}
                                        on_click_handler={reloadChartHandler}>
                                    Reload Chart
                                </Button>
                            </RequestError>
                        }

                        {
                            !error &&
                            <Content>
                                <span>
                                    Chart reloads every 10s!
                                </span>
                                <Line
                                    className={'asset-price'}
                                    data={fake_data}
                                    options={options}
                                />
                            </Content>
                        }
                    </ContentWrapper>
            }
        </CurrencyPriceContainer>
    )
}