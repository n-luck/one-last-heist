"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { resetPassword } from "@/lib/actions/user.actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");

  async function onSubmit(formData: FormData) {
    const password = formData.get("password") as string;

    const res = await resetPassword(token!, password);

    if (res.success) {
      router.push("/sign-in");
    }
  }

  if (!token) return <p>Invalid link</p>;

  return (
    <section className="w-full max-w-md mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-center h1-bold mb-1">
            Reset Password
          </CardTitle>
          <CardDescription className="text-center">
            Enter your information below to change your password.
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-4">
          <form action={onSubmit}>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">New Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="New password"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Reset password
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
