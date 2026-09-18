"use client";

import { MapPin, Check } from "lucide-react";

interface AddressCardProps {
  address: Address;
  isSelected: boolean;
  onSelect: () => void;
}

export default function AddressCard({ address, isSelected, onSelect }: AddressCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full flex-col gap-1.5 rounded-xl border p-4 text-left transition-colors ${isSelected
        ? "border-navy-600 bg-navy-50 dark:bg-navy-900/40"
        : "border-(--color-border) bg-(--color-bg) hover:border-navy-400"
        }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <MapPin size={15} className="text-navy-600 dark:text-navy-300" />
          <span className="text-sm font-semibold text-(--color-text)">{address.fullName}</span>
          {address.isDefault && (
            <span className="rounded-full bg-navy-700 px-2 py-0.5 text-[10px] font-bold text-white">
              Default
            </span>
          )}
        </div>
        {isSelected && (
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy-700 text-white">
            <Check size={12} />
          </div>
        )}
      </div>
      <p className="text-xs text-(--color-text-muted)">
        {address.line1}
        {address.line2 ? `, ${address.line2}` : ""}, {address.city}, {address.state}{" "}
        {address.postalCode}, {address.country}
      </p>
      <p className="text-xs text-(--color-text-muted)">{address.phone}</p>
    </button>
  );
}