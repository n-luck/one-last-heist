import { CharactersPage as Characters } from "@/components/pages/characters";
import { getAllCharacters } from "@/lib/actions/character.actions";

const CharactersPage = async () => {
  const characters = await getAllCharacters();

  return (
    <>
      <h1 className="h1-bold mb-6">Characters</h1>
      <Characters characters={characters} />
    </>
  );
};

export default CharactersPage;
