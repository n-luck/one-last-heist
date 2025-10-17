import Link from "next/link";

interface CustomLinkProps {
  href: string;
  children: string;
}

export const CustomLink = ({ href, children }: CustomLinkProps) => {
  return <Link href={href} className="underline hover:no-underline">{children}</Link>;
};
