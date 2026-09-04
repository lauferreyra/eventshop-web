'use client';

import {
  useQuery,
} from '@tanstack/react-query';

import {
  getOrder,
} from '@/services/api/orders';

export function useOrder(
  id: string,
) {
  return useQuery({
    queryKey: ['order', id],

    queryFn: () =>
      getOrder(id),

    enabled: Boolean(id),

    refetchInterval: (query) => {
      const status =
        query.state.data?.status;

      if (
        status === 'COMPLETED' ||
        status === 'FAILED'
      ) {
        return false;
      }

      return 2000;
    },
  });
}