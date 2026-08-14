import { products } from "@/data";
import axiosInstance from "@/lib/axios";

export type ProductPayload = Omit<Product, "id" | "rating" | "reviewCount">;

export async function getAdminProducts(
  params: ProductListParams
): Promise<PaginatedResponse<Product>> {
  // const { data } = await axiosInstance.get<PaginatedResponse<Product>>("/admin/products", {
  //   params,
  // });
  // return data;
  return { items: products };
}

export async function createProduct(payload: ProductPayload): Promise<Product> {
  const { data } = await axiosInstance.post<Product>("/admin/products", payload);
  return data;
}

export async function updateProduct(
  id: string,
  payload: Partial<ProductPayload>
): Promise<Product> {
  const { data } = await axiosInstance.patch<Product>(`/admin/products/${id}`, payload);
  return data;
}

export async function deleteProduct(id: string): Promise<void> {
  await axiosInstance.delete(`/admin/products/${id}`);
}