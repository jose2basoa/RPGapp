import { useLocalSearchParams } from "expo-router";

import AppText from "../../../src/components/AppText";
import Screen from "../../../src/components/Screen";

export default function CampaignScreen() {
  const { id } = useLocalSearchParams();

  return (
    <Screen>
      <AppText variant="title">Campanha {id}</AppText>
    </Screen>
  );
}
