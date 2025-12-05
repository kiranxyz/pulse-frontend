import { type ReactNode, createContext, useContext } from "react";

import { type User, useAuth } from "../lib/useAuth";

export interface AuthContextValue {
  me: User | null;
  loading: boolean;
  login: (payload: { email: string; password: string }) => Promise<void>;
  register: (payload: {
    email: string;
    password: string;
    username: string;
    title: string;
    location: string;
    role: string;
    age: string;
  }) => Promise<void>;
  logout: (payload: { email: string; password: string }) => Promise<void>;
  fetchProfile: () => Promise<void>;
  session: { user: User | null };
  refetch: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx)
    throw new Error("useAuthContext must be used within <AuthProvider>");
  return ctx;
}
