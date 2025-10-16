import { Character as CharacterType } from "@/types";
import Image from "next/image";
import { CharacterInfo } from "../Character/CharacterInfo";

interface CharacterProps {
  character: CharacterType;
}

export const Character = ({ character }: CharacterProps) => {
  console.log("CHARACTER 2: ", character);
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
  } = character;

  console.log("specialAbilities: ", typeof specialAbilities);

  return (
    <>
      <div className="grid grid-cols-9 gap-4 border-b pb-4 mb-4">
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
          <h1 className="h1-bold mb-1">{name}</h1>
          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-8">
            <div className="flex flex-col">
              <h4 className="h3-bold text-xs uppercase text-muted-foreground">Pronouns</h4>
              <span>{pronouns}</span>
            </div>
            <div className="flex flex-col">
              <h4 className="h3-bold text-xs uppercase text-muted-foreground">Primary Role</h4>
              <span>{primaryRole}</span>
            </div>
            <div className="flex flex-col">
              <h4 className="h3-bold text-xs uppercase text-muted-foreground">Secondary Role</h4>
              <span>{secondaryRole}</span>
            </div>
            <div className="flex flex-col">
              <h4 className="h3-bold text-xs uppercase text-muted-foreground">Secondary Role</h4>
              <span>{secondaryRole2}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid md:gap-4 grid-cols-1 md:grid-cols-9">
        <div className="md:col-span-3 md:pr-4 md:border-r">
          {look && <CharacterInfo headline="Look" content={look} />}
          <CharacterInfo headline="Stress" content={stress} />
          {assets && <CharacterInfo headline="Assets" content={assets} />}
          {notes && <CharacterInfo headline="Notes" content={notes} />}
        </div>
        <div className="gap-2 md:col-span-6">
          <CharacterInfo
            headline="Special Abilities"
            content={specialAbilities}
          />
          <CharacterInfo headline="Conditions" content={conditions} />
          <CharacterInfo headline="Bonds" content={bonds} />
          {background && (
            <CharacterInfo headline="Background" content={background} />
          )}
        </div>
      </div>
    </>
  );
};
