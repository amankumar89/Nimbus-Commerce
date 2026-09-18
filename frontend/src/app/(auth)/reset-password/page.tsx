"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { resetPasswordSchema } from "@/features/auth/schemas";
import { useResetPasswordMutation } from "@/features/auth/hooks";
import FormField from "@/components/forms/FormField";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const resetPasswordMutation = useResetPasswordMutation();

  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      const result = resetPasswordSchema.safeParse(value);
      if (!result.success) return;
      if (!token) return; // guarded below by the invalid-link screen

      await resetPasswordMutation.mutateAsync({
        token,
        password: result.data.password,
      });
    },
  });

  // No token in the URL — link is malformed or was opened without the query param.
  if (!token) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-danger/10">
          <svg
            className="h-7 w-7 text-danger"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Invalid reset link</h1>
        <p className="max-w-sm text-sm text-[var(--color-text-muted)]">
          This password reset link is missing or malformed. Please request a new one.
        </p>
        <Link
          href="/forgot-password"
          className="mt-2 text-sm font-semibold text-navy-600 hover:text-navy-700 dark:text-navy-300"
        >
          Request a new link
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Reset your password</h1>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          Choose a new password for your account
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
          name="password"
          validators={{
            onChange: ({ value }) => {
              const result = resetPasswordSchema.shape.password.safeParse(value);
              return result.success ? undefined : result.error.issues[0]?.message;
            },
          }}
        >
          {(field) => (
            <FormField
              label="New Password"
              htmlFor={field.name}
              error={field.state.meta.isTouched ? field.state.meta.errors[0] : undefined}
            >
              <Input
                id={field.name}
                name={field.name}
                type="password"
                placeholder="••••••••"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                hasError={field.state.meta.isTouched && !!field.state.meta.errors.length}
                autoComplete="new-password"
                autoFocus
              />
            </FormField>
          )}
        </form.Field>

        <form.Field
          name="confirmPassword"
          validators={{
            onChangeListenTo: ["password"],
            onChange: ({ value, fieldApi }) => {
              const password = fieldApi.form.getFieldValue("password");
              if (!value) return "Please confirm your password";
              if (value !== password) return "Passwords do not match";
              return undefined;
            },
          }}
        >
          {(field) => (
            <FormField
              label="Confirm New Password"
              htmlFor={field.name}
              error={field.state.meta.isTouched ? field.state.meta.errors[0] : undefined}
            >
              <Input
                id={field.name}
                name={field.name}
                type="password"
                placeholder="••••••••"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                hasError={field.state.meta.isTouched && !!field.state.meta.errors.length}
                autoComplete="new-password"
              />
            </FormField>
          )}
        </form.Field>

        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              disabled={!canSubmit}
              isLoading={isSubmitting || resetPasswordMutation.isPending}
              className="mt-2 w-full"
            >
              Reset Password
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

// useSearchParams requires a Suspense boundary in the App Router
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}