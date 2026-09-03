'use client';

import { useQuery } from '@tanstack/react-query';

import { getEvent } from '@/services/api/events';

export function useEvent(name: string) {
  return useQuery({
    queryKey: ['event', name],
    queryFn: () => getEvent(name),
    enabled: Boolean(name),
  });
}