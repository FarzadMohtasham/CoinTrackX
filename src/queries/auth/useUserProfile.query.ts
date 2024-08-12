import { useQuery } from '@tanstack/react-query';

import { QueryOptions } from '@typings/Assets.api.type.ts';
import { CreditDebitCard } from '@typings/components/CreditDebitCard.type.ts';
import { getUserProfile } from '@/services/apis/auth/userProfile/getUserProfile.api';

const defaultOptions: QueryOptions = {
   staleTime: 1000 * 60 * 60,
   gcTime: 1000 * 60 * 60,
   retry: false,
   refetchOnWindowFocus: true,
   refetchOnReconnect: true,
};

export default function useGetCreditDebitCardsQuery(
   options: QueryOptions = defaultOptions,
) {
   const queryOptions: QueryOptions = {
      ...defaultOptions,
      ...options,
   };

   const {
      data,
      error,
      refetch,
      isLoading,
   }: {
      data: CreditDebitCard[] | any;
      error: any;
      refetch: any;
      isLoading: any;
   } = useQuery({
      queryKey: ['getUserProfile'],
      queryFn: () => getUserProfile(),
      staleTime: queryOptions.staleTime,
      gcTime: queryOptions.gcTime,
      retry: queryOptions.retry,
      refetchOnWindowFocus: queryOptions.refetchOnWindowFocus,
      refetchOnReconnect: queryOptions.refetchOnReconnect,
   });

   return { creditDebitCards: data, error, refetch, isLoading };
}
