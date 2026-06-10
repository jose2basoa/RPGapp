import React from "react";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";

import { Typography } from "../theme/typography";
import { useTheme } from "../theme/useTheme";

type Variant = "title" | "subtitle" | "body" | "caption";

interface AppTextProps extends TextProps {
  children: React.ReactNode;
  variant?: Variant;
  style?: TextStyle | TextStyle[];
}

export default function AppText({
  children,
  variant = "body",
  style,
  ...rest
}: AppTextProps) {
  const theme = useTheme();

  return (
    <Text
      {...rest}
      style={[
        styles.base,
        variantStyles[variant],
        {
          color: theme.text,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    fontWeight: "400",
  },
});

const variantStyles: Record<Variant, TextStyle> = {
  title: {
    fontSize: Typography.title,
    fontWeight: "700",
  },

  subtitle: {
    fontSize: Typography.subtitle,
    fontWeight: "600",
  },

  body: {
    fontSize: Typography.body,
    fontWeight: "400",
  },

  caption: {
    fontSize: Typography.caption,
    fontWeight: "400",
  },
};
