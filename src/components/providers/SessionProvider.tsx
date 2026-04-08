"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface SessionContextType {
  user: User | null;
  profile: { name: string; image: string | null } | null;
  status: "loading" | "authenticated" | "unauthenticated";
  signOut: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType>({
  user: null,
  profile: null,
  status: "loading",
  signOut: async () => {},
});

export function useSession() {
  return useContext(SessionContext);
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<{ name: string; image: string | null } | null>(null);
  const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading");
  const supabase = createClient();

  useEffect(() => {
    const getSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("name, image")
          .eq("id", user.id)
          .single();
        setProfile(profileData);
        setStatus("authenticated");
      } else {
        setStatus("unauthenticated");
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          const { data: profileData } = await supabase
            .from("profiles")
            .select("name, image")
            .eq("id", currentUser.id)
            .single();
          setProfile(profileData);
          setStatus("authenticated");
        } else {
          setProfile(null);
          setStatus("unauthenticated");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setStatus("unauthenticated");
  };

  return (
    <SessionContext.Provider value={{ user, profile, status, signOut: handleSignOut }}>
      {children}
    </SessionContext.Provider>
  );
}
