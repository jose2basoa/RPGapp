import { supabase } from "../lib/supabase";

import { Campaign } from "../types/campaign";

export async function getUserCampaigns(): Promise<Campaign[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

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
    `)
    .eq("profile_id", user.id);

  if (error) {
    throw error;
  }

  return (data ?? []).map((member: any) => ({
    id: member.campaigns.id,
    name: member.campaigns.name,
    system: member.campaigns.system,
    status: member.campaigns.status,
    role: member.role,
  }));
}

function generateInviteCode() {
  return Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase();
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

  const inviteCode = generateInviteCode();

  const { data: campaign, error } =
    await supabase
      .from("campaigns")
      .insert({
        name,
        system,
        description,
        owner_id: user.id,
        invite_code: inviteCode,
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

export async function joinCampaign(
  inviteCode: string
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuário não autenticado");
  }

  const { data: campaign, error: campaignError } =
    await supabase
      .from("campaigns")
      .select("id")
      .eq("invite_code", inviteCode.toUpperCase())
      .single();

  if (campaignError || !campaign) {
    throw new Error("Código de convite inválido");
  }

  const { data: existingMember } =
    await supabase
      .from("campaign_members")
      .select("id")
      .eq("campaign_id", campaign.id)
      .eq("profile_id", user.id)
      .maybeSingle();

  if (existingMember) {
    throw new Error(
      "Você já participa desta campanha"
    );
  }

  const { error: memberError } =
    await supabase
      .from("campaign_members")
      .insert({
        campaign_id: campaign.id,
        profile_id: user.id,
        role: "PLAYER",
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

export async function getCampaignMembers(
  campaignId: string
) {
  const { data: members, error: membersError } =
    await supabase
      .from("campaign_members")
      .select(`
        profile_id,
        role
      `)
      .eq("campaign_id", campaignId);

  if (membersError) {
    throw membersError;
  }

  if (!members?.length) {
    return [];
  }

  const profileIds = members.map(
    (member) => member.profile_id
  );

  const { data: profiles, error: profilesError } =
    await supabase
      .from("profiles")
      .select(`
        id,
        name
      `)
      .in("id", profileIds);

  if (profilesError) {
    throw profilesError;
  }

  return members.map((member) => ({
    role: member.role,
    profile: profiles?.find(
      (profile) =>
        profile.id === member.profile_id
    ),
  }));
}

export async function updateCampaignStatus(
  campaignId: string,
  status: "ONLINE" | "OFFLINE"
) {
  const { data, error } = await supabase
    .from("campaigns")
    .update({
      status,
    })
    .eq("id", campaignId)
    .select();

  console.log("STATUS UPDATE");
  console.log("CAMPAIGN:", campaignId);
  console.log("STATUS:", status);
  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    throw error;
  }
}

export async function removeCampaignMember(
  campaignId: string,
  profileId: string
) {
  const { data, error } = await supabase
    .from("campaign_members")
    .delete()
    .eq("campaign_id", campaignId)
    .eq("profile_id", profileId)
    .select();

  console.log("DELETE DATA", data);
  console.log("DELETE ERROR", error);

  if (error) {
    throw error;
  }
}
