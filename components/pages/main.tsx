import { CharacterList } from "@/components/Character/CharacterList";
import { Intro } from "../Intro";

import { CHARACTER_LIMIT } from "@/lib/constants";
import { Character } from "@/types";
import { AddCharacterButton } from "../Buttons/AddCharacterButton";

interface MainPageProps {
  latestCharacters: Character[];
}

export const MainPage = ({ latestCharacters }: MainPageProps) => {
  return (
    <>
      <Intro />
      <AddCharacterButton />
      <CharacterList
        characterData={latestCharacters}
        title="Newest Characters"
        limit={CHARACTER_LIMIT}
      />
    </>
  );
};
