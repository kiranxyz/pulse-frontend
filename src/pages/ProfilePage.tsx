import { useState } from "react";

import { useAuthContext } from "../context/AuthProvider";

export default function ProfilePage() {
  const { me, loading, refetch } = useAuthContext();

  const [fullName, setFullName] = useState(me?.username || "");
  const [email, setEmail] = useState(me?.email || "");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  if (loading) return <p>Loading profile...</p>;
  if (!me) return <p>You must be logged in to view your profile.</p>;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setAvatar(e.target.files[0]);
  };

  const handleSaveProfile = async () => {
    setStatus("Saving profile...");
    try {
      const formData = new FormData();
      formData.append("username", fullName);
      formData.append("email", email);
      if (password) formData.append("password", password);
      if (avatar) formData.append("avatar", avatar);

      const res = await fetch(
        `${import.meta.env.VITE_PULSE_BACKEND_API_URL}/api/profile`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        },
      );

      if (!res.ok) {
        const text = await res.text();
        setStatus(`Error saving profile: ${text}`);
        return;
      }

      setStatus("Profile updated!");
      await refetch();
    } catch (err: unknown) {
      setStatus(`Error: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  return (
    <main className="mx-auto mt-10 max-w-xl rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-6 text-2xl font-bold">Profile</h1>

      <section className="mb-4">
        <label className="mb-1 block font-medium">Full Name</label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </section>

      <section className="mb-4">
        <label className="mb-1 block font-medium">Email</label>
        <input
          type="email"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </section>

      <section className="mb-4">
        <label className="mb-1 block font-medium">Change Password</label>
        <input
          type="password"
          className="input input-bordered w-full"
          placeholder="Leave blank to keep current password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </section>

      <section className="mb-4">
        <label className="mb-1 block font-medium">Avatar</label>
        <input type="file" onChange={handleAvatarChange} />
      </section>

      <button className="btn btn-primary mt-4" onClick={handleSaveProfile}>
        Save Profile
      </button>

      {status && <p className="mt-3 text-sm text-gray-600">{status}</p>}
    </main>
  );
}
