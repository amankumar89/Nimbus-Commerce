import axiosInstance from "@/lib/axios";

export async function getCart(): Promise<Cart> {
  const { data } = await axiosInstance.get<Cart>("/cart");
  return data;
}

export async function addToCart(payload: {
  productId: string;
  quantity: number;
}): Promise<Cart> {
  const { data } = await axiosInstance.post<Cart>("/cart/items", payload);
  return data;
}

export async function updateCartItem(payload: {
  itemId: string;
  quantity: number;
}): Promise<Cart> {
  const { data } = await axiosInstance.patch<Cart>(
    `/cart/items/${payload.itemId}`,
    { quantity: payload.quantity }
  );
  return data;
}

export async function removeCartItem(itemId: string): Promise<Cart> {
  const { data } = await axiosInstance.delete<Cart>(`/cart/items/${itemId}`);
  return data;
}

export async function applyCoupon(code: string): Promise<Cart> {
  const { data } = await axiosInstance.post<Cart>("/cart/coupon", { code });
  return data;
}

export async function removeCoupon(): Promise<Cart> {
  const { data } = await axiosInstance.delete<Cart>("/cart/coupon");
  return data;
}