import Link from "next/link";
import { Button } from "../ui/button";
import { APP_NAME } from "@/lib/constants";

import { Fingerprint, UserRound } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <Link href="/">
            <div className="flex-center">
              <Fingerprint className="inline text-teal-600" />{" "}
              <span className="uppercase font-bold ml-1 hidden md:flex">
                {APP_NAME}
              </span>
            </div>
          </Link>
        </div>
        <div className="flex-center">
          <ThemeToggle />
          <Button asChild variant="ghost">
            <Link href="/campaigns">Campaigns</Link>
          </Button>
          <Button asChild>
            <Link href="/sign-in">
              <UserRound />
              Sign In
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
