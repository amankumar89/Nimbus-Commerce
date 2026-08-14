/* eslint-disable @typescript-eslint/no-unused-vars */
import { products } from "@/data";
import axiosInstance from "@/lib/axios";

export async function getProducts(
  params: ProductListParams
): Promise<PaginatedResponse<Product>> {
  // const { data } = await axiosInstance.get<PaginatedResponse<Product>>("/products", {
  //   params,
  // });
  return { items: products, page: 1, size: 10, totalItems: products.length, totalPages: 3 };
}

export async function getProductById(id: string): Promise<Product> {
  // const { data } = await axiosInstance.get<Product>(`/products/${id}`);
  return products.find((item) => item.id === id) as Product;
  // return data;
}