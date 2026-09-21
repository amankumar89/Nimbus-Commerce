import axiosInstance from "@/lib/axios";

export async function getProducts(
  params: ProductListParams
): Promise<PaginatedResponse<Product>> {
  const { data } = await axiosInstance.get<ApiResponse<PaginatedResponse<Product>>>(
    "/products",
    { params }
  );
  return data.data;
}

export async function getProductById(id: string): Promise<Product> {
  const { data } = await axiosInstance.get<ApiResponse<Product>>(`/products/${id}`);
  return data.data;
}