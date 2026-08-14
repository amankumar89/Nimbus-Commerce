"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import FormField from "@/components/forms/FormField";

export default function CardPaymentForm() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <FormField label="Cardholder Name" htmlFor="cardName">
        <Input
          id="cardName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name on card"
        />
      </FormField>
      <FormField label="Card Number" htmlFor="cardNumber">
        <Input
          id="cardNumber"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="1234 5678 9012 3456"
          maxLength={19}
        />
      </FormField>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Expiry" htmlFor="expiry">
          <Input
            id="expiry"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            placeholder="MM/YY"
            maxLength={5}
          />
        </FormField>
        <FormField label="CVV" htmlFor="cvv">
          <Input
            id="cvv"
            type="password"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="•••"
            maxLength={4}
          />
        </FormField>
      </div>
      <p className="text-xs text-(--color-text-muted)">
        🔒 This is a placeholder form. Real card processing requires a payment gateway integration (e.g. Razorpay/Stripe).
      </p>
    </div>
  );
}