import Link from "next/link";
import { Button } from "@/components/ui/button";

import { Fingerprint, HatGlasses, MenuIcon, Swords } from "lucide-react";
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
        <Button asChild variant="ghost">
          <Link href="/characters">
            <HatGlasses />
            Characters
          </Link>
        </Button>
        <UserButton />
      </nav>
      {/* MOBILE NAV */}
      <nav className="md:hidden flex-center">
        <ThemeToggle />
        <UserButton />
        <Sheet>
          <SheetTrigger className="align-middle ml-8">
            <MenuIcon />
          </SheetTrigger>
          <SheetContent className="flex flex-cold items-start p-3">
            <SheetTitle className="flex-center text-xl pb-3 border-b">
              <Fingerprint className="inline w-5 h-5 mr-1" /> {APP_NAME}
            </SheetTitle>
            <Button asChild variant="ghost" className="text-lg">
              <Link href="/campaigns">
                <Swords />
                Campaigns
              </Link>
            </Button>
            <Button asChild variant="ghost" className="text-lg">
              <Link href="/characters">
                <HatGlasses /> Characters
              </Link>
            </Button>
            <SheetDescription />
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};
