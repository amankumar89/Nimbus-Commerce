"use client";

import { useToggleCustomerStatus } from "@/features/admin/customers/hooks";

export default function CustomerStatusToggle({
  customerId,
  enabled,
}: {
  customerId: string;
  enabled: boolean;
}) {
  const toggleStatus = useToggleCustomerStatus();

  return (
    <button
      onClick={() => toggleStatus.mutate(customerId)}
      disabled={toggleStatus.isPending}
      className={`relative h-5 w-9 shrink-0 rounded-full transition-colors disabled:opacity-50 ${enabled ? "bg-success" : "bg-(--color-border)"
        }`}
      aria-label={enabled ? "Disable customer" : "Enable customer"}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${enabled ? "translate-x-4.5" : "translate-x-0.5"
          }`}
      />
    </button>
  );
}