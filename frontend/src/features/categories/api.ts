import axiosInstance from "@/lib/axios";

export async function getCategories(): Promise<Category[]> {
  const { data } = await axiosInstance.get<ApiResponse<Category[]>>("/categories");
  return data.data;
}

export async function createCategory(name: string): Promise<Category> {
  const { data } = await axiosInstance.post<ApiResponse<Category>>("/admin/categories", { name });
  return data.data;
}

export async function updateCategory(id: string, name: string): Promise<Category> {
  const { data } = await axiosInstance.patch<ApiResponse<Category>>(`/admin/categories/${id}`, { name });
  return data.data;
}

export async function deleteCategory(id: string): Promise<void> {
  await axiosInstance.delete(`/admin/categories/${id}`);
}