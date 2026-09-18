import { useMutation, useQuery, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getAdminProducts, createProduct, updateProduct, deleteProduct, ProductPayload } from "./api";
import { productKeys } from "@/features/products/hooks";
import { AxiosError } from "axios";

export const adminProductKeys = {
  all: ["admin", "products"] as const,
  list: (params: ProductListParams) => ["admin", "products", "list", params] as const,
};

export function useAdminProducts(params: ProductListParams) {
  return useQuery({
    queryKey: adminProductKeys.list(params),
    queryFn: () => getAdminProducts(params),
    placeholderData: keepPreviousData,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminProductKeys.all });
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      toast.success("Product created");
    },
    onError: (error: AxiosError<ApiResponse>) => {
      toast.error(error?.response?.data?.message ?? "Could not create product");
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<ProductPayload> }) =>
      updateProduct(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminProductKeys.all });
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      toast.success("Product updated");
    },
    onError: (error: AxiosError<ApiResponse>) => {
      toast.error(error?.response?.data?.message ?? "Could not update product");
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminProductKeys.all });
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      toast.success("Product deleted");
    },
    onError: (error: AxiosError<ApiResponse>) => {
      toast.error(error?.response?.data?.message ?? "Could not delete product");
    },
  });
}