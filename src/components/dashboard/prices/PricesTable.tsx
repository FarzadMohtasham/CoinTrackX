import {JSX, useEffect, useMemo, useState} from 'react'
import {
    Cell,
    CellContext,
    ColumnDef,
    flexRender,
    getCoreRowModel, getFilteredRowModel, getPaginationRowModel,
    Header,
    HeaderGroup, PaginationState,
    Row,
    useReactTable,
} from '@tanstack/react-table'
import Skeleton from 'react-loading-skeleton'
import {styled} from 'styled-components'
import {v4 as uuidv4} from 'uuid'
import {NavigateFunction, useNavigate} from "react-router-dom";

import {Table, TableCaption, TableContainer, Tbody, Td, Thead, Tr,} from '@chakra-ui/react'
import useGetAssetsQuery from '@query/assets/useGetAssets.query.ts'

import Icon from '@components/ui/Icon.tsx'
import Badge from '@components/ui/Badge.tsx'
import PaginationRow from '@components/dashboard/prices/PaginationRow.tsx'

import {Asset} from '@ts/type/Assets.api.type.ts'
import {AssetPriceTable} from '@ts/type/Tables.type.ts'
import {PaginationRowProps} from '@ts/type/PricesPage.type.ts'

import Input from '@components/ui/Input-Fields/InputField.input.tsx'
import Button from '@components/ui/Button.tsx'

import {getTimeFormatted} from '@utils/helpers.ts'

const PricesTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & .table-head {
    background-color: var(--color-black-100);
  }
`

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;

  .left-col {
    flex-grow: 1;
  }

  .right-col {
    display: flex;
    gap: 1rem;
  }
`

const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ColumnName = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;

  .left-col {
  }

  .right-col {
    display: flex;
    flex-direction: column;
    gap: .8rem;

    .name {
      font-size: var(--font-size-body-sm);
      font-weight: 500;
    }

    .symbol {
      font-size: var(--font-size-body-xsm);
      font-weight: 400;
    }
  }
`

const ColumnHeaderSpan = styled.span`
  font-size: var(--font-size-body-xsm);
  color: var(--color-black-700);
  font-weight: 500;
`

const ColumnCellSpan = styled.span`
  font-size: var(--font-size-body-xsm);
  font-weight: 400;
`

export default function PricesTable(): JSX.Element {
    const [lastRefetchTime, setLastRefetchTime] = useState<string>(getTimeFormatted())
    const [pagination, setPagination]= useState<PaginationState>({pageIndex: 0, pageSize: 20})
    const [search, setSearch] = useState<string>('')
    const [showOnlyWatchlist, setShowOnlyWatchlist] = useState<boolean>(false)

    const {data, refetch: refetchTableData, isLoading} = useGetAssetsQuery()
    // const user = useUser()

    const navigate: NavigateFunction = useNavigate()

    const watchlistBtnHandler = (): void => {
        setShowOnlyWatchlist(!showOnlyWatchlist)
    }

    const portfolioBtnHandler = (): void => {
        navigate('/dashboard/assets-portfolio')
    }

    const tableColumns: ColumnDef<AssetPriceTable>[] = useMemo(() => [
        {
            accessorKey: 'name',
            header: 'Name',
            cell: (props: CellContext<any, any>) => {
                return (
                    <ColumnName>
                        <Icon icon_src={props.renderValue().logoSrc}
                              class_name={'left-col'}
                              width={'35rem'}
                        />
                        <div className={'right-col'}>
                            <span className={'name'}>{props.renderValue().name}</span>
                            <span className={'symbol'}>{props.renderValue().symbol}</span>
                        </div>
                    </ColumnName>
                )
            }
        },
        {
            accessorKey: 'price',
            header: 'Price',
            cell: (props: CellContext<any, any>) =>
                <ColumnCellSpan>${Number(props.renderValue()).toFixed(2)}</ColumnCellSpan>
        },
        {
            accessorKey: 'marketCap',
            header: 'Market Cap',
            cell: (props: CellContext<any, any>) =>
                <ColumnCellSpan>${Number(props.renderValue()).toFixed(2)}M</ColumnCellSpan>
        },
        {
            accessorKey: 'circulatingSupply',
            header: 'Circulating Supply',
            cell: (props: CellContext<any, any>) =>
                <ColumnCellSpan>{Number(props.renderValue()).toFixed(2)}M</ColumnCellSpan>
        },
        {
            accessorKey: 'changePercent',
            header: 'change %',
            cell: (props: CellContext<any, any>) => <ColumnCellSpan>
                <Badge type={Number(props.renderValue()) >= 0 ? 'success' : 'danger'}
                       outline
                       borderRadius={'full'}>
                    <Icon icon_src={Number(props.renderValue()) >= 0 ? 'arrow-up.svg' : 'arrow-down.svg'}
                          width={'8rem'}
                    />
                    %{Number(props.renderValue()).toFixed(2)}
                </Badge>
            </ColumnCellSpan>
        },
        {
            accessorKey: 'last24H',
            header: 'last (24H)',
            cell: (props: CellContext<any, any>) =>
                <ColumnCellSpan>{Number(props.renderValue()).toFixed(2)}</ColumnCellSpan>
        },
        {
            accessorKey: 'watchlist',
            header: '',
            cell: (props: CellContext<any, any>) => <ColumnCellSpan>
                <Icon width={'20rem'} icon_src={props.renderValue() ? 'star-filled.svg' : 'star-unfilled.svg'}/>
            </ColumnCellSpan>
        },
    ], []);

    const [tableData, setTableData] = useState<AssetPriceTable[]>([])

    const table = useReactTable({
        data: tableData,
        columns: tableColumns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            globalFilter: search,
            pagination: pagination,
        },
        onGlobalFilterChange: setSearch,
        onPaginationChange: setPagination,
        getRowId: () => uuidv4()
    })

    const PaginationRowComponentProps: PaginationRowProps = {
        nextPageHandler: table.nextPage,
        previousPageHandler: table.previousPage,
        getCanNextPage: table.getCanNextPage(),
        getCanPreviousPage: table.getCanPreviousPage(),
        totalPageCount: table.getPageCount(),
    }

    useEffect((): void => {
        if (!data) return

        const tabledData = data.map((assetData: Asset): AssetPriceTable => {
            return {
                name: {
                    name: assetData.name,
                    symbol: assetData.symbol,
                    logoSrc: `crypto/${assetData.symbol.toLowerCase()}.svg`,
                },
                price: assetData.priceUsd,
                changePercent: assetData.changePercent24Hr,
                circulatingSupply: assetData.supply,
                last24H: assetData.vwap24Hr,
                marketCap: assetData.marketCapUsd,
                watchList: false,
            } as AssetPriceTable
        })

        setTableData(tabledData)
    }, [data]);

    useEffect(() => {
        const tableRefetchInterval: NodeJS.Timeout = setInterval(() => {
            refetchTableData()
            setLastRefetchTime(getTimeFormatted())
        }, 1000 * 10)

        return () => {
            clearInterval(tableRefetchInterval)
        }
    }, []);

    return (
        <PricesTableContainer>
            {
                isLoading ?
                    <Skeleton height={'7rem'}/>
                    :
                    <SearchBar>
                        <div className={'left-col'}>
                            <Input place_holder={'Search crypto'}
                                   icon_src={'search-gray.svg'}
                                   focus_icon_src={'search-gray-active.svg'}
                                   on_change_handler={value => setSearch(value)}/>
                        </div>
                        <div className={'right-col'}>
                            {
                                showOnlyWatchlist ?
                                    <Button icon={'watchlist-purple.svg'}
                                            borderRadius={'md'}
                                            on_click_handler={watchlistBtnHandler}
                                            btnType={'primary'}
                                            outline>
                                        Watchlist
                                    </Button>
                                    :
                                    <Button icon={'watchlist-gray.svg'}
                                            borderRadius={'md'}
                                            on_click_handler={watchlistBtnHandler}
                                            btnType={'gray'}
                                            outline>
                                        Watchlist
                                    </Button>
                            }
                            <Button icon={'portfolio-purple.svg'}
                                    borderRadius={'md'}
                                    on_click_handler={portfolioBtnHandler}
                                    outline>
                                Portfolio
                            </Button>
                        </div>

                    </SearchBar>
            }
            {
                isLoading ?
                    <SkeletonContainer>
                        {
                            [...Array(10)].map((_, i: number) => {
                                return (
                                    <Skeleton key={'sk-' + i} height={'6rem'}/>
                                )
                            })
                        }
                    </SkeletonContainer>
                    :
                    <TableContainer>
                        <Table className={'table'}>
                            <TableCaption>Data will reload every 10s: last refetch: {lastRefetchTime}</TableCaption>
                            <Thead className={'table-head'}>
                                {
                                    table.getHeaderGroups().map((headerGroup: HeaderGroup<any>): JSX.Element => {
                                        return (
                                            <Tr className={'tr'} key={headerGroup.id}>
                                                {
                                                    headerGroup.headers.map((header: Header<any, any>): JSX.Element => {
                                                        return (
                                                            <Td className={'th'} key={header.id}>
                                                                <ColumnHeaderSpan>
                                                                    {String(header.column.columnDef.header)}
                                                                </ColumnHeaderSpan>
                                                            </Td>
                                                        )
                                                    })
                                                }
                                            </Tr>
                                        )
                                    })
                                }
                            </Thead>
                            <Tbody>
                                {
                                    table.getRowModel().rows.map((row: Row<any>) => {
                                        console.log(table.getRowModel())
                                        return (
                                            <Tr key={row.id}>
                                                {
                                                    row.getVisibleCells().map((cell: Cell<any, any>) => {
                                                        return (
                                                            <Td key={cell.id}>
                                                                {
                                                                    flexRender(cell.column.columnDef.cell, cell.getContext())
                                                                }
                                                            </Td>
                                                        )
                                                    })
                                                }
                                            </Tr>
                                        )
                                    })
                                }
                            </Tbody>
                        </Table>
                    </TableContainer>
            }

            {!isLoading && <PaginationRow {...PaginationRowComponentProps}/>}
        </PricesTableContainer>
    )
}
