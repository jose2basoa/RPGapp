import { useRef } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";
import Svg, { Polygon } from "react-native-svg";

interface DiceProps {
  sides: number;
  value: number;
  onRoll: () => void;
}

export default function Dice({ sides, value, onRoll }: DiceProps) {
  const rotation = useRef(new Animated.Value(0)).current;

  function handlePress() {
    rotation.setValue(0);

    Animated.timing(rotation, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();

    onRoll();
  }

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "1080deg"],
  });

  function getShape() {
    switch (sides) {
      case 4:
        return "45,5 85,85 5,85";

      case 6:
        return "10,10 80,10 80,80 10,80";

      case 8:
        return "45,5 85,45 45,85 5,45";

      case 10:
        return "45,5 80,25 80,65 45,85 10,65 10,25";

      case 12:
        return "45,5 70,10 85,30 85,55 70,75 45,85 20,75 5,55 5,30 20,10";

      case 20:
        return "45,5 75,15 90,40 85,70 60,90 30,90 5,70 0,40 15,15";

      default:
        return "10,10 80,10 80,80 10,80";
    }
  }

  return (
    <Pressable onPress={handlePress}>
      <Animated.View
        style={{
          transform: [{ rotate: spin }],
        }}
      >
        <View style={styles.container}>
          <Svg width={90} height={90}>
            <Polygon
              points={getShape()}
              fill="#2c2c2c"
              stroke="#888"
              strokeWidth="2"
            />
          </Svg>

          <View style={styles.center}>
            <Animated.Text style={styles.number}>{value}</Animated.Text>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 90,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },

  center: {
    position: "absolute",
  },

  number: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
});
