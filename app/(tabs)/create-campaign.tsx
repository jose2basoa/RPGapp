import { useState } from "react";

import { router } from "expo-router";

import AppText from "../../src/components/AppText";
import Button from "../../src/components/Button";
import Input from "../../src/components/Input";
import Screen from "../../src/components/Screen";

import { createCampaign } from "../../src/services/campaignService";

import { View } from "react-native";

import { Spacing } from "../../src/theme/spacing";

export default function CreateCampaignScreen() {
  const [name, setName] = useState("");

  const [system, setSystem] = useState("");

  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    if (loading) {
      return;
    }

    try {
      if (!name.trim()) {
        alert("Informe o nome da campanha");
        return;
      }

      if (!system.trim()) {
        alert("Informe o sistema");
        return;
      }

      if (name.length > 50) {
        alert("O nome da campanha deve ter no máximo 50 caracteres.");

        return;
      }

      if (system.length > 30) {
        alert("O sistema deve ter no máximo 30 caracteres.");

        return;
      }

      setLoading(true);

      const campaign = await createCampaign(
        name.trim(),
        system.trim(),
        description.trim(),
      );

      setName("");
      setSystem("");
      setDescription("");

      router.replace(`/campaign/${campaign.id}`);
    } catch (error) {
      console.error(error);

      alert("Erro ao criar campanha.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen scrollable>
      <AppText variant="title">Criar Campanha</AppText>

      <View
        style={{
          height: Spacing.lg,
        }}
      />

      <Input
        placeholder="Nome da campanha"
        value={name}
        onChangeText={setName}
      />

      <View
        style={{
          height: Spacing.md,
        }}
      />

      <Input placeholder="Sistema" value={system} onChangeText={setSystem} />

      <View
        style={{
          height: Spacing.md,
        }}
      />

      <Input
        placeholder="Descrição (opcional)"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <View
        style={{
          height: Spacing.lg,
        }}
      />

      <Button
        title={loading ? "Criando..." : "Criar Campanha"}
        onPress={handleCreate}
      />
    </Screen>
  );
}
