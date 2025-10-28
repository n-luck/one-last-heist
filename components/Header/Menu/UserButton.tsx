import Link from "next/link";
import { auth } from "@/auth";
import { signOutUser } from "@/lib/actions/user.actions";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { UserRound } from "lucide-react";

export const UserButton = async () => {
  const session = await auth();
  const firstInitial = session?.user?.name?.charAt(0).toUpperCase() ?? "U";

  if (!session)
    return (
      <Button asChild>
        <Link href="/sign-in">
          <UserRound />
          Sign In
        </Link>
      </Button>
    );

  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="w-8 h-8 rounded-full ml-2 flex items-center justify-center bg-accent"
            >
              {firstInitial}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 rounded-none"
          align="end"
          forceMount
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session.user?.name}
              </p>
            </div>
            <div className="flex flex-col space-y-1">
              <p className="text-sm text-muted-foreground leading-none">
                {session.user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem className="p-0 mb-1">
            <Button
              className="w-full py-4 px-2 h-4 justify-start"
              variant="ghost"
              asChild
            >
              <Link href="/user/profile">Profile</Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-0 mb-1">
            <Button
              className="w-full py-4 px-2 h-4 justify-start"
              variant="ghost"
              asChild
            >
              <Link href="/user">My Characters</Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-0 mb-1">
            <form action={signOutUser} className="w-full">
              <Button
                className="w-full py-4 px-2 h-4 justify-start"
                variant="ghost"
              >
                Signout
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
