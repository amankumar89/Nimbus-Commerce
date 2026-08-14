"use client";

const CATEGORIES = ["Electronics", "Fashion", "Home & Kitchen", "Beauty", "Sports", "Books"];

interface ProductFiltersProps {
  category?: string;
  minPrice: string;
  maxPrice: string;
  onCategoryChange: (category: string | undefined) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
}

export default function ProductFilters({
  category,
  minPrice,
  maxPrice,
  onCategoryChange,
  onMinPriceChange,
  onMaxPriceChange,
}: ProductFiltersProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-(--color-text)">Category</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryChange(undefined)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${!category
              ? "border-navy-700 bg-navy-700 text-white"
              : "border-(--color-border) text-(--color-text-muted) hover:border-navy-500"
              }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${category === cat
                ? "border-navy-700 bg-navy-700 text-white"
                : "border-(--color-border) text-(--color-text-muted) hover:border-navy-500"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-(--color-text)">Price Range</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            className="w-full rounded-lg border border-(--color-border) bg-(--color-bg) px-2.5 py-2 text-sm outline-none focus:border-navy-500"
          />
          <span className="text-(--color-text-muted)">–</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            className="w-full rounded-lg border border-(--color-border) bg-(--color-bg) px-2.5 py-2 text-sm outline-none focus:border-navy-500"
          />
        </div>
      </div>
    </div>
  );
}