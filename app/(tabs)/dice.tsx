import { useRef, useState } from "react";

import { Text, TouchableOpacity, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { DiceWebView, DiceWebViewRef } from "@/src/components/dice/DiceWebView";

import { DiceToolbar } from "@/src/components/dice/DiceToolbar";

import { DiceTotal } from "@/src/components/dice/DiceTotal";

import { DiceBridge } from "@/src/services/dice/diceMessageBridge";

export default function DiceScreen() {
  const webviewRef = useRef<DiceWebViewRef>(null);

  const [total, setTotal] = useState(0);

  const addDice = (sides: number) => {
    webviewRef.current?.send(DiceBridge.addDice(sides));
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <DiceWebView
          ref={webviewRef}
          onMessage={(data) => {
            if (data.type === "ROLL_RESULT") {
              setTotal(data.total);
            }
          }}
        />
      </View>

      <DiceTotal total={total} />

      <DiceToolbar
        onRoll={() => webviewRef.current?.send(DiceBridge.rollAll())}
        onClear={() => webviewRef.current?.send(DiceBridge.clear())}
      />

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 8,
          padding: 16,
        }}
      >
        {[4, 6, 8, 10, 12, 20].map((side) => (
          <TouchableOpacity
            key={side}
            onPress={() => addDice(side)}
            style={{
              backgroundColor: "#333",

              padding: 12,

              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: "#fff",
              }}
            >
              D{side}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}
