import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";

import { CampaignForm } from "@/components/CampaignForm";
import { getCampaignBySlug } from "@/lib/actions/campaigns.actions";
import { getCharactersByCampaign } from "@/lib/actions/character.actions";
import { getAllUsers } from "@/lib/actions/user.actions";
import { User } from "@/types";

export const metadata: Metadata = {
  title: "Edit Campaign",
};

const EditCampaignPage = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await props.params;
  const session = await auth();
  if (!session) redirect("/sign-in");

  const campaign = await getCampaignBySlug(slug);
  if (!campaign) notFound();

  const characters = await getCharactersByCampaign(campaign.name);

  const users = await getAllUsers();
  const playerOptions = users.map((user: User) => ({
      label: user.name,
      value: user.name,
    }));
  const isCampaignPlayer = characters.some(
    (character) => character.player === session.user?.name
  );

  // if (!isCampaignPlayer) {
  //   redirect("/unauthorized");
  // }

  return (
    <div className="container mx-auto space-y-4">
      <CampaignForm
        campaign={campaign}
        campaignId={campaign.id}
        type="update"
        players={playerOptions}
      />
    </div>
  );
};

export default EditCampaignPage;
