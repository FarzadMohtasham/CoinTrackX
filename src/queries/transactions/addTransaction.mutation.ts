import {
   MutateOptions,
   useMutation,
   UseMutationResult,
} from '@tanstack/react-query';
import { addNewTransactionAPI } from '@/services/apis/transactions/addTransaction.api';
import { Transaction } from '@/libs/typings/Transaction.type';
import { useRouteLoaderData } from 'react-router-dom';
import { DashboardPageLoaderResponse } from '@/layouts/Dashboard.layout';

export const addTransactionMutation = (
   newTransactionInfo: Transaction,
   mutationOptions?: MutateOptions,
): UseMutationResult<Transaction, Error, void, unknown> => {
   const { user } = useRouteLoaderData(
      'dashboardPage',
   ) as DashboardPageLoaderResponse;

   return useMutation({
      mutationFn: () =>
         addNewTransactionAPI({ ...newTransactionInfo, email: user?.email }),
      ...mutationOptions,
   });
};
