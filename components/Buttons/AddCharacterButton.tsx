"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useIsLoggedIn } from "@/lib/hooks/useIsLoggedIn";

export const AddCharacterButton = () => {
  const { isLoggedIn } = useIsLoggedIn();

  if (!isLoggedIn) return undefined;

  return (
    <Button asChild>
      <Link href="/characters/create">Add new character</Link>
    </Button>
  );
};
