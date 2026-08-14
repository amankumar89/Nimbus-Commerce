import { Package, PackageCheck, Truck, Home, CheckCircle2 } from "lucide-react";

const STEPS: { status: Order["status"]; label: string; icon: typeof Package }[] = [
  { status: "CONFIRMED", label: "Order Placed", icon: Package },
  { status: "PACKED", label: "Packed", icon: PackageCheck },
  { status: "SHIPPED", label: "Shipped", icon: Truck },
  { status: "OUT_FOR_DELIVERY", label: "Out for Delivery", icon: Home },
  { status: "DELIVERED", label: "Delivered", icon: CheckCircle2 },
];

export default function OrderStatusTimeline({ status }: { status: Order["status"] }) {
  const currentIndex = STEPS.findIndex((s) => s.status === status);

  return (
    <div className="flex items-start justify-between">
      {STEPS.map((step, index) => {
        const isComplete = index <= currentIndex;
        const Icon = step.icon;

        return (
          <div key={step.status} className="flex flex-1 flex-col items-center">
            <div className="flex w-full items-center">
              {index > 0 && (
                <div
                  className={`h-0.5 flex-1 ${index <= currentIndex ? "bg-navy-600" : "bg-(--color-border)"
                    }`}
                />
              )}
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${isComplete
                  ? "bg-navy-700 text-white"
                  : "bg-(--color-surface) text-(--color-text-muted)"
                  }`}
              >
                <Icon size={15} />
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`h-0.5 flex-1 ${index < currentIndex ? "bg-navy-600" : "bg-(--color-border)"
                    }`}
                />
              )}
            </div>
            <span
              className={`mt-2 text-center text-[11px] font-medium ${isComplete ? "text-(--color-text)" : "text-(--color-text-muted)"
                }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}