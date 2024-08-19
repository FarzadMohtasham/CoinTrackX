import {
   QueryOptions,
   useMutation,
   UseMutationResult,
} from '@tanstack/react-query';
import { deleteTransactionAPI } from '@/services/apis/transactions/deleteTransaction.api';

export const deleteTransactionMutation = (
   id: number,
   user_id: string,
   mutationOptions?: QueryOptions,
): UseMutationResult => {
   return useMutation({
      queryFn: () => deleteTransactionAPI(id, user_id),
      ...mutationOptions,
   });
};
