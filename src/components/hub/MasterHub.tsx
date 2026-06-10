import { router, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

import AppText from "../AppText";
import ManagementCard from "../ManagementCard";

import { Spacing } from "../../theme/spacing";

export default function MasterHub() {
  const { id } = useLocalSearchParams();

  return (
    <>
      <AppText variant="title">Gerenciar</AppText>

      <View style={{ height: Spacing.lg }} />

      <ManagementCard
        title="Personagens"
        onPress={() => router.push(`/campaign/${id}/manage/characters`)}
      />

      <View style={{ height: Spacing.md }} />

      <ManagementCard
        title="Sessões"
        onPress={() => router.push(`/campaign/${id}/manage/sessions`)}
      />

      <View style={{ height: Spacing.md }} />

      <ManagementCard
        title="Arquivos"
        onPress={() => router.push(`/campaign/${id}/manage/files`)}
      />

      <View style={{ height: Spacing.md }} />

      <ManagementCard
        title="Membros"
        onPress={() => router.push(`/campaign/${id}/manage/members`)}
      />
    </>
  );
}
