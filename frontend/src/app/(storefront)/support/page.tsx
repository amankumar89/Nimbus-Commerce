"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import ContactOptions from "@/components/support/ContactOptions";
import FaqAccordion from "@/components/support/FaqAccordion";
import ContactForm from "@/components/support/ContactForm";

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-(--color-text)">How can we help?</h1>
        <p className="mt-2 text-sm text-(--color-text-muted)">
          Search our FAQs or reach out to our support team.
        </p>
        <div className="relative mx-auto mt-5 max-w-md">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-muted)"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search FAQs…"
            className="w-full rounded-full border border-(--color-border) bg-(--color-bg) py-2.5 pl-9 pr-4 text-sm outline-none focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20"
          />
        </div>
      </div>
      <div className="mb-10">
        <ContactOptions />
      </div>
      <div id="faqs" className="mb-10">
        <FaqAccordion searchTerm={searchTerm} />
      </div>
      <ContactForm />
    </div>
  );
}