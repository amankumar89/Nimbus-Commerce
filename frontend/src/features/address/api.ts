import axiosInstance from "@/lib/axios";

export async function getAddresses(): Promise<Address[]> {
  const { data } = await axiosInstance.get<ApiResponse<Address[]>>("/addresses");
  return data.data;
}

export async function createAddress(payload: AddressPayload): Promise<Address> {
  const { data } = await axiosInstance.post<ApiResponse<Address>>("/addresses", payload);
  return data.data;
}

export async function setDefaultAddress(id: string): Promise<Address[]> {
  const { data } = await axiosInstance.patch<ApiResponse<Address[]>>(`/addresses/${id}/default`);
  return data.data;
}

export async function deleteAddress(id: string): Promise<Address[]> {
  const { data } = await axiosInstance.delete<ApiResponse<Address[]>>(`/addresses/${id}`);
  return data.data;
}