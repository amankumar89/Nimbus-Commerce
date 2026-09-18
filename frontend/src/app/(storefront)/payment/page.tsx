"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/features/cart/hooks";
import { usePlaceOrder } from "@/features/orders/hooks";
import PaymentMethodSelector from "@/components/payment/PaymentMethodSelector";
import CardPaymentForm from "@/components/payment/CardPaymentForm";
import UpiPaymentForm from "@/components/payment/UpiPaymentForm";
import Skeleton from "@/components/ui/Skeleton";
import Button from "@/components/ui/Button";

function PaymentPageContent() {
  const searchParams = useSearchParams();
  const addressId = searchParams.get("addressId") ?? "";
  const delivery = searchParams.get("delivery") ?? "standard";

  const { data: cart, isLoading } = useCart();
  const placeOrder = usePlaceOrder();

  const [method, setMethod] = useState<PaymentMethod>("CARD");
  const [upiId, setUpiId] = useState("");

  const handlePlaceOrder = () => {
    placeOrder.mutate({
      addressId,
      deliveryMethod: delivery,
      paymentMethod: method,
      paymentDetails: method === "UPI" ? { upiId } : undefined,
    });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-(--color-text)">Payment</h1>

      {isLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <div className="flex flex-col gap-6">
          <PaymentMethodSelector selected={method} onSelect={setMethod} />

          <div className="rounded-xl border border-(--color-border) bg-(--color-bg) p-5">
            {method === "CARD" && <CardPaymentForm />}
            {method === "UPI" && (
              <UpiPaymentForm upiId={upiId} onUpiIdChange={setUpiId} amount={cart?.total ?? 0} />
            )}
            {method === "NETBANKING" && (
              <p className="text-sm text-(--color-text-muted)">
                You&apos;ll be redirected to your bank&apos;s secure page to complete payment.
              </p>
            )}
            {method === "COD" && (
              <p className="text-sm text-(--color-text-muted)">
                Pay in cash when your order is delivered. A small COD fee may apply.
              </p>
            )}
          </div>

          <div className="flex items-center justify-between rounded-xl bg-(--color-surface) p-5">
            <span className="text-sm font-medium text-(--color-text-muted)">Amount Payable</span>
            <span className="text-xl font-bold text-(--color-text)">
              ₹{cart?.total.toLocaleString() ?? 0}
            </span>
          </div>

          <Button
            variant="primary"
            className="w-full"
            isLoading={placeOrder.isPending}
            disabled={!addressId || (method === "UPI" && !upiId)}
            onClick={handlePlaceOrder}
          >
            {method === "COD" ? "Place Order" : `Pay ₹${cart?.total.toLocaleString() ?? 0}`}
          </Button>
        </div>
      )}
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-(--color-text-muted)">Loading…</div>}>
      <PaymentPageContent />
    </Suspense>
  );
}