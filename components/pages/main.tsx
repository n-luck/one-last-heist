import { CharacterList } from "@/components/Character/CharacterList";
import { Intro } from "../Intro";

import { CHARACTER_LIMIT } from "@/lib/constants";
import { Character } from "@/types";
import { AddCharacterButton } from "../Buttons/AddCharacterButton";
import { AddCampaignButton } from "../Buttons/AddCampaignButton";

interface MainPageProps {
  latestCharacters: Character[];
}

export const MainPage = ({ latestCharacters }: MainPageProps) => {
  return (
    <>
      <Intro />
      <section>
        <CharacterList
          characterData={latestCharacters}
          title="Newest Characters"
          limit={CHARACTER_LIMIT}
        />
      </section>
      <section className="flex justify-center gap-6 mt-10">
        <AddCharacterButton /> <AddCampaignButton />
      </section>
    </>
  );
};
