import { useLocalSearchParams } from "expo-router";

import AppText from "../../../src/components/AppText";
import Screen from "../../../src/components/Screen";

import { useCampaignContext } from "../../../src/hooks/useCampaignContext";

import MasterHub from "../../../src/components/hub/MasterHub";
import PlayerHub from "../../../src/components/hub/PlayerHub";

export default function HubScreen() {
  const { id } = useLocalSearchParams();

  const context = useCampaignContext(String(id));

  if (!context) {
    return (
      <Screen>
        <AppText>Carregando...</AppText>
      </Screen>
    );
  }

  return (
    <Screen>{context.role === "MASTER" ? <MasterHub /> : <PlayerHub />}</Screen>
  );
}
