"use client";

import { useState } from "react";

interface ProductTabsProps {
  description: string;
  specifications: Record<string, string>;
}

export default function ProductTabs({ description, specifications }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<"description" | "specifications">("description");

  return (
    <div className="mt-10">
      <div className="flex gap-6 border-b border-(--color-border)">
        {(["description", "specifications"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative pb-3 text-sm font-medium capitalize transition-colors ${activeTab === tab
              ? "text-navy-700 dark:text-navy-300"
              : "text-(--color-text-muted) hover:text-(--color-text)"
              }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute -bottom-px left-0 h-0.5 w-full bg-navy-700 dark:bg-navy-300" />
            )}
          </button>
        ))}
      </div>

      <div className="py-5 text-sm leading-relaxed text-(--color-text-muted)">
        {activeTab === "description" ? (
          <p>{description}</p>
        ) : (
          <table className="w-full text-sm">
            <tbody>
              {Object.entries(specifications ?? {}).map(([key, value]) => (
                <tr key={key} className="border-b border-(--color-border) last:border-0">
                  <td className="py-2.5 pr-4 font-medium text-(--color-text)">{key}</td>
                  <td className="py-2.5 text-(--color-text-muted)">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}