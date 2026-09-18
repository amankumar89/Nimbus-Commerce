import axiosInstance from "@/lib/axios";

export async function getMe(): Promise<AuthUser> {
  const { data } = await axiosInstance.get<AuthUser>("/users/me");
  return data;
}

export async function updateProfile(payload: {
  name: string;
  email: string;
}): Promise<AuthUser> {
  const { data } = await axiosInstance.patch<AuthUser>("/users/me", payload);
  return data;
}

export async function changePassword(payload: {
  currentPassword: string;
  newPassword: string;
}): Promise<{ success: boolean }> {
  const { data } = await axiosInstance.patch("/users/me/password", payload);
  return data;
}