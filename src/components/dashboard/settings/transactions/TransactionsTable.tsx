import Button from '@/components/ui/stuff/Button';
import { DashboardPageLoaderResponse } from '@/layouts/Dashboard.layout';
import { Transaction } from '@/libs/typings/Transaction.type';
import { getTransactionsQuery } from '@/queries/transactions/getTransactions.query';
import {
   Table,
   TableCaption,
   TableContainer,
   Tbody,
   Td,
   Text,
   Th,
   Thead,
   Tr,
   useDisclosure,
   Heading,
} from '@chakra-ui/react';
import {
   Cell,
   createColumnHelper,
   flexRender,
   getCoreRowModel,
   Header,
   HeaderGroup,
   useReactTable,
} from '@tanstack/react-table';
import Skeleton from 'react-loading-skeleton';
import { useRouteLoaderData } from 'react-router-dom';
import TransactionModal from './TransactionModal';
import Icon from '@/components/ui/stuff/Icon';
import { format } from 'date-fns';

// ---------- Table ----------
const columnHelper = createColumnHelper<Transaction>();
const defaultColumns = [
   columnHelper.accessor('created_at', {
      id: 'created_at',
      cell: (info) => format(info.getValue() || '', 'yyyy/MM/dd HH:mm', {}),
      header: 'Creation Date',
   }),
   columnHelper.accessor('type', {
      id: 'type',
      cell: (info) => info.getValue(),
      header: 'Type',
   }),
   columnHelper.accessor('asset', {
      id: 'asset',
      cell: (info) => (
         <div className="flex items-center gap-1">
            <Icon iconSrc={`/crypto/${info.getValue()}.svg`} width="20px" />
            {info.getValue()}
         </div>
      ),
      header: 'Asset',
   }),
   columnHelper.accessor('pair', {
      id: 'pair',
      cell: (info) => info.getValue(),
      header: 'Pair',
   }),
   columnHelper.accessor('amount', {
      id: 'amount',
      cell: (info) => info.getValue(),
      header: 'Amount',
   }),
   columnHelper.accessor('price', {
      id: 'price',
      cell: (info) => info.getValue(),
      header: 'Price',
   }),
   columnHelper.accessor('fee', {
      id: 'fee',
      cell: (info) => info.getValue(),
      header: 'Fee',
   }),
   columnHelper.accessor('notes', {
      id: 'notes',
      cell: (info) => info.getValue(),
      header: 'Notes',
   }),
   columnHelper.accessor('deduct_from_usd', {
      id: 'deduct_from_usd',
      cell: (info) => info.getValue(),
      header: 'Deduct From USD',
   }),
   columnHelper.accessor('time', {
      id: 'time',
      cell: (info) => info.getValue(),
      header: 'Time',
   }),
   columnHelper.accessor('portfolio', {
      id: 'portfolio',
      cell: (info) => info.getValue(),
      header: 'Portfolio',
   }),
];

export default function TransactionsTable() {
   const { user } = useRouteLoaderData(
      'dashboardPage',
   ) as DashboardPageLoaderResponse;

   // ---------- Queries ----------
   const {
      data: transactionsData,
      error,
      isLoading,
      refetch,
   } = getTransactionsQuery(user?.id || '');

   // ---------- Table ---------
   const table = useReactTable({
      data: transactionsData || [],
      columns: defaultColumns,
      getCoreRowModel: getCoreRowModel(),
   });

   if (isLoading) {
      <div className="p-3">
         <Skeleton count={7} height={'100px'} />
      </div>;
   }

   if (error) {
      return (
         <div className="error grid place-content-center h-52 w-full">
            <div className="wrapper flex flex-col gap-4 items-center">
               <Heading as={'h5'}>Something went wrong!</Heading>
               <Text>Failed to fetch transactions, Please try again</Text>
               <Button onClickHandler={refetch}>Try again</Button>
            </div>
         </div>
      );
   }

   if (!transactionsData || transactionsData.length <= 0)
      return <NoTransaction />;

   return (
      <TableContainer>
         <Table variant="simple">
            <TableCaption>
               Transaction data is up-to-date, Enjoy it
            </TableCaption>
            <Thead>
               {table
                  .getHeaderGroups()
                  .map((headerGroup: HeaderGroup<Transaction>) => {
                     return (
                        <Tr key={headerGroup.id}>
                           {headerGroup.headers.map(
                              (header: Header<Transaction, unknown>) => {
                                 return (
                                    <Th key={header.id}>
                                       {header.isPlaceholder
                                          ? null
                                          : flexRender(
                                               header.column.columnDef.header,
                                               header.getContext(),
                                            )}
                                    </Th>
                                 );
                              },
                           )}
                        </Tr>
                     );
                  })}
            </Thead>
            <Tbody>
               {table.getRowModel().rows.map((row) => {
                  return (
                     <Tr key={row.id}>
                        {row
                           .getVisibleCells()
                           .map((cell: Cell<Transaction, unknown>) => {
                              return (
                                 <Td key={cell.id} className="uppercase">
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
   );
}

const NoTransaction = () => {
   const { isOpen, onOpen, onClose } = useDisclosure();

   return (
      <>
         <div className="no-transaction grid place-content-center h-52 w-full">
            <div className="wrapper">
               <Heading as={'h4'}>No Transaction, Add a new one!</Heading>
               <Button onClickHandler={onOpen}>Add New Transaction</Button>
            </div>
         </div>

         <TransactionModal isOpen={isOpen} onClose={onClose} type="new" />
      </>
   );
};
