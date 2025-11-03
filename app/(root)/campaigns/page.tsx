import { Fragment } from "react";
import { CampaignCard } from "@/components/Campaigns";
import { getCharactersByCampaign } from "@/lib/actions/character.actions";
import { getAllCampaigns } from "@/lib/actions/campaigns.actions";
import { AddCampaignButton } from "@/components/Buttons/AddCampaignButton";
import { Campaign } from "@/types";

const CampaignsPage = async () => {
  const campaigns = await getAllCampaigns();

  return (
    <section className="relative">
      <h1 className="h1-bold">Campaigns</h1>
      <div className="absolute top-0 md:top-2 right-0">
        <AddCampaignButton />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {campaigns.map(async (campaign: Campaign) => {
          const characters = await getCharactersByCampaign(campaign.name);

          return (
            <Fragment key={campaign.name}>
              <CampaignCard
                campaign={campaign.name}
                count={characters.length}
                characters={characters}
                image={campaign.image ?? undefined}
                slug={campaign.slug}
              />
            </Fragment>
          );
        })}
      </div>
    </section>
  );
};

export default CampaignsPage;
