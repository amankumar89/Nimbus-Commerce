import axiosInstance from "@/lib/axios";

export async function getWishlist(): Promise<WishlistItem[]> {
  const { data } = await axiosInstance.get<WishlistItem[]>("/wishlist");
  return data;
}

export async function addToWishlist(productId: string): Promise<WishlistItem[]> {
  const { data } = await axiosInstance.post<WishlistItem[]>("/wishlist", { productId });
  return data;
}

export async function removeFromWishlist(productId: string): Promise<WishlistItem[]> {
  const { data } = await axiosInstance.delete<WishlistItem[]>(`/wishlist/${productId}`);
  return data;
}