import { api } from "@/lib/axios";

export interface DeliveredOrderParams {
  orderId: string;
}

export async function deliverOrder({orderId}: DeliveredOrderParams) {
  await api.patch(`/orders/${orderId}/deliver`);
}