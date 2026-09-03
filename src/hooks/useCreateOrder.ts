'use client';

import { useMutation } from '@tanstack/react-query';

import { createOrder } from '@/services/api/orders';

export function useCreateOrder() {
  return useMutation({
    mutationFn: createOrder,
  });
}