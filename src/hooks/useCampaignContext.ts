import { useEffect, useState } from "react";

import { getCampaignContext } from "../services/campaignContextService";
import { CampaignContext } from "../types/campaignContext";

export function useCampaignContext(
  campaignId: string
) {
  const [context, setContext] =
    useState<CampaignContext | null>(null);

  useEffect(() => {
    load();
  }, [campaignId]);

  async function load() {
    const data =
      await getCampaignContext(campaignId);

    setContext(data);
  }

  return context;
}