import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import Button from "@/components/ui/Button";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-(--color-surface)">
        <ShoppingCart size={28} className="text-(--color-text-muted)" />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-(--color-text)">Your cart is empty</h2>
        <p className="mt-1 text-sm text-(--color-text-muted)">
          Looks like you haven&apos;t added anything yet.
        </p>
      </div>
      <Link href="/products">
        <Button variant="primary">Start Shopping</Button>
      </Link>
    </div>
  );
}