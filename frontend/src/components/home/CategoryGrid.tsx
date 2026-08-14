import Link from "next/link";
import { Shirt, Laptop, Home, Sparkles, Dumbbell, BookOpen } from "lucide-react";

const CATEGORIES = [
  { name: "Electronics", icon: Laptop, slug: "Electronics" },
  { name: "Fashion", icon: Shirt, slug: "Fashion" },
  { name: "Home & Kitchen", icon: Home, slug: "Home & Kitchen" },
  { name: "Beauty", icon: Sparkles, slug: "Beauty" },
  { name: "Sports", icon: Dumbbell, slug: "Sports" },
  { name: "Books", icon: BookOpen, slug: "Books" },
];

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h2 className="mb-5 text-xl font-bold text-(--color-text)">Shop by Category</h2>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {CATEGORIES.map(({ name, icon: Icon, slug }) => (
          <Link
            key={slug}
            href={`/products?category=${encodeURIComponent(slug)}`}
            className="flex flex-col items-center gap-2 rounded-xl border border-(--color-border) bg-(--color-bg) p-4 text-center transition-all hover:-translate-y-0.5 hover:border-navy-500 hover:shadow-md hover:shadow-navy-900/5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-50 text-navy-700 dark:bg-navy-800 dark:text-navy-300">
              <Icon size={18} />
            </div>
            <span className="text-xs font-medium text-(--color-text)">{name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}