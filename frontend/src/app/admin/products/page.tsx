"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { useAdminProducts, useDeleteProduct } from "@/features/admin/products/hooks";
import ProductForm from "@/components/admin/ProductForm";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import Modal from "@/components/ui/Modal";
import Pagination from "@/components/ui/Pagination";
import Skeleton from "@/components/ui/Skeleton";
import Button from "@/components/ui/Button";

export default function AdminProductsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [formModal, setFormModal] = useState<{ open: boolean; product?: Product }>({
    open: false,
  });
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const { data, isLoading } = useAdminProducts({ page, size: 10, search: search || undefined });
  const deleteProduct = useDeleteProduct();

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-(--color-text)">Manage Products</h1>
        <Button variant="primary" onClick={() => setFormModal({ open: true })}>
          <Plus size={15} />
          Add Product
        </Button>
      </div>

      <div className="mb-4 relative max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-(--color-text-muted)" />
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search products…"
          className="w-full rounded-lg border border-(--color-border) bg-(--color-bg) py-2 pl-9 pr-4 text-sm outline-none focus:border-navy-500"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-(--color-border) bg-(--color-bg)">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-(--color-border) bg-(--color-surface) text-left">
              <th className="px-4 py-3 font-medium text-(--color-text-muted)">Product</th>
              <th className="px-4 py-3 font-medium text-(--color-text-muted)">Category</th>
              <th className="px-4 py-3 font-medium text-(--color-text-muted)">Price</th>
              <th className="px-4 py-3 font-medium text-(--color-text-muted)">Stock</th>
              <th className="px-4 py-3 font-medium text-(--color-text-muted)">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading &&
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-(--color-border) last:border-0">
                  <td className="px-4 py-3" colSpan={5}>
                    <Skeleton className="h-8 w-full" />
                  </td>
                </tr>
              ))}

            {!isLoading &&
              data?.items.map((product) => (
                <tr key={product.id} className="border-b border-(--color-border) last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-(--color-border) bg-(--color-surface)">
                        {product.images?.[0] && (
                          <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="40px" />
                        )}
                      </div>
                      <span className="line-clamp-1 font-medium text-(--color-text)">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-(--color-text-muted)">{product.category}</td>
                  <td className="px-4 py-3 text-(--color-text)">₹{product.price.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={product.stock === 0 ? "text-danger" : "text-(--color-text)"}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setFormModal({ open: true, product })}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-(--color-text-muted) transition-colors hover:bg-(--color-surface) hover:text-navy-600"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(product)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-(--color-text-muted) transition-colors hover:bg-danger/10 hover:text-danger"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

            {!isLoading && data?.items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-(--color-text-muted)">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {data && data.totalPages > 1 && (
        <div className="mt-6">
          <Pagination currentPage={page} totalPages={data.totalPages} onPageChange={setPage} />
        </div>
      )}

      <Modal
        isOpen={formModal.open}
        onClose={() => setFormModal({ open: false })}
        title={formModal.product ? "Edit Product" : "Add Product"}
      >
        <ProductForm product={formModal.product} onSuccess={() => setFormModal({ open: false })} />
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Product"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        isLoading={deleteProduct.isPending}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) {
            deleteProduct.mutate(deleteTarget.id);
            setDeleteTarget(null);
          }
        }}
      />
    </div>
  );
}