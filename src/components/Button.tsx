import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { Radius } from "../theme/radius";
import { useTheme } from "../theme/useTheme";

interface ButtonProps {
  title: string;
  onPress: () => void;
}

export default function Button({ title, onPress }: ButtonProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: theme.primary,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Radius.md,
  },

  text: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
