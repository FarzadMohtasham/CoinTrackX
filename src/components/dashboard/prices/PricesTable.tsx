import {JSX, useEffect, useMemo, useState} from 'react'
import {
    Cell,
    CellContext,
    ColumnDef,
    flexRender,
    getCoreRowModel, getFilteredRowModel, getPaginationRowModel,
    Header,
    HeaderGroup,
    Row,
    useReactTable,
} from '@tanstack/react-table'
import Skeleton from 'react-loading-skeleton'
import {styled} from 'styled-components'
import {v4 as uuidv4} from 'uuid'

import {Table, TableCaption, TableContainer, Tbody, Td, Thead, Tr,} from '@chakra-ui/react'
import useGetAssetsQuery from '@query/assets/useGetAssets.query.ts'
import useUser from '@hooks/useUser.ts'

import Icon from '@components/ui/Icon.tsx'
import Badge from '@components/ui/Badge.tsx'
import PaginationRow from '@components/dashboard/prices/PaginationRow.tsx'

import {Asset} from '@ts/type/Assets.api.type.ts'
import {AssetPriceTable} from '@ts/type/Tables.type.ts'
import {PaginationRowProps, PricesTableProps} from '@ts/type/PricesPage.type.ts'

import {getTimeFormatted} from '@utils/helpers.ts'

const PricesTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & .table-head {
    background-color: var(--color-black-100);
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

export default function PricesTable(props: PricesTableProps): JSX.Element {
    const {
        searchVal,
        setSearch,
        showOnlyWatchlist,
        watchlistFilterStatus,
    } = props

    const [lastRefetchTime, setLastRefetchTime] = useState<string>(getTimeFormatted())
    const [watchlistColumnFilterStatus, setWatchlistColumnFilterStatus] = useState<boolean>(false)

    const {data, error, refetch: refetchTableData, isLoading} = useGetAssetsQuery()
    const user = useUser()

    const tableColumns: ColumnDef<AssetPriceTable>[] = useMemo(() => [
        {
            accessorKey: 'name',
            header: 'Name',
            cell: (props: CellContext<any, any>) => {
                return (
                    <ColumnName>
                        <Icon icon_src={props.getValue().logoSrc}
                              class_name={'left-col'}
                              width={'35rem'}
                        />
                        <div className={'right-col'}>
                            <span className={'name'}>{props.getValue().name}</span>
                            <span className={'symbol'}>{props.getValue().symbol}</span>
                        </div>
                    </ColumnName>
                )
            }
        },
        {
            accessorKey: 'price',
            header: 'Price',
            cell: (props: CellContext<any, any>) =>
                <ColumnCellSpan>${Number(props.getValue()).toFixed(2)}</ColumnCellSpan>
        },
        {
            accessorKey: 'marketCap',
            header: 'Market Cap',
            cell: (props: CellContext<any, any>) =>
                <ColumnCellSpan>${Number(props.getValue()).toFixed(2)}M</ColumnCellSpan>
        },
        {
            accessorKey: 'circulatingSupply',
            header: 'Circulating Supply',
            cell: (props: CellContext<any, any>) =>
                <ColumnCellSpan>{Number(props.getValue()).toFixed(2)}M</ColumnCellSpan>
        },
        {
            accessorKey: 'changePercent',
            header: 'change %',
            cell: (props: CellContext<any, any>) => <ColumnCellSpan>
                <Badge type={Number(props.getValue()) >= 0 ? 'success' : 'danger'}
                       outline
                       borderRadius={'full'}>
                    <Icon icon_src={Number(props.getValue()) >= 0 ? 'arrow-up.svg' : 'arrow-down.svg'}
                          width={'8rem'}
                    />
                    %{Number(props.getValue()).toFixed(2)}
                </Badge>
            </ColumnCellSpan>
        },
        {
            accessorKey: 'last24H',
            header: 'last (24H)',
            cell: (props: CellContext<any, any>) =>
                <ColumnCellSpan>{Number(props.getValue()).toFixed(2)}</ColumnCellSpan>
        },
        {
            accessorKey: 'watchlist',
            header: '',
            cell: (props: CellContext<any, any>) => <ColumnCellSpan>
                <Icon width={'20rem'} icon_src={props.getValue() ? 'star-filled.svg' : 'star-unfilled.svg'}/>
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
            globalFilter: searchVal,
        },
        onGlobalFilterChange: setSearch,
        getRowId: () => uuidv4()
    })

    const PaginationRowComponentProps: PaginationRowProps = {
        nextPageHandler: table.nextPage,
        previousPageHandler: table.previousPage,
        getCanNextPage: table.getCanNextPage(),
        getCanPreviousPage: table.getCanPreviousPage(),
        totalPageCount: table.getPageCount(),
    }

    useEffect(() => {
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
        const tableRefetchInterval = setInterval(() => {
            refetchTableData()
            setLastRefetchTime(getTimeFormatted())
        }, 1000 * 10)

        return () => {
            clearInterval(tableRefetchInterval)
        }
    }, []);

    useEffect(() => {
        setWatchlistColumnFilterStatus(watchlistFilterStatus)
    }, [watchlistFilterStatus]);

    return (
        <PricesTableContainer>
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
