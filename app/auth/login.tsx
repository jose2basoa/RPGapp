import { useState } from "react";

import { router } from "expo-router";

import AppText from "../../src/components/AppText";
import Button from "../../src/components/Button";
import Input from "../../src/components/Input";
import Screen from "../../src/components/Screen";

import { useAuth } from "../../src/hooks/useAuth";

import { View } from "react-native";

import { Spacing } from "../../src/theme/spacing";

export default function LoginScreen() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  async function handleLogin() {
    await login(email, password);

    router.replace("/(tabs)/campaigns");
  }

  return (
    <Screen>
      <AppText variant="title">Login</AppText>

      <View
        style={{
          height: Spacing.lg,
        }}
      />

      <Input placeholder="Email" value={email} onChangeText={setEmail} />

      <View
        style={{
          height: Spacing.md,
        }}
      />

      <Input
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View
        style={{
          height: Spacing.lg,
        }}
      />

      <Button title="Entrar" onPress={handleLogin} />

      <View
        style={{
          height: Spacing.md,
        }}
      />

      <Button
        title="Criar Conta"
        onPress={() => router.push("/auth/register")}
      />
    </Screen>
  );
}
