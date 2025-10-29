"use client";

import { useState, useTransition } from "react";
import { Character as CharacterType } from "@/types";
import Image from "next/image";
import Link from "next/link";

import { useIsPlayer } from "@/lib/hooks/useIsPlayer";

import { CharacterInfo } from "../Character/CharacterInfo";
import { Button } from "../ui/button";
import { updateCharacterCheckboxes } from "@/lib/actions/character.actions";
import { characterConditions, odds, teamwork } from "../Character/constants";

interface CharacterProps {
  character: CharacterType;
}

export const Character = ({ character }: CharacterProps) => {
  const {
    name,
    pronouns,
    primaryRole,
    secondaryRole,
    secondaryRole2,
    look,
    background,
    stress,
    assets,
    notes,
    specialAbilities,
    conditions,
    bonds,
    image,
    player,
    slug,
  } = character;
  const { isPlayer } = useIsPlayer(player);

  const [_, startTransition] = useTransition();
  const [conditionsCheck, setConditionsCheck] = useState<boolean[]>(
    conditions.length === characterConditions.length
      ? conditions
      : Array(characterConditions.length).fill(false)
  );

  const handleCheck = (type: "conditions", index: number, checked: boolean) => {
    let updated: boolean[] = [];
    if (type === "conditions") {
      updated = [...conditionsCheck];
      updated[index] = checked;
      setConditionsCheck(updated);
    }

    startTransition(async () => {
      await updateCharacterCheckboxes(slug, type, updated);
    });
  };

  return (
    <>
      <div className="grid grid-cols-9 gap-4 border-b pb-4 mb-4 relative">
        {isPlayer && (
          <div className="absolute right-0 top-0">
            <Button asChild variant="gradient">
              <Link href={`/characters/${slug}/edit`}>Edit</Link>
            </Button>
          </div>
        )}

        {/* HEADER */}
        <div className="relative w-full pt-[100%] col-span-2 md:col-span-1">
          <Image
            src={image || "/images/characters/placeholder.jpeg"}
            alt={name}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 639px) 100vw, (max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
          />
        </div>
        <div className="col-span-6 md:col-span-8">
          <h1 className="h1-bold pb-1 mb-1">{name}</h1>
          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-8 gap-x-1 gap-y-2 md:gap-1">
            <div className="flex flex-col">
              <h4 className="h3-bold text-xs uppercase text-muted-foreground dark:text-cyan-500">
                Pronouns
              </h4>
              <span>{pronouns}</span>
            </div>
            <div className="flex flex-col">
              <h4 className="h3-bold text-xs uppercase text-muted-foreground dark:text-cyan-500">
                Primary Role
              </h4>
              <span>{primaryRole}</span>
              <span className="text-xs text-muted-foreground dark:text-cyan-500">(add +3d)</span>
            </div>
            <div className="flex flex-col">
              <h4 className="h3-bold text-xs uppercase text-muted-foreground dark:text-cyan-500">
                Secondary Role
              </h4>
              <span>{secondaryRole}</span>
              <span className="text-xs text-muted-foreground dark:text-cyan-500">(add +2d)</span>
            </div>
            <div className="flex flex-col">
              <h4 className="h3-bold text-xs uppercase text-muted-foreground dark:text-cyan-500">
                Secondary Role
              </h4>
              <span>{secondaryRole2}</span>
              <span className="text-xs text-muted-foreground dark:text-cyan-500">(add +2d)</span>
            </div>
            <div className="flex flex-col">
              <h4 className="h3-bold text-xs uppercase text-muted-foreground dark:text-cyan-500">
                Player
              </h4>
              <span>{player}</span>
            </div>
          </div>
        </div>
      </div>

      {/* LEFT COLUMN */}
      <div className="grid md:gap-4 grid-cols-1 md:grid-cols-9">
        <div className="md:col-span-3 md:pr-4 md:border-r">
          {look && <CharacterInfo headline="Look" content={look} />}
          <CharacterInfo headline="Stress" content={stress} />
          <CharacterInfo
            headline="Conditions"
            content={characterConditions}
            isCheckBox
            checkable={isPlayer}
            checkedItems={conditionsCheck}
            onToggle={(index, checked) =>
              handleCheck("conditions", index, checked)
            }
          />
          <CharacterInfo headline="Teamwork" content={teamwork} />
        </div>

        {/* RIGHT COLUMN  */}
        <div className="gap-2 md:col-span-6">
          <CharacterInfo
            headline="Special Abilities"
            content={specialAbilities}
          />
          <CharacterInfo headline="Change your odds" content={odds} />
          <CharacterInfo headline="Bonds" content={bonds} />
          {assets && <CharacterInfo headline="Assets" content={assets} />}
          {background && (
            <CharacterInfo headline="Background" content={background} />
          )}
          {notes && <CharacterInfo headline="Notes" content={notes} />}
        </div>
      </div>
    </>
  );
};
