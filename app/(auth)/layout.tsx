import { Header } from "@/components/Header";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="md:flex-center min-h-screen w-full">{children}</div>
    </>
  );
}
