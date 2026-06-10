import { StyleSheet, TouchableOpacity } from "react-native";

import AppText from "./AppText";

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
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.button,
        {
          backgroundColor: theme.primary,
        },
      ]}
    >
      <AppText
        style={{
          color: "#FFF",
        }}
      >
        {title}
      </AppText>
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
});
