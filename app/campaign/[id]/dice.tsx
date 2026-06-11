import { useState } from "react";
import { StyleSheet, View } from "react-native";

import AppText from "../../../src/components/AppText";
import Dice from "../../../src/components/Dice";
import Screen from "../../../src/components/Screen";

import { rollDice } from "../../../src/services/diceService";

export default function DiceScreen() {
  const [results, setResults] = useState({
    4: 1,
    6: 1,
    8: 1,
    10: 1,
    12: 1,
    20: 1,
  });

  function handleRoll(sides: number) {
    const result = rollDice(sides);

    setResults((prev) => ({
      ...prev,
      [sides]: result,
    }));
  }

  return (
    <Screen scrollable>
      <AppText variant="title">Dados</AppText>

      <View style={styles.grid}>
        {[4, 6, 8, 10, 12, 20].map((sides) => (
          <View key={sides} style={styles.item}>
            <Dice
              sides={sides}
              value={results[sides as keyof typeof results]}
              onRoll={() => handleRoll(sides)}
            />

            <AppText>D{sides}</AppText>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 24,
  },

  item: {
    alignItems: "center",
    marginBottom: 30,
  },
});
