import axiosInstance from "@/lib/axios";

export async function placeOrder(payload: PlaceOrderPayload): Promise<Order> {
  const { data } = await axiosInstance.post<Order>("/orders", payload);
  return data;
}

export async function getOrders(): Promise<Order[]> {
  const { data } = await axiosInstance.get<Order[]>("/orders");
  return data;
}

export async function getOrderById(id: string): Promise<Order> {
  const { data } = await axiosInstance.get<Order>(`/orders/${id}`);
  return data;
}