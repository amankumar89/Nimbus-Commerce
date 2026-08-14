
interface AdminOrder extends Order {
  customerName: string;
  customerEmail: string;
}

interface AdminOrderListParams {
  page?: number;
  size?: number;
  status?: string;
  search?: string;
}