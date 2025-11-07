import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster, toast } from 'sonner'

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className="flex h-screen flex-col">
        <Toaster />
        <Header />
        <main className="flex-1 wrapper">{children}</main>
        <Footer />
      </div>
    </SessionProvider>
  );
}
