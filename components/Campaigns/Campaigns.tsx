import { Character } from "@/types";
import { Card, CardContent, CardHeader } from "../ui/card";
import Link from "next/link";

interface CampaignsProps {
  campaign: string;
  count: number;
  characters?: Character[];
}

export const Campaigns = ({ campaign, count, characters }: CampaignsProps) => {
  return (
    <Card>
      <CardHeader className="gap-0 border-b">
        <h2 className="h2-bold mb-0">{campaign}</h2>
        <p className="text-muted-foreground text-sm">
          {count} Player{count === 1 ? "" : "s"}
        </p>
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
  );
};
