import { QueryOptions, useQuery, UseQueryResult } from '@tanstack/react-query';
import { getTransactionsAPI } from '@services/apis/transactions/getTransactions.api';

export const getTransactionsQuery = (
   user_id: string,
   queryOptions?: QueryOptions,
): UseQueryResult => {
   return useQuery({
      queryKey: ['getTransactions'],
      queryFn: () => getTransactionsAPI(user_id),
      ...queryOptions,
   });
};
