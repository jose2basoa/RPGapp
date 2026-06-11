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

  function handleCreate() {
    setOpen(false);
    onCreateCampaign();
  }

  function handleJoin() {
    setOpen(false);
    onJoinCampaign();
  }

  return (
    <>
      {open && (
        <>
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={() => setOpen(false)}
          />

          <View style={styles.actions}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                },
              ]}
              onPress={handleJoin}
            >
              <Ionicons name="log-in-outline" size={18} color={theme.text} />

              <AppText>Entrar em Campanha</AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.actionButton,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                },
              ]}
              onPress={handleCreate}
            >
              <Ionicons
                name="add-circle-outline"
                size={18}
                color={theme.text}
              />

              <AppText>Criar Campanha</AppText>
            </TouchableOpacity>
          </View>
        </>
      )}

      <TouchableOpacity
        style={[
          styles.fab,
          {
            backgroundColor: theme.primary,
          },
        ]}
        activeOpacity={0.85}
        onPress={() => setOpen(!open)}
      >
        <Ionicons name={open ? "close" : "add"} size={30} color="white" />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: -1000,
    left: -1000,
    right: -1000,
    bottom: -1000,
  },

  actions: {
    position: "absolute",
    right: 16,
    bottom: 90,
    gap: 12,
    alignItems: "flex-end",
  },

  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,

    borderWidth: 1,
    borderRadius: Radius.lg,

    paddingHorizontal: 16,
    paddingVertical: 14,

    minWidth: 190,
  },

  fab: {
    position: "absolute",

    right: 16,
    bottom: 16,

    width: 64,
    height: 64,

    borderRadius: 999,

    justifyContent: "center",
    alignItems: "center",

    elevation: 8,
  },
});
