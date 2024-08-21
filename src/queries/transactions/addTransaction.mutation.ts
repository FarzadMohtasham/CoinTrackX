import {
   QueryOptions,
   useMutation,
   UseMutationResult,
} from '@tanstack/react-query';
import { addNewTransactionAPI } from '@/services/apis/transactions/addTransaction.api';
import { Transaction } from '@/libs/typings/Transaction.type';

export const addTransactionMutation = (
   newTransactionInfo: Transaction,
   mutationOptions?: QueryOptions,
): UseMutationResult => {
   return useMutation({
      queryFn: () => addNewTransactionAPI(newTransactionInfo),
      ...mutationOptions,
   });
};
