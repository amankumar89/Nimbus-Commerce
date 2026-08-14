interface ApiResponse<T = never> {
  success: boolean;
  status: number;
  message: string;
  timestamp: string;
  data: T;
}

type LoginResponse = {
  accessToken: string;
  user: AuthUser;
};

type Role = "ADMIN" | "CUSTOMER";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}