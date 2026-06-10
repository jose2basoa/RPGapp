import { CampaignRole } from "./campaign";

export interface CampaignContext {
  campaignId: string;

  role: CampaignRole;
}