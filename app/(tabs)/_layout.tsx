import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import { useTheme } from "../../src/theme/useTheme";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.border,
        },

        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
      }}
    >
      <Tabs.Screen
        name="campaigns"
        options={{
          title: "Campanhas",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="dice"
        options={{
          title: "Dice",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="dice" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
