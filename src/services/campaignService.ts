import { supabase } from "../lib/supabase";

import { Campaign } from "../types/campaign";

export async function getUserCampaigns(): Promise<Campaign[]> {
  const { data, error } = await supabase
    .from("campaign_members")
    .select(`
      role,
      campaigns (
        id,
        name,
        system,
        status
      )
    `);

  if (error) {
    throw error;
  }

  console.log(
    JSON.stringify(data, null, 2)
  );

  return (data ?? []).map((member: any) => ({
    id: member.campaigns.id,
    name: member.campaigns.name,
    system: member.campaigns.system,
    status: member.campaigns.status,
    role: member.role,
  }));
}

export async function createCampaign(
  name: string,
  system: string,
  description?: string
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuário não autenticado");
  }

  console.log("AUTH USER:", user);
  console.log("AUTH UID:", user?.id);

  const { data: campaign, error } =
    await supabase
      .from("campaigns")
      .insert({
        name,
        system,
        description,
        owner_id: user.id,
      })
      .select()
      .single();

  if (error) {
    throw error;
  }

  const { error: memberError } =
    await supabase
      .from("campaign_members")
      .insert({
        campaign_id: campaign.id,
        profile_id: user.id,
        role: "MASTER",
      });

  if (memberError) {
    throw memberError;
  }

  return campaign;
}

export async function getCampaignById(
  id: string
) {
  const { data, error } =
    await supabase
      .from("campaigns")
      .select("*")
      .eq("id", id)
      .single();

  if (error) {
    throw error;
  }

  return data;
}

