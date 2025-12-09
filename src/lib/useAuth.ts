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
  const [member, setMember] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const normalizeRole = (role?: string) => role?.toLowerCase() || "guest";

  const refetch = async () => {
    try {
      setLoading(true);

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
          role: normalizeRole(profileData.role || (user as User).role),
        };
      }
      setMember(user);
    } catch {
      setMember(null);
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
    if (!res.ok) throw new Error(data.error || "Login failed");

    await refetch();
  }

  async function register(payload: {
    email: string;
    password: string;
    username: string;
    title?: string;
    location?: string;
    role: string;
    age?: string;
  }) {
    const res = await fetch(`${BASE_URL}/api/auth/native/sign-up/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: payload.email.trim(),
        password: payload.password,
        role: normalizeRole(payload.role),
      }),
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Registration failed");

    await syncProfile(normalizeRole(payload.role));
    await refetch();
  }

  async function logout() {
    const res = await fetch(`${BASE_URL}/api/auth/native/sign-out`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Logout failed");

    setMember(null);
  }

  async function syncProfile(role?: string) {
    try {
      const res = await fetch(`${BASE_URL}/api/profile/sync`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ role }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to sync profile");
      }

      const data = await res.json();

      // Normalize role and update user state
      const updatedRole = normalizeRole(data.role);

      setMember((prev) => ({
        ...prev,
        avatar: data.avatar,
        username: data.username,
        role: updatedRole,
      }));

      return data;
    } catch (err) {
      console.error("Sync profile failed:", err);
      return null;
    }
  }

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/profile`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch profile");

      const data = await res.json();
      setMember({
        ...data,
        role: normalizeRole(data.role),
      });
    } catch (err) {
      console.error(err);
      setMember(null);
    } finally {
      setLoading(false);
    }
  };

  const session = { user: member };

  return {
    member,
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
