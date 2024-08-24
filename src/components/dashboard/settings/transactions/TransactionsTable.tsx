import Button from '@/components/ui/stuff/Button';
import {
   ButtonGroup,
   Button as ChakraButton,
   Input,
   InputGroup,
   InputLeftElement,
   Popover,
   PopoverArrow,
   PopoverCloseButton,
   PopoverContent,
   PopoverFooter,
   PopoverHeader,
   PopoverTrigger,
   Tfoot,
} from '@chakra-ui/react';
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
   getPaginationRowModel,
   Header,
   HeaderGroup,
   PaginationState,
   useReactTable,
} from '@tanstack/react-table';
import Skeleton from 'react-loading-skeleton';
import { useRouteLoaderData } from 'react-router-dom';
import TransactionModal from './TransactionModal';
import Icon from '@/components/ui/stuff/Icon';
import { format } from 'date-fns';
import { DashboardPageLoaderResponse } from '@/layouts/Dashboard.layout';
import { User } from '@supabase/supabase-js';
import { deleteTransactionMutation } from '@/queries/transactions/deleteTransaction.mutation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useInvalidateQuery } from '@/libs/hooks/useInvalidateQuery';

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
      cell: (info) => (
         <div className="flex items-center gap-1">
            <span>{info.getValue()}</span>
            <span>{info.row.original.asset}</span>
         </div>
      ),
      header: 'Amount',
   }),
   columnHelper.accessor('price', {
      id: 'price',
      cell: (props) => <span>${props.getValue().toLocaleString()}</span>,
      header: 'Price',
   }),
   columnHelper.accessor('fee', {
      id: 'fee',
      cell: (props) => (
         <span>
            {props.getValue().toLocaleString()}{' '}
            {props.row.original.fee_currency}
         </span>
      ),
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
      header: 'Buy/Sell Time',
   }),
   columnHelper.accessor('portfolio', {
      id: 'portfolio',
      cell: (info) => {
         return info.getValue();
      },
      header: 'Portfolio',
   }),
   columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: (props) => {
         // Last transaction in this list of arrays in the newest transaction, because of reverse function
         const transactions = props.table
            .getCoreRowModel()
            .rows.map((row) => row.original)
            .reverse();
         const meta = props.table.options.meta as { user: User };

         const invalidateTransactionsQuery = useInvalidateQuery([
            'getTransactions',
         ]);

         const currentTransaction = props.row.original;

         // ---------- Refs & States ----------
         const { onOpen: onDeletePopupOpen, onClose: onDeletePopupClose } =
            useDisclosure();
         const {
            onOpen: onTransactionModalOpen,
            onClose: onTransactionModalClose,
            isOpen: isTransactionModalOpen,
         } = useDisclosure();
         const initialFocusRef = React.useRef(null);

         // ---------- Mutations ----------
         const { mutateAsync, isPending } = deleteTransactionMutation(
            meta.user.id,
            currentTransaction?.id || 0,
            {
               onSuccess: async () => {
                  onDeletePopupClose();
                  toast.success('Transaction Deleted');
                  invalidateTransactionsQuery();
               },
               onError: (error) => {
                  toast.error(error.message);
               },
            },
         );

         // ---------- Handlers ----------
         const onDeleteTransactionClickHandler = async () => {
            await mutateAsync();
         };

         // ---------- Constants ----------
         const isLastTransaction =
            transactions[transactions.length - 1].id === props.row.original.id;

         return (
            <>
               {isLastTransaction && (
                  <div className="flex gap-3">
                     <ChakraButton onClick={onTransactionModalOpen}>
                        Edit
                     </ChakraButton>
                     <Popover
                        initialFocusRef={initialFocusRef}
                        placement="bottom"
                        closeOnBlur={true}
                        onOpen={onDeletePopupOpen}
                        onClose={onDeletePopupClose}
                     >
                        <PopoverTrigger>
                           <ChakraButton>Delete</ChakraButton>
                        </PopoverTrigger>
                        <PopoverContent
                           color="white"
                           bg="blue.800"
                           borderColor="blue.800"
                        >
                           <PopoverHeader pt={4} fontWeight="bold" border="0">
                              Are you sure want to delete?
                           </PopoverHeader>
                           <PopoverArrow bg="blue.800" />
                           <PopoverCloseButton />
                           <PopoverFooter
                              border="0"
                              display="flex"
                              alignItems="center"
                              justifyContent="space-between"
                              pb={4}
                           >
                              <ButtonGroup size="sm">
                                 <ChakraButton
                                    colorScheme="red"
                                    ref={initialFocusRef}
                                    disabled={isPending}
                                    isLoading={isPending}
                                    onClick={onDeleteTransactionClickHandler}
                                 >
                                    Yes, Delete
                                 </ChakraButton>
                              </ButtonGroup>
                           </PopoverFooter>
                        </PopoverContent>
                     </Popover>
                     {isTransactionModalOpen && (
                        <TransactionModal
                           type="edit"
                           initialTransaction={currentTransaction}
                           isOpen={isTransactionModalOpen}
                           onClose={onTransactionModalClose}
                           key={'transaction-edit-modal'}
                        />
                     )}
                  </div>
               )}
            </>
         );
      },
   }),
];

export default function TransactionsTable() {
   const { user } = useRouteLoaderData(
      'dashboardPage',
   ) as DashboardPageLoaderResponse;

   // ---------- States ----------
   const [search, setSearch] = useState<string>('');
   const [pagination, setPagination] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
   });

   // ---------- Queries ----------
   const {
      data: transactionsData,
      error,
      isLoading,
      refetch,
   } = getTransactionsQuery(user?.id || '');

   // ---------- Table ---------
   const reversedTransactionsData: Transaction[] =
      transactionsData?.reverse() || [];

   const table = useReactTable({
      data: reversedTransactionsData,
      columns: defaultColumns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onPaginationChange: setPagination,
      meta: {
         user,
      } as { user: User },
      state: {
         pagination,
      },
   });

   if (isLoading) {
      return (
         <div className="p-3">
            <Skeleton count={7} height={'100px'} />
         </div>
      );
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
      <div className="table-container flex flex-col gap-4">
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
            <Table variant="simple">
               <TableCaption>
                  Transactions List is like an stack, You can edit or delete
                  just the last one!
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
                                                  header.column.columnDef
                                                     .header,
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
      </div>
   );
}

const NoTransaction = () => {
   const { isOpen, onOpen, onClose } = useDisclosure();

   return (
      <>
         <div className="no-transaction grid place-content-center h-52 w-full">
            <div className="wrapper flex flex-col gap-6 items-center">
               <Heading as={'h4'}>No Transaction, Add a new one!</Heading>
               <Button onClickHandler={onOpen}>Add New Transaction</Button>
            </div>
         </div>

         <TransactionModal isOpen={isOpen} onClose={onClose} type="new" />
      </>
   );
};
