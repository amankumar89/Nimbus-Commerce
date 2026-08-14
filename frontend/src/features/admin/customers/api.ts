import axiosInstance from "@/lib/axios";

export async function getAdminCustomers(
  params: AdminCustomerListParams
): Promise<PaginatedResponse<AdminCustomer>> {
  const { data } = await axiosInstance.get<PaginatedResponse<AdminCustomer>>(
    "/admin/customers",
    { params }
  );
  return data;
}

export async function toggleCustomerStatus(id: string): Promise<AdminCustomer> {
  const { data } = await axiosInstance.patch<AdminCustomer>(
    `/admin/customers/${id}/toggle-status`
  );
  return data;
}