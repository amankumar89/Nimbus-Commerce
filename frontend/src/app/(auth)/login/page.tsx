"use client";

import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { loginSchema } from "@/features/auth/schemas";
import { useLoginMutation } from "@/features/auth/hooks";
import FormField from "@/components/forms/FormField";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const loginMutation = useLoginMutation();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      const result = loginSchema.safeParse(value);
      if (!result.success) return; // field-level validators already surface errors
      await loginMutation.mutateAsync(result.data);
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-(--color-text)">Welcome back</h1>
        <p className="mt-1 text-sm text-(--color-text-muted)">
          Sign in to continue to Nimbus
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
            onChange: ({ value }) =>
              loginSchema.shape.email.safeParse(value).success
                ? undefined
                : loginSchema.shape.email.safeParse(value).error?.issues[0]?.message,
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
              />
            </FormField>
          )}
        </form.Field>

        <form.Field
          name="password"
          validators={{
            onChange: ({ value }) =>
              loginSchema.shape.password.safeParse(value).success
                ? undefined
                : loginSchema.shape.password.safeParse(value).error?.issues[0]?.message,
          }}
        >
          {(field) => (
            <FormField
              label="Password"
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
                autoComplete="current-password"
              />
            </FormField>
          )}
        </form.Field>

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-xs font-medium text-navy-600 hover:text-navy-700 dark:text-navy-300"
          >
            Forgot password?
          </Link>
        </div>

        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              disabled={!canSubmit}
              isLoading={isSubmitting || loginMutation.isPending}
              className="mt-2 w-full"
            >
              Sign In
            </Button>
          )}
        </form.Subscribe>
      </form>

      <p className="text-center text-sm text-(--color-text-muted)">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-navy-600 hover:text-navy-700 dark:text-navy-300">
          Create one
        </Link>
      </p>
    </div>
  );
}