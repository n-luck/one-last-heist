import { useState, useEffect } from "react";
import { getAllCampaigns } from "@/lib/actions/campaigns.actions";
import { Campaign } from "@/types";

export const useCampaigns = () => {
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );

  useEffect(() => {
    const fetchCampaigns = async () => {
      const campaigns = await getAllCampaigns();
      setOptions(
        campaigns.map((campaign: Campaign) => ({
          label: campaign.name,
          value: campaign.name,
        }))
      );
    };
    fetchCampaigns();
  }, []);

  return options;
};
