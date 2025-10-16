import { Character } from "@/types";
import { CharacterCard } from "./CharacterCard";

interface CharacterProps {
  characterData: Character[];
  title?: string;
  limit?: number;
}

export const CharacterList = ({
  characterData,
  title = "John Doe",
  limit,
}: CharacterProps) => {
  if (characterData.length === 0) return;

  const limitedData = limit ? characterData.slice(0, limit) : characterData;

  return (
    <div className="my-10">
      <h2 className="h2-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {limitedData.map((character, i) => (
          <CharacterCard
            key={`${character.name}-${character.player}-${i}`}
            character={character}
          />
        ))}
      </div>
    </div>
  );
};
