import { Campaign as CampaignType, Character } from "@/types";
import { CharacterList } from "../Character/CharacterList";
import Image from "next/image";

interface CampaignProps {
  campaign: CampaignType;
  characters?: Character[];
}

export const Campaign = ({ campaign, characters }: CampaignProps) => {
  const { name, image, notes } = campaign;

  return (
    <div className="space-y-8">
      <h1 className="h1-bold mb-4">{name}</h1>
      <p>{notes}</p>
      {image && (
        <div className="relative w-md pt-[20%]">
          <Image
            src={image || "/images/characters/placeholder.jpeg"}
            alt={name}
            priority
            fill
            className="object-cover"
            sizes="(max-width: 639px) 100vw, (max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
          />
        </div>
      )}
      {characters && <CharacterList title="Active characters" characterData={characters} />}
    </div>
  );
};
