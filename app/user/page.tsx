import { getCharactersByPlayer } from "@/lib/actions/character.actions";
import { auth } from "@/auth";
import { CharacterList } from "@/components/Character/CharacterList";

const UserPage = async () => {
  const session = await auth();
  const player = session?.user?.name || "";

  const characters = await getCharactersByPlayer(player);

  return (
    <>
      {characters && <CharacterList title="Character list" characterData={characters} />}
    </>
  );
};

export default UserPage;
