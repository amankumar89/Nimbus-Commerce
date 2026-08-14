"use client";

import { useState } from "react";
import { Plus, Star, Trash2 } from "lucide-react";
import { useAddresses, useSetDefaultAddress, useDeleteAddress } from "@/features/address/hooks";
import AddAddressForm from "@/components/checkout/AddAddressForm";
import Skeleton from "@/components/ui/Skeleton";
import Button from "@/components/ui/Button";

export default function AddressesPage() {
  const { data: addresses, isLoading } = useAddresses();
  const setDefault = useSetDefaultAddress();
  const deleteAddress = useDeleteAddress();
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-(--color-text)">My Addresses</h1>
        {!isAdding && (
          <Button variant="primary" onClick={() => setIsAdding(true)}>
            <Plus size={15} />
            Add Address
          </Button>
        )}
      </div>
      {isAdding && (
        <div className="mb-6 rounded-xl border border-(--color-border) p-5">
          <AddAddressForm onSuccess={() => setIsAdding(false)} />
          <button
            onClick={() => setIsAdding(false)}
            className="mt-3 text-xs text-(--color-text-muted) hover:text-(--color-text)"
          >
            Cancel
          </button>
        </div>
      )}
      {isLoading ? (
        <div className="flex flex-col gap-3">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      ) : addresses && addresses.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="flex flex-col gap-2 rounded-xl border border-(--color-border) bg-(--color-bg) p-4"
            >
              <div className="flex items-start justify-between">
                <p className="text-sm font-semibold text-(--color-text)">{address.fullName}</p>
                {address.isDefault && (
                  <span className="rounded-full bg-navy-700 px-2 py-0.5 text-[10px] font-bold text-white">
                    Default
                  </span>
                )}
              </div>
              <p className="text-xs text-(--color-text-muted)">
                {address.line1}
                {address.line2 ? `, ${address.line2}` : ""}, {address.city}, {address.state}{" "}
                {address.postalCode}
              </p>
              <p className="text-xs text-(--color-text-muted)">{address.phone}</p>
              <div className="mt-2 flex gap-3 border-t border-(--color-border) pt-3">
                {!address.isDefault && (
                  <button
                    onClick={() => setDefault.mutate(address.id)}
                    className="flex items-center gap-1 text-xs font-medium text-navy-600 hover:text-navy-700 dark:text-navy-300"
                  >
                    <Star size={12} />
                    Set as Default
                  </button>
                )}
                <button
                  onClick={() => deleteAddress.mutate(address.id)}
                  className="flex items-center gap-1 text-xs font-medium text-danger hover:text-danger/80"
                >
                  <Trash2 size={12} />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !isAdding && (
          <p className="rounded-xl border border-(--color-border) p-8 text-center text-sm text-(--color-text-muted)">
            No addresses saved yet.
          </p>
        )
      )}
    </div>
  );
}