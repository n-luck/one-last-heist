import type { Metadata } from "next";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { CharacterForm } from "@/components/CharacterForm";

export const metadata: Metadata = {
  title: "Create Character",
};

const CreateCharacterPage = async () => {
  const session = await auth();
  if (!session || !session.user || !session.user.name) redirect("/sign-in");

  return (
    <div className="container mx-auto space-y-4">
      <h2 className="h2-bold">Create Character</h2>
      <CharacterForm type="create" player={session.user?.name} />
    </div>
  );
};

export default CreateCharacterPage;
