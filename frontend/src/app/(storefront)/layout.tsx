import AuthGate from "@/features/auth/AuthGate";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGate mode="public">
      <Header />
      <main className="min-h-screen bg-(--color-bg)">{children}</main>
      <Footer />
    </AuthGate>
  );
}