import { getLatestCharacters } from "@/lib/actions/character.actions";
import { MainPage } from "@/components/pages/main";

const Homepage = async () => {
  const latestCharacters = await getLatestCharacters();

  return <MainPage latestCharacters={latestCharacters} />;
};

export default Homepage;
