"use client";

import { useCart } from "@/features/cart/hooks";
import CartItemRow from "@/components/cart/CartItemRow";
import CartSummary from "@/components/cart/CartSummary";
import EmptyCart from "@/components/cart/EmptyCart";
import Skeleton from "@/components/ui/Skeleton";

export default function CartPage() {
  const { data: cart, isLoading, isError } = useCart();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Skeleton className="mb-6 h-8 w-40" />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="flex flex-col gap-4 lg:col-span-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <p className="text-sm text-danger">Could not load your cart. Please try again.</p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4">
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-(--color-text)">
        Shopping Cart ({cart.items.length})
      </h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="rounded-xl border border-(--color-border) bg-(--color-bg) p-5 lg:col-span-2">
          {cart.items.map((item) => (
            <CartItemRow key={item.id} item={item} />
          ))}
        </div>
        <div className="lg:sticky lg:top-20 lg:self-start">
          <CartSummary cart={cart} />
        </div>
      </div>
    </div>
  );
}