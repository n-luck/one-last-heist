import { CharacterList } from "@/components/Character/CharacterList";
import { Button } from "@/components/ui/button";
import { getLatestCharacters } from "@/lib/actions/character.actions";
import { CHARACTER_LIMIT } from "@/lib/constants";
import Link from "next/link";

const Homepage = async () => {
  const latestCharacters = await getLatestCharacters();

  return (
    <>
      <Button asChild>
        <Link href="/characters/create">Add new character</Link>
      </Button>
      <CharacterList
        characterData={latestCharacters}
        title="Newest Characters"
        limit={CHARACTER_LIMIT}
      />
    </>
  );
};

export default Homepage;
