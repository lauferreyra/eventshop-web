'use client';

import { useQuery } from '@tanstack/react-query';

import { getEvents } from '@/services/api/events';

export function useEvents() {
  return useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  });
}