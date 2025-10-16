import { CharacterList } from "@/components/Character/CharacterList";
import { getLatestCharacters } from "@/lib/actions/character.actions";
import { CHARACTER_LIMIT } from "@/lib/constants";

const Homepage = async () => {
  const latestCharacters = await getLatestCharacters();

  return (
    <>
      <CharacterList
        characterData={latestCharacters}
        title="Newest Characters"
        limit={CHARACTER_LIMIT}
      />
    </>
  );
};

export default Homepage;
