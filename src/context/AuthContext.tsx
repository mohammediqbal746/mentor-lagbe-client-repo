"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { API_URL } from "@/lib/api";

export interface DbUser {
  _id?: string;
  name: string;
  email: string;
  image?: string;
  role: "student" | "tutor" | "admin";
  phone?: string;
  bio?: string;
  plan: "free" | "pro";
  bookmarks?: string[];
}

interface AuthContextType {
  user: DbUser | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refreshUser: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();
  const [user, setUser] = useState<DbUser | null>(null);
  const [syncing, setSyncing] = useState(true);

  const syncUserWithBackend = useCallback(async () => {
    if (!session?.user?.email) {
      localStorage.removeItem("mentorlagbe_token");
      setUser(null);
      setSyncing(false);
      return;
    }

    try {
      setSyncing(true);
      const email = session.user.email;

      // 1. Get JWT token from Express server
      const jwtRes = await fetch(`${API_URL}/jwt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const jwtData = await jwtRes.json();

      if (jwtData.token) {
        localStorage.setItem("mentorlagbe_token", jwtData.token);

        // 2. Fetch user profile from Express DB
        const userRes = await fetch(`${API_URL}/users/${email}`, {
          headers: { Authorization: `Bearer ${jwtData.token}` },
        });
        let dbUser = await userRes.json();

        // 3. If user doesn't exist in custom users collection yet, create it
        if (!dbUser || !dbUser.email) {
          const createRes = await fetch(`${API_URL}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: session.user.name,
              email: session.user.email,
              image: session.user.image || "",
              role: (session.user as { role?: string }).role || "student",
            }),
          });
          const created = await createRes.json();
          dbUser = created.user;
        }

        setUser(dbUser);
      }
    } catch (error) {
      console.error("Auth sync error:", error);
    } finally {
      setSyncing(false);
    }
  }, [session]);

  useEffect(() => {
    if (!isPending) {
      syncUserWithBackend();
    }
  }, [isPending, syncUserWithBackend]);

  const logout = async () => {
    localStorage.removeItem("mentorlagbe_token");
    setUser(null);
    await signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: isPending || syncing,
        refreshUser: syncUserWithBackend,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);