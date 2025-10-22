"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import { Character } from "@/types";
import { Button } from "../ui/button";
import { useIsPlayer } from "@/lib/hooks/useIsPlayer";
import { useState } from "react";

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
  const [isHover, setIsHover] = useState(false);

  const { name, image, slug, player, campaign } = character;
  const { isPlayer } = useIsPlayer(player);

  const handleMouseOver = () => {
    setIsHover(true);
  };

  const handleMouseOut = () => {
    setIsHover(false);
  };

  return (
    <Card
      className="w-full max-w-sm pt-0 pb-5 gap-1 rounded-b-none"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <CardHeader className="p-0 items-center">
        <Link href={`characters/${slug}`}>
          <div className="relative w-full pt-[100%]">
            <Image
              src={image || "/images/characters/placeholder.jpeg"}
              alt={name}
              priority
              fill
              className="object-cover"
              sizes="(max-width: 639px) 100vw, (max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
            />
            {isPlayer && isHover && (
              <div className="absolute right-2 top-2">
                <Button size="sm">Edit</Button>
              </div>
            )}
          </div>
        </Link>
      </CardHeader>
      <CardContent className="px-4 grid">
        <Link href={`characters/${slug}`}>
          <h3 className="h3-bold">{name}</h3>
        </Link>
        <p>Player: {player}</p>
        <p>{campaign}</p>
      </CardContent>
    </Card>
  );
};
