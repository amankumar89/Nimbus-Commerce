"use client";

import Image from "next/image";
import Link from "next/link";
import { X, ShoppingCart } from "lucide-react";
import { useToggleWishlist } from "@/features/wishlist/hooks";
import { useAddToCart } from "@/features/cart/hooks";

export default function WishlistCard({ item }: { item: WishlistItem }) {
  const { toggle } = useToggleWishlist();
  const addToCart = useAddToCart();

  const hasDiscount = item.discountPrice && item.discountPrice < item.price;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-(--color-border) bg-(--color-bg)">
      <button
        onClick={() => toggle(item.productId)}
        className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-(--color-bg)/90 text-(--color-text-muted) shadow-sm transition-colors hover:text-danger"
      >
        <X size={15} />
      </button>
      <Link href={`/products/${item.productId}`} className="relative aspect-square w-full bg-(--color-surface)">
        {item.image && (
          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <Link
          href={`/products/${item.productId}`}
          className="line-clamp-2 text-sm font-medium text-(--color-text) hover:text-navy-600 dark:hover:text-navy-300"
        >
          {item.name}
        </Link>
        <div className="flex items-baseline gap-2">
          <span className="text-base font-bold text-(--color-text)">
            ₹{(hasDiscount ? item.discountPrice! : item.price).toLocaleString()}
          </span>
          {hasDiscount && (
            <span className="text-xs text-(--color-text-muted) line-through">
              ₹{item.price.toLocaleString()}
            </span>
          )}
        </div>
        <button
          onClick={() => addToCart.mutate({ productId: item.productId, quantity: 1 })}
          disabled={addToCart.isPending}
          className="mt-auto flex items-center justify-center gap-2 rounded-lg bg-navy-700 py-2 text-xs font-semibold text-white transition-colors hover:bg-navy-800 disabled:opacity-60"
        >
          <ShoppingCart size={14} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}