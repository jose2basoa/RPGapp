import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import AppText from "../../../../src/components/AppText";
import MemberCard from "../../../../src/components/MemberCard";
import Screen from "../../../../src/components/Screen";

import { Member } from "../../../../src/types/member";

import { getMembers } from "../../../../src/services/memberService";

export default function MembersScreen() {
  const { id } = useLocalSearchParams();

  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getMembers(String(id));

    setMembers(data);
  }

  return (
    <Screen scrollable>
      <AppText variant="title">Membros</AppText>

      {members.map((member) => (
        <MemberCard key={member.id} member={member} />
      ))}
    </Screen>
  );
}
