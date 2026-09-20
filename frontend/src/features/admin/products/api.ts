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
  const page = params.page ?? 1;
  const size = params.size ?? 10;
  const filtered =
    params.search && params.search.trim()
      ? products.filter((product) =>
        product.name.toLowerCase().includes(params.search!.toLowerCase()) ||
        product.brand.toLowerCase().includes(params.search!.toLowerCase())
      )
      : products;

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / size));
  const start = (page - 1) * size;

  return {
    items: filtered.slice(start, start + size),
    page,
    size,
    totalItems,
    totalPages,
  };
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