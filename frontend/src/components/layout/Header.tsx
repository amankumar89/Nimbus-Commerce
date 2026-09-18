"use client";

import Link from "next/link";
import { ShoppingCart, Search, Heart } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { useCart } from "@/features/cart/hooks";
import ThemeToggle from "@/components/ui/ThemeToggle";
import UserMenu from "@/components/layout/UserMenu";
import Button from "@/components/ui/Button";

export default function Header() {
  const { user, isAuthChecked } = useAppSelector((state) => state.auth);
  const { data: cart } = useCart();

  const cartCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return (
    <header className="sticky top-0 z-30 border-b border-(--color-border) bg-(--color-bg)/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-700 text-sm font-bold text-white">
            N
          </div>
          <span className="text-lg font-bold tracking-tight text-(--color-text)">
            Nimbus
          </span>
        </Link>
        <div className="hidden flex-1 max-w-md md:block">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-muted)"
            />
            <input
              type="text"
              placeholder="Search products…"
              className="w-full rounded-full border border-(--color-border) bg-(--color-surface) py-2 pl-9 pr-4 text-sm outline-none transition-colors focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isAuthChecked && user && (
            <Link
              href="/wishlist"
              className="hidden h-9 w-9 items-center justify-center rounded-full text-(--color-text-muted) transition-colors hover:bg-(--color-surface) hover:text-navy-600 sm:flex dark:hover:text-navy-300"
            >
              <Heart size={17} />
            </Link>
          )}
          <Link
            href="/cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-(--color-text-muted) transition-colors hover:bg-(--color-surface) hover:text-navy-600 dark:hover:text-navy-300"
          >
            <ShoppingCart size={17} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-navy-700 px-1 text-[10px] font-bold text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>
          {!isAuthChecked ? (
            <div className="h-9 w-9 animate-pulse rounded-full bg-(--color-surface)" />
          ) : user ? (
            <UserMenu />
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" className="px-3 py-2 text-sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/register" className="hidden sm:block">
                <Button variant="primary" className="px-3 py-2 text-sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}