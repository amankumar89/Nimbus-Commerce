"use client";

import { Mail, Phone, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactOptions() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <a
        href="mailto:support@nimbus.com"
        className="flex w-full flex-col items-start gap-2 rounded-xl border border-(--color-border) bg-(--color-bg) p-5 text-left no-underline transition-colors hover:border-navy-500"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-50 text-navy-700 dark:bg-navy-800 dark:text-navy-300">
          <Mail size={18} />
        </div>
        <p className="text-sm font-semibold text-(--color-text)">
          Email Us
        </p>
        <p className="text-xs text-(--color-text-muted)">
          support@nimbus.com
        </p>
      </a>
      <a
        href="tel:+911234567890"
        className="flex w-full flex-col items-start gap-2 rounded-xl border border-(--color-border) bg-(--color-bg) p-5 text-left no-underline transition-colors hover:border-navy-500"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-50 text-navy-700 dark:bg-navy-800 dark:text-navy-300">
          <Phone size={18} />
        </div>
        <p className="text-sm font-semibold text-(--color-text)">
          Call Us
        </p>
        <p className="text-xs text-(--color-text-muted)">
          +91 12345 67890
        </p>
      </a>
      <button
        type="button"
        onClick={() => toast("Live chat is coming soon!", { icon: "💬" })}
        className="flex w-full flex-col items-start gap-2 rounded-xl border border-(--color-border) bg-(--color-bg) p-5 text-left font-normal transition-colors hover:border-navy-500"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-50 text-navy-700 dark:bg-navy-800 dark:text-navy-300">
          <MessageCircle size={18} />
        </div>
        <p className="text-sm font-semibold text-(--color-text)">
          Live Chat
        </p>
        <p className="text-xs text-(--color-text-muted)">
          Coming soon
        </p>
      </button>
    </div>
  );
}