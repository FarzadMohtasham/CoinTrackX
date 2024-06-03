import {JSX, SetStateAction, useEffect, useMemo, useState} from 'react'
import {
    Cell,
    CellContext,
    ColumnDef,
    flexRender,
    getCoreRowModel, getFilteredRowModel, getPaginationRowModel,
    Header,
    HeaderGroup,
    Row,
    useReactTable
} from '@tanstack/react-table'
import Skeleton from 'react-loading-skeleton'
import {styled} from 'styled-components'

import {Table, TableCaption, TableContainer, Tbody, Td, Thead, Tr,} from '@chakra-ui/react'
import useGetAssetsQuery from '@query/assets/useGetAssets.query.ts'
import useUser from '@hooks/useUser.ts'

import Icon from '@components/ui/Icon.tsx'
import PaginationRow from '@components/dashboard/prices/PaginationRow.tsx'

import {Asset} from '@ts/type/Assets.api.type.ts'
import {AssetPriceTable} from '@ts/type/Tables.type.ts'

const PricesTableContainer = styled.div`
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

type PricesTableProps = {
    searchVal: string;
    setSearch: SetStateAction<any>;
    showOnlyWatchlist: boolean;
}

export default function PricesTable(props: PricesTableProps): JSX.Element {
    const {
        searchVal,
        setSearch,
        showOnlyWatchlist,
    } = props

    console.log(typeof searchVal)

    const {data, error, refetch, isLoading} = useGetAssetsQuery()
    const user = useUser()

    console.log(user)

    const tableColumns: ColumnDef<any>[] = useMemo(() => [
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
            cell: (props: CellContext<any, any>) => <ColumnCellSpan>{props.getValue()}</ColumnCellSpan>
        },
        {
            accessorKey: 'changePercent',
            header: 'change %',
            cell: (props: CellContext<any, any>) => <ColumnCellSpan>{props.getValue()}</ColumnCellSpan>
        },
        {
            accessorKey: 'last24H',
            header: 'last (24H)',
            cell: (props: CellContext<any, any>) => <ColumnCellSpan>{props.getValue()}</ColumnCellSpan>
        },
        {
            accessorKey: 'watchlist',
            header: '',
            cell: (props: CellContext<any, any>) => <ColumnCellSpan>{props.getValue()}</ColumnCellSpan>
        },
    ], []);

    useEffect(() => {
        if (!data) return

        console.log(data)

        const tabledData = data.map((assetData: Asset): AssetPriceTable => {
            return {
                name: {
                    name: assetData.name,
                    symbol: assetData.symbol,
                    logoSrc: `crypto/${assetData.symbol.toLowerCase()}.svg`,
                },
                price: assetData.priceUsd,
                changePercent: assetData.vwap24Hr,
                circulatingSupply: assetData.supply,
                last24H: assetData.changePercent24Hr,
                marketCap: assetData.marketCapUsd,
                watchList: false,
            } as AssetPriceTable
        })

        setTableData(tabledData)
    }, [data]);

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
    })

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
                            <TableCaption>Data will reload every 10s!</TableCaption>
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
            <PaginationRow/>
        </PricesTableContainer>
    )
}
