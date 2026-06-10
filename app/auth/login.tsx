import { Button } from "react-native";
import { useRouter } from "expo-router";
import AppText from "../../src/components/AppText";
import Screen from "../../src/components/Screen";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <Screen>
      <AppText variant="title">Login</AppText>
      <Button
        title="Entrar"
        onPress={() => router.replace("/(tabs)/campaigns")}
      />
    </Screen>
  );
}
