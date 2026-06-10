import AppText from "../../src/components/AppText";
import Card from "../../src/components/Card";
import FloatingMenu from "../../src/components/FloatingMenu";
import Screen from "../../src/components/Screen";

export default function CampaignsScreen() {
  return (
    <Screen>
      <AppText variant="title">Minhas Campanhas</AppText>

      <Card>
        <AppText variant="subtitle">JoJo RPG</AppText>
      </Card>

      <FloatingMenu
        onCreateCampaign={() => {
          console.log("Criar");
        }}
        onJoinCampaign={() => {
          console.log("Entrar");
        }}
      />
    </Screen>
  );
}
