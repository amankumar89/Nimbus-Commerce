"use client";

import { useState } from "react";
import { Tag, X } from "lucide-react";
import { useApplyCoupon, useRemoveCoupon } from "@/features/cart/hooks";
import Button from "@/components/ui/Button";

export default function CouponInput({ appliedCode }: { appliedCode?: string }) {
  const [code, setCode] = useState("");
  const applyCoupon = useApplyCoupon();
  const removeCoupon = useRemoveCoupon();

  if (appliedCode) {
    return (
      <div className="flex items-center justify-between rounded-lg border border-success/30 bg-success/5 px-3 py-2.5">
        <div className="flex items-center gap-2 text-sm font-medium text-success">
          <Tag size={14} />
          {appliedCode} applied
        </div>
        <button
          onClick={() => removeCoupon.mutate()}
          disabled={removeCoupon.isPending}
          className="text-(--color-text-muted) transition-colors hover:text-danger"
        >
          <X size={15} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Enter coupon code"
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        className="flex-1 rounded-lg border border-(--color-border) bg-(--color-bg) px-3 py-2 text-sm outline-none focus:border-navy-500"
      />
      <Button
        variant="secondary"
        isLoading={applyCoupon.isPending}
        disabled={!code.trim()}
        onClick={() => applyCoupon.mutate(code.trim())}
      >
        Apply
      </Button>
    </div>
  );
}