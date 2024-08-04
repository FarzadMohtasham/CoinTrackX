import { InvalidateOptions } from "@tanstack/react-query"
import { queryClient } from '@Configs/ReactQuery/queryClient.tsx';

export const useInvalidateQuery = (queryKey: any) => {
   return (invalidateQueryProps: InvalidateOptions = {}) => {
      queryClient.invalidateQueries({
         queryKey: queryKey,
         ...invalidateQueryProps
      })
   }
}