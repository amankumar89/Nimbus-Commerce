"use client";

import Link from "next/link";
import { IndianRupee, ShoppingBag, Users, Package, AlertTriangle } from "lucide-react";
import { useDashboardStats } from "@/features/admin/dashboard/hooks";
import StatCard from "@/components/admin/StatCard";
import Skeleton from "@/components/ui/Skeleton";

const STATUS_STYLES: Record<string, string> = {
  DELIVERED: "bg-success/10 text-success",
  SHIPPED: "bg-navy-100 text-navy-700 dark:bg-navy-800 dark:text-navy-300",
  OUT_FOR_DELIVERY: "bg-navy-100 text-navy-700 dark:bg-navy-800 dark:text-navy-300",
  PACKED: "bg-warning/10 text-warning",
  CONFIRMED: "bg-warning/10 text-warning",
  PENDING: "bg-(--color-surface) text-(--color-text-muted)",
};

export default function AdminDashboardPage() {
  const { data: stats, isLoading, isError } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full" />
          ))}
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (isError || !stats) {
    return <p className="text-sm text-danger">Could not load dashboard data.</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-(--color-text)">Dashboard</h1>
        <p className="mt-1 text-sm text-(--color-text-muted)">
          Overview of your store&apos;s performance
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Revenue"
          value={`₹${stats.totalRevenue.toLocaleString()}`}
          change={stats.revenueChange}
          icon={IndianRupee}
        />
        <StatCard
          label="Total Orders"
          value={stats.totalOrders.toLocaleString()}
          change={stats.ordersChange}
          icon={ShoppingBag}
        />
        <StatCard label="Customers" value={stats.totalCustomers.toLocaleString()} icon={Users} />
        <StatCard label="Products" value={stats.totalProducts.toLocaleString()} icon={Package} />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-(--color-border) bg-(--color-bg) p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-(--color-text)">Recent Orders</h2>
            <Link
              href="/admin/orders"
              className="text-xs font-medium text-navy-600 hover:text-navy-700 dark:text-navy-300"
            >
              View All
            </Link>
          </div>
          {stats.recentOrders.length === 0 ? (
            <p className="py-8 text-center text-sm text-(--color-text-muted)">No orders yet.</p>
          ) : (
            <div className="flex flex-col gap-1">
              {stats.recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between border-b border-(--color-border) py-3 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-(--color-text)">#{order.id}</p>
                    <p className="text-xs text-(--color-text-muted)">{order.customerName}</p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${STATUS_STYLES[order.status] ?? STATUS_STYLES.PENDING
                      }`}
                  >
                    {order.status.replace(/_/g, " ")}
                  </span>
                  <span className="text-sm font-semibold text-(--color-text)">
                    ₹{order.total.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="rounded-xl border border-(--color-border) bg-(--color-bg) p-5">
          <div className="mb-4 flex items-center gap-2">
            <AlertTriangle size={16} className="text-warning" />
            <h2 className="text-base font-semibold text-(--color-text)">Low Stock</h2>
          </div>
          {stats.lowStockProducts.length === 0 ? (
            <p className="py-6 text-center text-sm text-(--color-text-muted)">
              All products well stocked.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {stats.lowStockProducts.map((product) => (
                <Link
                  key={product.id}
                  href="/admin/products"
                  className="flex items-center justify-between text-sm hover:text-navy-600 dark:hover:text-navy-300"
                >
                  <span className="line-clamp-1 text-(--color-text)">{product.name}</span>
                  <span className="shrink-0 font-semibold text-warning">{product.stock} left</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}