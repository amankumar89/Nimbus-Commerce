"use client";

import { useState } from "react";
import Image from "next/image";
import Input from "@/components/ui/Input";
import FormField from "@/components/forms/FormField";

interface UpiPaymentFormProps {
  upiId: string;
  onUpiIdChange: (value: string) => void;
  amount: number;
}

export default function UpiPaymentForm({ upiId, onUpiIdChange, amount }: UpiPaymentFormProps) {
  const [mode, setMode] = useState<"id" | "qr">("id");

  // Placeholder QR — replace with backend-generated UPI payload/QR in production
  const qrData = encodeURIComponent(`upi://pay?pa=nimbus@upi&pn=Nimbus&am=${amount}&cu=INR`);
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrData}`;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("id")}
          className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${mode === "id"
            ? "border-navy-700 bg-navy-700 text-white"
            : "border-(--color-border) text-(--color-text-muted)"
            }`}
        >
          Enter UPI ID
        </button>
        <button
          type="button"
          onClick={() => setMode("qr")}
          className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${mode === "qr"
            ? "border-navy-700 bg-navy-700 text-white"
            : "border-(--color-border) text-(--color-text-muted)"
            }`}
        >
          Scan QR Code
        </button>
      </div>

      {mode === "id" ? (
        <FormField label="UPI ID" htmlFor="upiId">
          <Input
            id="upiId"
            value={upiId}
            onChange={(e) => onUpiIdChange(e.target.value)}
            placeholder="yourname@upi"
          />
        </FormField>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-(--color-border) p-6">
          <Image src={qrImageUrl} alt="UPI QR Code" width={180} height={180} unoptimized />
          <p className="text-center text-xs text-(--color-text-muted)">
            Scan with any UPI app to pay ₹{amount.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}