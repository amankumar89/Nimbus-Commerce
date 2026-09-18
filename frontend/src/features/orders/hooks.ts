import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { placeOrder, getOrders, getOrderById } from "./api";
import { cartKeys } from "@/features/cart/hooks";
import { AxiosError } from "axios";

export const orderKeys = {
  all: ["orders"] as const,
  detail: (id: string) => ["orders", "detail", id] as const,
};

export function usePlaceOrder() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: placeOrder,
    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all }); // cart is now empty
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
      toast.success("Order placed successfully!");
      router.push(`/order-confirmation/${order.id}`);
    },
    onError: (error: AxiosError<ApiResponse>) => {
      toast.error(error?.response?.data?.message ?? "Could not place order. Please try again.");
    },
  });
}

export function useOrders() {
  return useQuery({
    queryKey: orderKeys.all,
    queryFn: getOrders,
  });
}

export function useOrderDetail(id: string) {
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: () => getOrderById(id),
    enabled: !!id,
  });
}