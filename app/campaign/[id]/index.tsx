import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import AppText from "../../../src/components/AppText";
import Screen from "../../../src/components/Screen";

import { getCampaignById } from "../../../src/services/campaignService";

import { CampaignDetails } from "../../../src/types/campaignDetails";

import { View } from "react-native";

import { Spacing } from "../../../src/theme/spacing";

export default function CampaignHomeScreen() {
  const { id } = useLocalSearchParams();

  const [campaign, setCampaign] = useState<CampaignDetails | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCampaign();
  }, []);

  async function loadCampaign() {
    try {
      const data = await getCampaignById(String(id));

      setCampaign(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Screen>
        <AppText>Carregando...</AppText>
      </Screen>
    );
  }

  if (!campaign) {
    return (
      <Screen>
        <AppText>Campanha não encontrada.</AppText>
      </Screen>
    );
  }

  return (
    <Screen>
      <AppText variant="title">{campaign.name}</AppText>

      <View
        style={{
          height: Spacing.md,
        }}
      />

      <AppText>Sistema: {campaign.system}</AppText>

      <AppText>Status: {campaign.status}</AppText>

      {campaign.description ? (
        <>
          <View
            style={{
              height: Spacing.md,
            }}
          />

          <AppText>{campaign.description}</AppText>
        </>
      ) : null}
    </Screen>
  );
}
