import { Character } from "@/types";
import { CharacterList } from "../Character/CharacterList";

interface CharactersPageProps {
  characters: Character[];
}

export const CharactersPage = ({ characters }: CharactersPageProps) => {
  return (
    <>
      <CharacterList characterData={characters} title="All Characters" />
    </>
  );
};
