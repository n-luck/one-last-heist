import { Character } from "@/types";
import { CharacterList } from "../Character/CharacterList";
import { AddCharacterButton } from "../Buttons/AddCharacterButton";

interface CharactersPageProps {
  characters: Character[];
}

export const CharactersPage = ({ characters }: CharactersPageProps) => {
  return (
    <>
      <AddCharacterButton />
      <CharacterList characterData={characters} title="All Characters" />
    </>
  );
};
