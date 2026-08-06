import axiosInstance from "@/lib/axios";

interface AuthResponse {
  accessToken: string;
  user: AuthUser;
}

export async function silentRefresh(): Promise<AuthResponse> {
  const { data } = await axiosInstance.post<AuthResponse>("/auth/refresh");
  return data;
}

export async function loginRequest(payload: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const { data } = await axiosInstance.post<AuthResponse>("/auth/login", payload);
  return data;
}

export async function registerRequest(payload: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const { data } = await axiosInstance.post<AuthResponse>("/auth/register", payload);
  return data;
}

export async function logoutRequest(): Promise<void> {
  await axiosInstance.post("/auth/logout");
}