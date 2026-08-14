import AccountSidebar from "@/components/account/AccountSidebar";
import AuthGate from "@/features/auth/AuthGate";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGate mode="authOnly">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-4 py-8 lg:flex-row">
        <AccountSidebar />
        <main className="flex-1">{children}</main>
      </div>
    </AuthGate>
  );
}