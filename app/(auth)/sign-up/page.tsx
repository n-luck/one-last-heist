import type { Metadata } from "next";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { SignUpPage as SignUp } from "@/components/pages/signUp";

export const metadata: Metadata = {
  title: "Sign up",
};

const SignUpPage = async (props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) => {
  const { callbackUrl } = await props.searchParams;
  const session = await auth();

  if (session) {
    return redirect(callbackUrl || "/");
  }

  return <SignUp />;
};

export default SignUpPage;
