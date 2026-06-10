import { Character } from "../types/character";

export async function getCharacters(
  campaignId: string
): Promise<Character[]> {
  return [
    {
      id: "1",
      campaignId,
      ownerId: "user1",
      name: "Patrick",
      status: "ACTIVE",
    },

    {
      id: "2",
      campaignId,
      ownerId: "user2",
      name: "Helena",
      status: "NPC",
    },
  ];
}