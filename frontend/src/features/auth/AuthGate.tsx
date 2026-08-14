"use client";

import type { ReactNode } from "react";
import { useAuthGate } from "@/features/auth/useAuthGate";
import FullScreenLoader from "@/components/ui/FullScreenLoader";

type GateMode = "public" | "authOnly" | "guestOnly" | "roleRestricted";

interface AuthGateProps {
  mode: GateMode;
  allowedRoles?: Role[];
  redirectTo?: string;
  children: ReactNode;
}

export default function AuthGate({
  mode,
  allowedRoles,
  redirectTo,
  children,
}: AuthGateProps) {
  const { isChecking, isAllowed } = useAuthGate({ mode, allowedRoles, redirectTo });

  if (mode === "public") {
    // No gating needed — render immediately, don't block on auth check
    return <>{children}</>;
  }

  if (isChecking) {
    return <FullScreenLoader />;
  }

  if (!isAllowed) {
    // Redirect is already firing in useEffect inside useAuthGate.
    // Render nothing to avoid flashing protected content.
    return null;
  }

  return <>{children}</>;
}