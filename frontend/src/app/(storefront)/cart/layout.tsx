import AuthGate from "@/features/auth/AuthGate";

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGate mode="authOnly">{children}</AuthGate>;
}