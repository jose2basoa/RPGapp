import { useState } from "react";

import { router } from "expo-router";

import AppText from "../../src/components/AppText";
import Button from "../../src/components/Button";
import Input from "../../src/components/Input";
import Screen from "../../src/components/Screen";

import { useAuth } from "../../src/hooks/useAuth";

import { View } from "react-native";

import { Spacing } from "../../src/theme/spacing";

export default function RegisterScreen() {
  const { register } = useAuth();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  async function handleRegister() {
    await register(name, email, password);

    router.replace("/(tabs)/campaigns");
  }

  return (
    <Screen scrollable>
      <AppText variant="title">Criar Conta</AppText>

      <View
        style={{
          height: Spacing.lg,
        }}
      />

      <Input placeholder="Nome" value={name} onChangeText={setName} />

      <View
        style={{
          height: Spacing.md,
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

      <Button title="Cadastrar" onPress={handleRegister} />
    </Screen>
  );
}
