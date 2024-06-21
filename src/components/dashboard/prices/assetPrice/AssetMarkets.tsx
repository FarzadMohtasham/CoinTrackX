import {JSX, useEffect, useMemo, useState} from 'react'
import {
    Cell,
    CellContext,
    ColumnDef, flexRender,
    getCoreRowModel,
    Header,
    HeaderGroup, Row,
    useReactTable
} from '@tanstack/react-table'
import {v4 as uuidv4} from 'uuid'
import {styled} from 'styled-components'
import {Table, TableCaption, TableContainer, Tbody, Td, Thead, Tr,} from '@chakra-ui/react'
import useGetAssetMarketsQuery from "@query/assets/useGetAssetMarkets.query.ts";
import {AssetMarketProps, AssetName} from "@typings/type/Assets.api.type.ts";
import {amountToBeFixed} from "@utils/helpers.ts";
import Skeleton from "react-loading-skeleton";
import {object} from "yup";
import Select from "@components/ui/stuff/Select.tsx";
import {SelectMenuItem} from "@typings/type/component-types/Select.type.ts";

type AssetMarketsProps = {
    assetName: string;
    hasErrorHandler: () => void;
    hasNoErrorHandler: () => void;
    refetchListener: number;
}

type AssetMarketColumnDef = {
    accessorKey: string;
    header: string;
    cell: Cell<any, any>,
}

type TableAssetMarket = {
    exchangeId: string;
    volumeUsd24Hr: string;
    percentExchangeVolume: string;
    tradesCount24Hr: number;
}

const AssetMarketsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .table-head {
        background-color: var(--color-black-100);

        .table-details {
            color: var(--color-black-800);
            font-weight: 500;
            font-size: var(--font-size-body-xsm);
        }
    }
`

const ColumnContainer = styled.div``

const Heading = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    span.title {
        font-size: var(--font-size-body-md);
        font-weight: 500;
    }
`

const SelectTableShowStatusList: SelectMenuItem[] = [
    {
        default: true,
        name: 'Show less',
        value: 'less',
        iconSrc: ''
    },
    {
        default: false,
        name: 'Show all',
        value: 'all',
        iconSrc: ''
    },
]

export default function AssetMarkets(props: AssetMarketsProps): JSX.Element {
    const {
        assetName,
        hasErrorHandler,
        hasNoErrorHandler,
        refetchListener,
    }: AssetMarketsProps = props

    const [tableShowStatus, setTableShowStatus] = useState<'less' | 'all'>('less')
    const [tableData, setTableData] = useState<TableAssetMarket[]>([])
    const tableColumn: ColumnDef<AssetMarketColumnDef>[] = useMemo(() => [
        {
            accessorKey: 'exchangeId',
            header: 'Exchange ID',
            cell: (props: CellContext<any, any>) => {
                return (
                    <ColumnContainer>
                        {props.getValue()}
                    </ColumnContainer>
                )
            },
        },
        {
            accessorKey: 'volumeUsd24Hr',
            header: 'Volume (24H)',
            cell: (props: CellContext<any, any>) => {
                return (
                    <ColumnContainer>
                        ${amountToBeFixed(Number(props.getValue()))}
                    </ColumnContainer>
                )
            },
        },
        {
            accessorKey: 'percentExchangeVolume',
            header: 'Percent Exchange Volume',
            cell: (props: CellContext<any, any>) => {
                return (
                    <ColumnContainer>
                        %{amountToBeFixed(Number(props.getValue()))}
                    </ColumnContainer>
                )
            },
        },
        {
            accessorKey: 'tradesCount24Hr',
            header: 'Trades Count 24Hr',
            cell: (props: CellContext<any, any>) => <ColumnContainer>
                {props.getValue()} Trade
            </ColumnContainer>
        },
    ], [])

    const assetMarketsTable = useReactTable({
        data: tableData,
        columns: tableColumn,
        getCoreRowModel: getCoreRowModel(),
        getRowId: () => uuidv4(),
    })

    const {
        data: assetMarketsData,
        error: assetMarketsError,
        isLoading,
        refetch: assetMarketsRefetch
    } = useGetAssetMarketsQuery(assetName as AssetName)

    const showLessCount = Math.floor(assetMarketsData?.length / 2)
    const showAllCount = assetMarketsData?.length

    useEffect(() => {
        if (assetMarketsError) hasErrorHandler()
        else hasNoErrorHandler()
    }, [assetMarketsError]);

    useEffect(function processAssetMarketsData() {
        if (typeof assetMarketsData !== typeof object()) return

        const assetMarkets: TableAssetMarket[] = assetMarketsData.slice(0, tableShowStatus === 'less' ? showLessCount : showAllCount).map((assetMarket: AssetMarketProps) => {
            return {
                exchangeId: assetMarket.exchangeId,
                volumeUsd24Hr: assetMarket.volumeUsd24Hr,
                percentExchangeVolume: assetMarket.percentExchangeVolume,
                tradesCount24Hr: Number(assetMarket.tradesCount24Hr),
            }
        })

        setTableData(assetMarkets)
    }, [assetMarketsData, tableShowStatus]);

    useEffect(() => {
        if (assetMarketsError) hasErrorHandler()
        else hasNoErrorHandler()
    }, [assetMarketsError]);

    useEffect(() => {
        assetMarketsRefetch()
    }, [refetchListener]);

    return (
        <>
            {
                isLoading ?
                    <Skeleton height={'5rem'} count={10}/>
                    :
                    <AssetMarketsContainer>
                        <Heading>
                            <span className={'title'}>Market Stats</span>
                            <Select $menuItems={SelectTableShowStatusList} $newValueSetter={setTableShowStatus}/>
                        </Heading>
                        <TableContainer>
                            <Table>
                                <TableCaption>Showing {tableShowStatus === 'less' ? showLessCount : showAllCount} of {assetMarketsData?.length} table
                                    rows!</TableCaption>
                                <Thead className={'table-head'}>
                                    {
                                        assetMarketsTable.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => {
                                            return (
                                                <Tr key={headerGroup.id}>
                                                    {
                                                        headerGroup.headers.map((header: Header<any, any>) => {
                                                            return (
                                                                <Td key={header.id}
                                                                    className={'table-details'}>
                                                                    {String(header.column.columnDef.header)}
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
                                        assetMarketsTable.getRowModel().rows.map((row: Row<any>) => {
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
                    </AssetMarketsContainer>
            }
        </>
    )
}
