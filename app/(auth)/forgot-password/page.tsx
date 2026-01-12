"use client";

import { Button } from "@/components/ui/button";
import { requestPasswordReset } from "@/lib/actions/user.actions";

export default function ForgotPasswordPage() {
  async function onSubmit(formData: FormData) {
    await requestPasswordReset(formData.get("email") as string);
  }

  return (
    <section className="w-full max-w-md mx-auto p-4">
      <form action={onSubmit} className="space-y-4">
        <h1 className="text-xl font-semibold text-center">
          Reset your password
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          className="w-full border p-2"
        />

        <Button type="submit" className="w-full">
          Send reset link
        </Button>

        <p className="text-sm text-center text-muted-foreground">
          If an account exists, you’ll receive an email.
        </p>
      </form>
    </section>
  );
}
