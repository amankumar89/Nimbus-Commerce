import AdminSidebar from "@/components/admin/AdminSidebar";
import AuthGate from "@/features/auth/AuthGate";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGate mode="roleRestricted" allowedRoles={["ADMIN"]}>
      <div className="flex min-h-screen bg-(--color-surface)">
        <AdminSidebar />
        <main className="flex-1 overflow-x-auto p-6">{children}</main>
      </div>
    </AuthGate>
  );
}