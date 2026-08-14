import { Star } from "lucide-react";

export default function ProductReviews({
  rating,
  reviewCount,
}: {
  rating: number;
  reviewCount: number;
}) {
  return (
    <div className="mt-10 border-t border-(--color-border) pt-8">
      <h2 className="text-lg font-semibold text-(--color-text)">
        Reviews & Ratings
      </h2>

      <div className="mt-4 flex items-center gap-4">
        <div className="text-4xl font-bold text-(--color-text)">{rating.toFixed(1)}</div>
        <div>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.round(rating) ? "fill-warning text-warning" : "text-(--color-border)"}
              />
            ))}
          </div>
          <p className="mt-1 text-sm text-(--color-text-muted)">{reviewCount} reviews</p>
        </div>
      </div>

      <p className="mt-6 text-sm text-(--color-text-muted)">
        Detailed reviews coming soon.
      </p>
    </div>
  );
}