import { Campaign } from "../types/campaign";

export async function getUserCampaigns(): Promise<Campaign[]> {
  return [
    {
      id: "1",
      name: "JoJo RPG",
      system: "Personalizado",
      role: "MASTER",
      status: "ONLINE",
    },

    {
      id: "2",
      name: "D&D 5e",
      system: "Dungeons & Dragons",
      role: "PLAYER",
      status: "OFFLINE",
    },

    {
      id: "3",
      name: "Cyberpunk RED",
      system: "Cyberpunk",
      role: "PLAYER",
      status: "ONLINE",
    },
  ];
}