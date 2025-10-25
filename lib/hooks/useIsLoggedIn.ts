"use client";

import { useSession } from "next-auth/react";

export function useIsLoggedIn() {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  const isLoggedIn = status === "authenticated";

  return { isLoggedIn, isLoading, session };
}
