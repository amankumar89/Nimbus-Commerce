"use client";

import { CreditCard, Smartphone, Landmark, Banknote } from "lucide-react";

const METHODS: { id: PaymentMethod; label: string; icon: typeof CreditCard }[] = [
  { id: "CARD", label: "Credit / Debit Card", icon: CreditCard },
  { id: "UPI", label: "UPI", icon: Smartphone },
  { id: "NETBANKING", label: "Net Banking", icon: Landmark },
  { id: "COD", label: "Cash on Delivery", icon: Banknote },
];

interface PaymentMethodSelectorProps {
  selected: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}

export default function PaymentMethodSelector({ selected, onSelect }: PaymentMethodSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {METHODS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => onSelect(id)}
          className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-colors ${selected === id
            ? "border-navy-600 bg-navy-50 dark:bg-navy-900/40"
            : "border-(--color-border) bg-(--color-bg) hover:border-navy-400"
            }`}
        >
          <Icon
            size={20}
            className={selected === id ? "text-navy-700 dark:text-navy-300" : "text-(--color-text-muted)"}
          />
          <span className="text-xs font-medium text-(--color-text)">{label}</span>
        </button>
      ))}
    </div>
  );
}