"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function useQueryParamsState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = useMemo(() => {
    const obj: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }, [searchParams]);

  const setParam = useCallback(
    (key: string, value: string | number | undefined) => {
      const next = new URLSearchParams(searchParams.toString());
      if (value === undefined || value === "") {
        next.delete(key);
      } else {
        next.set(key, String(value));
      }
      if (key !== "page") {
        next.delete("page");
      }
      router.push(`${pathname}?${next.toString()}`);
    },
    [pathname, router, searchParams]
  );

  return { params, setParam };
}