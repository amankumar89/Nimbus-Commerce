"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials, authCheckComplete } from "@/store/slices/authSlice";
import { silentRefresh } from "@/features/auth/api";

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return; // guard against double-invoke in React strict mode
    hasRun.current = true;

    (async () => {
      try {
        const { accessToken, user } = await silentRefresh();
        dispatch(setCredentials({ accessToken, user }));
      } catch {
        dispatch(authCheckComplete());
      }
    })();
  }, [dispatch]);

  return <>{children}</>;
}