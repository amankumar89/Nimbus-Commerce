import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getAddresses, createAddress, setDefaultAddress, deleteAddress } from "./api";
import { AxiosError } from "axios";

export const addressKeys = { all: ["addresses"] as const };

export function useAddresses() {
  return useQuery({
    queryKey: addressKeys.all,
    queryFn: getAddresses,
    staleTime: 60 * 1000,
  });
}

export function useCreateAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: addressKeys.all });
      toast.success("Address added");
    },
    onError: (error: AxiosError<ApiResponse>) => {
      toast.error(error?.response?.data?.message ?? "Could not add address");
    },
  });
}

export function useSetDefaultAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: setDefaultAddress,
    onSuccess: (data) => {
      queryClient.setQueryData(addressKeys.all, data);
    },
  });
}

export function useDeleteAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAddress,
    onSuccess: (data) => {
      queryClient.setQueryData(addressKeys.all, data);
      toast.success("Address removed");
    },
  });
}