import {
   QueryOptions,
   useMutation,
   UseMutationResult,
} from '@tanstack/react-query';
import { updateTransactionAPI } from '@/services/apis/transactions/updateTransaction.api';
import { TransactionWithoutAutoAddedProps } from '@/libs/typings/Transaction.type';

export const deleteTransactionMutation = (
   id: number,
   user_id: string,
   updatedTransactionInfo: TransactionWithoutAutoAddedProps,
   mutationOptions?: QueryOptions,
): UseMutationResult => {
   return useMutation({
      queryFn: () => updateTransactionAPI(id, user_id, updatedTransactionInfo),
      ...mutationOptions,
   });
};
