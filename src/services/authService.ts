import { supabase } from "../lib/supabase";

import { User } from "../types/user";

export async function login(
  email: string,
  password: string
): Promise<User> {
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) {
    throw error;
  }

  return {
    id: data.user.id,
    name:
      data.user.user_metadata?.name ??
      "",
    email:
      data.user.email ?? "",
  };
}

export async function register(
  name: string,
  email: string,
  password: string
): Promise<User> {
  const { data, error } =
    await supabase.auth.signUp({
      email,
      password,

      options: {
        data: {
          name,
        },
      },
    });

  if (error) {
    throw error;
  }

  if (!data.user) {
    throw new Error(
      "Usuário não criado."
    );
  }

  return {
    id: data.user.id,
    name,
    email,
  };
}

export async function logout() {
  const { error } =
    await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}