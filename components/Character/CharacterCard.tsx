import Link from "next/link";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";

interface CharacterCardProps {
  character: any;
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
  const { name, image, slug, player, campaign } = character;

  return (
    <Card className="w-full max-w-sm pt-0 pb-5 gap-1 rounded-b-none">
      <CardHeader className="p-0 items-center">
        <Link href={`characters/${slug}`}>
          <div className="relative w-full pt-[100%]">
            <Image
              src={image}
              alt={name}
              priority
              fill
              className="object-cover"
              sizes="(max-width: 639px) 100vw, (max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
            />
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
