import { Header } from "@/components/Header";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="md:flex-center min-h-screen w-full">{children}</main>
    </>
  );
}
