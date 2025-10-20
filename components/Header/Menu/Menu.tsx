import Link from "next/link";
import { Button } from "@/components/ui/button";

import { Fingerprint, MenuIcon, Swords } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { APP_NAME } from "@/lib/constants";
import { UserButton } from "./UserButton";

export const Menu = () => {
  return (
    <div className="flex justify-end gap-3">
      {/* DESKTOP NAV  */}
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <ThemeToggle />
        <Button asChild variant="ghost">
          <Link href="/campaigns">
            <Swords />
            Campaigns
          </Link>
        </Button>
        <UserButton />
      </nav>
      {/* MOBILE NAV */}
      <nav className="md:hidden flex-center">
        <ThemeToggle />
        <Sheet>
          <SheetTrigger className="align-middle">
            <MenuIcon />
          </SheetTrigger>
          <SheetContent className="flex flex-cold items-start p-3">
            <SheetTitle className="flex-center text-xl pb-3 border-b">
              <Fingerprint className="inline w-5 h-5 mr-1" /> {APP_NAME}
            </SheetTitle>
            <Button asChild variant="ghost" className="text-lg">
              <Link href="/campaigns">
                <Swords /> Campaigns
              </Link>
            </Button>
            <UserButton />
            <SheetDescription />
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};
