type PaymentMethod = "CARD" | "UPI" | "NETBANKING" | "COD";

interface OrderItem {
  productId: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  status: "PENDING" | "CONFIRMED" | "PACKED" | "SHIPPED" | "OUT_FOR_DELIVERY" | "DELIVERED";
  total: number;
  estimatedDelivery: string;
  items: OrderItem[];
  createdAt: string;
}

interface PlaceOrderPayload {
  addressId: string;
  deliveryMethod: string;
  paymentMethod: PaymentMethod;
  paymentDetails?: {
    cardLast4?: string;
    upiId?: string;
  };
}