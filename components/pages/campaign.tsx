import Image from "next/image";
import Link from "next/link";

import { Campaign as CampaignType, Character } from "@/types";
import { CharacterList } from "@/components/Character/CharacterList";
import { Button } from "@/components/ui/button";

interface CampaignProps {
  campaign: CampaignType;
  characters?: Character[];
  player?: string;
}

export const Campaign = ({ campaign, characters, player }: CampaignProps) => {
  const { name, image, notes, slug, players } = campaign;

  const isCampaignPlayer = player ? players.includes(player) : false;

  return (
    <section className="flex flex-col space-y-2 relative">
      <h1 className="h1-bold mb-4">{name}</h1>
      {isCampaignPlayer && (
        <div className="absolute right-0 top-0">
          <Button size="sm" asChild>
            <Link href={`/campaigns/${slug}/edit`}>Edit</Link>
          </Button>
        </div>
      )}
      <p>{notes}</p>
      {image && (
        <div className="relative md:w-md pt-[20%]">
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
      {characters && (
        <CharacterList title="Active characters" characterData={characters} />
      )}
    </section>
  );
};
