import { createContext, ReactNode, useEffect, useState } from "react";

import { User } from "../types/user";

import * as authService from "../services/authService";

import { supabase } from "../lib/supabase";

import { mapSupabaseUser } from "../utils/mapSupabaseUser";

interface AuthContextData {
  user: User | null;

  loading: boolean;

  login: (email: string, password: string) => Promise<void>;

  register: (name: string, email: string, password: string) => Promise<void>;

  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(mapSupabaseUser(session.user));
        } else {
          setUser(null);
        }
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function loadUser() {
    const { data } = await supabase.auth.getSession();

    const session = data.session;

    if (session?.user) {
      setUser(mapSupabaseUser(session.user));
    }

    setLoading(false);
  }

  async function login(email: string, password: string) {
    const loggedUser = await authService.login(email, password);

    setUser(loggedUser);
  }

  async function register(name: string, email: string, password: string) {
    const newUser = await authService.register(name, email, password);

    setUser(newUser);
  }

  async function logout() {
    await authService.logout();

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
