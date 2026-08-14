"use client";

import { useForm } from "@tanstack/react-form";
import { productFormSchema } from "@/features/admin/products/schema";
import { useCreateProduct, useUpdateProduct } from "@/features/admin/products/hooks";
import FormField from "@/components/forms/FormField";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface ProductFormProps {
  product?: Product;
  onSuccess: () => void;
}

const CATEGORIES = ["Electronics", "Fashion", "Home & Kitchen", "Beauty", "Sports", "Books"];

export default function ProductForm({ product, onSuccess }: ProductFormProps) {
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const isEditing = !!product;

  const form = useForm({
    defaultValues: {
      name: product?.name ?? "",
      brand: product?.brand ?? "",
      category: product?.category ?? "",
      price: product?.price ?? 0,
      discountPrice: product?.discountPrice ?? 0,
      stock: product?.stock ?? 0,
      description: product?.description ?? "",
      images: product?.images?.join(", ") ?? "",
    },
    onSubmit: async ({ value }) => {
      const result = productFormSchema.safeParse(value);
      if (!result.success) return;

      const payload = {
        ...result.data,
        discountPrice: result.data.discountPrice || undefined,
        images: result.data.images.split(",").map((s: string) => s.trim()).filter(Boolean),
        specifications: product?.specifications ?? {},
      };

      if (isEditing) {
        await updateProduct.mutateAsync({ id: product.id, payload });
      } else {
        await createProduct.mutateAsync(payload);
      }
      onSuccess();
    },
  });

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
        <form.Field
          name="name"
          validators={{
            onChange: ({ value }) => {
              const r = productFormSchema.shape.name.safeParse(value);
              return r.success ? undefined : r.error.issues[0]?.message;
            },
          }}
        >
          {(field) => (
            <FormField
              label="Product Name"
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
        </form.Field>

        <form.Field
          name="brand"
          validators={{
            onChange: ({ value }) => {
              const r = productFormSchema.shape.brand.safeParse(value);
              return r.success ? undefined : r.error.issues[0]?.message;
            },
          }}
        >
          {(field) => (
            <FormField
              label="Brand"
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
        </form.Field>
      </div>

      <form.Field
        name="category"
        validators={{
          onChange: ({ value }) => (value ? undefined : "Category is required"),
        }}
      >
        {(field) => (
          <FormField
            label="Category"
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
              <option value="">Select category</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </FormField>
        )}
      </form.Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <form.Field
          name="price"
          validators={{
            onChange: ({ value }) => {
              const r = productFormSchema.shape.price.safeParse(value);
              return r.success ? undefined : r.error.issues[0]?.message;
            },
          }}
        >
          {(field) => (
            <FormField
              label="Price (₹)"
              htmlFor={field.name}
              error={field.state.meta.isTouched ? field.state.meta.errors[0] : undefined}
            >
              <Input
                id={field.name}
                type="number"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                hasError={field.state.meta.isTouched && !!field.state.meta.errors.length}
              />
            </FormField>
          )}
        </form.Field>

        <form.Field name="discountPrice">
          {(field) => (
            <FormField label="Discount Price (₹)" htmlFor={field.name}>
              <Input
                id={field.name}
                type="number"
                value={field.state.value}
                onChange={(e) => field.handleChange(Number(e.target.value))}
              />
            </FormField>
          )}
        </form.Field>

        <form.Field
          name="stock"
          validators={{
            onChange: ({ value }) => {
              const r = productFormSchema.shape.stock.safeParse(value);
              return r.success ? undefined : r.error.issues[0]?.message;
            },
          }}
        >
          {(field) => (
            <FormField
              label="Stock"
              htmlFor={field.name}
              error={field.state.meta.isTouched ? field.state.meta.errors[0] : undefined}
            >
              <Input
                id={field.name}
                type="number"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                hasError={field.state.meta.isTouched && !!field.state.meta.errors.length}
              />
            </FormField>
          )}
        </form.Field>
      </div>

      <form.Field
        name="images"
        validators={{
          onChange: ({ value }) => {
            const r = productFormSchema.shape.images.safeParse(value);
            return r.success ? undefined : r.error.issues[0]?.message;
          },
        }}
      >
        {(field) => (
          <FormField
            label="Image URLs (comma-separated)"
            htmlFor={field.name}
            error={field.state.meta.isTouched ? field.state.meta.errors[0] : undefined}
          >
            <Input
              id={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="https://..., https://..."
              hasError={field.state.meta.isTouched && !!field.state.meta.errors.length}
            />
          </FormField>
        )}
      </form.Field>

      <form.Field
        name="description"
        validators={{
          onChange: ({ value }) => {
            const r = productFormSchema.shape.description.safeParse(value);
            return r.success ? undefined : r.error.issues[0]?.message;
          },
        }}
      >
        {(field) => (
          <FormField
            label="Description"
            htmlFor={field.name}
            error={field.state.meta.isTouched ? field.state.meta.errors[0] : undefined}
          >
            <textarea
              id={field.name}
              rows={4}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
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
            isLoading={isSubmitting || createProduct.isPending || updateProduct.isPending}
            className="w-fit"
          >
            {isEditing ? "Save Changes" : "Create Product"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}