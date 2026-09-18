import { useMutation, useQuery, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getAdminOrders, updateOrderStatus } from "./api";
import { AxiosError } from "axios";

export const adminOrderKeys = {
  all: ["admin", "orders"] as const,
  list: (params: AdminOrderListParams) => ["admin", "orders", "list", params] as const,
};

export function useAdminOrders(params: AdminOrderListParams) {
  return useQuery({
    queryKey: adminOrderKeys.list(params),
    queryFn: () => getAdminOrders(params),
    placeholderData: keepPreviousData,
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Order["status"] }) =>
      updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminOrderKeys.all });
      toast.success("Order status updated");
    },
    onError: (error: AxiosError<ApiResponse>) => {
      toast.error(error?.response?.data?.message ?? "Could not update order status");
    },
  });
}