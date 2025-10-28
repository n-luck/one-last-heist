import type { Metadata } from "next";

import { CharacterForm } from "@/components/CharacterForm";
import { getCharacterBySlug } from "@/lib/actions/character.actions";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Edit Character",
};

const EditCharacterPage = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  const { slug } = await props.params;

  const character = await getCharacterBySlug(slug);

  if (!character) notFound();

  if (session.user?.name !== character.player) {
    redirect("/unauthorized");
  }

  return (
    <div className="container mx-auto space-y-4">
      <CharacterForm character={character} characterId={character.id} type="update" />
    </div>
  );
};

export default EditCharacterPage;
