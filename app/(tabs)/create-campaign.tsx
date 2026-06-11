import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import AppText from "../../src/components/AppText";
import Button from "../../src/components/Button";
import Input from "../../src/components/Input";
import Screen from "../../src/components/Screen";

import { createCampaign } from "../../src/services/campaignService";
import { Spacing } from "../../src/theme/spacing";
import { useTheme } from "../../src/theme/useTheme";

export default function CreateCampaignScreen() {
  const theme = useTheme();

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
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </Pressable>

        <AppText variant="title">Criar Campanha</AppText>
      </View>

      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Ionicons name="book-outline" size={48} color={theme.primary} />
        </View>

        <View
          style={{
            height: 16,
          }}
        />

        <AppText variant="subtitle">Nova Campanha</AppText>

        <View
          style={{
            height: 8,
          }}
        />

        <AppText>Configure os dados básicos da sua mesa.</AppText>

        <View
          style={{
            height: 24,
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
            height: 24,
          }}
        />

        <Button
          title={loading ? "Criando..." : "Criar Campanha"}
          onPress={handleCreate}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  backButton: {
    marginRight: 12,
  },

  card: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  iconContainer: {
    alignItems: "center",
  },
});
