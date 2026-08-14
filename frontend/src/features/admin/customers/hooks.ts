import { useMutation, useQuery, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getAdminCustomers, toggleCustomerStatus } from "./api";
import { AxiosError } from "axios";

export const adminCustomerKeys = {
  all: ["admin", "customers"] as const,
  list: (params: AdminCustomerListParams) => ["admin", "customers", "list", params] as const,
};

export function useAdminCustomers(params: AdminCustomerListParams) {
  return useQuery({
    queryKey: adminCustomerKeys.list(params),
    queryFn: () => getAdminCustomers(params),
    placeholderData: keepPreviousData,
  });
}

export function useToggleCustomerStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleCustomerStatus,
    onSuccess: (customer) => {
      queryClient.invalidateQueries({ queryKey: adminCustomerKeys.all });
      toast.success(`${customer.name} ${customer.enabled ? "enabled" : "disabled"}`);
    },
    onError: (error: AxiosError<ApiResponse>) => {
      toast.error(error?.response?.data?.message ?? "Could not update customer status");
    },
  });
}