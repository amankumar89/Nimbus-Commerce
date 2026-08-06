type Role = "ADMIN" | "CUSTOMER";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}