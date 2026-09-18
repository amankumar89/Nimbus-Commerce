"use client";

import { useForm } from "@tanstack/react-form";
import { contactFormSchema } from "@/features/support/schema";
import { useSubmitContactForm } from "@/features/support/hooks";
import { useAppSelector } from "@/store/hooks";
import FormField from "@/components/forms/FormField";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const SUBJECTS = ["Order Issue", "Payment Issue", "Return/Refund", "Product Query", "Other"];

export default function ContactForm() {
  const user = useAppSelector((state) => state.auth.user);
  const submitMutation = useSubmitContactForm();

  const form = useForm({
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      subject: "",
      message: "",
    },
    onSubmit: async ({ value, formApi }) => {
      const result = contactFormSchema.safeParse(value);
      if (!result.success) return;
      await submitMutation.mutateAsync(result.data);
      formApi.reset();
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex flex-col gap-4 rounded-xl border border-(--color-border) bg-(--color-bg) p-6"
    >
      <h3 className="text-base font-semibold text-(--color-text)">Send us a message</h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <form.Field
          name="name"
          validators={{
            onChange: ({ value }) => {
              const r = contactFormSchema.shape.name.safeParse(value);
              return r.success ? undefined : r.error.issues[0]?.message;
            },
          }}
        >
          {(field) => (
            <FormField
              label="Name"
              htmlFor={field.name}
              error={field.state.meta.isTouched ? field.state.meta.errors[0] : undefined}
            >
              <Input
                id={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                hasError={field.state.meta.isTouched && !!field.state.meta.errors.length}
                placeholder="Your name"
              />
            </FormField>
          )}
        </form.Field>

        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) => {
              const r = contactFormSchema.shape.email.safeParse(value);
              return r.success ? undefined : r.error.issues[0]?.message;
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
                type="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                hasError={field.state.meta.isTouched && !!field.state.meta.errors.length}
                placeholder="you@example.com"
              />
            </FormField>
          )}
        </form.Field>
      </div>

      <form.Field
        name="subject"
        validators={{
          onChange: ({ value }) => (value ? undefined : "Please select a subject"),
        }}
      >
        {(field) => (
          <FormField
            label="Subject"
            htmlFor={field.name}
            error={field.state.meta.isTouched ? field.state.meta.errors[0] : undefined}
          >
            <select
              id={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="w-full rounded-lg border border-(--color-border) bg-(--color-bg) px-3.5 py-2.5 text-sm text-(--color-text) outline-none focus:border-navy-500"
            >
              <option value="">Select a subject</option>
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </FormField>
        )}
      </form.Field>

      <form.Field
        name="message"
        validators={{
          onChange: ({ value }) => {
            const r = contactFormSchema.shape.message.safeParse(value);
            return r.success ? undefined : r.error.issues[0]?.message;
          },
        }}
      >
        {(field) => (
          <FormField
            label="Message"
            htmlFor={field.name}
            error={field.state.meta.isTouched ? field.state.meta.errors[0] : undefined}
          >
            <textarea
              id={field.name}
              rows={4}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="How can we help?"
              className="w-full resize-none rounded-lg border border-(--color-border) bg-(--color-bg) px-3.5 py-2.5 text-sm text-(--color-text) outline-none focus:border-navy-500"
            />
          </FormField>
        )}
      </form.Field>

      <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            disabled={!canSubmit}
            isLoading={isSubmitting || submitMutation.isPending}
            className="w-fit"
          >
            Send Message
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}