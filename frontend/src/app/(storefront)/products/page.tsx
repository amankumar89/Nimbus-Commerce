"use client";

import { Suspense, useState } from "react";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { useProducts } from "@/features/products/hooks";
import { useQueryParamsState } from "@/hooks/useQueryParamsState";
import ProductCard from "@/components/product/ProductCard";
import ProductCardSkeleton from "@/components/product/ProductCardSkeleton";
import ProductFilters from "@/components/product/ProductFilters";
import SortModalContent from "@/components/product/SortModalContent";
import Pagination from "@/components/ui/Pagination";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

function ProductListPageContent() {
  const { params, setParam } = useQueryParamsState();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  // local draft state for filters, applied only on "Apply" click
  const [draftMin, setDraftMin] = useState(params.minPrice ?? "");
  const [draftMax, setDraftMax] = useState(params.maxPrice ?? "");
  const [draftCategory, setDraftCategory] = useState<string | undefined>(params.category);

  const page = Number(params.page ?? 1);
  const size = 12;

  const { data, isLoading, isError } = useProducts({
    page,
    size,
    sortBy: params.sortBy ?? "createdAt",
    direction: (params.direction as "asc" | "desc") ?? "desc",
    category: params.category,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
  });

  const activeFilterCount = [params.category, params.minPrice, params.maxPrice].filter(
    Boolean
  ).length;

  const openFilterModal = () => {
    setDraftMin(params.minPrice ?? "");
    setDraftMax(params.maxPrice ?? "");
    setDraftCategory(params.category);
    setIsFilterOpen(true);
  };

  const applyFilters = () => {
    setParam("category", draftCategory);
    setParam("minPrice", draftMin || undefined);
    setParam("maxPrice", draftMax || undefined);
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    setDraftMin("");
    setDraftMax("");
    setDraftCategory(undefined);
    setParam("category", undefined);
    setParam("minPrice", undefined);
    setParam("maxPrice", undefined);
    setIsFilterOpen(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-(--color-text)">
        {params.category ?? "All Products"}
      </h1>
      <div className="mb-6 flex items-center justify-between border-b border-(--color-border) pb-4">
        <p className="text-sm text-(--color-text-muted)">
          {isLoading ? "Loading…" : `${data?.totalItems ?? 0} products found`}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={openFilterModal}
            className="flex items-center gap-2 rounded-lg border border-(--color-border) bg-(--color-bg) px-3.5 py-2 text-sm font-medium text-(--color-text) transition-colors hover:border-navy-500"
          >
            <SlidersHorizontal size={15} />
            Filter
            {activeFilterCount > 0 && (
              <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-navy-700 text-[10px] font-bold text-white">
                {activeFilterCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsSortOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-(--color-border) bg-(--color-bg) px-3.5 py-2 text-sm font-medium text-(--color-text) transition-colors hover:border-navy-500"
          >
            <ArrowUpDown size={15} />
            Sort
          </button>
        </div>
      </div>
      {isError && (
        <div className="rounded-xl border border-danger/20 bg-danger/5 p-8 text-center text-sm text-danger">
          Something went wrong loading products. Please try again.
        </div>
      )}
      {!isError && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
          {isLoading
            ? Array.from({ length: size }).map((_, i) => <ProductCardSkeleton key={i} />)
            : data?.items.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
      {!isLoading && data?.items.length === 0 && (
        <div className="rounded-xl border border-(--color-border) p-12 text-center">
          <p className="text-sm text-(--color-text-muted)">
            No products match your filters.
          </p>
        </div>
      )}
      {data && data.totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={(p) => setParam("page", p)}
          />
        </div>
      )}
      <Modal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        title="Filter Products"
        footer={
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={clearFilters}>
              Clear All
            </Button>
            <Button variant="primary" className="flex-1" onClick={applyFilters}>
              Apply
            </Button>
          </div>
        }
      >
        <ProductFilters
          category={draftCategory}
          minPrice={draftMin}
          maxPrice={draftMax}
          onCategoryChange={setDraftCategory}
          onMinPriceChange={setDraftMin}
          onMaxPriceChange={setDraftMax}
        />
      </Modal>
      <Modal isOpen={isSortOpen} onClose={() => setIsSortOpen(false)} title="Sort By">
        <SortModalContent
          sortBy={params.sortBy}
          direction={params.direction}
          onSelect={(sortBy, direction) => {
            setParam("sortBy", sortBy);
            setParam("direction", direction);
            setIsSortOpen(false);
          }}
        />
      </Modal>
    </div>
  );
}

export default function ProductListPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-sm text-(--color-text-muted)">Loading…</div>
      }
    >
      <ProductListPageContent />
    </Suspense>
  );
}