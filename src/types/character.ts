export interface Character {
  id: string;

  campaignId: string;

  ownerId: string;

  name: string;

  imageUrl?: string;

  status: "ACTIVE" | "DEAD" | "NPC";
}