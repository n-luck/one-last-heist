import { SessionProvider } from "next-auth/react";

import { auth } from "@/auth";
import { Logo } from "@/components/Header/Logo";
import { Menu } from "@/components/Header/Menu";
import { UserMenu } from "@/components/Header/UserMenu";
import { redirect } from "next/navigation";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if(!session?.user?.name) redirect("/sign-in")
  
  return (
    <SessionProvider session={session}>
      <div className="flex flex-col">
        <div className="border-b">
          <div className="flex items-center h-16 px-4 mx-auto container">
            <Logo />
            <UserMenu className="mx-6" />
            <div className="ml-auto items-center flex space-x-4">
              <Menu />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-4 container mx-auto">
          {children}
        </div>
      </div>
    </SessionProvider>
  );
}
