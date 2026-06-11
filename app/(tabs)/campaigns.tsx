import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";

import AppText from "../../src/components/AppText";
import CampaignCard from "../../src/components/CampaignCard";
import FloatingMenu from "../../src/components/FloatingMenu";
import Screen from "../../src/components/Screen";

import { useRouter } from "expo-router";
import { View } from "react-native";
import { getUserCampaigns } from "../../src/services/campaignService";
import { Spacing } from "../../src/theme/spacing";
import { Campaign } from "../../src/types/campaign";

export default function CampaignsScreen() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadCampaigns();
    }, []),
  );

  async function loadCampaigns() {
    try {
      const data = await getUserCampaigns();

      setCampaigns(data);
    } catch (error) {
      console.error(error);

      alert("Erro ao carregar campanhas.");
    }
  }

  const masterCampaigns = campaigns.filter((c) => c.role === "MASTER");

  const playerCampaigns = campaigns.filter((c) => c.role === "PLAYER");

  return (
    <Screen scrollable>
      <AppText variant="title">Minhas Campanhas</AppText>
      <View style={{ height: Spacing.md }} />
      {campaigns.length === 0 && (
        <>
          <AppText>Você ainda não participa de nenhuma campanha.</AppText>

          <View style={{ height: Spacing.lg }} />
        </>
      )}
      <View style={{ height: Spacing.lg }} />
      <AppText variant="subtitle">Como Mestre</AppText>
      <View style={{ height: Spacing.md }} />
      {masterCampaigns.map((campaign) => (
        <View
          key={campaign.id}
          style={{
            marginBottom: Spacing.md,
          }}
        >
          <CampaignCard
            campaign={campaign}
            onPress={() => router.push(`/campaign/${campaign.id}`)}
          />
        </View>
      ))}
      <View style={{ height: Spacing.xl }} />
      <AppText variant="subtitle">Como Jogador</AppText>
      <View style={{ height: Spacing.md }} />
      {playerCampaigns.map((campaign) => (
        <View
          key={campaign.id}
          style={{
            marginBottom: Spacing.md,
          }}
        >
          <CampaignCard
            campaign={campaign}
            onPress={() => router.push(`/campaign/${campaign.id}`)}
          />
        </View>
      ))}
      <FloatingMenu
        onCreateCampaign={() => router.push("/(tabs)/create-campaign")}
        onJoinCampaign={() => router.push("/(tabs)/join-campaign")}
      />
    </Screen>
  );
}
