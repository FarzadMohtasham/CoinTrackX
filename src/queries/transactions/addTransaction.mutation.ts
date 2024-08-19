import {
   QueryOptions,
   useMutation,
   UseMutationResult,
} from '@tanstack/react-query';
import { addNewTransactionAPI } from '@/services/apis/transactions/addTransaction.api';
import { TransactionWithoutAutoAddedProps } from '@/libs/typings/Transaction.type';

export const addTransactionMutation = (
   newTransactionInfo: TransactionWithoutAutoAddedProps,
   mutationOptions?: QueryOptions,
): UseMutationResult => {
   return useMutation({
      queryFn: () => addNewTransactionAPI(newTransactionInfo),
      ...mutationOptions,
   });
};
