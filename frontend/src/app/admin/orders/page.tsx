"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import { useAdminOrders } from "@/features/admin/orders/hooks";
import OrderStatusSelect from "@/components/admin/OrderStatusSelect";
import Pagination from "@/components/ui/Pagination";
import Skeleton from "@/components/ui/Skeleton";

const STATUS_FILTERS = [
  "ALL",
  "PENDING",
  "CONFIRMED",
  "PACKED",
  "SHIPPED",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

export default function AdminOrdersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const { data, isLoading } = useAdminOrders({
    page,
    size: 10,
    search: search || undefined,
    status: statusFilter === "ALL" ? undefined : statusFilter,
  });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-(--color-text)">Manage Orders</h1>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-muted)" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by order ID or customer…"
            className="w-full rounded-lg border border-(--color-border) bg-(--color-bg) py-2 pl-9 pr-4 text-sm outline-none focus:border-navy-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((status) => (
            <button
              key={status}
              onClick={() => {
                setStatusFilter(status);
                setPage(1);
              }}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${statusFilter === status
                ? "border-navy-700 bg-navy-700 text-white"
                : "border-(--color-border) text-(--color-text-muted) hover:border-navy-500"
                }`}
            >
              {status === "ALL" ? "All" : status.replace(/_/g, " ")}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-(--color-border) bg-(--color-bg)">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-(--color-border) bg-(--color-surface) text-left">
              <th className="px-4 py-3 font-medium text-(--color-text-muted)">Order ID</th>
              <th className="px-4 py-3 font-medium text-(--color-text-muted)">Customer</th>
              <th className="px-4 py-3 font-medium text-(--color-text-muted)">Date</th>
              <th className="px-4 py-3 font-medium text-(--color-text-muted)">Total</th>
              <th className="px-4 py-3 font-medium text-(--color-text-muted)">Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading &&
              Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="border-b border-(--color-border) last:border-0">
                  <td className="px-4 py-3" colSpan={5}>
                    <Skeleton className="h-8 w-full" />
                  </td>
                </tr>
              ))}

            {!isLoading &&
              data?.items.map((order) => (
                <tr key={order.id} className="border-b border-(--color-border) last:border-0">
                  <td className="px-4 py-3">
                    <Link
                      href={`/track-order/${order.id}`}
                      className="font-medium text-navy-600 hover:underline dark:text-navy-300"
                    >
                      #{order.id}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-(--color-text)">{order.customerName}</p>
                    <p className="text-xs text-(--color-text-muted)">{order.customerEmail}</p>
                  </td>
                  <td className="px-4 py-3 text-(--color-text-muted)">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3 font-semibold text-(--color-text)">
                    ₹{order.total.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <OrderStatusSelect orderId={order.id} status={order.status} />
                  </td>
                </tr>
              ))}

            {!isLoading && data?.items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-(--color-text-muted)">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {data && data.totalPages > 1 && (
        <div className="mt-6">
          <Pagination currentPage={page} totalPages={data.totalPages} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
}