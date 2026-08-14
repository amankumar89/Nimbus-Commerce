import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  applyCoupon,
  removeCoupon,
} from "./api";
import { useAppSelector } from "@/store/hooks";
import { AxiosError } from "axios";

export const cartKeys = {
  all: ["cart"] as const,
};

export function useCart() {
  const user = useAppSelector((state) => state.auth.user);
  const isAuthChecked = useAppSelector((state) => state.auth.isAuthChecked);

  return useQuery({
    queryKey: cartKeys.all,
    queryFn: getCart,
    // Only fetch once auth is resolved AND user is actually logged in
    enabled: isAuthChecked && !!user,
    staleTime: 30 * 1000,
  });
}

// Shared guard: redirects to login if guest tries a cart mutation
function useRequireAuth() {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();
  const pathname = usePathname();

  return () => {
    if (!user) {
      toast.error("Please sign in to continue");
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return false;
    }
    return true;
  };
}

export function useAddToCart() {
  const queryClient = useQueryClient();
  const requireAuth = useRequireAuth();

  const mutation = useMutation({
    mutationFn: addToCart,
    onSuccess: (updatedCart) => {
      queryClient.setQueryData(cartKeys.all, updatedCart);
      toast.success("Added to cart");
    },
    onError: (error: AxiosError<ApiResponse>) => {
      toast.error(error?.response?.data?.message ?? "Could not add item to cart");
    },
  });

  return {
    ...mutation,
    mutate: (payload: { productId: string; quantity: number }) => {
      if (!requireAuth()) return;
      mutation.mutate(payload);
    },
    mutateAsync: async (payload: { productId: string; quantity: number }) => {
      if (!requireAuth()) return;
      return mutation.mutateAsync(payload);
    },
  };
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCartItem,
    onSuccess: (updatedCart) => {
      queryClient.setQueryData(cartKeys.all, updatedCart);
    },
    onError: (error: AxiosError<ApiResponse>) => {
      toast.error(error?.response?.data?.message ?? "Could not update quantity");
    },
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeCartItem,
    onSuccess: (updatedCart) => {
      queryClient.setQueryData(cartKeys.all, updatedCart);
      toast.success("Item removed");
    },
    onError: (error: AxiosError<ApiResponse>) => {
      toast.error(error?.response?.data?.message ?? "Could not remove item");
    },
  });
}

export function useApplyCoupon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applyCoupon,
    onSuccess: (updatedCart) => {
      queryClient.setQueryData(cartKeys.all, updatedCart);
      toast.success("Coupon applied");
    },
    onError: (error: AxiosError<ApiResponse>) => {
      toast.error(error?.response?.data?.message ?? "Invalid coupon code");
    },
  });
}

export function useRemoveCoupon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeCoupon,
    onSuccess: (updatedCart) => {
      queryClient.setQueryData(cartKeys.all, updatedCart);
      toast.success("Coupon removed");
    },
  });
}