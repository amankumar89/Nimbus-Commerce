import AuthGate from "@/features/auth/AuthGate";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGate mode="public">
      {/* Header component goes here later */}
      <main className="min-h-screen bg-[var(--color-bg)]">{children}</main>
      {/* Footer component goes here later */}
    </AuthGate>
  );
}