import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  change?: number;
  icon: LucideIcon;
}

export default function StatCard({ label, value, change, icon: Icon }: StatCardProps) {
  const isPositive = (change ?? 0) >= 0;

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-(--color-border) bg-(--color-bg) p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-(--color-text-muted)">{label}</span>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-50 text-navy-700 dark:bg-navy-800 dark:text-navy-300">
          <Icon size={16} />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-(--color-text)">{value}</span>
        {change !== undefined && (
          <span
            className={`flex items-center gap-0.5 text-xs font-semibold ${isPositive ? "text-success" : "text-danger"
              }`}
          >
            {isPositive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
            {Math.abs(change).toFixed(1)}%
          </span>
        )}
      </div>
    </div>
  );
}