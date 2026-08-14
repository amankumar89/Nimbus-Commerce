import axiosInstance from "@/lib/axios";

export async function silentRefresh(): Promise<ApiResponse<LoginResponse>> {
  console.log('tttthere');

  const { data } = await axiosInstance.post<ApiResponse<LoginResponse>>("/auth/refresh");
  return data;
}

export async function loginRequest(payload: {
  email: string;
  password: string;
}): Promise<ApiResponse<LoginResponse>> {
  const res = await axiosInstance.post<ApiResponse<LoginResponse>>("/auth/login", payload);
  return res.data;
}

export async function registerRequest(payload: {
  name: string;
  email: string;
  password: string;
  role: Role;
}): Promise<ApiResponse<LoginResponse>> {
  const res = await axiosInstance.post<ApiResponse<LoginResponse>>("/auth/register", payload);
  return res.data;
}

export async function logoutRequest(): Promise<void> {
  await axiosInstance.post("/auth/logout");
}

export async function forgotPasswordRequest(payload: {
  email: string;
}): Promise<{ message: string }> {
  const { data } = await axiosInstance.post<{ message: string }>(
    "/auth/forgot-password",
    payload
  );
  return data;
}

export async function resetPasswordRequest(payload: {
  token: string;
  password: string;
}): Promise<{ message: string }> {
  const { data } = await axiosInstance.post<{ message: string }>(
    "/auth/reset-password",
    payload
  );
  return data;
}