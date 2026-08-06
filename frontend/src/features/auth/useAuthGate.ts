"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";

type GateMode = "public" | "authOnly" | "guestOnly" | "roleRestricted";

interface UseAuthGateOptions {
  mode: GateMode;
  allowedRoles?: Role[];
  redirectTo?: string;
}

interface UseAuthGateResult {
  isChecking: boolean;
  isAllowed: boolean;
}

export function useAuthGate({
  mode,
  allowedRoles,
  redirectTo,
}: UseAuthGateOptions): UseAuthGateResult {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthChecked } = useAppSelector((state) => state.auth);

  const isAuthenticated = !!user;

  useEffect(() => {
    if (mode === "public" || !isAuthChecked) return;

    switch (mode) {
      case "guestOnly":
        if (isAuthenticated) {
          router.replace(redirectTo ?? "/");
        }
        break;

      case "authOnly":
        if (!isAuthenticated) {
          router.replace(
            redirectTo ?? `/login?redirect=${encodeURIComponent(pathname)}`
          );
        }
        break;

      case "roleRestricted":
        if (!isAuthenticated) {
          router.replace(
            redirectTo ?? `/login?redirect=${encodeURIComponent(pathname)}`
          );
        } else if (allowedRoles && !allowedRoles.includes(user!.role)) {
          router.replace(redirectTo ?? "/");
        }
        break;
    }
  }, [mode, isAuthChecked, isAuthenticated, allowedRoles, pathname, router, redirectTo, user]);

  if (mode === "public") {
    return { isChecking: false, isAllowed: true };
  }

  const isChecking = !isAuthChecked;

  let isAllowed = true;
  if (isAuthChecked) {
    if (mode === "guestOnly") isAllowed = !isAuthenticated;
    if (mode === "authOnly") isAllowed = isAuthenticated;
    if (mode === "roleRestricted") {
      isAllowed =
        isAuthenticated && (!allowedRoles || allowedRoles.includes(user!.role));
    }
  }

  return { isChecking, isAllowed };
}