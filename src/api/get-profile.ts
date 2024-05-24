import { api } from "@/lib/axios";

type GetProfileResponseProps = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: "manager" | "customer";
  createdAt: Date | null;
  updatedAt: Date | null;
}

export async function getProfile() {
    const response = await api.get<GetProfileResponseProps>('/me');

    return response.data;
}