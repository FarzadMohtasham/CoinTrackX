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
import Button from "@components/ui/stuff/Button.tsx";
import Skeleton from "react-loading-skeleton";
import {object} from "yup";

type AssetMarketColumnDef = {
    accessorKey: string;
    header: string;
    cell: Cell<any, any>,
}

type AssetMarketsProps = {
    assetName: string;
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

const Heading = styled.span`
    font-size: var(--font-size-body-md);
    font-weight: 500;
    display: block;
`

const TableButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export default function AssetMarkets(props: AssetMarketsProps): JSX.Element {
    const {
        assetName,
    }: AssetMarketsProps = props

    const [tableShowCount, setTableShowCount] = useState<number>(10)
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
    const [assetMarkets, setAssetMarkets] = useState<AssetMarketColumnDef[]>([])

    const assetMarketsTable = useReactTable({
        data: tableData,
        columns: tableColumn,
        getCoreRowModel: getCoreRowModel(),
        getRowId: () => uuidv4(),
    })

    const {data: assetMarketsData, error, isLoading, refetch} = useGetAssetMarketsQuery(assetName as AssetName)

    const handleShowMoreButton = () => {
        setTableShowCount(tableShowCount + 5)
    }

    const handleShowLessButton = () => {
        setTableShowCount(tableShowCount - 5)
    }

    useEffect(() => {
        if (typeof assetMarketsData !== typeof object()) return

        const assetMarkets: TableAssetMarket[] = assetMarketsData.slice(0, tableShowCount).map((assetMarket: AssetMarketProps) => {
            return {
                exchangeId: assetMarket.exchangeId,
                volumeUsd24Hr: assetMarket.volumeUsd24Hr,
                percentExchangeVolume: assetMarket.percentExchangeVolume,
                tradesCount24Hr: Number(assetMarket.tradesCount24Hr),
            }
        })

        setTableData(assetMarkets)
    }, [assetMarketsData, tableShowCount]);

    return (
        <>
            {
                isLoading ?
                    <Skeleton height={'5rem'} count={10}/>
                    :
                    <AssetMarketsContainer>
                        <Heading>Market Stats</Heading>
                        <TableContainer>
                            <Table>
                                <TableCaption>Showing {tableShowCount} of {assetMarketsData?.length} table
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
                        <TableButtonsContainer>
                            <Button onClickHandler={handleShowLessButton}
                                    disabled={tableShowCount === 10}>Show
                                less</Button>
                            <Button onClickHandler={handleShowMoreButton}
                                    disabled={tableShowCount === assetMarketsData?.length}>Show
                                more</Button>
                        </TableButtonsContainer>
                    </AssetMarketsContainer>
            }
        </>
    )
}
