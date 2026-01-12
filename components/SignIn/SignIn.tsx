"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signInWithCredentials } from "@/lib/actions/user.actions";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Link } from "../Link";

export const SignIn = () => {
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: "",
  });

  const SignInButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button disabled={pending} className="w-full">
        {pending ? "Signing in..." : "Sign in"}
      </Button>
    );
  };

  return (
    <form action={action}>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="email"
          />
          <p className="text-sm text-muted-foreground">
            <Link href="/forgot-password">Forgot your password?</Link>
          </p>
        </div>
        <SignInButton />
        {data && !data.success && (
          <p className="text-center text-destructive">{data.message}</p>
        )}
        <p className="text-sm text-center text-muted-foreground">
          Don&apos;t have an account yet? <Link href="/sign-up">Sign up</Link>.
        </p>
      </div>
    </form>
  );
};
