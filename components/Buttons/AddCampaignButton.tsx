"use client";

import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useIsLoggedIn } from "@/lib/hooks/useIsLoggedIn";

export const AddCampaignButton = () => {
  const { isLoggedIn } = useIsLoggedIn();

  if (!isLoggedIn) return undefined;

  return (
    <Button asChild variant="gradient" size="lg">
      <Link href="/campaigns/create">Add new campaign</Link>
    </Button>
  );
};
