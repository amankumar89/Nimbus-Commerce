import { orders } from "@/data";
import axiosInstance from "@/lib/axios";

export async function getAdminOrders(
  params: AdminOrderListParams
): Promise<PaginatedResponse<AdminOrder>> {
  // const { data } = await axiosInstance.get<PaginatedResponse<AdminOrder>>("/admin/orders", {
  //   params,
  // });
  const list = orders.map((order, index) => ({
    ...order,
    customerName: `Customer ${index + 1}`,
    customerEmail: `customer${index + 1}@example.com`,
  }));

  const filtered =
    params.status && params.status !== "ALL"
      ? list.filter((order) => order.status === params.status)
      : list;

  const searched =
    params.search && params.search.trim()
      ? filtered.filter((order) =>
        order.id.toLowerCase().includes(params.search!.toLowerCase()) ||
        order.customerName.toLowerCase().includes(params.search!.toLowerCase())
      )
      : filtered;

  const page = params.page ?? 1;
  const size = params.size ?? Math.max(searched.length, 1);
  const totalItems = searched.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / size));
  const start = (page - 1) * size;

  return {
    items: searched.slice(start, start + size),
    page,
    size,
    totalItems,
    totalPages,
  };
  // return data;
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