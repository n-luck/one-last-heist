import type { Metadata } from "next";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { CampaignForm } from "@/components/CampaignForm";
import { getAllUsers } from "@/lib/actions/user.actions";
import { User } from "@/types";

export const metadata: Metadata = {
  title: "Create Campaign",
};

const CreateCampaignPage = async () => {
  const session = await auth();
  if (!session || !session.user || !session.user.name) redirect("/sign-in");

  const users = await getAllUsers();
  const playerOptions = users.map((user: User) => ({
    label: user.name,
    value: user.name,
  }));

  return (
    <div className="container mx-auto space-y-4">
      <CampaignForm type="create" players={playerOptions} />
    </div>
  );
};

export default CreateCampaignPage;
