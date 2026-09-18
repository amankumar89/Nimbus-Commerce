"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useProducts } from "@/features/products/hooks";
import ProductCard from "@/components/product/ProductCard";
import ProductCardSkeleton from "@/components/product/ProductCardSkeleton";

interface ProductRowProps {
  title: string;
  viewAllHref: string;
  queryParams: ProductListParams;
}

export default function ProductRow({ title, viewAllHref, queryParams }: ProductRowProps) {
  const { data, isLoading } = useProducts(queryParams);

  if (!isLoading && (!data || data.items.length === 0)) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-(--color-text)">{title}</h2>
        <Link
          href={viewAllHref}
          className="flex items-center gap-1 text-sm font-medium text-navy-600 hover:text-navy-700 dark:text-navy-300"
        >
          View All
          <ArrowRight size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
          : data?.items.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </section>
  );
}