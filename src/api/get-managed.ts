import { api } from "@/lib/axios";

export type GetManagedRestaurantResponseProps = {
  id: string;
  name: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  description: string | null;
  managerId: string | null;
}

export async function getManagedRestaurant() {
    const response = await api.get<GetManagedRestaurantResponseProps>('/managed-restaurant');

    return response.data;
}