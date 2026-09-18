import AuthGate from "@/features/auth/AuthGate";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGate mode="guestOnly">
      <div className="flex min-h-screen items-center justify-center bg-(--color-surface) px-4">
        <div className="w-full max-w-md rounded-2xl border border-(--color-border) bg-(--color-bg) p-8 shadow-xl shadow-navy-900/5">
          {children}
        </div>
      </div>
    </AuthGate>
  );
}