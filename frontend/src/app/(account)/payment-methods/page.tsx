"use client";

import { CreditCard } from "lucide-react";

export default function PaymentMethodsPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-(--color-text)">Payment Methods</h1>

      <div className="flex flex-col items-center gap-3 rounded-xl border border-(--color-border) bg-(--color-bg) p-12 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-(--color-surface)">
          <CreditCard size={24} className="text-(--color-text-muted)" />
        </div>
        <p className="text-sm font-medium text-(--color-text)">No saved payment methods</p>
        <p className="max-w-xs text-xs text-(--color-text-muted)">
          Saved cards will appear here after your first payment gateway integration is complete.
        </p>
      </div>
    </div>
  );
}