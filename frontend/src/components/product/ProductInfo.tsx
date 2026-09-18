"use client";

import { useState } from "react";
import { Star, ShoppingCart, Heart, Minus, Plus, Truck, ShieldCheck } from "lucide-react";
import { useAddToCart } from "@/features/cart/hooks";
import { useToggleWishlist } from "@/features/wishlist/hooks";
import Button from "@/components/ui/Button";

export default function ProductInfo({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useAddToCart();
  const { toggle, isInWishlist } = useToggleWishlist();

  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.discountPrice!) / product.price) * 100)
    : 0;
  const inWishlist = isInWishlist(product.id);
  const outOfStock = product.stock === 0;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm font-medium text-navy-600 dark:text-navy-300">{product.brand}</p>
        <h1 className="mt-1 text-2xl font-bold text-(--color-text)">{product.name}</h1>

        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-md bg-navy-700 px-2 py-0.5 text-white">
            <Star size={12} className="fill-white" />
            <span className="text-xs font-semibold">{product.rating.toFixed(1)}</span>
          </div>
          <span className="text-sm text-(--color-text-muted)">
            {product.reviewCount} ratings
          </span>
        </div>
      </div>

      <div className="flex items-baseline gap-3 border-y border-(--color-border) py-4">
        <span className="text-3xl font-bold text-(--color-text)">
          ₹{(hasDiscount ? product.discountPrice! : product.price).toLocaleString()}
        </span>
        {hasDiscount && (
          <>
            <span className="text-lg text-(--color-text-muted) line-through">
              ₹{product.price.toLocaleString()}
            </span>
            <span className="text-sm font-semibold text-success">{discountPercent}% off</span>
          </>
        )}
      </div>

      <div className="flex items-center gap-2 text-sm">
        {outOfStock ? (
          <span className="font-medium text-danger">Out of Stock</span>
        ) : product.stock <= 5 ? (
          <span className="font-medium text-warning">Only {product.stock} left in stock</span>
        ) : (
          <span className="font-medium text-success">In Stock</span>
        )}
      </div>

      {!outOfStock && (
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-(--color-text)">Quantity</span>
          <div className="flex items-center rounded-lg border border-(--color-border)">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-9 w-9 items-center justify-center text-(--color-text-muted) transition-colors hover:text-navy-600"
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center text-sm font-medium text-(--color-text)">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
              className="flex h-9 w-9 items-center justify-center text-(--color-text-muted) transition-colors hover:text-navy-600"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <Button
          variant="primary"
          className="flex-1"
          disabled={outOfStock}
          isLoading={addToCart.isPending}
          onClick={() => addToCart.mutate({ productId: product.id, quantity })}
        >
          <ShoppingCart size={16} />
          Add to Cart
        </Button>
        <button
          onClick={() => toggle(product.id)}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border transition-colors ${inWishlist
            ? "border-danger bg-danger/5 text-danger"
            : "border-(--color-border) text-(--color-text-muted) hover:border-danger hover:text-danger"
            }`}
        >
          <Heart size={18} className={inWishlist ? "fill-danger" : ""} />
        </button>
      </div>

      <div className="flex flex-col gap-2 rounded-xl bg-(--color-surface) p-4 text-sm">
        <div className="flex items-center gap-2 text-(--color-text-muted)">
          <Truck size={15} className="text-navy-600 dark:text-navy-300" />
          Free delivery on orders over ₹499
        </div>
        <div className="flex items-center gap-2 text-(--color-text-muted)">
          <ShieldCheck size={15} className="text-navy-600 dark:text-navy-300" />
          1 year warranty included
        </div>
      </div>
    </div>
  );
}