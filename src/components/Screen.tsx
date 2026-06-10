import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Spacing } from "../theme/spacing";
import { useTheme } from "../theme/useTheme";

interface ScreenProps {
  children: React.ReactNode;
  scrollable?: boolean;
}

export default function Screen({ children, scrollable = false }: ScreenProps) {
  const theme = useTheme();

  if (scrollable) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <ScrollView
          contentContainerStyle={[
            styles.content,
            { backgroundColor: theme.background },
          ]}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flexGrow: 1,
    padding: Spacing.md,
  },
});
