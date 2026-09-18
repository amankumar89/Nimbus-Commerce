import Link from "next/link";
import Button from "@/components/ui/Button";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-4 py-16 sm:py-24">
        <span className="rounded-full bg-navy-700/60 px-3 py-1 text-xs font-semibold text-navy-100">
          New Season Arrivals
        </span>
        <h1 className="max-w-xl text-3xl font-bold text-white sm:text-5xl">
          Shop smarter. Live better.
        </h1>
        <p className="max-w-md text-sm text-navy-200 sm:text-base">
          Discover quality products across every category, delivered fast to your door.
        </p>
        <Link href="/products">
          <Button variant="primary" className="mt-2">
            Shop Now
          </Button>
        </Link>
      </div>

      {/* Decorative gradient blob */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-navy-600/30 blur-3xl" />
    </section>
  );
}