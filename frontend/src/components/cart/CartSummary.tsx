import Link from "next/link";
import CouponInput from "@/components/cart/CouponInput";
import Button from "@/components/ui/Button";

export default function CartSummary({ cart }: { cart: Cart }) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-(--color-border) bg-(--color-bg) p-5">
      <h2 className="text-base font-semibold text-(--color-text)">Order Summary</h2>
      <CouponInput appliedCode={cart.couponCode} />
      <div className="flex flex-col gap-2 border-t border-(--color-border) pt-4 text-sm">
        <div className="flex justify-between text-(--color-text-muted)">
          <span>Subtotal</span>
          <span className="text-(--color-text)">₹{cart.subtotal.toLocaleString()}</span>
        </div>
        {cart.discount > 0 && (
          <div className="flex justify-between text-success">
            <span>Discount</span>
            <span>-₹{cart.discount.toLocaleString()}</span>
          </div>
        )}
        <div className="flex justify-between text-(--color-text-muted)">
          <span>Shipping</span>
          <span className="text-(--color-text)">
            {cart.shipping === 0 ? "Free" : `₹${cart.shipping.toLocaleString()}`}
          </span>
        </div>
      </div>
      <div className="flex justify-between border-t border-(--color-border) pt-4">
        <span className="text-base font-semibold text-(--color-text)">Total</span>
        <span className="text-lg font-bold text-(--color-text)">
          ₹{cart.total.toLocaleString()}
        </span>
      </div>
      <Link href="/checkout">
        <Button variant="primary" className="w-full">
          Proceed to Checkout
        </Button>
      </Link>
    </div>
  );
}