"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { useAddresses } from "@/features/address/hooks";
import { useCart } from "@/features/cart/hooks";
import AddressCard from "@/components/checkout/AddressCard";
import AddAddressForm from "@/components/checkout/AddAddressForm";
import DeliveryMethod, { DELIVERY_OPTIONS } from "@/components/checkout/DeliveryMethod";
import Skeleton from "@/components/ui/Skeleton";
import Button from "@/components/ui/Button";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: addresses, isLoading: addressesLoading } = useAddresses();
  const { data: cart, isLoading: cartLoading } = useCart();

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [selectedDelivery, setSelectedDelivery] = useState("standard");
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  useEffect(() => {
    if (addresses && addresses.length > 0 && !selectedAddressId) {
      const defaultAddr = addresses.find((a) => a.isDefault) ?? addresses[0];
      setSelectedAddressId(defaultAddr.id);
    }
  }, [addresses, selectedAddressId]);

  const deliveryPrice = DELIVERY_OPTIONS.find((d) => d.id === selectedDelivery)?.price ?? 0;
  const total = (cart?.total ?? 0) + deliveryPrice - (cart?.shipping ?? 0);

  const canProceed = !!selectedAddressId && !!cart && cart.items.length > 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-(--color-text)">Checkout</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-8 lg:col-span-2">
          {/* Shipping Address */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-semibold text-(--color-text)">Shipping Address</h2>
              {!isAddingAddress && (
                <button
                  onClick={() => setIsAddingAddress(true)}
                  className="flex items-center gap-1 text-sm font-medium text-navy-600 hover:text-navy-700 dark:text-navy-300"
                >
                  <Plus size={14} />
                  Add New
                </button>
              )}
            </div>

            {isAddingAddress ? (
              <div className="rounded-xl border border-(--color-border) p-4">
                <AddAddressForm onSuccess={() => setIsAddingAddress(false)} />
                <button
                  onClick={() => setIsAddingAddress(false)}
                  className="mt-3 text-xs text-(--color-text-muted) hover:text-(--color-text)"
                >
                  Cancel
                </button>
              </div>
            ) : addressesLoading ? (
              <div className="flex flex-col gap-3">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            ) : addresses && addresses.length > 0 ? (
              <div className="flex flex-col gap-3">
                {addresses.map((address) => (
                  <AddressCard
                    key={address.id}
                    address={address}
                    isSelected={selectedAddressId === address.id}
                    onSelect={() => setSelectedAddressId(address.id)}
                  />
                ))}
              </div>
            ) : (
              <p className="rounded-xl border border-(--color-border) p-6 text-center text-sm text-(--color-text-muted)">
                No saved addresses. Add one to continue.
              </p>
            )}
          </section>

          {/* Delivery Method */}
          <section>
            <h2 className="mb-3 text-base font-semibold text-(--color-text)">Delivery Method</h2>
            <DeliveryMethod selected={selectedDelivery} onSelect={setSelectedDelivery} />
          </section>
        </div>

        {/* Order Summary */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <div className="flex flex-col gap-4 rounded-xl border border-(--color-border) bg-(--color-bg) p-5">
            <h2 className="text-base font-semibold text-(--color-text)">Order Summary</h2>

            {cartLoading ? (
              <Skeleton className="h-32 w-full" />
            ) : (
              <>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex justify-between text-(--color-text-muted)">
                    <span>Subtotal</span>
                    <span className="text-(--color-text)">
                      ₹{cart?.subtotal.toLocaleString() ?? 0}
                    </span>
                  </div>
                  {cart && cart.discount > 0 && (
                    <div className="flex justify-between text-success">
                      <span>Discount</span>
                      <span>-₹{cart.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-(--color-text-muted)">
                    <span>Delivery</span>
                    <span className="text-(--color-text)">
                      {deliveryPrice === 0 ? "Free" : `₹${deliveryPrice}`}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between border-t border-(--color-border) pt-4">
                  <span className="text-base font-semibold text-(--color-text)">Total</span>
                  <span className="text-lg font-bold text-(--color-text)">
                    ₹{total.toLocaleString()}
                  </span>
                </div>

                <Button
                  variant="primary"
                  className="w-full"
                  disabled={!canProceed}
                  onClick={() =>
                    router.push(
                      `/payment?addressId=${selectedAddressId}&delivery=${selectedDelivery}`
                    )
                  }
                >
                  Continue to Payment
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}