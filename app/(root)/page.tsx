import { CharacterList } from "@/components/Character/CharacterList";
import { Button } from "@/components/ui/button";

import sampleData from "@/db/sample-data";

const Homepage = () => {
  return (
    <>
      <CharacterList
        characterData={sampleData.characters}
        title="Newest Characters"
        limit={4}
      />
    </>
  );
};

export default Homepage;
