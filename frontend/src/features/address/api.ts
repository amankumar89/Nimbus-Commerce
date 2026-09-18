import axiosInstance from "@/lib/axios";

export async function getAddresses(): Promise<Address[]> {
  const { data } = await axiosInstance.get<Address[]>("/addresses");
  return data;
}

export async function createAddress(payload: AddressPayload): Promise<Address> {
  const { data } = await axiosInstance.post<Address>("/addresses", payload);
  return data;
}

export async function setDefaultAddress(id: string): Promise<Address[]> {
  const { data } = await axiosInstance.patch<Address[]>(`/addresses/${id}/default`);
  return data;
}

export async function deleteAddress(id: string): Promise<Address[]> {
  const { data } = await axiosInstance.delete<Address[]>(`/addresses/${id}`);
  return data;
}