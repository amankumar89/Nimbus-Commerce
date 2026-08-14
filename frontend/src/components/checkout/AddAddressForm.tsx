/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "@tanstack/react-form";
import { addressSchema } from "@/features/address/schema";
import { useCreateAddress } from "@/features/address/hooks";
import FormField from "@/components/forms/FormField";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function AddAddressForm({ onSuccess }: { onSuccess: () => void }) {
  const createAddress = useCreateAddress();

  const form = useForm({
    defaultValues: {
      fullName: "",
      phone: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India",
    },
    onSubmit: async ({ value }) => {
      const result = addressSchema.safeParse(value);
      if (!result.success) return;
      await createAddress.mutateAsync(result.data);
      onSuccess();
    },
  });

  const fieldConfigs: { name: keyof typeof form.state.values; label: string; span?: boolean }[] = [
    { name: "fullName", label: "Full Name", span: true },
    { name: "phone", label: "Phone Number", span: true },
    { name: "line1", label: "Address Line 1" },
    { name: "line2", label: "Address Line 2 (optional)" },
    { name: "city", label: "City" },
    { name: "state", label: "State" },
    { name: "postalCode", label: "Postal Code" },
    { name: "country", label: "Country" },
  ];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex flex-col gap-4"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fieldConfigs.map(({ name, label, span }) => (
          <form.Field
            key={name}
            name={name}
            validators={{
              onChange: ({ value }) => {
                if (name === "line2") return undefined; // optional
                const shape = (addressSchema.shape as any)[name];
                const r = shape.safeParse(value);
                return r.success ? undefined : r.error.issues[0]?.message;
              },
            }}
          >
            {(field) => (
              <div className={span ? "sm:col-span-2" : ""}>
                <FormField
                  label={label}
                  htmlFor={field.name}
                  error={field.state.meta.isTouched ? field.state.meta.errors[0] : undefined}
                >
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    hasError={field.state.meta.isTouched && !!field.state.meta.errors.length}
                  />
                </FormField>
              </div>
            )}
          </form.Field>
        ))}
      </div>

      <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            disabled={!canSubmit}
            isLoading={isSubmitting || createAddress.isPending}
            className="w-fit"
          >
            Save Address
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}