import { QueryOptions, useQuery, UseQueryResult } from '@tanstack/react-query';
import { getTransactionsAPI } from '@services/apis/transactions/getTransactions.api';
import { Transaction } from '@/libs/typings/Transaction.type';

export const getTransactionsQuery = (
   user_id: string,
   queryOptions?: QueryOptions,
): UseQueryResult<Transaction[], Error> => {
   return useQuery({
      queryKey: ['getTransactions'],
      queryFn: () => getTransactionsAPI(user_id),
      ...queryOptions,
   });
};
