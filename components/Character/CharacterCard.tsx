"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Character } from "@/types";
import { useIsPlayer } from "@/lib/hooks/useIsPlayer";

import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { GradientBorder } from "../GradientBorder";

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
    <Link href={`characters/${slug}`}>
      <GradientBorder className="w-full max-w-sm pt-0 pb-5 gap-1 rounded-b-none relative hover:cursor-pointer">
        <Card
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className="p-0 pb-5 gap-1"
        >
          {isPlayer && isHover && (
            <div className="absolute right-2 top-2 z-10">
              <Button size="sm" asChild>
                <Link href={`/characters/${slug}/edit`}>Edit</Link>
              </Button>
            </div>
          )}
          <CardHeader className="p-0 items-center">
            <div className="relative w-full pt-[100%]">
              <Image
                src={image || "/images/characters/placeholder.jpeg"}
                alt={name}
                priority
                fill
                className="object-cover"
                sizes="(max-width: 639px) 100vw, (max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
              />
            </div>
          </CardHeader>
          <CardContent className="px-4">
            <h3 className={"h3-bold"}>{name}</h3>
            <p>Player: {player}</p>
            <p>{campaign}</p>
          </CardContent>
        </Card>
      </GradientBorder>
    </Link>
  );
};
