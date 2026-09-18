
interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  role: Role;
  enabled: boolean;
  createdAt: string;
  totalOrders: number;
  totalSpent: number;
}

interface AdminCustomerListParams {
  page?: number;
  size?: number;
  search?: string;
}