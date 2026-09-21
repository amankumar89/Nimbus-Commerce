import axiosInstance from "@/lib/axios";

export type ProductPayload = Omit<Product, "id" | "rating" | "reviewCount">;

export async function getAdminProducts(
  params: ProductListParams
): Promise<PaginatedResponse<Product>> {
  const { data } = await axiosInstance.get<ApiResponse<PaginatedResponse<Product>>>(
    "/admin/products",
    { params }
  );
  return data.data;
}

export async function createProduct(payload: ProductPayload): Promise<Product> {
  const { data } = await axiosInstance.post<ApiResponse<Product>>("/admin/products", payload);
  return data.data;
}

export async function updateProduct(
  id: string,
  payload: Partial<ProductPayload>
): Promise<Product> {
  const { data } = await axiosInstance.patch<ApiResponse<Product>>(`/admin/products/${id}`, payload);
  return data.data;
}

export async function deleteProduct(id: string): Promise<void> {
  await axiosInstance.delete(`/admin/products/${id}`);
}