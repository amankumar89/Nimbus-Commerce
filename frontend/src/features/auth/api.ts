import axiosInstance from "@/lib/axios";

// interface ApiResponse {
//   accessToken: string;
//   user: AuthUser;
// }

export async function silentRefresh(): Promise<LoginResponse> {
  console.log('silentrefresh');

  const { data } = await axiosInstance.post<LoginResponse>("/auth/refresh");
  return data;
}

export async function loginRequest(payload: {
  email: string;
  password: string;
}): Promise<LoginResponse> {
  const { data } = await axiosInstance.post<LoginResponse>("/auth/login", payload);
  return data;
}

export async function registerRequest(payload: {
  name: string;
  email: string;
  password: string;
  role: Role;
}): Promise<ApiResponse<AuthUser>> {
  const { data } = await axiosInstance.post<ApiResponse<AuthUser>>("/auth/register", payload);
  return data;
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