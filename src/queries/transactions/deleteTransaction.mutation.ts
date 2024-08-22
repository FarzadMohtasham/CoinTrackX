import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from '@tanstack/react-query';
import { deleteTransactionAPI } from '@/services/apis/transactions/deleteTransaction.api';

export const deleteTransactionMutation = (
   user_id: string,
   id: number,
   mutationOptions?: UseMutationOptions,
): UseMutationResult<unknown, Error, void, unknown> => {
   return useMutation({
      mutationFn: () => deleteTransactionAPI(user_id, id),
      ...mutationOptions,
   });
};
