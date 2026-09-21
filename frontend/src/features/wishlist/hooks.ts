import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import { getWishlist, addToWishlist, removeFromWishlist } from "./api";
import { addToCart } from "@/features/cart/api";
import { cartKeys } from "@/features/cart/hooks";
import { useAppSelector } from "@/store/hooks";

export const wishlistKeys = {
  forUser: (userId: string) => ["wishlist", userId] as const,
};

export function useWishlist() {
  const user = useAppSelector((state) => state.auth.user);
  const isAuthChecked = useAppSelector((state) => state.auth.isAuthChecked);

  return useQuery({
    queryKey: wishlistKeys.forUser(user?.id ?? "anonymous"),
    queryFn: getWishlist,
    enabled: isAuthChecked && !!user,
    staleTime: 30 * 1000,
  });
}

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

export function useToggleWishlist() {
  const queryClient = useQueryClient();
  const requireAuth = useRequireAuth();
  const user = useAppSelector((state) => state.auth.user);
  const { data: wishlist } = useWishlist();

  const addMutation = useMutation({
    mutationFn: addToWishlist,
    onSuccess: (data) => {
      if (user) queryClient.setQueryData(wishlistKeys.forUser(user.id), data);
      toast.success("Added to wishlist");
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: (data) => {
      if (user) queryClient.setQueryData(wishlistKeys.forUser(user.id), data);
      toast.success("Removed from wishlist");
    },
  });

  const isInWishlist = (productId: string) =>
    !!wishlist?.some((item) => item.productId === productId);

  const toggle = (productId: string) => {
    if (!requireAuth()) return;
    if (isInWishlist(productId)) {
      removeMutation.mutate(productId);
    } else {
      addMutation.mutate(productId);
    }
  };

  return { toggle, isInWishlist, isPending: addMutation.isPending || removeMutation.isPending };
}

export function useMoveWishlistToCart() {
  const queryClient = useQueryClient();
  const requireAuth = useRequireAuth();
  const user = useAppSelector((state) => state.auth.user);

  const mutation = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
      const cart = await addToCart({ productId, quantity });
      const wishlist = await removeFromWishlist(productId);
      return { cart, wishlist };
    },
    onSuccess: ({ cart, wishlist }) => {
      if (!user) return;
      queryClient.setQueryData(cartKeys.forUser(user.id), cart);
      queryClient.setQueryData(wishlistKeys.forUser(user.id), wishlist);
      toast.success("Moved to cart");
    },
    onError: () => {
      toast.error("Could not move item to cart");
    },
  });

  return {
    ...mutation,
    mutate: (payload: { productId: string; quantity: number }) => {
      if (!requireAuth()) return;
      mutation.mutate(payload);
    },
  };
}