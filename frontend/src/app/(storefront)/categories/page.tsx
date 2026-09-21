"use client";

import Link from "next/link";
import { FolderTree } from "lucide-react";
import { useCategories } from "@/features/categories/hooks";

const FALLBACK_CATEGORIES = ["Electronics", "Fashion", "Home & Kitchen", "Beauty", "Sports", "Books"];

export default function CategoriesPage() {
  const { data: categories, isLoading, isError } = useCategories();
  const categoryItems = categories?.length
    ? categories
    : FALLBACK_CATEGORIES.map((name) => ({ name, slug: name }));

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-2 text-2xl font-bold text-(--color-text)">Categories</h1>
      <p className="mb-8 text-sm text-(--color-text-muted)">Browse products by category.</p>
      {isError && (
        <p className="mb-6 text-sm text-danger">Categories could not be loaded. Showing common categories.</p>
      )}
      {isLoading ? (
        <p className="text-sm text-(--color-text-muted)">Loading categories...</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categoryItems.map((category) => (
            <Link
              key={category.slug}
              href={`/products?category=${encodeURIComponent(category.name)}`}
              className="flex items-center gap-3 rounded-xl border border-(--color-border) bg-(--color-bg) p-5 transition-colors hover:border-primary-500"
            >
              <FolderTree size={20} className="text-primary-700" />
              <span className="font-medium text-(--color-text)">{category.name}</span>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}