type Role = "ADMIN" | "USER";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}