import { getCharacterBySlug } from "@/lib/actions/character.actions";
import { notFound } from "next/navigation";

import { Character } from "@/components/pages/character";

const CharacterPage = async (props: { params: Promise<{ slug: string }> }) => {
  const { slug } = await props.params;

  const character = await getCharacterBySlug(slug);

  if (!character) notFound();

  console.log("CHARACTER 1: ", character);

  return (
    <section className="flex flex-col gap-2">
      <Character character={character} />
    </section>
  );
};

export default CharacterPage;
