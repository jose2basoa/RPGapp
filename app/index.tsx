import { Redirect } from "expo-router";

import { useAuth } from "../src/hooks/useAuth";

import { useEffect } from "react";

export default function Index() {
  const { user, loading } = useAuth();

  useEffect(() => {}, []);

  if (loading) {
    return null;
  }

  if (user) {
    return <Redirect href="/(tabs)/campaigns" />;
  }

  return <Redirect href="/auth/login" />;
}
