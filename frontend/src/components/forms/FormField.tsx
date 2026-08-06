"use client";

import type { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}

export default function FormField({ label, htmlFor, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium text-[var(--color-text)]"
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs font-medium text-danger animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}