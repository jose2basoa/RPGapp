export type CampaignStatus =
  | "ONLINE"
  | "OFFLINE";

export type CampaignRole =
  | "MASTER"
  | "PLAYER";

export interface Campaign {
  id: string;

  name: string;

  system: string;

  role: CampaignRole;

  status: CampaignStatus;
}