"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useUpdateCartItem, useRemoveCartItem } from "@/features/cart/hooks";

export default function CartItemRow({ item }: { item: CartItem }) {
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveCartItem();

  const price = item.discountPrice ?? item.price;
  const lineTotal = price * item.quantity;

  return (
    <div className="flex gap-4 border-b border-(--color-border) py-4 last:border-0">
      <Link
        href={`/products/${item.productId}`}
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-(--color-border) bg-(--color-surface)"
      >
        {item.image ? (
          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/products/${item.productId}`}
            className="line-clamp-2 text-sm font-medium text-(--color-text) hover:text-navy-600 dark:hover:text-navy-300"
          >
            {item.name}
          </Link>
          <button
            onClick={() => removeItem.mutate(item.id)}
            disabled={removeItem.isPending}
            className="shrink-0 text-(--color-text-muted) transition-colors hover:text-danger disabled:opacity-40"
          >
            <Trash2 size={16} />
          </button>
        </div>
        <div className="flex items-end justify-between">
          <div className="flex items-center rounded-lg border border-(--color-border)">
            <button
              onClick={() =>
                updateItem.mutate({ itemId: item.id, quantity: Math.max(1, item.quantity - 1) })
              }
              disabled={updateItem.isPending || item.quantity <= 1}
              className="flex h-8 w-8 items-center justify-center text-(--color-text-muted) transition-colors hover:text-navy-600 disabled:opacity-40"
            >
              <Minus size={13} />
            </button>
            <span className="w-7 text-center text-sm font-medium text-(--color-text)">
              {item.quantity}
            </span>
            <button
              onClick={() =>
                updateItem.mutate({
                  itemId: item.id,
                  quantity: Math.min(item.stock, item.quantity + 1),
                })
              }
              disabled={updateItem.isPending || item.quantity >= item.stock}
              className="flex h-8 w-8 items-center justify-center text-(--color-text-muted) transition-colors hover:text-navy-600 disabled:opacity-40"
            >
              <Plus size={13} />
            </button>
          </div>
          <span className="text-sm font-semibold text-(--color-text)">
            ₹{lineTotal.toLocaleString()}
          </span>
        </div>
        {item.quantity >= item.stock && (
          <p className="text-xs text-warning">Max stock reached</p>
        )}
      </div>
    </div>
  );
}