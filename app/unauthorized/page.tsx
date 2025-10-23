"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Header/Logo";

const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Logo />
      <div className="p-6 rounded-lg shadow-md text-center w-1/3">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-destructive">
          You don&apos;t have permission to edit this character.
        </p>
        <Button
          variant="outline"
          className="mt-4 ml-2"
          onClick={() => (window.location.href = "/")}
        >
          Back to home
        </Button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
