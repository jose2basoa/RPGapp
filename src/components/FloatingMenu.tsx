import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { Radius } from "../theme/radius";
import { useTheme } from "../theme/useTheme";
import AppText from "./AppText";

interface FloatingMenuProps {
  onCreateCampaign: () => void;
  onJoinCampaign: () => void;
}

export default function FloatingMenu({
  onCreateCampaign,
  onJoinCampaign,
}: FloatingMenuProps) {
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
              },
            ]}
            onPress={onCreateCampaign}
          >
            <AppText>Criar campanha</AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
              },
            ]}
            onPress={onJoinCampaign}
          >
            <AppText>Acessar campanha</AppText>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={[
          styles.fab,
          {
            backgroundColor: theme.primary,
          },
        ]}
        onPress={() => setOpen(!open)}
      >
        <Ionicons name={open ? "close" : "add"} size={28} color="white" />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  actions: {
    position: "absolute",
    right: 16,
    bottom: 90,
    gap: 10,
    alignItems: "flex-end",
  },

  actionButton: {
    borderWidth: 1,
    borderRadius: Radius.md,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,

    width: 60,
    height: 60,

    borderRadius: 999,

    justifyContent: "center",
    alignItems: "center",
  },
});
