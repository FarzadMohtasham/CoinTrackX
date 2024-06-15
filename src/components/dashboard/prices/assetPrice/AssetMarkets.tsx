import {JSX, useEffect, useMemo, useState} from 'react'
import {
    Cell,
    CellContext,
    ColumnDef, flexRender,
    getCoreRowModel,
    Header,
    HeaderGroup, Row,
    RowModel,
    useReactTable
} from '@tanstack/react-table'
import {v4 as uuidv4} from 'uuid'
import {styled} from 'styled-components'
import {Table, TableCaption, TableContainer, Tbody, Td, Thead, Tr,} from '@chakra-ui/react'
import useGetAssetMarketsQuery from "@query/assets/useGetAssetMarkets.query.ts";
import {AssetMarketProps, AssetName} from "@typings/type/Assets.api.type.ts";

type AssetMarketColumnDef = {
    accessorKey: string;
    header: string;
    cell: Cell<any, any>,
}

type AssetMarketsProps = {
    assetName: string;
}

type TableAssetMarket = {
    marketCap: string;
    volume24h: string;
    circulatingSupply: string;
    maxSupply: number;
}

const ColumnContainer = styled.div`
    border: .1rem solid var(--color-black-100);
    border-radius: 1.2rem;
    padding: 2.4rem;

    .table-head {
        background-color: var(--color-black-100);

        .table-details {
            color: var(--color-black-800);
            font-weight: 500;
            font-size: var(--font-size-body-xsm);
        }
    }
`

const Heading = styled.span`
    font-size: var(--font-size-body-md);
    font-weight: 500;
    margin-bottom: 1.6rem;
    display: block;
`

export default function AssetMarkets(props: AssetMarketsProps): JSX.Element {
    const {
        assetName,
    }: AssetMarketsProps = props

    const [tableShowCount, setTableShowCount] = useState<number>(10)
    const [tableData, setTableData] = useState<TableAssetMarket[]>([])
    const tableColumn: ColumnDef<AssetMarketColumnDef>[] = useMemo(() => [
        {
            accessorKey: 'marketCap',
            header: 'Market Cap',
            cell: (props: CellContext<any, any>) => {
                return (
                    <ColumnContainer>
                        {props.getValue()}
                    </ColumnContainer>
                )
            },
        },
        {
            accessorKey: 'volume24h',
            header: 'Volume (24H)',
            cell: (props: CellContext<any, any>) => {
                return (
                    <ColumnContainer>
                        {props.getValue()}
                    </ColumnContainer>
                )
            },
        },
        {
            accessorKey: 'circulatingSupply',
            header: 'Circulating Supply',
            cell: (props: CellContext<any, any>) => {
                return (
                    <ColumnContainer>
                        {props.getValue()}
                    </ColumnContainer>
                )
            },
        },
        {
            accessorKey: 'maxSupply',
            header: 'Max Supply',
            cell: (props: CellContext<any, any>) => <ColumnContainer>
                {props.getValue()}
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

    useEffect(() => {
        if (!assetMarketsData) return

        const assetMarkets = assetMarketsData.slice(0, tableShowCount).map((assetMarket: AssetMarketProps) => {
            return {
                marketCap: '13',
                volume24h: '123',
                circulatingSupply: '213',
                maxSupply: 123,
            }
        })

        console.log(assetMarkets)

        setTableData(assetMarkets)
    }, [assetMarketsData]);

    console.log(tableData)

    return (
        <ColumnContainer>
            <Heading>Market Stats</Heading>
            <TableContainer>
                <Table>
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
        </ColumnContainer>
    )
}
