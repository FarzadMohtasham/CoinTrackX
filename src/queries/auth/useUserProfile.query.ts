import { useQuery } from '@tanstack/react-query';

import { QueryOptions } from '@typings/Assets.api.type.ts';
import { getUserProfile } from '@/services/apis/auth/userProfile/getUserProfile.api';
import { UserProfile } from '@/libs/typings/auth/UserProfile.type';

const defaultOptions: QueryOptions = {
   staleTime: 1000 * 60 * 60,
   gcTime: 1000 * 60 * 60,
   retry: false,
   refetchOnWindowFocus: true,
   refetchOnReconnect: true,
};

type UseUserProfileResponse = {
   data: UserProfile | undefined;
   error: any;
   refetch: () => any;
   isLoading: boolean;
   isFetched: boolean;
};

export default function useUserProfile(
   options: QueryOptions = defaultOptions,
): UseUserProfileResponse {
   const queryOptions: QueryOptions = {
      ...defaultOptions,
      ...options,
   };

   const { data, error, refetch, isLoading, isFetched } = useQuery({
      queryKey: ['getUserProfile'],
      queryFn: () => getUserProfile(),
      staleTime: queryOptions.staleTime,
      gcTime: queryOptions.gcTime,
      retry: queryOptions.retry,
      refetchOnWindowFocus: queryOptions.refetchOnWindowFocus,
      refetchOnReconnect: queryOptions.refetchOnReconnect,
   });

   return { data, error, refetch, isLoading, isFetched };
}
