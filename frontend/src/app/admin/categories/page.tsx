"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useCategories, useCreateCategory, useDeleteCategory, useUpdateCategory } from "@/features/categories/hooks";

export default function AdminCategoriesPage() {
  const [name, setName] = useState("");
  const [editing, setEditing] = useState<Category | null>(null);
  const { data: categories = [], isLoading } = useCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const value = name.trim();
    if (!value) return;
    if (editing) {
      await updateCategory.mutateAsync({ id: editing.id, name: value });
    } else {
      await createCategory.mutateAsync(value);
    }
    setName("");
    setEditing(null);
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-(--color-text)">Manage Categories</h1>
      </div>

      <form onSubmit={submit} className="mb-6 flex max-w-xl gap-2">
        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Category name"
          aria-label="Category name"
        />
        <Button type="submit" isLoading={createCategory.isPending || updateCategory.isPending}>
          {editing ? <Pencil size={15} /> : <Plus size={15} />}
          {editing ? "Update" : "Add"}
        </Button>
        {editing && (
          <Button type="button" variant="secondary" onClick={() => { setEditing(null); setName(""); }}>
            Cancel
          </Button>
        )}
      </form>

      <div className="overflow-hidden rounded-xl border border-(--color-border) bg-(--color-bg)">
        {isLoading ? (
          <p className="p-6 text-sm text-(--color-text-muted)">Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="p-6 text-sm text-(--color-text-muted)">No categories yet.</p>
        ) : (
          <ul className="divide-y divide-(--color-border)">
            {categories.map((category) => (
              <li key={category.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="font-medium text-(--color-text)">{category.name}</p>
                  <p className="text-xs text-(--color-text-muted)">{category.slug}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    aria-label={`Edit ${category.name}`}
                    onClick={() => { setEditing(category); setName(category.name); }}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-(--color-text-muted) hover:bg-(--color-surface) hover:text-primary-600"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete ${category.name}`}
                    onClick={() => deleteCategory.mutate(category.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-(--color-text-muted) hover:bg-danger/10 hover:text-danger"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}