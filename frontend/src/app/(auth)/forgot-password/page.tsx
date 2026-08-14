"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { forgotPasswordSchema } from "@/features/auth/schemas";
import { useForgotPasswordMutation } from "@/features/auth/hooks";
import FormField from "@/components/forms/FormField";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const forgotPasswordMutation = useForgotPasswordMutation();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }) => {
      const result = forgotPasswordSchema.safeParse(value);
      if (!result.success) return;

      await forgotPasswordMutation.mutateAsync(result.data);
      setSubmitted(true);
    },
  });

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-50 dark:bg-navy-800">
          <svg
            className="h-7 w-7 text-navy-700 dark:text-navy-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Check your email</h1>
        <p className="max-w-sm text-sm text-[var(--color-text-muted)]">
          If an account exists for that email, we&apos;ve sent a link to reset your
          password. It may take a few minutes to arrive.
        </p>
        <Link
          href="/login"
          className="mt-2 text-sm font-semibold text-navy-600 hover:text-navy-700 dark:text-navy-300"
        >
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Forgot password?</h1>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          Enter your email and we&apos;ll send you a reset link
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="flex flex-col gap-4"
      >
        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) => {
              const result = forgotPasswordSchema.shape.email.safeParse(value);
              return result.success ? undefined : result.error.issues[0]?.message;
            },
          }}
        >
          {(field) => (
            <FormField
              label="Email"
              htmlFor={field.name}
              error={field.state.meta.isTouched ? field.state.meta.errors[0] : undefined}
            >
              <Input
                id={field.name}
                name={field.name}
                type="email"
                placeholder="you@example.com"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                hasError={field.state.meta.isTouched && !!field.state.meta.errors.length}
                autoComplete="email"
                autoFocus
              />
            </FormField>
          )}
        </form.Field>

        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              disabled={!canSubmit}
              isLoading={isSubmitting || forgotPasswordMutation.isPending}
              className="mt-2 w-full"
            >
              Send Reset Link
            </Button>
          )}
        </form.Subscribe>
      </form>

      <p className="text-center text-sm text-[var(--color-text-muted)]">
        Remembered your password?{" "}
        <Link href="/login" className="font-semibold text-navy-600 hover:text-navy-700 dark:text-navy-300">
          Sign in
        </Link>
      </p>
    </div>
  );
}