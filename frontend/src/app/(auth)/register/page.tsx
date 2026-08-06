"use client";

import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { registerSchema } from "@/features/auth/schemas";
import { useRegisterMutation } from "@/features/auth/hooks";
import FormField from "@/components/forms/FormField";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

export default function RegisterPage() {
  const registerMutation = useRegisterMutation();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "CUSTOMER" as Role,
    },
    onSubmit: async ({ value }) => {
      const result = registerSchema.safeParse(value);
      if (!result.success) return;

      await registerMutation.mutateAsync({
        name: result.data.name,
        email: result.data.email,
        password: result.data.password,
        role: result.data.role,
      });
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Create your account</h1>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          Join Nimbus and start shopping
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
          name="name"
          validators={{
            onChange: ({ value }) => {
              const result = registerSchema.shape.name.safeParse(value);
              return result.success ? undefined : result.error.issues[0]?.message;
            },
          }}
        >
          {(field) => (
            <FormField
              label="Full Name"
              htmlFor={field.name}
              error={field.state.meta.isTouched ? field.state.meta.errors[0] : undefined}
            >
              <Input
                id={field.name}
                name={field.name}
                type="text"
                placeholder="Jane Doe"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                hasError={field.state.meta.isTouched && !!field.state.meta.errors.length}
                autoComplete="name"
              />
            </FormField>
          )}
        </form.Field>

        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) => {
              const result = registerSchema.shape.email.safeParse(value);
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
              />
            </FormField>
          )}
        </form.Field>

        <form.Field
          name="password"
          validators={{
            onChange: ({ value }) => {
              const result = registerSchema.shape.password.safeParse(value);
              return result.success ? undefined : result.error.issues[0]?.message;
            },
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
                autoComplete="new-password"
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
              label="Confirm Password"
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

        <form.Field name="role">
          {(field) => (
            <FormField label="Account Type" htmlFor={field.name}>
              <Select
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) =>
                  field.handleChange(e.target.value as Role)
                }
              >
                <option value="CUSTOMER">Customer</option>
                <option value="ADMIN">Admin</option>
              </Select>
            </FormField>
          )}
        </form.Field>

        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              disabled={!canSubmit}
              isLoading={isSubmitting || registerMutation.isPending}
              className="mt-2 w-full"
            >
              Create Account
            </Button>
          )}
        </form.Subscribe>
      </form>

      <p className="text-center text-sm text-[var(--color-text-muted)]">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-navy-600 hover:text-navy-700 dark:text-navy-300">
          Sign in
        </Link>
      </p>
    </div>
  );
}