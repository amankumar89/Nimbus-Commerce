"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Package, Heart, MapPin, CreditCard } from "lucide-react";

const NAV_ITEMS = [
  { label: "Profile", href: "/profile", icon: User },
  { label: "Order History", href: "/orders", icon: Package },
  { label: "Wishlist", href: "/wishlist", icon: Heart },
  { label: "Addresses", href: "/addresses", icon: MapPin },
  { label: "Payment Methods", href: "/payment-methods", icon: CreditCard },
];

export default function AccountSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex w-full shrink-0 flex-col gap-1 lg:w-56">
      {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${isActive
              ? "bg-navy-700 text-white"
              : "text-(--color-text-muted) hover:bg-(--color-surface) hover:text-(--color-text)"
              }`}
          >
            <Icon size={16} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}