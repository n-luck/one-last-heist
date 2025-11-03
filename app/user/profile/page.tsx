import type { Metadata } from "next";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

import { ProfileForm } from "@/components/ProfileForm";

export const metadata: Metadata = {
  title: "Player Profile",
};

const ProfilePage = async () => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <section className="max-w-md mx-auto space-y-4">
        <h1 className="h2-bold">Profile</h1>
        <ProfileForm />
      </section>
    </SessionProvider>
  );
};

export default ProfilePage;
