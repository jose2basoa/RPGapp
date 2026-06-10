import { User as SupabaseUser } from "@supabase/supabase-js";

import { User } from "../types/user";

export function mapSupabaseUser(
  user: SupabaseUser
): User {
  return {
    id: user.id,

    name:
      user.user_metadata?.name ??
      "",

    email:
      user.email ??
      "",
  };
}