import Link from "next/link";
import { Mail, MessageCircle, Send, AtSign } from "lucide-react";

const footerLinks = {
  Shop: [
    { label: "All Products", href: "/products" },
    { label: "Categories", href: "/categories" },
    { label: "Offers", href: "/offers" },
    { label: "New Arrivals", href: "/new-arrivals" },
  ],
  Account: [
    { label: "My Profile", href: "/profile" },
    { label: "Order History", href: "/orders" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "Track Order", href: "/track-order" },
  ],
  Support: [
    { label: "Contact Us", href: "/support" },
    { label: "FAQs", href: "/support#faqs" },
    { label: "Shipping Info", href: "/support#shipping" },
    { label: "Returns", href: "/support#returns" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-(--color-border) bg-(--color-surface)">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-700 text-sm font-bold text-white">
                N
              </div>
              <span className="text-lg font-bold text-(--color-text)">Nimbus</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-(--color-text-muted)">
              Quality products, delivered fast. Shop smarter with Nimbus.
            </p>
            <div className="mt-4 flex gap-3">
              {[Mail, MessageCircle, Send, AtSign].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-(--color-border) text-(--color-text-muted) transition-colors hover:border-navy-500 hover:text-navy-600 dark:hover:text-navy-300"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-semibold text-(--color-text)">{heading}</h4>
              <ul className="mt-3 flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-(--color-text-muted) transition-colors hover:text-navy-600 dark:hover:text-navy-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-(--color-border) pt-6 text-xs text-(--color-text-muted) sm:flex-row">
          <p>© {new Date().getFullYear()} Nimbus. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-navy-600 dark:hover:text-navy-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-navy-600 dark:hover:text-navy-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer >
  );
}