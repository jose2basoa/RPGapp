import AppText from "./AppText";
import Card from "./Card";

import { Member } from "../types/member";

interface MemberCardProps {
  member: Member;
}

export default function MemberCard({ member }: MemberCardProps) {
  return (
    <Card>
      <AppText variant="subtitle">{member.name}</AppText>

      <AppText>{member.email}</AppText>

      <AppText>{member.role}</AppText>
    </Card>
  );
}
