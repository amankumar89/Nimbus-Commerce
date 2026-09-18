"use client";

import { Truck, Zap } from "lucide-react";

export interface DeliveryOption {
  id: string;
  label: string;
  eta: string;
  price: number;
}

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  { id: "standard", label: "Standard Delivery", eta: "4-6 business days", price: 0 },
  { id: "express", label: "Express Delivery", eta: "1-2 business days", price: 99 },
];

interface DeliveryMethodProps {
  selected: string;
  onSelect: (id: string) => void;
}

export default function DeliveryMethod({ selected, onSelect }: DeliveryMethodProps) {
  return (
    <div className="flex flex-col gap-3">
      {DELIVERY_OPTIONS.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onSelect(option.id)}
          className={`flex items-center justify-between rounded-xl border p-4 text-left transition-colors ${selected === option.id
            ? "border-navy-600 bg-navy-50 dark:bg-navy-900/40"
            : "border-(--color-border) bg-(--color-bg) hover:border-navy-400"
            }`}
        >
          <div className="flex items-center gap-3">
            {option.id === "express" ? (
              <Zap size={16} className="text-navy-600 dark:text-navy-300" />
            ) : (
              <Truck size={16} className="text-navy-600 dark:text-navy-300" />
            )}
            <div>
              <p className="text-sm font-medium text-(--color-text)">{option.label}</p>
              <p className="text-xs text-(--color-text-muted)">{option.eta}</p>
            </div>
          </div>
          <span className="text-sm font-semibold text-(--color-text)">
            {option.price === 0 ? "Free" : `₹${option.price}`}
          </span>
        </button>
      ))}
    </div>
  );
}