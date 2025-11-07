import { Fragment } from "react";
import { CampaignCard } from "@/components/Campaigns";
import { getCharactersByCampaign } from "@/lib/actions/character.actions";
import { getAllCampaigns } from "@/lib/actions/campaigns.actions";
import { AddCampaignButton } from "@/components/Buttons/AddCampaignButton";
import { Campaign } from "@/types";
import { auth } from "@/auth";

const CampaignsPage = async () => {
  const campaigns = await getAllCampaigns();
  const session = await auth();
  const userName = session?.user?.name || "";

  return (
    <section className="relative">
      <h1 className="h1-bold">Campaigns</h1>
      <div className="absolute top-0 md:top-2 right-0">
        <AddCampaignButton />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {campaigns.map(async (campaign: Campaign) => {
          const characters = await getCharactersByCampaign(campaign.name);
          const { name, gameMaster, image, slug } = campaign;

          return (
            <Fragment key={name}>
              <CampaignCard
                campaign={name}
                count={characters.length}
                characters={characters}
                image={image ?? undefined}
                slug={slug}
                userName={userName}
                gameMaster={gameMaster}
              />
            </Fragment>
          );
        })}
      </div>
    </section>
  );
};

export default CampaignsPage;
