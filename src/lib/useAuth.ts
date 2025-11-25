import { useEffect, useState } from "react";

export interface User {
  id?: string;
  email?: string;
  username?: string;
  role?: string;
  title?: string;
  address?: string;
  avatar?: string;
}

const BASE_URL = import.meta.env.VITE_PULSE_BACKEND_API_URL;

export function useAuth() {
  const [me, setMe] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔄 REFRESH SESSION
  async function refetch() {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/native/get-session`, {
        credentials: "include",
      });
      const data = await res.json();
      setMe(data.user || null);
    } catch {
      setMe(null);
    } finally {
      setLoading(false);
    }
  }

  // Load initial session
  useEffect(() => {
    refetch();
  }, []);

  // 🔐 LOGIN
  async function login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const res = await fetch(`${BASE_URL}/api/auth/native/sign-in/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");

    await refetch(); // ensure UI updates
  }

  // 📝 REGISTER
  async function register(payload: {
    email: string;
    password: string;
    username: string;
    title: string;
    address: string;
    role: string;
  }) {
    const res = await fetch(`${BASE_URL}/api/auth/native/sign-up/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Registration failed");

    await refetch(); // ensure UI updates
  }

  // 🚪 LOGOUT
  async function logout({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const res = await fetch(`${BASE_URL}/api/auth/native/sign-out`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Logout failed");

    setMe(null);
  }

  // 🌐 SOCIAL LOGIN PLACEHOLDER
  async function signInSocial(provider: "instagram" | "google" | "facebook") {
    console.log("Social login placeholder:", provider);
  }

  // Compatibility with your current LoginModal
  const session = { user: me };

  return {
    me,
    loading,
    login,
    register,
    logout,
    signInSocial,
    session,
    refetch, // <<< added here
  };
}
