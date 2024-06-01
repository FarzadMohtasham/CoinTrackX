import {Box} from "@chakra-ui/react";
import {CellContext, ColumnDef, getCoreRowModel, Header, HeaderGroup, useReactTable} from "@tanstack/react-table";
import {useMemo, useState, JSX} from "react";
import {AssetPriceTable} from "@ts/type/Tables.type.ts";

export default function PricesTable() {
    const columns: ColumnDef<any>[] = useMemo(() => [
        {
            accessorKey: 'name',
            header: 'Name',
            cell: (props: CellContext<any, any>) => <p>{props.getValue()}</p>,
        },
        {
            accessorKey: 'price',
            header: 'Price',
            cell: (props: CellContext<any, any>) => <p>{props.getValue()}</p>,
        },
        {
            accessorKey: 'marketCap',
            header: 'Market Cap',
            cell: (props: CellContext<any, any>) => <p>{props.getValue()}</p>,
        },
        {
            accessorKey: 'circulatingSupply',
            header: 'Circulating Supply',
            cell: (props: CellContext<any, any>) => <p>{props.getValue()}</p>,
        },
        {
            accessorKey: 'changePercent',
            header: 'change %',
            cell: (props: CellContext<any, any>) => <p>{props.getValue()}</p>,
        },
        {
            accessorKey: 'last24H',
            header: 'last (24H)',
            cell: (props: CellContext<any, any>) => <p>{props.getValue()}</p>,
        },
        {
            accessorKey: 'watchlist',
            header: '',
            cell: (props: CellContext<any, any>) => <p>{props.getValue()}</p>,
        },
    ], []);

    const [data, setData] = useState<AssetPriceTable[]>([
        {
            name: {
                name: 'holo',
                symbol: 'hot',
                logoSrc: 'crypto/hot.svg',
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
                name: 'bitcoin',
                symbol: 'btc',
                logoSrc: 'crypto/btc.svg',
            },
            price: '0.003',
            marketCap: '$361.32B',
            circulatingSupply: '19.144M',
            changePercent: '1.37%',
            last24H: '1.37%',
            watchList: false,
        },
    ]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    console.log(table.getHeaderGroups())

    return (
        <Box className={'table'}>
            {
                table.getHeaderGroups().map((headerGroup: HeaderGroup<any>): JSX.Element => {
                    return (
                        <Box className={'tr'} key={headerGroup.id}>
                            {
                                headerGroup.headers.map((header: Header<any, any>): JSX.Element => {
                                    return (
                                        <Box className={'th'} key={header.id}>
                                            {header.column.columnDef.header}
                                        </Box>
                                    )
                                })
                            }
                        </Box>
                    )
                })
            }
        </Box>
    )
}