"use client";

import { useSession } from "next-auth/react";

export function useIsPlayer(playerName?: string) {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

  const isPlayer =
    isAuthenticated && playerName ? session?.user?.name === playerName : false;

  return { isPlayer, isLoading, session };
}
