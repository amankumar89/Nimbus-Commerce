import Image from "next/image";
import Link from "next/link";

export default function OrderItemsList({ items }: { items: Order["items"] }) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item, i) => (
        <div key={`${item.productId}-${i}`} className="flex gap-3">
          <Link
            href={`/products/${item.productId}`}
            className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-(--color-border) bg-(--color-surface)"
          >
            {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />}
          </Link>
          <div className="flex flex-1 flex-col justify-center">
            <p className="line-clamp-1 text-sm font-medium text-(--color-text)">{item.name}</p>
            <p className="text-xs text-(--color-text-muted)">Qty: {item.quantity}</p>
          </div>
          <span className="self-center text-sm font-semibold text-(--color-text)">
            ₹{(item.price * item.quantity).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}