"use client";

import { useProducts } from "@/features/products/hooks";
import ProductCard from "@/components/product/ProductCard";
import ProductCardSkeleton from "@/components/product/ProductCardSkeleton";

export default function SimilarProducts({
  category,
  excludeId,
}: {
  category: string;
  excludeId: string;
}) {
  const { data, isLoading } = useProducts({ category, page: 1, size: 8 });
  const items = data?.items.filter((p) => p.id !== excludeId) ?? [];

  if (!isLoading && items.length === 0) return null;

  return (
    <div className="mt-10 border-t border-(--color-border) pt-8">
      <h2 className="mb-4 text-lg font-semibold text-(--color-text)">Similar Products</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
          : items.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  );
}