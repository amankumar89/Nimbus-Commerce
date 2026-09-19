import axiosInstance from "@/lib/axios";

export async function getMe(): Promise<AuthUser> {
  const { data } = await axiosInstance.get<ApiResponse<AuthUser>>("/users/me");
  return data.data;
}

export async function updateProfile(payload: {
  name: string;
  email: string;
}): Promise<AuthUser> {
  const { data } = await axiosInstance.patch<ApiResponse<AuthUser>>("/users/me", payload);
  return data.data;
}

export async function changePassword(payload: {
  currentPassword: string;
  newPassword: string;
}): Promise<{ success: boolean }> {
  const { data } = await axiosInstance.patch<ApiResponse<void>>("/auth/change-password", payload);
  return data;
}