import { api } from "@/lib/axios";

export interface GetMonthCanceledOrdersResponse {
  amount: number;
  diffFromLastMonth: number;
}

export async function getMonthCanceledOrders() {
  const response = await api.get<GetMonthCanceledOrdersResponse>("/metrics/month-canceled-orders-amount");

  return response.data;
}