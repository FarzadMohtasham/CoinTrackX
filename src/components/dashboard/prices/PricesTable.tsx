import { JSX, useEffect, useMemo, useState } from 'react';
import {
   Cell,
   CellContext,
   ColumnDef,
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   Header,
   HeaderGroup,
   PaginationState,
   Row,
   useReactTable,
} from '@tanstack/react-table';
import Skeleton from 'react-loading-skeleton';
import { styled } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';

import { Table, TableContainer, Tbody, Td, Thead, Tr } from '@chakra-ui/react';
import useGetAssetsQuery from '@queries/assets/useGetAssets.query.ts';

import Icon from '@components/ui/stuff/Icon.tsx';
import Badge from '@components/ui/stuff/Badge.tsx';
import PaginationRow from '@components/dashboard/prices/PaginationRow.tsx';

import { Asset } from '@typings/Assets.api.type.ts';
import { AssetPriceTable } from '@typings/Tables.type.ts';
import { PaginationRowProps } from '@typings/PricesPage.type.ts';

import Input from '@components/ui/inputFields/InputField.input.tsx';
import Button from '@components/ui/stuff/Button.tsx';

const PricesTableContainer = styled.div`
   display: flex;
   flex-direction: column;
   gap: 10px;

   & .table-head {
      background-color: var(--color-black-100);
   }
`;

const SearchBar = styled.div`
   display: flex;
   align-items: center;
   gap: 10px;
   margin-bottom: 20px;

   .left-col {
      flex-grow: 1;
   }

   .right-col {
      display: flex;
      gap: 10px;
   }
`;

const SkeletonContainer = styled.div`
   display: flex;
   flex-direction: column;
   gap: 10px;
`;

const ColumnName = styled.div`
   display: flex;
   gap: 12px;
   align-items: center;

   .left-col {
   }

   .right-col {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .name {
         font-size: var(--font-size-body-sm);
         font-weight: 500;
      }

      .symbol {
         font-size: var(--font-size-body-xsm);
         font-weight: 400;
      }
   }
`;

const ColumnHeaderSpan = styled.span`
   font-size: var(--font-size-body-xsm);
   color: var(--color-black-700);
   font-weight: 500;
`;

const ColumnCellSpan = styled.span`
   font-size: var(--font-size-body-xsm);
   font-weight: 400;
`;

export default function PricesTable(): JSX.Element {
   const [pagination, setPagination] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: 20,
   });
   const [search, setSearch] = useState<string>('');
   const [showOnlyWatchlist, setShowOnlyWatchlist] = useState<boolean>(false);

   const { data, isLoading } = useGetAssetsQuery();
   // const user = useUser()

   const navigate: NavigateFunction = useNavigate();

   const watchlistBtnHandler = (): void => {
      setShowOnlyWatchlist(!showOnlyWatchlist);
   };

   const portfolioBtnHandler = (): void => {
      navigate('/dashboard/assets-portfolio');
   };

   const tableColumns: ColumnDef<AssetPriceTable>[] = useMemo(
      () => [
         {
            accessorKey: 'name',
            header: 'Name',
            cell: (props: CellContext<any, any>) => {
               return (
                  <Link to={`/dashboard/prices/${props.getValue().id}`}>
                     <ColumnName>
                        <Icon
                           iconSrc={props.getValue().logoSrc}
                           className={'left-col'}
                           width={'35px'}
                        />
                        <div className={'right-col'}>
                           <span className={'name'}>
                              {props.getValue().name}
                           </span>
                           <span className={'symbol'}>
                              {props.getValue().symbol}
                           </span>
                        </div>
                     </ColumnName>
                  </Link>
               );
            },
         },
         {
            accessorKey: 'price',
            header: 'Price',
            cell: (props: CellContext<any, any>) => (
               <ColumnCellSpan>
                  ${Number(props.getValue()).toFixed(2)}
               </ColumnCellSpan>
            ),
         },
         {
            accessorKey: 'marketCap',
            header: 'Market Cap',
            cell: (props: CellContext<any, any>) => (
               <ColumnCellSpan>
                  ${Number(props.getValue()).toFixed(2)}M
               </ColumnCellSpan>
            ),
         },
         {
            accessorKey: 'circulatingSupply',
            header: 'Circulating Supply',
            cell: (props: CellContext<any, any>) => (
               <ColumnCellSpan>
                  {Number(props.getValue()).toFixed(2)}M
               </ColumnCellSpan>
            ),
         },
         {
            accessorKey: 'changePercent',
            header: 'change %',
            cell: (props: CellContext<any, any>) => (
               <ColumnCellSpan>
                  <Badge
                     type={Number(props.getValue()) >= 0 ? 'success' : 'danger'}
                     iconSrc={
                        Number(props.getValue()) >= 0
                           ? 'arrow-up.svg'
                           : 'arrow-down.svg'
                     }
                     iconSize={'8px'}
                     borderRadius={'full'}
                     outline
                  >
                     %{Number(props.getValue()).toFixed(2)}
                  </Badge>
               </ColumnCellSpan>
            ),
         },
         {
            accessorKey: 'last24H',
            header: 'last (24H)',
            cell: (props: CellContext<any, any>) => (
               <ColumnCellSpan>
                  {Number(props.getValue()).toFixed(2)}
               </ColumnCellSpan>
            ),
         },
         {
            accessorKey: 'watchlist',
            header: '',
            cell: (props: CellContext<any, any>) => (
               <ColumnCellSpan>
                  <Icon
                     width={'20px'}
                     iconSrc={
                        props.getValue()
                           ? 'star-filled.svg'
                           : 'star-unfilled.svg'
                     }
                  />
               </ColumnCellSpan>
            ),
         },
      ],
      [],
   );

   const [tableData, setTableData] = useState<AssetPriceTable[]>([]);

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
      getRowId: () => uuidv4(),
   });

   const PaginationRowComponentProps: PaginationRowProps = {
      nextPageHandler: table.nextPage,
      previousPageHandler: table.previousPage,
      getCanNextPage: table.getCanNextPage(),
      getCanPreviousPage: table.getCanPreviousPage(),
      totalPageCount: table.getPageCount(),
   };

   useEffect((): void => {
      if (!data) return;

      const tabledData = data.map((assetData: Asset): AssetPriceTable => {
         return {
            name: {
               name: assetData.name,
               symbol: assetData.symbol,
               logoSrc: `crypto/${assetData.symbol.toLowerCase()}.svg`,
               id: assetData.id,
            },
            price: assetData.priceUsd,
            changePercent: assetData.changePercent24Hr,
            circulatingSupply: assetData.supply,
            last24H: assetData.vwap24Hr,
            marketCap: assetData.marketCapUsd,
            watchList: false,
         } as AssetPriceTable;
      });

      setTableData(tabledData);
   }, [data]);

   return (
      <PricesTableContainer>
         {isLoading ? (
            <Skeleton height={'70px'} />
         ) : (
            <SearchBar>
               <div className={'left-col'}>
                  <Input
                     placeHolder={'Search crypto'}
                     label={'search-crypto'}
                     showLabel={false}
                     iconSrc={'search-gray.svg'}
                     focusIconSrc={'search-gray-active.svg'}
                     inputValue={search}
                     onChangeHandler={(value: any) => setSearch(value)}
                  />
               </div>
               <div className={'right-col'}>
                  {showOnlyWatchlist ? (
                     <Button
                        icon={'watchlist-purple.svg'}
                        borderRadius={'md'}
                        onClickHandler={watchlistBtnHandler}
                        variant={'primary'}
                        outline
                     >
                        Watchlist
                     </Button>
                  ) : (
                     <Button
                        icon={'watchlist-gray.svg'}
                        borderRadius={'md'}
                        onClickHandler={watchlistBtnHandler}
                        variant={'gray'}
                        outline
                     >
                        Watchlist
                     </Button>
                  )}
                  <Button
                     icon={'portfolio-purple.svg'}
                     borderRadius={'md'}
                     onClickHandler={portfolioBtnHandler}
                     outline
                  >
                     Portfolio
                  </Button>
               </div>
            </SearchBar>
         )}
         {isLoading ? (
            <SkeletonContainer>
               {[...Array(10)].map((_, i: number) => {
                  return <Skeleton key={'sk-' + i} height={'60px'} />;
               })}
            </SkeletonContainer>
         ) : (
            <TableContainer>
               <Table className={'table'}>
                  <Thead className={'table-head'}>
                     {table
                        .getHeaderGroups()
                        .map((headerGroup: HeaderGroup<any>): JSX.Element => {
                           return (
                              <Tr className={'tr'} key={headerGroup.id}>
                                 {headerGroup.headers.map(
                                    (header: Header<any, any>): JSX.Element => {
                                       return (
                                          <Td className={'th'} key={header.id}>
                                             <ColumnHeaderSpan>
                                                {String(
                                                   header.column.columnDef
                                                      .header,
                                                )}
                                             </ColumnHeaderSpan>
                                          </Td>
                                       );
                                    },
                                 )}
                              </Tr>
                           );
                        })}
                  </Thead>
                  <Tbody>
                     {table.getRowModel().rows.map((row: Row<any>) => {
                        return (
                           <Tr key={row.id}>
                              {row
                                 .getVisibleCells()
                                 .map((cell: Cell<any, any>) => {
                                    return (
                                       <Td key={cell.id}>
                                          {flexRender(
                                             cell.column.columnDef.cell,
                                             cell.getContext(),
                                          )}
                                       </Td>
                                    );
                                 })}
                           </Tr>
                        );
                     })}
                  </Tbody>
               </Table>
            </TableContainer>
         )}

         {!isLoading && <PaginationRow {...PaginationRowComponentProps} />}
      </PricesTableContainer>
   );
}
