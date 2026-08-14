"use client";

import { Check } from "lucide-react";

const SORT_OPTIONS = [
  { label: "Newest", sortBy: "createdAt", direction: "desc" },
  { label: "Price: Low to High", sortBy: "price", direction: "asc" },
  { label: "Price: High to Low", sortBy: "price", direction: "desc" },
  { label: "Rating", sortBy: "rating", direction: "desc" },
  { label: "Name: A-Z", sortBy: "name", direction: "asc" },
];

interface SortModalContentProps {
  sortBy?: string;
  direction?: string;
  onSelect: (sortBy: string, direction: "asc" | "desc") => void;
}

export default function SortModalContent({ sortBy, direction, onSelect }: SortModalContentProps) {
  return (
    <div className="flex flex-col gap-1">
      {SORT_OPTIONS.map((option) => {
        const isActive = option.sortBy === sortBy && option.direction === direction;
        return (
          <button
            key={option.label}
            onClick={() => onSelect(option.sortBy, option.direction as "asc" | "desc")}
            className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${isActive
              ? "bg-navy-50 font-semibold text-navy-700 dark:bg-navy-800 dark:text-navy-200"
              : "text-(--color-text) hover:bg-(--color-surface)"
              }`}
          >
            {option.label}
            {isActive && <Check size={16} />}
          </button>
        );
      })}
    </div>
  );
}