import Link from "next/link";
import { Heart } from "lucide-react";
import Button from "@/components/ui/Button";

export default function EmptyWishlist() {
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-(--color-surface)">
        <Heart size={28} className="text-(--color-text-muted)" />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-(--color-text)">Your wishlist is empty</h2>
        <p className="mt-1 text-sm text-(--color-text-muted)">
          Save items you love for later.
        </p>
      </div>
      <Link href="/products">
        <Button variant="primary">Browse Products</Button>
      </Link>
    </div>
  );
}