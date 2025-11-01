import { notFound } from "next/navigation";

import { Campaign } from "@/components/pages/campaign";
import { getCampaignBySlug } from "@/lib/actions/campaigns.actions";
import { getCharactersByCampaign } from "@/lib/actions/character.actions";

const CampaignPage = async (props: { params: Promise<{ slug: string }> }) => {
  const { slug } = await props.params;

  const campaign = await getCampaignBySlug(slug);

  if (!campaign) notFound();

  const characters = await getCharactersByCampaign(campaign.name);

  return (
    <section className="flex flex-col gap-2">
      <Campaign campaign={campaign} characters={characters} />
    </section>
  );
};

export default CampaignPage;
