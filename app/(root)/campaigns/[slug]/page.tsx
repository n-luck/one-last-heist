import { notFound } from "next/navigation";

import { Campaign } from "@/components/pages/campaign";
import { getCampaignBySlug } from "@/lib/actions/campaigns.actions";
import { getCharactersByCampaign } from "@/lib/actions/character.actions";
import { auth } from "@/auth";

const CampaignPage = async (props: { params: Promise<{ slug: string }> }) => {
  const { slug } = await props.params;
  const session = await auth();
  const player = session?.user?.name || "";

  const campaign = await getCampaignBySlug(slug);

  if (!campaign) notFound();

  const characters = await getCharactersByCampaign(campaign.name);

  return <Campaign campaign={campaign} characters={characters} player={player} />;
};

export default CampaignPage;
