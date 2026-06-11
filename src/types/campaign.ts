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
  status: string;
  role?: string;
  invite_code?: string;
}