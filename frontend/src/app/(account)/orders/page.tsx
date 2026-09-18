"use client";

import Link from "next/link";
import { Package } from "lucide-react";
import { useOrders } from "@/features/orders/hooks";
import Skeleton from "@/components/ui/Skeleton";

const STATUS_STYLES: Record<string, string> = {
  DELIVERED: "bg-success/10 text-success",
  SHIPPED: "bg-navy-100 text-navy-700 dark:bg-navy-800 dark:text-navy-300",
  OUT_FOR_DELIVERY: "bg-navy-100 text-navy-700 dark:bg-navy-800 dark:text-navy-300",
  PACKED: "bg-warning/10 text-warning",
  CONFIRMED: "bg-warning/10 text-warning",
  PENDING: "bg-(--color-surface) text-(--color-text-muted)",
};

export default function OrderHistoryPage() {
  const { data: orders, isLoading, isError } = useOrders();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-(--color-text)">Order History</h1>
      {isLoading && (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      )}
      {isError && <p className="text-sm text-danger">Could not load orders.</p>}
      {!isLoading && orders && orders.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <Package size={32} className="text-(--color-text-muted)" />
          <p className="text-sm text-(--color-text-muted)">You haven&apos;t placed any orders yet.</p>
        </div>
      )}
      {orders && orders.length > 0 && (
        <div className="flex flex-col gap-3">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/track-order/${order.id}`}
              className="flex flex-col gap-3 rounded-xl border border-(--color-border) bg-(--color-bg) p-4 transition-colors hover:border-navy-500 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-(--color-text)">Order #{order.id}</p>
                <p className="text-xs text-(--color-text-muted)">
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  · {order.items.length} item{order.items.length > 1 ? "s" : ""}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[order.status] ?? STATUS_STYLES.PENDING
                    }`}
                >
                  {order.status.replace(/_/g, " ")}
                </span>
                <span className="text-sm font-semibold text-(--color-text)">
                  ₹{order.total.toLocaleString()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}