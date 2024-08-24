import {
   MutateOptions,
   useMutation,
   UseMutationResult,
} from '@tanstack/react-query';
import { updateTransactionAPI } from '@/services/apis/transactions/updateTransaction.api';
import { Transaction } from '@/libs/typings/Transaction.type';
import { DashboardPageLoaderResponse } from '@/layouts/Dashboard.layout';
import { useRouteLoaderData } from 'react-router-dom';

export const updateTransactionMutation = (
   id: number,
   updatedTransactionInfo: Transaction,
   mutationOptions?: MutateOptions,
): UseMutationResult<Transaction, Error, void, unknown> => {
   const { user } = useRouteLoaderData(
      'dashboardPage',
   ) as DashboardPageLoaderResponse;

   return useMutation({
      mutationFn: () =>
         updateTransactionAPI(user?.id || '', id, updatedTransactionInfo),
      ...mutationOptions,
   });
};
