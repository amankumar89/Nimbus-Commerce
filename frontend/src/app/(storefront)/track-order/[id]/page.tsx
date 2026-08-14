"use client";

import { useParams } from "next/navigation";
import { useOrderDetail } from "@/features/orders/hooks";
import OrderStatusTimeline from "@/components/orders/OrderStatusTimeline";
import OrderItemsList from "@/components/orders/OrderItemsList";
import Skeleton from "@/components/ui/Skeleton";

export default function TrackOrderPage() {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading, isError } = useOrderDetail(id);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-sm text-danger">Could not find this order.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-1 text-2xl font-bold text-(--color-text)">Track Order</h1>
      <p className="mb-8 text-sm text-(--color-text-muted)">Order #{order.id}</p>
      <div className="rounded-xl border border-(--color-border) bg-(--color-bg) p-6">
        <OrderStatusTimeline status={order.status} />
      </div>
      <div className="mt-6 rounded-xl border border-(--color-border) bg-(--color-bg) p-6">
        <h2 className="mb-4 text-base font-semibold text-(--color-text)">Order Items</h2>
        <OrderItemsList items={order.items} />
      </div>
    </div>
  );
}