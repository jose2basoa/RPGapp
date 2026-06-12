import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import AppText from "./AppText";
import Card from "./Card";

import { useTheme } from "../theme/useTheme";
import { Campaign } from "../types/campaign";

interface CampaignCardProps {
  campaign: Campaign;
  onPress?: () => void;
}

export default function CampaignCard({ campaign, onPress }: CampaignCardProps) {
  const theme = useTheme();

  const isOnline = campaign.status === "ONLINE";

  const statusColor = isOnline ? theme.success : theme.textSecondary;

  const roleIcon = campaign.role === "MASTER" ? "trophy" : "game-controller";

  const roleLabel = campaign.role === "MASTER" ? "Mestre" : "Jogador";

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
      <Card>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <AppText variant="subtitle">{campaign.name}</AppText>

            <AppText
              style={{
                color: theme.textSecondary,
              }}
            >
              Sistema: {campaign.system || "Não definido"}
            </AppText>
          </View>

          <Ionicons
            name="chevron-forward"
            size={22}
            color={theme.textSecondary}
          />
        </View>

        <View style={styles.separator} />

        <View style={styles.footer}>
          <View style={styles.roleContainer}>
            <Ionicons name={roleIcon as any} size={16} color={theme.primary} />

            <AppText>{roleLabel}</AppText>
          </View>

          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusDot,
                {
                  backgroundColor: statusColor,
                },
              ]}
            />

            <AppText>{isOnline ? "Sessão Ativa" : "Offline"}</AppText>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  titleContainer: {
    flex: 1,
    marginRight: 12,
  },

  separator: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginVertical: 14,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  roleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    marginRight: 8,
  },
});
