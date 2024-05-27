import {useQuery} from "@tanstack/react-query";
import {styled} from 'styled-components'
import {Line} from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend, ChartData, ChartOptions
} from 'chart.js'

import {getAssetHistory} from "@services/api/assets.api.ts";

import Select from '@components/ui/Select.tsx'

import {SelectMenuItem} from '@ts/type/Select.type.ts'
import Button from "@components/ui/Button.tsx";
import Skeleton from "react-loading-skeleton";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const CurrencyList: SelectMenuItem[] = [
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

export default function CurrencyPrice() {
    const {data, error, refetch, isLoading} = useQuery({
        queryKey: ['currency-price'],
        queryFn: () => getAssetHistory('bitcoin'),
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
        labels: ['fuck-me1', 'fuck-me2', 'fuck-me3', 'fuck-me4', 'fuck-me5', 'fuck-me6'],
        datasets: [
            {
                label: 'Price',
                data: [100, 200, 300, 400, 500, 600],
                borderColor: 'red'
            }
        ]
    }

    const reloadChartHandler = async () => await refetch()

    return (
        <CurrencyPriceContainer>
            <Header>
                <span>
                    Currency Price
                </span>
                <Select $menu_items={CurrencyList} $has_icon/>
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