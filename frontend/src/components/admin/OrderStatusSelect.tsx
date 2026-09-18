"use client";

import { useUpdateOrderStatus } from "@/features/admin/orders/hooks";

const STATUSES: Order["status"][] = [
  "PENDING",
  "CONFIRMED",
  "PACKED",
  "SHIPPED",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

const STATUS_STYLES: Record<string, string> = {
  DELIVERED: "bg-success/10 text-success border-success/30",
  SHIPPED: "bg-navy-100 text-navy-700 border-navy-300 dark:bg-navy-800 dark:text-navy-300",
  OUT_FOR_DELIVERY: "bg-navy-100 text-navy-700 border-navy-300 dark:bg-navy-800 dark:text-navy-300",
  PACKED: "bg-warning/10 text-warning border-warning/30",
  CONFIRMED: "bg-warning/10 text-warning border-warning/30",
  PENDING: "bg-(--color-surface) text-(--color-text-muted) border-(--color-border)",
};

export default function OrderStatusSelect({ orderId, status }: { orderId: string; status: Order["status"] }) {
  const updateStatus = useUpdateOrderStatus();

  return (
    <select
      value={status}
      disabled={updateStatus.isPending}
      onChange={(e) =>
        updateStatus.mutate({ id: orderId, status: e.target.value as Order["status"] })
      }
      className={`rounded-full border px-2.5 py-1 text-xs font-medium outline-none ${STATUS_STYLES[status] ?? STATUS_STYLES.PENDING
        }`}
    >
      {STATUSES.map((s) => (
        <option key={s} value={s} className="bg-(--color-bg) text-(--color-text)">
          {s.replace(/_/g, " ")}
        </option>
      ))}
    </select>
  );
}