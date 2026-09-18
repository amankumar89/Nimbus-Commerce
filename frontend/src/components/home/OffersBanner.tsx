import Link from "next/link";
import { Percent } from "lucide-react";

export default function OffersBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6">
      <Link
        href="/products?sortBy=discount&direction=desc"
        className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-navy-700 to-navy-600 px-6 py-6 text-white transition-opacity hover:opacity-95 sm:px-10"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
            <Percent size={20} />
          </div>
          <div>
            <p className="text-base font-bold sm:text-lg">Big Deals, Every Day</p>
            <p className="text-xs text-navy-100 sm:text-sm">
              Up to 50% off on selected items
            </p>
          </div>
        </div>
        <span className="hidden text-sm font-semibold underline sm:block">Explore Offers →</span>
      </Link>
    </section>
  );
}