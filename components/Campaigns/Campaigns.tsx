import { Character } from "@/types";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Link } from "@/components/Link";
import { GradientBorder } from "../GradientBorder";
import Image from "next/image";

interface CampaignsProps {
  campaign: string;
  count: number;
  characters?: Character[];
  image?: string;
}

export const Campaigns = ({
  campaign,
  count,
  characters,
  image,
}: CampaignsProps) => {
  return (
    <GradientBorder>
      <Card className="pt-0">
        <CardHeader className="gap-0 border-b p-0">
          {image && (
            <div className="relative w-full pt-[60%]">
              <Image
                src={image || "/images/characters/placeholder.jpeg"}
                alt={campaign}
                priority
                fill
                className="object-cover"
                sizes="(max-width: 639px) 100vw, (max-width: 767px) 50vw, 33vw"
              />
            </div>
          )}
          <div className="px-6 pt-4">
            <h2 className="h2-bold mb-0">{campaign}</h2>
            <p className="text-muted-foreground text-sm">
              {count} Player{count === 1 ? "" : "s"}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="h3-bold mb-2">Players:</h3>
          <ul className="leading-8">
            {characters &&
              characters.map((character: Character) => (
                <li key={`${character.name}-${character.player}`}>
                  <Link href={`/characters/${character.slug}`}>
                    {character.name}
                  </Link>{" "}
                  <span className="text-muted-foreground text-sm">
                    ({character.player})
                  </span>
                </li>
              ))}
          </ul>
        </CardContent>
      </Card>
    </GradientBorder>
  );
};
