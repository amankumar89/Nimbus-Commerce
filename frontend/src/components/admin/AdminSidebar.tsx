"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Boxes,
  ShoppingBag,
  Users,
  Tag,
  BarChart3,
  CreditCard,
  Truck,
  Settings,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Categories", href: "/admin/categories", icon: FolderTree },
  { label: "Inventory", href: "/admin/inventory", icon: Boxes },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Coupons", href: "/admin/coupons", icon: Tag },
  { label: "Reports", href: "/admin/reports", icon: BarChart3 },
  { label: "Payments", href: "/admin/payments", icon: CreditCard },
  { label: "Shipping", href: "/admin/shipping", icon: Truck },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 flex-col gap-1 border-r border-(--color-border) bg-(--color-bg) p-4 lg:flex">
      <div className="mb-4 flex items-center gap-2 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-700 text-sm font-bold text-white">
          N
        </div>
        <span className="text-base font-bold text-(--color-text)">Nimbus Admin</span>
      </div>

      {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
        const isActive = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive
              ? "bg-navy-700 text-white"
              : "text-(--color-text-muted) hover:bg-(--color-surface) hover:text-(--color-text)"
              }`}
          >
            <Icon size={16} />
            {label}
          </Link>
        );
      })}
    </aside>
  );
}