import { Text, View } from "react-native";

interface Props {
  total: number;
}

export function DiceTotal({ total }: Props) {
  return (
    <View
      style={{
        padding: 16,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
        }}
      >
        Total: {total}
      </Text>
    </View>
  );
}
