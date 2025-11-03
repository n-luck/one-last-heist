import { getCharactersByPlayer } from "@/lib/actions/character.actions";
import { auth } from "@/auth";
import { CharacterList } from "@/components/Character/CharacterList";
import { AddCharacterButton } from "@/components/Buttons/AddCharacterButton";

const UserPage = async () => {
  const session = await auth();
  const player = session?.user?.name || "";

  const characters = await getCharactersByPlayer(player);

  return (
    <section className="relative">
      <h1 className="h1-bold">My Characters</h1>
      <div className="absolute right-0 top-1">
        <AddCharacterButton />
      </div>
      {characters && (
        <CharacterList title="Character list" characterData={characters} />
      )}
    </section>
  );
};

export default UserPage;
