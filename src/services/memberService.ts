import { Member } from "../types/member";

export async function getMembers(
  campaignId: string
): Promise<Member[]> {
  return [
    {
      id: "1",
      userId: "1",
      campaignId,
      name: "José Guilherme",
      email: "jose@email.com",
      role: "MASTER",
    },

    {
      id: "2",
      userId: "2",
      campaignId,
      name: "Patrick",
      email: "patrick@email.com",
      role: "PLAYER",
    },

    {
      id: "3",
      userId: "3",
      campaignId,
      name: "Helena",
      email: "helena@email.com",
      role: "PLAYER",
    },
  ];
}