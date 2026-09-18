import AuthGate from "@/features/auth/AuthGate";

export default function PaymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGate mode="authOnly">{children}</AuthGate>;
}