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

  const statusColor =
    campaign.status === "ONLINE" ? theme.success : theme.textSecondary;

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Card>
        <AppText variant="subtitle">{campaign.name}</AppText>

        <View style={styles.spacing} />

        <AppText>Sistema: {campaign.system}</AppText>

        <AppText>{campaign.role === "MASTER" ? "Mestre" : "Jogador"}</AppText>

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
            {campaign.status === "ONLINE" ? "Online" : "Offline"}
          </AppText>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  spacing: {
    height: 8,
  },

  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    marginRight: 8,
  },
});
