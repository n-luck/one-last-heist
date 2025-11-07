"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Character } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GradientBorder } from "@/components/GradientBorder";
import { Button } from "@/components/ui/button";
import {Link as CustomLink} from "@/components/Link"

interface CampaignCardProps {
  campaign: string;
  count: number;
  characters?: Character[];
  image?: string;
  slug: string;
  userName?: string;
  gameMaster?: string;
}

export const CampaignCard = ({
  campaign,
  count,
  characters,
  image,
  slug,
  userName,
  gameMaster,
}: CampaignCardProps) => {
  const [isHover, setIsHover] = useState(false);

  const isCampaignPlayer = userName
    ? characters?.some((character) => character.player === userName)
    : false;
  const isGameMaster = userName === gameMaster;

  const handleMouseOver = () => {
    setIsHover(true);
  };

  const handleMouseOut = () => {
    setIsHover(false);
  };

  return (
    <Link href={`campaigns/${slug}`}>
      <GradientBorder>
        <Card
          className="pt-0 relative"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          {(isCampaignPlayer || isGameMaster) && isHover && (
            <div className="absolute right-2 top-2 z-10">
              <Button size="sm" asChild>
                <Link href={`/campaigns/${slug}/edit`}>Edit</Link>
              </Button>
            </div>
          )}
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
          <CardContent className="space-y-4">
            <h3 className="h3-bold mb-2">Players:</h3>
            <ul className="leading-8">
              {characters &&
                characters.map((character: Character) => (
                  <li key={`${character.name}-${character.player}`}>
                    <CustomLink href={`/characters/${character.slug}`}>
                      {character.name}
                    </CustomLink>{" "}
                    <span className="text-muted-foreground text-sm">
                      ({character.player})
                    </span>
                  </li>
                ))}
            </ul>
            <h3 className="h3-bold mb-2">Game Master:</h3>
            {gameMaster ? gameMaster : "/"}
          </CardContent>
        </Card>
      </GradientBorder>
    </Link>
  );
};
