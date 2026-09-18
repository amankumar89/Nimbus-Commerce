"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useFaqs } from "@/features/support/hooks";
import Skeleton from "@/components/ui/Skeleton";

export default function FaqAccordion({ searchTerm }: { searchTerm: string }) {
  const { data: faqs, isLoading, isError } = useFaqs();
  const [openId, setOpenId] = useState<string | null>(null);

  const grouped = useMemo(() => {
    if (!faqs) return {};
    const filtered = faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filtered.reduce<Record<string, typeof faqs>>((acc, faq) => {
      acc[faq.category] = acc[faq.category] ? [...acc[faq.category], faq] : [faq];
      return acc;
    }, {});
  }, [faqs, searchTerm]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-14 w-full" />
        ))}
      </div>
    );
  }

  if (isError) {
    return <p className="text-sm text-danger">Could not load FAQs. Please try again.</p>;
  }

  const categories = Object.keys(grouped);

  if (categories.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-(--color-text-muted)">
        No FAQs match your search.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {categories.map((category) => (
        <div key={category} id={category.toLowerCase()}>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-navy-600 dark:text-navy-300">
            {category}
          </h3>
          <div className="flex flex-col gap-2">
            {grouped[category].map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-xl border border-(--color-border) bg-(--color-bg)"
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="flex w-full items-center justify-between px-4 py-3.5 text-left"
                  >
                    <span className="text-sm font-medium text-(--color-text)">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`shrink-0 text-(--color-text-muted) transition-transform ${isOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="px-4 pb-4 text-sm leading-relaxed text-(--color-text-muted)">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}