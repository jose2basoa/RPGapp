import { ReactNode } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import { Radius } from "../theme/radius";
import { useTheme } from "../theme/useTheme";

interface CardProps {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
}

export default function Card({ children, style }: CardProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: 16,
  },
});
