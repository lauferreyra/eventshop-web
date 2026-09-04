import { apiClient } from './client';

export type CreateOrderInput = {
  eventName: string;
  email: string;
  quantity: number;
};

export type Order = {
  id: string;
  eventName: string;
  email: string;
  quantity: number;
  status:
    | 'PENDING'
    | 'RESERVED'
    | 'COMPLETED'
    | 'FAILED';
  createdAt?: string;
  updatedAt?: string;
};

export async function createOrder(
  data: CreateOrderInput,
) {
  return apiClient<Order>(
    '/orders',
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
  );
}

export async function getOrder(
  id: string,
): Promise<Order> {
  return apiClient<Order>(
    `/orders/${encodeURIComponent(id)}`,
  );
}