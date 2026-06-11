import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, TextInput, View } from "react-native";

import AppText from "../../src/components/AppText";
import Screen from "../../src/components/Screen";

import { joinCampaign } from "../../src/services/campaignService";
import { useTheme } from "../../src/theme/useTheme";

export default function JoinCampaignScreen() {
  const theme = useTheme();

  const [inviteCode, setInviteCode] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleJoin() {
    if (!inviteCode.trim()) {
      Alert.alert("Código obrigatório", "Digite um código de convite.");
      return;
    }

    try {
      setLoading(true);

      await joinCampaign(inviteCode);

      Alert.alert("Sucesso", "Você entrou na campanha.");

      router.replace("/campaigns");
    } catch (error: any) {
      Alert.alert(
        "Erro",
        error.message || "Não foi possível entrar na campanha.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </Pressable>

        <AppText variant="title">Entrar em Campanha</AppText>
      </View>

      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Ionicons name="ticket-outline" size={48} color={theme.primary} />
        </View>

        <View
          style={{
            height: 16,
          }}
        />

        <AppText variant="subtitle">Código de Convite</AppText>

        <View
          style={{
            height: 8,
          }}
        />

        <AppText>
          Digite o código enviado pelo mestre para entrar na campanha.
        </AppText>

        <View
          style={{
            height: 24,
          }}
        />

        <TextInput
          style={[
            styles.input,
            {
              color: theme.text,
              borderColor: theme.border,
            },
          ]}
          placeholder="A7K9PQ"
          placeholderTextColor={theme.textSecondary}
          autoCapitalize="characters"
          maxLength={6}
          value={inviteCode}
          onChangeText={(text) => setInviteCode(text.toUpperCase())}
        />

        <View
          style={{
            height: 20,
          }}
        />

        <Pressable
          style={[
            styles.button,
            {
              backgroundColor: theme.primary,
            },
            loading && styles.buttonDisabled,
          ]}
          onPress={handleJoin}
          disabled={loading}
        >
          <Ionicons name="log-in-outline" size={18} color="#fff" />

          <AppText>{loading ? "Entrando..." : "Entrar na Campanha"}</AppText>
        </Pressable>
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

  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 20,
    letterSpacing: 4,
    textAlign: "center",
    fontWeight: "600",
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
  },

  buttonDisabled: {
    opacity: 0.6,
  },
});
