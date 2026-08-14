import axiosInstance from "@/lib/axios";

export async function getAdminOrders(
  params: AdminOrderListParams
): Promise<PaginatedResponse<AdminOrder>> {
  const { data } = await axiosInstance.get<PaginatedResponse<AdminOrder>>("/admin/orders", {
    params,
  });
  return data;
}

export async function updateOrderStatus(
  id: string,
  status: Order["status"]
): Promise<AdminOrder> {
  const { data } = await axiosInstance.patch<AdminOrder>(`/admin/orders/${id}/status`, {
    status,
  });
  return data;
}