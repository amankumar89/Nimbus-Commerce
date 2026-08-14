"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

const SORT_OPTIONS = [
  { label: "Newest", sortBy: "createdAt", direction: "desc" },
  { label: "Price: Low to High", sortBy: "price", direction: "asc" },
  { label: "Price: High to Low", sortBy: "price", direction: "desc" },
  { label: "Rating", sortBy: "rating", direction: "desc" },
  { label: "Name: A-Z", sortBy: "name", direction: "asc" },
];

interface SortDropdownProps {
  sortBy?: string;
  direction?: string;
  onChange: (sortBy: string, direction: "asc" | "desc") => void;
}

export default function SortDropdown({ sortBy, direction, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeOption =
    SORT_OPTIONS.find((o) => o.sortBy === sortBy && o.direction === direction) ??
    SORT_OPTIONS[0];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-lg border border-(--color-border) bg-(--color-bg) px-3 py-2 text-sm font-medium text-[var(--color-text)] transition-colors hover:border-navy-500"
      >
        Sort: {activeOption.label}
        <ChevronDown size={14} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-11 z-20 w-56 overflow-hidden rounded-xl border border-(--color-border) bg-(--color-bg) py-1.5 shadow-xl shadow-navy-900/10">
          {SORT_OPTIONS.map((option) => {
            const isActive = option.sortBy === sortBy && option.direction === direction;
            return (
              <button
                key={option.label}
                onClick={() => {
                  onChange(option.sortBy, option.direction as "asc" | "desc");
                  setIsOpen(false);
                }}
                className="flex w-full items-center justify-between px-4 py-2 text-left text-sm text-(--color-text) transition-colors hover:bg-(--color-surface)"
              >
                {option.label}
                {isActive && <Check size={14} className="text-navy-600 dark:text-navy-300" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}