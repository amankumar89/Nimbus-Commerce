"use client";

import { useWishlist } from "@/features/wishlist/hooks";
import WishlistCard from "@/components/wishlist/WishlistCard";
import EmptyWishlist from "@/components/wishlist/EmptyWishlist";
import Skeleton from "@/components/ui/Skeleton";

export default function WishlistPage() {
  const { data: wishlist, isLoading, isError } = useWishlist();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-(--color-text)">
        My Wishlist {wishlist && wishlist.length > 0 && `(${wishlist.length})`}
      </h1>
      {isLoading && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[3/4] w-full" />
          ))}
        </div>
      )}
      {isError && (
        <p className="text-sm text-danger">Could not load your wishlist. Please try again.</p>
      )}
      {!isLoading && !isError && wishlist && wishlist.length === 0 && <EmptyWishlist />}
      {!isLoading && wishlist && wishlist.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
          {wishlist.map((item) => (
            <WishlistCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}