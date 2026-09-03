export interface CreateOrderRequest {
  eventName: string;
  email: string;
  quantity: number;
}

export interface CreateOrderResponse {
  id: string;
  eventName: string;
  email: string;
  quantity: number;
  status: string;
}