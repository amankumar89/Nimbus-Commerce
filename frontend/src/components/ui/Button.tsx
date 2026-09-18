"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", isLoading, disabled, className = "", children, ...props },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-navy-700 text-white hover:bg-navy-800 active:bg-navy-900 shadow-sm shadow-navy-900/10",
      secondary:
        "bg-navy-50 text-navy-700 hover:bg-navy-100 dark:bg-navy-800 dark:text-navy-100 dark:hover:bg-navy-700",
      ghost:
        "bg-transparent text-[var(--color-text)] hover:bg-[var(--color-surface)]",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${base} ${variants[variant]} ${className}`}
        {...props}
      >
        {isLoading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;