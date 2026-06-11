import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

import AppText from "../../../src/components/AppText";
import Screen from "../../../src/components/Screen";

import { CampaignDetails } from "../../../src/types/campaignDetails";

import {
  Alert,
  Pressable,
  StyleSheet,
  View,
  useColorScheme,
} from "react-native";


import * as Clipboard from "expo-clipboard";

import {
  getCampaignById,
  getCampaignMembers,
  removeCampaignMember,
  updateCampaignStatus,
} from "../../../src/services/campaignService";

import { supabase } from "../../../src/lib/supabase";

export default function CampaignHomeScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [campaign, setCampaign] = useState<CampaignDetails | null>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "#fff" : "#000";

  async function copyInviteCode() {
    if (!campaign?.invite_code) {
      return;
    }

    await Clipboard.setStringAsync(campaign.invite_code);

    Alert.alert("Código copiado", campaign.invite_code);
  }

  const [currentRole, setCurrentRole] = useState<string | null>(null);

  useEffect(() => {
    loadCampaign();
  }, []);

  async function loadCampaign() {
    try {
      const campaignData = await getCampaignById(String(id));

      const membersData = await getCampaignMembers(String(id));

      setCampaign(campaignData);
      setMembers(membersData);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const currentMember = membersData.find(
        (member) => member.profile?.id === user?.id,
      );

      setCurrentRole(currentMember?.role ?? null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Screen>
        <AppText>Carregando...</AppText>
      </Screen>
    );
  }

  if (!campaign) {
    return (
      <Screen>
        <AppText>Campanha não encontrada.</AppText>
      </Screen>
    );
  }

  const statusColor = campaign.status === "ONLINE" ? "#4CAF50" : "#888";

  const isMaster = currentRole === "MASTER";

  const canManageCampaign =
    currentRole === "MASTER" || currentRole === "CO_MASTER";

  async function handleRemoveMember(profileId: string, playerName: string) {
    if (!campaign) {
      return;
    }

    Alert.alert("Remover jogador", `Deseja remover ${playerName}?`, [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Remover",
        style: "destructive",
        onPress: async () => {
          try {
            await removeCampaignMember(campaign.id, profileId);

            setMembers((current) =>
              current.filter((member) => member.profile?.id !== profileId),
            );
          } catch {
            Alert.alert("Erro", "Não foi possível remover o jogador.");
          }
        },
      },
    ]);
  }
  return (
    <Screen>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.replace("/campaigns")}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={textColor} />
        </Pressable>

        <AppText variant="title">{campaign.name}</AppText>
      </View>

      <View style={styles.card}>
        <AppText variant="subtitle">Informações</AppText>

        <View style={styles.sectionSpacing} />

        <AppText>Sistema: {campaign.system}</AppText>

        <View style={styles.sectionSpacing} />

        <View style={styles.inviteContainer}>
          <AppText>Código: {campaign.invite_code}</AppText>

          <Pressable onPress={copyInviteCode} style={styles.copyButton}>
            <Ionicons name="copy-outline" size={18} color={textColor} />
          </Pressable>
        </View>

        <View style={styles.sectionSpacing} />

        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor: statusColor,
              },
            ]}
          />

          <AppText>
            {campaign.status === "ONLINE"
              ? "Sessão em andamento"
              : "Sessão encerrada"}
          </AppText>
        </View>
      </View>

      {canManageCampaign && (
        <View style={styles.card}>
          <AppText variant="subtitle">Gerenciamento</AppText>

          <Pressable
            style={styles.dangerButton}
            onPress={async () => {
              try {
                const newStatus =
                  campaign.status === "ONLINE" ? "OFFLINE" : "ONLINE";

                await updateCampaignStatus(campaign.id, newStatus);

                setCampaign({
                  ...campaign,
                  status: newStatus,
                });
              } catch {
                Alert.alert("Erro", "Não foi possível atualizar o status.");
              }
            }}
          >
            <AppText>
              {campaign.status === "ONLINE"
                ? "🔴 Encerrar Sessão"
                : "🟢 Iniciar Sessão"}
            </AppText>
          </Pressable>
        </View>
      )}

      <View style={styles.card}>
        <AppText variant="subtitle">Membros ({members.length})</AppText>

        <View style={styles.sectionSpacing} />

        {members.map((member, index) => (
          <View key={index} style={styles.memberRow}>
            <View>
              <AppText>
                {member.role === "MASTER"
                  ? "👑"
                  : member.role === "CO_MASTER"
                    ? "⭐"
                    : "🎲"}{" "}
                {member.profile?.name ?? "Usuário desconhecido"}
              </AppText>

              <AppText style={styles.memberRole}>{member.role}</AppText>
            </View>

            {canManageCampaign && member.role !== "MASTER" && (
              <Pressable
                onPress={() =>
                  handleRemoveMember(
                    member.profile?.id,
                    member.profile?.name ?? "Jogador",
                  )
                }
              >
                <Ionicons name="trash-outline" size={20} color="#ff5555" />
              </Pressable>
            )}
          </View>
        ))}
      </View>

      {campaign.description ? (
        <View style={styles.card}>
          <AppText variant="subtitle">Descrição</AppText>

          <View style={styles.sectionSpacing} />

          <AppText>{campaign.description}</AppText>
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  backButton: {
    marginRight: 12,
  },

  inviteContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: 36,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    gap: 8,
  },

  copyButton: {
    padding: 2,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statusButton: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  memberRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  cardTitle: {
    marginBottom: 12,
  },

  memberRole: {
    opacity: 0.6,
  },

  dangerButton: {
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  sectionSpacing: {
    height: 16,
  },
});
