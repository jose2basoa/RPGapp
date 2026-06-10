export type MemberRole =
  | "MASTER"
  | "CO_MASTER"
  | "PLAYER";

export interface Member {
  id: string;

  userId: string;

  campaignId: string;

  name: string;

  email: string;

  role: MemberRole;
}