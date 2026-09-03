import { apiClient } from './client.js';
import type {
  CreateOrderRequest,
  CreateOrderResponse,
} from '@/types/order';

export function createOrder(
  data: CreateOrderRequest,
) {
  return apiClient<CreateOrderResponse>(
    '/orders',
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
  );
}