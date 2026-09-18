"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useAdminCustomers } from "@/features/admin/customers/hooks";
import CustomerStatusToggle from "@/components/admin/CustomerStatusToggle";
import Avatar from "@/components/ui/Avatar";
import Pagination from "@/components/ui/Pagination";
import Skeleton from "@/components/ui/Skeleton";

export default function AdminCustomersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useAdminCustomers({ page, size: 10, search: search || undefined });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-(--color-text)">Manage Customers</h1>
      <div className="mb-4 relative max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-muted)" />
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search by name or email…"
          className="w-full rounded-lg border border-(--color-border) bg-(--color-bg) py-2 pl-9 pr-4 text-sm outline-none focus:border-navy-500"
        />
      </div>
      <div className="overflow-x-auto rounded-xl border border-(--color-border) bg-(--color-bg)">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-(--color-border) bg-(--color-surface) text-left">
              <th className="px-4 py-3 font-medium text-(--color-text-muted)">Customer</th>
              <th className="px-4 py-3 font-medium text-(--color-text-muted)">Joined</th>
              <th className="px-4 py-3 font-medium text-(--color-text-muted)">Orders</th>
              <th className="px-4 py-3 font-medium text-(--color-text-muted)">Total Spent</th>
              <th className="px-4 py-3 font-medium text-(--color-text-muted)">Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading &&
              Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="border-b border-(--color-border) last:border-0">
                  <td className="px-4 py-3" colSpan={5}>
                    <Skeleton className="h-10 w-full" />
                  </td>
                </tr>
              ))}
            {!isLoading &&
              data?.items.map((customer) => (
                <tr key={customer.id} className="border-b border-(--color-border) last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={customer.name} />
                      <div>
                        <p className="font-medium text-(--color-text)">{customer.name}</p>
                        <p className="text-xs text-(--color-text-muted)">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-(--color-text-muted)">
                    {new Date(customer.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3 text-(--color-text)">{customer.totalOrders}</td>
                  <td className="px-4 py-3 font-semibold text-(--color-text)">
                    ₹{customer.totalSpent.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <CustomerStatusToggle customerId={customer.id} enabled={customer.enabled} />
                      <span
                        className={`text-xs font-medium ${customer.enabled ? "text-success" : "text-(--color-text-muted)"
                          }`}
                      >
                        {customer.enabled ? "Active" : "Disabled"}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            {!isLoading && data?.items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-(--color-text-muted)">
                  No customers found.
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