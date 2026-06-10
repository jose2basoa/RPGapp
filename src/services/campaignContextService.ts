import { CampaignContext } from "../types/campaignContext";

export async function getCampaignContext(
  campaignId: string
): Promise<CampaignContext> {
  return {
    campaignId,
    role: "MASTER",
  };
}