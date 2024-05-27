import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
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

import {getAssetHistory} from "@services/api/assets.api.ts";

import Select from '@components/ui/Select.tsx'
import Button from "@components/ui/Button.tsx";

import {SelectMenuItem} from '@ts/type/Select.type.ts'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const defaultCurrencyList: SelectMenuItem[] = [
    {
        name: 'btc',
        default: true,
        icon_src: 'crypto/btc.svg'
    },
    {
        name: 'eth',
        default: false,
        icon_src: 'crypto/eth.svg'
    },
    {
        name: 'bnb',
        default: false,
        icon_src: 'crypto/bnb.svg'
    },
    {
        name: 'cake',
        default: false,
        icon_src: 'crypto/cake.svg'
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
`

const ContentWrapper = styled.div`

`

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
    const [currencyList, setCurrencyList]: [SelectMenuItem[], Dispatch<SetStateAction<SelectMenuItem[]>>] = useState<SelectMenuItem[]>(defaultCurrencyList)
    const [selectedCurrency, setSelectedCurrency] = useState<string>('bitcoin')

    const {data: currencyPriceHistoryData, error, refetch, isLoading}: {
        data: object[] | any,
        error: any,
        refetch: any,
        isLoading: any
    } = useQuery({
        queryKey: ['currency-price'],
        queryFn: () => getAssetHistory(selectedCurrency, 'd1', 10),
        staleTime: 10000,
    })

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
        refetch()
    }, [selectedCurrency]);

    useEffect(function updateLabelsAndDatasets() {
        console.log(currencyPriceHistoryData?.data)

        if (currencyPriceHistoryData?.data) {
            setDatasets(() => {
                return currencyPriceHistoryData?.data.map((priceHistory: CryptoHistoryRecord) => priceHistory.priceUsd)
            })

            setLabels((prevLabels) => {
                if (!currencyPriceHistoryData?.data) return prevLabels

                return currencyPriceHistoryData?.data.map((priceHistory: CryptoHistoryRecord) => {
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
                <Select $menu_items={currencyList}
                        $has_icon
                        $new_value_setter={(newValue: string) => setSelectedCurrency(newValue)}
                />
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