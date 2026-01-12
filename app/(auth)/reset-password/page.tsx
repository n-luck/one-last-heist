"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { resetPassword } from "@/lib/actions/user.actions";

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
    <form action={onSubmit}>
      <input
        type="password"
        name="password"
        placeholder="New password"
        required
      />
      <button type="submit">Reset password</button>
    </form>
  );
}
