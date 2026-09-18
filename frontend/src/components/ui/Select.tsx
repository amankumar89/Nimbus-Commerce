"use client";

import { forwardRef, SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ hasError, className = "", children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={`w-full appearance-none rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-colors
          bg-[var(--color-bg)] text-[var(--color-text)]
          bg-[url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%234b5a72%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.23%207.21a.75.75%200%20011.06.02L10%2011.168l3.71-3.938a.75.75%200%201111.08%201.04l-4.25%204.5a.75.75%200%2001-1.08%200l-4.25-4.5a.75.75%200%2001.02-1.06z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.1rem] bg-[right_0.65rem_center] bg-no-repeat pr-9
          ${hasError
            ? "border-danger focus:border-danger focus:ring-2 focus:ring-danger/20"
            : "border-[var(--color-border)] focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20"
          }
          ${className}`}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = "Select";
export default Select;