import { AddCharacterButton } from "@/components/Buttons/AddCharacterButton";
import { CharactersPage as Characters } from "@/components/pages/characters";
import { getAllCharacters } from "@/lib/actions/character.actions";

const CharactersPage = async () => {
  const characters = await getAllCharacters();

  return (
    <section className="relative">
      <h1 className="h1-bold">Characters</h1>
      <div className="absolute right-0 top-0 md:top-2">
        <AddCharacterButton />
      </div>
      <Characters characters={characters} />
    </section>
  );
};

export default CharactersPage;
