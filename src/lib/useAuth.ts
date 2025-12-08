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

  const refetch = async () => {
    try {
      const sessionRes = await fetch(
        `${BASE_URL}/api/auth/native/get-session`,
        {
          credentials: "include",
        },
      );
      const sessionData = await sessionRes.json();
      let user = sessionData.user || null;

      if (user) {
        const profileRes = await fetch(`${BASE_URL}/api/profile`, {
          credentials: "include",
        });
        const profileData = await profileRes.json();

        user = {
          ...(user as User),
          username: profileData.username,
          avatar: profileData.avatar,
        };
      }

      setMe(user);
    } catch {
      setMe(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

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
<<<<<<< HEAD
    console.log("Login response:", data);
=======
>>>>>>> 477b8005b61a7dddf08ae8144054443d56f815e6
    if (!res.ok) throw new Error(data.error || "Login failed");

    await refetch();
  }

  async function register(payload: {
    email: string;
    password: string;
    username: string;
    title: string;
    location: string;
    role: string;
    age: string;
  }) {
    const res = await fetch(`${BASE_URL}/api/auth/native/sign-up/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: payload.email.trim(),
        password: payload.password,
      }),
      credentials: "include",
    });
    console.log(payload);
    console.log("Register response:", res);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Registration failed");
    await syncProfile();
    await refetch();
  }

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

  async function syncProfile() {
    try {
      const res = await fetch(`${BASE_URL}/api/profile/sync`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to sync profile");
      }

      const data = await res.json();
      setMe({ ...me, avatar: data.avatar, username: data.username });
      return data;
    } catch (err) {
      console.error("Sync profile failed:", err);
      return null;
    }
  }
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_PULSE_BACKEND_API_URL}`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch profile");

      const data = await res.json();
      setMe(data);
    } catch (err) {
      console.error(err);
      setMe(null);
    } finally {
      setLoading(false);
    }
  };
  const session = { user: me };

  return {
    me,
    loading,
    login,
    register,
    logout,
    syncProfile,
    session,
    fetchProfile,
    refetch,
  };
}
