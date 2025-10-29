import Link from "next/link";

import { Fingerprint } from "lucide-react";

import { APP_NAME } from "@/lib/constants";

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex-center" title="One Last Heist Logo">
        <Fingerprint className="inline text-cyan-600 w-10 h-10 md:h-6 md:w-6" />{" "}
        <span className="uppercase font-bold ml-1 hidden md:flex">
          {APP_NAME}
        </span>
        <span className="text-xs text-cyan-600 ml-1">v0.3 alpha</span>
      </div>
    </Link>
  );
};
