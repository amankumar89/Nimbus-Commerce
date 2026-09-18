"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials, logout } from "@/store/slices/authSlice";
import { silentRefresh } from "@/features/auth/api";
// import { useRouter } from "next/navigation";

function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  // const router = useRouter();
  const dispatch = useAppDispatch();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return; // guard against double-invoke in React strict mode
    hasRun.current = true;

    (async () => {
      try {
        const { data: { accessToken, user } } = await silentRefresh();
        dispatch(setCredentials({ accessToken, user }));
        // router.replace(user.role === 'ADMIN' ? "/admin/dashboard" : "/")
      } catch {
        dispatch(logout());
        // router.replace("/login");
      }
    })();
  }, [dispatch]);

  return <>{children}</>;
}

export default AuthInitializer;