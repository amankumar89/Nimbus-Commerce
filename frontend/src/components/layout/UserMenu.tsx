"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, User, Package, Heart, MapPin, LogOut, LayoutDashboard } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { useLogoutMutation } from "@/features/auth/hooks";
import Avatar from "@/components/ui/Avatar";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const user = useAppSelector((state) => state.auth.user);
  const logoutMutation = useLogoutMutation();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  const menuItems =
    user.role === "ADMIN"
      ? [{ label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard }]
      : [
        { label: "Profile", href: "/profile", icon: User },
        { label: "Orders", href: "/orders", icon: Package },
        { label: "Wishlist", href: "/wishlist", icon: Heart },
        { label: "Addresses", href: "/addresses", icon: MapPin },
      ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition-colors hover:bg-(--color-surface)"
      >
        <Avatar name={user.name || user.email} />
        <ChevronDown
          size={15}
          className={`text-(--color-text-muted) transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 z-40 w-56 overflow-hidden rounded-xl border border-(--color-border) bg-(--color-bg) py-2 shadow-xl shadow-navy-900/10 animate-in fade-in slide-in-from-top-2">
          <div className="border-b border-(--color-border) px-4 py-3">
            <p className="truncate text-sm font-semibold text-(--color-text)">
              {user.name || "Nimbus User"}
            </p>
            <p className="truncate text-xs text-(--color-text-muted)">{user.email}</p>
          </div>

          <div className="py-1">
            {menuItems.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-(--color-text) transition-colors hover:bg-(--color-surface)"
              >
                <Icon size={16} className="text-navy-600 dark:text-navy-300" />
                {label}
              </Link>
            ))}
          </div>

          <div className="border-t border-(--color-border) pt-1">
            <button
              onClick={() => {
                setIsOpen(false);
                logoutMutation.mutate();
              }}
              disabled={logoutMutation.isPending}
              className="flex w-full items-center gap-3 px-4 py-2 text-sm font-medium text-danger transition-colors hover:bg-danger/5"
            >
              <LogOut size={16} />
              {logoutMutation.isPending ? "Logging out…" : "Logout"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}