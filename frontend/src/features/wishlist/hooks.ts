import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import { getWishlist, addToWishlist, removeFromWishlist } from "./api";
import { useAppSelector } from "@/store/hooks";

export const wishlistKeys = {
  all: ["wishlist"] as const,
};

export function useWishlist() {
  const user = useAppSelector((state) => state.auth.user);
  const isAuthChecked = useAppSelector((state) => state.auth.isAuthChecked);

  return useQuery({
    queryKey: wishlistKeys.all,
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
  const { data: wishlist } = useWishlist();

  const addMutation = useMutation({
    mutationFn: addToWishlist,
    onSuccess: (data) => {
      queryClient.setQueryData(wishlistKeys.all, data);
      toast.success("Added to wishlist");
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: (data) => {
      queryClient.setQueryData(wishlistKeys.all, data);
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