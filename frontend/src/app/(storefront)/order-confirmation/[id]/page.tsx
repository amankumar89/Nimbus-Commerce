"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Package, Calendar } from "lucide-react";
import { useOrderDetail } from "@/features/orders/hooks";
import OrderItemsList from "@/components/orders/OrderItemsList";
import Skeleton from "@/components/ui/Skeleton";
import Button from "@/components/ui/Button";

export default function OrderConfirmationPage() {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading, isError } = useOrderDetail(id);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="text-sm text-danger">Could not find this order.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
          <CheckCircle2 size={32} />
        </div>
        <h1 className="text-2xl font-bold text-(--color-text)">Order Confirmed!</h1>
        <p className="text-sm text-(--color-text-muted)">
          Thank you for your purchase. We&apos;ve sent a confirmation to your email.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-6 rounded-xl border border-(--color-border) bg-(--color-bg) p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-(--color-border) pb-4">
          <div className="flex items-center gap-2">
            <Package size={16} className="text-navy-600 dark:text-navy-300" />
            <div>
              <p className="text-xs text-(--color-text-muted)">Order Number</p>
              <p className="text-sm font-semibold text-(--color-text)">{order.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-navy-600 dark:text-navy-300" />
            <div>
              <p className="text-xs text-(--color-text-muted)">Estimated Delivery</p>
              <p className="text-sm font-semibold text-(--color-text)">
                {new Date(order.estimatedDelivery).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        <OrderItemsList items={order.items} />

        <div className="flex justify-between border-t border-(--color-border) pt-4">
          <span className="text-base font-semibold text-(--color-text)">Total Paid</span>
          <span className="text-lg font-bold text-(--color-text)">
            ₹{order.total.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link href={`/track-order/${order.id}`} className="flex-1">
          <Button variant="primary" className="w-full">
            Track Order
          </Button>
        </Link>
        <Link href="/products" className="flex-1">
          <Button variant="secondary" className="w-full">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}