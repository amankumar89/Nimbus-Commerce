"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Heart } from "lucide-react";
import { useToggleWishlist } from "@/features/wishlist/hooks";

export default function ProductCard({ product }: { product: Product }) {
  const { toggle, isInWishlist } = useToggleWishlist();
  const inWishlist = isInWishlist(product.id);

  const hasDiscount = product.discountPrice && product.discountPrice < product.price;

  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.discountPrice!) / product.price) * 100)
    : 0;

  return (
    <Link
      href={`/products/${product.id}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-(--color-border) bg-(--color-bg) transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-navy-900/5"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-(--color-surface)">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-(--color-text-muted)">
            No image
          </div>
        )}

        {hasDiscount && (
          <span className="absolute left-2 top-2 rounded-full bg-danger px-2 py-0.5 text-[10px] font-bold text-white">
            -{discountPercent}%
          </span>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            toggle(product.id)
          }}
          className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-(--color-bg)/90 shadow-sm transition-opacity ${inWishlist ? "text-danger opacity-100" : "text-(--color-text-muted) opacity-0 hover:text-danger group-hover:opacity-100"}`}
        >
          <Heart size={15} className={inWishlist ? "fill-danger" : ""} />
        </button>

        {product.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-navy-900">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <p className="truncate text-xs text-(--color-text-muted)">{product.brand}</p>
        <h3 className="line-clamp-2 text-sm font-medium text-(--color-text)">
          {product.name}
        </h3>

        <div className="mt-1 flex items-center gap-1">
          <Star size={12} className="fill-warning text-warning" />
          <span className="text-xs font-medium text-(--color-text)">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-xs text-(--color-text-muted)">
            ({product.reviewCount})
          </span>
        </div>

        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-base font-bold text-(--color-text)">
            ₹{(hasDiscount ? product.discountPrice! : product.price).toLocaleString()}
          </span>
          {hasDiscount && (
            <span className="text-xs text-(--color-text-muted) line-through">
              ₹{product.price.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}