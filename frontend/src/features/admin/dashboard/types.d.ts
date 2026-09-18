interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  revenueChange: number;
  ordersChange: number;
  recentOrders: (Order & { customerName: string })[];
  lowStockProducts: Product[];
}