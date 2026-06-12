import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  onRoll: () => void;
  onClear: () => void;
}

export function DiceToolbar({ onRoll, onClear }: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 12,
        padding: 16,
      }}
    >
      <TouchableOpacity
        onPress={onRoll}
        style={{
          flex: 1,
          backgroundColor: "#4CAF50",
          padding: 16,
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
          }}
        >
          Rolar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onClear}
        style={{
          flex: 1,
          backgroundColor: "#F44336",
          padding: 16,
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
          }}
        >
          Limpar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
