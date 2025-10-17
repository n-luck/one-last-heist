import type { Metadata } from "next";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { Logo } from "@/components/Header/Logo";
import { SignIn } from "@/components/SignIn";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Sign in",
};

const SignInPage = async (props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) => {
  const { callbackUrl } = await props.searchParams;
  const session = await auth();

  if (session) {
    return redirect(callbackUrl || "/");
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="gap-4">
          <Logo />
          <CardTitle className="text-center h1-bold">Sign in</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-4">
          <SignIn />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
