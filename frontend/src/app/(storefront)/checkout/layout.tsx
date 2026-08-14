import AuthGate from "@/features/auth/AuthGate";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGate mode="authOnly">{children}</AuthGate>;
}