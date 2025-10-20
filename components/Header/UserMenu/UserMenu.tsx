"use client"

import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { links } from "./UserMenu.constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const UserMenu = ({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname.includes(link.href) ? "" : "text-muted-foreground"
          )}
        >
          {link.title}
        </Link>
      ))}
    </nav>
  );
};
