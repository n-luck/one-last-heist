import { Fragment } from "react";
import { Campaigns } from "@/components/Campaigns";
import {
  getAllCampaigns,
  getCharactersByCampaign,
} from "@/lib/actions/character.actions";

const CampaignsPage = async () => {
  const campaigns = await getAllCampaigns();

  return (
    <>
      <h1 className="h1-bold mb-8">Campaigns</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {campaigns.map(async (campaign) => {
          const characters = await getCharactersByCampaign(campaign.campaign);

          return (
            <Fragment key={campaign.campaign}>
              <Campaigns
                campaign={campaign.campaign}
                count={campaign._count}
                characters={characters}
              />
            </Fragment>
          );
        })}
      </div>
    </>
  );
};

export default CampaignsPage;
