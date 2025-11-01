"use client";

import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useIsLoggedIn } from "@/lib/hooks/useIsLoggedIn";

export const AddCharacterButton = () => {
  const { isLoggedIn } = useIsLoggedIn();

  if (!isLoggedIn) return undefined;

  return (
    <Button asChild variant="gradient" size="lg">
      <Link href="/characters/create">Add new character</Link>
    </Button>
  );
};
