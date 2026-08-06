"use client";

import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ hasError, className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-colors
          bg-[var(--color-bg)] text-[var(--color-text)]
          placeholder:text-[var(--color-text-muted)]
          ${hasError
            ? "border-danger focus:border-danger focus:ring-2 focus:ring-danger/20"
            : "border-[var(--color-border)] focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20"
          }
          ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
export default Input;