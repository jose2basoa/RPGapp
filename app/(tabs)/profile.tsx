import { router } from "expo-router";

import AppText from "../../src/components/AppText";
import Button from "../../src/components/Button";
import Screen from "../../src/components/Screen";

import { useAuth } from "../../src/hooks/useAuth";

import { View } from "react-native";

import { Spacing } from "../../src/theme/spacing";

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  async function handleLogout() {
    await logout();

    router.replace("/auth/login");
  }

  return (
    <Screen>
      <AppText variant="title">Perfil</AppText>

      <View
        style={{
          height: Spacing.lg,
        }}
      />

      <AppText>Nome: {user?.name}</AppText>

      <AppText>Email: {user?.email}</AppText>

      <View
        style={{
          height: Spacing.xl,
        }}
      />

      <Button title="Sair" onPress={handleLogout} />
    </Screen>
  );
}
