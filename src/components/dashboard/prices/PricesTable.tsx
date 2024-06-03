import {
    Cell,
    CellContext,
    ColumnDef, flexRender,
    getCoreRowModel,
    Header,
    HeaderGroup, Row,
    useReactTable
} from "@tanstack/react-table";
import {useMemo, useState, JSX} from "react";
import {AssetPriceTable} from "@ts/type/Tables.type.ts";

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import {styled} from "styled-components";
import Icon from "@components/ui/Icon.tsx";

const PricesTableContainer = styled.div`
  & .table-head {
    background-color: var(--color-black-100);
  }
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

export default function PricesTable() {
    const columns: ColumnDef<any>[] = useMemo(() => [
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
            cell: (props: CellContext<any, any>) => <ColumnCellSpan>{props.getValue()}</ColumnCellSpan>
        },
        {
            accessorKey: 'marketCap',
            header: 'Market Cap',
            cell: (props: CellContext<any, any>) => <ColumnCellSpan>{props.getValue()}</ColumnCellSpan>
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

    const [data, setData] = useState<AssetPriceTable[]>([
        {
            name: {
                name: 'Bitcoin',
                symbol: 'BTC',
                logoSrc: 'crypto/btc.svg',
            },
            price: '0.003',
            marketCap: '$361.32B',
            circulatingSupply: '19.144M',
            changePercent: '1.37%',
            last24H: '1.37%',
            watchList: false,
        },
        {
            name: {
                name: 'Ethereum',
                symbol: 'ETH',
                logoSrc: 'crypto/eth.svg',
            },
            price: '0.003',
            marketCap: '$361.32B',
            circulatingSupply: '19.144M',
            changePercent: '1.37%',
            last24H: '1.37%',
            watchList: false,
        },
    ])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <PricesTableContainer>
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
        </PricesTableContainer>
    )
}
