"use client";

import { useForm } from "@tanstack/react-form";
import { profileSchema, changePasswordSchema } from "@/features/user/schema";
import { useUpdateProfile, useChangePassword } from "@/features/user/hooks";
import { useAppSelector } from "@/store/hooks";
import FormField from "@/components/forms/FormField";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function ProfilePage() {
  const user = useAppSelector((state) => state.auth.user);
  const updateProfile = useUpdateProfile();
  const changePassword = useChangePassword();

  const profileForm = useForm({
    defaultValues: { name: user?.name ?? "", email: user?.email ?? "" },
    onSubmit: async ({ value }) => {
      const result = profileSchema.safeParse(value);
      if (!result.success) return;
      await updateProfile.mutateAsync(result.data);
    },
  });

  const passwordForm = useForm({
    defaultValues: { currentPassword: "", newPassword: "", confirmNewPassword: "" },
    onSubmit: async ({ value, formApi }) => {
      const result = changePasswordSchema.safeParse(value);
      if (!result.success) return;
      await changePassword.mutateAsync({
        currentPassword: result.data.currentPassword,
        newPassword: result.data.newPassword,
      });
      formApi.reset();
    },
  });

  if (!user) return null;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-(--color-text)">My Profile</h1>
        <p className="mt-1 text-sm text-(--color-text-muted)">
          Manage your personal details and account settings
        </p>
      </div>
      <section className="rounded-xl border border-(--color-border) bg-(--color-bg) p-6">
        <h2 className="mb-4 text-base font-semibold text-(--color-text)">Personal Details</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            profileForm.handleSubmit();
          }}
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <profileForm.Field
              name="name"
              validators={{
                onChange: ({ value }) => {
                  const r = profileSchema.shape.name.safeParse(value);
                  return r.success ? undefined : r.error.issues[0]?.message;
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
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    hasError={field.state.meta.isTouched && !!field.state.meta.errors.length}
                  />
                </FormField>
              )}
            </profileForm.Field>
            <profileForm.Field
              name="email"
              validators={{
                onChange: ({ value }) => {
                  const r = profileSchema.shape.email.safeParse(value);
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
                  />
                </FormField>
              )}
            </profileForm.Field>
          </div>
          <profileForm.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit}
                isLoading={isSubmitting || updateProfile.isPending}
                className="w-fit"
              >
                Save Changes
              </Button>
            )}
          </profileForm.Subscribe>
        </form>
      </section>
      <section className="rounded-xl border border-(--color-border) bg-(--color-bg) p-6">
        <h2 className="mb-4 text-base font-semibold text-(--color-text)">Change Password</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            passwordForm.handleSubmit();
          }}
          className="flex flex-col gap-4"
        >
          <passwordForm.Field
            name="currentPassword"
            validators={{
              onChange: ({ value }) => (value ? undefined : "Current password is required"),
            }}
          >
            {(field) => (
              <FormField
                label="Current Password"
                htmlFor={field.name}
                error={field.state.meta.isTouched ? field.state.meta.errors[0] : undefined}
              >
                <Input
                  id={field.name}
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  hasError={field.state.meta.isTouched && !!field.state.meta.errors.length}
                />
              </FormField>
            )}
          </passwordForm.Field>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <passwordForm.Field
              name="newPassword"
              validators={{
                onChange: ({ value }) =>
                  value.length >= 6 ? undefined : "Must be at least 6 characters",
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
                    type="password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    hasError={field.state.meta.isTouched && !!field.state.meta.errors.length}
                  />
                </FormField>
              )}
            </passwordForm.Field>
            <passwordForm.Field
              name="confirmNewPassword"
              validators={{
                onChangeListenTo: ["newPassword"],
                onChange: ({ value, fieldApi }) => {
                  const newPassword = fieldApi.form.getFieldValue("newPassword");
                  if (!value) return "Please confirm your new password";
                  if (value !== newPassword) return "Passwords do not match";
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
                    type="password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    hasError={field.state.meta.isTouched && !!field.state.meta.errors.length}
                  />
                </FormField>
              )}
            </passwordForm.Field>
          </div>
          <passwordForm.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit}
                isLoading={isSubmitting || changePassword.isPending}
                className="w-fit"
              >
                Update Password
              </Button>
            )}
          </passwordForm.Subscribe>
        </form>
      </section>
    </div>
  );
}