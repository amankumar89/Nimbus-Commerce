import { Truck, ShieldCheck, RotateCcw, Headphones } from "lucide-react";

const ITEMS = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over ₹499" },
  { icon: ShieldCheck, title: "Secure Payment", desc: "100% protected transactions" },
  { icon: RotateCcw, title: "Easy Returns", desc: "7-day return policy" },
  { icon: Headphones, title: "24/7 Support", desc: "We're here to help" },
];

export default function ValueProps() {
  return (
    <section className="border-y border-(--color-border) bg-(--color-surface)">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:grid-cols-4">
        {ITEMS.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-700 text-white">
              <Icon size={16} />
            </div>
            <div>
              <p className="text-sm font-semibold text-(--color-text)">{title}</p>
              <p className="text-xs text-(--color-text-muted)">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}