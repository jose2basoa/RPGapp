import { StyleSheet, TextInput, TextInputProps } from "react-native";

import { Radius } from "../theme/radius";
import { useTheme } from "../theme/useTheme";

export default function Input(props: TextInputProps) {
  const theme = useTheme();

  return (
    <TextInput
      {...props}
      placeholderTextColor={theme.textSecondary}
      style={[
        styles.input,
        {
          backgroundColor: theme.surface,

          borderColor: theme.border,

          color: theme.text,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,

    borderWidth: 1,

    borderRadius: Radius.md,

    paddingHorizontal: 16,
  },
});
