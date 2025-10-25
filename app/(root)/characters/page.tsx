import { CharactersPage as Characters } from "@/components/pages/characters";
import { getAllCharacters } from "@/lib/actions/character.actions";

const CharactersPage = async () => {
  const characters = await getAllCharacters();

  return <Characters characters={characters} />;
};

export default CharactersPage;
