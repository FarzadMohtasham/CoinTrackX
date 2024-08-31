import Button from '@/components/ui/stuff/Button';
import Heading from '@/components/ui/stuff/Heading';
import Icon from '@/components/ui/stuff/Icon';
import { DashboardPageLoaderResponse } from '@/layouts/Dashboard.layout';
import {
   calcTransactionsProfitLoss,
   CalculatedTransactionProfitLoss,
} from '@/libs/utils/portfolio-utils/calcTransactionsProfitLoss';
import { sortTransactionsByAsset } from '@/libs/utils/portfolio-utils/sortTransactionsByAsset';
import { getTransactionsQuery } from '@/queries/transactions/getTransactions.query';
import {
   Table,
   TableContainer,
   Tbody,
   Td,
   Tfoot,
   Thead,
   Tr,
   Button as ChakraButton,
   Input,
   InputGroup,
   InputLeftElement,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import {
   Cell,
   createColumnHelper,
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   Header,
   HeaderGroup,
   PaginationState,
   useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';
import { useRouteLoaderData } from 'react-router-dom';

const columnHelper = createColumnHelper<CalculatedTransactionProfitLoss>();

const defaultColumn = [
   columnHelper.accessor('assetName', {
      id: 'name',
      header: 'Name',
      cell: (info) => (
         <div className="flex items-center gap-2">
            <Icon
               iconSrc={`crypto/${info.row.original.assetSymbol.toLowerCase()}.svg`}
               iconAlt="asset icon"
               width="25px"
            />
            <span>{info.getValue()}</span>
         </div>
      ),
   }),
   columnHelper.accessor('amount', {
      id: 'amount',
      header: 'Amount',
      cell: (info) => (
         <span>
            {info.getValue()} {info.row.original.assetName}
         </span>
      ),
   }),
   columnHelper.accessor('change24hrPercent', {
      id: 'change24hrPercent',
      header: '24H Change',
      cell: (info) => <span>{Number(info.getValue()).toLocaleString()}%</span>,
   }),
   columnHelper.accessor('currentPrice', {
      id: 'currentPrice',
      header: 'Price',
      cell: (info) => <span>${info.getValue().toLocaleString()}</span>,
   }),
   columnHelper.accessor('averageBuy', {
      id: 'averageBuy',
      header: 'Average Buy',
      cell: (info) => <span>{info.getValue().toLocaleString()}</span>,
   }),
   columnHelper.accessor('total', {
      id: 'total',
      header: 'Total',
      cell: (info) => <span>${info.getValue().toLocaleString()}</span>,
   }),
   columnHelper.accessor('allProfitLoss', {
      id: 'allProfitLoss',
      header: 'All Time',
      cell: (info) => <span>${info.getValue().toLocaleString()}</span>,
   }),
];

export default function AssetsPortfolioTable() {
   const { user } = useRouteLoaderData(
      'dashboardPage',
   ) as DashboardPageLoaderResponse;

   // ---------- States ----------
   const [tableData, setTableData] = useState<
      CalculatedTransactionProfitLoss[]
   >([]);
   const [pagination, setPagination] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
   });
   const [search, setSearch] = useState<string>('');

   const table = useReactTable({
      columns: defaultColumn,
      data: tableData,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onGlobalFilterChange: setSearch,
      onPaginationChange: setPagination,
      state: {
         pagination,
         globalFilter: search,
      },
   });

   // ---------- Queries ----------
   const {
      data: transactionsData,
      isLoading: transactionsDataIsLoading,
      error: transactionsQueryHasError,
      refetch: transactionsQueryRefetch,
   } = getTransactionsQuery(user?.id || '');

   const {
      data: calculatedAssetsPortfolioData,
      error: calculatedAssetsPortfolioError,
      refetch: calculatedAssetsPortfolioRefetch,
      isLoading: calculatedAssetsPortfolioIsLoading,
   } = useQuery({
      queryKey: ['calculatedAssetsPortfolioQuery'],
      initialData: [],
      staleTime: 1000 * 60,
      gcTime: 1000 * 60,
      queryFn: async () => {
         const sortedTransactionsByAsset = await sortTransactionsByAsset(
            transactionsData || [],
         );

         const transactionsProfitLossCalcResult =
            await calcTransactionsProfitLoss(sortedTransactionsByAsset);

         if (transactionsProfitLossCalcResult.error)
            throw new Error(transactionsProfitLossCalcResult.error);

         return transactionsProfitLossCalcResult.data;
      },
   });

   // ---------- Handlers ----------
   const handleTryAgainClick = () => {
      transactionsQueryRefetch();
   };

   // ---------- Hooks ----------
   useEffect(() => {
      if (transactionsData?.length !== 0 && !transactionsDataIsLoading) {
         calculatedAssetsPortfolioRefetch();
      }
   }, [transactionsData, transactionsDataIsLoading]);

   useEffect(() => {
      if (calculatedAssetsPortfolioData)
         setTableData(calculatedAssetsPortfolioData);

      if (calculatedAssetsPortfolioError)
         toast.error(String(calculatedAssetsPortfolioError));
   }, [calculatedAssetsPortfolioData]);

   // ---------- Render JSX Phase ----------
   if (transactionsDataIsLoading || calculatedAssetsPortfolioIsLoading) {
      return (
         <div>
            <Skeleton count={4} height={'100px'} />
         </div>
      );
   }

   if (transactionsQueryHasError) {
      return (
         <div className="container flex flex-col items-center gap-3">
            <Heading>Something went wrong!</Heading>
            <span>
               We thing something braked, Please try again or contact with
               support
            </span>
            <Button onClickHandler={handleTryAgainClick}>Try again</Button>
         </div>
      );
   }

   if (calculatedAssetsPortfolioData.length === 0) {
      return (
         <div className="container flex flex-col items-center">
            <Heading className="mb-1" tagName="h4" fontWeight="bold">
               Nothing to show!
            </Heading>
            <span className="mb-4">
               There is nothing to show, add transaction or try again
            </span>
            <Button onClickHandler={handleTryAgainClick}>Try again</Button>
         </div>
      );
   }

   return (
      <>
         <InputGroup>
            <InputLeftElement
               pointerEvents="none"
               color="gray.300"
               fontSize="1.2em"
               height={'100%'}
            >
               <Icon iconSrc="search-gray.svg" height="100%" width="20px" />
            </InputLeftElement>
            <Input
               placeholder="Search"
               value={search}
               onChange={(e: any) => setSearch(e.target.value)}
               borderWidth={'2px'}
               borderColor={'var(--color-black-50)'}
               focusBorderColor={'rgba(14, 6, 55, 0.10)'}
               height={'50px'}
               borderRadius={'12px'}
               size={'md'}
            />
         </InputGroup>
         <TableContainer>
            <Table variant={'simple'}>
               <Thead>
                  {table
                     .getHeaderGroups()
                     .map(
                        (
                           headerGroup: HeaderGroup<CalculatedTransactionProfitLoss>,
                        ) => {
                           return (
                              <Tr key={headerGroup.id}>
                                 {headerGroup.headers.map(
                                    (
                                       header: Header<
                                          CalculatedTransactionProfitLoss,
                                          unknown
                                       >,
                                    ) => {
                                       return (
                                          <Td key={header.id}>
                                             {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                     header.column.columnDef
                                                        .header,
                                                     header.getContext(),
                                                  )}
                                          </Td>
                                       );
                                    },
                                 )}
                              </Tr>
                           );
                        },
                     )}
               </Thead>
               <Tbody>
                  {table.getRowModel().rows.map((row) => {
                     return (
                        <Tr key={row.id}>
                           {row
                              .getVisibleCells()
                              .map(
                                 (
                                    cell: Cell<
                                       CalculatedTransactionProfitLoss,
                                       unknown
                                    >,
                                 ) => {
                                    return (
                                       <Td key={cell.id} className="uppercase">
                                          {flexRender(
                                             cell.column.columnDef.cell,
                                             cell.getContext(),
                                          )}
                                       </Td>
                                    );
                                 },
                              )}
                        </Tr>
                     );
                  })}
               </Tbody>
               <Tfoot>
                  <Tr>
                     <Td>
                        <ChakraButton
                           onClick={() => table.firstPage()}
                           isDisabled={!table.getCanPreviousPage()}
                        >
                           First Page
                        </ChakraButton>
                     </Td>

                     <Td>
                        <ChakraButton
                           onClick={() => table.previousPage()}
                           isDisabled={!table.getCanPreviousPage()}
                        >
                           Prev Page
                        </ChakraButton>
                     </Td>

                     <Td>
                        <span>
                           page {pagination.pageIndex + 1} of{' '}
                           {table.getPageCount()}
                        </span>
                     </Td>

                     <Td>
                        <ChakraButton
                           onClick={() => table.nextPage()}
                           isDisabled={!table.getCanNextPage()}
                        >
                           Next Page
                        </ChakraButton>
                     </Td>

                     <Td>
                        <ChakraButton
                           onClick={() => table.lastPage()}
                           isDisabled={!table.getCanNextPage()}
                        >
                           Last Page
                        </ChakraButton>
                     </Td>
                  </Tr>
               </Tfoot>
            </Table>
         </TableContainer>
      </>
   );
}
